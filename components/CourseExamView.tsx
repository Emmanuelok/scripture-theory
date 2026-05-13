"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useProfile } from "@/lib/profile";
import {
  buildFinalExam,
  COURSE_WEEKS,
  EXAM_PASS_PERCENT,
  EXAM_QUESTION_COUNT,
  passed as passedFn,
  type ExamQuestion,
} from "@/data/course";

export default function CourseExamView() {
  const { profile, update, mounted } = useProfile();
  const course = profile.course ?? {};

  const allWeeksDone =
    (course.weeksComplete ?? []).length === COURSE_WEEKS.length;

  const exam: ExamQuestion[] = useMemo(() => buildFinalExam(), []);
  const [phase, setPhase] = useState<"intro" | "taking" | "results">("intro");
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(exam.length).fill(null)
  );
  const [submitted, setSubmitted] = useState<{ correct: number; passed: boolean } | null>(
    null
  );

  useEffect(() => {
    if (!mounted) return;
    if (course.passed) setPhase("results");
  }, [mounted, course.passed]);

  function start() {
    setAnswers(Array(exam.length).fill(null));
    setPhase("taking");
  }

  function submit() {
    const correct = answers.reduce(
      (acc: number, a, i) => acc + (a === exam[i].correctIndex ? 1 : 0),
      0
    );
    const pass = passedFn(correct, exam.length);
    const bestScore = Math.max(course.examScore ?? 0, correct);
    update({
      course: {
        ...course,
        examScore: bestScore,
        passed: course.passed || pass,
      },
    });
    setSubmitted({ correct, passed: pass });
    setPhase("results");
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!mounted) {
    return (
      <div className="rounded-3xl border border-ink-200 bg-card-subtle p-10 text-center text-ink-500">
        Loading…
      </div>
    );
  }

  if (!allWeeksDone && phase === "intro") {
    return (
      <div className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8">
        <div className="text-[10px] uppercase tracking-widest text-flame-700">Not yet</div>
        <h2 className="font-serif text-2xl text-ink-900 mt-1">
          Walk all twelve weeks first.
        </h2>
        <p className="mt-2 text-sm text-ink-700 leading-relaxed">
          The exam draws two questions from every week. Take each week, pass each weekly quiz, and
          the exam opens.
        </p>
        <Link
          href="/course"
          className="mt-4 inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-500"
        >
          Back to the course →
        </Link>
        <p className="mt-4 text-xs text-ink-500">
          You've completed {(course.weeksComplete ?? []).length} of {COURSE_WEEKS.length} weeks.
        </p>
      </div>
    );
  }

  if (phase === "intro") {
    return (
      <div className="space-y-5">
        <div className="rounded-3xl bg-ink-900 text-ink-50 p-6 md:p-8 relative overflow-hidden">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-90"
            style={{
              background:
                "radial-gradient(70% 60% at 0% 0%, rgba(249,115,22,0.18), transparent 60%), radial-gradient(60% 40% at 100% 100%, rgba(184,66,12,0.16), transparent 60%)",
            }}
          />
          <div className="relative">
            <div className="text-[10px] uppercase tracking-[0.18em] text-flame-300">
              Ready when you are
            </div>
            <h2 className="font-serif text-3xl md:text-4xl mt-1 leading-tight">
              {EXAM_QUESTION_COUNT} questions. Pass at {EXAM_PASS_PERCENT}%.
            </h2>
            <p className="mt-3 text-sm text-ink-300 max-w-xl leading-relaxed">
              Read each question carefully. There is no time limit. You can retake the exam as
              many times as you need. The certificate is the same on the first attempt as on the
              tenth.
            </p>
            {course.examScore != null && (
              <p className="mt-3 text-xs text-flame-300">
                Best score so far: {course.examScore}/{EXAM_QUESTION_COUNT}
              </p>
            )}
            <button
              onClick={start}
              className="mt-5 inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-500"
            >
              Begin the exam →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "taking") {
    const answered = answers.filter((a) => a !== null).length;
    return (
      <div className="space-y-6">
        <div className="sticky top-16 z-20 -mx-5 px-5 py-3 backdrop-blur bg-ink-50/85 border-y border-ink-200">
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="font-serif text-ink-900">Final exam</span>
            <span className="text-ink-500">
              {answered} of {exam.length} answered
            </span>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-ink-200 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-flame-500 to-flame-300 transition-all"
              style={{ width: `${(answered / exam.length) * 100}%` }}
            />
          </div>
        </div>

        <ol className="space-y-4">
          {exam.map((q, i) => (
            <li key={i} className="rounded-3xl border border-ink-200 bg-card p-6">
              <div className="flex items-baseline justify-between gap-2">
                <div className="text-[10px] uppercase tracking-widest text-flame-700">
                  Question {i + 1} of {exam.length}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-ink-400">
                  Week {q.week}
                </div>
              </div>
              <p className="mt-1 font-serif text-lg text-ink-900">{q.q}</p>
              <ul className="mt-3 space-y-2">
                {q.options.map((opt, oi) => {
                  const picked = answers[i] === oi;
                  return (
                    <li key={oi}>
                      <button
                        onClick={() =>
                          setAnswers((prev) =>
                            prev.map((p, ix) => (ix === i ? oi : p))
                          )
                        }
                        aria-pressed={picked}
                        className={[
                          "w-full text-left rounded-2xl border px-4 py-3 text-sm transition-colors",
                          picked
                            ? "border-flame-500 bg-flame-50/60 text-ink-900"
                            : "border-ink-200 bg-card hover:border-flame-500/60 text-ink-700",
                        ].join(" ")}
                      >
                        {opt}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ol>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={submit}
            disabled={answered < exam.length}
            className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-500 disabled:opacity-50"
          >
            Submit final exam
          </button>
          <Link
            href="/course"
            className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2.5 text-sm text-ink-700 hover:border-ink-900"
          >
            Save & exit
          </Link>
        </div>
      </div>
    );
  }

  // results phase
  const lastCorrect = submitted?.correct ?? course.examScore ?? 0;
  const everPassed = course.passed || submitted?.passed;
  const pct = Math.round((lastCorrect / exam.length) * 100);

  return (
    <div className="space-y-5">
      <section
        className={[
          "rounded-3xl p-8 md:p-10 relative overflow-hidden",
          everPassed
            ? "bg-emerald-900 text-emerald-50"
            : "bg-ink-900 text-ink-50",
        ].join(" ")}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background: everPassed
              ? "radial-gradient(70% 60% at 0% 0%, rgba(16,185,129,0.25), transparent 60%)"
              : "radial-gradient(70% 60% at 0% 0%, rgba(249,115,22,0.18), transparent 60%)",
          }}
        />
        <div className="relative">
          <div className="text-[10px] uppercase tracking-[0.18em]">
            {everPassed ? "Certified" : "Not yet — keep going"}
          </div>
          <h2 className="font-serif text-3xl md:text-4xl mt-1 leading-tight">
            {lastCorrect}/{exam.length} · {pct}%
          </h2>
          <p className="mt-2 text-sm opacity-80 max-w-xl leading-relaxed">
            {everPassed
              ? `You passed the Foundations of the Faith exam at the ${EXAM_PASS_PERCENT}% threshold. Your certificate is ready.`
              : `Pass requires ${EXAM_PASS_PERCENT}% (≥ ${Math.ceil((EXAM_PASS_PERCENT / 100) * exam.length)} of ${exam.length}). Review the questions you missed, then retake.`}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {everPassed && (
              <Link
                href="/course/certificate"
                className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-500"
              >
                Open your certificate →
              </Link>
            )}
            <button
              onClick={start}
              className="inline-flex items-center rounded-full border border-current/40 px-5 py-2.5 text-sm hover:border-current"
            >
              {everPassed ? "Take it again" : "Retake the exam"}
            </button>
            <Link
              href="/course"
              className="inline-flex items-center rounded-full border border-current/40 px-5 py-2.5 text-sm hover:border-current"
            >
              Course
            </Link>
          </div>
        </div>
      </section>

      {/* Question review (only when this attempt was just submitted) */}
      {submitted && (
        <ol className="space-y-3">
          {exam.map((q, i) => {
            const picked = answers[i];
            const correct = picked === q.correctIndex;
            return (
              <li
                key={i}
                className={[
                  "rounded-2xl border p-4 text-sm",
                  correct
                    ? "border-emerald-300 bg-emerald-50/40 text-emerald-900"
                    : "border-red-300 bg-red-50/40 text-red-900",
                ].join(" ")}
              >
                <div className="font-serif text-base text-ink-900">
                  W{q.week} · {q.q}
                </div>
                <div className="mt-1">
                  <strong>You:</strong>{" "}
                  {picked !== null ? q.options[picked] : "—"}{" "}
                  {correct ? "✓" : "✕"}
                </div>
                {!correct && (
                  <div className="mt-1">
                    <strong>Correct:</strong> {q.options[q.correctIndex]}
                  </div>
                )}
                <p className="mt-2 italic text-ink-700">{q.why}</p>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
