import CourseHistory from "@/components/CourseHistory";
import { PageHero } from "@/components/ui/Tile";

export const metadata = {
  title: "My course history — Foundations of the Faith — Scripture Theory",
  description:
    "When you completed each week of Foundations, your quiz scores, day-by-day progress, and final exam record.",
};

export default function CourseHistoryPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="Your walk"
        title="Where you've been"
        titleAccent="in Foundations."
        intro="A quiet record of when you walked each week, how the quizzes went, and what the Lord has done across the course. Lives on this device only."
        scripture="Remember the days of old; consider the years of many generations."
        scriptureRef="Deuteronomy 32:7"
      />
      <div className="mt-10">
        <CourseHistory />
      </div>
    </section>
  );
}
