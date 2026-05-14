"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useProfile } from "@/lib/profile";
import { COURSE_WEEKS, EXAM_QUESTION_COUNT, EXAM_PASS_PERCENT } from "@/data/course";
import { Glyph } from "@/components/ui/Glyph";

const WEEK_GLYPHS = [
  "cross", "flame", "wreath", "open-book", "hands", "forgive",
  "dove", "house", "chalice", "lamp", "anchor", "path",
] as const;

export default function CourseHome() {
  const { profile, mounted } = useProfile();
  const course = profile.course ?? {};
  const done = useMemo(() => new Set(course.weeksComplete ?? []), [course.weeksComplete]);

  if (!mounted) {
    return (
      <div className="rounded-3xl border border-ink-200 bg-card-subtle p-10 text-center text-ink-500">
        Loading the course…
      </div>
    );
  }

  const completeCount = done.size;
  const allDone = completeCount === COURSE_WEEKS.length;
  const pct = Math.round((completeCount / COURSE_WEEKS.length) * 100);
  const next = COURSE_WEEKS.find((w) => !done.has(w.week));

  return (
    <div className="space-y-6">
      {/* Progress header */}
      <section className="relative overflow-hidden rounded-3xl bg-ink-900 text-ink-50 p-6 md:p-8">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(70% 60% at 0% 0%, rgba(249,115,22,0.18), transparent 60%), radial-gradient(60% 40% at 100% 100%, rgba(184,66,12,0.16), transparent 60%)",
          }}
        />
        <div className="relative grid md:grid-cols-[1fr_auto] gap-4 items-end">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-flame-300">
              Foundations · your course progress
            </div>
            <h2 className="font-serif text-3xl md:text-4xl mt-1 leading-tight">
              {allDone
                ? course.passed
                  ? "Course complete — certificate earned."
                  : "Twelve weeks done. Take the exam."
                : next
                ? `Week ${next.week} · ${next.title}`
                : "Begin"}
            </h2>
            {next && !allDone && (
              <p className="mt-2 text-sm text-ink-300 leading-relaxed max-w-xl">
                <strong className="text-ink-50">Next:</strong> {next.tagline}
              </p>
            )}
            <div className="mt-5">
              <div className="flex items-baseline justify-between text-xs text-ink-300 mb-1.5">
                <span>Progress</span>
                <span className="text-flame-300">
                  {completeCount} of {COURSE_WEEKS.length} weeks · {pct}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-ink-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-flame-500 to-flame-300 transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </div>
          {allDone ? (
            course.passed ? (
              <Link
                href="/course/certificate"
                className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-500 whitespace-nowrap"
              >
                View certificate →
              </Link>
            ) : (
              <Link
                href="/course/exam"
                className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-500 whitespace-nowrap"
              >
                Take the final exam →
              </Link>
            )
          ) : next ? (
            <Link
              href={`/course/week/${next.week}`}
              className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-500 whitespace-nowrap"
            >
              Open Week {next.week} →
            </Link>
          ) : null}
        </div>
      </section>

      {/* What's in the course */}
      <div className="grid sm:grid-cols-3 gap-3 md:gap-4">
        <Stat label="Weeks" value="12" sub="anchor scripture · reading · lesson" />
        <Stat label="Quizzes" value={`${COURSE_WEEKS.length * 8}`} sub="8 questions per week" />
        <Stat
          label="Final exam"
          value={`${EXAM_QUESTION_COUNT}`}
          sub={`pass at ${EXAM_PASS_PERCENT}% for the certificate`}
        />
      </div>

      {/* Course sub-pages */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Link
          href="/course/begin"
          className="rounded-2xl border border-flame-300 bg-flame-50/40 p-4 hover:border-flame-500 hover:bg-flame-50/60 transition-colors"
        >
          <div className="text-[10px] uppercase tracking-widest text-flame-700">Start here</div>
          <div className="font-serif text-ink-900 mt-1">Begin</div>
          <div className="text-xs text-ink-600 mt-0.5">A letter + a commitment</div>
        </Link>
        <Link
          href="/course/memory"
          className="rounded-2xl border border-ink-200 bg-card p-4 hover:border-flame-500 transition-colors"
        >
          <div className="text-[10px] uppercase tracking-widest text-flame-700">12 verses</div>
          <div className="font-serif text-ink-900 mt-1">Memory verses</div>
          <div className="text-xs text-ink-600 mt-0.5">All twelve, one per week</div>
        </Link>
        <Link
          href="/course/lead"
          className="rounded-2xl border border-ink-200 bg-card p-4 hover:border-flame-500 transition-colors"
        >
          <div className="text-[10px] uppercase tracking-widest text-flame-700">Pastors / leaders</div>
          <div className="font-serif text-ink-900 mt-1">Lead a cohort</div>
          <div className="text-xs text-ink-600 mt-0.5">5–8 believers, twelve weeks</div>
        </Link>
        {course.passed ? (
          <Link
            href="/course/sent"
            className="rounded-2xl border border-emerald-300 bg-emerald-50/40 p-4 hover:border-emerald-500 transition-colors"
          >
            <div className="text-[10px] uppercase tracking-widest text-emerald-700">Sent</div>
            <div className="font-serif text-ink-900 mt-1">What's next</div>
            <div className="text-xs text-ink-600 mt-0.5">Concrete next steps after the cert</div>
          </Link>
        ) : (
          <Link
            href="/course/exam"
            className={[
              "rounded-2xl border p-4 transition-colors",
              allDone
                ? "border-flame-500 bg-flame-50/60 hover:bg-flame-50"
                : "border-ink-200 bg-card-subtle opacity-75",
            ].join(" ")}
          >
            <div className="text-[10px] uppercase tracking-widest text-flame-700">Final</div>
            <div className="font-serif text-ink-900 mt-1">The exam</div>
            <div className="text-xs text-ink-600 mt-0.5">
              {allDone ? "Ready when you are" : "Unlocks after all 12 weeks"}
            </div>
          </Link>
        )}
      </div>

      {/* Twelve weeks */}
      <ol className="relative space-y-3">
        <span
          aria-hidden
          className="hidden md:block absolute left-7 top-2 bottom-2 w-px bg-gradient-to-b from-flame-300 via-flame-500/40 to-ink-200"
        />
        {COURSE_WEEKS.map((w, i) => {
          const isDone = done.has(w.week);
          const isCurrent = !isDone && next?.week === w.week;
          const glyph = WEEK_GLYPHS[i % WEEK_GLYPHS.length];
          const score = course.quizScores?.[w.week];
          return (
            <li key={w.week}>
              <Link
                href={`/course/week/${w.week}`}
                className={[
                  "group relative grid grid-cols-[auto_1fr] gap-4 md:gap-6 rounded-3xl border p-5 md:p-6 transition-all overflow-hidden",
                  isDone
                    ? "border-emerald-500/40 bg-emerald-50/40 hover:border-emerald-500"
                    : isCurrent
                    ? "border-flame-500 bg-card shadow-[0_18px_50px_-20px_rgba(249,115,22,0.32)]"
                    : "border-ink-200 bg-card hover:-translate-y-0.5 hover:border-flame-500/60 hover:shadow-[0_18px_50px_-20px_rgba(249,115,22,0.28)]",
                ].join(" ")}
              >
                <div className="relative flex flex-col items-center gap-1.5 z-10">
                  <div
                    className={[
                      "w-14 h-14 md:w-16 md:h-16 rounded-2xl border flex items-center justify-center font-serif text-xl md:text-2xl tracking-tight transition-colors",
                      isDone
                        ? "border-emerald-500 bg-emerald-100 text-emerald-700"
                        : isCurrent
                        ? "border-flame-500 bg-gradient-to-br from-flame-50 to-flame-100 text-flame-700"
                        : "border-ink-200 bg-card-subtle text-ink-600",
                    ].join(" ")}
                  >
                    {isDone ? "✓" : `W${w.week}`}
                  </div>
                </div>
                <div className="relative min-w-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3
                      className={[
                        "font-serif text-xl md:text-2xl leading-tight",
                        isDone ? "text-emerald-800" : "text-ink-900",
                      ].join(" ")}
                    >
                      Week {w.week} · {w.title}
                      {isCurrent && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-2 py-0.5 text-[10px] uppercase tracking-widest align-middle">
                          Current
                        </span>
                      )}
                    </h3>
                    <span className="text-[10px] uppercase tracking-widest text-flame-700">
                      {w.scripture.ref}
                    </span>
                  </div>
                  <p className="mt-1 text-ink-700 italic text-sm md:text-base">{w.tagline}</p>
                  {isDone && (
                    <p className="mt-1 text-xs text-emerald-700">
                      Quiz score: {score ?? "—"}/5
                    </p>
                  )}
                </div>
                <Glyph
                  id={glyph}
                  size={56}
                  className={[
                    "absolute right-4 bottom-4 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3",
                    isDone
                      ? "text-emerald-700/30"
                      : isCurrent
                      ? "text-flame-700/40"
                      : "text-flame-700/15",
                  ].join(" ")}
                />
              </Link>
            </li>
          );
        })}
      </ol>

      {/* Final exam call-out */}
      <section
        className={[
          "rounded-3xl border p-6 md:p-7",
          allDone
            ? "border-flame-500 bg-flame-50/60"
            : "border-ink-200 bg-card-subtle",
        ].join(" ")}
      >
        <div className="flex items-start gap-4">
          <Glyph
            id="wreath"
            size={48}
            className={allDone ? "text-flame-700" : "text-flame-700/40"}
          />
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-widest text-flame-700">
              Final exam &amp; certificate
            </div>
            <h3 className="font-serif text-xl text-ink-900 mt-1">
              {allDone
                ? "You finished the weeks. The exam is ready."
                : "Unlocks when you complete all twelve weeks."}
            </h3>
            <p className="mt-1 text-sm text-ink-700 leading-relaxed">
              {EXAM_QUESTION_COUNT} questions across the course. Pass at {EXAM_PASS_PERCENT}% for a
              named Scripture Theory certificate. You can retake the exam as many times as you like.
            </p>
            {allDone && (
              <Link
                href="/course/exam"
                className="mt-4 inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-500"
              >
                Open the exam →
              </Link>
            )}
          </div>
        </div>
      </section>

      <p className="text-xs text-ink-500 italic text-center max-w-xl mx-auto">
        Doctrine is held ecumenically where Christians have legitimately differed for centuries
        (baptism mode, communion theology, charismata, church order). Where Scripture is clear —
        the gospel, the Trinity, the resurrection, Scripture's authority, salvation by grace
        through faith — so are we.
      </p>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-ink-200 bg-card p-4 md:p-5 text-center">
      <div className="text-[10px] uppercase tracking-widest text-flame-700">{label}</div>
      <div className="font-serif text-3xl md:text-4xl text-ink-900 mt-1">{value}</div>
      <div className="text-xs text-ink-500 mt-0.5">{sub}</div>
    </div>
  );
}
