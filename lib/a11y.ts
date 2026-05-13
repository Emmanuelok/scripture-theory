"use client";

export type A11yPrefs = {
  textSize?: "base" | "lg" | "xl" | "xxl";
  font?: "default" | "dyslexic";
  contrast?: "normal" | "high";
  motion?: "system" | "reduced";
  underline?: "off" | "on";
};

export const A11Y_KEY = "scripture-theory-a11y";

export const A11Y_DEFAULTS: Required<A11yPrefs> = {
  textSize: "base",
  font: "default",
  contrast: "normal",
  motion: "system",
  underline: "off",
};

export function loadA11y(): Required<A11yPrefs> {
  if (typeof window === "undefined") return A11Y_DEFAULTS;
  try {
    const raw = window.localStorage.getItem(A11Y_KEY);
    if (!raw) return A11Y_DEFAULTS;
    return { ...A11Y_DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return A11Y_DEFAULTS;
  }
}

export function saveA11y(p: A11yPrefs) {
  if (typeof window === "undefined") return;
  const merged = { ...loadA11y(), ...p };
  try {
    window.localStorage.setItem(A11Y_KEY, JSON.stringify(merged));
  } catch {}
  applyA11y(merged);
}

export function applyA11y(p: Required<A11yPrefs>) {
  if (typeof document === "undefined") return;
  const r = document.documentElement;
  r.setAttribute("data-a11y-text", p.textSize === "base" ? "" : p.textSize);
  r.setAttribute("data-a11y-font", p.font === "default" ? "" : p.font);
  r.setAttribute("data-a11y-contrast", p.contrast === "normal" ? "" : p.contrast);
  r.setAttribute("data-a11y-motion", p.motion === "system" ? "" : p.motion);
  r.setAttribute("data-a11y-underline", p.underline === "off" ? "" : p.underline);
}
