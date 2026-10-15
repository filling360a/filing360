-- Filing360 backend schema: team roles, leads CRM, email log, blog CMS, media storage.
-- Every table has row level security enabled. Public website writes (lead capture)
-- go through the server with the service-role key; the anon key can only read
-- published blog content.

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
create type public.app_role as enum ('admin', 'sales', 'editor');

create type public.lead_status as enum (
  'new', 'contacted', 'qualified', 'proposal', 'won', 'lost', 'spam'
);

create type public.lead_priority as enum ('low', 'normal', 'high', 'urgent');

create type public.lead_activity_type as enum (
  'created', 'resubmitted', 'status_changed', 'assigned', 'priority_changed',
  'follow_up_set', 'note', 'call', 'email_sent', 'updated'
);

create type public.post_status as enum ('draft', 'scheduled', 'published', 'archived');

-- ---------------------------------------------------------------------------
-- Shared helpers
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Profiles (one per auth user). Role is never read from user-controlled
-- metadata; it is assigned by an admin through the server.
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  role public.app_role,
  is_active boolean not null default true,
  job_title text,
  bio text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_full_name_len check (full_name is null or char_length(full_name) <= 120),
  constraint profiles_bio_len check (bio is null or char_length(bio) <= 1000)
);

create unique index profiles_email_key on public.profiles (lower(email));

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, nullif(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.current_app_role()
returns public.app_role
language sql
stable
security definer
set search_path = ''
as $$
  select role from public.profiles where id = (select auth.uid()) and is_active
$$;

create or replace function public.has_role(roles public.app_role[])
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    (select p.role = any (roles) from public.profiles p where p.id = (select auth.uid()) and p.is_active),
    false
  )
$$;

-- ---------------------------------------------------------------------------
-- Leads
-- ---------------------------------------------------------------------------
create sequence public.lead_ref_seq start 1001;

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  ref text not null unique default ('F360-' || nextval('public.lead_ref_seq')),
  salutation text,
  name text not null,
  email text,
  phone text not null,
  city text,
  interest text,
  service_slug text,
  message text,
  source text not null default 'website',
  page_url text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  gclid text,
  status public.lead_status not null default 'new',
  priority public.lead_priority not null default 'normal',
  assigned_to uuid references public.profiles (id) on delete set null,
  estimated_value numeric(12, 2),
  next_follow_up_at timestamptz,
  last_contacted_at timestamptz,
  lost_reason text,
  tags text[] not null default '{}',
  submission_count integer not null default 1,
  consent boolean not null default false,
  ip_hash text,
  user_agent text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint leads_name_len check (char_length(name) between 1 and 120),
  constraint leads_phone_len check (char_length(phone) between 8 and 20),
  constraint leads_email_len check (email is null or char_length(email) <= 254),
  constraint leads_message_len check (message is null or char_length(message) <= 4000),
  constraint leads_value_positive check (estimated_value is null or estimated_value >= 0)
);

create index leads_created_at_idx on public.leads (created_at desc);
create index leads_status_idx on public.leads (status, created_at desc);
create index leads_assigned_idx on public.leads (assigned_to, status);
create index leads_phone_idx on public.leads (phone);
create index leads_email_idx on public.leads (lower(email));
create index leads_follow_up_idx on public.leads (next_follow_up_at) where next_follow_up_at is not null;

create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

create table public.lead_activities (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete cascade,
  actor_id uuid references public.profiles (id) on delete set null,
  type public.lead_activity_type not null,
  body text,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint lead_activities_body_len check (body is null or char_length(body) <= 4000)
);

create index lead_activities_lead_idx on public.lead_activities (lead_id, created_at desc);

-- Audit trail: pipeline changes are logged by the database itself, so the
-- history stays complete no matter which client made the change.
create or replace function public.log_lead_changes()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor uuid := auth.uid();
begin
  if tg_op = 'INSERT' then
    insert into public.lead_activities (lead_id, actor_id, type, meta)
    values (new.id, actor, 'created', jsonb_build_object('source', new.source));
    return new;
  end if;

  if new.status is distinct from old.status then
    insert into public.lead_activities (lead_id, actor_id, type, meta)
    values (new.id, actor, 'status_changed', jsonb_build_object('from', old.status, 'to', new.status));
  end if;

  if new.assigned_to is distinct from old.assigned_to then
    insert into public.lead_activities (lead_id, actor_id, type, meta)
    values (new.id, actor, 'assigned', jsonb_build_object('from', old.assigned_to, 'to', new.assigned_to));
  end if;

  if new.priority is distinct from old.priority then
    insert into public.lead_activities (lead_id, actor_id, type, meta)
    values (new.id, actor, 'priority_changed', jsonb_build_object('from', old.priority, 'to', new.priority));
  end if;

  if new.next_follow_up_at is distinct from old.next_follow_up_at then
    insert into public.lead_activities (lead_id, actor_id, type, meta)
    values (new.id, actor, 'follow_up_set', jsonb_build_object('at', new.next_follow_up_at));
  end if;

  if new.submission_count > old.submission_count then
    insert into public.lead_activities (lead_id, actor_id, type, meta)
    values (new.id, null, 'resubmitted', jsonb_build_object('source', new.source, 'interest', new.interest));
  end if;

  return new;
end;
$$;

create trigger leads_log_insert
  after insert on public.leads
  for each row execute function public.log_lead_changes();

create trigger leads_log_update
  after update on public.leads
  for each row execute function public.log_lead_changes();

create table public.email_logs (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads (id) on delete set null,
  to_email text not null,
  subject text not null,
  template text not null,
  provider_id text,
  status text not null check (status in ('sent', 'failed', 'skipped')),
  error text,
  sent_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create index email_logs_lead_idx on public.email_logs (lead_id, created_at desc);

-- ---------------------------------------------------------------------------
-- Rate limiting (service role only)
-- ---------------------------------------------------------------------------
create table public.rate_limit_hits (
  id bigint generated always as identity primary key,
  key text not null,
  created_at timestamptz not null default now()
);

create index rate_limit_hits_key_idx on public.rate_limit_hits (key, created_at desc);

create or replace function public.check_rate_limit(p_key text, p_limit integer, p_window_seconds integer)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  hits integer;
begin
  delete from public.rate_limit_hits
  where created_at < now() - make_interval(secs => greatest(p_window_seconds, 3600));

  select count(*) into hits
  from public.rate_limit_hits
  where key = p_key and created_at > now() - make_interval(secs => p_window_seconds);

  if hits >= p_limit then
    return false;
  end if;

  insert into public.rate_limit_hits (key) values (p_key);
  return true;
end;
$$;

revoke execute on function public.check_rate_limit(text, integer, integer) from public, anon, authenticated;

-- ---------------------------------------------------------------------------
-- Blog
-- ---------------------------------------------------------------------------
create table public.blog_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint blog_categories_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create trigger blog_categories_set_updated_at
  before update on public.blog_categories
  for each row execute function public.set_updated_at();

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content_html text not null default '',
  cover_image_url text,
  cover_image_alt text,
  category_id uuid references public.blog_categories (id) on delete set null,
  tags text[] not null default '{}',
  status public.post_status not null default 'draft',
  published_at timestamptz,
  author_id uuid references public.profiles (id) on delete set null,
  seo_title text,
  seo_description text,
  focus_keyword text,
  canonical_url text,
  noindex boolean not null default false,
  reading_minutes integer not null default 1,
  word_count integer not null default 0,
  created_by uuid references public.profiles (id) on delete set null,
  updated_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint blog_posts_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint blog_posts_title_len check (char_length(title) between 1 and 200),
  constraint blog_posts_live_needs_date check (status not in ('published', 'scheduled') or published_at is not null)
);

create index blog_posts_live_idx on public.blog_posts (status, published_at desc);
create index blog_posts_category_idx on public.blog_posts (category_id, published_at desc);

create trigger blog_posts_set_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

create table public.blog_post_revisions (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.blog_posts (id) on delete cascade,
  title text not null,
  excerpt text,
  content_html text not null,
  edited_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create index blog_post_revisions_post_idx on public.blog_post_revisions (post_id, created_at desc);

create or replace function public.snapshot_blog_post()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.content_html is distinct from old.content_html or new.title is distinct from old.title then
    insert into public.blog_post_revisions (post_id, title, excerpt, content_html, edited_by)
    values (old.id, old.title, old.excerpt, old.content_html, old.updated_by);

    delete from public.blog_post_revisions
    where post_id = old.id
      and id not in (
        select id from public.blog_post_revisions
        where post_id = old.id
        order by created_at desc
        limit 50
      );
  end if;
  return new;
end;
$$;

create trigger blog_posts_snapshot
  before update on public.blog_posts
  for each row execute function public.snapshot_blog_post();

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.leads enable row level security;
alter table public.lead_activities enable row level security;
alter table public.email_logs enable row level security;
alter table public.rate_limit_hits enable row level security;
alter table public.blog_categories enable row level security;
alter table public.blog_posts enable row level security;
alter table public.blog_post_revisions enable row level security;

-- ---------------------------------------------------------------------------
-- Explicit Data API grants (works whether or not "automatically expose new
-- tables" is enabled). RLS policies below still decide which rows are visible.
-- ---------------------------------------------------------------------------
revoke all on all tables in schema public from anon, authenticated;
revoke all on all sequences in schema public from anon, authenticated;

grant usage on schema public to anon, authenticated, service_role;
grant all on all tables in schema public to service_role;
grant all on all sequences in schema public to service_role;
grant execute on all functions in schema public to service_role;

grant select, update on public.profiles to authenticated;
grant select, insert, update, delete on public.leads to authenticated;
grant usage on sequence public.lead_ref_seq to authenticated;
grant select, insert on public.lead_activities to authenticated;
grant select on public.email_logs to authenticated;
grant select on public.blog_categories to anon;
grant select, insert, update, delete on public.blog_categories to authenticated;
grant select on public.blog_posts to anon;
grant select, insert, update, delete on public.blog_posts to authenticated;
grant select on public.blog_post_revisions to authenticated;

grant execute on function public.current_app_role() to anon, authenticated;
grant execute on function public.has_role(public.app_role[]) to anon, authenticated;

-- Profiles: staff see the team; visitors only see public author fields of
-- people who have a live post.
grant select (id, full_name, job_title, bio, avatar_url) on public.profiles to anon;

create policy "Staff can view team" on public.profiles
  for select to authenticated
  using (id = (select auth.uid()) or public.has_role(array['admin', 'sales', 'editor']::public.app_role[]));

create policy "Visitors can view published authors" on public.profiles
  for select to anon
  using (exists (
    select 1 from public.blog_posts p
    where p.author_id = profiles.id
      and p.status in ('published', 'scheduled')
      and p.published_at <= now()
  ));

create policy "Admins manage profiles" on public.profiles
  for update to authenticated
  using (public.has_role(array['admin']::public.app_role[]))
  with check (public.has_role(array['admin']::public.app_role[]));

-- Leads
create policy "Sales and admins view leads" on public.leads
  for select to authenticated
  using (public.has_role(array['admin', 'sales']::public.app_role[]));

create policy "Sales and admins create leads" on public.leads
  for insert to authenticated
  with check (public.has_role(array['admin', 'sales']::public.app_role[]));

create policy "Sales and admins update leads" on public.leads
  for update to authenticated
  using (public.has_role(array['admin', 'sales']::public.app_role[]))
  with check (public.has_role(array['admin', 'sales']::public.app_role[]));

create policy "Admins delete leads" on public.leads
  for delete to authenticated
  using (public.has_role(array['admin']::public.app_role[]));

create policy "Sales and admins view activity" on public.lead_activities
  for select to authenticated
  using (public.has_role(array['admin', 'sales']::public.app_role[]));

create policy "Sales and admins add notes" on public.lead_activities
  for insert to authenticated
  with check (
    public.has_role(array['admin', 'sales']::public.app_role[])
    and actor_id = (select auth.uid())
    and type in ('note', 'call', 'email_sent')
  );

create policy "Sales and admins view email log" on public.email_logs
  for select to authenticated
  using (public.has_role(array['admin', 'sales']::public.app_role[]));

-- Blog
create policy "Anyone can view categories" on public.blog_categories
  for select to anon, authenticated
  using (true);

create policy "Editors manage categories" on public.blog_categories
  for all to authenticated
  using (public.has_role(array['admin', 'editor']::public.app_role[]))
  with check (public.has_role(array['admin', 'editor']::public.app_role[]));

create policy "Anyone can view live posts" on public.blog_posts
  for select to anon, authenticated
  using (status in ('published', 'scheduled') and published_at <= now());

create policy "Editors view all posts" on public.blog_posts
  for select to authenticated
  using (public.has_role(array['admin', 'editor']::public.app_role[]));

create policy "Editors create posts" on public.blog_posts
  for insert to authenticated
  with check (public.has_role(array['admin', 'editor']::public.app_role[]));

create policy "Editors update posts" on public.blog_posts
  for update to authenticated
  using (public.has_role(array['admin', 'editor']::public.app_role[]))
  with check (public.has_role(array['admin', 'editor']::public.app_role[]));

create policy "Admins delete posts" on public.blog_posts
  for delete to authenticated
  using (public.has_role(array['admin']::public.app_role[]));

create policy "Editors view revisions" on public.blog_post_revisions
  for select to authenticated
  using (public.has_role(array['admin', 'editor']::public.app_role[]));

-- ---------------------------------------------------------------------------
-- Media storage for blog images (public read, editor write)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blog-media', 'blog-media', true, 5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
)
on conflict (id) do nothing;

create policy "Editors upload blog media" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'blog-media' and public.has_role(array['admin', 'editor']::public.app_role[]));

create policy "Editors update blog media" on storage.objects
  for update to authenticated
  using (bucket_id = 'blog-media' and public.has_role(array['admin', 'editor']::public.app_role[]));

create policy "Editors delete blog media" on storage.objects
  for delete to authenticated
  using (bucket_id = 'blog-media' and public.has_role(array['admin', 'editor']::public.app_role[]));

-- ---------------------------------------------------------------------------
-- Starter blog categories
-- ---------------------------------------------------------------------------
insert into public.blog_categories (slug, name, description, sort_order) values
  ('company-registration', 'Company Registration', 'Private Limited, LLP, OPC and other business structures in India.', 10),
  ('gst', 'GST', 'GST registration, returns, notices and input tax credit.', 20),
  ('income-tax', 'Income Tax', 'ITR filing, tax planning, TDS and notices.', 30),
  ('compliance', 'Compliance', 'MCA annual filings, ROC compliance and due dates.', 40),
  ('startup', 'Startup', 'Startup India, DPIIT recognition, funding and founder guides.', 50)
on conflict (slug) do nothing;
