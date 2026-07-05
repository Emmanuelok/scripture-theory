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
