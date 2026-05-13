import FruitView from "@/components/FruitView";

export const metadata = {
  title: "Fruit of the Spirit — Scripture Theory",
  description:
    "A periodic, honest self-check on the nine facets of the fruit of the Spirit (Galatians 5:22-23) — love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control. Trend over time. Lives on your device only.",
};

export default function FruitPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">
        Sanctification · Fruit of the Spirit
      </span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        Am I more like Jesus than I was last season?
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        Sanctification is real. It is the Spirit's work in us, not ours. But fruit can be checked
        — a tree growing in the right soil bears more, season by season. This is a quiet,
        honest review of the nine facets of the fruit of the Spirit. Keep it on your device.
        Bring it to one trusted believer.
      </p>
      <p className="mt-2 text-xs text-ink-500">
        "But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness,
        faithfulness, gentleness, self-control. Against such there is no law." —
        Galatians 5:22-23
      </p>

      <div className="mt-10">
        <FruitView />
      </div>
    </section>
  );
}
