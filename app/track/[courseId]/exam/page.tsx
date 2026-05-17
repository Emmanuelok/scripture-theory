import { notFound } from "next/navigation";
import { TRACK, findCourse } from "@/data/courseTrack";
import TrackExamView from "@/components/TrackExamView";

type Params = Promise<{ courseId: string }>;

export function generateStaticParams() {
  return TRACK.map((c) => ({ courseId: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { courseId } = await params;
  const course = findCourse(courseId);
  if (!course) return { title: "Final exam — Scripture Theory" };
  return {
    title: `${course.title} · final exam — Scripture Theory`,
    description: `The 24-question final exam for ${course.title}.`,
  };
}

export default async function TrackExamPage({ params }: { params: Params }) {
  const { courseId } = await params;
  const course = findCourse(courseId);
  if (!course) notFound();
  return <TrackExamView courseId={course.id} />;
}
