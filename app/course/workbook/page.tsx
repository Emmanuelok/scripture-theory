import Link from "next/link";
import { COURSE_WEEKS, COURSE_TITLE } from "@/data/course";
import WorkbookActions from "@/components/WorkbookActions";

export const metadata = {
  title: `${COURSE_TITLE} — Full workbook — Scripture Theory`,
  description:
    "The whole twelve-week Foundations of the Faith course, consolidated for printing or saving as a single PDF.",
};

export default function CourseWorkbookPage() {
  const totalMinutes = COURSE_WEEKS.reduce(
    (acc, w) => acc + (w.readingMinutes ?? 0),
    0
  );

  return (
    <section className="mx-auto max-w-3xl px-5 pt-10 pb-24">
      <header className="border-b border-ink-200 pb-6 mb-8">
        <div className="text-[10px] uppercase tracking-[0.18em] text-flame-700 no-print">
          Foundations of the Faith
        </div>
        <h1 className="font-serif text-4xl md:text-5xl text-ink-900 mt-2 leading-tight">
          The full workbook.
        </h1>
        <p className="mt-3 text-ink-700 leading-relaxed max-w-2xl">
          The whole twelve-week course, on one page. Print it; bind it; mark it up. Approximate
          total read time: {totalMinutes} minutes.
        </p>
        <WorkbookActions />
        <p className="mt-4 text-xs text-ink-500 italic no-print">
          Quizzes, discussion, and journal prompts are intentionally not printed — they are
          live components that work best on the page. Print this workbook for the lessons,
          memory verses, daily readings, and witnesses.
        </p>
      </header>

      {COURSE_WEEKS.map((w) => (
        <article
          key={w.week}
          className="mb-12 pb-12 border-b border-ink-200 last:border-b-0"
          style={{ pageBreakAfter: "always" }}
        >
          <div className="text-[10px] uppercase tracking-widest text-flame-700">
            Week {w.week} of 12
            {w.readingMinutes ? ` · ≈ ${w.readingMinutes} min` : ""}
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-ink-900 mt-2 leading-tight">
            {w.title}
          </h2>
          <p className="mt-2 text-ink-700 italic">{w.tagline}</p>

          {/* Anchor scripture */}
          <section className="mt-6 rounded-2xl border border-ink-200 bg-card-subtle p-5">
            <div className="text-[10px] uppercase tracking-widest text-flame-700">
              Anchor · {w.scripture.ref}
            </div>
            <blockquote className="mt-2 prose-scripture text-ink-900 italic leading-relaxed">
              "{w.scripture.text}"
            </blockquote>
          </section>

          {/* Memory verse */}
          <section className="mt-6 rounded-2xl border border-flame-300 bg-flame-50/40 p-5">
            <div className="text-[10px] uppercase tracking-widest text-flame-700">
              Memory verse · {w.memoryVerse.ref}
            </div>
            <blockquote className="mt-2 prose-scripture text-ink-900 italic leading-relaxed">
              "{w.memoryVerse.text}"
            </blockquote>
          </section>

          {/* Seven daily steps */}
          <section className="mt-6">
            <h3 className="font-serif text-xl text-ink-900 mb-3">
              Seven daily steps
            </h3>
            <ol className="space-y-3">
              {w.days.map((d) => (
                <li
                  key={d.day}
                  className="rounded-xl border border-ink-200 p-4"
                  style={{ pageBreakInside: "avoid" }}
                >
                  <div className="text-[10px] uppercase tracking-widest text-flame-700">
                    Day {d.day} · {d.label}
                  </div>
                  <div className="font-serif text-base text-ink-900 mt-0.5">
                    {d.title} <span className="text-ink-500 text-sm">· {d.passage}</span>
                  </div>
                  <p className="mt-1 text-sm text-ink-700 leading-relaxed">{d.meditation}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Long-form lesson */}
          <section className="mt-6">
            <h3 className="font-serif text-xl text-ink-900 mb-3">The teaching</h3>
            <div className="prose-scripture text-ink-800 leading-relaxed">
              {w.lesson.map((p, i) => (
                <p key={i} className="mb-3">
                  {p}
                </p>
              ))}
            </div>
          </section>

          {/* Witnesses */}
          <section className="mt-6">
            <h3 className="font-serif text-xl text-ink-900 mb-3">
              Voices across the centuries
            </h3>
            <ul className="space-y-3">
              {w.witnesses.map((wi) => (
                <li
                  key={wi.who}
                  className="rounded-xl border border-ink-200 p-4"
                  style={{ pageBreakInside: "avoid" }}
                >
                  <div className="text-[10px] uppercase tracking-widest text-flame-700">
                    {wi.who} · {wi.when}
                  </div>
                  {wi.source && (
                    <div className="text-[10px] text-ink-500 italic">{wi.source}</div>
                  )}
                  <blockquote className="mt-2 text-sm text-ink-800 italic leading-relaxed">
                    "{wi.quote}"
                  </blockquote>
                </li>
              ))}
            </ul>
          </section>

          {/* Practice */}
          <section className="mt-6 rounded-xl border border-flame-300 bg-flame-50/40 p-4">
            <div className="text-[10px] uppercase tracking-widest text-flame-700">
              Practice this week
            </div>
            <p className="mt-1 font-serif text-base text-ink-900 italic">{w.practice}</p>
          </section>

          {/* Multi-tradition voices */}
          {w.traditions && w.traditions.length > 0 && (
            <section className="mt-6">
              <h3 className="font-serif text-xl text-ink-900 mb-3">
                How the Body has spoken
              </h3>
              <ul className="space-y-3">
                {w.traditions.map((t) => (
                  <li
                    key={t.tradition}
                    className="rounded-xl border border-ink-200 p-4"
                    style={{ pageBreakInside: "avoid" }}
                  >
                    <div className="text-[10px] uppercase tracking-widest text-flame-700">
                      {t.tradition}
                    </div>
                    <p className="mt-1 text-sm text-ink-800 leading-relaxed">{t.voice}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Catechism crosswalk */}
          {w.crosswalk && w.crosswalk.length > 0 && (
            <section className="mt-6 rounded-xl bg-card-subtle border border-ink-200 p-4">
              <div className="text-[10px] uppercase tracking-widest text-flame-700">
                Historic crosswalk
              </div>
              <ul className="mt-2 text-sm text-ink-700 space-y-1">
                {w.crosswalk.map((c, i) => (
                  <li key={i}>
                    <strong>{c.catechism}:</strong> {c.refs}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      ))}

      <footer className="text-center pt-6 border-t border-ink-200 text-ink-500 italic">
        <p className="font-serif text-lg">
          "He who began a good work in you will complete it." — Philippians 1:6
        </p>
        <p className="mt-2 text-xs">
          Scripture Theory · Foundations of the Faith · printed from the live course at{" "}
          <Link href="/course" className="underline">
            /course
          </Link>
          .
        </p>
      </footer>
    </section>
  );
}
