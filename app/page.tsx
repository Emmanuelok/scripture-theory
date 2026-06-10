import Link from "next/link";
import HomeHero from "@/components/HomeHero";
import LiveTiles from "@/components/LiveTiles";
import ExploreGrid from "@/components/ExploreGrid";
import DailyRhythmReminder from "@/components/DailyRhythmReminder";
import SeasonBanner from "@/components/SeasonBanner";
import PersonalWelcome from "@/components/PersonalWelcome";
import { getTodayData } from "@/lib/today-data";

// Today's verse + today's nation are rendered server-side here,
// so rebuild hourly to track the day-of-year rotation. Computing
// the daily primitives on the server keeps the heavy editorial
// modules (nations / catechism / bible seed / memory / persecuted)
// out of the client bundle.
export const revalidate = 3600;

export default function HomePage() {
  const today = getTodayData();

  return (
    <>
      <HomeHero />

      <PersonalWelcome />

      <section className="mx-auto max-w-5xl px-5 mt-6 space-y-3">
        <SeasonBanner variant="strip" />
        <DailyRhythmReminder variant="strip" />
      </section>

      <LiveTiles today={today} />

      {/* The ONE Gospel — single, calm, beautiful */}
      <section className="mx-auto max-w-3xl px-5 py-24 md:py-32 text-center">
        <span className="text-xs uppercase tracking-widest text-flame-700">
          1 Corinthians 15:3–8
        </span>
        <p className="mt-5 font-serif text-2xl md:text-4xl text-ink-900 leading-snug">
          Christ died for our sins.<br />
          He was buried.<br />
          He rose on the third day.<br />
          He was seen.<br />
          <span className="gradient-text">He is alive. He is Lord.</span>
        </p>
        <Link
          href="/gospel"
          className="mt-10 inline-flex items-center rounded-full bg-ink-900 text-ink-50 px-6 py-3 text-sm font-medium hover:bg-flame-700 transition-colors"
        >
          Read the Gospel →
        </Link>
      </section>

      <ExploreGrid today={today} />

      {/* Single, quiet closing */}
      <section className="mx-auto max-w-3xl px-5 pb-24 text-center">
        <p className="font-serif text-xl md:text-2xl text-ink-700 italic">
          "And I, when I am lifted up from the earth, will draw all people to myself."
        </p>
        <p className="mt-2 text-sm text-ink-500">John 12:32 — Jesus</p>
      </section>
    </>
  );
}
