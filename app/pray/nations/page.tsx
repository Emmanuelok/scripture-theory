import Link from "next/link";
import NationsView from "@/components/NationsView";
import { nations } from "@/data/nations";

export const metadata = {
  title: "Praying for the Nations — Scripture Theory",
  description:
    "A daily rotation through the countries of the world. Every day a specific nation is lifted up with prayer points unique to its spiritual, pastoral, and humanitarian situation.",
};

export default function NationsPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-20">
      <Link href="/pray" className="text-xs uppercase tracking-widest text-flame-700 hover:underline">
        ← Pray
      </Link>
      <h1 className="font-serif text-4xl md:text-5xl mt-3 text-ink-900 leading-tight">
        Praying for the Nations.
      </h1>
      <p className="mt-4 text-ink-700 leading-relaxed">
        Every day, one country. Specific prayer points from that nation's actual situation —
        persecution, war, gospel access, leaders, the suffering and the seeking. The Lord of the
        nations wants His Church praying His Kingdom into every corner of the earth.
      </p>
      <p className="mt-2 text-xs text-ink-500">
        {nations.length} nations in the rotation today · expanding toward all 195 countries.
      </p>

      <div className="mt-10">
        <NationsView />
      </div>

      <div className="mt-14 rounded-3xl bg-ink-900 text-ink-50 p-8 text-center">
        <p className="font-serif text-2xl leading-snug">
          "Ask of me, and I will make the nations your heritage, and the ends of the earth your
          possession."
        </p>
        <p className="mt-2 text-ink-300">Psalm 2:8</p>
      </div>
    </section>
  );
}
