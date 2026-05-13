import { roadmap } from "@/data/strategy";
import { PageHero, Tile } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";

export const metadata = {
  title: "12-Month Roadmap — Scripture Theory",
  description:
    "A practical four-quarter plan to build the most trustworthy, inter-denominational Scripture AI on earth.",
};

const NORTH_STAR = [
  {
    metric: "0%",
    sub: "invented or misattributed verses in published answers (independently audited).",
  },
  {
    metric: "≥ 5",
    sub: "traditions represented on every contested passage, with named voices.",
  },
  {
    metric: "≥ 12",
    sub: "languages live by month 12.",
  },
  {
    metric: "≥ 1,000",
    sub: "disciples who reach Stage 7 (Belong) via a real local pastor introduction.",
  },
];

export default function RoadmapPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="12-month roadmap"
        title="Foundations → Beta →"
        titleAccent="Path → Scale."
        intro="A four-quarter plan to ship the most trustworthy, inter-denominational Scripture AI on earth — and to plant it inside the actual life of the global Church."
        scripture="Unless the LORD builds the house, those who build it labor in vain."
        scriptureRef="Psalm 127:1"
      />

      {/* Quarters as a vertical timeline */}
      <ol className="mt-12 relative space-y-5">
        <span
          aria-hidden
          className="hidden md:block absolute left-7 top-2 bottom-2 w-px bg-gradient-to-b from-flame-300 via-flame-500/40 to-ink-200"
        />
        {roadmap.map((q, idx) => (
          <li key={q.quarter}>
            <article className="group relative grid grid-cols-[auto_1fr] gap-4 md:gap-6 rounded-3xl border border-ink-200 bg-card p-6 md:p-7 hover:-translate-y-0.5 hover:border-flame-500/60 hover:shadow-[0_18px_50px_-20px_rgba(249,115,22,0.28)] transition-all overflow-hidden">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-flame-50/40 to-transparent"
              />
              <div className="relative flex flex-col items-center gap-1.5 z-10">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-flame-200 bg-gradient-to-br from-flame-50 to-flame-100 flex items-center justify-center font-serif text-2xl md:text-3xl text-flame-700">
                  Q{idx + 1}
                </div>
                <span className="h-1.5 w-1.5 rounded-full bg-flame-600" />
              </div>
              <div className="relative">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-serif text-2xl md:text-3xl text-ink-900 group-hover:text-flame-700 transition-colors">
                    {q.quarter}
                  </h2>
                  <span className="text-[10px] uppercase tracking-widest text-flame-700">
                    {q.months}
                  </span>
                </div>
                <ul className="mt-4 grid gap-2">
                  {q.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-ink-800 text-sm leading-relaxed"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-flame-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ol>

      {/* North-star metrics */}
      <Tile
        size="wide"
        tone="dark"
        eyebrow="North-star metrics"
        title="How we'll know we did it well."
        sub="Four numbers we measure. If any drifts, we change course."
        glyph={<Glyph id="compass" size={120} />}
        className="mt-14"
      >
        <ul className="mt-5 grid sm:grid-cols-2 gap-3">
          {NORTH_STAR.map((m) => (
            <li
              key={m.metric}
              className="rounded-2xl bg-ink-800/40 border border-ink-700/60 p-4"
            >
              <div className="font-serif text-3xl text-flame-300">{m.metric}</div>
              <p className="mt-1 text-sm text-ink-300 leading-snug">{m.sub}</p>
            </li>
          ))}
        </ul>
      </Tile>
    </section>
  );
}
