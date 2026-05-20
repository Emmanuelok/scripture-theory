import MeDashboard from "@/components/MeDashboard";
import PersonalSubNav from "@/components/PersonalSubNav";
import PracticeHeatmap from "@/components/PracticeHeatmap";
import HeartCompass from "@/components/HeartCompass";
import FigureBoundary from "@/components/figure-utils/FigureBoundary";

export const metadata = {
  title: "My walk — Scripture Theory",
  description:
    "A quiet, personal record of your walk with Jesus — reading plans, the Secret Place, prayers, fasts, examens, and more. Lives only on this device.",
};

export default function MePage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">My walk</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        Where He has walked with you.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        Everything you've kept on this device — reading plans, the Secret Place, prayers, fasts,
        examens, the people you carry. No servers. No streaks. No shame. Just a quiet record you
        can carry between devices when you choose to.
      </p>

      <div className="mt-10">
        <PersonalSubNav />
        <div className="mt-6">
          <FigureBoundary label="Heart Compass">
            <HeartCompass />
          </FigureBoundary>
        </div>
        <div className="mt-6">
          <FigureBoundary label="Practice Heatmap">
            <PracticeHeatmap />
          </FigureBoundary>
        </div>
        <MeDashboard />
      </div>
    </section>
  );
}
