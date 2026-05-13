import ExamenView from "@/components/Examen";
import { PageHero } from "@/components/ui/Tile";

export const metadata = {
  title: "Examen — Scripture Theory",
  description:
    "A five-minute evening reflection — thank, notice, repent, ask. The lost rhythm of the soul, recovered for every believer.",
};

export default function ExamenPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="Practice · Five minutes · Examen"
        title="End the day"
        titleAccent="with Him."
        intro="Five minutes. Four questions. The day is a letter from God — and most days we never open it. This is how saints have closed the day for centuries: thanksgiving, noticing, repentance, asking. Saved only on your device."
        scripture="Search me, O God, and know my heart; try me, and know my anxieties; and see if there is any wicked way in me, and lead me in the way everlasting."
        scriptureRef="Psalm 139:23–24"
      />
      <div className="mt-10">
        <ExamenView />
      </div>
    </section>
  );
}
