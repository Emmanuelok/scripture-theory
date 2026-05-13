import Link from "next/link";
import PrayerWall from "@/components/PrayerWall";
import { PageHero } from "@/components/ui/Tile";

export const metadata = {
  title: "Prayer Wall — Scripture Theory",
  description:
    "Two-way intercession across the global Body. Post a request — anonymously if you wish — or carry someone else's prayer to the Father today. No DMs, no chatter; just one Body, lifting up one another.",
};

export default function PrayerWallPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-24">
      <Link
        href="/pray"
        className="text-xs uppercase tracking-widest text-flame-700 hover:underline"
      >
        ← Pray
      </Link>
      <div className="mt-3">
        <PageHero
          eyebrow="One Body · two-way intercession"
          title="Bear one another's"
          titleAccent="burdens."
          intro="Somewhere in the world, a brother is dying. A sister can't sleep. A mother is praying for a son who won't come home. The Wall is a quiet place where one believer asks, and another carries it to the Father. No DMs. No chatter. Just one Body."
          scripture="Bear one another's burdens, and so fulfill the law of Christ."
          scriptureRef="Galatians 6:2"
        />
      </div>

      <div className="mt-10">
        <PrayerWall />
      </div>
    </section>
  );
}
