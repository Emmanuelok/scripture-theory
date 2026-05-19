import Link from "next/link";
import BeatitudesLadder from "@/components/BeatitudesLadder";
import ScriptureRef from "@/components/ScriptureRef";

export const metadata = {
  title: "The Beatitudes — Scripture Theory",
  description:
    "The eight blessings Jesus pronounced at the opening of the Sermon on the Mount — the portrait of life in the kingdom.",
};

const BEATITUDES = [
  { n: 1, verse: "Matthew 5:3",  text: "Blessed are the poor in spirit, for theirs is the kingdom of heaven.",
    note: "The first word is for the bankrupt. Not the religious achievers — those who have nothing to bring." },
  { n: 2, verse: "Matthew 5:4",  text: "Blessed are those who mourn, for they shall be comforted.",
    note: "Not stoic above grief. Real lament that knows where to look. The Comforter comes." },
  { n: 3, verse: "Matthew 5:5",  text: "Blessed are the meek, for they shall inherit the earth.",
    note: "Power under control. Meekness is strength that does not have to prove itself." },
  { n: 4, verse: "Matthew 5:6",  text: "Blessed are those who hunger and thirst for righteousness, for they shall be filled.",
    note: "Wanting God's right ordering of life more than food. Such hunger is itself a sign of life." },
  { n: 5, verse: "Matthew 5:7",  text: "Blessed are the merciful, for they shall obtain mercy.",
    note: "The forgiven forgive. Mercy received reshapes the merciful." },
  { n: 6, verse: "Matthew 5:8",  text: "Blessed are the pure in heart, for they shall see God.",
    note: "Undivided. Single-eyed. Most of us are pure-ish; Jesus blesses the pure." },
  { n: 7, verse: "Matthew 5:9",  text: "Blessed are the peacemakers, for they shall be called sons of God.",
    note: "Not peacekeepers. Peacemakers — those who go into conflict carrying reconciliation." },
  { n: 8, verse: "Matthew 5:10", text: "Blessed are those who have been persecuted for righteousness' sake, for theirs is the kingdom of heaven.",
    note: "The first and last beatitude make the same promise — the kingdom itself." },
];

export default function BeatitudesPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <Link href="/resources" className="text-xs uppercase tracking-widest text-flame-700 hover:underline">
        ← Resources
      </Link>
      <h1 className="font-serif text-4xl md:text-6xl mt-3 text-ink-900 leading-[1.05] tracking-tight">
        The <span className="gradient-text">Beatitudes.</span>
      </h1>
      <p className="mt-5 text-ink-700 leading-relaxed max-w-2xl">
        Eight blessings Jesus pronounced at the opening of the Sermon on the Mount — the
        portrait of life in His kingdom. The world counts the rich, the strong, and the
        unbothered as blessed. Jesus blesses the broken, the meek, and the hungry. Read them
        slowly.
      </p>

      <div className="mt-10">
        <BeatitudesLadder />
      </div>

      <div className="mt-12 space-y-4">
        {BEATITUDES.map((b) => (
          <article key={b.n} className="rounded-3xl border border-ink-200 bg-card p-6">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="font-serif text-3xl text-flame-700/60">{String(b.n).padStart(2, "0")}</span>
              <ScriptureRef reference={b.verse} className="text-[10px] uppercase tracking-widest text-flame-700" />
            </div>
            <blockquote className="mt-3 font-serif text-xl md:text-2xl text-ink-900 leading-snug italic">
              &ldquo;{b.text}&rdquo;
            </blockquote>
            <p className="mt-3 text-sm text-ink-700 leading-relaxed">{b.note}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-3xl bg-ink-900 text-ink-50 p-8 text-center">
        <p className="font-serif text-2xl leading-snug italic">
          &ldquo;Rejoice and be exceedingly glad, for great is your reward in heaven.&rdquo;
        </p>
        <p className="mt-2 text-ink-300">— Matthew 5:12</p>
      </div>
    </section>
  );
}
