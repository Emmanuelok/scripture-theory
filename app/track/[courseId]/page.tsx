import { notFound } from "next/navigation";
import { TRACK, findCourse } from "@/data/courseTrack";
import TrackCourseHome from "@/components/TrackCourseHome";

type Params = Promise<{ courseId: string }>;

export function generateStaticParams() {
  return TRACK.map((c) => ({ courseId: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { courseId } = await params;
  const course = findCourse(courseId);
  if (!course) return { title: "Course — Scripture Theory" };
  return {
    title: `${course.title} — Scripture Theory`,
    description: course.tagline,
  };
}

export default async function TrackCoursePage({ params }: { params: Params }) {
  const { courseId } = await params;
  const course = findCourse(courseId);
  if (!course) notFound();
  return <TrackCourseHome courseId={course.id} />;
}
