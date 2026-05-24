# Scripture Theory

**Encounter JESUS. Engage the Word. Live the Kingdom. Belong to the Body.**

An inter-denominational, JESUS-centered discipleship platform. The Bible in
14 trusted public-domain translations, daily prayer for the nations, on-device
journals, a global Wall of Yeses (Project 1M), and the practices that have
shaped the Church for two thousand years — all free, free of ads, free of
tracking, free of any AI-generated Scripture or theology.

Live: **[scripture-theory.vercel.app](https://scripture-theory.vercel.app)**

---

## Editorial principles (the non-negotiables)

- **JESUS alone, not denomination.** Where traditions differ, every voice is named.
- **No AI in Scripture or theology.** Every word in the Bible comes from a named
  human translation; every devotional from Scripture Theory editorial. Zero LLM
  dependencies.
- **No streaks. No shame. No DMs.** Believers are met, not gamified.
- **Privacy by default.** The Secret Place, the Names, reading progress — all
  device-local. Cloud sync is opt-in. The Wall of Yeses shows first names +
  country only.
- **Free forever.** No paywall. No ads on Scripture-adjacent pages. No data sale.

---

## Tech stack

- **Next.js 16** (App Router, Turbopack) · TypeScript · React 18
- **Tailwind 3** (CSS variables for palette, class-based dark mode)
- **Supabase** (Postgres + Auth + RLS) for cloud-backed features
- **Crossway ESV API** (optional, for the ESV translation)
- PWA (manifest + service worker + offline shell)
- Zero AI / LLM dependencies

---

## Quickstart

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. Most surfaces work without any env vars — they
degrade to read-only or "setup pending" panels when Supabase isn't configured.

### Optional environment variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=...           # cloud sync, admin queues, prayer wall
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SITE_URL=https://yourdomain
ESV_API_KEY=...                        # ESV translation (server-only)
NEXT_PUBLIC_GIVE_ONCE_URL=...          # Stripe / Ko-fi / Patreon link
NEXT_PUBLIC_GIVE_MONTHLY_URL=...
INTAKE_CLAIM_TO=onboarding@...         # pastor claim → email
INTAKE_TESTIMONY_TO=testimonies@...
INTAKE_FROM=...
RESEND_API_KEY=...                     # email transport for /api/intake
```

---

## Deploy

### 1 · Vercel (the app)

Import the repo. Framework auto-detects as Next.js. Set the env vars above
that you need. Deploy. The PWA, the offline shell, every static page, and
the daily-rotating content (verse-of-the-day, nation-of-the-day, season
banner) all work immediately.

### 2 · Supabase (the data)

Create a free Supabase project. From the SQL editor, run each file in
[`supabase/migrations/`](supabase/migrations/) in order — or `supabase db push`
if you use the CLI. See [`supabase/migrations/README.md`](supabase/migrations/README.md)
for the run order and what each migration adds.

### 3 · Admin allowlist

Add your maintainer email so `/admin` opens for you:

```sql
insert into admin_emails(email) values ('you@example.com');
```

Sign in on the live site with that email, then visit `/admin` — four queues
(Health, Testimonies, Wall of Yeses, Prayer Wall) become available.

---

## Daily operations

| Route | Purpose |
|---|---|
| `/admin` | Hub for all moderation surfaces |
| `/admin/health` | Pending counts + env-var status at a glance |
| `/admin/testimonies` | Editorial review of submitted testimonies |
| `/admin/yeses` | Moderate the Project 1M Wall of Yeses |
| `/admin/prayers` | Review flagged prayer requests (auto-hide at 3 flags) |

Admin pages are robots-disallowed and gated server-side by RLS via the
`admin_emails` allowlist.

---

## Backup

See [`BACKUP.md`](BACKUP.md) for the full playbook: git mirror to a second host,
monthly `git bundle`, encrypted tarball, `pg_dump` for Supabase, `vercel env pull`
for environment variables, and a monthly cron script.

---

## Repo map

```
app/                  Next.js routes — public pages, /admin, /api, feeds
components/           UI — ~120 components. The biggest are
                      TodayDashboard, CloudOfWitnesses, BibleChapter,
                      MemoryTrainer, NamesPanel, AdminPrayers, …
data/                 All editorial content — Bible canon, glossary (369 terms),
                      69 nations, devotional library, hymns, course material,
                      66 topical-index entries, liturgical calendar, …
lib/                  Pure libraries — supabase client, profile, calendar
                      math, spaced-repetition schedule, useToday hook, …
supabase/migrations/  Authoritative database schema (0001–0007)
public/               Static assets — icons, manifest, service worker
```

---

## Contributing

Editorial guardrails are enforced by a multi-agent audit — see the latest
audit commit (`d0cb14c` and after) for the format. Before opening a PR:

1. `npx tsc --noEmit` must be clean
2. `npx next build` must be clean
3. Editorial guardrails (no synthetic testimonies, no AI in Scripture, no
   streaks language, no DM/chat surfaces, first-name + region only on the
   public wall) must hold

Tests aren't required — the platform leans on tsc + Next's build, the
admin queues, and human pastoral review.

---

## Built into the work

> "Each one must give as he has decided in his heart, not reluctantly or
> under compulsion, for God loves a cheerful giver."
> — *2 Corinthians 9:7*

If the Lord nudges you to help fund hosting, translation, or reaching new
language groups — `/give` on the live site.

Walk well.
