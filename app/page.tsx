import Link from "next/link";
import {
  mission,
  audiences,
  pillars,
  gap,
  firstProducts,
  principles,
  guardrails,
} from "@/data/strategy";

export default function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pt-16 md:pt-24 pb-12">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3 py-1 text-xs text-ink-600">
              <span className="h-1.5 w-1.5 rounded-full bg-flame-500" />
              An inter-denominational, Scripture-centered platform
            </span>
            <h1 className="mt-5 font-serif text-4xl md:text-6xl leading-[1.05] text-ink-900">
              Encounter <span className="gradient-text">JESUS</span>.<br />
              Engage the Word.<br />
              Live the Kingdom.<br />
              Belong to the Body.
            </h1>
            <p className="mt-6 text-lg text-ink-700 leading-relaxed max-w-xl">
              {mission.oneLine}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/lens"
                className="inline-flex items-center rounded-full bg-ink-900 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-700 transition-colors"
              >
                Open the Verse Lens →
              </Link>
              <Link
                href="/roadmap"
                className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2.5 text-sm text-ink-800 hover:border-ink-900 transition-colors"
              >
                12-month roadmap
              </Link>
            </div>
          </div>

          <aside className="md:col-span-5">
            <div className="rounded-2xl bg-ink-900 text-ink-50 p-6 md:p-7 glow-ring">
              <div className="text-xs uppercase tracking-widest text-flame-300">
                The unsolved pain point
              </div>
              <p className="font-serif text-xl md:text-2xl mt-2 leading-snug">
                Today's leading AI models misquote Scripture between
                <span className="text-flame-300"> 15% and 60% </span>
                of the time.
              </p>
              <p className="text-sm text-ink-200 mt-3">
                That admission comes from the CEO of the largest Bible app on earth — which is why
                even YouVersion (1B+ installs) deliberately refuses to ship an AI answer feature.
                Believers are asking the most important questions of their lives, and getting
                confidently wrong answers.
              </p>
              <p className="text-sm text-ink-200 mt-3">
                Scripture Theory exists to close that gap — with citations, with many traditions
                named honestly, and with a path that ends in a real local church.
              </p>
              <div className="mt-4 text-[10px] uppercase tracking-widest text-ink-400">
                Source: YouVersion CEO Bobby Gruenewald · 2025
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid md:grid-cols-4 gap-6">
          {pillars.map((p) => (
            <div key={p.name} className="rounded-2xl bg-white border border-ink-200 p-6">
              <div className="text-xs uppercase tracking-widest text-flame-700">{p.verse}</div>
              <div className="font-serif text-2xl text-ink-900 mt-1">{p.name}</div>
              <p className="text-sm text-ink-600 mt-2 leading-relaxed">{p.summary}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 border-t border-ink-200">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <span className="text-xs uppercase tracking-widest text-flame-700">The gap</span>
            <h2 className="font-serif text-3xl md:text-4xl mt-2 text-ink-900">{gap.headline}</h2>
            <p className="mt-4 text-ink-700 leading-relaxed">{gap.intro}</p>
            <p className="mt-6 text-ink-800 leading-relaxed font-medium">{gap.ourAnswer}</p>
          </div>
          <div className="md:col-span-7 space-y-4">
            {gap.failures.map((f) => (
              <div key={f.title} className="rounded-2xl bg-white border border-ink-200 p-6">
                <div className="font-serif text-xl text-ink-900">{f.title}</div>
                <p className="mt-2 text-ink-700 leading-relaxed">{f.body}</p>
                <div className="mt-3 text-xs text-ink-400 italic">{f.source}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 border-t border-ink-200">
        <div className="flex items-baseline justify-between gap-4 flex-wrap">
          <div>
            <span className="text-xs uppercase tracking-widest text-flame-700">First products</span>
            <h2 className="font-serif text-3xl md:text-4xl mt-2 text-ink-900">
              What we are building, in order.
            </h2>
          </div>
          <Link href="/roadmap" className="text-sm text-ink-700 hover:text-flame-700">
            See full 12-month plan →
          </Link>
        </div>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {firstProducts.map((p) => (
            <div key={p.name} className="rounded-2xl bg-white border border-ink-200 p-6">
              <div className="flex items-center justify-between gap-2">
                <div className="font-serif text-xl text-ink-900">{p.name}</div>
                <span className="text-[10px] uppercase tracking-widest rounded-full bg-ink-100 text-ink-600 px-2 py-0.5">
                  {p.tag}
                </span>
              </div>
              <p className="mt-2 text-ink-700 leading-relaxed text-sm">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 border-t border-ink-200">
        <span className="text-xs uppercase tracking-widest text-flame-700">For whom</span>
        <h2 className="font-serif text-3xl md:text-4xl mt-2 text-ink-900">
          Five audiences. One Lord.
        </h2>
        <div className="mt-8 grid md:grid-cols-5 gap-4">
          {audiences.map((a) => (
            <div key={a.title} className="rounded-2xl bg-ink-50 border border-ink-200 p-5">
              <div className="font-serif text-lg text-ink-900">{a.title}</div>
              <p className="mt-1.5 text-sm text-ink-600 leading-relaxed">{a.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 border-t border-ink-200">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <span className="text-xs uppercase tracking-widest text-flame-700">Guardrails</span>
            <h2 className="font-serif text-3xl md:text-4xl mt-2 text-ink-900">
              How we keep trust.
            </h2>
            <p className="mt-4 text-ink-700 leading-relaxed">
              Trust is not a tagline. It is a set of constraints we accept before we ship.
            </p>
          </div>
          <div className="md:col-span-7 grid sm:grid-cols-2 gap-4">
            {guardrails.map((g) => (
              <div key={g.title} className="rounded-2xl bg-white border border-ink-200 p-5">
                <div className="font-serif text-lg text-ink-900">{g.title}</div>
                <p className="mt-1.5 text-sm text-ink-600 leading-relaxed">{g.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 border-t border-ink-200">
        <span className="text-xs uppercase tracking-widest text-flame-700">Posture</span>
        <h2 className="font-serif text-3xl md:text-4xl mt-2 text-ink-900">Eight commitments.</h2>
        <ol className="mt-8 grid md:grid-cols-2 gap-3">
          {principles.map((p, i) => (
            <li key={p} className="flex gap-4 rounded-xl bg-white border border-ink-200 p-4">
              <span className="font-serif text-flame-700 text-lg leading-none mt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-ink-800 text-sm leading-relaxed">{p}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 border-t border-ink-200">
        <div className="rounded-3xl bg-ink-900 text-ink-50 p-10 md:p-14 text-center">
          <h2 className="font-serif text-3xl md:text-5xl">
            "Sanctify them in the truth; your word is truth."
          </h2>
          <p className="mt-3 text-ink-300">John 17:17</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/lens"
              className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-700 transition-colors"
            >
              Try the Verse Lens
            </Link>
            <Link
              href="/disciple"
              className="inline-flex items-center rounded-full border border-ink-50/30 text-ink-50 px-5 py-2.5 text-sm hover:bg-ink-50/10"
            >
              See the discipleship path
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
