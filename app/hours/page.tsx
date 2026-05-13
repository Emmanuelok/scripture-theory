import HoursView from "@/components/HoursView";

export const metadata = {
  title: "The Daily Office — Scripture Theory",
  description:
    "Four short prayer offices (Morning, Midday, Evening, Night) drawn from the oldest Christian practice — Scripture, psalms, canticles, prayer, blessing. Five minutes apiece. For every believer.",
};

export default function HoursPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">
        Practice · Daily Office
      </span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        Four short prayers across the day.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        Christians have prayed at fixed hours of the day for two millennia — morning, noon,
        evening, and bedtime. Most modern believers were never shown this room. Here it is. Each
        office is built of Scripture and can be prayed in five minutes.
      </p>
      <p className="mt-2 text-xs text-ink-500">
        "Evening and morning and at noon I will pray, and cry aloud, and He shall hear my voice."
        — Psalm 55:17
      </p>

      <div className="mt-10">
        <HoursView />
      </div>
    </section>
  );
}
