import ParentingView from "@/components/ParentingView";
import { PageHero } from "@/components/ui/Tile";

export const metadata = {
  title: "Parenting Prayer Rhythm — Scripture Theory",
  description:
    "A daily prayer rhythm for parents — seven daily themes (their hearts, my example, friends, salvation, weariness, calling, faith handed on), Scripture, prayer, and a list of children by name.",
};

export default function ParentingPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="Practice · Psalm 78:4"
        title="Pray your children."
        titleAccent="By name."
        intro="Of everything you will do for your children — your prayer is the most consequential and the most invisible. Seven daily themes shaped by Scripture, with space to add each child by name and today's focus."
        scripture="Train up a child in the way he should go: and when he is old, he will not depart from it."
        scriptureRef="Proverbs 22:6"
      />
      <div className="mt-10">
        <ParentingView />
      </div>
    </section>
  );
}
