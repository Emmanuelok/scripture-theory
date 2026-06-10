"use client";

import { useEffect, useMemo, useState } from "react";

/* ──────────────────────────────────────────────────────────────────
   Live verse-card editor.

   Drives the /api/verse-card/[book]/[chapter]/[verse] image with
   every parameter the route accepts: template, palette, aspect,
   alignment, size, caption (editable verse text), subtitle
   (editable reference), translation, mark visibility.

   The preview <img> simply rebuilds its src from the current state,
   so every change shows up instantly without a custom render layer.
   For long verses we debounce caption edits so we don't request a
   new image on every keystroke.
────────────────────────────────────────────────────────────────── */

type Aspect = "square" | "story" | "landscape";

const TEMPLATES = [
  { id: "minimal", label: "Minimal", note: "Quiet centre, big quote mark" },
  { id: "classic", label: "Classic", note: "Italic body between rule lines" },
  { id: "sunrise", label: "Sunrise", note: "Warm bloom from above" },
  { id: "aurora", label: "Aurora", note: "Multi-radial flame on dark" },
  { id: "banner", label: "Banner", note: "Coloured block + clean panel" },
  { id: "quiet", label: "Quiet", note: "No frame — just typography" },
] as const;

const PALETTES = [
  { id: "light", label: "Light", swatch: "#fafaf6", fg: "#13120f" },
  { id: "dark", label: "Dark", swatch: "#0a0a0c", fg: "#fafaf9" },
  { id: "sepia", label: "Sepia", swatch: "#f5ecd9", fg: "#3b2a14" },
  { id: "midnight", label: "Midnight", swatch: "#0b1226", fg: "#fbbf24" },
  { id: "olive", label: "Olive", swatch: "#f3f0e6", fg: "#1f2a14" },
  { id: "dawn", label: "Dawn", swatch: "#fff1ea", fg: "#e11d48" },
] as const;

const ASPECTS: { id: Aspect; label: string; ratio: string }[] = [
  { id: "square", label: "Square", ratio: "1:1" },
  { id: "story", label: "Story", ratio: "9:16" },
  { id: "landscape", label: "Wide", ratio: "16:9" },
];

const SIZES = [
  { id: "auto", label: "Auto" },
  { id: "s", label: "S" },
  { id: "m", label: "M" },
  { id: "l", label: "L" },
  { id: "xl", label: "XL" },
] as const;

type Props = {
  book: string;
  chapter: number;
  verse: number;
  translationAbbrev: string;
  /** Resolved verse text — used as the default editable caption. */
  defaultVerseText: string;
  /** Default reference label, e.g. "Psalm 23:6". */
  defaultRef: string;
  /** Translation id passed to the route. */
  translation: string;
};

function useDebounced<T>(value: T, ms = 280): T {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);
  return v;
}

export default function VerseCardEditor({
  book,
  chapter,
  verse,
  defaultVerseText,
  defaultRef,
  translation,
}: Props) {
  const [template, setTemplate] = useState<(typeof TEMPLATES)[number]["id"]>("minimal");
  const [palette, setPalette] = useState<(typeof PALETTES)[number]["id"]>("light");
  const [aspect, setAspect] = useState<Aspect>("square");
  const [align, setAlign] = useState<"center" | "left">("center");
  const [size, setSize] = useState<(typeof SIZES)[number]["id"]>("auto");
  const [showMark, setShowMark] = useState(true);
  const [caption, setCaption] = useState(defaultVerseText);
  const [subtitle, setSubtitle] = useState(defaultRef);
  const [copied, setCopied] = useState(false);

  const captionDebounced = useDebounced(caption);
  const subtitleDebounced = useDebounced(subtitle);

  const cardUrl = useMemo(() => {
    const params = new URLSearchParams({
      translation,
      template,
      palette,
      aspect,
      align,
      size,
      mark: showMark ? "1" : "0",
    });
    // Only include overrides when they differ from defaults — keeps
    // shared image URLs short for the common case.
    if (captionDebounced.trim() && captionDebounced !== defaultVerseText) {
      params.set("caption", captionDebounced);
    } else {
      // Pass `t` so the route doesn't refetch from the upstream API
      params.set("t", defaultVerseText);
    }
    if (subtitleDebounced.trim() && subtitleDebounced !== defaultRef) {
      params.set("subtitle", subtitleDebounced);
    }
    return `/api/verse-card/${book}/${chapter}/${verse}?${params.toString()}`;
  }, [
    book,
    chapter,
    verse,
    translation,
    template,
    palette,
    aspect,
    align,
    size,
    showMark,
    captionDebounced,
    subtitleDebounced,
    defaultVerseText,
    defaultRef,
  ]);

  const aspectMeta = ASPECTS.find((a) => a.id === aspect)!;
  const previewMaxW = aspect === "story" ? "max-w-sm" : aspect === "landscape" ? "max-w-3xl" : "max-w-md";

  function resetAll() {
    setTemplate("minimal");
    setPalette("light");
    setAspect("square");
    setAlign("center");
    setSize("auto");
    setShowMark(true);
    setCaption(defaultVerseText);
    setSubtitle(defaultRef);
  }

  async function copyLink() {
    try {
      const abs = new URL(cardUrl, window.location.origin).toString();
      await navigator.clipboard.writeText(abs);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore — fallback is the open-link */
    }
  }

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
      {/* Preview */}
      <div>
        <div
          className={`mx-auto ${previewMaxW} rounded-3xl overflow-hidden border border-ink-200 bg-ink-50 shadow-sm`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={cardUrl}
            src={cardUrl}
            alt={`Verse card · ${subtitle || defaultRef}`}
            className="w-full h-auto block"
          />
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs">
          <a
            href={cardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-ink-900 text-ink-50 px-4 py-2 hover:bg-flame-700 transition-colors"
          >
            Open full-size · {aspectMeta.ratio} →
          </a>
          <button
            onClick={copyLink}
            className="inline-flex items-center rounded-full border border-ink-300 bg-card px-4 py-2 text-ink-800 hover:border-ink-900"
          >
            {copied ? "Copied ✓" : "Copy link"}
          </button>
          <button
            onClick={resetAll}
            className="inline-flex items-center rounded-full border border-ink-200 bg-card px-4 py-2 text-ink-600 hover:border-ink-900"
          >
            Reset
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-ink-500">
          On mobile, long-press the image to save. On desktop, right-click → Save image.
        </p>
      </div>

      {/* Controls */}
      <div className="space-y-5 rounded-3xl border border-ink-200 bg-card p-5">
        <Section label="Template">
          <div className="grid grid-cols-2 gap-2">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTemplate(t.id)}
                aria-pressed={template === t.id}
                className={`rounded-2xl border p-3 text-left transition-colors ${
                  template === t.id
                    ? "border-flame-500 bg-flame-50/60"
                    : "border-ink-200 bg-card hover:border-ink-900"
                }`}
              >
                <div className="font-serif text-sm text-ink-900">{t.label}</div>
                <div className="text-[10px] text-ink-500 leading-snug mt-0.5">{t.note}</div>
              </button>
            ))}
          </div>
        </Section>

        <Section label="Palette">
          <ul className="flex flex-wrap gap-2">
            {PALETTES.map((p) => {
              const active = palette === p.id;
              return (
                <li key={p.id}>
                  <button
                    onClick={() => setPalette(p.id)}
                    aria-pressed={active}
                    title={p.label}
                    className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                      active
                        ? "border-ink-900 bg-ink-900 text-ink-50"
                        : "border-ink-300 bg-card text-ink-800 hover:border-ink-900"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="h-3.5 w-3.5 rounded-full border border-black/15"
                      style={{ background: p.swatch }}
                    />
                    {p.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </Section>

        <Section label="Shape">
          <div className="flex gap-1">
            {ASPECTS.map((a) => (
              <button
                key={a.id}
                onClick={() => setAspect(a.id)}
                aria-pressed={aspect === a.id}
                className={`flex-1 rounded-xl border px-2 py-2 text-xs transition-colors ${
                  aspect === a.id
                    ? "border-ink-900 bg-ink-900 text-ink-50"
                    : "border-ink-300 bg-card text-ink-800 hover:border-ink-900"
                }`}
              >
                {a.label}
                <span className="block text-[10px] opacity-70">{a.ratio}</span>
              </button>
            ))}
          </div>
        </Section>

        <Section label="Alignment & size">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex gap-1">
              {(["center", "left"] as const).map((a) => (
                <button
                  key={a}
                  onClick={() => setAlign(a)}
                  aria-pressed={align === a}
                  className={`rounded-xl border px-3 py-1.5 text-xs transition-colors ${
                    align === a
                      ? "border-ink-900 bg-ink-900 text-ink-50"
                      : "border-ink-300 bg-card text-ink-800 hover:border-ink-900"
                  }`}
                >
                  {a === "center" ? "Centre" : "Left"}
                </button>
              ))}
            </div>
            <div className="flex gap-1 ml-auto">
              {SIZES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSize(s.id)}
                  aria-pressed={size === s.id}
                  className={`rounded-lg border px-2.5 py-1.5 text-[11px] transition-colors ${
                    size === s.id
                      ? "border-ink-900 bg-ink-900 text-ink-50"
                      : "border-ink-300 bg-card text-ink-800 hover:border-ink-900"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </Section>

        <Section label="The text">
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={4}
            maxLength={800}
            className="w-full rounded-xl border border-ink-300 bg-card-subtle px-3 py-2 text-sm text-ink-900 leading-relaxed focus:outline-none focus:border-flame-500"
          />
          <div className="mt-1 flex items-center justify-between text-[10px] text-ink-500">
            <button
              onClick={() => setCaption(defaultVerseText)}
              className="hover:text-flame-700"
            >
              Restore original
            </button>
            <span>{caption.length} / 800</span>
          </div>
        </Section>

        <Section label="Reference label">
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            maxLength={80}
            className="w-full rounded-xl border border-ink-300 bg-card-subtle px-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-flame-500"
          />
          <button
            onClick={() => setSubtitle(defaultRef)}
            className="mt-1 text-[10px] text-ink-500 hover:text-flame-700"
          >
            Restore original
          </button>
        </Section>

        <Section label="Details">
          <label className="flex items-center gap-2 text-sm text-ink-800">
            <input
              type="checkbox"
              checked={showMark}
              onChange={(e) => setShowMark(e.target.checked)}
              className="accent-flame-600"
            />
            Show Scripture Theory mark
          </label>
        </Section>
      </div>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-flame-700 mb-2">{label}</div>
      {children}
    </div>
  );
}
