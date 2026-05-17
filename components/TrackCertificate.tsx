"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useProfile, type CourseProgress } from "@/lib/profile";
import { findCourse, type CourseId } from "@/data/courseTrack";
import { EXAM_QUESTION_COUNT } from "@/data/course";

export default function TrackCertificate({ courseId }: { courseId: CourseId }) {
  const course = findCourse(courseId);
  const { profile, update, mounted } = useProfile();
  const cp: CourseProgress = profile.courses?.[courseId] ?? {};

  const [name, setName] = useState(
    cp.certifiedName ?? profile.name ?? profile.secretPlace?.alias ?? ""
  );
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!mounted || !course) return;
    if (cp.passed && !cp.certifiedAt) {
      const next: CourseProgress = { ...cp, certifiedAt: new Date().toISOString() };
      update({ courses: { ...(profile.courses ?? {}), [courseId]: next } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, cp.passed]);

  const allWeeksDone = course ? (cp.weeksComplete ?? []).length === course.weeks : false;

  const completedDate = useMemo(() => {
    const iso = cp.certifiedAt ?? new Date().toISOString();
    return new Date(iso).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
  }, [cp.certifiedAt]);

  const safeName = name.replace(/[<>]/g, "").slice(0, 60).trim() || "Beloved Believer";
  const certUrl = useMemo(() => {
    if (!course) return "";
    const params = new URLSearchParams();
    if (cp.certifiedAt) {
      params.set("date", new Date(cp.certifiedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }));
    }
    if (cp.examScore !== undefined) {
      params.set("score", `${cp.examScore}/${EXAM_QUESTION_COUNT}`);
    }
    const qs = params.toString();
    return `/api/track-cert/${course.slug}/${encodeURIComponent(safeName)}${qs ? `?${qs}` : ""}`;
  }, [course, safeName, cp.certifiedAt, cp.examScore]);

  function persistName() {
    if (!course) return;
    const trimmed = safeName === "Beloved Believer" ? undefined : safeName;
    const next: CourseProgress = { ...cp, certifiedName: trimmed };
    update({ courses: { ...(profile.courses ?? {}), [courseId]: next } });
    setStatus("Saved");
    setTimeout(() => setStatus(""), 1500);
  }

  if (!course) return null;
  if (!mounted) {
    return (
      <section className="mx-auto max-w-3xl px-5 pt-12 pb-24">
        <div className="rounded-3xl border border-ink-200 bg-card-subtle p-10 text-center text-ink-500">Loading…</div>
      </section>
    );
  }

  if (!allWeeksDone || !cp.passed) {
    return (
      <section className="mx-auto max-w-3xl px-5 pt-12 pb-24">
        <Link href={`/track/${course.slug}`} className="text-xs uppercase tracking-widest text-sky-700 hover:underline">
          ← {course.title}
        </Link>
        <div className="mt-6 rounded-3xl border border-ink-200 bg-card p-6 md:p-8">
          <div className="text-[10px] uppercase tracking-widest text-sky-700">Not yet</div>
          <h2 className="font-serif text-2xl text-ink-900 mt-1">The certificate is earned at the end.</h2>
          <p className="mt-2 text-sm text-ink-700 leading-relaxed">
            Complete all {course.weeks} weekly quizzes and pass the final exam, then return here.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href={`/track/${course.slug}`} className="inline-flex items-center rounded-full bg-sky-600 text-ink-50 px-5 py-2 text-sm hover:bg-sky-500">
              Back to course
            </Link>
            <Link href={`/track/${course.slug}/exam`} className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2 text-sm text-ink-700 hover:border-ink-900">
              Open the final exam
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-24">
      <Link href={`/track/${course.slug}`} className="text-xs uppercase tracking-widest text-sky-700 hover:underline">
        ← {course.title}
      </Link>

      <header className="mt-4">
        <div className="text-[10px] uppercase tracking-widest text-sky-700">Certificate · earned {completedDate}</div>
        <h1 className="font-serif text-3xl md:text-4xl mt-2 text-ink-900 leading-tight">
          You walked {course.title}.
        </h1>
        <p className="mt-2 text-ink-700">{course.subtitle}</p>
      </header>

      {/* Preview */}
      <div className="mt-8 rounded-3xl border border-ink-200 bg-card-subtle p-3 md:p-4 shadow-inner">
        <div className="aspect-[1600/1100] w-full rounded-2xl overflow-hidden bg-ink-50 relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={certUrl} alt={`${course.title} certificate`} className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>

      {/* Name editor */}
      <div className="mt-6 rounded-3xl border border-ink-200 bg-card p-5">
        <label className="block text-[10px] uppercase tracking-widest text-sky-700">
          Your name (written on the certificate)
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={persistName}
          placeholder="e.g. Anna O."
          maxLength={60}
          className="mt-2 w-full rounded-xl border border-ink-200 bg-card-subtle px-4 py-2 text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-sky-500"
        />
        <p className="mt-2 text-xs text-ink-500 italic">
          Stays on this device. {status && <span className="text-emerald-700 not-italic">· {status}</span>}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap gap-2">
        <a
          href={certUrl}
          download={`${course.slug}-certificate.png`}
          className="inline-flex items-center rounded-full bg-sky-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-sky-500"
        >
          ↓ Download PNG
        </a>
        <a
          href={certUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2.5 text-sm text-ink-700 hover:border-ink-900"
        >
          Open full size ↗
        </a>
        <Link href="/track" className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2.5 text-sm text-ink-700 hover:border-ink-900">
          The growth tract
        </Link>
      </div>
    </section>
  );
}
