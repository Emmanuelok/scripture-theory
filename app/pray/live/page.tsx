import Link from "next/link";
import WorldFeed from "@/components/WorldFeed";

export const metadata = {
  title: "Pray for the World — live news as intercession — Scripture Theory",
  description:
    "Live world news streamed from BBC, Al Jazeera, NPR, and Google News — surfaced for believers to stand in the gap. Auto-refreshes every 5 minutes.",
};

export default function LiveWorldPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-10 pb-20">
      <div className="text-center">
        <span className="text-xs uppercase tracking-widest text-flame-700">
          Pray for the world · live
        </span>
        <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
          What is happening on the earth right now.
        </h1>
        <p className="mt-4 text-ink-700 leading-relaxed max-w-xl mx-auto">
          Headlines from across the world, updated every fifteen minutes. The flame dot marks
          stories that often call for urgent intercession — war, disaster, persecution,
          suffering. Open one. Read it. Stop. Pray with the words you have, in the language
          you have, until you feel the King close.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3 text-xs text-ink-500">
          <Link href="/pray/nations" className="hover:text-flame-700">
            ← Today's nation
          </Link>
          <Link href="/pray" className="hover:text-flame-700">
            ← Lord's Prayer / ACTS
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <WorldFeed />
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
        Stories are streamed from public news outlets (BBC World, Al Jazeera, NPR, Google News).
        We are not the publisher and do not endorse any outlet. We simply gather what the
        Body of Christ should already be praying about.
      </p>
    </section>
  );
}
