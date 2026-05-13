import CourseExamView from "@/components/CourseExamView";
import { PageHero } from "@/components/ui/Tile";
import { EXAM_PASS_PERCENT, EXAM_QUESTION_COUNT } from "@/data/course";

export const metadata = {
  title: "Final exam — Foundations of the Faith — Scripture Theory",
  description: `${EXAM_QUESTION_COUNT}-question final exam for Foundations of the Faith. Pass at ${EXAM_PASS_PERCENT}% for the Scripture Theory certificate.`,
};

export default function CourseExamPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="Final exam"
        title="Twelve weeks,"
        titleAccent="one exam."
        intro={`${EXAM_QUESTION_COUNT} questions across all twelve weeks. Pass at ${EXAM_PASS_PERCENT}% to earn the certificate. You can retake as many times as you like.`}
        scripture="Study to show yourself approved by God, a workman who doesn't need to be ashamed, properly handling the Word of Truth."
        scriptureRef="2 Timothy 2:15"
      />
      <div className="mt-10">
        <CourseExamView />
      </div>
    </section>
  );
}
