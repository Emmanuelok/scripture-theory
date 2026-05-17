import Link from "next/link";
import { notFound } from "next/navigation";
import { devotional } from "@/data/devotional";
import { findDevotional, slugifyDevotional } from "@/lib/devotional-slug";
import { referenceHref } from "@/lib/reference";
import { PageHero, Tile } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return devotional.map((d) => ({ slug: slugifyDevotional(d.title) }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const found = findDevotional(slug);
  if (!found) return { title: "Devotional — Scripture Theory" };
  return {
    title: `${found.entry.title} — Scripture Theory`,
    description: `"${found.entry.verseText.slice(0, 160)}" — ${found.entry.reference}`,
  };
}

export default async function DevotionalEntryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const found = findDevotional(slug);
  if (!found) notFound();
  const { entry, index } = found;

  const prev = devotional[(index - 1 + devotional.length) % devotional.length];
  const next = devotional[(index + 1) % devotional.length];

  const bibleHref = entry.bookId
    ? entry.verse
      ? `/verse/${entry.bookId}/${entry.chapter}/${entry.verse}`
      : `/bible/${entry.bookId}/${entry.chapter}`
    : referenceHref(entry.reference);

  const versePermalink =
    entry.bookId && entry.chapter && entry.verse
      ? `/verse/${entry.bookId}/${entry.chapter}/${entry.verse}`
      : null;

  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-24">
      <Link
        href="/devotional"
        className="text-xs uppercase tracking-widest text-flame-700 hover:underline"
      >
        ← Library
      </Link>

      <PageHero
        eyebrow={entry.reference}
        title={entry.title}
        intro="A five-minute meditation. Read it slowly. Pray it out loud."
      />

      {/* Verse */}
      <article className="mt-10 relative overflow-hidden rounded-3xl bg-ink-900 text-ink-50 p-8 md:p-10">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(70% 60% at 0% 0%, rgba(249,115,22,0.18), transparent 60%), radial-gradient(60% 40% at 100% 100%, rgba(184,66,12,0.16), transparent 60%)",
          }}
        />
        <div className="relative">
          <div className="text-[10px] uppercase tracking-[0.22em] text-flame-300">
            {entry.reference} · WEB
          </div>
          <blockquote className="mt-3 font-serif text-2xl md:text-3xl leading-snug">
            "{entry.verseText}"
          </blockquote>
        </div>
      </article>

      {/* Body */}
      <div className="mt-10 prose-scripture text-ink-800 text-lg leading-relaxed">
        {entry.body.split("\n\n").map((para, i) => (
          <p key={i} className="mb-4">
            {para}
          </p>
        ))}
      </div>

      {/* Prayer */}
      <div className="mt-10 rounded-3xl border border-flame-300 bg-flame-50/60 p-6 md:p-7">
        <div className="text-[10px] uppercase tracking-widest text-flame-700">A prayer</div>
        <p className="mt-2 font-serif text-xl text-ink-900 italic leading-snug">
          {entry.prayer}
        </p>
      </div>

      {/* Open in the Bible */}
      <div className="mt-10 grid md:grid-cols-2 gap-3 no-print">
        {bibleHref && (
          <Tile
            href={bibleHref}
            title={`Read ${entry.reference} in context`}
            sub="Open the chapter and surrounding verses."
            glyph={<Glyph id="open-book" size={48} />}
          />
        )}
        {versePermalink && (
          <Tile
            href={versePermalink}
            title="Share this verse"
            sub="A direct permalink, with a card you can text to a friend."
            glyph={<Glyph id="lamp" size={48} />}
          />
        )}
      </div>

      {/* Prev / Next */}
      <nav className="mt-10 flex flex-wrap items-stretch justify-between gap-3 no-print">
        <Link
          href={`/devotional/${slugifyDevotional(prev.title)}`}
          className="flex-1 min-w-[200px] rounded-2xl border border-ink-200 bg-card p-4 hover:border-flame-500/60"
        >
          <div className="text-[10px] uppercase tracking-widest text-ink-500">Previous</div>
          <div className="font-serif text-ink-900 mt-0.5">← {prev.title}</div>
          <div className="text-xs text-ink-500 mt-0.5">{prev.reference}</div>
        </Link>
        <Link
          href={`/devotional/${slugifyDevotional(next.title)}`}
          className="flex-1 min-w-[200px] rounded-2xl border border-ink-200 bg-card p-4 hover:border-flame-500/60 text-right"
        >
          <div className="text-[10px] uppercase tracking-widest text-ink-500">Next</div>
          <div className="font-serif text-ink-900 mt-0.5">{next.title} →</div>
          <div className="text-xs text-ink-500 mt-0.5">{next.reference}</div>
        </Link>
      </nav>
    </section>
  );
}
