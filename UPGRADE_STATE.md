# UPGRADE_STATE — resume checkpoint

Branch: `claude/platform-comprehensive-upgrade-l5kwn7` (main untouched)
Protocol: OPERATION V10. Approach: harden/optimize in place (behavior-preserving,
additive) — NOT a rewrite. Editorial guardrails held throughout.

## Done (committed, each build+tsc green)
- Phase 0 baseline + Phase 1 audit (workflow: 38 confirmed, 123 med/low) + Phase 2 plan → `UPGRADE_AUDIT.md`
- **Batch 1** `5ac0959` — migration `0009` column-privilege hardening (PII out of anon: testimonies.contact/device_id, sending.device_id, prayer_requests.user_id; anon INSERT column-restricted). cloud-sync `mergeProfiles` per-key identity union (fixes silent memory/nations/family-altar loss). App reads aligned.
- **Batch 2** `0976a77` — CSP + security headers (next.config.js), Overpass injection fix + coord clamp, bible chapter bound, geocode length cap, intake rate-limit (5/hr) + origin, fetch timeouts everywhere (lib/fetch-timeout.ts), lib/rate-limit.ts. BBC http→https, dead Reuters feed dropped.
- **Batch 3** `6b45be1` — app/error.tsx + global-error.tsx, bible chapter/verse throw-on-transient (stop 24h cache of failures) + scoped loading.tsx, bible API no-store on failure, BibleChapter localStorage quota guard, /api/health.

## Remaining
- **Batch 4 — Performance:** /today server-side data (mirror home), next/dynamic for maps, lazy supabase in shared bundle, debounce search/glossary, bounded souls sum.
- **Batch 5 — DX/tooling + tests:** restore lint (ESLint flat + eslint-config-next), Prettier format, GitHub Actions CI, complete .env.example, engines/.nvmrc, ARCHITECTURE.md, vitest + high-value unit/data-invariant tests.
- **Batch 6 — a11y/SEO/UX:** skip-to-content, mobile nav, focus-visible, contrast; canonical URLs, sitemap completeness, JSON-LD; destructive-action confirmations, form UX, privacy-page accuracy.
- Phase 4 verify + adversarial self-review; Phase 5 UPGRADE_REPORT.md; push.

## Deferred (human decision) — see UPGRADE_AUDIT.md
Deletion tombstones for cloud sync; account/email deletion (GDPR); major deps (React 19 / Tailwind 4 / TS 6); build-time Bible ingestion; god-component splits.
