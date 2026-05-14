"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useProfile } from "@/lib/profile";
import { COURSE_WEEKS } from "@/data/course";
import { Glyph } from "@/components/ui/Glyph";

type Pace = "intensive" | "standard" | "generous";

/** A short pre-course diagnostic. Never gatekeeping — only pastoral pacing. */
type DxQ = { id: string; question: string };
const DIAGNOSTIC: DxQ[] = [
  { id: "yes-recently", question: "I trusted Christ within the last year." },
  { id: "baptized", question: "I have been baptized." },
  { id: "bible-daily", question: "I read the Bible most days." },
  { id: "church", question: "I'm part of a faithful local church." },
  { id: "share", question: "I have told at least one person about Jesus this year." },
  { id: "season", question: "I am in a hard season right now (loss, illness, exhaustion)." },
];

/** Recommend a pace based on diagnostic answers. */
function recommendPace(answers: Record<string, boolean>): {
  pace: Pace;
  why: string;
} {
  if (answers["season"]) {
    return {
      pace: "generous",
      why:
        "You named a hard season. The course is for you — but pace yourself. Generous (24 weeks) lets the Word work without rushing you.",
    };
  }
  // If they're brand new (recent yes, no baptism, no daily Bible)
  const veryNew =
    answers["yes-recently"] && !answers["baptized"] && !answers["bible-daily"];
  if (veryNew) {
    return {
      pace: "standard",
      why:
        "You're early in the walk. Standard (12 weeks) is exactly the right pace — slow enough to grow, fast enough to build a rhythm.",
    };
  }
  // If they're already mature (Bible daily + church + share), they can go faster
  if (answers["bible-daily"] && answers["church"] && answers["share"]) {
    return {
      pace: "intensive",
      why:
        "You already have a real rhythm. Intensive (6 weeks) will refresh the foundations and sharpen what you're already living.",
    };
  }
  return {
    pace: "standard",
    why: "Standard (12 weeks) is the right place to start. You can shift later if you need to.",
  };
}

const PACES: { id: Pace; label: string; sub: string; weeks: string }[] = [
  {
    id: "intensive",
    label: "Intensive",
    sub: "Two weeks of content per calendar week. Six weeks total. For believers in retreat or sabbatical, or someone in real urgency.",
    weeks: "≈ 6 weeks",
  },
  {
    id: "standard",
    label: "Standard",
    sub: "One week of content per calendar week. Twelve weeks total. The recommended pace, designed to fit alongside normal life.",
    weeks: "12 weeks",
  },
  {
    id: "generous",
    label: "Generous",
    sub: "One week of content every two calendar weeks. Twenty-four weeks total. For believers in seasons of suffering, exhaustion, or shift work.",
    weeks: "≈ 24 weeks",
  },
];

export default function CourseBegin() {
  const { profile, update, mounted } = useProfile();
  const course = profile.course ?? {};
  const [pace, setPace] = useState<Pace>("standard");
  const [committed, setCommitted] = useState(Boolean(course.weekCompletedAt));

  // Diagnostic state — null = unanswered
  const [dxAnswers, setDxAnswers] = useState<Record<string, boolean | null>>(
    Object.fromEntries(DIAGNOSTIC.map((q) => [q.id, null]))
  );
  const allAnswered = useMemo(
    () => DIAGNOSTIC.every((q) => dxAnswers[q.id] !== null),
    [dxAnswers]
  );
  const recommendation = useMemo(() => {
    if (!allAnswered) return null;
    const cleaned: Record<string, boolean> = {};
    for (const [k, v] of Object.entries(dxAnswers)) cleaned[k] = !!v;
    return recommendPace(cleaned);
  }, [dxAnswers, allAnswered]);

  function applyRecommendation() {
    if (recommendation) setPace(recommendation.pace);
    if (typeof window !== "undefined") {
      document.getElementById("pace-section")?.scrollIntoView({ behavior: "smooth" });
    }
  }

  function commit() {
    // Initialize course progress (idempotent — only sets the first-touched date)
    update({
      course: {
        ...course,
        // weeksComplete kept as-is; we don't pre-mark anything
      },
    });
    setCommitted(true);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!mounted) {
    return (
      <div className="rounded-3xl border border-ink-200 bg-card-subtle p-10 text-center text-ink-500">
        Loading…
      </div>
    );
  }

  if (committed) {
    return (
      <div className="space-y-6">
        <section className="relative overflow-hidden rounded-3xl bg-ink-900 text-ink-50 p-8 md:p-10">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-90"
            style={{
              background:
                "radial-gradient(70% 60% at 0% 0%, rgba(249,115,22,0.22), transparent 60%)",
            }}
          />
          <div className="relative">
            <Glyph id="flame" size={48} className="text-flame-300 mb-3" />
            <div className="text-[10px] uppercase tracking-[0.22em] text-flame-300">
              Begun
            </div>
            <h2 className="font-serif text-3xl md:text-4xl mt-1 leading-tight">
              The course is yours now.
            </h2>
            <p className="mt-3 text-sm text-ink-300 max-w-xl leading-relaxed">
              You have committed before the Lord to walk these twelve weeks. He has begun a good
              work in you (Philippians 1:6). Open Week 1 today and walk.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href="/course/week/1"
                className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-500"
              >
                Open Week 1 →
              </Link>
              <Link
                href="/course"
                className="inline-flex items-center rounded-full border border-ink-700 text-ink-50 px-5 py-2.5 text-sm hover:border-flame-300"
              >
                Back to the course
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pastoral letter */}
      <article className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8">
        <div className="text-[10px] uppercase tracking-widest text-flame-700">
          A letter, before we begin
        </div>
        <div className="mt-3 prose-scripture text-ink-800 leading-relaxed space-y-4">
          <p>
            Dear believer,
          </p>
          <p>
            You are about to do something serious and ordinary at the same time. You are sitting
            down for twelve weeks with the Christian Faith — what Christians have believed,
            confessed, sung, prayed, and died for, in every century, on every continent, for two
            thousand years. The course is not original; the gospel is older than any of us. But it
            is yours now.
          </p>
          <p>
            We have built this for you carefully. Each week walks one piece of the Faith — who
            Jesus is, what He did, the Trinity, the Bible, prayer, repentance, the Spirit, the
            Church, the sacraments, witness, suffering, and the long obedience. Each week has a
            short pastoral lesson, seven daily readings, a memory verse, a practice, a journal
            prompt, and a quiz. None of it is busywork. All of it is the kind of food the soul
            grows on.
          </p>
          <p>
            Two warnings, in love. First, do not try to do this perfectly. You will miss days.
            Some weeks you will only do the lesson and the quiz; that is enough. The Father is not
            grading you on streaks. Keep walking. Second, do not try to do this alone if you can
            help it. Tell one friend, or one small group, or your pastor that you are walking it,
            and ask them to walk with you. The Christian life is by design a together-thing.
          </p>
          <p>
            One more thing. At the end of the twelve weeks there is a final exam and a certificate.
            They are real and good — they mark a real walk. But they are not the point. The point
            is that twelve weeks from today you would be a believer who knows what she believes
            and why; a man who has begun to pray; a sister whose Bible is open and whose heart is
            quieter. That is what we hope. That is what we are praying for you, right now, as you
            read.
          </p>
          <p className="italic">
            With love and in His name —<br />
            Scripture Theory editorial
          </p>
        </div>
      </article>

      {/* Pre-course diagnostic */}
      <section className="rounded-3xl border border-ink-200 bg-card p-6 md:p-7">
        <div className="text-[10px] uppercase tracking-widest text-flame-700">
          Where are you right now?
        </div>
        <h2 className="font-serif text-2xl text-ink-900 mt-1">
          A short, honest check.
        </h2>
        <p className="mt-1 text-sm text-ink-600 leading-relaxed">
          Six yes/no questions — not gatekeeping, just pacing. We use them to suggest a rhythm.
          Skip if you'd rather pick yourself.
        </p>

        <ul className="mt-5 space-y-2">
          {DIAGNOSTIC.map((q) => (
            <li
              key={q.id}
              className="rounded-2xl border border-ink-200 bg-card-subtle p-4"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <span className="text-sm text-ink-800 flex-1 min-w-0">{q.question}</span>
                <div className="flex items-center gap-1 rounded-full bg-card border border-ink-200 p-0.5">
                  {([
                    { v: true, label: "Yes" },
                    { v: false, label: "No" },
                  ] as const).map((o) => (
                    <button
                      key={o.label}
                      onClick={() =>
                        setDxAnswers((prev) => ({ ...prev, [q.id]: o.v }))
                      }
                      aria-pressed={dxAnswers[q.id] === o.v}
                      className={[
                        "text-xs px-3 py-1 rounded-full transition-colors",
                        dxAnswers[q.id] === o.v
                          ? "bg-ink-900 text-ink-50"
                          : "text-ink-600 hover:text-ink-900",
                      ].join(" ")}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>

        {recommendation && (
          <div className="mt-5 rounded-2xl border border-flame-300 bg-flame-50/60 p-4">
            <div className="text-[10px] uppercase tracking-widest text-flame-700">
              Suggested pace · {PACES.find((p) => p.id === recommendation.pace)?.label}
            </div>
            <p className="mt-1 text-sm text-ink-700 leading-relaxed">
              {recommendation.why}
            </p>
            <button
              onClick={applyRecommendation}
              className="mt-3 text-xs rounded-full bg-flame-600 text-ink-50 px-3 py-1 hover:bg-flame-500"
            >
              Use this pace →
            </button>
          </div>
        )}
      </section>

      {/* Choose your pace */}
      <section id="pace-section" className="rounded-3xl border border-ink-200 bg-card p-6 md:p-7">
        <div className="text-[10px] uppercase tracking-widest text-flame-700">
          Choose your pace
        </div>
        <h2 className="font-serif text-2xl text-ink-900 mt-1">
          Three honest options.
        </h2>
        <p className="mt-1 text-sm text-ink-600 leading-relaxed">
          Pick one. You can change it any time. The course content does not change — only your
          rhythm.
        </p>

        <ul className="mt-4 space-y-2">
          {PACES.map((p) => {
            const active = pace === p.id;
            return (
              <li key={p.id}>
                <button
                  onClick={() => setPace(p.id)}
                  aria-pressed={active}
                  className={[
                    "w-full text-left rounded-2xl border p-4 transition-colors",
                    active
                      ? "border-flame-500 bg-flame-50/60"
                      : "border-ink-200 bg-card hover:border-flame-500/60",
                  ].join(" ")}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-serif text-lg text-ink-900">{p.label}</span>
                    <span className="text-[10px] uppercase tracking-widest text-flame-700">
                      {p.weeks}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-ink-700 leading-relaxed">{p.sub}</p>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* What's ahead */}
      <section className="rounded-3xl border border-ink-200 bg-card-subtle p-6">
        <div className="text-[10px] uppercase tracking-widest text-flame-700">
          What you'll walk through
        </div>
        <h2 className="font-serif text-xl text-ink-900 mt-1 mb-3">
          The twelve weeks ahead.
        </h2>
        <ol className="grid sm:grid-cols-2 gap-2 text-sm text-ink-700">
          {COURSE_WEEKS.map((w) => (
            <li key={w.week} className="flex items-baseline gap-2">
              <span className="font-serif text-flame-700">{String(w.week).padStart(2, "0")}</span>
              <span>{w.title}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Commit */}
      <section className="rounded-3xl border border-flame-300 bg-flame-50/60 p-6 md:p-7">
        <div className="text-[10px] uppercase tracking-widest text-flame-700">
          A small commitment, before God
        </div>
        <h2 className="font-serif text-2xl text-ink-900 mt-1">
          Will you walk it?
        </h2>
        <p className="mt-2 text-sm text-ink-700 leading-relaxed">
          Twelve weeks. Five minutes a day, or thirty. No streaks, no shame. Just a believer
          coming to the Father with His Word, day after day, until the season closes and a new one
          opens. Click below to begin.
        </p>
        <button
          onClick={commit}
          className="mt-5 inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-6 py-3 text-sm md:text-base hover:bg-flame-500"
        >
          I commit. Begin Week 1 →
        </button>
        <p className="mt-3 text-[11px] text-ink-500 italic">
          "He who began a good work in you will complete it until the day of Jesus Christ."
          — Philippians 1:6
        </p>
      </section>
    </div>
  );
}
