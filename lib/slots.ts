"use client";

/* ──────────────────────────────────────────────────────────────────
   Slots — multiple believers on one device.

   Each slot has its own profile, reading-plan progress, Bible marks,
   and new-believer pathway. Theme, locale, accessibility, and the
   active Supabase auth session stay global to the device.

   The "default" slot uses the original storage keys, so existing
   data is preserved with zero migration.
────────────────────────────────────────────────────────────────── */

export type Slot = {
  id: string;            // "default" or a generated id
  name: string;          // displayed name
  emoji?: string;        // single-character avatar
  createdAt: string;
};

export const DEFAULT_SLOT_ID = "default";
const SLOTS_KEY = "scripture-theory-slots";
const ACTIVE_SLOT_KEY = "scripture-theory-active-slot";

/** Event fired when slot changes — components reload state on this. */
export const SLOT_CHANGE_EVENT = "scripture-theory:slot-change";

const EMOJI_PALETTE = ["🕊", "✨", "🌿", "🔥", "🌅", "📖", "🪔", "🌙", "🌾", "💧"];

function newId() {
  return `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
}

const DEFAULT_SLOT: Slot = {
  id: DEFAULT_SLOT_ID,
  name: "Me",
  emoji: "🕊",
  createdAt: "1970-01-01T00:00:00Z",
};

/** Read the list of slots (always contains at least the default). */
export function loadSlots(): Slot[] {
  if (typeof window === "undefined") return [DEFAULT_SLOT];
  try {
    const raw = window.localStorage.getItem(SLOTS_KEY);
    if (!raw) return [DEFAULT_SLOT];
    const parsed = JSON.parse(raw) as Slot[];
    if (!Array.isArray(parsed) || parsed.length === 0) return [DEFAULT_SLOT];
    // Ensure default is always present
    if (!parsed.some((s) => s.id === DEFAULT_SLOT_ID)) {
      parsed.unshift(DEFAULT_SLOT);
    }
    return parsed;
  } catch {
    return [DEFAULT_SLOT];
  }
}

function saveSlots(slots: Slot[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SLOTS_KEY, JSON.stringify(slots));
  } catch {}
}

/** ID of the currently active slot. */
export function activeSlotId(): string {
  if (typeof window === "undefined") return DEFAULT_SLOT_ID;
  try {
    return window.localStorage.getItem(ACTIVE_SLOT_KEY) || DEFAULT_SLOT_ID;
  } catch {
    return DEFAULT_SLOT_ID;
  }
}

/** Switch active slot and broadcast the change. */
export function setActiveSlot(id: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(ACTIVE_SLOT_KEY, id);
  } catch {}
  window.dispatchEvent(new CustomEvent(SLOT_CHANGE_EVENT, { detail: { id } }));
}

/**
 * Namespace a base storage key for the active slot.
 * The default slot keeps the legacy key (no migration).
 */
export function slotKey(base: string, slotId: string = activeSlotId()): string {
  if (slotId === DEFAULT_SLOT_ID) return base;
  return `${base}:${slotId}`;
}

/** Add a new slot and switch to it. Returns the created slot. */
export function addSlot(name: string, emoji?: string): Slot {
  const slots = loadSlots();
  const slot: Slot = {
    id: newId(),
    name: name.trim() || "Another walk",
    emoji: emoji || EMOJI_PALETTE[slots.length % EMOJI_PALETTE.length],
    createdAt: new Date().toISOString(),
  };
  slots.push(slot);
  saveSlots(slots);
  setActiveSlot(slot.id);
  return slot;
}

/** Rename a slot (or its emoji). */
export function renameSlot(id: string, patch: { name?: string; emoji?: string }) {
  const slots = loadSlots().map((s) =>
    s.id === id
      ? {
          ...s,
          name: patch.name?.trim() || s.name,
          emoji: patch.emoji ?? s.emoji,
        }
      : s
  );
  saveSlots(slots);
}

/** Per-slot keys we own (used by removeSlot to clean up). */
const PER_SLOT_BASES = [
  "scripture-theory-profile",
  "scripture-theory-progress",
  "scripture-theory-bible-marks",
  "scripture-theory-firstdays",
];

/**
 * Remove a slot and (optionally) wipe its data.
 * The default slot can never be removed.
 */
export function removeSlot(id: string, { wipe = true }: { wipe?: boolean } = {}) {
  if (id === DEFAULT_SLOT_ID || typeof window === "undefined") return;
  const slots = loadSlots().filter((s) => s.id !== id);
  saveSlots(slots);

  if (wipe) {
    for (const base of PER_SLOT_BASES) {
      try {
        window.localStorage.removeItem(slotKey(base, id));
      } catch {}
    }
  }

  // If we just removed the active slot, fall back to default
  if (activeSlotId() === id) setActiveSlot(DEFAULT_SLOT_ID);
}

export function emojiPalette(): readonly string[] {
  return EMOJI_PALETTE;
}
