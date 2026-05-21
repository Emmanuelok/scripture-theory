"use client";

import { useEffect, useState } from "react";
import {
  type CarriedName,
  addName,
  countByStatus,
  formatRelative,
  listNames,
  markMetJesus,
  markPrayed,
  markStillWalking,
  namesSubscribe,
  removeName,
  unprayedToday,
  updateName,
  validateName,
} from "@/lib/names";

type View = "walking" | "rejoicing";

export default function NamesPanel() {
  const [mounted, setMounted] = useState(false);
  const [names, setNames] = useState<CarriedName[]>([]);
  const [view, setView] = useState<View>("walking");

  // Add form
  const [showForm, setShowForm] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [draftNote, setDraftNote] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editNote, setEditNote] = useState("");

  useEffect(() => {
    setMounted(true);
    setNames(listNames());
    return namesSubscribe(() => setNames(listNames()));
  }, []);

  if (!mounted) {
    return (
      <div className="rounded-3xl border border-ink-200 bg-card p-6 text-ink-500">
        Loading the names…
      </div>
    );
  }

  const counts = countByStatus();
  const unprayed = unprayedToday();
  const filtered = names.filter((n) =>
    view === "walking" ? n.status === "walking-with" : n.status === "rejoicing-in",
  );

  function submitAdd() {
    setError(null);
    const v = validateName({ name: draftName, note: draftNote });
    if (!v.ok) {
      setError(v.error ?? "Couldn't add.");
      return;
    }
    const res = addName({ name: draftName, note: draftNote });
    if (!res.ok) {
      setError(res.error ?? "Couldn't add.");
      return;
    }
    setDraftName("");
    setDraftNote("");
    setShowForm(false);
  }

  function startEdit(n: CarriedName) {
    setEditingId(n.id);
    setEditName(n.name);
    setEditNote(n.note);
  }

  function saveEdit(id: string) {
    const res = updateName(id, { name: editName, note: editNote });
    if (!res.ok) {
      setError(res.error ?? "Couldn't update.");
      return;
    }
    setEditingId(null);
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
        Names live only on this device. Pray for them by name, mark a quiet
        &ldquo;prayed today&rdquo; tap, and one day move them across to{" "}
        <em>rejoicing in</em> when the Lord meets them. No one else ever sees this list.
      </p>

      {/* Add form */}
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
                maxLength={64}
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
                maxLength={280}
                onChange={(e) => setDraftNote(e.target.value)}
                placeholder="e.g. my neighbour; lost his father last year"
                className="w-full rounded-xl border border-ink-300 bg-card px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400"
              />
            </div>
          </div>
          {error && (
            <p className="mt-2 text-xs text-red-700">{error}</p>
          )}
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

      {/* Summary + nudges */}
      {counts.total > 0 && (
        <div className="mt-6 grid grid-cols-3 gap-3">
          <Stat label="Walking with" value={counts.walkingWith} tone="flame" />
          <Stat label="Rejoicing in" value={counts.rejoicingIn} tone="emerald" />
          <Stat
            label="To pray for today"
            value={unprayed.length}
            tone={unprayed.length > 0 ? "amber" : "ink"}
          />
        </div>
      )}

      {/* Tabs (only when there's anything in either bucket) */}
      {counts.total > 0 && (
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
                ? `Walking with (${counts.walkingWith})`
                : `Rejoicing in (${counts.rejoicingIn})`}
            </button>
          ))}
        </div>
      )}

      {/* Empty / list */}
      {counts.total === 0 ? (
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
          {filtered.map((n) => (
            <li
              key={n.id}
              className={`rounded-2xl border p-4 md:p-5 ${
                n.status === "rejoicing-in"
                  ? "border-emerald-300 bg-emerald-50/60"
                  : "border-ink-200 bg-card"
              }`}
            >
              {editingId === n.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editName}
                    maxLength={64}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full rounded-xl border border-ink-300 bg-card px-3 py-2 text-sm text-ink-900"
                  />
                  <input
                    type="text"
                    value={editNote}
                    maxLength={280}
                    onChange={(e) => setEditNote(e.target.value)}
                    className="w-full rounded-xl border border-ink-300 bg-card px-3 py-2 text-sm text-ink-900"
                  />
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => saveEdit(n.id)}
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
                      <h3 className="font-serif text-lg text-ink-900">{n.name}</h3>
                      {n.note && (
                        <p className="text-sm text-ink-700 italic leading-snug mt-0.5">
                          {n.note}
                        </p>
                      )}
                    </div>
                    <div className="text-[11px] text-ink-500 shrink-0">
                      added {formatRelative(n.addedAt)}
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-ink-500">
                    {n.status === "walking-with" ? (
                      <span>
                        last prayed{" "}
                        <span className="text-ink-700 font-medium">
                          {formatRelative(n.lastPrayedAt)}
                        </span>
                      </span>
                    ) : (
                      <span className="text-emerald-700">
                        met the Lord {formatRelative(n.metJesusAt)} ✓
                      </span>
                    )}
                    <span>·</span>
                    <span>
                      prayed {n.prayedCount}× over{" "}
                      {formatRelative(n.addedAt)}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {n.status === "walking-with" ? (
                      <>
                        <PrayedButton id={n.id} alreadyToday={isToday(n.lastPrayedAt)} />
                        <button
                          onClick={() => markMetJesus(n.id)}
                          className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-ink-50 px-3 py-1.5 text-xs"
                        >
                          The Lord met them ✓
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => markStillWalking(n.id)}
                        className="rounded-full border border-flame-300 text-flame-800 bg-flame-50 px-3 py-1.5 text-xs hover:border-flame-500"
                      >
                        Still walking with
                      </button>
                    )}
                    <button
                      onClick={() => startEdit(n)}
                      className="rounded-full border border-ink-300 text-ink-700 bg-card px-3 py-1.5 text-xs hover:border-ink-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Remove "${n.name}" from the list? You can always re-add.`)) {
                          removeName(n.id);
                        }
                      }}
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
        These names are device-local — no servers, no cloud. To move them to
        another device, use the encrypted bundle on this page.
      </p>
    </div>
  );
}

function isToday(iso: string | undefined): boolean {
  if (!iso) return false;
  return iso.slice(0, 10) === new Date().toISOString().slice(0, 10);
}

function PrayedButton({ id, alreadyToday }: { id: string; alreadyToday: boolean }) {
  const [feedback, setFeedback] = useState<string | null>(null);
  return (
    <button
      onClick={() => {
        const res = markPrayed(id);
        if (res.alreadyToday) {
          setFeedback("Already today ✓");
        } else if (res.ok) {
          setFeedback("Prayed ✓");
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
