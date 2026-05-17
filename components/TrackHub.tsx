"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useProfile } from "@/lib/profile";
import { TRACK, meetsPrerequisites, type CourseId } from "@/data/courseTrack";
import { Glyph, type GlyphId } from "@/components/ui/Glyph";

const ACCENT: Record<string, { border: string; bg: string; ring: string; tag: string }> = {
  flame: {
    border: "border-flame-500",
    bg: "bg-flame-50/60",
    ring: "shadow-[0_18px_50px_-20px_rgba(249,115,22,0.32)]",
    tag: "text-flame-700",
  },
  blue: {
    border: "border-sky-500",
    bg: "bg-sky-50/60",
    ring: "shadow-[0_18px_50px_-20px_rgba(14,165,233,0.32)]",
    tag: "text-sky-700",
  },
  emerald: {
    border: "border-emerald-500",
    bg: "bg-emerald-50/60",
    ring: "shadow-[0_18px_50px_-20px_rgba(16,185,129,0.32)]",
    tag: "text-emerald-700",
  },
  violet: {
    border: "border-violet-500",
    bg: "bg-violet-50/60",
    ring: "shadow-[0_18px_50px_-20px_rgba(139,92,246,0.32)]",
    tag: "text-violet-700",
  },
};

const COURSE_GLYPH: Record<string, GlyphId> = {
  foundations: "cross",
  "story-of-god": "open-book",
  disciplines: "hands",
};

export default function TrackHub() {
  const { profile, mounted } = useProfile();

  const passedCourses: CourseId[] = useMemo(() => {
    const passed: CourseId[] = [];
    if (profile.course?.passed) passed.push("foundations");
    if (profile.courses?.["story-of-god"]?.passed) passed.push("story-of-god");
    if (profile.courses?.["disciplines"]?.passed) passed.push("disciplines");
    return passed;
  }, [profile]);

  return (
    <ol className="space-y-5 relative">
      <span
        aria-hidden
        className="hidden md:block absolute left-8 top-3 bottom-3 w-px bg-gradient-to-b from-flame-300 via-flame-500/40 to-ink-200"
      />
      {TRACK.map((c, i) => {
        const accent = ACCENT[c.accent] ?? ACCENT.flame;
        const unlocked = meetsPrerequisites(c, passedCourses);
        const isFoundations = c.id === "foundations";
        const foundationDone = profile.course?.passed;
        const completionLabel = isFoundations
          ? foundationDone
            ? "Completed"
            : profile.course
            ? `${(profile.course.weeksComplete ?? []).length} of ${c.weeks} weeks`
            : null
          : null;

        return (
          <li key={c.id}>
            <article
              className={[
                "relative grid grid-cols-[auto_1fr] gap-4 md:gap-6 rounded-3xl border p-5 md:p-6 transition-colors",
                unlocked ? `${accent.border} ${accent.bg} ${accent.ring}` : "border-ink-200 bg-card-subtle opacity-80",
              ].join(" ")}
            >
              <div className="relative z-10 flex flex-col items-center gap-1.5">
                <div
                  className={[
                    "w-16 h-16 md:w-20 md:h-20 rounded-2xl border flex items-center justify-center font-serif text-2xl",
                    unlocked
                      ? `${accent.border} bg-card ${accent.tag}`
                      : "border-ink-200 bg-card-subtle text-ink-400",
                  ].join(" ")}
                >
                  <Glyph id={COURSE_GLYPH[c.id] ?? "flame"} size={36} />
                </div>
                <div className={["text-[10px] uppercase tracking-widest text-center", unlocked ? accent.tag : "text-ink-400"].join(" ")}>
                  {i + 1} of {TRACK.length}
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <div className={["text-[10px] uppercase tracking-widest", unlocked ? accent.tag : "text-ink-400"].join(" ")}>
                      Course · {c.weeks} weeks
                      {c.status === "coming-soon" && " · coming soon"}
                    </div>
                    <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mt-0.5 leading-tight">
                      {c.title}
                    </h2>
                    <p className="text-sm text-ink-600 italic mt-0.5">{c.subtitle}</p>
                  </div>
                  {mounted && completionLabel && (
                    <span className={["text-xs font-medium shrink-0", foundationDone ? "text-emerald-700" : "text-flame-700"].join(" ")}>
                      {completionLabel}
                    </span>
                  )}
                </div>

                <p className="mt-3 text-ink-700 leading-relaxed">{c.tagline}</p>

                {c.prerequisites.length > 0 && (
                  <p className="mt-2 text-xs text-ink-500 italic">
                    Prerequisite: {c.prerequisites.map((p) => TRACK.find((t) => t.id === p)?.title).join(", ")}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {unlocked && c.status === "live" ? (
                    <Link
                      href={c.href}
                      className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-4 py-1.5 text-sm hover:bg-flame-500"
                    >
                      {foundationDone && isFoundations ? "Open" : "Begin →"}
                    </Link>
                  ) : c.status === "coming-soon" ? (
                    <span className="inline-flex items-center rounded-full border border-ink-300 text-ink-500 px-4 py-1.5 text-sm">
                      Coming soon
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full border border-ink-300 text-ink-500 px-4 py-1.5 text-sm">
                      🔒 Pass {c.prerequisites.map((p) => TRACK.find((t) => t.id === p)?.title).join(", ")} first
                    </span>
                  )}
                </div>
              </div>
            </article>
          </li>
        );
      })}

      <li>
        <div className="rounded-3xl border border-dashed border-ink-200 bg-card-subtle p-5 md:p-6 text-center">
          <p className="text-sm text-ink-600 italic">
            More courses are coming — Disciplines of the Faith, the Sermon on the Mount in twelve weeks,
            Romans, the prophets, and others. Hand on what you have walked.
          </p>
        </div>
      </li>
    </ol>
  );
}
