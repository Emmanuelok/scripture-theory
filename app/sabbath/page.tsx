import SabbathView from "@/components/SabbathView";

export const metadata = {
  title: "Sabbath — Scripture Theory",
  description:
    "Plan a real, doable Sabbath — the day, the start, the end, what you'll stop, what you'll do instead. The lost commandment, returned to its rightful joy.",
};

export default function SabbathPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">Practice · Sabbath</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        One day in seven, stop.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        Sabbath is the only of the Ten Commandments most Christians openly ignore. It is also
        among the most life-giving. God built rest into creation (Gen 2:2-3). Jesus is its Lord
        (Mark 2:28). This planner makes the day concrete: when, what to stop, what to do instead.
      </p>
      <p className="mt-2 text-xs text-ink-500">
        "Remember the Sabbath day, to keep it holy." — Exodus 20:8
      </p>

      <div className="mt-10">
        <SabbathView />
      </div>
    </section>
  );
}
