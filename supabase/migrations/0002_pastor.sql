-- Scripture Theory · pastor + intro-request schema
--
-- Three tables:
--   church_claims        — a pastor's claim of a specific local church
--   intro_requests       — a disciple's "please reach back" request
--   intro_request_events — append-only audit trail for each request
--
-- A request lands on a pastor's dashboard if it targets a church they have
-- claimed, or (when the disciple chose "any pastor in my city") if its
-- target city matches one of the pastor's claimed cities.
--
-- Row-Level Security is enabled on all three. Disciples can only see their
-- own requests; pastors can only see requests routed to them; both write
-- only their own events.

-- ── church_claims ─────────────────────────────────────────────
create table if not exists public.church_claims (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  church_name     text not null,
  city            text not null,
  country         text not null,
  tradition       text,
  osm_id          text,
  service_times   text,
  contact_email   text,
  pastor_name     text,
  pastor_role     text,
  notes           text,
  verified        boolean not null default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists church_claims_user_idx on public.church_claims(user_id);
create index if not exists church_claims_city_idx on public.church_claims(lower(city));

alter table public.church_claims enable row level security;

drop policy if exists "claims_select_own"   on public.church_claims;
drop policy if exists "claims_insert_own"   on public.church_claims;
drop policy if exists "claims_update_own"   on public.church_claims;
drop policy if exists "claims_delete_own"   on public.church_claims;

create policy "claims_select_own"
  on public.church_claims for select
  using ( auth.uid() = user_id );

create policy "claims_insert_own"
  on public.church_claims for insert
  with check ( auth.uid() = user_id );

create policy "claims_update_own"
  on public.church_claims for update
  using ( auth.uid() = user_id )
  with check ( auth.uid() = user_id );

create policy "claims_delete_own"
  on public.church_claims for delete
  using ( auth.uid() = user_id );

-- ── intro_requests ────────────────────────────────────────────
create table if not exists public.intro_requests (
  id                  uuid primary key default gen_random_uuid(),
  disciple_user_id    uuid references auth.users(id) on delete set null,
  alias               text,
  contact             text,
  stage               smallint check (stage between 1 and 12),
  note                text,
  target_claim_id     uuid references public.church_claims(id) on delete set null,
  target_city         text,
  target_country      text,
  status              text not null default 'pending',
  pastor_user_id      uuid references auth.users(id) on delete set null,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index if not exists intro_requests_disciple_idx
  on public.intro_requests(disciple_user_id);
create index if not exists intro_requests_target_claim_idx
  on public.intro_requests(target_claim_id);
create index if not exists intro_requests_target_city_idx
  on public.intro_requests(lower(target_city));
create index if not exists intro_requests_status_idx
  on public.intro_requests(status);

alter table public.intro_requests enable row level security;

drop policy if exists "intro_select_disciple"  on public.intro_requests;
drop policy if exists "intro_select_pastor"    on public.intro_requests;
drop policy if exists "intro_insert_any"       on public.intro_requests;
drop policy if exists "intro_update_pastor"    on public.intro_requests;
drop policy if exists "intro_delete_disciple"  on public.intro_requests;

-- A disciple can read their own rows.
create policy "intro_select_disciple"
  on public.intro_requests for select
  using ( disciple_user_id is not null and auth.uid() = disciple_user_id );

-- A pastor can read rows routed to one of their claimed churches.
create policy "intro_select_pastor"
  on public.intro_requests for select
  using (
    target_claim_id in (
      select id from public.church_claims where user_id = auth.uid()
    )
    or (
      target_claim_id is null
      and target_city is not null
      and lower(target_city) in (
        select lower(city) from public.church_claims where user_id = auth.uid()
      )
    )
  );

-- Anyone authenticated can submit a request for themselves (or anonymously
-- by setting disciple_user_id NULL — only allowed from a signed-in session).
create policy "intro_insert_any"
  on public.intro_requests for insert
  with check (
    auth.uid() is not null
    and (disciple_user_id is null or disciple_user_id = auth.uid())
  );

-- A pastor can update the status / claim ownership of a request routed to
-- them. We rely on the SELECT policy above to gate which rows match.
create policy "intro_update_pastor"
  on public.intro_requests for update
  using (
    target_claim_id in (
      select id from public.church_claims where user_id = auth.uid()
    )
    or (
      target_claim_id is null
      and target_city is not null
      and lower(target_city) in (
        select lower(city) from public.church_claims where user_id = auth.uid()
      )
    )
  )
  with check ( pastor_user_id is null or pastor_user_id = auth.uid() );

-- A disciple can delete their own request (cancel).
create policy "intro_delete_disciple"
  on public.intro_requests for delete
  using ( disciple_user_id is not null and auth.uid() = disciple_user_id );

-- ── intro_request_events ──────────────────────────────────────
create table if not exists public.intro_request_events (
  id          uuid primary key default gen_random_uuid(),
  request_id  uuid not null references public.intro_requests(id) on delete cascade,
  by_user_id  uuid references auth.users(id) on delete set null,
  status      text not null,
  note        text,
  at          timestamptz not null default now()
);

create index if not exists intro_events_request_idx
  on public.intro_request_events(request_id);

alter table public.intro_request_events enable row level security;

drop policy if exists "events_select_visible"  on public.intro_request_events;
drop policy if exists "events_insert_visible"  on public.intro_request_events;

-- You can see events for a request you can see.
create policy "events_select_visible"
  on public.intro_request_events for select
  using (
    request_id in (
      select id from public.intro_requests
    )
  );

-- You can insert events for a request you can see; by_user_id must be you.
create policy "events_insert_visible"
  on public.intro_request_events for insert
  with check (
    by_user_id = auth.uid()
    and request_id in (
      select id from public.intro_requests
    )
  );

-- ── touch updated_at on church_claims & intro_requests ────────
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists church_claims_touch on public.church_claims;
create trigger church_claims_touch
  before update on public.church_claims
  for each row execute function public.touch_updated_at();

drop trigger if exists intro_requests_touch on public.intro_requests;
create trigger intro_requests_touch
  before update on public.intro_requests
  for each row execute function public.touch_updated_at();
