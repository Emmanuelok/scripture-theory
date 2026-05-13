import SabbathView from "@/components/SabbathView";
import { PageHero } from "@/components/ui/Tile";

export const metadata = {
  title: "Sabbath — Scripture Theory",
  description:
    "Plan a real, doable Sabbath — the day, the start, the end, what you'll stop, what you'll do instead. The lost commandment, returned to its rightful joy.",
};

export default function SabbathPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="Practice · Exodus 20:8"
        title="One day in seven,"
        titleAccent="stop."
        intro="Sabbath is the only one of the Ten Commandments most Christians openly ignore. It is also among the most life-giving. God built rest into creation (Gen 2:2–3). Jesus is its Lord (Mark 2:28). This planner makes the day concrete: when, what to stop, what to do instead."
        scripture="Remember the Sabbath day, to keep it holy."
        scriptureRef="Exodus 20:8"
      />
      <div className="mt-10">
        <SabbathView />
      </div>
    </section>
  );
}
