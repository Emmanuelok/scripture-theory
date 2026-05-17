import CohortHub from "@/components/CohortHub";
import { PageHero } from "@/components/ui/Tile";

export const metadata = {
  title: "Cohorts — Scripture Theory",
  description:
    "Walk Foundations of the Faith together. Five to eight believers, twelve weeks, one shared prayer thread. Create a cohort or join one with a code.",
};

export default function CohortPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="Walk it together"
        title="Cohorts."
        titleAccent=""
        intro="Foundations of the Faith was built to be walked by five to eight believers together. Create a cohort, share the code, and walk the twelve weeks with people you love. Each week's progress publishes to the group; one shared prayer thread keeps you carrying each other."
        scripture="Two are better than one, because they have a good reward for their labor."
        scriptureRef="Ecclesiastes 4:9"
      />
      <div className="mt-10">
        <CohortHub />
      </div>
    </section>
  );
}
