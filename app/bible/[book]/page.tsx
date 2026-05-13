import Link from "next/link";
import { notFound } from "next/navigation";
import { canon, getBook } from "@/data/bible/canon";
import { seedChaptersOf } from "@/lib/bible";

export function generateStaticParams() {
  return canon.map((b) => ({ book: b.id }));
}

export default async function BookPage({ params }: { params: Promise<{ book: string }> }) {
  const { book: bookId } = await params;
  const book = getBook(bookId);
  if (!book) notFound();

  // Every chapter is loadable (runtime fetch from bible-api.com); we still
  // mark which chapters are seeded locally for instant load.
  const seeded = new Set(seedChaptersOf(book.id));
  const chapters = Array.from({ length: book.chapters }, (_, i) => i + 1);

  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-20">
      <Link href="/bible" className="text-xs uppercase tracking-widest text-flame-700 hover:underline">
        ← All books
      </Link>
      <h1 className="font-serif text-4xl md:text-5xl mt-3 text-ink-900 leading-tight">
        {book.name}
      </h1>
      <p className="mt-2 text-sm text-ink-500">
        {book.testament === "OT" ? "Old Testament" : "New Testament"} · {book.chapters} chapters
      </p>

      <div className="mt-10">
        <div className="text-xs uppercase tracking-widest text-flame-700">Chapters</div>
        <ul className="mt-3 grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
          {chapters.map((c) => {
            const isSeeded = seeded.has(c);
            return (
              <li key={c}>
                <Link
                  href={`/bible/${book.id}/${c}`}
                  className={`block aspect-square rounded-xl border flex items-center justify-center text-sm font-medium transition-colors ${
                    isSeeded
                      ? "bg-card border-flame-300 text-ink-900 hover:border-flame-500"
                      : "bg-card border-ink-200 text-ink-900 hover:border-flame-500"
                  }`}
                  aria-label={`${book.name} chapter ${c}`}
                >
                  {c}
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-xs text-ink-500">
          Every chapter loads instantly from authentic public-domain editions. Chapters with a
          flame border are bundled offline for zero-latency reading.
        </p>
      </div>
    </section>
  );
}
