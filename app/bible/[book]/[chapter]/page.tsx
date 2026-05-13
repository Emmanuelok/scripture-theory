import Link from "next/link";
import { notFound } from "next/navigation";
import { canon, getBook } from "@/data/bible/canon";
import { getChapter, isLoaded, availableTranslations } from "@/lib/bible";
import BibleChapter from "@/components/BibleChapter";
import type { ChapterText } from "@/data/bible/seed";
import type { TranslationId } from "@/data/bible/translations";
import { translations as transMeta, translationOrder } from "@/data/bible/translations";

export function generateStaticParams() {
  const out: { book: string; chapter: string }[] = [];
  for (const b of canon) {
    for (let c = 1; c <= b.chapters; c++) {
      out.push({ book: b.id, chapter: String(c) });
    }
  }
  return out;
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
  const chaptersByTranslation = {} as Record<TranslationId, ChapterText | undefined>;
  for (const t of translationOrder) {
    chaptersByTranslation[t] = getChapter(book.id, chapter, t);
  }

  const prev = computeNeighbor(book.id, chapter, -1);
  const next = computeNeighbor(book.id, chapter, +1);

  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-20">
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
        {available.length > 0
          ? `${available.length} authentic translation${available.length === 1 ? "" : "s"} available · all public domain`
          : "Not yet ingested"}
      </p>

      <div className="mt-8">
        {available.length > 0 ? (
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
          <NotIngested book={book.name} chapter={chapter} />
        )}
      </div>
    </section>
  );
}

function NotIngested({ book, chapter }: { book: string; chapter: number }) {
  return (
    <div className="rounded-3xl border border-ink-200 bg-white p-8 glow-ring">
      <div className="text-xs uppercase tracking-widest text-flame-700">Not yet ingested</div>
      <h2 className="font-serif text-2xl text-ink-900 mt-2">
        {book} {chapter} is part of the canon — it just isn't loaded in this build yet.
      </h2>
      <p className="mt-3 text-ink-700 leading-relaxed">
        Every Bible served here is an <em>authentic, published, public-domain translation</em> — no
        machine translation. To fill in more of the canon and more translations, run the ingestion
        script:
      </p>
      <pre className="mt-3 rounded-xl bg-ink-900 text-ink-50 p-4 text-sm overflow-x-auto">
{`# from the project root
npm run ingest-bible
# or restrict to one translation:
npm run ingest-bible -- --translations=kjv
# or one book in many translations:
npm run ingest-bible -- --books=psalms`}
      </pre>
      <p className="mt-3 text-sm text-ink-500 leading-relaxed">
        It fetches authentic, mainstream-accepted, public-domain editions from
        {" "}<code className="bg-ink-100 px-1.5 py-0.5 rounded">bible-api.com</code>{" "}
        (WEB, KJV, ASV, Douay-Rheims, Almeida) and writes
        {" "}<code className="bg-ink-100 px-1.5 py-0.5 rounded">data/bible/text.ts</code>.
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
