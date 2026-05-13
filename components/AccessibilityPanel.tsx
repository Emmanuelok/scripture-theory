"use client";

import { useEffect, useState } from "react";
import { A11Y_DEFAULTS, loadA11y, saveA11y, type A11yPrefs } from "@/lib/a11y";

export default function AccessibilityPanel() {
  const [prefs, setPrefs] = useState(A11Y_DEFAULTS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setPrefs(loadA11y());
    setMounted(true);
  }, []);

  function set<K extends keyof A11yPrefs>(key: K, value: A11yPrefs[K]) {
    const next = { ...prefs, [key]: value } as typeof prefs;
    setPrefs(next);
    saveA11y(next);
  }

  function reset() {
    setPrefs(A11Y_DEFAULTS);
    saveA11y(A11Y_DEFAULTS);
  }

  if (!mounted) {
    return (
      <div className="rounded-3xl border border-ink-200 bg-card-subtle p-10 text-center text-ink-500">
        Loading your preferences…
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <Section title="Text size" hint="For tired eyes and bright sun.">
        <SegGroup
          value={prefs.textSize}
          onChange={(v) => set("textSize", v as A11yPrefs["textSize"])}
          options={[
            { v: "base", label: "Default", sample: "Aa" },
            { v: "lg", label: "Large", sample: "Aa" },
            { v: "xl", label: "Larger", sample: "Aa" },
            { v: "xxl", label: "Largest", sample: "Aa" },
          ]}
        />
      </Section>

      <Section
        title="Reading font"
        hint="OpenDyslexic / Atkinson Hyperlegible — when installed on your device, dyslexia-friendly typography reduces letter swap."
      >
        <SegGroup
          value={prefs.font}
          onChange={(v) => set("font", v as A11yPrefs["font"])}
          options={[
            { v: "default", label: "Default" },
            { v: "dyslexic", label: "Dyslexia-friendly" },
          ]}
        />
      </Section>

      <Section title="Contrast" hint="Pure black-on-white (or white-on-black in dark mode). Maximum legibility.">
        <SegGroup
          value={prefs.contrast}
          onChange={(v) => set("contrast", v as A11yPrefs["contrast"])}
          options={[
            { v: "normal", label: "Normal" },
            { v: "high", label: "High contrast" },
          ]}
        />
      </Section>

      <Section title="Motion" hint="Honor your system's reduced-motion preference, or force-disable transitions here.">
        <SegGroup
          value={prefs.motion}
          onChange={(v) => set("motion", v as A11yPrefs["motion"])}
          options={[
            { v: "system", label: "Use system setting" },
            { v: "reduced", label: "Reduce motion" },
          ]}
        />
      </Section>

      <Section title="Link underlines" hint="Always underline links — helpful for color-blind readers.">
        <SegGroup
          value={prefs.underline}
          onChange={(v) => set("underline", v as A11yPrefs["underline"])}
          options={[
            { v: "off", label: "Default" },
            { v: "on", label: "Always underline" },
          ]}
        />
      </Section>

      <div className="rounded-2xl border border-ink-200 bg-card-subtle p-5">
        <div className="text-xs uppercase tracking-widest text-flame-700">Preview</div>
        <p className="mt-2 prose-scripture text-ink-800">
          "The sum of Your word is truth, and every one of Your righteous rules endures forever."
        </p>
        <p className="mt-1 text-sm text-ink-500">— Psalm 119:160</p>
      </div>

      <button
        onClick={reset}
        className="text-xs text-ink-500 hover:text-ink-900 underline"
      >
        Reset all to defaults
      </button>
    </div>
  );
}

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-ink-200 bg-card p-5 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-serif text-xl text-ink-900">{title}</h2>
      </div>
      <p className="mt-1 text-xs text-ink-500 leading-relaxed">{hint}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function SegGroup<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { v: T; label: string; sample?: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => {
        const active = o.v === value;
        return (
          <button
            key={o.v}
            onClick={() => onChange(o.v)}
            aria-pressed={active}
            className={[
              "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition-colors",
              active
                ? "bg-ink-900 text-ink-50 border-ink-900"
                : "bg-card text-ink-700 border-ink-200 hover:border-flame-500",
            ].join(" ")}
          >
            <span>{o.label}</span>
            {o.sample && (
              <span
                aria-hidden
                className={[
                  "font-serif",
                  o.v === "lg" && "text-base",
                  o.v === "xl" && "text-lg",
                  o.v === "xxl" && "text-2xl",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {o.sample}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
