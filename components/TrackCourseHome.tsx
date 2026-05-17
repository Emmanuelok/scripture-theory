"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useProfile } from "@/lib/profile";
import { findCourse, type CourseId } from "@/data/courseTrack";
import { Glyph } from "@/components/ui/Glyph";

export default function TrackCourseHome({ courseId }: { courseId: CourseId }) {
  const course = findCourse(courseId);
  const { profile, mounted } = useProfile();

  const progress = useMemo(() => {
    if (!course) return null;
    const cp = profile.courses?.[course.id];
    return cp ?? null;
  }, [profile, course]);

  if (!course) return null;

  const done = new Set(progress?.weeksComplete ?? []);
  const next = course.data.find((w) => !done.has(w.week));
  const pct = mounted ? Math.round((done.size / course.weeks) * 100) : 0;

  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <Link
        href="/track"
        className="text-xs uppercase tracking-widest text-flame-700 hover:underline"
      >
        ← Growth tract
      </Link>

      {/* Hero */}
      <article className="mt-6 relative overflow-hidden rounded-3xl bg-ink-900 text-ink-50 p-8 md:p-10">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(70% 60% at 0% 0%, rgba(14,165,233,0.18), transparent 60%), radial-gradient(60% 40% at 100% 100%, rgba(249,115,22,0.16), transparent 60%)",
          }}
        />
        <div className="relative">
          <div className="text-[10px] uppercase tracking-[0.22em] text-sky-300">
            Course · {course.weeks} weeks
          </div>
          <h1 className="font-serif text-3xl md:text-4xl mt-1 leading-tight">{course.title}</h1>
          <p className="mt-2 text-ink-300 italic">{course.subtitle}</p>
          {mounted && (
            <div className="mt-5">
              <div className="flex items-baseline justify-between text-xs text-ink-300 mb-1.5">
                <span>Progress</span>
                <span className="text-sky-300">
                  {done.size} of {course.weeks} weeks · {pct}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-ink-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 to-sky-300 transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </article>

      <p className="mt-6 text-ink-700 leading-relaxed">{course.tagline}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {next ? (
          <Link
            href={`/track/${course.slug}/week/${next.week}`}
            className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-500"
          >
            Open Week {next.week} · {next.title} →
          </Link>
        ) : (
          <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-900 px-5 py-2 text-sm">
            🏅 You've finished every week
          </span>
        )}
      </div>

      {/* Twelve weeks */}
      <ol className="mt-10 relative space-y-3">
        <span
          aria-hidden
          className="hidden md:block absolute left-7 top-2 bottom-2 w-px bg-gradient-to-b from-sky-300 via-sky-500/40 to-ink-200"
        />
        {course.data.map((w) => {
          const isDone = done.has(w.week);
          const isCurrent = !isDone && next?.week === w.week;
          return (
            <li key={w.week}>
              <Link
                href={`/track/${course.slug}/week/${w.week}`}
                className={[
                  "group relative grid grid-cols-[auto_1fr] gap-4 md:gap-6 rounded-3xl border p-5 md:p-6 transition-all overflow-hidden",
                  isDone
                    ? "border-emerald-500/40 bg-emerald-50/40 hover:border-emerald-500"
                    : isCurrent
                    ? "border-sky-500 bg-card shadow-[0_18px_50px_-20px_rgba(14,165,233,0.32)]"
                    : "border-ink-200 bg-card hover:-translate-y-0.5 hover:border-sky-500/60 hover:shadow-[0_18px_50px_-20px_rgba(14,165,233,0.28)]",
                ].join(" ")}
              >
                <div className="relative flex flex-col items-center gap-1.5 z-10">
                  <div
                    className={[
                      "w-14 h-14 md:w-16 md:h-16 rounded-2xl border flex items-center justify-center font-serif text-xl md:text-2xl tracking-tight transition-colors",
                      isDone
                        ? "border-emerald-500 bg-emerald-100 text-emerald-700"
                        : isCurrent
                        ? "border-sky-500 bg-gradient-to-br from-sky-50 to-sky-100 text-sky-700"
                        : "border-ink-200 bg-card-subtle text-ink-600",
                    ].join(" ")}
                  >
                    {w.week}
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-widest text-sky-700">
                    Week {w.week}
                    {w.readingMinutes ? ` · ${w.readingMinutes} min` : ""}
                    {isDone && " · complete"}
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-ink-900 mt-0.5 leading-snug">
                    {w.title}
                  </h3>
                  <p className="text-sm text-ink-600 italic mt-1">{w.tagline}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
