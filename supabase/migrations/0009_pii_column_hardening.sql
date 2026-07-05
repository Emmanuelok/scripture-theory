-- Scripture Theory · PII / integrity column hardening
--
-- Context (V10 audit — Critical/High findings):
--
--   1. `testimonies.contact` (a submitter's email / phone) and `device_id`
--      were world-readable. The public read policy `testimonies_read_published`
--      grants SELECT on every column of a published row, and Supabase's
--      default `GRANT SELECT ON ALL TABLES ... TO anon` means anyone holding
--      the public anon key (it ships in the client bundle) could
--      `select contact from testimonies where status='published'`.
--      The schema comments explicitly promise `contact` is "never public".
--
--   2. `sending_covenant.device_id` was world-readable via `sending_read_public`.
--      Migration 0008 correctly routed the souls-count write through the
--      `update_my_souls(id, device_id, n)` security-definer RPC, which
--      authorises by matching device_id — but because device_id itself was
--      readable, an anon caller could read any believer's (id, device_id)
--      pair and then call the RPC to overwrite their souls_walking_with.
--      The leak defeated the 0008 hardening.
--
--   3. `prayer_requests.user_id` was exposed on the public feed
--      (`listRequests` did `select *`), letting anyone correlate a person's
--      auth id across their sensitive prayer requests.
--
--   4. The `with check (true)` INSERT policies on `sending_covenant` and
--      `testimonies` let an anon caller forge server-controlled columns
--      (prayed_for_count, said_yes_at, hidden, published_at, user_id, ...).
--
-- Fix — column-level privileges scoped to the `anon` role:
--
--   Postgres note: a *table-level* SELECT grant makes a column-level REVOKE
--   ineffective (the table grant still exposes every column). So we REVOKE
--   the table-level privilege from `anon` and re-GRANT only the safe columns.
--   The `authenticated` role is untouched — admins are authenticated and
--   keep full access through the existing `*_admin_*` RLS policies; RLS still
--   gates *which rows* every role may see.
--
-- Behaviour preservation: the app's public reads already select only the
-- safe columns (see lib/testimonies-cloud.ts, lib/sending-cloud.ts,
-- lib/prayer-wall.ts), so no legitimate flow loses data. This is a
-- hardening (privilege reduction), flagged in UPGRADE_REPORT.md.
--
-- Reversible: to undo, `grant select, insert on <table> to anon;`.
--
-- Depends on: 0006_testimonies.sql, 0007_sending_covenant.sql,
--             0008_sending_update_hardening.sql, 0003_prayer_wall.sql.

-- ── testimonies ───────────────────────────────────────────────
-- anon may read only the public editorial fields of published rows
-- (RLS still restricts to status='published'); contact / device_id /
-- user_id / published_at are admin-only (authenticated + is_admin()).
revoke select on public.testimonies from anon;
grant  select (
  id, first_name, initials_only, place,
  before_text, encounter, now_text, verse,
  status, created_at
) on public.testimonies to anon;

-- anon may submit only the believer-authored columns; status is
-- constrained to 'pending' by the existing insert policy. id / user_id /
-- published_at / created_at fall back to their column defaults and cannot
-- be forged.
revoke insert on public.testimonies from anon;
grant  insert (
  first_name, initials_only, place,
  before_text, encounter, now_text, verse,
  contact, status, device_id
) on public.testimonies to anon;

-- ── sending_covenant (Wall of Yeses) ──────────────────────────
-- anon reads only the public wall fields; device_id / user_id /
-- flagged_reason are never exposed. `public` and `hidden` remain
-- readable because the client filters on them.
revoke select on public.sending_covenant from anon;
grant  select (
  id, first_name, region, prayer, said_yes_at,
  public, hidden, souls_walking_with, prayed_for_count
) on public.sending_covenant to anon;

-- anon may register a yes with only believer-authored columns; counters,
-- timestamps, moderation flags and user_id take their defaults and cannot
-- be forged. The souls count is written only via update_my_souls() (0008).
revoke insert on public.sending_covenant from anon;
grant  insert (
  first_name, region, prayer, public, device_id
) on public.sending_covenant to anon;

-- ── prayer_requests ───────────────────────────────────────────
-- anon reads the public feed without the poster's auth user_id.
-- (Writes already require an authenticated session — no anon INSERT.)
revoke select on public.prayer_requests from anon;
grant  select (
  id, alias, body, language, status,
  prayer_count, flagged_count, created_at, updated_at
) on public.prayer_requests to anon;
