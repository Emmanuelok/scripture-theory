"use client";

import type { useStepReveal } from "./useStepReveal";

type StepState = ReturnType<typeof useStepReveal>;

/**
 * StepControls — the Previous / Auto-play / Next / Restart pill row used by
 * step-by-step figures. Renders alongside whatever header the figure wants
 * to show above its SVG.
 */
export default function StepControls({
  state,
}: {
  state: StepState;
}) {
  const { step, total, auto, next, prev, toggleAuto, restart } = state;
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={prev}
        disabled={step <= 1}
        className="rounded-full border border-ink-700/60 bg-ink-800/60 px-3 py-1.5 text-xs text-ink-100 hover:border-flame-400 disabled:opacity-40 disabled:hover:border-ink-700/60"
        aria-label="Previous step"
      >
        ← Previous
      </button>
      <button
        onClick={toggleAuto}
        className={`rounded-full px-3 py-1.5 text-xs font-medium border ${
          auto
            ? "bg-flame-600 text-ink-50 border-flame-500"
            : "bg-ink-800/60 text-ink-100 border-ink-700/60 hover:border-flame-400"
        }`}
        aria-pressed={auto}
      >
        {auto ? "■ Pause" : "▶ Auto-play"}
      </button>
      <button
        onClick={next}
        disabled={step >= total}
        className="rounded-full bg-flame-600 hover:bg-flame-700 px-3 py-1.5 text-xs text-ink-50 disabled:opacity-40 disabled:hover:bg-flame-600"
        aria-label="Next step"
      >
        Next →
      </button>
      <button
        onClick={restart}
        className="rounded-full border border-ink-700/60 bg-ink-800/60 px-3 py-1.5 text-xs text-ink-300 hover:border-flame-400 hover:text-ink-100"
        aria-label="Restart"
      >
        ↺
      </button>
    </div>
  );
}

/** A flame progress bar that scales with step / total. */
export function StepProgress({ state }: { state: StepState }) {
  const pct = (state.step / state.total) * 100;
  return (
    <div className="mb-3 h-1.5 rounded-full bg-ink-800/60 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-flame-300 via-flame-500 to-flame-300 transition-all duration-700"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
