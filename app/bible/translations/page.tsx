import Link from "next/link";
import { translations, translationOrder, EDITORIAL_NOTE } from "@/data/bible/translations";
import { seed } from "@/data/bible/seed";

export const metadata = {
  title: "Translations — Scripture Theory",
  description:
    "The 14 authentic, published, public-domain Bible translations served on Scripture Theory. We never machine-translate Scripture.",
};

export default function TranslationsPage() {
  const seeded = new Set(seed.map((c) => c.translation));
  const englishCount = translationOrder.filter((id) => translations[id].language === "English").length;
  const langCount = new Set(translationOrder.map((id) => translations[id].language)).size;

  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-20">
      <Link href="/bible" className="text-xs uppercase tracking-widest text-flame-700 hover:underline">
        ← The Bible
      </Link>

      <div className="mt-4">
        <span className="text-xs uppercase tracking-widest text-flame-700">References</span>
        <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
          Translations served on Scripture Theory.
        </h1>
        <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
          {translationOrder.length} authentic public-domain editions across {langCount} languages
          ({englishCount} English plus 7 other tongues). Every Bible served here is a real
          translation made by named human translators — never machine-translated, never AI-paraphrased.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-ink-200 bg-card-subtle p-5 text-sm text-ink-700 leading-relaxed">
        <strong className="text-ink-900">Our editorial standard.</strong> {EDITORIAL_NOTE}
      </div>

      <ul className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {translationOrder.map((id) => {
          const t = translations[id];
          const isSeeded = seeded.has(id);
          return (
            <li
              key={id}
              className="rounded-2xl border border-ink-200 bg-card p-5"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-serif text-ink-900 text-lg">{t.abbrev}</span>
                <span
                  className={`text-[10px] uppercase tracking-widest ${
                    isSeeded ? "text-emerald-700" : "text-ink-400"
                  }`}
                >
                  {isSeeded ? "Seeded" : "On-demand"}
                </span>
              </div>
              <div className="text-sm text-ink-700 mt-0.5">{t.name}</div>
              <div className="text-xs text-ink-500 mt-1">
                {t.languageNative} · {t.year}
              </div>
              <div className="text-[11px] text-ink-400 mt-1.5 leading-snug">{t.publisher}</div>
              {t.note && (
                <div className="text-[11px] text-flame-700 mt-1.5 leading-snug italic">
                  {t.note}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-12 rounded-3xl bg-ink-900 text-ink-50 p-8">
        <h2 className="font-serif text-2xl">How chapters load</h2>
        <p className="mt-3 text-ink-200 leading-relaxed">
          When you open a chapter in your selected translation, we serve it from one of three
          places, in this order:
        </p>
        <ol className="mt-4 space-y-2 text-sm text-ink-200">
          <li>
            <strong className="text-ink-50">1.</strong> The on-disk seed (a small set of hand-verified
            chapters bundled in the repo for instant offline reading).
          </li>
          <li>
            <strong className="text-ink-50">2.</strong> The ingested catalog (when{" "}
            <code className="bg-ink-800 px-1.5 py-0.5 rounded text-xs">npm run ingest-bible</code>{" "}
            has been run, the full WEB / KJV / ASV / DRA / Almeida live in the build).
          </li>
          <li>
            <strong className="text-ink-50">3.</strong> A live, server-cached fetch from
            {" "}<code className="bg-ink-800 px-1.5 py-0.5 rounded text-xs">bible-api.com</code>{" "}
            (free, public-domain). The first visitor pays the network round-trip; everyone after
            them gets the cached chapter for 24 hours.
          </li>
        </ol>
        <p className="mt-4 text-sm text-ink-300">
          The result: every chapter of every book in any of our translations loads on first visit.
          The "Seeded" badge above marks editions that ship offline-ready.
        </p>
      </div>
    </section>
  );
}
