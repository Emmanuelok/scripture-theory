"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useProfile } from "@/lib/profile";
import { COURSE_WEEKS, type CourseWeek } from "@/data/course";
import { referenceHref } from "@/lib/reference";
import { PageHero, Tile } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";

export default function CourseWeekView({ week }: { week: CourseWeek }) {
  const { profile, update, mounted } = useProfile();
  const course = profile.course ?? {};
  const previouslyDone = (course.weeksComplete ?? []).includes(week.week);
  const previousBest = course.quizScores?.[week.week] ?? 0;

  // Quiz state
  const [phase, setPhase] = useState<"read" | "quiz" | "results">(
    previouslyDone ? "results" : "read"
  );
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(week.quiz.length).fill(null)
  );
  const [submittedScore, setSubmittedScore] = useState<number>(previousBest);

  useEffect(() => {
    if (!mounted) return;
    setPhase(previouslyDone ? "results" : "read");
    setAnswers(Array(week.quiz.length).fill(null));
    setSubmittedScore(previousBest);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [week.week, mounted]);

  const score = useMemo(() => {
    return answers.reduce((acc: number, a, i) => acc + (a === week.quiz[i].correctIndex ? 1 : 0), 0);
  }, [answers, week.quiz]);

  const passed = submittedScore >= 4;
  const allAnswered = answers.every((a) => a !== null);

  function submitQuiz() {
    const correct = score;
    const best = Math.max(previousBest, correct);
    const isPass = correct >= 4;

    const nextCourse = { ...course };
    nextCourse.quizScores = { ...(course.quizScores ?? {}), [week.week]: best };
    if (isPass) {
      const setComplete = new Set(course.weeksComplete ?? []);
      setComplete.add(week.week);
      nextCourse.weeksComplete = Array.from(setComplete).sort((a, b) => a - b);
      nextCourse.weekCompletedAt = {
        ...(course.weekCompletedAt ?? {}),
        [week.week]: course.weekCompletedAt?.[week.week] ?? new Date().toISOString(),
      };
    }
    update({ course: nextCourse });
    setSubmittedScore(best);
    setPhase("results");
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function retake() {
    setAnswers(Array(week.quiz.length).fill(null));
    setPhase("quiz");
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const prev = COURSE_WEEKS.find((w) => w.week === week.week - 1);
  const next = COURSE_WEEKS.find((w) => w.week === week.week + 1);

  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-24">
      <Link
        href="/course"
        className="text-xs uppercase tracking-widest text-flame-700 hover:underline"
      >
        ← Course
      </Link>

      <PageHero
        eyebrow={`Week ${week.week} of 12 · Foundations of the Faith`}
        title={week.title}
        intro={week.tagline}
      />

      {phase !== "quiz" && (
        <>
          {/* Anchor scripture */}
          <article className="mt-10 relative overflow-hidden rounded-3xl bg-ink-900 text-ink-50 p-8 md:p-10">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-90"
              style={{
                background:
                  "radial-gradient(70% 60% at 0% 0%, rgba(249,115,22,0.18), transparent 60%), radial-gradient(60% 40% at 100% 100%, rgba(184,66,12,0.16), transparent 60%)",
              }}
            />
            <div className="relative">
              <div className="text-[10px] uppercase tracking-[0.22em] text-flame-300">
                Anchor · {week.scripture.ref}
              </div>
              <blockquote className="mt-3 font-serif text-xl md:text-2xl leading-snug italic">
                "{week.scripture.text}"
              </blockquote>
            </div>
          </article>

          {/* Lesson */}
          <div className="mt-10 prose-scripture text-ink-800 text-lg leading-relaxed">
            {week.lesson.map((p, i) => (
              <p key={i} className="mb-4">
                {p}
              </p>
            ))}
          </div>

          {/* Reading this week */}
          <section className="mt-10 rounded-3xl border border-ink-200 bg-card p-6">
            <div className="text-[10px] uppercase tracking-widest text-flame-700">
              Reading this week
            </div>
            <ul className="mt-3 flex flex-wrap gap-2">
              {week.reading.map((r) => {
                const href = referenceHref(r);
                return href ? (
                  <Link
                    key={r}
                    href={href}
                    className="rounded-full bg-card-subtle border border-ink-200 px-3 py-1 text-sm text-ink-800 hover:border-flame-500 hover:text-flame-700"
                  >
                    {r}
                  </Link>
                ) : (
                  <span
                    key={r}
                    className="rounded-full bg-card-subtle border border-ink-200 px-3 py-1 text-sm text-ink-700"
                  >
                    {r}
                  </span>
                );
              })}
            </ul>
          </section>

          {/* Reflection */}
          <section className="mt-8 rounded-3xl border border-ink-200 bg-card p-6">
            <div className="text-[10px] uppercase tracking-widest text-flame-700">
              Reflect
            </div>
            <ol className="mt-3 list-decimal pl-5 space-y-2 text-ink-800 leading-relaxed">
              {week.reflection.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ol>
          </section>

          {/* Practice */}
          <section className="mt-8 rounded-3xl border border-flame-300 bg-flame-50/60 p-6">
            <div className="text-[10px] uppercase tracking-widest text-flame-700">
              Practice this week
            </div>
            <p className="mt-2 font-serif text-lg text-ink-900 italic">{week.practice}</p>
          </section>

          {/* Results / Take quiz CTA */}
          {phase === "results" && previouslyDone ? (
            <section className="mt-8 rounded-3xl border border-emerald-300 bg-emerald-50/60 p-6">
              <div className="flex items-start gap-3">
                <Glyph id="wreath" size={36} className="text-emerald-700" />
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-emerald-700">
                    Week complete
                  </div>
                  <h3 className="font-serif text-xl text-ink-900 mt-0.5">
                    Best quiz score: {submittedScore}/5
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={retake}
                      className="text-xs rounded-full border border-ink-300 px-3 py-1 text-ink-700 hover:border-ink-900"
                    >
                      Retake the quiz
                    </button>
                    {next && (
                      <Link
                        href={`/course/week/${next.week}`}
                        className="text-xs rounded-full bg-flame-600 text-ink-50 px-3 py-1 hover:bg-flame-500"
                      >
                        Next: Week {next.week} →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <div className="mt-10 flex flex-wrap gap-2">
              <button
                onClick={() => setPhase("quiz")}
                className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-500"
              >
                Take the Week {week.week} quiz →
              </button>
              <p className="text-xs text-ink-500 italic self-center">
                5 questions · pass at 4 of 5 to lock the week.
              </p>
            </div>
          )}
        </>
      )}

      {phase === "quiz" && (
        <div className="mt-10 space-y-6">
          <div className="rounded-3xl border border-ink-200 bg-card p-6 md:p-7">
            <div className="text-[10px] uppercase tracking-widest text-flame-700">
              Week {week.week} quiz
            </div>
            <h2 className="font-serif text-2xl text-ink-900 mt-1">
              Five questions on what you read.
            </h2>
            <p className="mt-1 text-sm text-ink-600">Pick the best answer. Pass at 4 of 5.</p>
          </div>

          <ol className="space-y-4">
            {week.quiz.map((q, i) => (
              <li
                key={i}
                className="rounded-3xl border border-ink-200 bg-card p-6"
              >
                <div className="text-[10px] uppercase tracking-widest text-flame-700">
                  Question {i + 1} of {week.quiz.length}
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
              onClick={submitQuiz}
              disabled={!allAnswered}
              className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-500 disabled:opacity-50"
            >
              Submit answers
            </button>
            <button
              onClick={() => setPhase("read")}
              className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2.5 text-sm text-ink-700 hover:border-ink-900"
            >
              Back to the lesson
            </button>
          </div>
        </div>
      )}

      {phase === "results" && !previouslyDone && (
        <section
          className={[
            "mt-8 rounded-3xl border p-6 md:p-7",
            passed ? "border-emerald-500 bg-emerald-50/60" : "border-flame-300 bg-flame-50/60",
          ].join(" ")}
        >
          <h3 className="font-serif text-2xl text-ink-900">
            {passed ? `Week ${week.week} locked — ${submittedScore}/5` : `${submittedScore}/5 — almost there`}
          </h3>
          <p className="mt-1 text-sm text-ink-700">
            {passed
              ? "Good walk. Review the answers below, then take the next week."
              : "You need 4 of 5 to mark the week complete. Read the lesson again, then retake."}
          </p>
          <ul className="mt-5 space-y-3">
            {week.quiz.map((q, i) => {
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
                  <div className="font-serif text-base text-ink-900">{q.q}</div>
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
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            {!passed && (
              <button
                onClick={retake}
                className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-4 py-2 text-sm hover:bg-flame-500"
              >
                Retake the quiz
              </button>
            )}
            {passed && next && (
              <Link
                href={`/course/week/${next.week}`}
                className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-4 py-2 text-sm hover:bg-flame-500"
              >
                Next: Week {next.week} →
              </Link>
            )}
            {passed && !next && (
              <Link
                href="/course/exam"
                className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-4 py-2 text-sm hover:bg-flame-500"
              >
                Take the final exam →
              </Link>
            )}
            <Link
              href="/course"
              className="inline-flex items-center rounded-full border border-ink-300 px-4 py-2 text-sm text-ink-700 hover:border-ink-900"
            >
              Back to course
            </Link>
          </div>
        </section>
      )}

      {/* Prev / Next nav */}
      {phase !== "quiz" && (
        <nav className="mt-12 flex flex-wrap items-stretch justify-between gap-3">
          {prev ? (
            <Link
              href={`/course/week/${prev.week}`}
              className="flex-1 min-w-[200px] rounded-2xl border border-ink-200 bg-card p-4 hover:border-flame-500/60"
            >
              <div className="text-[10px] uppercase tracking-widest text-ink-500">Previous</div>
              <div className="font-serif text-ink-900 mt-0.5">← Week {prev.week} · {prev.title}</div>
            </Link>
          ) : (
            <Link
              href="/course"
              className="flex-1 min-w-[200px] rounded-2xl border border-ink-200 bg-card p-4 hover:border-flame-500/60"
            >
              <div className="text-[10px] uppercase tracking-widest text-ink-500">Course</div>
              <div className="font-serif text-ink-900 mt-0.5">← All twelve weeks</div>
            </Link>
          )}
          {next ? (
            <Link
              href={`/course/week/${next.week}`}
              className="flex-1 min-w-[200px] rounded-2xl border border-ink-200 bg-card p-4 hover:border-flame-500/60 text-right"
            >
              <div className="text-[10px] uppercase tracking-widest text-ink-500">Next</div>
              <div className="font-serif text-ink-900 mt-0.5">Week {next.week} · {next.title} →</div>
            </Link>
          ) : (
            <Link
              href="/course/exam"
              className="flex-1 min-w-[200px] rounded-2xl border border-flame-300 bg-flame-50/60 p-4 hover:border-flame-500 text-right"
            >
              <div className="text-[10px] uppercase tracking-widest text-flame-700">Final</div>
              <div className="font-serif text-ink-900 mt-0.5">The final exam →</div>
            </Link>
          )}
        </nav>
      )}
    </section>
  );
}
