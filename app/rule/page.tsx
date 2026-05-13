import RuleOfLifeView from "@/components/RuleOfLifeView";

export const metadata = {
  title: "Rule of Life — Scripture Theory",
  description:
    "A trellis for your life with Jesus — small, faithful disciplines on a daily, weekly, and monthly cadence. Choose a sample rule or build your own. Lives only on your device.",
};

export default function RulePage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">Practice · Rule of Life</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        A trellis for the vine.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        Christians have always lived by some kind of rhythm — daily Scripture, weekly worship, an
        annual fast. Without it we drift. With it, we have a small structure on which Christ can
        grow our life. Choose less, not more. The rule is not the life. <strong>Christ is the
        life.</strong>
      </p>
      <p className="mt-2 text-xs text-ink-500">
        "I am the vine, you are the branches. He who abides in Me, and I in him, bears much fruit;
        for without Me you can do nothing." — John 15:5
      </p>

      <div className="mt-10">
        <RuleOfLifeView />
      </div>
    </section>
  );
}
