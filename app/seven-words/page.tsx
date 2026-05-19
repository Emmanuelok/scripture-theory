import Link from "next/link";
import SevenLastWords from "@/components/SevenLastWords";
import ScriptureRef from "@/components/ScriptureRef";

export const metadata = {
  title: "The Seven Last Words — Scripture Theory",
  description:
    "The seven sayings of Jesus from the cross, gathered from the four Gospels in the church's traditional order.",
};

const WORDS = [
  { n: 1, title: "Forgiveness",  text: "Father, forgive them, for they don't know what they are doing.",
    ref: "Luke 23:34", note: "He prays for His killers while they are still killing Him." },
  { n: 2, title: "Salvation",    text: "Truly, I tell you, today you will be with me in Paradise.",
    ref: "Luke 23:43", note: "The first soul saved at the cross is a dying criminal who asked for mercy." },
  { n: 3, title: "Relationship", text: "Woman, behold, your son! … Behold, your mother!",
    ref: "John 19:26-27", note: "He provides for His mother before He goes." },
  { n: 4, title: "Abandonment",  text: "My God, my God, why have you forsaken me?",
    ref: "Matthew 27:46", note: "Quoting Psalm 22 — naming the darkness, even from inside it." },
  { n: 5, title: "Distress",     text: "I thirst.",
    ref: "John 19:28", note: "The Creator of every river is dry. He thirsts so we may drink." },
  { n: 6, title: "Triumph",      text: "It is finished.",
    ref: "John 19:30", note: "Greek tetelestai — a merchant's word: paid in full. The work is done." },
  { n: 7, title: "Reunion",      text: "Father, into your hands I commit my spirit.",
    ref: "Luke 23:46", note: "The last word, a prayer of trust. He hands Himself back to the Father." },
];

export default function SevenWordsPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <Link href="/resources" className="text-xs uppercase tracking-widest text-flame-700 hover:underline">
        ← Resources
      </Link>
      <h1 className="font-serif text-4xl md:text-6xl mt-3 text-ink-900 leading-[1.05] tracking-tight">
        The seven last <span className="gradient-text">words.</span>
      </h1>
      <p className="mt-5 text-ink-700 leading-relaxed max-w-2xl">
        The Gospels record seven sayings of Jesus from the cross. Together they
        form a portrait of the dying Christ &mdash; praying for His killers,
        saving a thief, providing for His mother, naming the darkness, thirsting,
        finishing the work, handing Himself back to the Father.
      </p>

      <div className="mt-10">
        <SevenLastWords />
      </div>

      <div className="mt-12 space-y-4">
        {WORDS.map((w) => (
          <article key={w.n} className="rounded-3xl border border-ink-200 bg-card p-6">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="font-serif text-3xl text-flame-700/60">{String(w.n).padStart(2, "0")}</span>
              <ScriptureRef reference={w.ref} className="text-[10px] uppercase tracking-widest text-flame-700" />
              <span className="text-[10px] uppercase tracking-widest text-flame-300/80">{w.title}</span>
            </div>
            <blockquote className="mt-3 font-serif text-xl md:text-2xl text-ink-900 leading-snug italic">
              &ldquo;{w.text}&rdquo;
            </blockquote>
            <p className="mt-3 text-sm text-ink-700 leading-relaxed">{w.note}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-3xl bg-ink-900 text-ink-50 p-8 text-center">
        <p className="font-serif text-2xl leading-snug italic">
          &ldquo;Surely this man was the Son of God.&rdquo;
        </p>
        <p className="mt-2 text-ink-300">— Mark 15:39 (the centurion at the cross)</p>
      </div>
    </section>
  );
}
