// Resolve a pre-generated Bible-chapter recording, if one exists.
//
// The Listen player calls this first; when it returns a URL, that studio-quality
// recording plays instantly (zero model download). When it returns null — the
// default until audio has been generated — the player synthesises on-device.
//
// Audio files live in Supabase Storage (a public bucket) and are produced by
// `scripts/generate-bible-audio.mjs`, which also fills in the availability map
// in data/bible/audio-manifest.json. Keeping the map in the bundle means the
// reader knows what exists without a network round-trip.

import manifest from "@/data/bible/audio-manifest.json";
import type { TranslationId } from "@/data/bible/translations";

type Manifest = {
  version: number;
  voice: string;
  format: string;
  bucket: string;
  /** Optional CDN/base override. When empty, we derive the Supabase base. */
  baseUrl: string;
  /** Keys are `${translation}/${bookId}/${chapter}` → true. */
  chapters: Record<string, boolean>;
};

const m = manifest as Manifest;

/** `${SUPABASE_URL}/storage/v1/object/public` — public storage base. */
function supabasePublicBase(): string | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return null;
  return `${url.replace(/\/$/, "")}/storage/v1/object/public`;
}

/**
 * Return a playable URL for a pre-generated chapter recording, or null if none
 * exists (so the caller falls back to on-device synthesis). Voice is ignored:
 * the pre-generated narration is a single canonical voice.
 */
export function resolveBibleAudioUrl(
  translation: TranslationId,
  bookId: string,
  chapter: number,
  _voiceId?: string
): string | null {
  const key = `${translation}/${bookId}/${chapter}`;
  if (!m.chapters || !m.chapters[key]) return null;

  const base = m.baseUrl?.trim() || supabasePublicBase();
  if (!base) return null;

  return `${base.replace(/\/$/, "")}/${m.bucket}/${translation}/${bookId}/${chapter}.${m.format}`;
}

/** Whether any pre-generated audio is registered (useful for UI hints/tests). */
export function hasAnyBibleAudio(): boolean {
  return Boolean(m.chapters && Object.keys(m.chapters).length > 0);
}
