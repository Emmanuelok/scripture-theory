"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useProfile } from "@/lib/profile";
import { COURSE_WEEKS, EXAM_QUESTION_COUNT } from "@/data/course";

export default function CourseCertificate() {
  const { profile, update, mounted } = useProfile();
  const course = profile.course ?? {};

  const [name, setName] = useState(
    course.certifiedName ?? profile.name ?? profile.secretPlace?.alias ?? ""
  );
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!mounted) return;
    if (course.passed && !course.certifiedAt) {
      // Stamp the cert date on first arrival
      update({
        course: {
          ...course,
          certifiedAt: new Date().toISOString(),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, course.passed]);

  const allWeeksDone =
    (course.weeksComplete ?? []).length === COURSE_WEEKS.length;

  const completedDate = useMemo(() => {
    const iso = course.certifiedAt ?? new Date().toISOString();
    return new Date(iso).toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, [course.certifiedAt]);

  if (!mounted) {
    return (
      <div className="rounded-3xl border border-ink-200 bg-card-subtle p-10 text-center text-ink-500">
        Loading…
      </div>
    );
  }

  if (!allWeeksDone || !course.passed) {
    return (
      <div className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8">
        <div className="text-[10px] uppercase tracking-widest text-flame-700">Not yet</div>
        <h2 className="font-serif text-2xl text-ink-900 mt-1">
          The certificate is earned at the end.
        </h2>
        <p className="mt-2 text-sm text-ink-700 leading-relaxed">
          Complete all twelve weekly quizzes and pass the final exam, then return here.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/course"
            className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-500"
          >
            Back to the course →
          </Link>
          {allWeeksDone && (
            <Link
              href="/course/exam"
              className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2 text-sm text-ink-700 hover:border-ink-900"
            >
              Take the final exam →
            </Link>
          )}
        </div>
      </div>
    );
  }

  const cleanName = (name || "Beloved Believer").trim().slice(0, 60);
  const score = course.examScore;
  const scoreString = score != null ? `${score}/${EXAM_QUESTION_COUNT}` : "";
  const dateString = completedDate;

  const certUrl = `/api/certificate/${encodeURIComponent(cleanName)}?date=${encodeURIComponent(
    dateString
  )}${score != null ? `&score=${encodeURIComponent(scoreString)}` : ""}`;

  function saveName() {
    update({
      course: {
        ...course,
        certifiedName: cleanName,
      },
    });
    setStatus("Name saved on this device.");
  }

  async function download() {
    try {
      const r = await fetch(certUrl);
      const blob = await r.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `scripture-theory-certificate-${cleanName.toLowerCase().replace(/\s+/g, "-")}.png`;
      a.click();
      URL.revokeObjectURL(a.href);
      setStatus("Downloaded.");
    } catch {
      setStatus("Could not download. Right-click the image below and save.");
    }
  }

  async function share() {
    try {
      const r = await fetch(certUrl);
      const blob = await r.blob();
      const file = new File([blob], "scripture-theory-certificate.png", { type: "image/png" });
      const data: ShareData = {
        title: "Foundations of the Faith — Certificate",
        text: `I completed Foundations of the Faith on Scripture Theory.`,
        files: [file],
      };
      if (navigator.canShare?.(data) && navigator.share) {
        await navigator.share(data);
        setStatus("Shared.");
      } else if (navigator.share) {
        await navigator.share({ title: data.title, text: data.text });
      }
    } catch (e) {
      if ((e as Error)?.name !== "AbortError") setStatus("Share canceled.");
    }
  }

  return (
    <div className="space-y-6">
      {/* Name field */}
      <section className="rounded-3xl border border-ink-200 bg-card p-5 md:p-6">
        <div className="text-[10px] uppercase tracking-widest text-flame-700">
          The name on your certificate
        </div>
        <div className="mt-3 flex flex-wrap gap-2 items-end">
          <label className="flex-1 min-w-[200px]">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={60}
              placeholder="Your name"
              className="w-full rounded-xl border border-ink-200 bg-card-subtle px-3 py-2 text-base text-ink-900 focus:outline-none focus:border-flame-500"
            />
          </label>
          <button
            onClick={saveName}
            className="rounded-full bg-ink-900 text-ink-50 px-4 py-2 text-sm hover:bg-flame-700"
          >
            Save
          </button>
        </div>
        {status && <p className="mt-2 text-xs text-ink-500">{status}</p>}
      </section>

      {/* Preview */}
      <div className="rounded-3xl overflow-hidden border border-ink-200 bg-ink-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={certUrl}
          alt="Foundations of the Faith — Certificate"
          width={1600}
          height={1100}
          className="w-full h-auto block"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 no-print">
        <button
          onClick={share}
          className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-500"
        >
          Share…
        </button>
        <button
          onClick={download}
          className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2 text-sm text-ink-800 hover:border-ink-900"
        >
          ↓ Download
        </button>
        <button
          onClick={() => (typeof window !== "undefined" ? window.print() : null)}
          className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2 text-sm text-ink-800 hover:border-ink-900"
        >
          Print
        </button>
        <Link
          href="/disciple"
          className="inline-flex items-center rounded-full border border-flame-300 bg-flame-50 text-flame-700 px-5 py-2 text-sm hover:bg-flame-100 ml-auto"
        >
          Next: walk The Path →
        </Link>
      </div>

      <p className="text-xs text-ink-500 italic text-center max-w-xl mx-auto leading-relaxed">
        This certificate is issued by Scripture Theory and is not a degree, ordination, or
        academic credential — it is a record of faithful completion of an introductory course. The
        Spirit grows the disciple; we just help you start.
      </p>
    </div>
  );
}
