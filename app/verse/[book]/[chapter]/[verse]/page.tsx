import Link from "next/link";
import { notFound } from "next/navigation";
import { getBook } from "@/data/bible/canon";
import { getChapter } from "@/lib/bible";
import { translations, type TranslationId } from "@/data/bible/translations";
import { crossRefsFor } from "@/data/bible/cross-refs";
import { referenceHref } from "@/lib/reference";
import { PageHero, Tile } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";
import VerseShareButtons from "@/components/VerseShareButtons";
import VerseCardEditor from "@/components/VerseCardEditor";

type Params = Promise<{ book: string; chapter: string; verse: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { book, chapter, verse } = await params;
  const b = getBook(book);
  const ch = Number(chapter);
  const v = Number(verse);
  if (!b || Number.isNaN(ch) || Number.isNaN(v)) {
    return { title: "Verse — Scripture Theory" };
  }
  const ref = `${b.name} ${ch}:${v}`;
  const chapterText = await getChapter(book, ch);
  const verseText = chapterText?.verses.find((vv) => vv.v === v)?.t;
  const description = verseText
    ? `"${verseText.slice(0, 160)}${verseText.length > 160 ? "…" : ""}" — ${ref}`
    : ref;
  const card = `/api/verse-card/${book}/${ch}/${v}?translation=WEB&theme=light`;
  return {
    title: `${ref} — Scripture Theory`,
    description,
    openGraph: {
      title: ref,
      description,
      images: [card],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: ref,
      description,
      images: [card],
    },
  };
}

export default async function VersePermalinkPage({ params }: { params: Params }) {
  const { book, chapter, verse } = await params;
  const b = getBook(book);
  const ch = Number(chapter);
  const v = Number(verse);
  if (!b || Number.isNaN(ch) || Number.isNaN(v)) notFound();

  const chapterText = await getChapter(book, ch);
  if (!chapterText) {
    // Upstream fetch failed for a valid permalink (this is a social-share
    // target). Degrade to a graceful 200 with the reference and navigation
    // rather than a hard 404 or a 500 — the reader can retry or open the
    // chapter. This route is dynamic, so the failure is never cached.
    return <VerseUnavailable book={b!.name} bookId={book} chapter={ch} verse={v} />;
  }
  const verseRow = chapterText.verses.find((vv) => vv.v === v);
  if (!verseRow) notFound();

  const translation: TranslationId = (chapterText?.translation as TranslationId) ?? "WEB";
  const meta = translations[translation];
  const ref = `${b!.name} ${ch}:${v}`;
  const crossRefs = crossRefsFor(book, ch, v);
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-24">
      <Link href={`/bible/${book}/${ch}`} className="text-xs uppercase tracking-widest text-flame-700 hover:underline">
        ← {b!.name} {ch}
      </Link>
      <PageHero
        eyebrow={`${meta.abbrev} · public domain`}
        title={ref}
        intro="One verse, one link. Send to a friend who needs it."
      />

      {/* Verse hero card */}
      <article className="mt-10 relative overflow-hidden rounded-3xl bg-ink-900 text-ink-50 p-8 md:p-12">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(70% 60% at 0% 0%, rgba(249,115,22,0.20), transparent 60%), radial-gradient(60% 40% at 100% 100%, rgba(184,66,12,0.16), transparent 60%)",
          }}
        />
        <div className="relative">
          <div className="text-[10px] uppercase tracking-[0.22em] text-flame-300">
            {ref} · {meta.abbrev}
          </div>
          <blockquote className="mt-4 font-serif text-2xl md:text-4xl leading-snug text-ink-50">
            "{verseRow.t}"
          </blockquote>
        </div>
      </article>

      {/* Share + open in Bible */}
      <div className="mt-6">
        <VerseShareButtons
          bookId={book}
          chapter={ch}
          verse={v}
          bookName={b!.name}
          verseText={verseRow.t}
          translation={translation}
          translationAbbrev={meta.abbrev}
        />
      </div>

      {/* Verse card editor */}
      <div className="mt-10">
        <h2 className="font-serif text-2xl text-ink-900">A card to share</h2>
        <p className="mt-1 text-sm text-ink-600">
          Pick a template, choose a palette, even rewrite the text to fit your own
          words — every change updates the preview live. Open full-size to save.
        </p>
        <div className="mt-5">
          <VerseCardEditor
            book={book}
            chapter={ch}
            verse={v}
            translation={translation}
            translationAbbrev={meta.abbrev ?? translation}
            defaultVerseText={verseRow.t}
            defaultRef={ref}
          />
        </div>
      </div>

      {/* Cross-references */}
      {crossRefs.length > 0 && (
        <div className="mt-10">
          <h2 className="font-serif text-2xl text-ink-900">Cross-references</h2>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {crossRefs.map((r) => {
              const href = referenceHref(r);
              return href ? (
                <Link
                  key={r}
                  href={href}
                  className="rounded-full border border-ink-200 bg-card px-3 py-1 text-xs text-ink-700 hover:border-flame-500"
                >
                  {r}
                </Link>
              ) : (
                <span
                  key={r}
                  className="rounded-full border border-ink-200 bg-card px-3 py-1 text-xs text-ink-500"
                >
                  {r}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Open in Bible */}
      <div className="mt-10 grid md:grid-cols-2 gap-3">
        <Tile
          href={`/bible/${book}/${ch}`}
          title={`Read ${b!.name} ${ch}`}
          sub="The whole chapter, in context, with notes and bookmarks."
          glyph={<Glyph id="open-book" size={48} />}
        />
        <Tile
          href={`/bible/${book}`}
          title={`The book of ${b!.name}`}
          sub={`${b!.chapters} chapters. Pick another.`}
          glyph={<Glyph id="library" size={48} />}
        />
      </div>

      <p className="mt-10 text-xs text-ink-500 text-center max-w-xl mx-auto italic">
        "The grass withers, the flower fades, but the word of our God will stand forever." —
        Isaiah 40:8
      </p>
    </section>
  );
}

/** Graceful fallback when the verse text can't be loaded right now. */
function VerseUnavailable({
  book,
  bookId,
  chapter,
  verse,
}: {
  book: string;
  bookId: string;
  chapter: number;
  verse: number;
}) {
  const ref = `${book} ${chapter}:${verse}`;
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-24">
      <Link href={`/bible/${bookId}/${chapter}`} className="text-xs uppercase tracking-widest text-flame-700 hover:underline">
        ← {book} {chapter}
      </Link>
      <PageHero eyebrow="verse" title={ref} intro="One verse, one link." />
      <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-8 text-amber-900">
        <p className="text-sm leading-relaxed">
          We couldn&apos;t load the text of {ref} just now — the public-domain
          source didn&apos;t answer. Please refresh, or open the whole chapter.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={`/bible/${bookId}/${chapter}`}
            className="inline-flex items-center rounded-full bg-ink-900 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-700 transition-colors"
          >
            Read {book} {chapter} →
          </Link>
          <Link
            href={`/bible/${bookId}`}
            className="inline-flex items-center rounded-full border border-ink-300 bg-card px-5 py-2.5 text-sm text-ink-900 hover:border-ink-900 transition-colors"
          >
            The book of {book}
          </Link>
        </div>
      </div>
    </section>
  );
}
