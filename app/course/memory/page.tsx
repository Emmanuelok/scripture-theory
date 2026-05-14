import Link from "next/link";
import { COURSE_WEEKS } from "@/data/course";
import { PageHero, Tile } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";

export const metadata = {
  title: "Twelve verses — Foundations of the Faith — Scripture Theory",
  description:
    "Every memory verse from the twelve weeks of Foundations of the Faith. Hide them in your heart, one per week.",
};

export default function CourseMemoryPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <Link
        href="/course"
        className="text-xs uppercase tracking-widest text-flame-700 hover:underline"
      >
        ← Foundations
      </Link>

      <PageHero
        eyebrow="Twelve verses to hide in your heart"
        title="What the course"
        titleAccent="will plant in you."
        intro="One verse per week, anchoring its theme. Memorize them across the twelve weeks and you will have a small, lifelong toolkit — verses ready when fear or sin or grief comes knocking."
        scripture="Your word I have hidden in my heart, that I might not sin against you."
        scriptureRef="Psalm 119:11"
      />

      <Tile
        size="wide"
        tone="dark"
        eyebrow="A small library inside you"
        title="One a week — twelve in a season."
        sub="Tap any verse to practice it in the memory trainer. The trainer walks you from reading to first-letters to fill-the-blanks to recitation."
        glyph={<Glyph id="memory" size={120} />}
        className="mt-12"
      />

      <ol className="mt-10 space-y-4">
        {COURSE_WEEKS.map((w) => {
          const practiceHref = `/memory?ref=${encodeURIComponent(
            w.memoryVerse.ref
          )}&text=${encodeURIComponent(w.memoryVerse.text)}`;
          return (
            <li key={w.week}>
              <article className="group relative overflow-hidden rounded-3xl border border-ink-200 bg-card p-6 md:p-7 hover:-translate-y-0.5 hover:border-flame-500/60 hover:shadow-[0_18px_50px_-20px_rgba(249,115,22,0.28)] transition-all">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-flame-50/40 to-transparent"
                />
                <div className="relative">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="font-serif text-2xl text-flame-700 leading-none">
                      W{w.week}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] uppercase tracking-widest text-flame-700">
                        {w.title}
                      </div>
                      <h3 className="font-serif text-xl text-ink-900 mt-0.5">
                        {w.memoryVerse.ref}
                      </h3>
                    </div>
                  </div>

                  <blockquote className="mt-3 prose-scripture text-ink-800 italic leading-relaxed pl-4 border-l-2 border-flame-500/70">
                    "{w.memoryVerse.text}"
                  </blockquote>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href={practiceHref}
                      className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-4 py-1.5 text-sm hover:bg-flame-500"
                    >
                      Practice this verse →
                    </Link>
                    <Link
                      href={`/course/week/${w.week}`}
                      className="inline-flex items-center rounded-full border border-ink-300 px-4 py-1.5 text-sm text-ink-700 hover:border-ink-900"
                    >
                      Open Week {w.week}
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ol>

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
            "The grass withers, the flower fades, but the word of our God will stand forever."
          </p>
          <p className="mt-2 text-ink-300">Isaiah 40:8</p>
        </div>
      </div>
    </section>
  );
}
