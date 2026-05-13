"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CUSTOM_PLANS_BASE,
  SLOT_CHANGE_EVENT,
  emptyPlan,
  loadCustomPlans,
  newDay,
  saveCustomPlans,
  type CustomReadingDay,
  type CustomReadingPlan,
} from "@/lib/custom-plans";
import { referenceHref } from "@/lib/reference";
import { Glyph } from "@/components/ui/Glyph";

/* ──────────────────────────────────────────────────────────────────
   ReadingPlanBuilder — add/edit/remove custom reading plans + their
   per-day entries. All on-device, per-slot.
────────────────────────────────────────────────────────────────── */

export default function ReadingPlanBuilder() {
  const [plans, setPlans] = useState<CustomReadingPlan[]>([]);
  const [editing, setEditing] = useState<CustomReadingPlan | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setPlans(loadCustomPlans());
    setMounted(true);
    if (typeof window === "undefined") return;
    const onSlot = () => {
      setPlans(loadCustomPlans());
      setEditing(null);
    };
    window.addEventListener(SLOT_CHANGE_EVENT, onSlot);
    return () => window.removeEventListener(SLOT_CHANGE_EVENT, onSlot);
  }, []);

  function persist(next: CustomReadingPlan[]) {
    setPlans(next);
    saveCustomPlans(next);
  }

  function startNew() {
    setEditing(emptyPlan());
  }

  function startEdit(p: CustomReadingPlan) {
    setEditing(JSON.parse(JSON.stringify(p)) as CustomReadingPlan);
  }

  function cancel() {
    setEditing(null);
  }

  function commit() {
    if (!editing) return;
    const trimmed: CustomReadingPlan = {
      ...editing,
      name: editing.name.trim() || "Untitled plan",
      tagline: editing.tagline?.trim() || undefined,
      description: editing.description?.trim() || undefined,
      days: editing.days
        .filter((d) => (d.reference ?? "").trim().length > 0)
        .map((d, i) => ({ ...d, day: i + 1 })),
    };
    const exists = plans.some((p) => p.id === trimmed.id);
    const next = exists
      ? plans.map((p) => (p.id === trimmed.id ? trimmed : p))
      : [...plans, trimmed];
    persist(next);
    setEditing(null);
  }

  function remove(id: string) {
    if (typeof window !== "undefined" && !window.confirm("Delete this plan?")) return;
    persist(plans.filter((p) => p.id !== id));
  }

  function addDay() {
    if (!editing) return;
    setEditing({ ...editing, days: [...editing.days, newDay(editing.days.length + 1)] });
  }

  function updateDay(idx: number, patch: Partial<CustomReadingDay>) {
    if (!editing) return;
    const days = editing.days.map((d, i) => (i === idx ? { ...d, ...patch } : d));
    setEditing({ ...editing, days });
  }

  function removeDay(idx: number) {
    if (!editing) return;
    const days = editing.days.filter((_, i) => i !== idx).map((d, i) => ({ ...d, day: i + 1 }));
    setEditing({ ...editing, days });
  }

  function exportJson(plan: CustomReadingPlan) {
    const blob = new Blob([JSON.stringify(plan, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `plan-${plan.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "plan"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!mounted) {
    return (
      <div className="rounded-3xl border border-ink-200 bg-card-subtle p-10 text-center text-ink-500">
        Loading your plans…
      </div>
    );
  }

  // EDIT MODE
  if (editing) {
    return (
      <div className="space-y-5">
        <div className="rounded-3xl border border-ink-200 bg-card p-6 md:p-7 space-y-4">
          <div className="flex items-baseline justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-flame-700">
                {plans.some((p) => p.id === editing.id) ? "Editing" : "New plan"}
              </div>
              <h2 className="font-serif text-2xl text-ink-900 mt-0.5">
                {editing.name || "Untitled plan"}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={commit}
                className="rounded-full bg-flame-600 text-ink-50 px-4 py-1.5 text-sm hover:bg-flame-500"
              >
                Save
              </button>
              <button
                onClick={cancel}
                className="rounded-full border border-ink-300 px-4 py-1.5 text-sm text-ink-700 hover:border-ink-900"
              >
                Cancel
              </button>
            </div>
          </div>

          <Field
            label="Plan name"
            value={editing.name}
            onChange={(v) => setEditing({ ...editing, name: v })}
            placeholder="Lent · 40 days through Mark"
            required
          />
          <Field
            label="Short tagline (optional)"
            value={editing.tagline ?? ""}
            onChange={(v) => setEditing({ ...editing, tagline: v })}
            placeholder="Walk with Jesus to the cross."
          />
          <div>
            <label className="text-[10px] uppercase tracking-widest text-flame-700">
              Description (optional)
            </label>
            <textarea
              value={editing.description ?? ""}
              onChange={(e) =>
                setEditing({ ...editing, description: e.target.value })
              }
              rows={2}
              className="mt-1.5 w-full rounded-xl border border-ink-200 bg-card-subtle px-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-flame-500"
            />
          </div>
        </div>

        {/* Days */}
        <div className="rounded-3xl border border-ink-200 bg-card p-6 md:p-7">
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-flame-700">Days</div>
              <h3 className="font-serif text-xl text-ink-900 mt-0.5">
                {editing.days.length} {editing.days.length === 1 ? "day" : "days"}
              </h3>
            </div>
            <button
              onClick={addDay}
              className="rounded-full bg-ink-900 text-ink-50 px-4 py-1.5 text-sm hover:bg-flame-700"
            >
              + Add a day
            </button>
          </div>

          {editing.days.length === 0 ? (
            <p className="text-sm text-ink-500 italic text-center py-6">
              No days yet. Add one to start.
            </p>
          ) : (
            <ol className="space-y-3">
              {editing.days.map((d, i) => (
                <li
                  key={i}
                  className="rounded-2xl border border-ink-200 bg-card-subtle p-4"
                >
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <span className="font-serif text-lg text-flame-700">
                      Day {String(d.day).padStart(2, "0")}
                    </span>
                    <button
                      onClick={() => removeDay(i)}
                      className="text-xs text-ink-500 hover:text-ink-900"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Field
                      label="Passage reference"
                      value={d.reference}
                      onChange={(v) => updateDay(i, { reference: v })}
                      placeholder="John 3 · Mark 1:1–20 · Psalm 23"
                      required
                    />
                    <Field
                      label="Day title (optional)"
                      value={d.title ?? ""}
                      onChange={(v) => updateDay(i, { title: v })}
                      placeholder="Born again"
                    />
                  </div>
                  <div className="mt-3">
                    <label className="text-[10px] uppercase tracking-widest text-flame-700">
                      Short meditation (optional)
                    </label>
                    <textarea
                      value={d.meditation ?? ""}
                      onChange={(e) => updateDay(i, { meditation: e.target.value })}
                      rows={2}
                      placeholder="One sentence to carry through the day."
                      className="mt-1.5 w-full rounded-xl border border-ink-200 bg-card px-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-flame-500"
                    />
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>

        <p className="text-xs text-ink-500 italic">
          Saved on this device, per walk. Switch walks on{" "}
          <Link href="/me" className="text-flame-700 hover:underline">
            /me
          </Link>{" "}
          to keep plans separate per believer.
        </p>
      </div>
    );
  }

  // LIST MODE
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif text-2xl text-ink-900">Your plans</h2>
        <button
          onClick={startNew}
          className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-500"
        >
          + New plan
        </button>
      </div>

      {plans.length === 0 ? (
        <div className="rounded-3xl border border-ink-200 bg-card-subtle p-10 text-center">
          <Glyph
            id="open-book"
            size={48}
            className="text-flame-700/40 mx-auto mb-4"
          />
          <p className="text-sm text-ink-600 italic max-w-md mx-auto">
            No custom plans yet. Build a 40-day Lenten walk, a 30-day path for a friend
            who just said yes, a year through the Psalms, or anything else the Spirit
            puts in front of you.
          </p>
          <button
            onClick={startNew}
            className="mt-5 inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-500"
          >
            Start your first plan →
          </button>
        </div>
      ) : (
        <ul className="grid sm:grid-cols-2 gap-3 md:gap-4">
          {plans.map((p) => (
            <li
              key={p.id}
              className="rounded-3xl border border-ink-200 bg-card p-5"
            >
              <div className="text-[10px] uppercase tracking-widest text-flame-700">
                {p.days.length} {p.days.length === 1 ? "day" : "days"} · custom
              </div>
              <h3 className="font-serif text-xl text-ink-900 mt-1">
                {p.name || "Untitled plan"}
              </h3>
              {p.tagline && (
                <p className="text-sm text-ink-600 italic mt-0.5">{p.tagline}</p>
              )}
              {p.description && (
                <p className="text-sm text-ink-700 mt-2 leading-relaxed line-clamp-3">
                  {p.description}
                </p>
              )}

              {p.days.length > 0 && (
                <ul className="mt-3 space-y-1 text-xs text-ink-600">
                  {p.days.slice(0, 4).map((d) => {
                    const href = referenceHref(d.reference);
                    return (
                      <li key={d.day} className="truncate">
                        <span className="text-flame-700">Day {d.day}:</span>{" "}
                        {href ? (
                          <Link href={href} className="hover:underline">
                            {d.reference}
                          </Link>
                        ) : (
                          <span>{d.reference}</span>
                        )}
                        {d.title && <span className="text-ink-500"> · {d.title}</span>}
                      </li>
                    );
                  })}
                  {p.days.length > 4 && (
                    <li className="text-ink-400">+ {p.days.length - 4} more</li>
                  )}
                </ul>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => startEdit(p)}
                  className="text-xs rounded-full bg-ink-900 text-ink-50 px-3 py-1 hover:bg-flame-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => exportJson(p)}
                  className="text-xs rounded-full border border-ink-300 px-3 py-1 text-ink-700 hover:border-ink-900"
                >
                  Export
                </button>
                <button
                  onClick={() => remove(p.id)}
                  className="text-xs rounded-full border border-ink-300 px-3 py-1 text-ink-500 hover:text-ink-900 hover:border-ink-900 ml-auto"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest text-flame-700">{label}</span>
      <input
        type="text"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-ink-200 bg-card px-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-flame-500"
      />
    </label>
  );
}
