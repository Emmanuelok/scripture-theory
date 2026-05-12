import PrayerGuide from "@/components/PrayerGuide";

export const metadata = {
  title: "Pray — Scripture Theory",
  description:
    "Learn to pray the way Jesus taught: the Lord's Prayer walked line-by-line, the ACTS pattern, and a daily rhythm of praying for the world.",
};

export default function PrayPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">Pray</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        Talk to the Father, the way Jesus taught.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        You do not need a special voice, a special place, or fancy words. You need a Father — and
        you have one. Walk through the prayer Jesus gave us. Use a simple ancient pattern. Pray for
        a different region of the world each day.
      </p>

      <div className="mt-10">
        <PrayerGuide />
      </div>

      <div className="mt-14 rounded-3xl bg-ink-900 text-ink-50 p-8 text-center">
        <p className="font-serif text-2xl">
          "Lord, teach us to pray."
        </p>
        <p className="mt-2 text-ink-300">Luke 11:1</p>
      </div>
    </section>
  );
}
