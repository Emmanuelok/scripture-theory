import MemoryTrainer from "@/components/MemoryTrainer";
import MemoryProgress from "@/components/MemoryProgress";
import { thisWeeksVerse, memoryVerses } from "@/data/memory";
import { PageHero, Tile } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";

export const metadata = {
  title: "Scripture Memory — Scripture Theory",
  description:
    "Hide God's Word in your heart. Curated public-domain verses with four practice levels: read, first letters, fill the blanks, recite. Progress saved on your device.",
};

export default function MemoryPage() {
  const week = thisWeeksVerse();
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="Scripture Memory"
        title="Hide His Word"
        titleAccent="in your heart."
        intro={`Memorized Scripture is the deepest form of intimacy with Jesus a believer carries through an ordinary day. ${memoryVerses.length} verses, hand-picked across the great themes of the faith. Four practice levels — read, first letters, fill the blanks, recite. No streaks, no shame, no notifications. Just a quiet rhythm with the Word.`}
        scripture="I have stored up your word in my heart, that I might not sin against you."
        scriptureRef="Psalm 119:11"
      />

      {/* This week's verse — hero */}
      <Tile
        size="wide"
        tone="dark"
        eyebrow="This week"
        title={week.ref}
        glyph={<Glyph id="memory" size={120} />}
        className="mt-12"
      >
        <blockquote className="mt-4 prose-scripture text-flame-100/90 italic text-lg leading-relaxed border-l-2 border-flame-500/70 pl-4 max-w-2xl">
          "{week.text}"
        </blockquote>
        {week.why && (
          <p className="mt-3 text-sm text-ink-300 leading-relaxed max-w-2xl">{week.why}</p>
        )}
      </Tile>

      {/* The four practice levels — visual key */}
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <LevelCard step={1} title="Read" sub="Slow, aloud, in context." />
        <LevelCard step={2} title="First letters" sub="Recall, prompted." />
        <LevelCard step={3} title="Fill the blanks" sub="Most words gone." />
        <LevelCard step={4} title="Recite" sub="From a clean slate." />
      </div>

      <div className="mt-10">
        <MemoryProgress />
      </div>

      <div className="mt-10">
        <MemoryTrainer initialVerseId={week.id} />
      </div>

      {/* Closing */}
      <div className="mt-16 rounded-3xl bg-ink-900 text-ink-50 p-8 md:p-12 text-center relative overflow-hidden">
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

function LevelCard({ step, title, sub }: { step: number; title: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-ink-200 bg-card p-4 md:p-5">
      <div className="flex items-baseline gap-2">
        <span className="font-serif text-2xl text-flame-700">{String(step).padStart(2, "0")}</span>
        <span className="text-[10px] uppercase tracking-widest text-flame-700">Level</span>
      </div>
      <div className="font-serif text-lg text-ink-900 mt-1">{title}</div>
      <div className="text-xs text-ink-500 mt-0.5">{sub}</div>
    </div>
  );
}
