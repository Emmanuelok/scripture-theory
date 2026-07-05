# OPERATION V10 — UPGRADE REPORT

**Platform:** Scripture Theory · **Branch:** `claude/platform-comprehensive-upgrade-l5kwn7`
**Run date:** 2026-07-05 · **Base commit:** `d263f2f` (main untouched)

## 1. Executive summary

This run took an already-rich, working 90k-LOC Next.js 16 discipleship platform
from **v1 to a hardened, verified v10 — in place, without a rewrite**. The
guiding constraint was the protocol's own prime directive: never break working
functionality. A 14-domain multi-agent audit surfaced **38 confirmed findings
(3 Critical, 24 High) plus 123 medium/low**; the highest-severity cluster —
PII exposed to the public anon key, a write-authorization hole, and silent
cross-device data loss — is now closed. The platform gained a full security
header/CSP layer, input hardening and timeouts on every external call, real
error boundaries, a restored lint gate, a first test suite (24 tests) and CI,
lazy-loaded maps, and a mobile navigation it previously lacked entirely. Every
one of the 9 commits left `tsc`, `lint`, `test`, and `build` green, and the
editorial guardrails (no AI in Scripture, no gamification, privacy-by-default,
first-name+country on the public wall) were preserved throughout.

## 2. Metrics — before → after

| Metric | Before (v1) | After (v10) |
|---|---|---|
| Build | ✅ green, ~12.3s compile, 188 routes | ✅ green, ~10.7s compile, **189** routes (+`/api/health`) |
| TypeScript (`tsc --noEmit`) | ✅ 0 errors (strict) | ✅ 0 errors (strict) |
| Lint | ❌ **broken** (`next lint` removed in Next 16, no config) | ✅ **0 errors** (86 warnings), ESLint flat config + CI |
| Tests | ❌ none, no runner | ✅ **24 passing** (Vitest), 6 files, wired into CI |
| Dependency audit | 2 moderate (0 critical/high) | **2 moderate, 0 critical/high** (both = Next-bundled postcss) |
| Security headers / CSP | ❌ none | ✅ **7** headers incl. CSP, on every route |
| Error boundaries | ❌ 0 | ✅ **2** (`error.tsx`, `global-error.tsx`) + scoped `loading.tsx` |
| External-fetch timeouts | ❌ 0 (unbounded) | ✅ all (overpass, geocode, bible-api, ESV, news, Resend) |
| CI pipeline | ❌ none | ✅ GitHub Actions: tsc + lint + test + build |
| DB migrations | 0001–0008 | 0001–**0009** (PII column hardening) |
| `.env.example` coverage | 2 of 10 vars | **10 of 10** documented |
| Architecture doc | ❌ none | ✅ `ARCHITECTURE.md` |

## 3. Changes by domain

### Domain 1 — Security & Hardening (`5ac0959`, `0976a77`)
- **[Critical] Migration `0009`** — testimonies `contact` (email/phone) and
  `device_id`, sending `device_id`, and prayer-request `user_id` were readable
  by anyone holding the public anon key (it ships in the client bundle). The
  table-level SELECT is revoked from `anon` and re-granted on safe columns
  only; anon INSERTs are column-restricted so counters/timestamps/moderation
  flags can't be forged. Admins are `authenticated` and keep full access.
- **[Critical]** The `device_id` leak defeated migration 0008's `update_my_souls`
  hardening (a leaked id+device_id let anyone rewrite a believer's souls
  count) — closed by the same column revoke.
- **CSP + headers** (`next.config.js`): Content-Security-Policy, HSTS,
  X-Content-Type-Options, X-Frame-Options DENY, Referrer-Policy,
  Permissions-Policy, `X-Powered-By` disabled.
- **Overpass QL injection** (`lib/overpass.ts`): denomination tokens sanitized
  to `[a-z0-9_-]`, coordinates/radius clamped before interpolation.
- Intake **rate limiting** (5/IP/hour) on the email path; bible chapter param
  bounded to `1..book.chapters`; geocode query length-capped; raw error objects
  no longer returned to clients.

### Domain 2 — Performance (`78f7caa`)
- `WorldMap` (/pray/live) and `BibleLandsMap` (/atlas) load via `next/dynamic`
  (`ssr:false`) — d3-geo + topojson-client out of those pages' initial JS.
- `SearchView` + `GlossaryView` filter against `useDeferredValue` and sort the
  corpus once — full-corpus scans no longer block typing on the heaviest pages.

### Domain 3 — Reliability & Resilience (`0976a77`, `6b45be1`, `5dab49a`)
- First **error boundaries** in the app (`error.tsx`, `global-error.tsx`) + a
  scoped Bible `loading.tsx`.
- Bible **chapter** page (ISR) throws on transient upstream failure so the
  failure is retried, not cached for the 24h revalidate window; the **verse**
  permalink (dynamic share target) degrades to a graceful 200 fallback. API
  route sets `no-store` on failure responses.
- **Timeouts** on every external fetch (`lib/fetch-timeout.ts`).
- Reader `localStorage.setItem` guarded so a quota error can't crash the reader.

### Domain 4 — Code Quality (`ae1b7e5`)
- Pruned dead cross-references in editorial data (below); shared the nav-link
  list between desktop/mobile nav; extracted `fetchWithTimeout`/`rateLimit`
  helpers used across routes.

### Domain 5 — Testing & Verification (`ae1b7e5`)
- Vitest added (node env, `@/` alias). 24 tests: `mergeProfiles` union-merge,
  `memorySchedule`/`places` regression tests, `rate-limit`, `fetch-timeout`,
  and data invariants (canon 66 books, unique ids, no dangling glossary/topic
  cross-refs).

### Domain 6 — Data Integrity (`5ac0959`)
- **[Critical] `mergeProfiles`** union-merged only 11 id-keyed collections; the
  memory array (keyed by `verseId`), nations (`iso`), and family-altar were
  overwritten wholesale, so a leaner blob from one device silently wiped
  another's Scripture-memory progress. Now union-merged by each collection's
  real identity field. (The audit's suggested "add memory to the id-list" fix
  would have *deleted* memory records, which have no `id` — caught in review.)

### Domain 7 — Accessibility (`ccbcebd`)
- **Mobile navigation** added (was entirely hidden < md with no replacement):
  accessible hamburger + collapsible panel, `aria-expanded/controls`, Escape to
  close, 44px target. Skip-to-content link + `<main id="main">`.

### Domain 8 — SEO (`ccbcebd`)
- `robots.ts`: `/me` was a prefix that also blocked `/memory` (sitemap-promoted)
  — anchored to `/me$`. `metadataBase` now honours `NEXT_PUBLIC_SITE_URL`.

### Domain 9 — Observability (`6b45be1`)
- `/api/health` liveness/readiness probe (reports integration config presence,
  never secret values); error boundaries log a server-side error seam.

### Domain 10 — Privacy (`5ac0959`)
- The PII column hardening (Domain 1) is the core privacy win: submitter emails,
  device ids, and auth user ids are no longer reachable with the public key.

### Domain 11 — UX Polish (`ccbcebd`)
- Cohort prayer composer no longer wipes a typed prayer on a failed post (keeps
  the text, shows an error). SecretPlace prayer/gratitude deletes now confirm
  before permanent removal.

### Domain 12 — DX & Docs (`ae1b7e5`)
- Restored `lint` on Next 16 (ESLint flat config + `eslint-config-next`);
  Prettier config + scripts; GitHub Actions CI; `engines` + `.nvmrc` (Node ≥20.9);
  completed `.env.example`; new `ARCHITECTURE.md`; README gates updated.

### Conditional modules (Phase 1.5)
- **Module A (AI/LLM):** not activated — zero LLM dependencies (verified),
  consistent with the editorial no-AI rule.
- **Module C (Payments):** only `/give` links out to external providers; no
  checkout/webhooks/client-trusted amounts — nothing to harden.
- **Module E (License/supply-chain):** 6 runtime deps, all permissive; lockfile
  integrity verified via `npm ci`; the only advisories are 2 moderate in Next's
  own bundled postcss (upstream-only fix).

### Bug fixes (execution-verified, with regression tests) — `ae1b7e5`
- `memorySchedule.dueVerses`: a redundant gate double-counted the monthly
  interval, hiding mastered verses for 60 days instead of 30.
- `places.placeFromText`: first-substring-match pinned "South Sudan" onto
  Khartoum; now prefers the longest matching keyword.
- Pruned 21 dangling glossary `related` slugs + 3 dangling topic `cross` slugs.

## 4. Flags

**Behavior changes (intentional, all hardening or bug fixes):**
- Migration `0009` reduces the `anon` role's privileges — a **hardening**. Public
  reads are unchanged (they never selected the revoked columns); admins are
  `authenticated` and unaffected. **This migration must be applied** in Supabase
  (`supabase db push` or run `0009_pii_column_hardening.sql`) for the fix to take
  effect in a deployed environment.
- Bible chapter/verse pages now surface an error boundary / graceful fallback on
  transient upstream failure instead of caching a broken page.
- Mobile users now see a navigation menu (new surface, additive).

**Secrets:** none found hardcoded in code, commits, or logs. No rotation
required from this run. Server-only keys (`ESV_API_KEY`, `RESEND_API_KEY`) remain
server-only.

**Residual (documented, not a regression):** column privileges were revoked from
`anon` only. A signed-in *authenticated* non-admin could still craft a query for
`contact`/`device_id` — closing that fully needs the view/RPC route (see DEFERRED).

## 5. DEFERRED — need a human decision

| Item | Recommendation | Effort |
|---|---|---|
| Full PII lockdown vs `authenticated` | Move public reads to security-barrier views; revoke base-table access from `authenticated` too | M |
| Cloud-sync deletion tombstones | Union merge resurrects records deleted on another device; needs a tombstone/`deletedAt` protocol | M |
| Account/email deletion (GDPR) | Supabase admin-side delete function + UI; auth account removal path | M |
| Major deps: React 19, Tailwind 4, TS 6 | Sequenced migrations; none required for a Critical/High fix | L–M each |
| Build-time Bible ingestion | Ingest all translations at build to drop the bible-api.com runtime dependency | M |
| God-component splits (MeDashboard 1598, SecretPlace 945, BibleChapter 925) | Decompose behind the new test suite | M–L |
| `/today` client data-shipping | Move nations/course/family-altar compute server-side (mirror the home-page fix) — deferred as high-risk on a core page without more tests | M |

## 6. Next-iteration targets (top 10)

1. Apply the DEFERRED full-PII-lockdown (views) so `authenticated` non-admins can't read PII columns either.
2. Cloud-sync deletion tombstones (stop resurrect-on-merge) + per-record `updatedAt` last-write-wins.
3. Move `/today` heavy data server-side; lazy-load supabase-js out of the shared baseline bundle.
4. Split the three god-components now that a test harness exists.
5. Add integration tests for the API route validation (intake, churches, bible) behind the new Vitest setup.
6. WCAG contrast + focus-visible pass in `globals.css` (needs visual review — deferred this run to avoid unverifiable regressions).
7. Sitemap completeness (track courses/weeks, nation pages) + JSON-LD for devotionals/courses; canonical URLs.
8. Modal focus-trap/Escape/scroll-lock across HymnModal, IntroRequestModal, etc.
9. Nonce-based CSP to drop `'unsafe-inline'` from `script-src`.
10. Server-side dedup/bounds on the anon-callable `pray_for_yes` RPC; bound `getTotalSouls` via an RPC sum (PostgREST 1000-row cap).

---

**Done:** branch `claude/platform-comprehensive-upgrade-l5kwn7` · **9 commits** ·
`tsc` + `lint` + `test` (24) + `build` all green on a clean `npm ci` ·
dependency audit shows **0 critical/high** · **main/master untouched** (base
`d263f2f` intact). Every prime directive honoured; every guardrail respected.
