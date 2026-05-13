import HealingView from "@/components/HealingView";
import { PageHero } from "@/components/ui/Tile";

export const metadata = {
  title: "Healing Prayer — Scripture Theory",
  description:
    "The James 5 pattern for praying for the sick — confession, anointing, the prayer of faith — with a private journal for tracking healing requests over time. Faith and medicine. Bold prayer with humility before mystery.",
};

export default function HealPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="Practice · James 5"
        title={`"By His stripes`}
        titleAccent={`we are healed."`}
        intro="Jesus healed the sick — and He sent the church to do the same. The pattern is in James 5: call the elders, confess sin, anoint with oil, pray the prayer of faith. Bold prayer with humility before the mystery of God's 'not yet' and 'no.'"
        scripture="He sent His word and healed them, and delivered them from their destructions."
        scriptureRef="Psalm 107:20"
      />
      <div className="mt-10">
        <HealingView />
      </div>
    </section>
  );
}
