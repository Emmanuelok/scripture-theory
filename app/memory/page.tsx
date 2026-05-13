import MemoryTrainer from "@/components/MemoryTrainer";
import { thisWeeksVerse, memoryVerses } from "@/data/memory";

export const metadata = {
  title: "Scripture Memory — Scripture Theory",
  description:
    "Hide God's Word in your heart. Curated public-domain verses with four practice levels: read, first letters, fill the blanks, recite. Progress saved on your device.",
};

export default function MemoryPage() {
  const week = thisWeeksVerse();
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">Scripture Memory</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        Hide His Word in your heart.
      </h1>
      <p className="mt-4 text-ink-700 leading-relaxed max-w-2xl">
        Memorized Scripture is the deepest form of intimacy with Jesus that any believer can carry
        through an ordinary day. {memoryVerses.length} verses, hand-picked across the great themes
        of the faith. Four practice levels — read, first letters, fill the blanks, recite. No
        streaks, no shame, no notifications. Just a quiet rhythm with the Word.
      </p>

      <div className="mt-8 rounded-2xl border border-flame-200 bg-flame-50/60 p-5">
        <div className="text-xs uppercase tracking-widest text-flame-700">This week's verse</div>
        <h2 className="font-serif text-xl text-ink-900 mt-0.5">{week.ref}</h2>
        <p className="prose-scripture text-ink-800 mt-2 text-sm">{week.text}</p>
      </div>

      <div className="mt-10">
        <MemoryTrainer initialVerseId={week.id} />
      </div>

      <div className="mt-14 rounded-3xl bg-ink-900 text-ink-50 p-8 text-center">
        <p className="font-serif text-2xl leading-snug">
          "I have stored up your word in my heart, that I might not sin against you."
        </p>
        <p className="mt-2 text-ink-300">Psalm 119:11</p>
      </div>
    </section>
  );
}
