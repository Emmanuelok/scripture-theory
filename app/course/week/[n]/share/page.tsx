import { notFound } from "next/navigation";
import { COURSE_WEEKS } from "@/data/course";
import CourseWeekShare from "@/components/CourseWeekShare";

type Params = Promise<{ n: string }>;

export function generateStaticParams() {
  return COURSE_WEEKS.map((w) => ({ n: String(w.week) }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { n } = await params;
  const week = COURSE_WEEKS.find((w) => w.week === Number(n));
  if (!week) return { title: "Course share — Scripture Theory" };
  const ogImage = `/api/course-card/${week.week}`;
  return {
    title: `Week ${week.week} · ${week.title} — Foundations of the Faith`,
    description: `Memory: ${week.memoryVerse.ref} — "${week.memoryVerse.text}"`,
    openGraph: {
      title: `Week ${week.week} · ${week.title}`,
      description: week.tagline,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Week ${week.week} · ${week.title}`,
      description: week.tagline,
      images: [ogImage],
    },
  };
}

export default async function CourseWeekSharePage({ params }: { params: Params }) {
  const { n } = await params;
  const week = COURSE_WEEKS.find((w) => w.week === Number(n));
  if (!week) notFound();
  return <CourseWeekShare week={week} />;
}
