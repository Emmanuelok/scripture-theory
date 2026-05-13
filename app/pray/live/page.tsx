import Link from "next/link";
import PrayLive from "@/components/PrayLive";

export const metadata = {
  title: "Pray for the World · Live — Scripture Theory",
  description:
    "A live world map of stories Scripture asks believers to pray about — war, persecution, leaders, the sick, the hungry, the displaced. Tap any point on the map to read the story and pray with anchored Scripture.",
};

export default function LiveWorldPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-10 pb-20">
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-flame-700">
          <span className="h-1.5 w-1.5 rounded-full bg-flame-500 animate-pulse" />
          Pray for the world · live
        </span>
        <h1 className="font-serif text-4xl md:text-5xl mt-3 text-ink-900 leading-tight">
          Stand in the gap, in real time.
        </h1>
        <p className="mt-4 text-ink-700 leading-relaxed">
          A live world map showing only what Scripture asks believers to pray about — war,
          persecuted believers, leaders, the sick, the hungry, the displaced, the trafficked,
          the peace of Jerusalem, and the advance of the Gospel. Tap any point to read the
          story and pray with the verses that ground that prayer.
        </p>
        <div className="mt-4 text-xs text-ink-500">
          <Link href="/pray/nations" className="hover:text-flame-700">
            ← Today's nation
          </Link>
          {"  ·  "}
          <Link href="/pray" className="hover:text-flame-700">
            Lord's Prayer / ACTS
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <PrayLive />
      </div>

      <div className="mt-12 rounded-3xl bg-ink-900 text-ink-50 p-8 text-center">
        <p className="font-serif text-2xl leading-snug">
          "I urge that supplications, prayers, intercessions, and givings of thanks be made for
          all people, for kings and all who are in high places, that we may lead a tranquil and
          quiet life in all godliness and reverence."
        </p>
        <p className="mt-2 text-ink-300">1 Timothy 2:1–2</p>
      </div>

      <p className="mt-6 text-xs text-ink-500 leading-relaxed text-center max-w-xl mx-auto">
        Stories are streamed from public news outlets (BBC, Al Jazeera, NPR, Reuters). We do not
        endorse any outlet — we filter only for stories Scripture invites us to pray about and
        place each one on the map for intercession. Map data: Natural Earth (public domain).
      </p>
    </section>
  );
}
