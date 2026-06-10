"use client";

import { useEffect } from "react";
import type { PrayerDot } from "@/components/WorldMap";
import { categoryById } from "@/data/prayer-categories";
import { prayerFor } from "@/lib/prayer-intelligence";

function timeAgo(iso: string | null): string {
  if (!iso) return "";
  const ms = Date.now() - Date.parse(iso);
  if (Number.isNaN(ms)) return "";
  const m = Math.floor(ms / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export default function PrayerStoryModal({
  dot,
  onClose,
}: {
  dot: PrayerDot | null;
  onClose: () => void;
}) {
  // Lock body scroll while modal is open
  useEffect(() => {
    if (!dot) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [dot, onClose]);

  if (!dot) return null;
  const cat = categoryById(dot.categoryId);
  if (!cat) return null;

  // Read the actual story and pick the most-fitting scripture set.
  // Falls back to the category's general anchors when no sub-topic fires.
  const prayer = prayerFor(cat, dot.title, dot.description);

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-ink-50/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div
        className="fixed inset-x-3 top-3 bottom-3 md:inset-x-auto md:left-1/2 md:top-10 md:bottom-10 md:-translate-x-1/2 md:w-[40rem] z-50 rounded-3xl border border-ink-200 bg-card shadow-2xl overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="prayer-story-title"
      >
        <div className="sticky top-0 z-10 bg-card border-b border-ink-200 p-4 flex items-baseline justify-between gap-3">
          <div className="flex items-baseline gap-2 min-w-0">
            <span className="text-xl shrink-0" aria-hidden>{cat.emoji}</span>
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-widest text-flame-700">
                {cat.label}
                {prayer.subLabel && (
                  <span className="ml-1.5 text-ink-500 normal-case tracking-normal">
                    · {prayer.subLabel}
                  </span>
                )}
              </div>
              <div className="text-xs text-ink-500 truncate">
                {dot.placeName} · {dot.source}
                {dot.publishedAt && ` · ${timeAgo(dot.publishedAt)}`}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-ink-500 hover:text-ink-900 shrink-0"
            aria-label="Close"
          >
            Close ✕
          </button>
        </div>

        <div className="p-5 md:p-6 space-y-6">
          {/* The story */}
          <section>
            <div className="text-[10px] uppercase tracking-widest text-ink-500">
              The story
            </div>
            <h2 id="prayer-story-title" className="font-serif text-xl text-ink-900 mt-1 leading-snug">
              {dot.title}
            </h2>
            {dot.description && (
              <p className="mt-2 text-sm text-ink-700 leading-relaxed">{dot.description}</p>
            )}
            <a
              href={dot.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-xs text-flame-700 hover:underline"
            >
              Read the full story at {dot.source} →
            </a>
          </section>

          {/* Why Scripture asks us to pray here */}
          <section className="rounded-2xl bg-card-subtle border border-ink-200 p-4">
            <div className="text-[10px] uppercase tracking-widest text-flame-700">
              Why Scripture asks us to pray here
            </div>
            <p className="mt-2 text-sm text-ink-800 leading-relaxed">{prayer.why}</p>
          </section>

          {/* Anchor verses */}
          <section>
            <div className="text-[10px] uppercase tracking-widest text-flame-700">
              Anchor Scriptures
            </div>
            <ul className="mt-3 space-y-3">
              {prayer.anchors.map((a) => (
                <li key={a.ref} className="border-l-2 border-flame-300 pl-4">
                  <p className="prose-scripture text-ink-900 italic">"{a.text}"</p>
                  <div className="mt-1 text-xs text-ink-500">— {a.ref}</div>
                </li>
              ))}
            </ul>
          </section>

          {/* Prayer prompts */}
          <section className="rounded-2xl bg-ink-900 text-ink-50 p-5">
            <div className="text-[10px] uppercase tracking-widest text-flame-300">
              Pray now
            </div>
            <ol className="mt-3 space-y-2.5">
              {prayer.prompts.map((p, i) => (
                <li key={i} className="flex gap-3 leading-relaxed text-sm">
                  <span className="font-serif text-flame-300 shrink-0">{i + 1}.</span>
                  <span className="text-ink-100">{p}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-[11px] text-ink-300 italic">
              Pray for 60 seconds. Even quietly. Then close this and pray for one more.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
