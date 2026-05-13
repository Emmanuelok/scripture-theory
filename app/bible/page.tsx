import Link from "next/link";
import { canon, oldTestament, newTestament } from "@/data/bible/canon";
import { loadedSummary } from "@/lib/bible";
import { translationOrder } from "@/data/bible/translations";

export const metadata = {
  title: "The Bible — Scripture Theory",
  description:
    "Read the Bible in 11 authentic, public-domain translations. Highlight verses, take notes, save bookmarks. Compare translations side-by-side.",
};

export default function BiblePage() {
  const summary = loadedSummary();

  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-20">
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-widest text-flame-700">The Bible</span>
        <h1 className="font-serif text-4xl md:text-6xl mt-2 text-ink-900 leading-tight">
          The Word of God,<br />in your hands.
        </h1>
        <p className="mt-5 text-ink-700 max-w-xl mx-auto leading-relaxed">
          Open any chapter in any of {translationOrder.length} authentic public-domain
          translations. Highlight, bookmark, take notes — your study lives quietly on your device.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
          <Link
            href="/bible/john/3"
            className="inline-flex items-center rounded-full bg-ink-900 text-ink-50 px-5 py-2.5 hover:bg-flame-700 transition-colors"
          >
            Read John 3 →
          </Link>
          <Link
            href="/bible/my"
            className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2.5 text-ink-800 hover:border-ink-900 transition-colors"
          >
            My highlights & notes
          </Link>
          <Link
            href="/bible/translations"
            className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2.5 text-ink-800 hover:border-ink-900 transition-colors"
          >
            About the {summary.translationsCatalog} translations
          </Link>
        </div>
      </div>

      <Testament name="Old Testament" books={oldTestament} />
      <Testament name="New Testament" books={newTestament} />
    </section>
  );
}

function Testament({ name, books }: { name: string; books: typeof canon }) {
  return (
    <div className="mt-12">
      <div className="text-xs uppercase tracking-widest text-flame-700">{name}</div>
      <h2 className="font-serif text-2xl text-ink-900 mt-1">{books.length} books</h2>
      <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
        {books.map((b) => (
          <li key={b.id}>
            <Link
              href={`/bible/${b.id}`}
              className="block rounded-xl border border-ink-200 bg-card p-3 hover:border-flame-500 hover:shadow-sm transition-all"
            >
              <div className="font-serif text-ink-900">{b.name}</div>
              <div className="text-[10px] uppercase tracking-widest text-ink-400 mt-0.5">
                {b.chapters} ch
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
