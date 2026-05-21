"use client";

import { slotKey, SLOT_CHANGE_EVENT } from "@/lib/slots";

/* ──────────────────────────────────────────────────────────────────
   The Names — people each believer carries in prayer.

   The /me promise has long included "the people you carry", but until
   now there was no actual place to keep them. This module is that
   place. Lives ONLY in localStorage; nothing is ever sent to a server.
   Carried between devices via the encrypted device bridge.

   Editorial framing:
     • "walking with"  — someone you are praying for / studying with
     • "rejoicing in"  — someone the Lord has met (you don't stop praying
                          for them, but you change posture from petition
                          to thanksgiving)
     • There is no "given up". A name once added is yours to keep.

   Per-slot: each believer on the device has their own list of names.
────────────────────────────────────────────────────────────────── */

const KEY_BASE = "scripture-theory-names";

export type NameStatus = "walking-with" | "rejoicing-in";

export type CarriedName = {
  id: string;
  /** First name, nickname, or initials — your choice. */
  name: string;
  /** One quiet line — how you met, what you're praying for. */
  note: string;
  status: NameStatus;
  addedAt: string;
  /** ISO date string of the most recent "prayed today" tap. */
  lastPrayedAt?: string;
  /** Set when you mark "the Lord met them". */
  metJesusAt?: string;
  /**
   * Local count of times you've tapped "prayed today". Honest cap at
   * 10,000 to keep the field bounded if someone leans on the button.
   */
  prayedCount: number;
};

const MAX_PER_LIST = 200;
const NAME_MAX = 64;
const NOTE_MAX = 280;
const COUNT_MAX = 10_000;

/** Custom event fired when the names list changes — UI listens to refresh. */
export const NAMES_CHANGE_EVENT = "scripture-theory:names-change";

function emit() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(NAMES_CHANGE_EVENT));
  }
}

function read(): CarriedName[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(slotKey(KEY_BASE));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isCarriedName) : [];
  } catch {
    return [];
  }
}

function write(list: CarriedName[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(slotKey(KEY_BASE), JSON.stringify(list));
    emit();
  } catch {}
}

function isCarriedName(x: unknown): x is CarriedName {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.name === "string" &&
    typeof o.note === "string" &&
    (o.status === "walking-with" || o.status === "rejoicing-in") &&
    typeof o.addedAt === "string" &&
    typeof o.prayedCount === "number"
  );
}

function newId(): string {
  return `n_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
}

export function listNames(): CarriedName[] {
  return read();
}

export type AddInput = { name: string; note?: string };

export function validateName(n: AddInput): { ok: boolean; error?: string } {
  const name = n.name.trim();
  const note = (n.note ?? "").trim();
  if (name.length < 1) return { ok: false, error: "A name (or initials) is needed." };
  if (name.length > NAME_MAX) return { ok: false, error: `Name max ${NAME_MAX} characters.` };
  if (note.length > NOTE_MAX) return { ok: false, error: `Note max ${NOTE_MAX} characters.` };
  return { ok: true };
}

export function addName(input: AddInput): { ok: boolean; name?: CarriedName; error?: string } {
  const v = validateName(input);
  if (!v.ok) return { ok: false, error: v.error };
  const list = read();
  if (list.length >= MAX_PER_LIST) {
    return { ok: false, error: `You're already carrying ${MAX_PER_LIST} names — archive a few first.` };
  }
  const entry: CarriedName = {
    id: newId(),
    name: input.name.trim(),
    note: (input.note ?? "").trim(),
    status: "walking-with",
    addedAt: new Date().toISOString(),
    prayedCount: 0,
  };
  write([entry, ...list]);
  return { ok: true, name: entry };
}

export function updateName(
  id: string,
  patch: { name?: string; note?: string },
): { ok: boolean; error?: string } {
  const list = read();
  const idx = list.findIndex((n) => n.id === id);
  if (idx < 0) return { ok: false, error: "Not found." };
  const next: CarriedName = {
    ...list[idx],
    name: patch.name !== undefined ? patch.name.trim() : list[idx].name,
    note: patch.note !== undefined ? patch.note.trim() : list[idx].note,
  };
  const v = validateName({ name: next.name, note: next.note });
  if (!v.ok) return { ok: false, error: v.error };
  list[idx] = next;
  write(list);
  return { ok: true };
}

/** Tap once a day — marks lastPrayedAt to today and bumps the count. */
export function markPrayed(id: string): { ok: boolean; alreadyToday?: boolean } {
  const list = read();
  const idx = list.findIndex((n) => n.id === id);
  if (idx < 0) return { ok: false };
  const today = todayKey();
  const lastKey = list[idx].lastPrayedAt ? list[idx].lastPrayedAt!.slice(0, 10) : null;
  if (lastKey === today) {
    return { ok: true, alreadyToday: true };
  }
  list[idx] = {
    ...list[idx],
    lastPrayedAt: new Date().toISOString(),
    prayedCount: Math.min(COUNT_MAX, list[idx].prayedCount + 1),
  };
  write(list);
  return { ok: true };
}

/** Move to "rejoicing in" — the Lord met them. */
export function markMetJesus(id: string): { ok: boolean } {
  const list = read();
  const idx = list.findIndex((n) => n.id === id);
  if (idx < 0) return { ok: false };
  list[idx] = {
    ...list[idx],
    status: "rejoicing-in",
    metJesusAt: list[idx].metJesusAt ?? new Date().toISOString(),
  };
  write(list);
  return { ok: true };
}

/** Quietly restore to "walking with" — sometimes a profession needs more time. */
export function markStillWalking(id: string): { ok: boolean } {
  const list = read();
  const idx = list.findIndex((n) => n.id === id);
  if (idx < 0) return { ok: false };
  list[idx] = { ...list[idx], status: "walking-with", metJesusAt: undefined };
  write(list);
  return { ok: true };
}

export function removeName(id: string): { ok: boolean } {
  const list = read();
  const next = list.filter((n) => n.id !== id);
  if (next.length === list.length) return { ok: false };
  write(next);
  return { ok: true };
}

/* ──────────────────────────────────────────────────────────────────
   Aggregates
────────────────────────────────────────────────────────────────── */

export function countByStatus(): { walkingWith: number; rejoicingIn: number; total: number } {
  const list = read();
  let walkingWith = 0;
  let rejoicingIn = 0;
  for (const n of list) {
    if (n.status === "walking-with") walkingWith++;
    else rejoicingIn++;
  }
  return { walkingWith, rejoicingIn, total: list.length };
}

/** Names not yet prayed for today (status = walking-with) — used for nudges. */
export function unprayedToday(): CarriedName[] {
  const today = todayKey();
  return read().filter(
    (n) =>
      n.status === "walking-with" &&
      (!n.lastPrayedAt || n.lastPrayedAt.slice(0, 10) !== today),
  );
}

/* ──────────────────────────────────────────────────────────────────
   Helpers
────────────────────────────────────────────────────────────────── */

function todayKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

export function daysSince(iso: string | undefined): number | null {
  if (!iso) return null;
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return null;
  return Math.max(0, Math.floor((Date.now() - then) / 86_400_000));
}

export function formatRelative(iso: string | undefined): string {
  const d = daysSince(iso);
  if (d === null) return "never";
  if (d === 0) return "today";
  if (d === 1) return "yesterday";
  if (d < 7) return `${d} days ago`;
  if (d < 30) return `${Math.floor(d / 7)} weeks ago`;
  if (d < 365) return `${Math.floor(d / 30)} months ago`;
  return `${Math.floor(d / 365)} years ago`;
}

/** React hook helper — subscribe to slot + names changes. */
export function namesSubscribe(handler: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(NAMES_CHANGE_EVENT, handler);
  window.addEventListener(SLOT_CHANGE_EVENT, handler);
  // localStorage changes from other tabs
  const storage = (e: StorageEvent) => {
    if (!e.key || e.key.startsWith(KEY_BASE)) handler();
  };
  window.addEventListener("storage", storage);
  return () => {
    window.removeEventListener(NAMES_CHANGE_EVENT, handler);
    window.removeEventListener(SLOT_CHANGE_EVENT, handler);
    window.removeEventListener("storage", storage);
  };
}
