"use client";

import { useEffect, useState } from "react";
import { useProfile } from "@/lib/profile";

/* ──────────────────────────────────────────────────────────────────
   Make it yours — name + accent.

   The two most personal switches on the platform: what we call you,
   and what colour your copy of the site burns in. Both live only on
   this device (the accent key is scripture-theory-prefixed, so the
   encrypted device bridge carries it too).
────────────────────────────────────────────────────────────────── */

const ACCENT_KEY = "scripture-theory-accent";

const ACCENTS: { id: string; label: string; swatch: string; note: string }[] = [
  { id: "", label: "Flame", swatch: "#f97316", note: "Pentecost fire — the default" },
  { id: "gold", label: "Gold", swatch: "#d97706", note: "Glory and harvest" },
  { id: "olive", label: "Olive", swatch: "#658328", note: "The Mount of Olives" },
  { id: "sea", label: "Sea", swatch: "#14b8a6", note: "Galilee at morning" },
  { id: "violet", label: "Violet", swatch: "#8b5cf6", note: "Advent and royalty" },
  { id: "rose", label: "Rose", swatch: "#e11d48", note: "The love that bled" },
];

function readAccent(): string {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(ACCENT_KEY) ?? "";
  } catch {
    return "";
  }
}

function applyAccent(id: string) {
  if (typeof window === "undefined") return;
  try {
    if (id) {
      window.localStorage.setItem(ACCENT_KEY, id);
      document.documentElement.setAttribute("data-accent", id);
    } else {
      window.localStorage.removeItem(ACCENT_KEY);
      document.documentElement.removeAttribute("data-accent");
    }
  } catch {}
}

export default function MakeItYours() {
  const { profile, update, mounted } = useProfile();
  const [accent, setAccent] = useState("");
  const [nameDraft, setNameDraft] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setAccent(readAccent());
  }, []);

  useEffect(() => {
    if (mounted) setNameDraft(profile.name ?? "");
  }, [mounted, profile.name]);

  if (!mounted) {
    return <div className="rounded-3xl border border-ink-200 bg-card p-6 text-ink-500">Loading…</div>;
  }

  function pick(id: string) {
    applyAccent(id);
    setAccent(id);
  }

  function saveName() {
    update({ name: nameDraft.trim() || undefined });
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  return (
    <div className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8">
      <div className="text-xs uppercase tracking-widest text-flame-700">Make it yours</div>
      <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mt-1">
        Your name. Your colour.
      </h2>
      <p className="mt-3 text-sm text-ink-700 leading-relaxed max-w-2xl">
        Tell us what to call you, and pick the hue your copy of the site burns in.
        Both stay on this device — the platform greets <em>you</em>, not a user ID.
      </p>

      {/* Name */}
      <div className="mt-6 flex flex-wrap items-end gap-3">
        <div className="grow max-w-xs">
          <label htmlFor="miy-name" className="block text-[10px] uppercase tracking-widest text-ink-500 mb-1">
            What should we call you?
          </label>
          <input
            id="miy-name"
            type="text"
            maxLength={40}
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            placeholder="A first name is enough"
            className="w-full rounded-xl border border-ink-300 bg-card px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400"
          />
        </div>
        <button
          onClick={saveName}
          className="rounded-full bg-ink-900 text-ink-50 px-4 py-2 text-sm hover:bg-flame-700 transition-colors"
        >
          {saved ? "Saved ✓" : "Save"}
        </button>
      </div>

      {/* Accent */}
      <div className="mt-7">
        <div className="text-[10px] uppercase tracking-widest text-ink-500 mb-2">Accent</div>
        <ul className="flex flex-wrap gap-2.5">
          {ACCENTS.map((a) => {
            const active = accent === a.id;
            return (
              <li key={a.id || "flame"}>
                <button
                  onClick={() => pick(a.id)}
                  aria-pressed={active}
                  title={a.note}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors ${
                    active
                      ? "border-ink-900 bg-ink-900 text-ink-50"
                      : "border-ink-300 bg-card text-ink-800 hover:border-ink-900"
                  }`}
                >
                  <span
                    aria-hidden
                    className="h-3.5 w-3.5 rounded-full border border-black/10"
                    style={{ backgroundColor: a.swatch }}
                  />
                  {a.label}
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-[11px] text-ink-500 italic">
          {ACCENTS.find((a) => a.id === accent)?.note ?? ""}
        </p>
      </div>
    </div>
  );
}
