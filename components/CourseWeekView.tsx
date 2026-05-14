"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useProfile } from "@/lib/profile";
import { COURSE_WEEKS, WEEKLY_QUIZ_PASS, type CourseWeek } from "@/data/course";
import { referenceHref } from "@/lib/reference";
import { PageHero, Tile } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";

type Phase = "read" | "quiz" | "results";

const DAY_GLYPHS = ["open-book", "examen", "hands", "rule", "door", "scroll", "sabbath"] as const;

export default function CourseWeekView({ week }: { week: CourseWeek }) {
  const { profile, update, mounted } = useProfile();
  const course = profile.course ?? {};
  const previouslyDone = (course.weeksComplete ?? []).includes(week.week);
  const previousBest = course.quizScores?.[week.week] ?? 0;

  const [phase, setPhase] = useState<Phase>(previouslyDone ? "results" : "read");
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(week.quiz.length).fill(null)
  );
  const [submittedScore, setSubmittedScore] = useState<number>(previousBest);

  // Per-day completion (persisted in profile)
  const daysDone = useMemo(
    () => new Set(course.daysComplete?.[week.week] ?? []),
    [course.daysComplete, week.week]
  );

  useEffect(() => {
    if (!mounted) return;
    setPhase(previouslyDone ? "results" : "read");
    // Restore any saved draft for this week
    const draft = course.quizDrafts?.[week.week];
    if (draft && draft.length === week.quiz.length) {
      setAnswers([...draft]);
    } else {
      setAnswers(Array(week.quiz.length).fill(null));
    }
    setSubmittedScore(previousBest);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [week.week, mounted]);

  // Save quiz draft whenever the answers array changes while taking the quiz
  useEffect(() => {
    if (!mounted) return;
    if (phase !== "quiz") return;
    // Only persist if any answer is set, to avoid empty noise
    const hasAny = answers.some((a) => a !== null);
    if (!hasAny) return;
    const nextDrafts = { ...(course.quizDrafts ?? {}), [week.week]: [...answers] };
    update({ course: { ...course, quizDrafts: nextDrafts } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, phase]);

  function toggleDay(day: number) {
    const set = new Set(course.daysComplete?.[week.week] ?? []);
    if (set.has(day)) set.delete(day);
    else set.add(day);
    const sorted = Array.from(set).sort((a, b) => a - b);
    const next = { ...(course.daysComplete ?? {}), [week.week]: sorted };
    update({ course: { ...course, daysComplete: next } });
  }

  const score = useMemo(
    () => answers.reduce((acc: number, a, i) => acc + (a === week.quiz[i].correctIndex ? 1 : 0), 0),
    [answers, week.quiz]
  );

  const passed = submittedScore >= WEEKLY_QUIZ_PASS;
  const allAnswered = answers.every((a) => a !== null);

  function submitQuiz() {
    const correct = score;
    const best = Math.max(previousBest, correct);
    const isPass = correct >= WEEKLY_QUIZ_PASS;

    const nextCourse = { ...course };
    nextCourse.quizScores = { ...(course.quizScores ?? {}), [week.week]: best };
    // Clear the draft now that the quiz has been submitted
    const draftsClean = { ...(course.quizDrafts ?? {}) };
    delete draftsClean[week.week];
    nextCourse.quizDrafts = draftsClean;

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
        ← Foundations
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

          {/* Memory verse */}
          <section className="mt-8 rounded-3xl border border-flame-300 bg-flame-50/50 p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-flame-700">
                  Memory verse · hide it in your heart this week
                </div>
                <h2 className="font-serif text-xl text-ink-900 mt-1">{week.memoryVerse.ref}</h2>
              </div>
              <Link
                href={`/memory?ref=${encodeURIComponent(week.memoryVerse.ref)}&text=${encodeURIComponent(week.memoryVerse.text)}`}
                className="text-xs text-flame-700 hover:underline"
              >
                Practice in the memory trainer →
              </Link>
            </div>
            <blockquote className="mt-3 prose-scripture text-ink-800 italic leading-relaxed">
              "{week.memoryVerse.text}"
            </blockquote>
          </section>

          {/* Daily structure */}
          <section className="mt-10">
            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
              <div>
                <h2 className="font-serif text-2xl text-ink-900">Seven days, seven steps</h2>
                <p className="text-sm text-ink-500 italic">
                  Read · meditate · pray · apply · journal · review · rest
                </p>
              </div>
              <span className="text-xs text-flame-700 font-medium">
                {daysDone.size} of 7 days
              </span>
            </div>
            <ol className="space-y-3">
              {week.days.map((d, i) => {
                const href = referenceHref(d.passage);
                const glyph = DAY_GLYPHS[i % DAY_GLYPHS.length];
                const done = daysDone.has(d.day);
                return (
                  <li
                    key={d.day}
                    className={[
                      "relative overflow-hidden rounded-3xl border p-5 transition-colors",
                      done
                        ? "border-emerald-500/40 bg-emerald-50/30"
                        : "border-ink-200 bg-card",
                    ].join(" ")}
                  >
                    <span
                      aria-hidden
                      className="absolute right-4 top-4 text-flame-700/15"
                    >
                      <Glyph id={glyph} size={36} />
                    </span>
                    <div className="relative">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <button
                          onClick={() => toggleDay(d.day)}
                          aria-pressed={done}
                          title={done ? "Mark not done" : "Mark this day done"}
                          className={[
                            "shrink-0 h-9 w-9 rounded-xl border flex items-center justify-center font-serif text-base transition-colors",
                            done
                              ? "border-emerald-500 bg-emerald-100 text-emerald-700"
                              : "border-ink-300 bg-card-subtle text-ink-500 hover:border-flame-500",
                          ].join(" ")}
                        >
                          {done ? "✓" : String(d.day).padStart(2, "0")}
                        </button>
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-flame-700">
                            Day {d.day} · {d.label}
                          </div>
                          <h3 className="font-serif text-lg text-ink-900">{d.title}</h3>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-ink-500">
                        Passage:{" "}
                        {href ? (
                          <Link
                            href={href}
                            className="text-flame-700 hover:underline"
                          >
                            {d.passage}
                          </Link>
                        ) : (
                          <span>{d.passage}</span>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-ink-700 leading-relaxed">
                        {d.meditation}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          {/* Long-form lesson */}
          <section className="mt-10">
            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
              <h2 className="font-serif text-2xl text-ink-900">The teaching</h2>
              <p className="text-sm text-ink-500 italic">A long read. Take it slowly.</p>
            </div>
            <div className="prose-scripture text-ink-800 text-lg leading-relaxed">
              {week.lesson.map((p, i) => (
                <p key={i} className="mb-4">
                  {p}
                </p>
              ))}
            </div>
          </section>

          {/* Witnesses */}
          <section className="mt-10">
            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
              <h2 className="font-serif text-2xl text-ink-900">Voices across the centuries</h2>
              <p className="text-sm text-ink-500 italic">
                The Church has been thinking this through for a long time.
              </p>
            </div>
            <ul className="grid sm:grid-cols-2 gap-3">
              {week.witnesses.map((w) => (
                <li
                  key={w.who}
                  className="rounded-2xl border border-ink-200 bg-card-subtle p-5"
                >
                  <div className="text-[10px] uppercase tracking-widest text-flame-700">
                    {w.who} · {w.when}
                  </div>
                  {w.source && (
                    <div className="text-[10px] text-ink-500 italic mt-0.5">
                      {w.sourceUrl ? (
                        <a
                          href={w.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-flame-700 hover:underline"
                        >
                          {w.source} ↗
                        </a>
                      ) : (
                        w.source
                      )}
                    </div>
                  )}
                  <blockquote className="mt-3 italic text-ink-800 text-sm leading-relaxed border-l-2 border-flame-500/70 pl-3">
                    "{w.quote}"
                  </blockquote>
                </li>
              ))}
            </ul>
          </section>

          {/* Multi-tradition voices (only on contested weeks) */}
          {week.traditions && week.traditions.length > 0 && (
            <section className="mt-10">
              <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
                <h2 className="font-serif text-2xl text-ink-900">
                  How the Body has spoken
                </h2>
                <p className="text-sm text-ink-500 italic max-w-xs">
                  Where Christians have legitimately differed for centuries — held side by side, honored, not arbitrated.
                </p>
              </div>
              <ul className="grid sm:grid-cols-2 gap-3">
                {week.traditions.map((t) => (
                  <li
                    key={t.tradition}
                    className="rounded-2xl border border-ink-200 bg-card p-5"
                  >
                    <div className="text-[10px] uppercase tracking-widest text-flame-700">
                      {t.tradition}
                    </div>
                    <p className="mt-2 text-sm text-ink-800 leading-relaxed">{t.voice}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Crosswalk to historic catechisms */}
          {week.crosswalk && week.crosswalk.length > 0 && (
            <section className="mt-10 rounded-3xl border border-ink-200 bg-card-subtle p-6">
              <div className="text-[10px] uppercase tracking-widest text-flame-700">
                Historic crosswalk
              </div>
              <h3 className="font-serif text-xl text-ink-900 mt-1 mb-3">
                This theme in the Church's catechisms.
              </h3>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                {week.crosswalk.map((c, i) => (
                  <li
                    key={i}
                    className="rounded-xl bg-card border border-ink-200 px-3 py-2"
                  >
                    <span className="text-[10px] uppercase tracking-widest text-flame-700">
                      {c.catechism}
                    </span>
                    <div className="text-ink-800 mt-0.5">{c.refs}</div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Reflection */}
          <section className="mt-10 rounded-3xl border border-ink-200 bg-card p-6">
            <div className="text-[10px] uppercase tracking-widest text-flame-700">Reflect alone</div>
            <h3 className="font-serif text-xl text-ink-900 mt-1 mb-3">For you and the Spirit.</h3>
            <ol className="list-decimal pl-5 space-y-2 text-ink-800 leading-relaxed">
              {week.reflection.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ol>
          </section>

          {/* Discussion */}
          <section className="mt-6 rounded-3xl border border-ink-200 bg-card-subtle p-6">
            <div className="text-[10px] uppercase tracking-widest text-flame-700">Discuss with others</div>
            <h3 className="font-serif text-xl text-ink-900 mt-1 mb-3">
              For a small group, a friend, or a family table.
            </h3>
            <ol className="list-decimal pl-5 space-y-2 text-ink-800 leading-relaxed">
              {week.discussion.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ol>
          </section>

          {/* Facilitator notes — only for group leaders, shown collapsed by default */}
          {week.facilitatorNotes && week.facilitatorNotes.length > 0 && (
            <details className="mt-6 group rounded-3xl border border-flame-200 bg-flame-50/30 overflow-hidden">
              <summary className="cursor-pointer list-none flex items-center justify-between p-5 hover:bg-flame-50/60 transition-colors">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-flame-700">
                    For the group leader
                  </div>
                  <h3 className="font-serif text-lg text-ink-900 mt-0.5">
                    Facilitator notes
                  </h3>
                </div>
                <span className="text-flame-700 text-xl transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="px-5 pb-5">
                <ul className="space-y-2 text-sm text-ink-700 leading-relaxed">
                  {week.facilitatorNotes.map((n, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-flame-700 shrink-0">·</span>
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          )}

          {/* Practice */}
          <section className="mt-6 rounded-3xl border border-flame-300 bg-flame-50/60 p-6">
            <div className="text-[10px] uppercase tracking-widest text-flame-700">
              Practice this week
            </div>
            <p className="mt-2 font-serif text-lg text-ink-900 italic">{week.practice}</p>
          </section>

          {/* Journal prompt */}
          <section className="mt-6 rounded-3xl border border-ink-200 bg-card p-6">
            <div className="flex items-start gap-3">
              <Glyph id="door" size={32} className="text-flame-700 shrink-0 mt-1" />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] uppercase tracking-widest text-flame-700">
                  Journal prompt · Week {week.week}
                </div>
                <p className="mt-1 font-serif text-ink-900 leading-snug">
                  {week.journalPrompt}
                </p>
                <Link
                  href={`/secret-place?prompt=${encodeURIComponent(week.journalPrompt)}&title=${encodeURIComponent(`Foundations · Week ${week.week}: ${week.title}`)}`}
                  className="mt-3 inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-4 py-1.5 text-sm hover:bg-flame-500"
                >
                  Open my Secret Place with this prompt →
                </Link>
              </div>
            </div>
          </section>

          {/* Results / Take quiz CTA */}
          {phase === "results" && previouslyDone ? (
            <section className="mt-10 rounded-3xl border border-emerald-300 bg-emerald-50/60 p-6">
              <div className="flex items-start gap-3">
                <Glyph id="wreath" size={36} className="text-emerald-700 shrink-0" />
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-emerald-700">
                    Week complete
                  </div>
                  <h3 className="font-serif text-xl text-ink-900 mt-0.5">
                    Best quiz score: {submittedScore}/{week.quiz.length}
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
                {week.quiz.length} questions · pass at {WEEKLY_QUIZ_PASS} of {week.quiz.length}.
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
              {week.quiz.length} questions on what you read.
            </h2>
            <p className="mt-1 text-sm text-ink-600">
              Pick the best answer. Pass at {WEEKLY_QUIZ_PASS} of {week.quiz.length} to lock the week.
            </p>
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
            {passed
              ? `Week ${week.week} locked — ${submittedScore}/${week.quiz.length}`
              : `${submittedScore}/${week.quiz.length} — almost there`}
          </h3>
          <p className="mt-1 text-sm text-ink-700">
            {passed
              ? "Good walk. Review the answers below, then take the next week."
              : `You need ${WEEKLY_QUIZ_PASS} of ${week.quiz.length} to mark the week complete. Read the lesson again, then retake.`}
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
              Back to Foundations
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
