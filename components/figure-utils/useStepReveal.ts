"use client";

import { useEffect, useState } from "react";

/**
 * useStepReveal — shared step-state machine for figures that walk through
 * a sequence of nodes (Footsteps, Timeline, Sermon on the Mount, etc.).
 *
 *  - step starts at 0 and reaches `total` when everything is revealed.
 *  - autoMs > 0 advances on a timer; the timer stops at `total`.
 *  - "Previous" / "Next" / restart / setStep all cancel auto-play.
 */
export function useStepReveal(total: number, autoMs = 1700) {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(false);

  // Reveal the first node shortly after mount so the figure isn't empty.
  useEffect(() => {
    const t = window.setTimeout(() => setStep((s) => (s === 0 ? 1 : s)), 350);
    return () => window.clearTimeout(t);
  }, []);

  // Auto-play tick.
  useEffect(() => {
    if (!auto) return;
    if (step >= total) {
      setAuto(false);
      return;
    }
    const t = window.setTimeout(() => setStep((s) => Math.min(total, s + 1)), autoMs);
    return () => window.clearTimeout(t);
  }, [auto, step, total, autoMs]);

  function next() {
    setAuto(false);
    setStep((s) => Math.min(total, s + 1));
  }
  function prev() {
    setAuto(false);
    setStep((s) => Math.max(1, s - 1));
  }
  function restart() {
    setAuto(false);
    setStep(0);
    window.setTimeout(() => setStep(1), 60);
  }
  function jumpTo(n: number) {
    setAuto(false);
    setStep(Math.max(1, Math.min(total, n)));
  }
  function toggleAuto() {
    setAuto((v) => !v);
  }

  return { step, total, auto, next, prev, restart, jumpTo, toggleAuto };
}
