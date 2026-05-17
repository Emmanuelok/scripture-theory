import { notFound } from "next/navigation";
import { TRACK, findCourse } from "@/data/courseTrack";
import TrackWorkbook from "@/components/TrackWorkbook";

type Params = Promise<{ courseId: string }>;

export function generateStaticParams() {
  return TRACK.map((c) => ({ courseId: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { courseId } = await params;
  const course = findCourse(courseId);
  if (!course) return { title: "Workbook — Scripture Theory" };
  return {
    title: `${course.title} · workbook — Scripture Theory`,
    description: `Printable full workbook for ${course.title}.`,
  };
}

export default async function TrackWorkbookPage({ params }: { params: Params }) {
  const { courseId } = await params;
  const course = findCourse(courseId);
  if (!course) notFound();
  return <TrackWorkbook courseId={course.id} />;
}
