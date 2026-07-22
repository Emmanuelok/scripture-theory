// Curated Kokoro voice presets for Scripture Theory.
//
// Kokoro ships ~28 English voices; we surface a small, hand-picked set that
// suit reading Scripture and lessons aloud — warm, clear, unhurried. We give
// each a plain display name (the raw ids like "af_heart" are Kokoro-internal).
// The `id` values must match Kokoro's voice keys exactly.

import type { KokoroVoiceId } from "@/lib/tts/kokoro";

export type VoicePreset = {
  id: KokoroVoiceId;
  /** Friendly name shown in the UI. */
  name: string;
  accent: "American" | "British";
  gender: "Female" | "Male";
  /** One-line character note. */
  blurb: string;
};

// Ordered best-first. The default (first) is a warm, high-grade female voice
// that reads narrative and Scripture naturally.
export const VOICE_PRESETS: VoicePreset[] = [
  { id: "af_heart",   name: "Grace",   accent: "American", gender: "Female", blurb: "Warm and expressive — the default reading voice." },
  { id: "bm_george",  name: "George",  accent: "British",  gender: "Male",   blurb: "Measured and dignified — a classic lectern reading." },
  { id: "am_michael", name: "Samuel",  accent: "American", gender: "Male",   blurb: "Steady and clear, easy to follow at length." },
  { id: "bf_emma",    name: "Eleanor", accent: "British",  gender: "Female", blurb: "Calm and articulate, gentle pacing." },
  { id: "af_bella",   name: "Bella",   accent: "American", gender: "Female", blurb: "Bright and engaged — good for lessons." },
  { id: "am_onyx",    name: "Jonah",   accent: "American", gender: "Male",   blurb: "Deep and grounded — a resonant narrator." },
];

export const DEFAULT_VOICE_ID: KokoroVoiceId = VOICE_PRESETS[0].id;

export function findVoice(id: string | null | undefined): VoicePreset {
  return VOICE_PRESETS.find((v) => v.id === id) ?? VOICE_PRESETS[0];
}
