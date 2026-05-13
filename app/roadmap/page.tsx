import { roadmap } from "@/data/strategy";

export const metadata = {
  title: "12-Month Roadmap — Scripture Theory",
  description:
    "A practical four-quarter plan to build the most trustworthy, inter-denominational Scripture AI on earth.",
};

export default function RoadmapPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">12-month roadmap</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900">
        Foundations → Beta → Path → Scale.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        A four-quarter plan to ship the most trustworthy, inter-denominational Scripture AI on
        earth — and to plant it inside the actual life of the global Church.
      </p>

      <div className="mt-12 space-y-6">
        {roadmap.map((q, idx) => (
          <article
            key={q.quarter}
            className="rounded-2xl border border-ink-200 bg-card p-6 md:p-8"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-widest text-flame-700">
                  {q.months}
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mt-1">
                  {q.quarter}
                </h2>
              </div>
              <div className="font-serif text-5xl text-ink-200">
                {String(idx + 1).padStart(2, "0")}
              </div>
            </div>
            <ul className="mt-5 grid gap-2">
              {q.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-ink-800 text-sm leading-relaxed border-t border-ink-100 pt-3"
                >
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-flame-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-14 rounded-2xl bg-ink-900 text-ink-50 p-8">
        <h2 className="font-serif text-2xl">North-star metrics</h2>
        <ul className="mt-4 grid md:grid-cols-2 gap-3 text-sm text-ink-200">
          <li className="rounded-xl bg-ink-800 p-4">
            <strong className="text-flame-300">0%</strong> invented or misattributed verses in
            published answers (independently audited).
          </li>
          <li className="rounded-xl bg-ink-800 p-4">
            <strong className="text-flame-300">≥ 5</strong> traditions represented on every
            contested passage, with named voices.
          </li>
          <li className="rounded-xl bg-ink-800 p-4">
            <strong className="text-flame-300">≥ 12</strong> languages live by month 12.
          </li>
          <li className="rounded-xl bg-ink-800 p-4">
            <strong className="text-flame-300">≥ 1,000</strong> disciples who reach Stage 7
            (Belong) via a real local pastor introduction.
          </li>
        </ul>
      </div>
    </section>
  );
}
