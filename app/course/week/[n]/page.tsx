import { notFound } from "next/navigation";
import { COURSE_WEEKS } from "@/data/course";
import CourseWeekView from "@/components/CourseWeekView";

type Params = Promise<{ n: string }>;

export function generateStaticParams() {
  return COURSE_WEEKS.map((w) => ({ n: String(w.week) }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { n } = await params;
  const week = COURSE_WEEKS.find((w) => w.week === Number(n));
  if (!week) return { title: "Course — Scripture Theory" };
  return {
    title: `Week ${week.week} · ${week.title} — Scripture Theory`,
    description: week.tagline,
  };
}

export default async function CourseWeekPage({ params }: { params: Params }) {
  const { n } = await params;
  const week = COURSE_WEEKS.find((w) => w.week === Number(n));
  if (!week) notFound();
  return <CourseWeekView week={week} />;
}
