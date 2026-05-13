import Link from "next/link";
import { DISCIPLINES } from "@/data/resources/disciplines";
import { referenceHref } from "@/lib/reference";

export const metadata = {
  title: "Spiritual disciplines — Scripture Theory",
  description:
    "How the saints have actually grown. Scripture, prayer, fasting, Sabbath, solitude, confession, generosity, and service — with starter practices for each.",
};

export default function DisciplinesPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-20">
      <Link href="/resources" className="text-xs uppercase tracking-widest text-flame-700 hover:underline">
        ← Resources
      </Link>
      <h1 className="font-serif text-4xl md:text-5xl mt-3 text-ink-900 leading-tight">
        Spiritual disciplines.
      </h1>
      <p className="mt-3 text-ink-700 leading-relaxed">
        None of these earn anything; all of them prepare the soil. Pick one this season and walk
        with it. Don't try to start them all at once.
      </p>

      <ol className="mt-10 space-y-6">
        {DISCIPLINES.map((d, i) => (
          <li key={d.slug} className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring">
            <div className="flex items-baseline gap-4">
              <span className="font-serif text-flame-700 text-3xl leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h2 className="font-serif text-2xl text-ink-900">{d.name}</h2>
                <p className="text-ink-500 italic mt-0.5">{d.oneLine}</p>
              </div>
            </div>

            <p className="mt-4 text-ink-700 leading-relaxed">{d.why}</p>

            <div className="mt-5 rounded-2xl bg-card-subtle border border-ink-200 p-5">
              <div className="text-xs uppercase tracking-widest text-flame-700">A way to start</div>
              <ul className="mt-3 space-y-2 text-sm text-ink-800">
                {d.start.map((s, i) => (
                  <li key={i} className="flex gap-3 leading-relaxed">
                    <span className="text-flame-700 shrink-0">·</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <div className="text-[10px] uppercase tracking-widest text-ink-500 mb-2">Anchored in</div>
              <ul className="space-y-2">
                {d.scriptures.map((s) => {
                  const href = referenceHref(s.ref);
                  return (
                    <li key={s.ref} className="border-l-2 border-flame-300 pl-3">
                      <p className="prose-scripture text-sm text-ink-800 italic">"{s.text}"</p>
                      <div className="text-xs text-ink-500 mt-1">
                        —{" "}
                        {href ? (
                          <Link href={href} className="hover:text-flame-700 underline">{s.ref}</Link>
                        ) : (
                          s.ref
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-14 rounded-3xl bg-ink-900 text-ink-50 p-8 text-center">
        <p className="font-serif text-2xl leading-snug">
          "Train yourself for godliness; for bodily exercise has some value, but godliness has
          value in all things."
        </p>
        <p className="mt-2 text-ink-300">1 Timothy 4:7–8</p>
      </div>
    </section>
  );
}
