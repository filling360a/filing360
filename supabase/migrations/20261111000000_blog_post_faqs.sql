-- Structured FAQs per blog post (admin FAQ editor). Safe to re-run.
alter table public.blog_posts
  add column if not exists faqs jsonb not null default '[]'::jsonb;

comment on column public.blog_posts.faqs is
  'Array of {q, a} FAQ items managed from the admin post editor.';
