# Scripture Theory

**Encounter JESUS. Engage the Word. Live the Kingdom. Belong to the Body.**

An inter-denominational, JESUS-centered discipleship platform. The Bible
catalog now spans 21 trusted editions: 15 verified public-domain translations
available on demand, the licensed ESV when configured, and five historical
editions with clearly labeled selected passages. It also includes daily prayer
for the nations, on-device journals, a global Wall of Yeses (Project 1M), and
the practices that have shaped the Church for two thousand years — all free,
free of ads, free of tracking, and free of AI-generated Scripture or theology.

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
- **bible-api.com** structured chapter API for 15 verified public-domain editions
- **Crossway ESV API** (optional, server-only, licensed and never stored offline)
- PWA (manifest + service worker + offline shell)
- Zero AI / LLM dependencies

---

## Quickstart

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. Most surfaces work without any env vars — they
degrade to read-only or "setup pending" panels when an optional integration
isn't configured.

### Optional environment variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=...           # cloud sync, admin queues, prayer wall
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SITE_URL=https://yourdomain
ESV_API_KEY=...                        # Crossway ESV token (server-only)
NEXT_PUBLIC_GIVE_ONCE_URL=...          # Stripe / Ko-fi / Patreon link
NEXT_PUBLIC_GIVE_MONTHLY_URL=...
INTAKE_CLAIM_TO=onboarding@...         # pastor claim → email
INTAKE_TESTIMONY_TO=testimonies@...
INTAKE_FROM=...
RESEND_API_KEY=...                     # email transport for /api/intake
```

Create an eligible ESV API application at [api.esv.org](https://api.esv.org/),
then put its token in the deployment environment as `ESV_API_KEY`. Never use a
`NEXT_PUBLIC_` prefix for this secret. The reader calls Crossway through the
server, applies conservative request limits, displays the required attribution,
and prevents ESV text from entering browser or service-worker caches.

### Bible provider checks

```bash
npm run smoke:bible-api   # read-only check of all 15 public runtime editions
npm run smoke:esv         # checks Crossway when ESV_API_KEY is present
```

`npm run ingest-bible` is intentionally a targeted editorial tool. It requires
explicit `--translations` and `--books` flags, caps job size, and respects the
public API's request ceiling. Do not use the live API to download full Bibles;
use the publishers' source archives for full-canon ingestion.

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

| Route                | Purpose                                               |
| -------------------- | ----------------------------------------------------- |
| `/admin`             | Hub for all moderation surfaces                       |
| `/admin/health`      | Pending counts + env-var status at a glance           |
| `/admin/testimonies` | Editorial review of submitted testimonies             |
| `/admin/yeses`       | Moderate the Project 1M Wall of Yeses                 |
| `/admin/prayers`     | Review flagged prayer requests (auto-hide at 3 flags) |

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
data/                 All editorial content — Bible canon and translation
                      registry, glossary, nations, devotionals, hymns,
                      courses, liturgical calendar, …
lib/                  Pure libraries — Bible providers, Supabase client,
                      profile, calendar math, spaced repetition, …
supabase/migrations/  Authoritative database schema (0001–0009)
public/               Static assets — icons, manifest, service worker
```

---

## Contributing

Before opening a PR (all four are wired into CI):

1. `npx tsc --noEmit` — clean
2. `npm run lint` — clean
3. `npm test` — green
4. `npm run build` — clean

Editorial guardrails (no synthetic testimonies, no AI in Scripture or
theology, no streaks language, no DM/chat surfaces, first-name + country only
on the public wall) must hold. See `ARCHITECTURE.md` for the system map.

---

## Built into the work

> "Each one must give as he has decided in his heart, not reluctantly or
> under compulsion, for God loves a cheerful giver."
> — _2 Corinthians 9:7_

If the Lord nudges you to help fund hosting, translation, or reaching new
language groups — `/give` on the live site.

Walk well.
