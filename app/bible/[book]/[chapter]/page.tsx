import Link from "next/link";
import { notFound } from "next/navigation";
import { canon, getBook } from "@/data/bible/canon";
import { getChapter, isLoaded, availableTranslations } from "@/lib/bible";
import BibleChapter from "@/components/BibleChapter";
import type { ChapterText } from "@/data/bible/seed";
import type { TranslationId } from "@/data/bible/translations";
import { translationOrder, translations } from "@/data/bible/translations";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ book: string; chapter: string }>;
}) {
  const { book, chapter } = await params;
  const meta = getBook(book);
  return {
    title: meta
      ? `${meta.name} ${chapter} — Scripture Theory`
      : "The Bible — Scripture Theory",
    description: `Read ${meta?.name ?? "Scripture"} ${chapter}.`,
  };
}

export default async function ChapterPage({
  params,
  searchParams,
}: {
  params: Promise<{ book: string; chapter: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { book: bookId, chapter: chapterStr } = await params;
  const query = await searchParams;
  const book = getBook(bookId);
  if (!book) notFound();
  const chapter = Number(chapterStr);
  if (Number.isNaN(chapter) || chapter < 1 || chapter > book.chapters)
    notFound();

  const available = availableTranslations(book.id, chapter);
  const requestedRaw = firstQueryValue(query.translation)?.toUpperCase();
  const requestedTranslation = isTranslationId(requestedRaw)
    ? requestedRaw
    : null;
  const fallbackTranslation = available.includes("WEB")
    ? "WEB"
    : (available[0] ?? "WEB");
  const initialTranslation =
    requestedTranslation && available.includes(requestedTranslation)
      ? requestedTranslation
      : fallbackTranslation;

  const requestedCompare = queryValues(query.compare)
    .flatMap((value) => value.split(","))
    .map((value) => value.trim().toUpperCase())
    .filter(Boolean);
  const validCompare = requestedCompare.filter(isTranslationId);
  const initialCompare = translationOrder
    .filter(
      (id) =>
        validCompare.includes(id) &&
        id !== initialTranslation &&
        available.includes(id),
    )
    .slice(0, 3);

  const droppedCompare =
    requestedCompare.some(
      (id) =>
        !isTranslationId(id) ||
        !available.includes(id) ||
        id === initialTranslation,
    ) || validCompare.length > 3;
  const initialStateMessage = readerStateMessage({
    requestedRaw,
    requestedTranslation,
    requestedAvailable: Boolean(
      requestedTranslation && available.includes(requestedTranslation),
    ),
    fallbackTranslation,
    bookName: book.name,
    chapter,
    droppedCompare,
  });

  // Never embed licensed text in cacheable HTML/RSC payloads. A licensed
  // deep-link starts on the selected reader state and fetches its text through
  // the explicitly no-store API after hydration.
  const preloadTranslation =
    translations[initialTranslation].provider === "crossway"
      ? available.find((id) => translations[id].provider !== "crossway")
      : initialTranslation;
  const initial = preloadTranslation
    ? await getChapter(book.id, chapter, preloadTranslation)
    : undefined;
  const chaptersByTranslation = {} as Record<
    TranslationId,
    ChapterText | undefined
  >;
  for (const t of translationOrder) {
    chaptersByTranslation[t] = t === preloadTranslation ? initial : undefined;
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

      <div className="mt-8">
        <BibleChapter
          key={`${book.id}:${chapter}`}
          chapters={chaptersByTranslation}
          bookId={book.id}
          bookName={book.name}
          chapterNum={chapter}
          available={available}
          initialTranslation={initialTranslation}
          initialCompare={initialCompare}
          translationFromUrl={Boolean(requestedRaw)}
          initialStateMessage={initialStateMessage}
          prev={prev}
          next={next}
        />
      </div>
    </section>
  );
}

function firstQueryValue(
  value: string | string[] | undefined,
): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function queryValues(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function isTranslationId(value: string | undefined): value is TranslationId {
  return Boolean(value && translationOrder.includes(value as TranslationId));
}

function readerStateMessage({
  requestedRaw,
  requestedTranslation,
  requestedAvailable,
  fallbackTranslation,
  bookName,
  chapter,
  droppedCompare,
}: {
  requestedRaw?: string;
  requestedTranslation: TranslationId | null;
  requestedAvailable: boolean;
  fallbackTranslation: TranslationId;
  bookName: string;
  chapter: number;
  droppedCompare: boolean;
}): string | null {
  const messages: string[] = [];
  if (requestedRaw && !requestedTranslation) {
    messages.push(
      `“${requestedRaw}” is not a recognised translation. Showing ${fallbackTranslation}.`,
    );
  } else if (requestedTranslation && !requestedAvailable) {
    messages.push(
      `${translations[requestedTranslation].name} is not available for ${bookName} ${chapter} on this deployment. Showing ${fallbackTranslation}.`,
    );
  }
  if (droppedCompare) {
    messages.push(
      "Some requested comparison editions were unavailable and were omitted.",
    );
  }
  return messages.length > 0 ? messages.join(" ") : null;
}

function computeNeighbor(
  bookId: string,
  chapter: number,
  step: 1 | -1,
): { book: string; chapter: number; bookName: string } | null {
  const book = getBook(bookId);
  if (!book) return null;
  const targetCh = chapter + step;
  if (
    targetCh >= 1 &&
    targetCh <= book.chapters &&
    isLoaded(bookId, targetCh)
  ) {
    return { book: bookId, chapter: targetCh, bookName: book.name };
  }
  const order = step > 0 ? canon : [...canon].reverse();
  const idx = order.findIndex((b) => b.id === bookId);
  for (let i = idx; i < order.length; i++) {
    const b = order[i];
    const start =
      b.id === bookId
        ? step > 0
          ? chapter + 1
          : chapter - 1
        : step > 0
          ? 1
          : b.chapters;
    if (step > 0) {
      for (let c = start; c <= b.chapters; c++)
        if (isLoaded(b.id, c))
          return { book: b.id, chapter: c, bookName: b.name };
    } else {
      for (let c = start; c >= 1; c--)
        if (isLoaded(b.id, c))
          return { book: b.id, chapter: c, bookName: b.name };
    }
  }
  return null;
}
