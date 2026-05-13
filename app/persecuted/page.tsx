import Link from "next/link";
import { flagEmoji } from "@/lib/flags";
import NationFlag from "@/components/NationFlag";
import {
  persecutedNations,
  persecutedOfTheMonth,
  persecutedTheology,
  monthlyPrayerLiturgy,
} from "@/data/persecuted";

export const metadata = {
  title: "The Persecuted Church — Scripture Theory",
  description:
    "365 million Christians live under high or extreme pressure for following Jesus. A 12-month rotation of nations where the cost is real — with specific, scriptural prayer points. Remember the prisoners as if chained with them. — Hebrews 13:3",
};

export default function PersecutedHub() {
  const today = persecutedOfTheMonth();
  const liturgy = monthlyPrayerLiturgy.map((l) => l.replace("{nation}", today.name));

  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">
        The Persecuted Church
      </span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        Remember them.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        About 365 million believers face high or extreme pressure for following Jesus. They are
        our family — when one part suffers, every part suffers (1 Corinthians 12:26). Twelve
        nations, one each month, with specific prayer points and Scripture.
      </p>
      <p className="mt-2 text-xs text-ink-500">
        "Remember the prisoners as if chained with them — those who are mistreated, since you
        yourselves are in the body also." — Hebrews 13:3
      </p>

      <section className="mt-10 rounded-3xl overflow-hidden border border-flame-500 bg-card glow-ring">
        <div className="relative aspect-[16/7] bg-ink-800 overflow-hidden">
          <NationFlag
            iso={today.iso}
            alt={`Flag of ${today.name}`}
            width={1280}
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/30 via-ink-900/10 to-ink-900/85" />
          <div className="absolute top-4 left-5">
            <span className="text-[10px] uppercase tracking-widest text-flame-300">
              This month · pray daily
            </span>
          </div>
          <div className="absolute bottom-5 left-5 right-5 flex items-end gap-3">
            <span className="text-5xl leading-none" aria-hidden>
              {flagEmoji(today.iso)}
            </span>
            <div>
              <div className="font-serif text-3xl md:text-4xl text-ink-50 leading-none">
                {today.name}
              </div>
              <div className="text-xs text-ink-300 mt-1">{today.region}</div>
            </div>
          </div>
        </div>
        <div className="p-6 md:p-8">
          <p className="text-ink-800 leading-relaxed">{today.context}</p>

          <div className="mt-6 grid md:grid-cols-2 gap-5">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-flame-700">
                The reality
              </div>
              <ul className="mt-2 space-y-1.5 text-sm text-ink-700 list-disc pl-5">
                {today.realities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-flame-700">
                Pray specifically
              </div>
              <ul className="mt-2 space-y-1.5 text-sm text-ink-700 list-disc pl-5">
                {today.prayerPoints.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          </div>

          <blockquote className="mt-6 border-l-2 border-flame-500 pl-4 italic text-ink-800">
            "{today.scripture.text}"
            <div className="mt-1 not-italic text-xs text-ink-500">— {today.scripture.ref}</div>
          </blockquote>

          <div className="mt-6 rounded-2xl bg-ink-900 text-ink-50 p-5">
            <div className="text-[10px] uppercase tracking-widest text-flame-300">Pray this</div>
            <ol className="mt-2 space-y-2 text-sm text-ink-100 leading-relaxed">
              {liturgy.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-2xl text-ink-900">The twelve, by month</h2>
        <p className="text-sm text-ink-600 mt-1">
          One country a month. Pray for them by name.
        </p>
        <ul className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {persecutedNations.map((n, i) => (
            <li
              key={n.iso}
              className={`rounded-2xl border p-5 ${
                n.iso === today.iso ? "border-flame-500 bg-flame-50/50" : "border-ink-200 bg-card"
              }`}
            >
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-flame-700">
                    Month {i + 1}
                  </div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl" aria-hidden>
                      {flagEmoji(n.iso)}
                    </span>
                    <span className="font-serif text-xl text-ink-900">{n.name}</span>
                  </div>
                  <div className="text-xs text-ink-500 mt-0.5">{n.region}</div>
                </div>
              </div>
              <ul className="mt-3 text-xs text-ink-700 list-disc pl-5 space-y-1">
                {n.prayerPoints.slice(0, 2).map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-2xl text-ink-900">Why we pray</h2>
        <div className="mt-5 grid md:grid-cols-3 gap-4">
          {persecutedTheology.map((t) => (
            <div key={t.title} className="rounded-2xl border border-ink-200 bg-card p-5">
              <div className="font-serif text-lg text-ink-900">{t.title}</div>
              <p className="text-sm text-ink-700 mt-2 leading-relaxed">{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-3xl bg-ink-900 text-ink-50 p-8 text-center">
        <p className="font-serif text-2xl leading-snug">
          "These are the ones who come out of the great tribulation, and washed their robes and
          made them white in the blood of the Lamb."
        </p>
        <p className="mt-3 text-ink-300">Revelation 7:14</p>
        <Link
          href="/pray/nations"
          className="mt-6 inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-700"
        >
          Continue praying for the nations →
        </Link>
      </section>
    </section>
  );
}
