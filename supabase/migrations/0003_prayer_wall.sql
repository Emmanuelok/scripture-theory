-- Scripture Theory · two-way intercession (the "Prayer Wall")
--
-- One believer posts a short prayer request; the global Body sees it
-- and any signed-in believer can pray for it. No DMs, no reply chains
-- — just one-way intercession. The requester sees how many believers
-- have lifted them up.
--
-- Tables:
--   prayer_requests        — a believer's request (anonymous-friendly)
--   prayer_intercessions   — who prayed for what (one row per pair;
--                            counter is N unique intercessors)
--   prayer_request_flags   — abuse / off-topic flags for moderation
--
-- All three tables enable RLS. Reads are public (open requests
-- only). Writes are gated to authenticated users. A believer can
-- always read / edit / delete their own posts; the prayer counter is
-- updated server-side via the pray_for RPC.

create extension if not exists pgcrypto;

-- ── prayer_requests ────────────────────────────────────────────
create table if not exists public.prayer_requests (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references auth.users(id) on delete set null,
  alias           text,
  body            text not null check (char_length(body) between 5 and 600),
  language        text not null default 'en',
  status          text not null default 'open',  -- 'open' | 'answered' | 'hidden'
  prayer_count    int not null default 0,
  flagged_count   int not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists prayer_requests_status_created_idx
  on public.prayer_requests(status, created_at desc);
create index if not exists prayer_requests_user_idx
  on public.prayer_requests(user_id);

alter table public.prayer_requests enable row level security;

drop policy if exists "requests_select_open"   on public.prayer_requests;
drop policy if exists "requests_select_own"    on public.prayer_requests;
drop policy if exists "requests_insert_self"   on public.prayer_requests;
drop policy if exists "requests_update_self"   on public.prayer_requests;
drop policy if exists "requests_delete_self"   on public.prayer_requests;

-- Anyone (including anon) can read open or answered requests.
create policy "requests_select_open"
  on public.prayer_requests for select
  using ( status in ('open', 'answered') );

-- The owner can always see their own (including hidden).
create policy "requests_select_own"
  on public.prayer_requests for select
  using ( user_id is not null and auth.uid() = user_id );

-- Signed-in users can insert their own; user_id must match (or NULL for
-- explicit anonymous posts, but we still require an auth session).
create policy "requests_insert_self"
  on public.prayer_requests for insert
  with check (
    auth.uid() is not null
    and (user_id is null or user_id = auth.uid())
  );

-- Owners can update body / status / alias on their own posts.
-- Note: prayer_count and flagged_count must NOT be writable from the
-- client; we update those only via RPCs (security definer) below.
create policy "requests_update_self"
  on public.prayer_requests for update
  using ( user_id is not null and auth.uid() = user_id )
  with check ( user_id = auth.uid() );

create policy "requests_delete_self"
  on public.prayer_requests for delete
  using ( user_id is not null and auth.uid() = user_id );

-- ── prayer_intercessions ──────────────────────────────────────
-- Unique (request, intercessor) — one row per pair, no inflation.
create table if not exists public.prayer_intercessions (
  id                    uuid primary key default gen_random_uuid(),
  request_id            uuid not null references public.prayer_requests(id) on delete cascade,
  intercessor_user_id   uuid not null references auth.users(id) on delete cascade,
  prayed_at             timestamptz not null default now(),
  unique(request_id, intercessor_user_id)
);

create index if not exists prayer_intercessions_request_idx
  on public.prayer_intercessions(request_id);
create index if not exists prayer_intercessions_user_idx
  on public.prayer_intercessions(intercessor_user_id);

alter table public.prayer_intercessions enable row level security;

drop policy if exists "intercessions_select_own"    on public.prayer_intercessions;
drop policy if exists "intercessions_select_owner"  on public.prayer_intercessions;

-- An intercessor can see their own rows ("things I've prayed for").
create policy "intercessions_select_own"
  on public.prayer_intercessions for select
  using ( auth.uid() = intercessor_user_id );

-- The original requester can see who has prayed for them (by user_id,
-- not by name — the alias on prayer_requests is for display only).
create policy "intercessions_select_owner"
  on public.prayer_intercessions for select
  using (
    request_id in (
      select id from public.prayer_requests
      where user_id is not null and user_id = auth.uid()
    )
  );

-- Inserts happen ONLY through the pray_for RPC below. No direct
-- INSERT / UPDATE / DELETE policy is granted.

-- ── prayer_request_flags ──────────────────────────────────────
create table if not exists public.prayer_request_flags (
  id          uuid primary key default gen_random_uuid(),
  request_id  uuid not null references public.prayer_requests(id) on delete cascade,
  by_user_id  uuid not null references auth.users(id) on delete cascade,
  reason      text,
  at          timestamptz not null default now(),
  unique(request_id, by_user_id)
);

alter table public.prayer_request_flags enable row level security;

drop policy if exists "flags_select_own"   on public.prayer_request_flags;
drop policy if exists "flags_insert_self"  on public.prayer_request_flags;

create policy "flags_select_own"
  on public.prayer_request_flags for select
  using ( auth.uid() = by_user_id );

create policy "flags_insert_self"
  on public.prayer_request_flags for insert
  with check ( auth.uid() is not null and by_user_id = auth.uid() );

-- ── pray_for RPC: atomic intercession + counter update ────────
create or replace function public.pray_for(req_id uuid)
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  new_count int;
begin
  if uid is null then
    raise exception 'authentication required';
  end if;

  -- Idempotent: same believer praying again doesn't inflate the counter
  insert into prayer_intercessions(request_id, intercessor_user_id)
  values (req_id, uid)
  on conflict (request_id, intercessor_user_id) do nothing;

  update prayer_requests
  set prayer_count = (
    select count(*) from prayer_intercessions where request_id = req_id
  ),
  updated_at = now()
  where id = req_id and status in ('open', 'answered')
  returning prayer_count into new_count;

  return coalesce(new_count, 0);
end;
$$;

grant execute on function public.pray_for(uuid) to authenticated;

-- ── flag_request RPC: idempotent flag + counter update ────────
create or replace function public.flag_prayer_request(req_id uuid, the_reason text)
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  new_count int;
begin
  if uid is null then
    raise exception 'authentication required';
  end if;

  insert into prayer_request_flags(request_id, by_user_id, reason)
  values (req_id, uid, the_reason)
  on conflict (request_id, by_user_id) do nothing;

  update prayer_requests
  set flagged_count = (
    select count(*) from prayer_request_flags where request_id = req_id
  ),
  -- Auto-hide once three distinct believers have flagged
  status = case
    when (select count(*) from prayer_request_flags where request_id = req_id) >= 3
    then 'hidden'
    else status
  end,
  updated_at = now()
  where id = req_id
  returning flagged_count into new_count;

  return coalesce(new_count, 0);
end;
$$;

grant execute on function public.flag_prayer_request(uuid, text) to authenticated;

-- ── touch updated_at ──────────────────────────────────────────
drop trigger if exists prayer_requests_touch on public.prayer_requests;
create trigger prayer_requests_touch
  before update on public.prayer_requests
  for each row execute function public.touch_updated_at();
