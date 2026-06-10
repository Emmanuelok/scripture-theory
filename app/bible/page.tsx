import Link from "next/link";
import { oldTestament, newTestament } from "@/data/bible/canon";
import { translationOrder, translations } from "@/data/bible/translations";
import ContinueReadingCard from "@/components/ContinueReadingCard";
import BookGrid from "@/components/BookGrid";
import CanonGrid from "@/components/CanonGrid";
import { Tile, Bento, PageHero } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";

export const metadata = {
  title: "The Bible — Scripture Theory",
  description:
    "Read the Bible. Highlight verses, take notes, save bookmarks. Compare translations side by side. Listen, share, and study.",
};

const QUICK_START = [
  { href: "/bible/john/3", title: "John 3", sub: "For God so loved the world." },
  { href: "/bible/romans/8", title: "Romans 8", sub: "No condemnation. No separation." },
  { href: "/bible/psalms/23", title: "Psalm 23", sub: "The Lord is my shepherd." },
  { href: "/bible/matthew/5", title: "Matthew 5", sub: "The Sermon on the Mount." },
  { href: "/bible/genesis/1", title: "Genesis 1", sub: "In the beginning, God." },
  { href: "/bible/revelation/22", title: "Revelation 22", sub: "Behold, I am coming soon." },
];

export default function BiblePage() {
  const totalChapters = [...oldTestament, ...newTestament].reduce((n, b) => n + b.chapters, 0);

  return (
    <section className="mx-auto max-w-6xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="The Bible"
        title="The Word of God,"
        titleAccent="in your hands."
        intro="Open any chapter. Highlight, bookmark, take notes, listen to a real human voice, share verses with a friend. Your study lives quietly on your device."
      />

      <div className="mt-10">
        <ContinueReadingCard />
      </div>

      {/* The 66 books — first stop, what most readers came for */}
      <div className="mt-8 mb-12">
        <BookGrid />
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
        <Stat label="Translations" value={String(translationOrder.length)} />
        <Stat label="Books" value="66" />
        <Stat label="Chapters" value={totalChapters.toLocaleString()} />
      </div>

      {/* Canon panorama */}
      <div className="mb-10">
        <CanonGrid />
      </div>

      {/* Quick-start passages */}
      <div className="mb-10">
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
          <h2 className="font-serif text-2xl text-ink-900">Start here</h2>
          <Link href="/bible/my" className="text-xs text-flame-700 hover:underline">
            My highlights & notes →
          </Link>
        </div>
        <Bento>
          <Tile
            href="/bible/john/3"
            size="hero"
            tone="dark"
            eyebrow="The verse everyone knows"
            title="John 3"
            tag="Nicodemus by night"
            sub="The conversation that gave the church its most loved sentence. Read it tonight, slowly, aloud."
            glyph={<Glyph id="lamp" size={120} />}
          >
            <blockquote className="mt-4 border-l-2 border-flame-500/70 pl-3 text-flame-100/90 italic text-sm leading-relaxed">
              "For God so loved the world that He gave His only Son…"
              <span className="block not-italic text-[11px] text-flame-300 mt-1.5 tracking-wide">
                — John 3:16 (WEB)
              </span>
            </blockquote>
          </Tile>

          {QUICK_START.slice(1, 7).map((q) => (
            <Tile
              key={q.href}
              href={q.href}
              eyebrow="Open now"
              title={q.title}
              sub={q.sub}
              glyph={<Glyph id="open-book" size={48} />}
            />
          ))}
        </Bento>
      </div>

      {/* Translations catalog promo */}
      <div className="mt-12">
        <Tile
          href="/bible/translations"
          size="wide"
          tone="dark"
          eyebrow="Translations"
          title={
            <>
              Every translation we serve —{" "}
              <span className="text-flame-300">real translations, made by named humans.</span>
            </>
          }
          sub="WEB · KJV · ASV · RVR · LSG · CUV · Vulgate · ELB · LUT · ALB · BBE and more. The story of each one, the language family, the era it was made."
          glyph={<Glyph id="library" size={64} />}
        >
          <div className="mt-4 flex flex-wrap gap-1.5">
            {translationOrder.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full bg-ink-800/60 border border-ink-700/60 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-flame-300"
                title={translations[t]?.name}
              >
                {translations[t]?.abbrev ?? t}
              </span>
            ))}
          </div>
        </Tile>
      </div>

      {/* Closing scripture */}
      <div className="mt-16 rounded-3xl bg-ink-900 text-ink-50 p-8 md:p-10 text-center relative overflow-hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(249,115,22,0.22), transparent 60%), radial-gradient(60% 50% at 50% 100%, rgba(184,66,12,0.18), transparent 60%)",
          }}
        />
        <div className="relative">
          <p className="font-serif text-2xl md:text-3xl leading-snug">
            "All Scripture is breathed out by God."
          </p>
          <p className="mt-2 text-ink-300">2 Timothy 3:16</p>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-ink-200 bg-card p-4 md:p-5 text-center">
      <div className="text-[10px] uppercase tracking-widest text-flame-700">{label}</div>
      <div className="font-serif text-3xl md:text-4xl text-ink-900 mt-1">{value}</div>
      {sub && <div className="text-xs text-ink-500 mt-0.5">{sub}</div>}
    </div>
  );
}
