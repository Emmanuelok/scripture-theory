"use client";

import { useState } from "react";
import { useProfile, type PrayingForRecord } from "@/lib/profile";

/* ──────────────────────────────────────────────────────────────────
   NamesPanel — the fuller view of profile.prayingFor.

   Same data as PrayingForList on /today (the simple 5-name widget),
   but here:
     • no hard cap on number of names
     • walking-with ↔ rejoicing-in posture
     • simple stats: prayed-day count, last-prayed, met-Jesus date
     • inline edit of name + note

   Lives where /today's widget lives — in profile.prayingFor — so the
   cloud-sync allowlist already carries it for opted-in users, and
   the device bridge already includes it via the profile.
────────────────────────────────────────────────────────────────── */

type View = "walking" | "rejoicing";

const NAME_MAX = 64;
const NOTE_MAX = 280;
const HARD_CAP = 200;

function newId() {
  return `n_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function daysSince(iso: string | undefined): number | null {
  if (!iso) return null;
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return null;
  return Math.max(0, Math.floor((Date.now() - then) / 86_400_000));
}

function formatRelative(iso: string | undefined): string {
  const d = daysSince(iso);
  if (d === null) return "never";
  if (d === 0) return "today";
  if (d === 1) return "yesterday";
  if (d < 7) return `${d} days ago`;
  if (d < 30) return `${Math.floor(d / 7)} weeks ago`;
  if (d < 365) return `${Math.floor(d / 30)} months ago`;
  return `${Math.floor(d / 365)} years ago`;
}

function lastPrayedDate(p: PrayingForRecord): string | undefined {
  return p.prayedAt[p.prayedAt.length - 1];
}

function isPrayedToday(p: PrayingForRecord): boolean {
  return lastPrayedDate(p) === todayKey();
}

function isWalking(p: PrayingForRecord): boolean {
  return p.status !== "rejoicing-in";
}

export default function NamesPanel() {
  const { profile, update, mounted } = useProfile();
  const [view, setView] = useState<View>("walking");
  const [showForm, setShowForm] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [draftNote, setDraftNote] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editNote, setEditNote] = useState("");

  if (!mounted) {
    return (
      <div className="rounded-3xl border border-ink-200 bg-card p-6 text-ink-500">
        Loading the names…
      </div>
    );
  }

  const all = profile.prayingFor ?? [];
  const walking = all.filter(isWalking);
  const rejoicing = all.filter((p) => !isWalking(p));
  const filtered = view === "walking" ? walking : rejoicing;
  const unprayedToday = walking.filter((p) => !isPrayedToday(p));

  function submitAdd() {
    setError(null);
    const name = draftName.trim();
    const note = draftNote.trim();
    if (!name) {
      setError("A name (or initials) is needed.");
      return;
    }
    if (name.length > NAME_MAX) {
      setError(`Name max ${NAME_MAX} characters.`);
      return;
    }
    if (note.length > NOTE_MAX) {
      setError(`Note max ${NOTE_MAX} characters.`);
      return;
    }
    if (all.length >= HARD_CAP) {
      setError(`You're already carrying ${HARD_CAP} names — archive a few first.`);
      return;
    }
    const record: PrayingForRecord = {
      id: newId(),
      name,
      note: note || undefined,
      addedAt: new Date().toISOString(),
      prayedAt: [],
      status: "walking-with",
    };
    update({ prayingFor: [record, ...all] });
    setDraftName("");
    setDraftNote("");
    setShowForm(false);
  }

  function markPrayed(id: string) {
    const today = todayKey();
    const next = all.map((p) => {
      if (p.id !== id) return p;
      const last = lastPrayedDate(p);
      if (last === today) return p;
      return { ...p, prayedAt: [...p.prayedAt, today] };
    });
    update({ prayingFor: next });
  }

  function markMetJesus(id: string) {
    const next = all.map((p) => {
      if (p.id !== id) return p;
      return {
        ...p,
        status: "rejoicing-in" as const,
        metJesusAt: p.metJesusAt ?? new Date().toISOString(),
      };
    });
    update({ prayingFor: next });
  }

  function markStillWalking(id: string) {
    const next = all.map((p) => {
      if (p.id !== id) return p;
      return { ...p, status: "walking-with" as const, metJesusAt: undefined };
    });
    update({ prayingFor: next });
  }

  function startEdit(p: PrayingForRecord) {
    setEditingId(p.id);
    setEditName(p.name);
    setEditNote(p.note ?? "");
  }

  function saveEdit(id: string) {
    const name = editName.trim();
    if (!name) {
      setError("A name (or initials) is needed.");
      return;
    }
    const next = all.map((p) =>
      p.id === id ? { ...p, name, note: editNote.trim() || undefined } : p,
    );
    update({ prayingFor: next });
    setEditingId(null);
  }

  function remove(id: string) {
    const target = all.find((p) => p.id === id);
    if (!target) return;
    if (!confirm(`Remove "${target.name}" from the list? You can always re-add.`)) return;
    update({ prayingFor: all.filter((p) => p.id !== id) });
  }

  return (
    <div className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-flame-700">The Names</div>
          <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mt-1">
            People you carry in prayer.
          </h2>
        </div>
        {!showForm && (
          <button
            onClick={() => {
              setShowForm(true);
              setError(null);
            }}
            className="rounded-full bg-flame-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-700"
          >
            Add a name →
          </button>
        )}
      </div>

      <p className="mt-3 text-sm text-ink-700 leading-relaxed max-w-2xl">
        The same names that appear on <code className="text-xs">/today</code> live
        here — but this is the fuller view. Mark a quiet &ldquo;prayed today&rdquo;
        tap, and one day move a name across to <em>rejoicing in</em> when the
        Lord meets them. No one else ever sees this list.
      </p>

      {showForm && (
        <div className="mt-5 rounded-2xl border border-flame-300 bg-flame-50/60 p-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-flame-700 mb-1">
                Name (or initials)
              </label>
              <input
                type="text"
                value={draftName}
                maxLength={NAME_MAX}
                autoFocus
                onChange={(e) => setDraftName(e.target.value)}
                placeholder="e.g. Daniel, or D.A."
                className="w-full rounded-xl border border-ink-300 bg-card px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-flame-700 mb-1">
                Note (optional, private)
              </label>
              <input
                type="text"
                value={draftNote}
                maxLength={NOTE_MAX}
                onChange={(e) => setDraftNote(e.target.value)}
                placeholder="e.g. my neighbour; lost his father last year"
                className="w-full rounded-xl border border-ink-300 bg-card px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400"
              />
            </div>
          </div>
          {error && <p className="mt-2 text-xs text-red-700">{error}</p>}
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={submitAdd}
              className="rounded-full bg-flame-600 text-ink-50 px-4 py-1.5 text-sm hover:bg-flame-700"
            >
              Add to the list
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setError(null);
                setDraftName("");
                setDraftNote("");
              }}
              className="rounded-full border border-ink-300 text-ink-700 bg-card px-4 py-1.5 text-sm hover:border-ink-900"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {all.length > 0 && (
        <div className="mt-6 grid grid-cols-3 gap-3">
          <Stat label="Walking with" value={walking.length} tone="flame" />
          <Stat label="Rejoicing in" value={rejoicing.length} tone="emerald" />
          <Stat
            label="To pray for today"
            value={unprayedToday.length}
            tone={unprayedToday.length > 0 ? "amber" : "ink"}
          />
        </div>
      )}

      {all.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {(["walking", "rejoicing"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              aria-pressed={view === v}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                view === v
                  ? "bg-ink-900 text-ink-50 border-ink-900"
                  : "bg-card text-ink-700 border-ink-300 hover:border-ink-900"
              }`}
            >
              {v === "walking"
                ? `Walking with (${walking.length})`
                : `Rejoicing in (${rejoicing.length})`}
            </button>
          ))}
        </div>
      )}

      {all.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-ink-200 bg-card-subtle p-6 text-center">
          <p className="text-sm text-ink-700 italic leading-relaxed">
            The list is empty. Start with one person — a neighbour, a sibling, a
            colleague, someone you grieve for — and add them as a quiet first
            step in your intercession.
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-ink-200 bg-card-subtle p-6 text-center text-sm text-ink-600 italic">
          {view === "walking"
            ? "Everyone you were walking with has been moved to rejoicing in. Keep watching."
            : "No one in rejoicing in yet. The Lord is patient with names you've barely added."}
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {filtered.map((p) => (
            <li
              key={p.id}
              className={`rounded-2xl border p-4 md:p-5 ${
                !isWalking(p)
                  ? "border-emerald-300 bg-emerald-50/60"
                  : "border-ink-200 bg-card"
              }`}
            >
              {editingId === p.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editName}
                    maxLength={NAME_MAX}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full rounded-xl border border-ink-300 bg-card px-3 py-2 text-sm text-ink-900"
                  />
                  <input
                    type="text"
                    value={editNote}
                    maxLength={NOTE_MAX}
                    onChange={(e) => setEditNote(e.target.value)}
                    className="w-full rounded-xl border border-ink-300 bg-card px-3 py-2 text-sm text-ink-900"
                  />
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => saveEdit(p.id)}
                      className="rounded-full bg-flame-600 text-ink-50 px-3 py-1.5 text-xs hover:bg-flame-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="rounded-full border border-ink-300 text-ink-700 bg-card px-3 py-1.5 text-xs hover:border-ink-900"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-serif text-lg text-ink-900">{p.name}</h3>
                      {p.note && (
                        <p className="text-sm text-ink-700 italic leading-snug mt-0.5">
                          {p.note}
                        </p>
                      )}
                    </div>
                    <div className="text-[11px] text-ink-500 shrink-0">
                      added {formatRelative(p.addedAt)}
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-ink-500">
                    {isWalking(p) ? (
                      <span>
                        last prayed{" "}
                        <span className="text-ink-700 font-medium">
                          {formatRelative(lastPrayedDate(p))}
                        </span>
                      </span>
                    ) : (
                      <span className="text-emerald-700">
                        met the Lord {formatRelative(p.metJesusAt)} ✓
                      </span>
                    )}
                    <span>·</span>
                    <span>
                      prayed{" "}
                      {p.prayedAt.length}{" "}
                      {p.prayedAt.length === 1 ? "day" : "days"}
                    </span>
                    {p.sharedAt && (
                      <span className="rounded-full bg-emerald-100 text-emerald-900 px-2 py-0.5 text-[10px]">
                        Shared
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {isWalking(p) ? (
                      <>
                        <PrayedButton
                          onPray={() => markPrayed(p.id)}
                          alreadyToday={isPrayedToday(p)}
                        />
                        <button
                          onClick={() => markMetJesus(p.id)}
                          className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-ink-50 px-3 py-1.5 text-xs"
                        >
                          The Lord met them ✓
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => markStillWalking(p.id)}
                        className="rounded-full border border-flame-300 text-flame-800 bg-flame-50 px-3 py-1.5 text-xs hover:border-flame-500"
                      >
                        Still walking with
                      </button>
                    )}
                    <button
                      onClick={() => startEdit(p)}
                      className="rounded-full border border-ink-300 text-ink-700 bg-card px-3 py-1.5 text-xs hover:border-ink-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => remove(p.id)}
                      className="rounded-full border border-red-200 text-red-700 bg-red-50/50 px-3 py-1.5 text-xs hover:bg-red-100"
                    >
                      Remove
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      <p className="mt-6 text-[11px] text-ink-500 leading-relaxed">
        These names live on this device by default. If you sign in and turn on
        cloud sync, they travel with your profile across devices automatically.
      </p>
    </div>
  );
}

function PrayedButton({ onPray, alreadyToday }: { onPray: () => void; alreadyToday: boolean }) {
  const [feedback, setFeedback] = useState<string | null>(null);
  return (
    <button
      onClick={() => {
        if (!alreadyToday) {
          onPray();
          setFeedback("Prayed ✓");
        } else {
          setFeedback("Already today ✓");
        }
        setTimeout(() => setFeedback(null), 1800);
      }}
      className={`rounded-full px-3 py-1.5 text-xs ${
        alreadyToday
          ? "border border-emerald-300 text-emerald-800 bg-emerald-50"
          : "bg-flame-600 hover:bg-flame-700 text-ink-50"
      }`}
    >
      {feedback ?? (alreadyToday ? "Prayed today ✓" : "Prayed today")}
    </button>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "flame" | "emerald" | "amber" | "ink";
}) {
  const toneCls =
    tone === "flame"
      ? "border-flame-200 bg-flame-50/60"
      : tone === "emerald"
        ? "border-emerald-200 bg-emerald-50/60"
        : tone === "amber"
          ? "border-amber-300 bg-amber-50"
          : "border-ink-200 bg-card-subtle";
  return (
    <div className={`rounded-2xl border p-3 ${toneCls}`}>
      <div className="text-[10px] uppercase tracking-widest text-flame-700">{label}</div>
      <div className="font-serif text-3xl text-ink-900 mt-0.5 tabular-nums">{value}</div>
    </div>
  );
}
