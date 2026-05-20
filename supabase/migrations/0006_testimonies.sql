-- Scripture Theory · testimonies (real, editorially-reviewed)
--
-- A believer writes a three-part story (before / Jesus met me / now)
-- and submits it; an editor reviews it from /admin/testimonies and
-- flips status to 'published'. The witness page reads only
-- 'published' rows; pending and hidden are admin-only.
--
-- Privacy:
--   • First name (or initials-only flag) and a country / region.
--   • Optional `contact` for the editor to reach back; never public.
--
-- Depends on migration 0005_prayer_admin.sql for admin_emails +
-- is_admin().

create extension if not exists pgcrypto;

create table if not exists public.testimonies (
  id              uuid primary key default gen_random_uuid(),
  first_name      text not null check (char_length(first_name) between 1 and 64),
  initials_only   boolean not null default false,
  place           text check (place is null or char_length(place) <= 96),
  before_text     text not null check (char_length(before_text) between 10 and 2000),
  encounter       text not null check (char_length(encounter) between 10 and 2000),
  now_text        text not null check (char_length(now_text) between 10 and 2000),
  verse           text check (verse is null or char_length(verse) <= 64),
  contact         text check (contact is null or char_length(contact) <= 256),
  status          text not null default 'pending'
                  check (status in ('pending', 'published', 'hidden')),
  user_id         uuid references auth.users(id) on delete set null,
  device_id       text,
  created_at      timestamptz not null default now(),
  published_at    timestamptz
);

create index if not exists idx_testimonies_published
  on public.testimonies (published_at desc nulls last)
  where status = 'published';

create index if not exists idx_testimonies_status
  on public.testimonies (status, created_at desc);

alter table public.testimonies enable row level security;

-- ── Public: read published rows only ──────────────────────────
drop policy if exists "testimonies_read_published" on public.testimonies;
create policy "testimonies_read_published"
  on public.testimonies for select
  using ( status = 'published' );

-- ── Anyone (anon or signed-in) can submit; status forced to pending ──
drop policy if exists "testimonies_submit_any" on public.testimonies;
create policy "testimonies_submit_any"
  on public.testimonies for insert
  with check ( status = 'pending' );

-- ── Admin: read all (incl pending/hidden) + update any row ────
drop policy if exists "testimonies_admin_read" on public.testimonies;
create policy "testimonies_admin_read"
  on public.testimonies for select
  using ( public.is_admin() );

drop policy if exists "testimonies_admin_update" on public.testimonies;
create policy "testimonies_admin_update"
  on public.testimonies for update
  using ( public.is_admin() ) with check ( public.is_admin() );

drop policy if exists "testimonies_admin_delete" on public.testimonies;
create policy "testimonies_admin_delete"
  on public.testimonies for delete
  using ( public.is_admin() );
