import Link from "next/link";
import { canon, oldTestament, newTestament } from "@/data/bible/canon";
import { loadedChaptersOf, loadedSummary } from "@/lib/bible";
import { translations, translationOrder } from "@/data/bible/translations";
import { seed } from "@/data/bible/seed";

export const metadata = {
  title: "The Bible — Scripture Theory",
  description:
    "Read authentic, public-domain Bible translations — WEB, KJV, ASV, BBE, YLT, Darby, Douay-Rheims, Reina-Valera 1909, Almeida, Louis Segond, Luther, Synodal, CUV, Vulgate — with per-verse study tools.",
};

export default function BiblePage() {
  const summary = loadedSummary();
  const coveragePct = Math.round((summary.chaptersWithText / summary.totalChapters) * 100);

  // Which translations have any seeded text?
  const translationsWithSeed = new Set(seed.map((c) => c.translation));

  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">The Bible</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        The Word of God, in your hands.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        Every Bible served here is an <em>authentic, published, public-domain translation</em> —
        translated by real translators, in their own published wording. We never machine-translate
        Scripture. Read freely. Compare side-by-side. Highlight. Take notes. Bookmark. Open a
        passage in the Verse Lens.
      </p>

      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <Stat
          label="Translations in the catalog"
          value={`${summary.translationsCatalog} translations`}
          sub={`${summary.translationsLoaded} with text loaded today`}
        />
        <Stat
          label="Loaded right now"
          value={`${summary.chaptersWithText} / ${summary.totalChapters} chapters`}
          sub={`${coveragePct}% · ${summary.booksWithText} books with text`}
        />
        <Stat
          label="Full canon"
          value={`${summary.totalBooks} books`}
          sub="Ingest the rest: npm run ingest-bible"
        />
      </div>

      <div className="mt-10">
        <div className="text-xs uppercase tracking-widest text-flame-700">Translation catalog</div>
        <h2 className="font-serif text-2xl text-ink-900 mt-1">
          Authentic public-domain editions — never machine-translated.
        </h2>
        <ul className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {translationOrder.map((id) => {
            const t = translations[id];
            const hasSeed = translationsWithSeed.has(id);
            return (
              <li
                key={id}
                className={`rounded-2xl border p-4 ${
                  hasSeed ? "bg-white border-ink-200" : "bg-ink-50 border-ink-200"
                }`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-serif text-ink-900">{t.abbrev}</span>
                  <span
                    className={`text-[10px] uppercase tracking-widest ${
                      hasSeed ? "text-emerald-700" : "text-ink-400"
                    }`}
                  >
                    {hasSeed ? "Seeded" : "Ingest"}
                  </span>
                </div>
                <div className="text-sm text-ink-700 mt-0.5">{t.name}</div>
                <div className="text-xs text-ink-500 mt-1">
                  {t.languageNative} · {t.year}
                </div>
                <div className="text-[11px] text-ink-400 mt-1.5 leading-snug">{t.publisher}</div>
              </li>
            );
          })}
        </ul>
      </div>

      <Testament name="Old Testament" books={oldTestament} />
      <Testament name="New Testament" books={newTestament} />

      <div className="mt-12 rounded-3xl bg-ink-900 text-ink-50 p-8">
        <h2 className="font-serif text-2xl">Authentic. Open. Honest.</h2>
        <p className="mt-3 text-ink-200 leading-relaxed">
          We never machine-translate Scripture. Every translation in this Bible was made by named
          translators, published by named publishers, and is in the public domain. You are free to
          read, copy, share, preach, and print every word.
        </p>
        <p className="mt-3 text-ink-300 text-sm leading-relaxed">
          Hand-verified seed chapters are bundled with the repo so the architecture is honest from
          day one. To ingest the full canon across all available translations, run
          {" "}<code className="bg-ink-800 px-1.5 py-0.5 rounded">npm run ingest-bible</code>. It
          fetches authentic editions from <code className="bg-ink-800 px-1.5 py-0.5 rounded">bible-api.com</code>{" "}
          (WEB, KJV, ASV, BBE, YLT, Darby, Douay-Rheims, Almeida). The remaining translations
          (RVR1909, LSG, Luther, Synodal, CUV, Vulgate) are catalogued so they can be ingested from
          eBible.org and other public-domain sources as a Q1 task.
        </p>
      </div>
    </section>
  );
}

function Testament({ name, books }: { name: string; books: typeof canon }) {
  return (
    <div className="mt-10">
      <div className="text-xs uppercase tracking-widest text-flame-700">{name}</div>
      <h2 className="font-serif text-2xl text-ink-900 mt-1">{books.length} books</h2>
      <ul className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {books.map((b) => {
          const loaded = loadedChaptersOf(b.id);
          const hasText = loaded.length > 0;
          return (
            <li key={b.id}>
              <Link
                href={`/bible/${b.id}`}
                className={`block rounded-xl border p-3 transition-colors ${
                  hasText
                    ? "border-ink-200 bg-white hover:border-flame-500"
                    : "border-ink-200 bg-ink-50 text-ink-500 hover:border-ink-400"
                }`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-serif text-ink-900">{b.name}</span>
                  <span
                    className={`text-[10px] uppercase tracking-widest ${
                      hasText ? "text-emerald-700" : "text-ink-400"
                    }`}
                  >
                    {hasText ? `${loaded.length}/${b.chapters} ready` : `${b.chapters} ch`}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5">
      <div className="text-xs uppercase tracking-widest text-flame-700">{label}</div>
      <div className="font-serif text-ink-900 text-lg mt-1">{value}</div>
      <div className="text-xs text-ink-500 mt-0.5">{sub}</div>
    </div>
  );
}
