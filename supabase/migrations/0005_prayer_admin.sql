-- Scripture Theory · admin allowlist + moderation policies
--
-- Centralises the maintainer allowlist (admin_emails) and the
-- is_admin() helper. Adds admin-read / admin-update / admin-delete
-- policies for the Prayer Wall so a maintainer can review hidden
-- and flagged requests via /admin/prayers.
--
-- The Wall of Yeses (sending_covenant) and Testimonies tables get
-- their admin policies in their own migrations / lib files; this
-- one is solely for the Prayer Wall + the shared allowlist.

-- ── admin_emails ──────────────────────────────────────────────
create table if not exists public.admin_emails (
  email text primary key
);

alter table public.admin_emails enable row level security;

-- Nobody can read the allowlist from the client (it's introspected
-- only via the is_admin() function below, which runs as definer).
drop policy if exists "admin_emails_no_select" on public.admin_emails;
-- (No policies = no access for anon/authenticated, which is what we want.)

-- ── is_admin() ────────────────────────────────────────────────
create or replace function public.is_admin() returns boolean
  language sql stable security definer
  set search_path = public
  as $$ select exists(select 1 from admin_emails where email = auth.email()) $$;

grant execute on function public.is_admin() to anon, authenticated;

-- ── Prayer Wall · admin read / update / delete ────────────────
-- The existing requests_select_open policy hides 'hidden' rows from
-- the public. Add an admin-only select so maintainers can see them.

drop policy if exists "requests_select_admin" on public.prayer_requests;
create policy "requests_select_admin"
  on public.prayer_requests for select
  using ( public.is_admin() );

drop policy if exists "requests_update_admin" on public.prayer_requests;
create policy "requests_update_admin"
  on public.prayer_requests for update
  using ( public.is_admin() ) with check ( public.is_admin() );

drop policy if exists "requests_delete_admin" on public.prayer_requests;
create policy "requests_delete_admin"
  on public.prayer_requests for delete
  using ( public.is_admin() );

-- Admins need to read the flag reasons (currently only the flagging
-- user can read their own row, so no one ever sees the full picture).
drop policy if exists "flags_select_admin" on public.prayer_request_flags;
create policy "flags_select_admin"
  on public.prayer_request_flags for select
  using ( public.is_admin() );

-- ── helper: fetch flag reasons for one request ────────────────
-- Returns (reason text, at timestamptz) rows. Definer-secured so
-- admins can read reasons without granting them blanket select on
-- prayer_request_flags directly (the policy above does grant that,
-- but this RPC is the cleaner client interface).
create or replace function public.admin_list_flag_reasons(req_id uuid)
returns table(reason text, at timestamptz)
language sql stable security definer
set search_path = public
as $$
  select reason, at
  from prayer_request_flags
  where request_id = req_id
    and public.is_admin()
  order by at desc
$$;

grant execute on function public.admin_list_flag_reasons(uuid) to authenticated;

-- ── helper: list requests by status (admin-only) ──────────────
-- Returns the same shape as the public table, including 'hidden'.
create or replace function public.admin_list_prayer_requests(
  the_status text,
  the_limit int default 100
) returns setof public.prayer_requests
language sql stable security definer
set search_path = public
as $$
  select *
  from prayer_requests
  where public.is_admin()
    and (the_status = 'all' or status = the_status)
  order by
    case when status = 'hidden' then 0 else 1 end,
    flagged_count desc,
    created_at desc
  limit greatest(1, least(coalesce(the_limit, 100), 500))
$$;

grant execute on function public.admin_list_prayer_requests(text, int) to authenticated;
