-- Scripture Theory · cloud sync table
--
-- A single JSONB row per user. The shape of `data` mirrors the on-device
-- Profile (see lib/profile.ts) minus anything we don't want on a server.
-- The Secret Place is excluded by default at the client; users may opt
-- it in from /account.
--
-- Row Level Security ensures a user can only read/write their own row.

create table if not exists public.profiles (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using ( auth.uid() = user_id );

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  with check ( auth.uid() = user_id );

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using ( auth.uid() = user_id )
  with check ( auth.uid() = user_id );

drop policy if exists "profiles_delete_own" on public.profiles;
create policy "profiles_delete_own"
  on public.profiles for delete
  using ( auth.uid() = user_id );

-- Keep updated_at in sync on every change.
create or replace function public.profiles_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.profiles_touch_updated_at();
