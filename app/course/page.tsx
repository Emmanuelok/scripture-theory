import CourseHome from "@/components/CourseHome";
import { COURSE_SUBTITLE, COURSE_TITLE } from "@/data/course";
import { PageHero } from "@/components/ui/Tile";

export const metadata = {
  title: `${COURSE_TITLE} — Scripture Theory`,
  description: `${COURSE_TITLE}: a twelve-week course for new believers (and anyone returning to Christ). Weekly readings, reflection, practice, and a quiz. Final exam and a printable certificate when you finish.`,
};

export default function CoursePage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="A twelve-week course"
        title={COURSE_TITLE.split(" ").slice(0, -2).join(" ")}
        titleAccent={COURSE_TITLE.split(" ").slice(-2).join(" ")}
        intro={`${COURSE_SUBTITLE} A weekly lesson, reading, reflection questions, a practical step, and a 5-question quiz. Pass the final exam (24 questions across the twelve weeks) and a Scripture Theory certificate is yours to print. No payment, no streaks, no shame.`}
        scripture="I am persuaded that He who began a good work in you will complete it until the day of Jesus Christ."
        scriptureRef="Philippians 1:6"
      />
      <div className="mt-10">
        <CourseHome />
      </div>
    </section>
  );
}
