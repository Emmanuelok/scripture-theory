-- Scripture Theory · Cohort sync (groups walking Foundations together)
--
-- A "cohort" is a small group (typically 5–8 believers) walking the
-- Foundations of the Faith course together. The leader creates a
-- cohort and shares a short code; members join with the code.
--
-- Each member's per-week progress is mirrored to the cohort so the
-- group can see who has completed which week. A shared prayer thread
-- lets members lift one another up by name without exposing their
-- personal Secret Place data.
--
-- Tables:
--   cohorts             — the group itself
--   cohort_members      — membership + display alias + role
--   cohort_progress     — per-member, per-week completion timestamps
--   cohort_prayers      — group prayer thread
--
-- All four tables enable RLS. Reads of group data are gated to
-- members of that group. Writes are gated to the row's owner.

create extension if not exists pgcrypto;

-- ── cohorts ─────────────────────────────────────────────────────
create table if not exists public.cohorts (
  id            uuid primary key default gen_random_uuid(),
  code          text not null unique check (char_length(code) between 4 and 24),
  name          text not null check (char_length(name) between 2 and 80),
  description   text,
  leader_id     uuid not null references auth.users(id) on delete cascade,
  starts_on     date,
  course        text not null default 'foundations',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists cohorts_leader_idx on public.cohorts(leader_id);
create index if not exists cohorts_code_idx on public.cohorts(code);

alter table public.cohorts enable row level security;

drop policy if exists "cohorts_select_member"  on public.cohorts;
drop policy if exists "cohorts_select_code"    on public.cohorts;
drop policy if exists "cohorts_insert_leader"  on public.cohorts;
drop policy if exists "cohorts_update_leader"  on public.cohorts;
drop policy if exists "cohorts_delete_leader"  on public.cohorts;

-- Any member can read their own cohort
create policy "cohorts_select_member"
  on public.cohorts for select
  using (
    leader_id = auth.uid()
    or id in (
      select cohort_id from public.cohort_members
      where user_id = auth.uid()
    )
  );

-- A signed-in believer creates a cohort as its leader
create policy "cohorts_insert_leader"
  on public.cohorts for insert
  with check ( auth.uid() is not null and leader_id = auth.uid() );

create policy "cohorts_update_leader"
  on public.cohorts for update
  using ( leader_id = auth.uid() )
  with check ( leader_id = auth.uid() );

create policy "cohorts_delete_leader"
  on public.cohorts for delete
  using ( leader_id = auth.uid() );

-- ── cohort_members ──────────────────────────────────────────────
create table if not exists public.cohort_members (
  id           uuid primary key default gen_random_uuid(),
  cohort_id    uuid not null references public.cohorts(id) on delete cascade,
  user_id      uuid not null references auth.users(id) on delete cascade,
  alias        text not null check (char_length(alias) between 1 and 60),
  role         text not null default 'member' check (role in ('leader', 'member')),
  joined_at    timestamptz not null default now(),
  unique(cohort_id, user_id)
);

create index if not exists cohort_members_cohort_idx on public.cohort_members(cohort_id);
create index if not exists cohort_members_user_idx on public.cohort_members(user_id);

alter table public.cohort_members enable row level security;

drop policy if exists "members_select_same_cohort" on public.cohort_members;
drop policy if exists "members_insert_self"        on public.cohort_members;
drop policy if exists "members_update_self"        on public.cohort_members;
drop policy if exists "members_delete_self"        on public.cohort_members;
drop policy if exists "members_delete_by_leader"   on public.cohort_members;

-- Members can see all members of cohorts they belong to
create policy "members_select_same_cohort"
  on public.cohort_members for select
  using (
    cohort_id in (
      select id from public.cohorts
      where leader_id = auth.uid()
    )
    or cohort_id in (
      select cohort_id from public.cohort_members
      where user_id = auth.uid()
    )
  );

-- Self-join (the join_cohort RPC actually performs this; direct INSERT
-- is also allowed as long as user_id matches auth.uid())
create policy "members_insert_self"
  on public.cohort_members for insert
  with check ( auth.uid() is not null and user_id = auth.uid() );

-- Members can update their own alias / role (role only via leader RPC; client-side
-- check enforces alias-only edits)
create policy "members_update_self"
  on public.cohort_members for update
  using ( user_id = auth.uid() )
  with check ( user_id = auth.uid() );

-- A member can leave on their own
create policy "members_delete_self"
  on public.cohort_members for delete
  using ( user_id = auth.uid() );

-- A leader can remove any member from their cohort
create policy "members_delete_by_leader"
  on public.cohort_members for delete
  using (
    cohort_id in (
      select id from public.cohorts where leader_id = auth.uid()
    )
  );

-- ── cohort_progress ─────────────────────────────────────────────
create table if not exists public.cohort_progress (
  id            uuid primary key default gen_random_uuid(),
  cohort_id     uuid not null references public.cohorts(id) on delete cascade,
  user_id       uuid not null references auth.users(id) on delete cascade,
  week          int not null check (week between 1 and 12),
  completed_at  timestamptz not null default now(),
  unique(cohort_id, user_id, week)
);

create index if not exists cohort_progress_cohort_idx on public.cohort_progress(cohort_id);

alter table public.cohort_progress enable row level security;

drop policy if exists "progress_select_same_cohort" on public.cohort_progress;
drop policy if exists "progress_insert_self"        on public.cohort_progress;
drop policy if exists "progress_delete_self"        on public.cohort_progress;

-- Visible to anyone in the same cohort
create policy "progress_select_same_cohort"
  on public.cohort_progress for select
  using (
    cohort_id in (
      select id from public.cohorts where leader_id = auth.uid()
    )
    or cohort_id in (
      select cohort_id from public.cohort_members
      where user_id = auth.uid()
    )
  );

-- Members publish their own progress only
create policy "progress_insert_self"
  on public.cohort_progress for insert
  with check ( auth.uid() is not null and user_id = auth.uid() );

create policy "progress_delete_self"
  on public.cohort_progress for delete
  using ( user_id = auth.uid() );

-- ── cohort_prayers ──────────────────────────────────────────────
create table if not exists public.cohort_prayers (
  id            uuid primary key default gen_random_uuid(),
  cohort_id     uuid not null references public.cohorts(id) on delete cascade,
  user_id       uuid not null references auth.users(id) on delete cascade,
  alias         text not null check (char_length(alias) between 1 and 60),
  body          text not null check (char_length(body) between 3 and 600),
  created_at    timestamptz not null default now()
);

create index if not exists cohort_prayers_cohort_idx
  on public.cohort_prayers(cohort_id, created_at desc);

alter table public.cohort_prayers enable row level security;

drop policy if exists "prayers_select_same_cohort" on public.cohort_prayers;
drop policy if exists "prayers_insert_self"        on public.cohort_prayers;
drop policy if exists "prayers_delete_self"        on public.cohort_prayers;
drop policy if exists "prayers_delete_by_leader"   on public.cohort_prayers;

create policy "prayers_select_same_cohort"
  on public.cohort_prayers for select
  using (
    cohort_id in (
      select id from public.cohorts where leader_id = auth.uid()
    )
    or cohort_id in (
      select cohort_id from public.cohort_members
      where user_id = auth.uid()
    )
  );

create policy "prayers_insert_self"
  on public.cohort_prayers for insert
  with check ( auth.uid() is not null and user_id = auth.uid() );

create policy "prayers_delete_self"
  on public.cohort_prayers for delete
  using ( user_id = auth.uid() );

create policy "prayers_delete_by_leader"
  on public.cohort_prayers for delete
  using (
    cohort_id in (
      select id from public.cohorts where leader_id = auth.uid()
    )
  );

-- ── join_cohort RPC: join by code, atomic ────────────────────────
create or replace function public.join_cohort(the_code text, the_alias text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  c_id uuid;
begin
  if uid is null then
    raise exception 'authentication required';
  end if;

  select id into c_id from cohorts where code = upper(trim(the_code));
  if c_id is null then
    raise exception 'cohort_not_found';
  end if;

  insert into cohort_members(cohort_id, user_id, alias, role)
  values (c_id, uid, left(trim(the_alias), 60), 'member')
  on conflict (cohort_id, user_id) do update
    set alias = excluded.alias;

  return c_id;
end;
$$;

grant execute on function public.join_cohort(text, text) to authenticated;

-- ── publish_week_complete RPC ────────────────────────────────────
create or replace function public.publish_week_complete(c_id uuid, the_week int)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
begin
  if uid is null then
    raise exception 'authentication required';
  end if;

  if not exists (
    select 1 from cohort_members where cohort_id = c_id and user_id = uid
    union
    select 1 from cohorts where id = c_id and leader_id = uid
  ) then
    raise exception 'not_a_member';
  end if;

  insert into cohort_progress(cohort_id, user_id, week)
  values (c_id, uid, the_week)
  on conflict (cohort_id, user_id, week) do nothing;
end;
$$;

grant execute on function public.publish_week_complete(uuid, int) to authenticated;

-- ── touch updated_at on cohort updates ──────────────────────────
drop trigger if exists cohorts_touch on public.cohorts;
create trigger cohorts_touch
  before update on public.cohorts
  for each row execute function public.touch_updated_at();
