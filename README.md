# Scripture Theory

**Encounter JESUS. Engage the Word. Live the Kingdom. Belong to the Body.**

An inter-denominational, Scripture-centered AI platform for global discipleship.
JESUS at the center. The Word as the source. The local Body as the home.

This repository is the public web platform (Next.js 14 + Tailwind, deployable to Vercel).

---

## The unsolved pain point we are building against

Every major Bible / Christian platform is missing the same three things — at the same time:

1. **The Scripture-AI Trust Gap.** YouVersion's CEO has publicly said today's leading AI models
   misquote Scripture between 15% and 60% of the time — which is why YouVersion (1B+ installs)
   deliberately refuses to ship an AI answer feature. No major platform has shipped a
   citation-grounded Scripture AI that refuses to fabricate verses.
2. **The Single-Lens Bias Problem.** Independent reviews of Bible chatbots find they quietly
   default to a narrow theological outlook. No major platform transparently shows how Orthodox,
   Catholic, Reformed, Wesleyan, Pentecostal and Anabaptist streams have read the same passage,
   side by side, with named voices.
3. **The Discipleship Deficit.** Only ~52% of pastors have an intentional discipleship plan; the
   18–25 dropout rate has risen from 59% to 64%. Apps deliver content but rarely produce formed
   disciples connected to a real local body.

Scripture Theory is built on the exact intersection where these three failures meet.

## Pillars

- **Encounter** — pointing to the living Jesus (John 17:3)
- **Engage** — citation-grounded Scripture (2 Tim 3:16)
- **Embody** — measurable discipleship (Matt 28:19–20)
- **Belong** — handoff to a real local church (Heb 10:24–25)

## Live surfaces

- `/` — vision, gap, products, principles
- `/lens` — flagship **Verse Lens** demo: one passage, six traditions, named voices, no invented verses
- `/disciple` — The Path: a 12-stage discipleship journey
- `/connect` — Local Body Connect: warm pastor intros, not pins on a map
- `/roadmap` — the 12-month plan

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Push this branch to GitHub (already configured: `claude/scripture-theory-ai-platform-oVCIS`).
2. In Vercel → **Add New… → Project** → import the GitHub repo.
3. Framework preset: **Next.js** (auto-detected). No environment variables required for the MVP.
4. Click **Deploy**.

The MVP has zero external dependencies, so the first deploy should succeed in under 2 minutes.

## Roadmap

See `/roadmap` on the live site, or `data/strategy.ts` in this repo.
