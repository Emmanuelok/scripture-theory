import Link from "next/link";
import { gospelMovements, prayerOfResponse, nextSteps } from "@/data/gospel";

export const metadata = {
  title: "The Gospel — Scripture Theory",
  description:
    "The ONE Gospel of Jesus Christ, clearly and kindly told: God, our sin, Jesus crucified and risen, our response.",
};

export default function GospelPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">The Gospel</span>
      <h1 className="font-serif text-4xl md:text-6xl mt-2 text-ink-900 leading-tight">
        The best news the world has ever heard.
      </h1>
      <p className="mt-5 text-lg text-ink-700 leading-relaxed">
        There is only one Gospel. Two thousand years of Christians from every nation, language, and
        tradition have lived and died for the same simple, life-giving truth about Jesus. Here it
        is — in four short movements.
      </p>

      <ol className="mt-12 space-y-10">
        {gospelMovements.map((m) => (
          <li
            key={m.number}
            className="rounded-3xl border border-ink-200 bg-white p-6 md:p-9 glow-ring"
          >
            <div className="flex flex-wrap items-baseline gap-4">
              <span className="font-serif text-5xl text-flame-700 leading-none">{m.number}</span>
              <div>
                <h2 className="font-serif text-3xl text-ink-900">{m.title}</h2>
                <p className="text-ink-500 mt-0.5">{m.subtitle}</p>
              </div>
            </div>
            <blockquote className="mt-6 border-l-4 border-flame-300 pl-5 prose-scripture text-ink-800">
              <p>"{m.scripture}"</p>
              <footer className="text-sm text-ink-500 mt-2 not-italic">— {m.reference}</footer>
            </blockquote>
            <p className="mt-6 text-ink-800 leading-relaxed">{m.body}</p>
            <div className="mt-5 border-t border-ink-100 pt-4">
              <div className="text-xs uppercase tracking-widest text-ink-400">Also see</div>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {m.echoes.map((e) => (
                  <span
                    key={e}
                    className="rounded-full bg-ink-50 border border-ink-200 px-3 py-0.5 text-xs text-ink-600"
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-16 rounded-3xl bg-ink-900 text-ink-50 p-8 md:p-10">
        <span className="text-xs uppercase tracking-widest text-flame-300">
          A prayer of response
        </span>
        <h2 className="font-serif text-3xl mt-2">Talk to Jesus right now.</h2>
        <p className="mt-3 text-ink-200 leading-relaxed">{prayerOfResponse.intro}</p>
        <pre className="mt-6 whitespace-pre-wrap font-serif text-lg leading-relaxed text-ink-50 bg-ink-800 border border-ink-700 rounded-2xl p-6">
{prayerOfResponse.prayer}
        </pre>
      </div>

      <div className="mt-14">
        <h2 className="font-serif text-2xl md:text-3xl text-ink-900">
          If you prayed that — or want to — do these four things this week.
        </h2>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {nextSteps.map((s, i) => (
            <div key={s.title} className="rounded-2xl bg-white border border-ink-200 p-5">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-flame-700 text-2xl leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-lg text-ink-900">{s.title}</h3>
              </div>
              <p className="mt-2 text-sm text-ink-700 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/read"
            className="inline-flex items-center rounded-full bg-ink-900 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-700 transition-colors"
          >
            Start the John 30-day plan →
          </Link>
          <Link
            href="/pray"
            className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2.5 text-sm text-ink-800 hover:border-ink-900"
          >
            Learn to pray
          </Link>
          <Link
            href="/connect"
            className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2.5 text-sm text-ink-800 hover:border-ink-900"
          >
            Find a local church
          </Link>
        </div>
      </div>
    </section>
  );
}
