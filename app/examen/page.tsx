import ExamenView from "@/components/Examen";

export const metadata = {
  title: "Examen — Scripture Theory",
  description:
    "A five-minute evening reflection — thank, notice, repent, ask. The lost rhythm of the soul, recovered for every believer.",
};

export default function ExamenPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">Practice · Examen</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        End the day with Him.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        Five minutes. Four questions. The day is a letter from God — and most days we never open
        it. This is how saints have closed the day for centuries: thanksgiving, noticing,
        repentance, asking. Saved only on your device.
      </p>
      <p className="mt-2 text-xs text-ink-500">
        "Search me, O God, and know my heart; try me, and know my anxieties; and see if there is
        any wicked way in me, and lead me in the way everlasting." — Psalm 139:23-24
      </p>

      <div className="mt-10">
        <ExamenView />
      </div>
    </section>
  );
}
