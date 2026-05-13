"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { STAGES, type Stage, type PathStage } from "@/data/path";
import { useProfile, type PathProgress, type PathStageNum, type PathEvent } from "@/lib/profile";
import { Glyph } from "@/components/ui/Glyph";
import IntroRequestModal from "@/components/IntroRequestModal";

/* ──────────────────────────────────────────────────────────────────
   PathTracker — the believer can actually walk the twelve stages.
   - Mark stage complete / uncomplete
   - Pastor-confirmed flag on stages 3 and 7
   - "Request a pastor introduction" on the body stages
   - Free-text note per stage
   - Append-only event log
────────────────────────────────────────────────────────────────── */

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function fmtDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function PathTracker() {
  const { profile, update, mounted } = useProfile();
  const path: PathProgress = profile.path ?? {};
  const [openStage, setOpenStage] = useState<PathStageNum | null>(null);
  const [noteDraft, setNoteDraft] = useState<string>("");
  const [introStage, setIntroStage] = useState<PathStageNum | null>(null);

  const completed = useMemo(() => new Set(path.completed ?? []), [path.completed]);
  const pastorConfirmed = useMemo(
    () => new Set(path.pastorConfirmed ?? []),
    [path.pastorConfirmed]
  );

  // Current stage = lowest stage not completed; if all done, 12
  const current: PathStageNum = useMemo(() => {
    for (const s of STAGES) if (!completed.has(s.stage)) return s.stage;
    return STAGES[STAGES.length - 1].stage;
  }, [completed]);

  const pctComplete = Math.round((completed.size / STAGES.length) * 100);

  function logEvent(ev: Omit<PathEvent, "id" | "at">) {
    const events = [...(path.events ?? []), { id: newId(), at: new Date().toISOString(), ...ev }];
    return events;
  }

  function setStageComplete(stage: PathStageNum, value: boolean) {
    const nextCompleted = value
      ? Array.from(new Set([...(path.completed ?? []), stage]))
      : (path.completed ?? []).filter((s) => s !== stage);
    const nextCompletedAt = { ...(path.completedAt ?? {}) };
    if (value) nextCompletedAt[stage] = new Date().toISOString();
    else delete nextCompletedAt[stage];
    update({
      path: {
        ...path,
        completed: nextCompleted,
        completedAt: nextCompletedAt,
        events: logEvent({ type: value ? "completed" : "uncompleted", stage }),
      },
    });
  }

  function setPastorConfirmed(stage: PathStageNum, value: boolean) {
    const next = value
      ? Array.from(new Set([...(path.pastorConfirmed ?? []), stage]))
      : (path.pastorConfirmed ?? []).filter((s) => s !== stage);
    update({
      path: {
        ...path,
        pastorConfirmed: next,
        events: value ? logEvent({ type: "pastor_confirmed", stage }) : path.events,
      },
    });
  }

  function recordPastorRequest(stage: PathStageNum) {
    update({
      path: {
        ...path,
        events: logEvent({ type: "pastor_request", stage }),
      },
    });
  }

  function saveNote(stage: PathStageNum, body: string) {
    const next = { ...(path.notes ?? {}) };
    if (body.trim()) next[stage] = body.trim();
    else delete next[stage];
    update({ path: { ...path, notes: next } });
  }

  if (!mounted) {
    return (
      <div className="rounded-3xl border border-ink-200 bg-card-subtle p-10 text-center text-ink-500">
        Loading your walk…
      </div>
    );
  }

  const currentStage = STAGES.find((s) => s.stage === current);

  return (
    <div className="space-y-8">
      {/* Header — current stage + progress */}
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
              Where you are now
            </div>
            <h2 className="font-serif text-3xl md:text-4xl mt-1 leading-tight">
              {currentStage
                ? `Stage ${currentStage.stage} · ${currentStage.name}`
                : "All twelve stages walked"}
            </h2>
            {currentStage && (
              <p className="mt-2 text-sm text-ink-300 leading-relaxed max-w-xl">
                <strong className="text-ink-50">Next:</strong> {currentStage.nextStep}
              </p>
            )}
            <div className="mt-5">
              <div className="flex items-baseline justify-between text-xs text-ink-300 mb-1.5">
                <span>Progress</span>
                <span className="text-flame-300">
                  {completed.size} of {STAGES.length} ({pctComplete}%)
                </span>
              </div>
              <div className="h-2 rounded-full bg-ink-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-flame-500 to-flame-300 transition-all duration-500"
                  style={{ width: `${pctComplete}%` }}
                />
              </div>
            </div>
          </div>
          {currentStage?.href && (
            <Link
              href={currentStage.href}
              className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-500 transition-colors whitespace-nowrap"
            >
              Take the next step →
            </Link>
          )}
        </div>
      </section>

      {/* Twelve stages — interactive */}
      <ol className="relative space-y-3">
        <span
          aria-hidden
          className="hidden md:block absolute left-7 top-2 bottom-2 w-px bg-gradient-to-b from-flame-300 via-flame-500/40 to-ink-200"
        />
        {STAGES.map((s) => {
          const isComplete = completed.has(s.stage);
          const isCurrent = !isComplete && s.stage === current;
          const isPastorConfirmed = pastorConfirmed.has(s.stage);
          const isOpen = openStage === s.stage;
          const completedAt = path.completedAt?.[s.stage];
          const note = path.notes?.[s.stage] ?? "";
          return (
            <li key={s.stage}>
              <article
                className={[
                  "group relative grid grid-cols-[auto_1fr] gap-4 md:gap-6 rounded-3xl border p-5 md:p-6 transition-all overflow-hidden",
                  isComplete
                    ? "border-emerald-500/40 bg-emerald-50/40"
                    : isCurrent
                    ? "border-flame-500 bg-card shadow-[0_18px_50px_-20px_rgba(249,115,22,0.32)]"
                    : "border-ink-200 bg-card hover:border-flame-500/60",
                ].join(" ")}
              >
                {/* Stage badge */}
                <div className="relative flex flex-col items-center gap-1.5 z-10">
                  <div
                    className={[
                      "w-14 h-14 md:w-16 md:h-16 rounded-2xl border flex items-center justify-center font-serif text-xl md:text-2xl tracking-tight transition-colors",
                      isComplete
                        ? "border-emerald-500 bg-emerald-100 text-emerald-700"
                        : isCurrent
                        ? "border-flame-500 bg-gradient-to-br from-flame-50 to-flame-100 text-flame-700"
                        : s.kind === "body"
                        ? "border-flame-200 bg-flame-50/40 text-flame-700/70"
                        : "border-ink-200 bg-card-subtle text-ink-600",
                    ].join(" ")}
                  >
                    {isComplete ? "✓" : String(s.stage).padStart(2, "0")}
                  </div>
                  <span
                    className={[
                      "h-1.5 w-1.5 rounded-full",
                      isComplete ? "bg-emerald-600" : s.kind === "body" ? "bg-flame-600" : "bg-ink-400",
                    ].join(" ")}
                  />
                </div>

                <div className="relative min-w-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3
                      className={[
                        "font-serif text-xl md:text-2xl leading-tight",
                        isComplete ? "text-emerald-800" : "text-ink-900",
                      ].join(" ")}
                    >
                      {s.name}
                      {isCurrent && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-2 py-0.5 text-[10px] uppercase tracking-widest align-middle">
                          Current
                        </span>
                      )}
                      {isPastorConfirmed && (
                        <span
                          className="ml-2 inline-flex items-center rounded-full border border-flame-300 bg-flame-50 text-flame-700 px-2 py-0.5 text-[10px] uppercase tracking-widest align-middle"
                          title="A pastor has confirmed this stage"
                        >
                          Pastor ✓
                        </span>
                      )}
                    </h3>
                    <span className="text-[10px] uppercase tracking-widest text-flame-700">
                      {s.scripture}
                    </span>
                  </div>
                  <p className="mt-1.5 text-ink-700 leading-relaxed text-sm md:text-base">
                    {s.focus}
                  </p>
                  {isComplete && completedAt && (
                    <p className="mt-1 text-xs text-emerald-700">
                      Completed {fmtDate(completedAt)}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => setStageComplete(s.stage, !isComplete)}
                      className={[
                        "inline-flex items-center rounded-full px-4 py-1.5 text-xs transition-colors",
                        isComplete
                          ? "border border-ink-300 bg-card text-ink-700 hover:border-ink-900"
                          : "bg-flame-600 text-ink-50 hover:bg-flame-500",
                      ].join(" ")}
                    >
                      {isComplete ? "Unmark" : "Mark complete"}
                    </button>
                    {s.href && (
                      <Link
                        href={s.href}
                        className="inline-flex items-center rounded-full border border-ink-300 bg-card px-4 py-1.5 text-xs text-ink-700 hover:border-flame-500 hover:text-flame-700"
                      >
                        {s.nextStep.length > 28 ? "Take the next step" : s.nextStep} →
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        const opening = isOpen ? null : s.stage;
                        setOpenStage(opening);
                        if (opening) setNoteDraft(note);
                      }}
                      className="inline-flex items-center rounded-full border border-ink-300 bg-card px-4 py-1.5 text-xs text-ink-600 hover:border-ink-900 hover:text-ink-900"
                    >
                      {isOpen ? "Hide details" : "Details & notes"}
                    </button>
                  </div>

                  {/* Details panel */}
                  {isOpen && (
                    <div className="mt-5 rounded-2xl border border-ink-200 bg-card-subtle p-5 space-y-4">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-flame-700">
                          Observable sign
                        </div>
                        <p className="mt-1 text-sm text-ink-700 italic">"{s.observable}"</p>
                      </div>

                      {s.pastorConfirmable && (
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-flame-700 mb-1">
                            Pastor confirmation
                          </div>
                          <p className="text-xs text-ink-600 leading-relaxed mb-3">
                            This stage cannot be completed alone — it must happen with a faithful
                            local body. A pastor's hand makes it real.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => setPastorConfirmed(s.stage, !isPastorConfirmed)}
                              className={[
                                "inline-flex items-center rounded-full px-4 py-1.5 text-xs transition-colors",
                                isPastorConfirmed
                                  ? "border border-flame-300 bg-flame-50 text-flame-700"
                                  : "bg-ink-900 text-ink-50 hover:bg-flame-700",
                              ].join(" ")}
                            >
                              {isPastorConfirmed
                                ? "Pastor-confirmed ✓ (remove)"
                                : "My pastor has confirmed this"}
                            </button>
                            <button
                              onClick={() => {
                                recordPastorRequest(s.stage);
                                setIntroStage(s.stage);
                              }}
                              className="inline-flex items-center rounded-full border border-ink-300 bg-card px-4 py-1.5 text-xs text-ink-700 hover:border-ink-900"
                            >
                              I need a pastor introduction
                            </button>
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-flame-700">
                          My note
                        </label>
                        <textarea
                          value={noteDraft}
                          onChange={(e) => setNoteDraft(e.target.value)}
                          onBlur={() => saveNote(s.stage, noteDraft)}
                          rows={3}
                          placeholder="What is the Spirit doing here? What did your pastor say?"
                          className="mt-1.5 w-full rounded-xl border border-ink-200 bg-card px-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-flame-500"
                        />
                        <p className="mt-1 text-[11px] text-ink-500">
                          Saved on your device only. Auto-saves on blur.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <Glyph
                  id={s.glyph}
                  size={56}
                  className={[
                    "absolute right-4 bottom-4 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3",
                    isComplete
                      ? "text-emerald-700/30"
                      : isCurrent
                      ? "text-flame-700/40"
                      : "text-flame-700/15",
                  ].join(" ")}
                />
              </article>
            </li>
          );
        })}
      </ol>

      {/* Pastor-confirmable note */}
      <section className="rounded-3xl border border-flame-200 bg-flame-50/50 p-5 md:p-6">
        <div className="flex items-start gap-3">
          <Glyph id="house" size={36} className="text-flame-700 mt-0.5 shrink-0" />
          <div>
            <h3 className="font-serif text-lg text-ink-900">A note on pastor confirmation</h3>
            <p className="mt-1 text-sm text-ink-700 leading-relaxed">
              Stages 3 (Confess &amp; Baptize) and 7 (Belong) cannot be honestly marked complete on
              your own — they live in the gathered body. When a real pastor confirms these, mark
              "Pastor-confirmed" so the platform knows your walk is real, not just self-reported.
              We exist under, not over, your local church.
            </p>
          </div>
        </div>
      </section>

      {introStage !== null && (
        <IntroRequestModal
          stage={introStage}
          defaultAlias={profile.name ?? profile.secretPlace?.alias}
          onClose={() => setIntroStage(null)}
        />
      )}
    </div>
  );
}
