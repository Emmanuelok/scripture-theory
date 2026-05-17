import { notFound } from "next/navigation";
import { TRACK, findCourse } from "@/data/courseTrack";
import TrackCertificate from "@/components/TrackCertificate";

type Params = Promise<{ courseId: string }>;

export function generateStaticParams() {
  return TRACK.map((c) => ({ courseId: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { courseId } = await params;
  const course = findCourse(courseId);
  if (!course) return { title: "Certificate — Scripture Theory" };
  return {
    title: `${course.title} · certificate — Scripture Theory`,
    description: `Your certificate of completion for ${course.title}.`,
  };
}

export default async function TrackCertPage({ params }: { params: Params }) {
  const { courseId } = await params;
  const course = findCourse(courseId);
  if (!course) notFound();
  return <TrackCertificate courseId={course.id} />;
}
