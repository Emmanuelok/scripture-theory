import Link from "next/link";
import { notFound } from "next/navigation";
import { canon, getBook } from "@/data/bible/canon";
import { getChapter, isLoaded, availableTranslations } from "@/lib/bible";
import BibleChapter from "@/components/BibleChapter";
import type { ChapterText } from "@/data/bible/seed";
import type { TranslationId } from "@/data/bible/translations";
import { translationOrder } from "@/data/bible/translations";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ book: string; chapter: string }>;
}) {
  const { book, chapter } = await params;
  const meta = getBook(book);
  return {
    title: meta ? `${meta.name} ${chapter} — Scripture Theory` : "The Bible — Scripture Theory",
    description: `Read ${meta?.name ?? "Scripture"} ${chapter} in multiple authentic public-domain translations.`,
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ book: string; chapter: string }>;
}) {
  const { book: bookId, chapter: chapterStr } = await params;
  const book = getBook(bookId);
  if (!book) notFound();
  const chapter = Number(chapterStr);
  if (Number.isNaN(chapter) || chapter < 1 || chapter > book.chapters) notFound();

  const available = availableTranslations(book.id, chapter);

  // Fetch the WEB chapter eagerly (the default view). Other translations are
  // fetched on-demand by the client component when the user switches to them.
  const initial = await getChapter(book.id, chapter, "WEB");
  const chaptersByTranslation = {} as Record<TranslationId, ChapterText | undefined>;
  for (const t of translationOrder) {
    chaptersByTranslation[t] = t === "WEB" ? initial : undefined;
  }

  const prev = computeNeighbor(book.id, chapter, -1);
  const next = computeNeighbor(book.id, chapter, +1);

  return (
    <section className="mx-auto max-w-3xl px-3 sm:px-5 pt-8 sm:pt-12 pb-32 sm:pb-24">
      <Link
        href={`/bible/${book.id}`}
        className="text-xs uppercase tracking-widest text-flame-700 hover:underline"
      >
        ← {book.name}
      </Link>
      <h1 className="font-serif text-4xl md:text-5xl mt-3 text-ink-900 leading-tight">
        {book.name} {chapter}
      </h1>
      <p className="mt-2 text-sm text-ink-500">
        {available.length} authentic translation{available.length === 1 ? "" : "s"} available · all
        public domain
      </p>

      <div className="mt-8">
        {initial ? (
          <BibleChapter
            chapters={chaptersByTranslation}
            bookId={book.id}
            bookName={book.name}
            chapterNum={chapter}
            available={available}
            prev={prev}
            next={next}
          />
        ) : (
          <FetchFailure book={book.name} chapter={chapter} />
        )}
      </div>
    </section>
  );
}

function FetchFailure({ book, chapter }: { book: string; chapter: number }) {
  return (
    <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 text-amber-900">
      <div className="text-xs uppercase tracking-widest text-amber-700">
        Couldn't reach the upstream just now
      </div>
      <h2 className="font-serif text-2xl mt-2">
        {book} {chapter} should be here.
      </h2>
      <p className="mt-3 text-sm leading-relaxed">
        The Bible is fetched live from <code className="bg-amber-100 px-1.5 py-0.5 rounded">bible-api.com</code>
        {" "}(public-domain). The request failed this time. Try again in a moment, or refresh.
      </p>
    </div>
  );
}

function computeNeighbor(
  bookId: string,
  chapter: number,
  step: 1 | -1
): { book: string; chapter: number; bookName: string } | null {
  const book = getBook(bookId);
  if (!book) return null;
  const targetCh = chapter + step;
  if (targetCh >= 1 && targetCh <= book.chapters && isLoaded(bookId, targetCh)) {
    return { book: bookId, chapter: targetCh, bookName: book.name };
  }
  const order = step > 0 ? canon : [...canon].reverse();
  const idx = order.findIndex((b) => b.id === bookId);
  for (let i = idx; i < order.length; i++) {
    const b = order[i];
    const start =
      b.id === bookId ? (step > 0 ? chapter + 1 : chapter - 1) : step > 0 ? 1 : b.chapters;
    if (step > 0) {
      for (let c = start; c <= b.chapters; c++)
        if (isLoaded(b.id, c)) return { book: b.id, chapter: c, bookName: b.name };
    } else {
      for (let c = start; c >= 1; c--)
        if (isLoaded(b.id, c)) return { book: b.id, chapter: c, bookName: b.name };
    }
  }
  return null;
}
