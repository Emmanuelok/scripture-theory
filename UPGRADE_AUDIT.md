# OPERATION V10 — UPGRADE AUDIT

Run date: 2026-07-05 · Branch: `claude/platform-comprehensive-upgrade-l5kwn7`

## Phase 0 — Baseline

| Metric | Baseline (v1) |
|---|---|
| Build | ✅ green — 36.9s total (12.3s compile), 607 static pages, 188 routes |
| TypeScript (`tsc --noEmit`) | ✅ clean — 15.3s, `strict: true` already on |
| Lint | ❌ **broken** — `next lint` removed in Next 16; no ESLint config in repo |
| Tests | ❌ none exist (README: "Tests aren't required") |
| npm audit | 2 moderate — postcss <8.5.10 XSS (GHSA-qx2v-qp2m-jg93) via next |
| Outdated deps | supabase-js 2.105.4→2.110.0, next 16.2.6→16.2.10, postcss 8.4.38→8.5.16 (minor); react 19, tailwind 4, ts 6 majors available |
| LOC (ts/tsx/js/css) | ~90,381 |
| Files | 415 (excl. git/node_modules) |
| TODO/FIXME/HACK | 7 |
| `any` usages | 2 |
| Hardcoded secrets | none found (grep scan) |
| Security headers / middleware | ❌ none — no middleware.ts, no headers() in next.config.js |
| Largest files | data/nations.ts 3143, data/course.ts 2844, glossary.ts 2355, MeDashboard.tsx 1598, family-altar.ts 1418 |

### Stack
Next.js 16.2.6 (App Router, Turbopack) · React 18.3 · TypeScript 5.4 (strict) · Tailwind 3.4 · Supabase (Postgres+Auth+RLS, migrations 0001–0007) · Resend (intake email) · Crossway ESV API (optional) · PWA (manifest + SW) · Deployed on Vercel.

### Conditional Depth Modules (Phase 1.5) — activation
| Module | Active? | Rationale |
|---|---|---|
| A — AI/LLM | **No** | Zero LLM dependencies (editorial principle; verified in package.json/code) |
| B — Financial/Trading | **No** | No orders/balances/broker code |
| C — Payments | **Partial** | No checkout/webhooks — /give links out to external Stripe/Ko-fi. Verify no client-trusted amounts; nothing else applies |
| D — Monorepo | **No** | Single package |
| E — License/Supply-chain | **Light** | 6 runtime deps, all permissive (MIT/ISC/BSD); lockfile present. Public-domain Scripture translations are an editorial concern, already handled |

### Editorial guardrails (NO_TOUCH — must hold after every change)
- No AI-generated Scripture or theology; no LLM dependencies
- No streaks/shame/gamification language; no DM/chat surfaces
- Wall of Yeses: first name + country only
- Privacy by default: device-local journals/progress; cloud sync opt-in
- Free forever; no ads; no tracking

## Phase 1 — Findings

_Populated by the deep-audit pass below._

## Phase 1 — Confirmed findings (adversarially verified where reached)

| Severity | Location | Finding |
|---|---|---|
| Critical | `supabase/migrations/0007_sending_covenant.sql:52` | Public SELECT exposes device_id, letting anyone rewrite any believer's souls_walking_with via update_my_souls |
| Critical | `supabase/migrations/0006_testimonies.sql:46` | Submitters' contact emails on published testimonies are readable by anyone with the public anon key |
| Critical | `lib/cloud-sync.ts:181` | mergeProfiles() silently wipes all Scripture-memory progress on every signed-in page load |
| Critical | `supabase/migrations/0006_testimonies.sql:46` | Private testimony `contact` (email/phone) is world-readable via the anon key |
| High | `supabase/migrations/0003_prayer_wall.sql:70` | Prayer request owners can directly write prayer_count / flagged_count and un-hide moderated posts |
| High | `lib/cloud-sync.ts:159` | Cloud merge resurrects deleted records and whole-blob push silently loses concurrent edits from a second device |
| High | `components/MeDashboard.tsx:1485` | 'Backup & restore' export and 'Erase EVERYTHING' miss user-authored data (custom reading plans, cohort pointer, sending/testimony ids) |
| High | `lib/sending-cloud.ts:208` | Project 1M souls total silently caps at 1000 rows (PostgREST max-rows) |
| High | `supabase/migrations/0007_sending_covenant.sql:58` | sending_covenant INSERT with check(true) lets anon callers forge prayed_for_count, backdate said_yes_at, and spoof user_id |
| High | `package.json:9` | npm run lint invokes removed `next lint` and hard-errors on Next 16 |
| High | `README.md:143` | No CI — the contribution gates README demands (tsc, build) are enforced by nothing |
| High | `supabase/migrations/0007_sending_covenant.sql:52` | Wall of Yeses device_id is anon-readable, defeating the 0008 hardening — anyone can tamper with any believer's souls count |
| High | `app/privacy/page.tsx:39` | Privacy page is materially false: claims 'No accounts, no sign-up' while accounts, cloud sync, and four cloud-hosted PII surfaces exist |
| High | `components/AccountPanel.tsx:263` | No working data-deletion path: 'Erase my cloud copy' doesn't delete the row, is silently undone by auto-sync, and the auth account/email can never be deleted |
| High | `components/TodayDashboard.tsx:16` | /today ships nations.ts, course.ts, family-altar.ts and three i18n modules in the client bundle — the server-props fix already used on the home page was not applied here |
| High | `lib/supabase.ts:3` | supabase-js (219 KB raw / 57 KB gz) is in the shared baseline JS of all 188 routes |
| High | `app/verse/[book]/[chapter]/[verse]/page.tsx:57` | Transient bible-api.com failure permanently caches a 404 for valid verse permalinks |
| High | `app/bible/[book]/[chapter]/page.tsx:62` | Upstream-failure error page is cached in the ISR route cache for 24 hours |
| High | `app/api/bible/[translation]/[book]/[chapter]/route.ts:7` | Route-segment ISR caches error 404s for 24h and holds ESV text far beyond its intended 1h window |
| High | `components/MeDashboard.tsx:1485` | "Erase everything" and Backup silently miss ~14 storage keys, including user-authored custom reading plans |
| High | `app/layout.tsx:59` | Zero error.tsx / global-error.tsx / loading.tsx across all 188 routes |
| High | `lib/overpass.ts:243` | No timeout (AbortSignal) on any external fetch in the codebase |
| High | `lib/profile.ts:463` | useProfile.update() rewrites the whole profile blob from a stale closure — last-write-wins data loss across tabs/components |
| High | `components/BibleChapter.tsx:92` | Unguarded localStorage.setItem inside a React setState updater — quota error crashes the whole reader |
| High | `public/sw.js:135` | Service worker persists ESV chapters offline indefinitely, violating the Crossway terms the code itself documents |
| High | `app/robots.ts:17` | robots.txt 'Disallow: /me' prefix-blocks /memory, which the sitemap promotes at priority 0.7 |
| High | `app/verse/[book]/[chapter]/[verse]/page.tsx:57` | Valid verse permalinks return hard 404 whenever the upstream bible-api fetch fails |
| High | `app/bible/[book]/[chapter]/page.tsx:72` | Chapter pages render a 200 soft-error page on upstream failure and ISR caches it for 24h |
| High | `components/NavLinks.tsx:22` | Primary navigation is completely hidden on mobile with no replacement |
| High | `components/SecretPlace.tsx:681` | Prayer and gratitude entries delete permanently with one tap, no confirmation |
| High | `components/CohortView.tsx:352` | Cohort prayer composer erases the typed prayer on failed post and shows no error |
| Medium | `data/courseTrack.ts:33` | TRACK embeds the full content of all six courses, shipping a 471 KB chunk to every client importer |
| Medium | `lib/overpass.ts:187` | Overpass QL injection via unsanitized `denomination` query param |
| Medium | `app/api/bible/[translation]/[book]/[chapter]/route.ts:21` | No upper bound on `chapter` → unauthenticated fan-out to bible-api.com with attacker-controlled cache keys |
| Medium | `app/api/intake/route.ts:45` | Intake endpoint has no rate limiting → email bombing / Resend quota & cost exhaustion |
| Medium | `supabase/migrations/0003_prayer_wall.sql:70` | Prayer-request owner can bypass 3-flag auto-hide and forge counters |
| Medium | `public/sw.js:89` | Precached core routes are never served — the offline promise is broken for unvisited pages |
| Low | `components/PrayerStoryModal.tsx:104` | News-feed link is an unvalidated href, and the BBC feed is fetched over plain HTTP |

### Medium / Low (selected — full set in audit JSON)

| Severity | Location | Finding |
|---|---|---|
| Medium | `components/BibleChapter.tsx:499` | Core verse-selection interaction on the Bible reader is completely keyboard-inaccessible |
| Medium | `components/NavLinks.tsx:22` | Primary navigation disappears entirely below the md breakpoint (mobile and 400% zoom) |
| Medium | `app/layout.tsx:74` | No skip-to-content link; sticky header must be tabbed through on every page |
| Medium | `components/HymnsView.tsx:116` | No modal manages focus; HymnModal additionally lacks dialog semantics and Escape |
| Medium | `app/globals.css:33` | Primary CTA and 'faint text' colors fail AA contrast in light theme, site-wide |
| Medium | `app/globals.css:139` | 'High contrast' mode does not deliver what /accessibility promises |
| Medium | `app/globals.css:133` | 'Dyslexia-friendly font' toggle is a no-op for nearly all users — no font is bundled |
| Medium | `components/PrayerWall.tsx:471` | Key form fields have no programmatic label (placeholder-only or unassociated label) |
| Medium | `components/BibleLandsMap.tsx:438` | Atlas map place markers are mouse/touch-only and hidden from assistive tech |
| Medium | `lib/sending-cloud.ts:119` | getYesCount contradicts its contract: private and hidden yeses are excluded from the Project 1M headline |
| Medium | `supabase/migrations/0007_sending_covenant.sql:97` | pray_for_yes is anon-callable with no server-side dedup or bound — Wall prayer counters are trivially inflatable |
| Medium | `components/PrayingForList.tsx:17` | Personal 'prayed today' marks use the UTC day key, violating the codebase's own local-day convention |
| Medium | `lib/profile.ts:463` | useProfile.update() is a stale-closure read-modify-write — concurrent updates from different components drop each other's patches |
| Medium | `lib/profile.ts:409` | No schema version or shape validation on the profile blob — a shape change between deploys crashes components instead of migrating |
| Medium | `lib/prayer-wall.ts:243` | Restoring an auto-hidden prayer request does not reset flags — one more flag instantly re-hides it, and flags can never be cleared |
| Medium | `supabase/migrations/0004_cohorts.sql:116` | cohort_members UPDATE policy lets a member promote themselves to 'leader' and rewrite cohort_id on their own row |
| Medium | `lib/slots.ts:124` | removeSlot's wipe list is stale — deleting a believer's slot leaves their last-read position, custom plans, and cohort pointer behind |
| Medium | `.env.example:15` | .env.example lists 2 of the 10 environment variables the code reads |
| Medium | `README.md:132` | README says migrations are 0001–0007; 0008 exists and is a security hardening |
| Medium | `package.json:2` | No Node version pinning (no engines field, no .nvmrc) despite Next 16 requiring Node >= 20.9 |
| Medium | `README.md:120` | No ARCHITECTURE.md for a 90k LOC / 188-route repo; README repo map is the only structural doc |
| Medium | `lib/prayer-wall.ts:55` | Public prayer feed exposes poster user_id UUIDs, letting anyone correlate a person's sensitive requests |
| Medium | `lib/sending-cloud.ts:159` | Wall of Yeses entries can never be deleted by their author — the delete-own RLS policy is dead code |
| Medium | `app/admin/health/page.tsx:18` | No /api/health endpoint — uptime monitoring is impossible; the only health surface is a login-gated client page |
| Medium | `lib/bible-fetch.ts:85` | No error observability seam: server failures are swallowed silently and there are no error boundaries (app/error.tsx missing) |
| Medium | `components/ChurchFinderWizard.tsx:194` | Full-precision GPS coordinates and typed home addresses land in server request logs via GET query strings |
| Medium | `components/SearchView.tsx:68` | /search is the heaviest page in the app (594 KB gz) and runs a full synchronous corpus scan on every keystroke with no debounce or deferral |
| Medium | `components/BibleChapter.tsx:482` | Every verse tap re-renders all verse rows; no React.memo anywhere in the codebase |
| Medium | `app/atlas/page.tsx:3` | Zero next/dynamic in the entire app — d3-geo/topojson map widgets and heavy dashboard panels all hydrate eagerly |
| Medium | `components/GlossaryView.tsx:65` | Glossary filters and re-renders all 370 rich term entries on every keystroke, with no deferral, virtualization, or pagination |
| Medium | `components/NationsRhythm.tsx:6` | /pray/nations client widgets import the full 156 KB nations.ts even though the page is already a server component holding the same data |
| Medium | `lib/overpass.ts:243` | Church search tries three Overpass mirrors sequentially with no client-side timeout (worst case 75s+) |
| Medium | `app/api/churches/search/route.ts:9` | Full-precision lat/lng in cache keys makes church-search caching nearly useless |
| Medium | `lib/sending-cloud.ts:208` | getTotalSouls() fetches every row in the table to sum client-side (unbounded, silently capped at 1000) |
| Medium | `package.json:7` | Immutable Bible text is never ingested at build time — nearly every chapter depends on bible-api.com at runtime |
| Medium | `lib/devotional-slug.ts:34` | Two todaysDevotional() implementations disagree by one day — /devotional shows a different "today's meditation" than /today and the feeds |
| Medium | `components/MeDashboard.tsx:307` | "Bible highlights" stat on /me is always 0 — stale copy of the marks schema never migrated to the Record shape |
| Medium | `lib/slots.ts:124` | removeSlot's wipe list has drifted from the real set of per-slot keys — deleting a believer's profile leaves their data behind |
| Medium | `data/secret-prompts.ts:276` | Day-of-year math reimplemented verbatim in 7 places despite lib/date-helpers.ts existing for exactly this |
| Medium | `components/MyBible.tsx:46` | Bible-marks load/save + legacy migration duplicated in three components with three different type definitions |
| Medium | `components/TodayDashboard.tsx:55` | The "read slot-scoped JSON on mount + re-read on SLOT_CHANGE_EVENT" ritual is hand-rolled in 8+ components |
| Medium | `components/MeDashboard.tsx:1538` | Two complete PBKDF2/AES-GCM backup stacks ship to the same page with incompatible file formats |
| Medium | `components/MeDashboard.tsx:82` | MeDashboard.tsx (1598 lines) mixes 16 dashboard cards, stats derivation, key-inventory constants, and a crypto/backup subsystem |
| Medium | `components/ResumeStrip.tsx:38` | fmtRelative copy-pasted into 8 components (and fmtDate into 5) — copies have already diverged |
| Medium | `lib/profile.ts:432` | saveProfile() swallows write failures — UI shows journal entries as saved that vanish on reload |
| Medium | `lib/sending-cloud.ts:208` | getTotalSouls() selects every row of sending_covenant — silently caps at PostgREST max-rows and re-fetches the whole table on every window focus |
| Medium | `components/ChurchFinderWizard.tsx:172` | Geocode lookup() has try/finally with no catch — network failure is an unhandled rejection with zero user feedback |
| Medium | `components/PrayerWall.tsx:297` | Prayer Wall renders backend errors as the empty state ('No open requests right now') |
| Medium | `app/api/intake/route.ts:45` | Unauthenticated /api/intake sends a Resend email per POST with no rate limiting |
| Medium | `components/BibleChapter.tsx:516` | Failed translation fetch leaves the Bible reader on an infinite skeleton / infinite 'Loading…' |
| Medium | `public/sw.js:148` | Service worker: unbounded PAGE_CACHE growth and immediate skipWaiting without controllerchange reload |
| Medium | `app/api/geocode/route.ts:8` | Geocode proxies user `q` to Nominatim with no length cap and no rate limiting |
| Medium | `app/api/churches/search/route.ts:78` | Raw internal error object returned to client via String(err) |
| Medium | `app/api/certificate/[name]/route.tsx:17` | Certificate `score`/`date` params rendered into branded image with no sanitization or length cap |
| Medium | `app/api/certificate/[name]/route.tsx:19` | decodeURIComponent on an already-decoded route param throws an unhandled 500 |
| Medium | `supabase/migrations/0004_cohorts.sql:116` | cohort_members self-update allows role escalation and reassigning membership to any cohort |
| Medium | `supabase/migrations/0007_sending_covenant.sql:52` | Wall-of-Yeses public rows leak device_id (persistent tracking id) to anon |
| Medium | `app/api/intake/route.ts:45` | Unauthenticated email-sending endpoint with no rate limit and no origin check |
| Medium | `lib/overpass.ts:187` | Overpass QL injection via unvalidated denomination parameter, plus unvalidated lat/lng |
| Medium | `next.config.js:2` | Security-header/CSP specification for the middleware fix (exact values for this app) |
| Medium | `public/sw.js:148` | Default fetch branch caches every same-origin GET into PAGE_CACHE with no pruning — unbounded Cache Storage growth |
| Medium | `app/layout.tsx:14` | metadataBase hardcoded to scripture-theory.vercel.app while sitemap/robots/feeds use NEXT_PUBLIC_SITE_URL |
| Medium | `app/bible/[book]/[chapter]/page.tsx:33` | No canonical URLs anywhere, while numeric/ISO params accept non-canonical duplicates that return 200 |
| Medium | `app/sitemap.ts:156` | Sitemap omits all track courses/weeks, 247 nation pages, and 60 devotional entries |
| Medium | `app/devotional/[slug]/page.tsx:26` | No JSON-LD structured data anywhere on the site |
| Medium | `app/robots.ts:24` | Track exam and certificate pages are indexable although the equivalent /course/* pages are deliberately disallowed |
| Medium | `app/verse/[book]/[chapter]/[verse]/page.tsx:29` | Verse OG/Twitter card images live under /api/, which robots.txt disallows |
| Medium | `app/resources/topical-index/page.tsx:1` | Topical index page has no metadata (client component) — inherits the site-wide root title/description |
| Medium | `package.json:5` | No test runner: add vitest with node environment, @/ alias, and CI-ready scripts |
| Medium | `lib/memorySchedule.ts:46` | Mastered verses are hidden from review for 30 extra days — dueVerses() double-counts the monthly interval (execution-verified bug) |
| Medium | `lib/places.ts:161` | placeFromText pins South Sudan news on Khartoum, Sudan — first-substring-match ordering bug (execution-verified) |
| Medium | `data/resources/glossary.ts:576` | 22 dangling `related` slugs in the glossary silently drop cross-reference links (execution-verified) |
| Medium | `data/resources/topics.ts:44` | 3 dangling cross-topic slugs in the topical index ('courage', 'guilt-shame', 'justice-poor') — related-topic chips silently missing (execution-verified) |
| Medium | `data/course.ts:2816` | Course/track data invariants untested across 6 courses; exam-pass boundary contradicts the documented '≥ 19/24' (execution-verified) |
| Medium | `data/nations.ts:3085` | Nation-of-the-day rotation and 244-nation editorial invariants have no regression guard |
| Medium | `lib/calendar.ts:200` | Liturgical computus has zero tests; the 'shouldn't fire' fallback at line 200 is an unasserted invariant |
| Medium | `app/api/intake/route.ts:33` | Intake validation and reply-to header-injection guard are untested; INTAKE_TO/FROM are frozen at module load |
| Medium | `data/memory.ts:337` | thisWeeksVerse comment claims 'rotates Mondays' but rotation is Jan-1-anchored 7-day blocks — verse changes mid-week at New Year (execution-verified) |
| Medium | `lib/reference.ts:129` | Multilingual scripture-reference parser (deep-link engine) has no tests despite a fragile Unicode regex and 100-entry alias table |
| Medium | `data/bible/canon.ts:14` | Bible canon structure (routing backbone for /bible, /verse, and the chapter API) has no structural test |
| Medium | `lib/personal.ts:122` | Personal context engine (milestones, story line, verse-for-you) is untested and mixes UTC and local day keys in the same function |
| Medium | `lib/coursePace.ts:67` | readPace cadence thresholds contradict their own documentation and are untested (comment says drifting at 7-14d, code says 10-20d) |
| Medium | `lib/prayer-wall.ts:36` | Prayer Wall input validation and anonymity/trim rules are untested — the only client-side gate on a public write surface |
| Medium | `components/NamesPanel.tsx:319` | Stock Tailwind light-tone colors break class-based dark mode across ~60 components |
| Medium | `components/CohortHub.tsx:296` | Cohort create/join and sign-in forms are plain divs — Enter key does nothing |
| Medium | `components/ChurchFinderWizard.tsx:168` | Geocode lookup has no error handling — failure is a silent dead click |
| Medium | `components/ChurchFinderWizard.tsx:62` | Raw exception text shown to users in the church search error panel |
| Medium | `components/PrayerWall.tsx:295` | Prayer Wall renders backend failures as the 'be the first to post' empty state |
| Medium | `components/PrayerWall.tsx:126` | Flagging a prayer request depends on window.prompt |
| Medium | `components/PrayerWall.tsx:374` | Destructive/moderation controls are far below minimum touch-target size |
| Medium | `components/IntroRequestModal.tsx:71` | Pastor-intro modal has no focus trap, no initial focus, and no body scroll lock |
| Medium | `components/ReadingPlanBuilder.tsx:53` | Plan builder Cancel silently discards all edits; Save silently drops reference-less days |
| Low | `components/PrayerWall.tsx:477` | 38 inputs suppress the focus outline, leaving only a low-contrast border-color change |
| Low | `components/BibleChapter.tsx:893` | BibleChapter async feedback is not announced (no aria-live/role=status) |
| Low | `components/NavLinks.tsx:25` | No aria-current on active primary nav link |
| Low | `supabase/migrations/0003_prayer_wall.sql:161` | pray_for recomputes prayer_count from a statement snapshot — concurrent prayers can transiently undercount |
| Low | `scripts/ingest-bible.mjs:7` | Data-pipeline scripts are invisible in the README; esv-smoke.mjs has no npm script |
| Low | `package.json:5` | No formatter: no Prettier config and no format script |
| Low | `components/CourseCertificate.tsx:86` | Believers' full names are embedded in certificate URL paths, persisting in platform request logs |
| Low | `app/api/intake/route.ts:89` | Failed Resend deliveries return 502 with no diagnostic logging — silent loss of pastor claims and testimonies |
| Low | `components/MeDashboard.tsx:1` | MeDashboard is a 1598-line single client component; all sections hydrate eagerly on /me |
| Low | `next.config.js:4` | images.remotePatterns is configured but next/image is never used — 8 raw <img> tags across the app |
| Low | `lib/news.ts:90` | World-news route polls a discontinued Reuters RSS feed and fetches BBC over http://, with no fetch timeout |
| Low | `lib/geocode.ts:18` | Geocode cache is fragmented by raw user input casing/whitespace |
| Low | `components/BibleChapter.tsx:130` | BibleChapter.tsx (925 lines): persistence and reader-prefs layers should split out of the reader view |
| Low | `components/SecretPlace.tsx:49` | SecretPlace.tsx (945 lines) is five features in one file — already cleanly seamed for extraction |
| Low | `app/api/certificate/[name]/route.tsx:20` | Certificate name sanitization duplicated 6x, and one copy skips the <> strip |
| Low | `components/PastorDashboard.tsx:1` | Dead code: PastorDashboard.tsx (223 lines), data/churches.ts (342 lines), and nations.ts's self-declared orphan export |
| Low | `components/WorldMap.tsx:7` | Phantom dependency: topojson-specification is imported but not declared in package.json |
| Low | `lib/news.ts:90` | Dead Reuters feed URL burns a DNS-failure wait on every news revalidation |
| Low | `app/api/verse-card/[book]/[chapter]/[verse]/route.tsx:615` | Unbounded `translation` param rendered as attribution text in verse-card image |
| Low | `lib/prayer-wall.ts:55` | Public prayer feed exposes each author's auth user_id (UUID) to anon |
| Low | `supabase/migrations/0007_sending_covenant.sql:115` | pray_for_yes RPC granted to anon with no server-side dedup allows unbounded counter inflation |
| Low | `.env.example:15` | .env.example is missing 8 of the 10 env vars the README documents |
| Low | `app/admin/health/page.tsx:9` | Admin health page ships env-configuration status to unauthenticated visitors |
| Low | `next.config.js:5` | Dead images.remotePatterns config (next/image is never used) and X-Powered-By left enabled |
| Low | `public/sw.js:117` | Opaque-response caching and the advertised offline-audio strategy are unreachable dead code |
| Low | `app/bible/[book]/[chapter]/page.tsx:21` | 1,189 chapter pages share a near-identical 3-word meta description |
| Low | `app/sitemap.ts:125` | sitemap lastModified is new Date() for all ~1,350 URLs on every fetch |
| Low | `app/devotional/[slug]/page.tsx:20` | Highest-share content pages fall back to generic OG cards |
| Low | `components/PrayerWall.tsx:160` | Prayer-request success message is never visible |
| Low | `components/CloudOfWitnesses.tsx:100` | Wall of Yeses 'lift up' and souls-save fail silently |
| Low | `components/CohortHub.tsx:286` | Join-cohort display name marked required but never validated — silently becomes 'Member' |
## Phase 2 — Execution plan (batches)

Priority: Critical security/data → High security/reliability → perf → quality → testing → a11y/SEO/UX/observability → DX. Every batch: implement → `tsc --noEmit` + `next build` green → commit. Behavior-preserving except flagged hardening.

- **Batch 1 — Critical data/security (SQL + cloud-sync).** New migration `0009` column-privilege hardening (revoke PII columns `contact`/`device_id`/`user_id` from `anon`; admins are `authenticated` and keep access; public reads never select them). `mergeProfiles` per-key identity union (fix silent memory/nations/family-altar loss). `listRequests` → explicit columns (drop `user_id` from anon feed).
- **Batch 2 — Security headers + middleware + input hardening.** `next.config.js` security headers (CSP/HSTS/XCTO/XFO/Referrer/Permissions). Overpass denomination sanitize + lat/lng bounds; bible chapter upper-bound; geocode length cap; certificate param caps. Intake per-IP rate limit + origin check. External-fetch timeouts (AbortSignal).
- **Batch 3 — Reliability.** `app/error.tsx` + `global-error.tsx` + `loading.tsx`. Guard `localStorage.setItem` quota in reader. Stop caching upstream failures as 404/soft-error in bible chapter/verse routes. `/api/health`.
- **Batch 4 — Performance.** Server-side data for `/today` (mirror home fix). `next/dynamic` for map widgets. Lazy supabase in shared bundle. Debounce search/glossary. Bounded souls sum (RPC).
- **Batch 5 — DX/tooling + tests.** Restore lint (ESLint flat config + `eslint-config-next`), add Prettier `format`, GitHub Actions CI (tsc+build+lint+test), complete `.env.example`, `engines`+`.nvmrc`, `ARCHITECTURE.md`. Vitest + high-value unit/data-invariant tests.
- **Batch 6 — a11y/SEO/UX polish.** Skip-to-content, mobile nav, focus-visible, contrast; canonical URLs, sitemap completeness, JSON-LD; destructive-action confirmations, form UX, dark-mode fixes; privacy-page accuracy.

### DEFERRED (need human decision — not executed)
- Deletion tombstones for cloud sync (resurrect-on-merge) — needs sync-protocol design.
- Account/email deletion pathway (GDPR) — needs Supabase admin-side function + auth decision.
- Major dep upgrades: React 19, Tailwind 4, TypeScript 6 — migration effort; not required for a Critical/High fix.
- Build-time Bible ingestion for all translations (remove bible-api.com runtime dependency) — infra/licensing decision.
- Splitting god-components (MeDashboard 1598 / SecretPlace 945 / BibleChapter 925) — large refactor; behavior-risk without tests first.
