import HoursView from "@/components/HoursView";
import HoursClock from "@/components/HoursClock";
import { PageHero } from "@/components/ui/Tile";

export const metadata = {
  title: "The Daily Office — Scripture Theory",
  description:
    "Four short prayer offices (Morning, Midday, Evening, Night) drawn from the oldest Christian practice — Scripture, psalms, canticles, prayer, blessing. Five minutes apiece. For every believer.",
};

export default function HoursPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="Psalm 119:164 · Practice"
        title="Four short prayers"
        titleAccent="across the day."
        intro="Christians have prayed at fixed hours for two millennia — morning, noon, evening, and bedtime. Most modern believers were never shown this room. Here it is. Each office is built of Scripture and can be prayed in five minutes."
        scripture="Evening and morning and at noon I will pray, and cry aloud, and He shall hear my voice."
        scriptureRef="Psalm 55:17"
      />
      <div className="mt-10">
        <HoursClock />
      </div>
      <div className="mt-10">
        <HoursView />
      </div>
    </section>
  );
}
