import TrackHub from "@/components/TrackHub";
import { PageHero } from "@/components/ui/Tile";

export const metadata = {
  title: "Growth tract — Scripture Theory",
  description:
    "Foundations of the Faith, then The Story of God, then more — a tract of courses where each builds on the one before. Walk it slowly. Walk it together.",
};

export default function TrackPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="Long-form formation"
        title="The growth"
        titleAccent="tract."
        intro="Foundations of the Faith is the doorway. After it, a series of courses — each building on the last — to keep you walking deeper into the Word for years. Not a sprint. A pilgrimage."
        scripture="Like newborn infants, long for the pure spiritual milk, that by it you may grow up into salvation."
        scriptureRef="1 Peter 2:2"
      />
      <div className="mt-10">
        <TrackHub />
      </div>
    </section>
  );
}
