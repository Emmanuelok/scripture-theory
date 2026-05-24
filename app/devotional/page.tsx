import Link from "next/link";
import { devotional } from "@/data/devotional";
import { slugifyDevotional, todaysDevotional } from "@/lib/devotional-slug";
import { PageHero, Tile } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";
import ScriptureRef from "@/components/ScriptureRef";

export const metadata = {
  title: "Devotional library — Scripture Theory",
  description: `${devotional.length} short, Christ-centered meditations. Read today's, browse the library, or carry one through the week.`,
};

// Today's featured entry rotates by day-of-year — rebuild hourly so it tracks.
export const revalidate = 3600;

export default function DevotionalLibraryPage() {
  const today = todaysDevotional();

  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow={`${devotional.length} meditations`}
        title="Short, Christ-centered"
        titleAccent="daily devotionals."
        intro="Five-minute meditations anchored in one verse, written by Scripture Theory editorial — never excerpts, never machine-generated. Read today's in the box below, or browse the whole library."
        scripture="The grass withers, the flower fades, but the word of our God will stand forever."
        scriptureRef="Isaiah 40:8"
      />

      {/* Today's */}
      <Tile
        size="wide"
        tone="dark"
        eyebrow="Today's meditation"
        title={today.entry.title}
        glyph={<Glyph id="open-book" size={120} />}
        href={`/devotional/${slugifyDevotional(today.entry.title)}`}
        className="mt-12"
      >
        <blockquote className="mt-3 border-l-2 border-flame-500/70 pl-3 italic text-flame-100/90 leading-relaxed max-w-2xl">
          "{today.entry.verseText}"
          <span className="block not-italic text-[11px] text-flame-300 mt-1.5 tracking-wide">
            — <ScriptureRef reference={today.entry.reference} className="text-flame-200" />
          </span>
        </blockquote>
        <p className="mt-4 text-sm text-ink-300 leading-relaxed max-w-2xl line-clamp-3">
          {today.entry.body}
        </p>
      </Tile>

      {/* All entries */}
      <div className="mt-14">
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5">
          <h2 className="font-serif text-2xl md:text-3xl text-ink-900">The full library</h2>
          <p className="text-sm text-ink-500 italic">
            One a day rotates by date — but every meditation is available any time.
          </p>
        </div>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {devotional.map((d, i) => {
            const slug = slugifyDevotional(d.title);
            const isToday = today.index === i;
            return (
              <li key={slug}>
                <Link
                  href={`/devotional/${slug}`}
                  className={[
                    "group relative h-full block overflow-hidden rounded-2xl border p-5 transition-all",
                    isToday
                      ? "border-flame-500 bg-flame-50/40 shadow-[0_18px_50px_-20px_rgba(249,115,22,0.32)]"
                      : "border-ink-200 bg-card hover:-translate-y-0.5 hover:border-flame-500/60 hover:shadow-[0_12px_36px_-16px_rgba(249,115,22,0.28)]",
                  ].join(" ")}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-flame-50/40 to-transparent"
                  />
                  <div className="relative">
                    <div className="text-[10px] uppercase tracking-widest text-flame-700">
                      {isToday ? "Today" : d.reference}
                    </div>
                    <h3 className="font-serif text-lg text-ink-900 mt-1 group-hover:text-flame-700 transition-colors">
                      {d.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-700 italic leading-relaxed line-clamp-2">
                      "{d.verseText}"
                    </p>
                    <p className="mt-3 text-xs text-ink-500 leading-relaxed line-clamp-2">
                      {d.body}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-14 rounded-3xl bg-ink-900 text-ink-50 p-8 md:p-10 text-center relative overflow-hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(249,115,22,0.22), transparent 60%)",
          }}
        />
        <div className="relative">
          <p className="font-serif text-2xl md:text-3xl leading-snug italic">
            "Your word is a lamp to my feet, and a light to my path."
          </p>
          <p className="mt-2 text-ink-300">Psalm 119:105</p>
        </div>
      </div>
    </section>
  );
}
