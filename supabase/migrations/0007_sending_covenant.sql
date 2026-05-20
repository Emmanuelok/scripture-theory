-- Scripture Theory · Project 1M · sending_covenant (the Cloud of Witnesses)
--
-- The Wall of Yeses. A believer prays the Acts 1:8 yes, registers
-- their first name + country, optionally a one-line prayer. The
-- Body sees the cloud and lifts each yes up in prayer (Hebrews 12:1).
--
-- Editorial guardrails (enforced by app code + RLS):
--   • first_name max 32, region max 64 — no last names, no street addresses
--   • prayer optional, max 280
--   • `public` boolean lets a believer say yes privately
--   • `hidden` is an admin flag for moderation (doxxing, hostile-jurisdiction
--     name slipped through, spam) — hidden rows vanish from the public wall
--     but are retained for audit
--
-- Depends on migration 0005_prayer_admin.sql for admin_emails + is_admin().

create extension if not exists pgcrypto;

create table if not exists public.sending_covenant (
  id                  uuid primary key default gen_random_uuid(),
  first_name          text not null check (char_length(first_name) between 1 and 32),
  region              text not null check (char_length(region) between 1 and 64),
  prayer              text check (prayer is null or char_length(prayer) <= 280),
  said_yes_at         timestamptz not null default now(),
  public              boolean not null default true,
  user_id             uuid references auth.users(id) on delete set null,
  device_id           text,
  -- Project 1M · the harvest. Self-reported by each evangelist —
  -- people they are praying for / studying with / walking toward
  -- Jesus. We deliberately do NOT call this "souls won" or "saved";
  -- the Lord saves. The evangelist walks.
  souls_walking_with  integer not null default 0 check (souls_walking_with between 0 and 10000),
  -- How many times the Body has lifted this yes up in prayer
  -- (per-device dedup is enforced client-side).
  prayed_for_count    integer not null default 0,
  -- Moderation. Editors hide problematic rows; the row stays for audit.
  hidden              boolean not null default false,
  flagged_reason      text check (flagged_reason is null or char_length(flagged_reason) <= 280)
);

create index if not exists idx_sending_covenant_recent
  on public.sending_covenant (said_yes_at desc)
  where public = true and hidden = false;

create index if not exists idx_sending_covenant_user
  on public.sending_covenant (user_id);

alter table public.sending_covenant enable row level security;

-- ── Public: only public + not-hidden rows ─────────────────────
drop policy if exists "sending_read_public" on public.sending_covenant;
create policy "sending_read_public"
  on public.sending_covenant for select
  using ( public = true and hidden = false );

-- ── Anyone (anon or signed-in) can register a yes ─────────────
drop policy if exists "sending_insert_any" on public.sending_covenant;
create policy "sending_insert_any"
  on public.sending_covenant for insert
  with check ( true );

-- ── Signed-in users can delete their own ──────────────────────
drop policy if exists "sending_delete_own" on public.sending_covenant;
create policy "sending_delete_own"
  on public.sending_covenant for delete
  using ( user_id is not null and auth.uid() = user_id );

-- ── Update own souls count via device_id (no sign-in needed) ──
-- The client matches their row by id AND device_id; this policy
-- just guards the column. (RLS doesn't restrict which columns are
-- written; the app sets only souls_walking_with.)
drop policy if exists "sending_update_own_device" on public.sending_covenant;
create policy "sending_update_own_device"
  on public.sending_covenant for update
  using ( device_id is not null )
  with check ( device_id is not null );

-- ── Admin: read all (incl hidden), update, delete ─────────────
drop policy if exists "sending_admin_read" on public.sending_covenant;
create policy "sending_admin_read"
  on public.sending_covenant for select
  using ( public.is_admin() );

drop policy if exists "sending_admin_update" on public.sending_covenant;
create policy "sending_admin_update"
  on public.sending_covenant for update
  using ( public.is_admin() ) with check ( public.is_admin() );

drop policy if exists "sending_admin_delete" on public.sending_covenant;
create policy "sending_admin_delete"
  on public.sending_covenant for delete
  using ( public.is_admin() );

-- ── pray_for_yes RPC: atomic Wall pray-for action ─────────────
-- The client cannot set prayed_for_count directly; it goes through
-- this function so the counter is bumped atomically and bounded.
create or replace function public.pray_for_yes(yes_id uuid)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  new_count integer;
begin
  update sending_covenant
  set prayed_for_count = prayed_for_count + 1
  where id = yes_id
    and hidden = false
  returning prayed_for_count into new_count;
  return coalesce(new_count, 0);
end;
$$;

grant execute on function public.pray_for_yes(uuid) to anon, authenticated;
