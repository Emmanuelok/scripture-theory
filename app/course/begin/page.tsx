import CourseBegin from "@/components/CourseBegin";
import { COURSE_TITLE } from "@/data/course";
import { PageHero } from "@/components/ui/Tile";

export const metadata = {
  title: `Begin — ${COURSE_TITLE} — Scripture Theory`,
  description:
    "A pastoral start to the twelve-week Foundations of the Faith course. Choose your pace and commit to walking it.",
};

export default function CourseBeginPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="A doorway"
        title="Begin Foundations"
        titleAccent="of the Faith."
        intro="Twelve weeks of careful walking with Christ. Read a pastoral letter, choose how you'll pace yourself, and commit before the Lord to walk it. Nothing dramatic. Just honest. He has been waiting for you."
        scripture="Come to Me, all you who labor and are heavily burdened, and I will give you rest."
        scriptureRef="Matthew 11:28"
      />
      <div className="mt-10">
        <CourseBegin />
      </div>
    </section>
  );
}
