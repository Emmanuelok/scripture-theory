import CallingView from "@/components/CallingView";

export const metadata = {
  title: "Calling — Scripture Theory",
  description:
    "A seven-step discernment walk for vocation, ministry, and life direction — love, wiring, the world's need, the Word, wise counsel, sensed direction, and the next obedient step.",
};

export default function CallingPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">Practice · Calling</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        What is the Lord calling you to?
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        Vocational discernment is rarely a single moment. It is a slow listening across love, the
        way you're wired, the need you see in the world, the Word, the wise, and the inward
        witness of the Spirit. Seven steps. Saved on your device. Return to it over months.
      </p>
      <p className="mt-2 text-xs text-ink-500">
        "Faithful is He who calls you, who also will do it." — 1 Thessalonians 5:24
      </p>

      <div className="mt-10">
        <CallingView />
      </div>
    </section>
  );
}
