"use client";

import { slotKey, SLOT_CHANGE_EVENT } from "@/lib/slots";

/* ──────────────────────────────────────────────────────────────────
   Custom reading plans — written by the believer, saved on the
   device, per-slot. The shape mirrors data/readings.ts so the
   Reading Plan view can show custom plans alongside the bundled ones.
────────────────────────────────────────────────────────────────── */

export type CustomReadingDay = {
  day: number;
  reference: string;   // e.g. "John 3" or "Romans 8:18-39"
  title?: string;
  meditation?: string;
};

export type CustomReadingPlan = {
  id: string;          // "custom:<random>"
  name: string;
  tagline?: string;
  description?: string;
  createdAt: string;
  days: CustomReadingDay[];
};

const STORAGE_BASE = "scripture-theory-custom-plans";

function key() {
  return slotKey(STORAGE_BASE);
}

export function loadCustomPlans(): CustomReadingPlan[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key());
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as CustomReadingPlan[];
  } catch {
    return [];
  }
}

export function saveCustomPlans(plans: CustomReadingPlan[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key(), JSON.stringify(plans));
  } catch {}
}

function newId() {
  return `custom:${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
}

export function emptyPlan(): CustomReadingPlan {
  return {
    id: newId(),
    name: "",
    tagline: "",
    description: "",
    createdAt: new Date().toISOString(),
    days: [],
  };
}

export function newDay(dayNum: number): CustomReadingDay {
  return { day: dayNum, reference: "", title: "", meditation: "" };
}

export { STORAGE_BASE as CUSTOM_PLANS_BASE, SLOT_CHANGE_EVENT };
