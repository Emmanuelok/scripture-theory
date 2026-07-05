# Architecture

A map of Scripture Theory for a new engineer (or a fresh AI session). Pair
this with `README.md` (product/setup) and `supabase/migrations/README.md`
(database).

## The shape in one paragraph

A Next.js 16 **App Router** site (React 18, TypeScript strict, Tailwind 3),
deployed on Vercel as a PWA. Almost everything is **static or ISR** and works
with **zero configuration** — the Bible, devotionals, courses, glossary,
liturgical calendar and daily-rotation content are all local editorial data.
Optional cloud features (auth, profile sync, prayer wall, testimonies, the
Project 1M "Wall of Yeses", admin queues) light up only when Supabase env vars
are present; every cloud call degrades to a no-op/empty state otherwise. There
are **no LLM dependencies** and, by editorial rule, no AI-generated Scripture
or theology.

## Layout

| Dir | Role |
|---|---|
| `app/` | Routes. Public pages, `app/api/*` route handlers, feeds, OG images (`opengraph-image.tsx`), `sitemap.ts`, `robots.ts`, `manifest.ts`, `error.tsx`/`global-error.tsx`. |
| `components/` | ~120 client/server components. Biggest: `TodayDashboard`, `BibleChapter`, `MeDashboard`, `SecretPlace`, `CloudOfWitnesses`, map widgets. |
| `data/` | All editorial content as typed TS modules — `bible/` canon+translations, `resources/` glossary+topics, `nations.ts`, course material, devotionals, hymns, catechism, liturgical calendar. Pure data, no side effects. |
| `lib/` | Pure libraries and client hooks — `supabase.ts` client, `profile.ts` (on-device profile + `useProfile`), `cloud-sync.ts`, calendar/date math, `memorySchedule.ts` (spaced repetition), `bible.ts`/`bible-fetch.ts`, `overpass.ts`/`geocode.ts` (church finder), `rate-limit.ts`, `fetch-timeout.ts`. |
| `supabase/migrations/` | Authoritative Postgres schema + RLS (`0001`–`0009`). Apply in order. |
| `public/` | Static assets, PWA `manifest`, service worker `sw.js`. |
| `scripts/` | Data pipeline (`ingest-bible.mjs`, `esv-smoke.mjs`). |
| `tests/` | Vitest unit/data-invariant tests (`npm test`). |

## Data flow

**Reading Scripture.** `data/bible/canon.ts` defines the 66-book canon.
`lib/bible.ts` → `lib/bible-fetch.ts` fetches chapter text: public-domain
editions from bible-api.com (no key), ESV from Crossway when `ESV_API_KEY` is
set. Results are cached at the Next data layer (24h for public-domain, 1h for
ESV per Crossway terms). `/bible/[book]/[chapter]` and `/verse/...` are dynamic
(ISR); on a transient upstream failure they **throw** (→ `error.tsx`, retried)
rather than caching a failure page.

**On-device state.** `lib/profile.ts` is the source of truth per device — a
single `Profile` blob in `localStorage`, read/written through `useProfile()`,
kept in sync across tabs via `storage` + custom events. The Secret Place
(journals/prayers) stays device-local by default. "Slots" (`lib/slots.ts`)
namespace storage keys so multiple believers can share a device.

**Cloud sync (opt-in).** When signed in (`ProfileSyncBridge`, mounted in the
root layout), the profile pulls from Supabase `profiles`, merges with local via
`cloud-sync.mergeProfiles` (scalars: local wins; record collections:
union-merge by each collection's identity field — `verseId` for memory, `iso`
for nations, `id` for the rest), then debounced-pushes on change.

**Community surfaces.** Prayer wall (`prayer_requests` + `pray_for`/`flag`
RPCs), testimonies (editorial `pending`→`published` workflow), and the Wall of
Yeses (`sending_covenant` + `pray_for_yes`/`update_my_souls` RPCs) are all
Supabase tables. Reads are public (RLS-gated to safe rows/columns); writes go
through RLS policies and security-definer RPCs. Admin moderation is gated by an
`admin_emails` allowlist via `is_admin()`.

## Security model

- **RLS everywhere.** Every cloud table enables row-level security. Public
  reads are restricted to safe rows, and (migration `0009`) sensitive PII
  columns (`contact`, `device_id`, `user_id`) are revoked from the `anon` role
  so the public anon key can never read them; admins are `authenticated` and
  keep access. anon INSERTs are column-restricted so server-controlled fields
  can't be forged.
- **Headers.** `next.config.js` sets CSP, HSTS, X-Frame-Options, Referrer- and
  Permissions-Policy on every route.
- **API hardening.** External inputs validated + bounded; `lib/rate-limit.ts`
  guards the email intake path; all outbound fetches use
  `lib/fetch-timeout.ts`; the Overpass church query sanitizes/​clamps inputs.
- **Secrets.** Server-only keys (`ESV_API_KEY`, `RESEND_API_KEY`) are never
  sent to the client. See `.env.example`.

## Key decisions

- **Editorial guardrails are load-bearing.** No LLM/AI in Scripture or
  theology; no streaks/gamification; no DMs; Wall of Yeses shows first name +
  country only; privacy-by-default. Preserve these in every change.
- **Additive over destructive.** Cloud writes are additive; deletions are
  soft/flagged for audit; the profile blob has no destructive migrations.
- **Degrade, don't crash.** Missing env vars, upstream failures, and full/
  disabled `localStorage` are all handled as graceful no-ops.

## Working on it

```bash
npm install
npm run dev         # http://localhost:3000
npm run lint        # ESLint (flat config, eslint-config-next)
npm test            # Vitest — pure logic + data invariants
npx tsc --noEmit    # strict typecheck
npm run build       # production build
```

CI (`.github/workflows/ci.yml`) runs typecheck + lint + test + build on every
push/PR.
