import ApologeticsView from "@/components/ApologeticsView";
import { apologetics } from "@/data/apologetics";
import { PageHero } from "@/components/ui/Tile";

export const metadata = {
  title: "Apologetics — Scripture Theory",
  description: `${apologetics.length} honest, pastoral answers to the hardest questions the believer is asked — God, the Bible, Jesus, suffering, science, other religions, hell, sexuality, hypocrisy. With meekness and fear.`,
};

export default function ApologeticsPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="Apologetics"
        title="Always be ready"
        titleAccent="to give a reason."
        intro={`Not a debate manual — an honest, pastoral toolkit. Real answers to the hardest questions people ask, and the questions you ask yourself in the dark. ${apologetics.length} questions, built on Scripture and 2,000 years of Christian thought. Posture first: with meekness and fear.`}
        scripture="Always be ready to give a defense to everyone who asks you a reason for the hope that is in you, with meekness and fear."
        scriptureRef="1 Peter 3:15"
      />

      <div className="mt-10">
        <ApologeticsView />
      </div>

      <div className="mt-16 rounded-3xl bg-ink-900 text-ink-50 p-8 md:p-12 text-center relative overflow-hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(249,115,22,0.22), transparent 60%)",
          }}
        />
        <div className="relative">
          <p className="font-serif text-2xl md:text-3xl leading-snug italic">
            "Come now, let us reason together, says the LORD."
          </p>
          <p className="mt-2 text-ink-300">Isaiah 1:18</p>
        </div>
      </div>
    </section>
  );
}
