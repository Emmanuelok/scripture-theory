# UPGRADE_STATE — resume checkpoint

Branch: `claude/platform-comprehensive-upgrade-l5kwn7` (main untouched)
Protocol: OPERATION V10. Approach: harden/optimize in place (behavior-preserving,
additive) — NOT a rewrite. Editorial guardrails held throughout.

## Done (committed, each build+tsc green)
- Phase 0 baseline + Phase 1 audit (workflow: 38 confirmed, 123 med/low) + Phase 2 plan → `UPGRADE_AUDIT.md`
- **Batch 1** `5ac0959` — migration `0009` column-privilege hardening (PII out of anon: testimonies.contact/device_id, sending.device_id, prayer_requests.user_id; anon INSERT column-restricted). cloud-sync `mergeProfiles` per-key identity union (fixes silent memory/nations/family-altar loss). App reads aligned.
- **Batch 2** `0976a77` — CSP + security headers (next.config.js), Overpass injection fix + coord clamp, bible chapter bound, geocode length cap, intake rate-limit (5/hr) + origin, fetch timeouts everywhere (lib/fetch-timeout.ts), lib/rate-limit.ts. BBC http→https, dead Reuters feed dropped.
- **Batch 3** `6b45be1` — app/error.tsx + global-error.tsx, bible chapter/verse throw-on-transient (stop 24h cache of failures) + scoped loading.tsx, bible API no-store on failure, BibleChapter localStorage quota guard, /api/health.

## Status: COMPLETE
- **Batch 4** `78f7caa` — lazy-load d3 maps (pray/live, atlas); useDeferredValue on search/glossary.
- **Batch 5** `ae1b7e5` — lint restored (ESLint flat config), Vitest (24 tests) + CI, Prettier, engines/.nvmrc, .env.example, ARCHITECTURE.md; fixed memorySchedule + places bugs; pruned dangling data cross-refs.
- **Batch 6** `ccbcebd` — mobile nav, skip link, robots `/me$` fix, metadataBase env; cohort composer + SecretPlace delete data-loss fixes.
- **Phase 4** `5dab49a` — clean `npm ci` + tsc + lint + test + build all green; adversarial diff review; runtime smoke test of touched routes; verse permalink made resilient.
- **Phase 5** — `UPGRADE_REPORT.md` written. Remaining/deferred items live there.

Deferred (human decision) and next-iteration targets: see `UPGRADE_REPORT.md`.

## Deferred (human decision) — see UPGRADE_AUDIT.md
Deletion tombstones for cloud sync; account/email deletion (GDPR); major deps (React 19 / Tailwind 4 / TS 6); build-time Bible ingestion; god-component splits.
