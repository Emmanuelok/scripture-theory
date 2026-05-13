"use client";

import { useEffect, useState } from "react";
import {
  addSlot,
  activeSlotId,
  DEFAULT_SLOT_ID,
  emojiPalette,
  loadSlots,
  removeSlot,
  renameSlot,
  setActiveSlot,
  SLOT_CHANGE_EVENT,
  type Slot,
} from "@/lib/slots";

/* ──────────────────────────────────────────────────────────────────
   ProfileSwitcher — multiple believers on one device.

   Shows the active slot's avatar + name, opens a modal listing every
   slot with switch / add / rename / remove. Each slot has a private
   profile, reading progress, Bible marks, and pathway. Theme, locale,
   and accessibility stay shared on the device.
────────────────────────────────────────────────────────────────── */

export default function ProfileSwitcher({
  variant = "default",
}: {
  variant?: "default" | "hero";
}) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [activeId, setActive] = useState<string>(DEFAULT_SLOT_ID);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState("");
  const [draftEmoji, setDraftEmoji] = useState("🕊");
  const [newName, setNewName] = useState("");
  const [newEmoji, setNewEmoji] = useState("✨");
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    function refresh() {
      setSlots(loadSlots());
      setActive(activeSlotId());
    }
    refresh();
    if (typeof window === "undefined") return;
    const onSlot = () => refresh();
    window.addEventListener(SLOT_CHANGE_EVENT, onSlot);
    return () => window.removeEventListener(SLOT_CHANGE_EVENT, onSlot);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const active = slots.find((s) => s.id === activeId) ?? slots[0];

  function chooseSlot(id: string) {
    if (id === activeId) {
      setOpen(false);
      return;
    }
    setActiveSlot(id);
    setOpen(false);
  }

  function startEdit(s: Slot) {
    setEditingId(s.id);
    setDraftName(s.name);
    setDraftEmoji(s.emoji ?? "🕊");
  }
  function commitEdit() {
    if (!editingId) return;
    renameSlot(editingId, { name: draftName, emoji: draftEmoji });
    setSlots(loadSlots());
    setEditingId(null);
  }
  function cancelEdit() {
    setEditingId(null);
  }
  function commitAdd() {
    const name = newName.trim();
    if (!name) return;
    addSlot(name, newEmoji);
    setNewName("");
    setNewEmoji("✨");
    setShowAdd(false);
    setSlots(loadSlots());
    setActive(activeSlotId());
    setOpen(false);
  }
  function confirmRemove(id: string) {
    if (id === DEFAULT_SLOT_ID) return;
    if (
      typeof window !== "undefined" &&
      !window.confirm(
        "Remove this walk and erase its data from this device? This cannot be undone."
      )
    )
      return;
    removeSlot(id, { wipe: true });
    setSlots(loadSlots());
    setActive(activeSlotId());
  }

  const trigger =
    variant === "hero" ? (
      <button
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-3 rounded-2xl border border-ink-700 bg-ink-800/40 hover:border-flame-500/60 transition-colors px-3 py-2 text-left"
        title="Switch profile"
      >
        <span className="text-2xl leading-none" aria-hidden>
          {active?.emoji ?? "🕊"}
        </span>
        <span className="min-w-0">
          <div className="text-[10px] uppercase tracking-widest text-flame-300">Walk</div>
          <div className="font-serif text-ink-50 leading-tight truncate max-w-[10rem]">
            {active?.name ?? "Me"}
          </div>
        </span>
        <span className="text-ink-300 ml-1" aria-hidden>
          ↕
        </span>
      </button>
    ) : (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-card px-3 py-1.5 text-xs text-ink-700 hover:border-flame-500"
        title="Switch profile"
      >
        <span aria-hidden>{active?.emoji ?? "🕊"}</span>
        <span className="font-medium">{active?.name ?? "Me"}</span>
        <span className="text-ink-400" aria-hidden>
          ↕
        </span>
      </button>
    );

  return (
    <>
      {trigger}

      {open && (
        <>
          <div
            className="fixed inset-0 z-50 bg-ink-900/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Switch profile"
          >
            <div
              className="relative w-full max-w-md rounded-3xl border border-ink-200 bg-card p-5 md:p-6 shadow-2xl max-h-[92vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-baseline justify-between gap-2">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-flame-700">
                    Household
                  </div>
                  <h3 className="font-serif text-xl text-ink-900 mt-0.5">
                    Whose walk is this?
                  </h3>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-xs text-ink-500 hover:text-ink-900"
                  aria-label="Close"
                >
                  Close ✕
                </button>
              </div>

              <p className="mt-1 text-xs text-ink-600 leading-relaxed">
                Each walk has its own profile, reading progress, and Bible marks. Theme and language
                stay shared on this device.
              </p>

              <ul className="mt-4 space-y-2">
                {slots.map((s) => {
                  const isActive = s.id === activeId;
                  const isEditing = editingId === s.id;
                  return (
                    <li key={s.id}>
                      {isEditing ? (
                        <div className="rounded-2xl border border-flame-300 bg-flame-50/30 p-3">
                          <div className="flex flex-wrap gap-2">
                            {emojiPalette().map((e) => (
                              <button
                                key={e}
                                onClick={() => setDraftEmoji(e)}
                                className={[
                                  "h-9 w-9 rounded-xl flex items-center justify-center text-lg",
                                  draftEmoji === e
                                    ? "bg-ink-900 text-ink-50"
                                    : "bg-card hover:bg-card-subtle",
                                ].join(" ")}
                              >
                                {e}
                              </button>
                            ))}
                          </div>
                          <input
                            value={draftName}
                            onChange={(e) => setDraftName(e.target.value)}
                            maxLength={40}
                            className="mt-2 w-full rounded-xl border border-ink-200 bg-card px-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-flame-500"
                          />
                          <div className="mt-2 flex gap-2">
                            <button
                              onClick={commitEdit}
                              className="text-xs rounded-full bg-flame-600 text-ink-50 px-3 py-1 hover:bg-flame-500"
                            >
                              Save
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="text-xs rounded-full border border-ink-300 px-3 py-1 text-ink-600 hover:border-ink-900"
                            >
                              Cancel
                            </button>
                            {s.id !== DEFAULT_SLOT_ID && (
                              <button
                                onClick={() => {
                                  setEditingId(null);
                                  confirmRemove(s.id);
                                }}
                                className="ml-auto text-xs rounded-full border border-ink-300 px-3 py-1 text-ink-500 hover:text-ink-900 hover:border-ink-900"
                              >
                                Remove walk
                              </button>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div
                          className={[
                            "group rounded-2xl border p-3 flex items-center gap-3",
                            isActive
                              ? "border-flame-500 bg-flame-50/40"
                              : "border-ink-200 bg-card hover:border-flame-500/60",
                          ].join(" ")}
                        >
                          <button
                            onClick={() => chooseSlot(s.id)}
                            className="flex items-center gap-3 flex-1 min-w-0 text-left"
                          >
                            <span className="text-2xl leading-none" aria-hidden>
                              {s.emoji ?? "🕊"}
                            </span>
                            <span className="min-w-0">
                              <div className="font-serif text-ink-900 truncate">
                                {s.name}
                                {isActive && (
                                  <span className="ml-2 inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-2 py-0.5 text-[9px] uppercase tracking-widest align-middle">
                                    Active
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] uppercase tracking-widest text-ink-500">
                                {s.id === DEFAULT_SLOT_ID ? "Default walk" : "Added"}
                              </div>
                            </span>
                          </button>
                          <button
                            onClick={() => startEdit(s)}
                            className="shrink-0 text-xs text-ink-500 hover:text-ink-900 px-2 py-1"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Add a new walk */}
              <div className="mt-4 rounded-2xl border border-ink-200 bg-card-subtle p-3">
                {!showAdd ? (
                  <button
                    onClick={() => setShowAdd(true)}
                    className="w-full text-sm text-flame-700 hover:text-flame-500 font-medium py-2"
                  >
                    + Add another walk
                  </button>
                ) : (
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-flame-700 mb-2">
                      Add a walk
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {emojiPalette().map((e) => (
                        <button
                          key={e}
                          onClick={() => setNewEmoji(e)}
                          className={[
                            "h-9 w-9 rounded-xl flex items-center justify-center text-lg",
                            newEmoji === e
                              ? "bg-ink-900 text-ink-50"
                              : "bg-card hover:bg-card-subtle",
                          ].join(" ")}
                        >
                          {e}
                        </button>
                      ))}
                    </div>
                    <input
                      autoFocus
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") commitAdd();
                      }}
                      maxLength={40}
                      placeholder="A name (e.g. Sarah · my son · Dad)"
                      className="w-full rounded-xl border border-ink-200 bg-card px-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-flame-500"
                    />
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={commitAdd}
                        disabled={!newName.trim()}
                        className="text-xs rounded-full bg-flame-600 text-ink-50 px-3 py-1 hover:bg-flame-500 disabled:opacity-50"
                      >
                        Add &amp; switch
                      </button>
                      <button
                        onClick={() => setShowAdd(false)}
                        className="text-xs rounded-full border border-ink-300 px-3 py-1 text-ink-600 hover:border-ink-900"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <p className="mt-3 text-[11px] text-ink-500 leading-relaxed">
                Switching reloads on-device data for that walk only. Nothing is shared between
                walks unless you opt in to cloud sync from{" "}
                <span className="text-flame-700">/account</span>.
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
