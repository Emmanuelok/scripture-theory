import Link from "next/link";
import { canon, oldTestament, newTestament } from "@/data/bible/canon";
import { loadedChaptersOf, loadedSummary } from "@/lib/bible";
import { TRANSLATION_NAME, TRANSLATION_LICENSE } from "@/data/bible/seed";

export const metadata = {
  title: "The Bible — Scripture Theory",
  description:
    "Read the World English Bible (public domain) with per-verse study tools — highlights, notes, bookmarks, cross-references — and a path back to JESUS on every page.",
};

export default function BiblePage() {
  const summary = loadedSummary();
  const coveragePct = Math.round((summary.chaptersWithText / summary.totalChapters) * 100);

  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">The Bible</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        The Word of God, in your hands.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        We are not building a Bible app. We are putting God's Word at the center of an entire
        platform that exists to lift up His Son. Read freely. Highlight. Take notes. Bookmark.
        Open a passage in the Verse Lens. Then go and obey.
      </p>

      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <Stat label="Translation" value={TRANSLATION_NAME} sub={TRANSLATION_LICENSE} />
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

      <Testament name="Old Testament" books={oldTestament} />
      <Testament name="New Testament" books={newTestament} />

      <div className="mt-12 rounded-3xl bg-ink-900 text-ink-50 p-8">
        <h2 className="font-serif text-2xl">Open. Free. Honest.</h2>
        <p className="mt-3 text-ink-200 leading-relaxed">
          The Bible served here is the <strong>World English Bible (WEB)</strong> — a public-domain,
          modern, accurate English translation by Michael Paul Johnson and a team of scholars,
          released by eBible.org. You are free to read, copy, share, preach, and print it.
        </p>
        <p className="mt-3 text-ink-300 text-sm leading-relaxed">
          The chapters above marked "loaded" are seeded in the repo. To bring in the full 66-book
          canon, run <code className="bg-ink-800 px-1.5 py-0.5 rounded">npm run ingest-bible</code> in
          the project — it fetches WEB from <code className="bg-ink-800 px-1.5 py-0.5 rounded">bible-api.com</code>
          {" "}and writes data/bible/text.ts. Q1 roadmap: ship full WEB plus public-domain Spanish (RVR1909),
          Portuguese (Almeida), French (LSG), and Swahili (SUV) editions as ingestion targets.
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
