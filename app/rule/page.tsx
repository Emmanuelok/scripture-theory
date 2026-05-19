import RuleOfLifeView from "@/components/RuleOfLifeView";
import RuleOfLifeDial from "@/components/RuleOfLifeDial";
import { PageHero } from "@/components/ui/Tile";

export const metadata = {
  title: "Rule of Life — Scripture Theory",
  description:
    "A trellis for your life with Jesus — small, faithful disciplines on a daily, weekly, and monthly cadence. Choose a sample rule or build your own. Lives only on your device.",
};

export default function RulePage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="Practice · John 15 · Rule of Life"
        title="A trellis"
        titleAccent="for the vine."
        intro="Christians have always lived by some kind of rhythm — daily Scripture, weekly worship, an annual fast. Without it we drift. With it, we have a small structure on which Christ can grow our life. Choose less, not more. The rule is not the life — Christ is the life."
        scripture="I am the vine, you are the branches. He who abides in Me, and I in him, bears much fruit; for without Me you can do nothing."
        scriptureRef="John 15:5"
      />
      <div className="mt-10">
        <RuleOfLifeDial />
      </div>
      <div className="mt-10">
        <RuleOfLifeView />
      </div>
    </section>
  );
}
