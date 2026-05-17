import { notFound } from "next/navigation";
import { TRACK, findCourse } from "@/data/courseTrack";
import TrackWeekView from "@/components/TrackWeekView";

type Params = Promise<{ courseId: string; n: string }>;

export function generateStaticParams() {
  return TRACK.flatMap((c) =>
    c.data.map((w) => ({ courseId: c.slug, n: String(w.week) }))
  );
}

export async function generateMetadata({ params }: { params: Params }) {
  const { courseId, n } = await params;
  const course = findCourse(courseId);
  if (!course) return { title: "Course — Scripture Theory" };
  const week = course.data.find((w) => w.week === Number(n));
  if (!week) return { title: `${course.title} — Scripture Theory` };
  return {
    title: `Week ${week.week} · ${week.title} — ${course.title}`,
    description: week.tagline,
  };
}

export default async function TrackWeekPage({ params }: { params: Params }) {
  const { courseId, n } = await params;
  const course = findCourse(courseId);
  if (!course) notFound();
  const week = course.data.find((w) => w.week === Number(n));
  if (!week) notFound();
  return <TrackWeekView courseId={course.id} week={week} />;
}
