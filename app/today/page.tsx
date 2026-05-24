import TodayDashboard from "@/components/TodayDashboard";

export const metadata = {
  title: "Today — Scripture Theory",
  description:
    "Your daily rhythm with Jesus: today's chapter, today's prayer, today's region of the world, and a curated next step shaped for where you are.",
};

// Belt-and-suspenders: the dashboard is a client component using useToday(),
// but rebuild the page shell hourly too so the SSR'd HTML is fresh for the
// first paint, search engines, and link previews.
export const revalidate = 3600;

export default function TodayPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">Today</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        Your small, daily rhythm — curated for you.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        Three things a day, in your language, shaped for where you are with Jesus. No notifications,
        no streaks, no shame — just a faithful next step.
      </p>

      <div className="mt-10">
        <TodayDashboard />
      </div>
    </section>
  );
}
