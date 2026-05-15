import Link from "next/link";
import ReadingPlanBuilder from "@/components/ReadingPlanBuilder";
import { PageHero } from "@/components/ui/Tile";

export const metadata = {
  title: "Build a reading plan — Scripture Theory",
  description:
    "Make your own Bible reading plan — a Lenten walk, a small-group study, a path through one of Paul's letters. Saved on this device, per walk.",
};

export default function ReadingPlanBuilderPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <Link
        href="/read"
        className="text-xs uppercase tracking-widest text-flame-700 hover:underline"
      >
        ← Reading plans
      </Link>
      <div className="mt-3">
        <PageHero
          eyebrow="Make your own"
          title="A plan you'll"
          titleAccent="actually keep."
          intro="A Lenten walk through Mark. A summer through Paul. A 30-day catechism for a new believer. Add one day, one reference at a time — saved on this device, per walk."
          scripture="Lay these words of mine in your heart and in your soul."
          scriptureRef="Deuteronomy 11:18"
        />
      </div>

      <div className="mt-10">
        <ReadingPlanBuilder />
      </div>
    </section>
  );
}
