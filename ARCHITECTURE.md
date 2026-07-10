# Architecture

A map of Scripture Theory for a new engineer (or a fresh AI session). Pair
this with `README.md` (product/setup) and `supabase/migrations/README.md`
(database).

## The shape in one paragraph

A Next.js 16 **App Router** site (React 18, TypeScript strict, Tailwind 3),
deployed on Vercel as a PWA. Almost everything is static or ISR and works with
zero configuration. Optional cloud features (auth, profile sync, prayer wall,
testimonies, Project 1M, admin queues) light up only when Supabase env vars are
present. The Bible uses a local seed plus verified public-domain runtime
providers; the licensed ESV appears only when its server-only key is present.
There are no LLM dependencies and, by editorial rule, no AI-generated
Scripture or theology.

## Layout

| Dir                    | Role                                                                                                                                                     |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/`                 | Routes, `app/api/*` handlers, feeds, OG images, sitemap, robots, manifest, and error/loading boundaries.                                                 |
| `components/`          | Client/server UI. `BibleChapter` owns interactive reader state; routes keep data fetching server-side.                                                   |
| `data/`                | Typed editorial content. `data/bible/translations.ts` is the source of truth for provider, coverage, BCP-47 language, license, and attribution metadata. |
| `lib/`                 | Pure libraries and provider adapters: `bible.ts`, `bible-fetch.ts`, Supabase/profile/cloud sync, calendar math, rate limiting, and fetch timeouts.       |
| `supabase/migrations/` | Authoritative Postgres schema + RLS (`0001`–`0009`). Apply in order.                                                                                     |
| `public/`              | Static assets and the PWA service worker. Licensed Bible responses are explicitly excluded from Cache Storage.                                           |
| `scripts/`             | Targeted Bible ingestion plus read-only public/ESV provider smoke checks.                                                                                |
| `tests/`               | Vitest unit, parser, registry, and data-invariant tests.                                                                                                 |

## Bible data flow

`data/bible/canon.ts` defines the 66-book canon and
`data/bible/translations.ts` defines 21 catalogued editions. Delivery status is
explicit, not inferred:

- 15 verified public-domain editions use bible-api.com's structured
  `/data/{translation}/{USFM book}/{chapter}` endpoint. The adapter maintains a
  complete 66-book USFM mapping and filters New-Testament-only editions before
  they reach the reader.
- ESV uses Crossway's `/v3/passage/text/` endpoint only when `ESV_API_KEY` is
  configured. The token never reaches the client. Best-effort per-caller and
  per-instance guards target Crossway's published minute/hour/day limits, use `cache: no-store`, return
  `Cache-Control: private, no-store`, display attribution, and are network-only
  in the PWA.
- Five historical editions currently have verified local selections. They are
  labelled “selected passages” rather than being advertised as full runtime
  Bibles. Provider catalog metadata alone is not treated as proof that chapter
  endpoints work.

`lib/bible.ts` resolves local ingested text, then the hand seed, then a
configured provider that covers the requested testament. A chapter page
preloads only public WEB text; licensed translations always load through the
client API seam so they cannot enter cached HTML/RSC pages. Reader state is
shareable as `?translation=ESV&compare=KJV,WEB`; the URL takes precedence over
the saved on-device preference.

Public-domain chapter responses may be cached for 24 hours at the Next data
layer and after first open in the PWA. ESV is never stored offline. Valid
provider failures use structured 5xx/429 responses and remain `no-store`, so a
temporary upstream problem cannot become a cached missing chapter.

The public API is not a bulk-download transport. `npm run ingest-bible`
requires explicit books and translations, caps requests, and stays below the
provider request ceiling. Full-canon ingestion must use publishers' source
archives.

## Other data flows

**On-device state.** `lib/profile.ts` is the source of truth per device — a
single Profile blob in `localStorage`, read/written through `useProfile()`,
kept in sync across tabs. The Secret Place stays device-local by default.
“Slots” (`lib/slots.ts`) namespace storage keys so several believers can share
a device.

**Cloud sync (opt-in).** When signed in, `ProfileSyncBridge` pulls from
Supabase `profiles`, merges with local via `cloud-sync.mergeProfiles`, then
debounced-pushes on change. Record collections union-merge using their real
identity fields (`verseId`, `iso`, or `id`).

**Community surfaces.** Prayer wall, testimonies, and the Wall of Yeses are
Supabase tables guarded by RLS and security-definer RPCs. Admin moderation is
gated by the `admin_emails` allowlist through `is_admin()`.

## Security model

- **RLS everywhere.** Public reads are restricted to safe rows and sensitive
  PII columns are revoked from the anonymous role.
- **Headers.** `next.config.js` sets CSP, HSTS, X-Frame-Options, Referrer- and
  Permissions-Policy on every route.
- **API hardening.** Inputs are validated and bounded; expensive integrations
  use best-effort per-caller/provider rate limits and every external request has
  a timeout.
- **Secrets.** Server-only keys (`ESV_API_KEY`, `RESEND_API_KEY`) are never
  serialized to clients or committed. See `.env.example`.

## Key decisions

- **Editorial guardrails are load-bearing.** No LLM/AI in Scripture or
  theology; no streaks/gamification; no DMs; first name + country only on the
  public wall; privacy by default.
- **Availability must be truthful.** A catalog record, seed chapter, configured
  provider, and offline-ready full Bible are different states and the UI names
  them precisely.
- **Additive over destructive.** Cloud writes are additive; deletions are
  soft/flagged for audit; profile migrations are non-destructive.
- **Degrade, don't crash.** Missing env vars, upstream failures, and disabled or
  full local storage are handled as visible, recoverable states.

## Working on it

```bash
npm install
npm run dev
npm run lint
npm test
npx tsc --noEmit
npm run build
npm run smoke:bible-api
ESV_API_KEY=… npm run smoke:esv
```

CI runs typecheck, lint, tests, and the production build on every push and pull
request. Provider smoke tests remain explicit because CI should not depend on
third-party network uptime or consume licensed quotas.
