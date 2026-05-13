import ApologeticsView from "@/components/ApologeticsView";
import { apologetics } from "@/data/apologetics";

export const metadata = {
  title: "Apologetics — Scripture Theory",
  description:
    `${apologetics.length} honest, pastoral answers to the hardest questions the believer is asked — God, the Bible, Jesus, suffering, science, other religions, hell, sexuality, hypocrisy. With meekness and fear.`,
};

export default function ApologeticsPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">Apologetics</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        Always be ready to give a reason.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        Not a debate manual — an honest, pastoral toolkit. Real answers to the hardest questions
        people ask, and the questions you ask yourself in the dark. Built on Scripture and
        2,000 years of Christian thought. Posture first: with meekness and fear.
      </p>
      <p className="mt-2 text-xs text-ink-500">
        "Always be ready to give a defense to everyone who asks you a reason for the hope that is
        in you, with meekness and fear." — 1 Peter 3:15
      </p>

      <div className="mt-10">
        <ApologeticsView />
      </div>
    </section>
  );
}
