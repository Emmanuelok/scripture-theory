"use client";

import Link from "next/link";
import { useProfile } from "@/lib/profile";
import { COURSE_WEEKS, EXAM_QUESTION_COUNT } from "@/data/course";
import { Glyph } from "@/components/ui/Glyph";

function fmtDate(iso?: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function fmtRelative(iso?: string): string {
  if (!iso) return "—";
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "—";
  const days = Math.floor((Date.now() - t) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

export default function CourseHistory() {
  const { profile, mounted } = useProfile();
  const course = profile.course ?? {};

  if (!mounted) {
    return (
      <div className="rounded-3xl border border-ink-200 bg-card-subtle p-10 text-center text-ink-500">
        Loading your history…
      </div>
    );
  }

  const done = new Set(course.weeksComplete ?? []);
  const total = COURSE_WEEKS.length;
  const completeCount = done.size;
  const pct = Math.round((completeCount / total) * 100);

  const totalDaysComplete = Object.values(course.daysComplete ?? {}).reduce(
    (acc: number, arr) => acc + ((arr as number[] | undefined)?.length ?? 0),
    0
  );

  // Quiz scores summary
  const quizScores = course.quizScores ?? {};
  const totalCorrect = Object.values(quizScores).reduce(
    (acc: number, n) => acc + (n ?? 0),
    0
  );
  const totalPossible = Object.keys(quizScores).length > 0
    ? Object.keys(quizScores).reduce((acc, k) => {
        const w = COURSE_WEEKS.find((cw) => cw.week === Number(k));
        return acc + (w?.quiz.length ?? 0);
      }, 0)
    : 0;

  if (completeCount === 0 && !course.examScore) {
    return (
      <div className="rounded-3xl border border-ink-200 bg-card-subtle p-10 text-center">
        <Glyph
          id="open-book"
          size={48}
          className="text-flame-700/40 mx-auto mb-4"
        />
        <p className="text-sm text-ink-600 italic max-w-md mx-auto">
          You haven't walked any weeks yet. When you do, the dates, scores, and steps will land
          here.
        </p>
        <Link
          href="/course"
          className="mt-5 inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-500"
        >
          Open Foundations →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <section className="relative overflow-hidden rounded-3xl bg-ink-900 text-ink-50 p-6 md:p-8">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(70% 60% at 0% 0%, rgba(249,115,22,0.18), transparent 60%)",
          }}
        />
        <div className="relative grid sm:grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="Weeks complete" value={`${completeCount}/${total}`} sub={`${pct}%`} />
          <Stat label="Days walked" value={String(totalDaysComplete)} sub={`of ${total * 7}`} />
          <Stat
            label="Quiz accuracy"
            value={
              totalPossible > 0
                ? `${Math.round((totalCorrect / totalPossible) * 100)}%`
                : "—"
            }
            sub={totalPossible > 0 ? `${totalCorrect} / ${totalPossible}` : "no quizzes yet"}
          />
          <Stat
            label="Final exam"
            value={
              course.examScore != null ? `${course.examScore}/${EXAM_QUESTION_COUNT}` : "—"
            }
            sub={course.passed ? "Passed ✓" : course.examScore != null ? "Not yet" : "not taken"}
          />
        </div>
      </section>

      {/* Per-week timeline */}
      <section>
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
          <h2 className="font-serif text-2xl md:text-3xl text-ink-900">
            Week by week
          </h2>
          <Link href="/course" className="text-xs text-flame-700 hover:underline">
            Back to Foundations →
          </Link>
        </div>
        <ol className="space-y-3">
          {COURSE_WEEKS.map((w) => {
            const isDone = done.has(w.week);
            const completedAt = course.weekCompletedAt?.[w.week];
            const score = course.quizScores?.[w.week];
            const dayCount = course.daysComplete?.[w.week]?.length ?? 0;

            return (
              <li key={w.week}>
                <Link
                  href={`/course/week/${w.week}`}
                  className={[
                    "group block rounded-2xl border p-4 transition-colors",
                    isDone
                      ? "border-emerald-300 bg-emerald-50/40 hover:border-emerald-500"
                      : dayCount > 0
                      ? "border-flame-200 bg-flame-50/30 hover:border-flame-500"
                      : "border-ink-200 bg-card hover:border-flame-500/60",
                  ].join(" ")}
                >
                  <div className="flex flex-wrap items-baseline gap-3">
                    <div className="font-serif text-flame-700 w-10 shrink-0">
                      W{w.week}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3
                          className={[
                            "font-serif text-lg",
                            isDone ? "text-emerald-800" : "text-ink-900",
                          ].join(" ")}
                        >
                          {w.title}
                          {isDone && (
                            <span className="ml-2 inline-flex items-center rounded-full bg-emerald-600 text-ink-50 px-2 py-0.5 text-[10px] uppercase tracking-widest align-middle">
                              Complete
                            </span>
                          )}
                        </h3>
                        {completedAt && (
                          <span className="text-xs text-ink-500">
                            {fmtDate(completedAt)} · {fmtRelative(completedAt)}
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-600">
                        {score != null && (
                          <span>
                            Quiz: <strong>{score}/{w.quiz.length}</strong>
                          </span>
                        )}
                        {dayCount > 0 && (
                          <span>
                            Days: <strong>{dayCount}/7</strong>
                          </span>
                        )}
                        {!isDone && score == null && dayCount === 0 && (
                          <span className="italic text-ink-400">Not yet started</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      {course.passed && (
        <Link
          href="/course/certificate"
          className="block rounded-3xl border border-emerald-300 bg-emerald-50/40 p-5 hover:border-emerald-500 transition-colors"
        >
          <div className="flex items-baseline justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-emerald-700">
                Certified · {fmtDate(course.certifiedAt)}
              </div>
              <h3 className="font-serif text-xl text-ink-900 mt-1">
                Your certificate is ready.
              </h3>
            </div>
            <span className="text-xs text-emerald-700">Open →</span>
          </div>
        </Link>
      )}
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl bg-ink-800/40 border border-ink-700/60 p-3 text-center">
      <div className="text-[9px] uppercase tracking-widest text-flame-300/80">{label}</div>
      <div className="font-serif text-2xl text-ink-50 mt-0.5">{value}</div>
      <div className="text-[10px] text-ink-400 mt-0.5">{sub}</div>
    </div>
  );
}
