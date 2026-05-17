"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useProfile, type CourseProgress } from "@/lib/profile";
import {
  buildFinalExamFor,
  EXAM_PASS_PERCENT,
  EXAM_QUESTION_COUNT,
  passed as passedFn,
  type ExamQuestion,
} from "@/data/course";
import { findCourse, type CourseId } from "@/data/courseTrack";

export default function TrackExamView({ courseId }: { courseId: CourseId }) {
  const course = findCourse(courseId);
  const { profile, update, mounted } = useProfile();
  const cp: CourseProgress = profile.courses?.[courseId] ?? {};

  const exam: ExamQuestion[] = useMemo(
    () => (course ? buildFinalExamFor(course.data) : []),
    [course]
  );
  const allWeeksDone = course
    ? (cp.weeksComplete ?? []).length === course.weeks
    : false;

  const [phase, setPhase] = useState<"intro" | "taking" | "results">("intro");
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(exam.length).fill(null)
  );
  const [submitted, setSubmitted] = useState<{ correct: number; passed: boolean } | null>(null);

  useEffect(() => {
    if (!mounted) return;
    if (cp.passed) setPhase("results");
  }, [mounted, cp.passed]);

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
    const bestScore = Math.max(cp.examScore ?? 0, correct);
    const nextCp: CourseProgress = {
      ...cp,
      examScore: bestScore,
      passed: cp.passed || pass,
    };
    if (pass && !cp.certifiedAt) nextCp.certifiedAt = new Date().toISOString();
    update({ courses: { ...(profile.courses ?? {}), [courseId]: nextCp } });
    setSubmitted({ correct, passed: pass });
    setPhase("results");
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!course) return null;
  if (!mounted) {
    return (
      <section className="mx-auto max-w-3xl px-5 pt-12 pb-24">
        <div className="rounded-3xl border border-ink-200 bg-card-subtle p-10 text-center text-ink-500">
          Loading…
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-24">
      <Link href={`/track/${course.slug}`} className="text-xs uppercase tracking-widest text-sky-700 hover:underline">
        ← {course.title}
      </Link>

      <h1 className="font-serif text-3xl md:text-4xl mt-4 text-ink-900 leading-tight">
        {course.title} · final exam
      </h1>
      <p className="mt-2 text-ink-600 italic">{exam.length} questions · pass at {EXAM_PASS_PERCENT}%.</p>

      <div className="mt-8">
        {!allWeeksDone && phase === "intro" ? (
          <div className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8">
            <div className="text-[10px] uppercase tracking-widest text-sky-700">Not yet</div>
            <h2 className="font-serif text-2xl text-ink-900 mt-1">Walk all {course.weeks} weeks first.</h2>
            <p className="mt-2 text-sm text-ink-700 leading-relaxed">
              The exam draws two questions from every week. Take each week, pass each weekly quiz, and the exam opens.
            </p>
            <Link href={`/track/${course.slug}`} className="mt-4 inline-flex items-center rounded-full bg-sky-600 text-ink-50 px-5 py-2 text-sm hover:bg-sky-500">
              Back to the course →
            </Link>
            <p className="mt-4 text-xs text-ink-500">
              You've completed {(cp.weeksComplete ?? []).length} of {course.weeks} weeks.
            </p>
          </div>
        ) : phase === "intro" ? (
          <div className="rounded-3xl bg-ink-900 text-ink-50 p-6 md:p-8 relative overflow-hidden">
            <span aria-hidden className="pointer-events-none absolute inset-0 opacity-90"
              style={{ background: "radial-gradient(70% 60% at 0% 0%, rgba(14,165,233,0.18), transparent 60%), radial-gradient(60% 40% at 100% 100%, rgba(184,66,12,0.16), transparent 60%)" }}
            />
            <div className="relative">
              <div className="text-[10px] uppercase tracking-[0.18em] text-sky-300">Ready when you are</div>
              <h2 className="font-serif text-3xl md:text-4xl mt-1 leading-tight">
                {exam.length} questions. Pass at {EXAM_PASS_PERCENT}%.
              </h2>
              <p className="mt-3 text-sm text-ink-300 max-w-xl leading-relaxed">
                Read each question carefully. There is no time limit. Retake as many times as you need.
              </p>
              {cp.examScore != null && (
                <p className="mt-3 text-xs text-sky-300">
                  Best score so far: {cp.examScore}/{exam.length}
                </p>
              )}
              <button onClick={start} className="mt-5 inline-flex items-center rounded-full bg-sky-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-sky-500">
                Begin the exam →
              </button>
            </div>
          </div>
        ) : phase === "taking" ? (
          <TakingPhase exam={exam} answers={answers} setAnswers={setAnswers} onSubmit={submit} backHref={`/track/${course.slug}`} />
        ) : (
          <ResultsPhase
            exam={exam}
            answers={answers}
            submitted={submitted}
            cp={cp}
            courseSlug={course.slug}
            courseTitle={course.title}
            onRetake={start}
          />
        )}
      </div>
    </section>
  );
}

function TakingPhase({
  exam,
  answers,
  setAnswers,
  onSubmit,
  backHref,
}: {
  exam: ExamQuestion[];
  answers: (number | null)[];
  setAnswers: (cb: (prev: (number | null)[]) => (number | null)[]) => void;
  onSubmit: () => void;
  backHref: string;
}) {
  const answered = answers.filter((a) => a !== null).length;
  return (
    <div className="space-y-6">
      <div className="sticky top-16 z-20 -mx-5 px-5 py-3 backdrop-blur bg-ink-50/85 border-y border-ink-200">
        <div className="flex items-baseline justify-between gap-3 text-sm">
          <span className="font-serif text-ink-900">Final exam</span>
          <span className="text-ink-500">{answered} of {exam.length} answered</span>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-ink-200 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-sky-500 to-sky-300 transition-all" style={{ width: `${(answered / exam.length) * 100}%` }} />
        </div>
      </div>
      <ol className="space-y-4">
        {exam.map((q, i) => (
          <li key={i} className="rounded-3xl border border-ink-200 bg-card p-6">
            <div className="flex items-baseline justify-between gap-2">
              <div className="text-[10px] uppercase tracking-widest text-sky-700">Question {i + 1} of {exam.length}</div>
              <div className="text-[10px] uppercase tracking-widest text-ink-400">Week {q.week}</div>
            </div>
            <p className="mt-1 font-serif text-lg text-ink-900">{q.q}</p>
            <ul className="mt-3 space-y-2">
              {q.options.map((opt, oi) => {
                const picked = answers[i] === oi;
                return (
                  <li key={oi}>
                    <button
                      onClick={() => setAnswers((prev) => prev.map((p, ix) => (ix === i ? oi : p)))}
                      className={["w-full text-left rounded-2xl border px-4 py-3 text-sm transition-colors",
                        picked ? "border-sky-500 bg-sky-50/60 text-ink-900" : "border-ink-200 bg-card hover:border-sky-500/60 text-ink-700"].join(" ")}
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
        <button onClick={onSubmit} disabled={answered < exam.length} className="inline-flex items-center rounded-full bg-sky-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-sky-500 disabled:opacity-50">
          Submit final exam
        </button>
        <Link href={backHref} className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2.5 text-sm text-ink-700 hover:border-ink-900">
          Save & exit
        </Link>
      </div>
    </div>
  );
}

function ResultsPhase({
  exam, answers, submitted, cp, courseSlug, courseTitle, onRetake,
}: {
  exam: ExamQuestion[];
  answers: (number | null)[];
  submitted: { correct: number; passed: boolean } | null;
  cp: CourseProgress;
  courseSlug: string;
  courseTitle: string;
  onRetake: () => void;
}) {
  const lastCorrect = submitted?.correct ?? cp.examScore ?? 0;
  const everPassed = cp.passed || submitted?.passed;
  const pct = Math.round((lastCorrect / exam.length) * 100);
  return (
    <div className="space-y-5">
      <section className={["rounded-3xl p-8 md:p-10 relative overflow-hidden", everPassed ? "bg-emerald-900 text-emerald-50" : "bg-ink-900 text-ink-50"].join(" ")}>
        <span aria-hidden className="pointer-events-none absolute inset-0 opacity-90"
          style={{ background: everPassed
            ? "radial-gradient(70% 60% at 0% 0%, rgba(16,185,129,0.25), transparent 60%)"
            : "radial-gradient(70% 60% at 0% 0%, rgba(14,165,233,0.18), transparent 60%)" }}
        />
        <div className="relative">
          <div className="text-[10px] uppercase tracking-[0.18em]">{everPassed ? "Certified" : "Not yet — keep going"}</div>
          <h2 className="font-serif text-3xl md:text-4xl mt-1 leading-tight">{lastCorrect}/{exam.length} · {pct}%</h2>
          <p className="mt-2 text-sm opacity-80 max-w-xl leading-relaxed">
            {everPassed
              ? `You passed the ${courseTitle} exam at the ${EXAM_PASS_PERCENT}% threshold. Your certificate is ready.`
              : `Pass requires ${EXAM_PASS_PERCENT}% (≥ ${Math.ceil((EXAM_PASS_PERCENT / 100) * exam.length)} of ${exam.length}). Review and retake.`}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {everPassed && (
              <Link href={`/track/${courseSlug}/certificate`} className="inline-flex items-center rounded-full bg-sky-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-sky-500">
                Open your certificate →
              </Link>
            )}
            <button onClick={onRetake} className="inline-flex items-center rounded-full border border-current/40 px-5 py-2.5 text-sm hover:border-current">
              {everPassed ? "Take it again" : "Retake the exam"}
            </button>
            <Link href={`/track/${courseSlug}`} className="inline-flex items-center rounded-full border border-current/40 px-5 py-2.5 text-sm hover:border-current">
              Course
            </Link>
          </div>
        </div>
      </section>
      {submitted && (
        <ol className="space-y-3">
          {exam.map((q, i) => {
            const picked = answers[i];
            const correct = picked === q.correctIndex;
            return (
              <li key={i} className={["rounded-2xl border p-4 text-sm", correct ? "border-emerald-300 bg-emerald-50/40 text-emerald-900" : "border-red-300 bg-red-50/40 text-red-900"].join(" ")}>
                <div className="font-serif text-base text-ink-900">W{q.week} · {q.q}</div>
                <div className="mt-1"><strong>You:</strong> {picked !== null ? q.options[picked] : "—"} {correct ? "✓" : "✕"}</div>
                {!correct && <div className="mt-1"><strong>Correct:</strong> {q.options[q.correctIndex]}</div>}
                <p className="mt-2 italic text-ink-700">{q.why}</p>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
