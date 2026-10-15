-- Careers: job postings, applications (ATS pipeline), activity log and a
-- private résumé bucket. Requires 20261015000000_hr_role.sql to be applied first.
--
-- Access model
--   • Visitors read open (and closed, for old links) jobs through the anon key.
--   • Applications are written only by the server (service role) after
--     validation, rate limiting and file checks — never directly by the browser.
--   • Admin + HR manage jobs and applications; only admins can delete.
--   • Résumés live in a PRIVATE bucket; staff get short-lived signed URLs.

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
create type public.job_status as enum ('draft', 'open', 'paused', 'closed');
create type public.employment_type as enum ('full_time', 'part_time', 'contract', 'internship');
create type public.workplace_type as enum ('onsite', 'hybrid', 'remote');

create type public.application_status as enum (
  'new', 'reviewing', 'shortlisted', 'interview', 'offered', 'hired', 'rejected', 'withdrawn'
);

create type public.application_activity_type as enum (
  'created', 'status_changed', 'assigned', 'rating_changed', 'note', 'email_sent', 'resume_viewed'
);

-- ---------------------------------------------------------------------------
-- Jobs
-- ---------------------------------------------------------------------------
create table public.jobs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  department text not null,
  location text not null default 'New Delhi',
  workplace_type public.workplace_type not null default 'onsite',
  employment_type public.employment_type not null default 'full_time',
  experience_min smallint not null default 0,
  experience_max smallint,
  salary_min integer,
  salary_max integer,
  show_salary boolean not null default false,
  openings smallint not null default 1,
  summary text,
  description_html text not null default '',
  responsibilities text[] not null default '{}',
  requirements text[] not null default '{}',
  nice_to_have text[] not null default '{}',
  benefits text[] not null default '{}',
  skills text[] not null default '{}',
  screening_questions jsonb not null default '[]'::jsonb,
  status public.job_status not null default 'draft',
  published_at timestamptz,
  closes_at timestamptz,
  created_by uuid references public.profiles (id) on delete set null,
  updated_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint jobs_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$' and char_length(slug) <= 120),
  constraint jobs_title_len check (char_length(title) between 3 and 140),
  constraint jobs_experience check (experience_min >= 0 and (experience_max is null or experience_max >= experience_min)),
  constraint jobs_salary check (salary_min is null or salary_max is null or salary_max >= salary_min),
  constraint jobs_openings check (openings between 1 and 500),
  constraint jobs_questions_array check (jsonb_typeof(screening_questions) = 'array'),
  constraint jobs_live_needs_date check (status in ('draft') or published_at is not null)
);

create index jobs_status_idx on public.jobs (status, published_at desc);

create trigger jobs_set_updated_at
  before update on public.jobs
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Applications
-- ---------------------------------------------------------------------------
create sequence public.application_ref_seq start 1001;

create table public.job_applications (
  id uuid primary key default gen_random_uuid(),
  ref text not null unique default ('APP-' || nextval('public.application_ref_seq')),
  job_id uuid not null references public.jobs (id) on delete restrict,
  full_name text not null,
  email text not null,
  phone text not null,
  current_city text,
  linkedin_url text,
  portfolio_url text,
  total_experience numeric(4, 1),
  current_ctc numeric(6, 2),
  expected_ctc numeric(6, 2),
  notice_period_days smallint,
  cover_letter text,
  answers jsonb not null default '[]'::jsonb,
  resume_path text not null,
  resume_name text not null,
  resume_size integer not null,
  resume_type text not null,
  status public.application_status not null default 'new',
  rating smallint,
  assigned_to uuid references public.profiles (id) on delete set null,
  source text not null default 'careers-page',
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  consent boolean not null default false,
  ip_hash text,
  user_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint applications_name_len check (char_length(full_name) between 2 and 120),
  constraint applications_email_len check (char_length(email) <= 254),
  constraint applications_cover_len check (cover_letter is null or char_length(cover_letter) <= 5000),
  constraint applications_rating check (rating is null or rating between 1 and 5),
  constraint applications_resume_size check (resume_size > 0 and resume_size <= 5242880),
  constraint applications_answers_array check (jsonb_typeof(answers) = 'array')
);

-- One application per person per job; resubmissions are rejected politely.
create unique index job_applications_job_email_key on public.job_applications (job_id, lower(email));
create index job_applications_job_idx on public.job_applications (job_id, status, created_at desc);
create index job_applications_status_idx on public.job_applications (status, created_at desc);
create index job_applications_created_idx on public.job_applications (created_at desc);
create index job_applications_email_idx on public.job_applications (lower(email));

create trigger job_applications_set_updated_at
  before update on public.job_applications
  for each row execute function public.set_updated_at();

create table public.application_activities (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.job_applications (id) on delete cascade,
  actor_id uuid references public.profiles (id) on delete set null,
  type public.application_activity_type not null,
  body text,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint application_activities_body_len check (body is null or char_length(body) <= 6000)
);

create index application_activities_app_idx on public.application_activities (application_id, created_at desc);

create or replace function public.log_application_changes()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor uuid := auth.uid();
begin
  if tg_op = 'INSERT' then
    insert into public.application_activities (application_id, actor_id, type, meta)
    values (new.id, null, 'created', jsonb_build_object('source', new.source));
    return new;
  end if;

  if new.status is distinct from old.status then
    insert into public.application_activities (application_id, actor_id, type, meta)
    values (new.id, actor, 'status_changed', jsonb_build_object('from', old.status, 'to', new.status));
  end if;

  if new.assigned_to is distinct from old.assigned_to then
    insert into public.application_activities (application_id, actor_id, type, meta)
    values (new.id, actor, 'assigned', jsonb_build_object('from', old.assigned_to, 'to', new.assigned_to));
  end if;

  if new.rating is distinct from old.rating then
    insert into public.application_activities (application_id, actor_id, type, meta)
    values (new.id, actor, 'rating_changed', jsonb_build_object('from', old.rating, 'to', new.rating));
  end if;

  return new;
end;
$$;

create trigger job_applications_log_insert
  after insert on public.job_applications
  for each row execute function public.log_application_changes();

create trigger job_applications_log_update
  after update on public.job_applications
  for each row execute function public.log_application_changes();

-- Emails sent to candidates are logged alongside lead emails.
alter table public.email_logs
  add column application_id uuid references public.job_applications (id) on delete set null;

create index email_logs_application_idx on public.email_logs (application_id, created_at desc)
  where application_id is not null;

-- ---------------------------------------------------------------------------
-- Grants (explicit; RLS below decides rows)
-- ---------------------------------------------------------------------------
grant all on public.jobs, public.job_applications, public.application_activities to service_role;
grant usage on sequence public.application_ref_seq to service_role;
grant execute on function public.log_application_changes() to service_role;

grant select on public.jobs to anon;
grant select, insert, update, delete on public.jobs to authenticated;
grant select, update, delete on public.job_applications to authenticated;
grant select, insert on public.application_activities to authenticated;

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------
alter table public.jobs enable row level security;
alter table public.job_applications enable row level security;
alter table public.application_activities enable row level security;

create policy "Anyone can view published jobs" on public.jobs
  for select to anon, authenticated
  using (status in ('open', 'closed') and published_at <= now());

create policy "HR views all jobs" on public.jobs
  for select to authenticated
  using (public.has_role(array['admin', 'hr']::public.app_role[]));

create policy "HR creates jobs" on public.jobs
  for insert to authenticated
  with check (public.has_role(array['admin', 'hr']::public.app_role[]));

create policy "HR updates jobs" on public.jobs
  for update to authenticated
  using (public.has_role(array['admin', 'hr']::public.app_role[]))
  with check (public.has_role(array['admin', 'hr']::public.app_role[]));

create policy "Admins delete jobs" on public.jobs
  for delete to authenticated
  using (public.has_role(array['admin']::public.app_role[]));

create policy "HR views applications" on public.job_applications
  for select to authenticated
  using (public.has_role(array['admin', 'hr']::public.app_role[]));

create policy "HR updates applications" on public.job_applications
  for update to authenticated
  using (public.has_role(array['admin', 'hr']::public.app_role[]))
  with check (public.has_role(array['admin', 'hr']::public.app_role[]));

create policy "Admins delete applications" on public.job_applications
  for delete to authenticated
  using (public.has_role(array['admin']::public.app_role[]));

create policy "HR views application activity" on public.application_activities
  for select to authenticated
  using (public.has_role(array['admin', 'hr']::public.app_role[]));

create policy "HR adds application notes" on public.application_activities
  for insert to authenticated
  with check (
    public.has_role(array['admin', 'hr']::public.app_role[])
    and actor_id = (select auth.uid())
    and type in ('note', 'email_sent', 'resume_viewed')
  );

-- HR needs teammates' names for assignment and the activity timeline.
create policy "HR can view team" on public.profiles
  for select to authenticated
  using (public.has_role(array['hr']::public.app_role[]));

create policy "HR views candidate email log" on public.email_logs
  for select to authenticated
  using (application_id is not null and public.has_role(array['hr']::public.app_role[]));

-- ---------------------------------------------------------------------------
-- Résumé storage: private bucket, no client policies. Uploads use one-time
-- signed upload URLs issued by the server; downloads use short-lived signed
-- URLs issued after a role check.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'resumes', 'resumes', false, 5242880,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
on conflict (id) do nothing;
