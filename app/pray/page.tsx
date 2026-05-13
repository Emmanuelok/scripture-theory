import PrayerGuide from "@/components/PrayerGuide";

export const metadata = {
  title: "Pray — Scripture Theory",
  description:
    "Learn to pray the way Jesus taught — in eight languages: the Lord's Prayer walked line-by-line, the ACTS pattern, and a daily rhythm of praying for the world.",
};

export default function PrayPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-20">
      <PrayerGuide />
    </section>
  );
}
