// Resolve a pre-generated Bible-chapter recording, if one exists.
//
// The Listen player calls this first; when it returns a URL, that studio-quality
// recording plays instantly (zero model download, works on every device). When
// it returns null — the default until audio has been generated — the player
// synthesises on-device.
//
// Audio files live in object storage (Cloudflare R2 by default; any public
// bucket/CDN works) and are produced by scripts/generate_bible_audio.py, which
// also fills in the availability map in data/bible/audio-manifest.json. Keeping
// the map in the bundle means the reader knows what exists without a round-trip.
//
// Configure the public base with NEXT_PUBLIC_BIBLE_AUDIO_BASE_URL, e.g.
//   https://pub-xxxxxxxx.r2.dev            (R2 public dev URL)
//   https://audio.your-domain.com          (R2 custom domain / CDN)
// Objects are keyed `${translation}/${bookId}/${chapter}.${format}`.

import manifest from "@/data/bible/audio-manifest.json";
import type { TranslationId } from "@/data/bible/translations";

type Manifest = {
  version: number;
  voice: string;
  format: string;
  bucket: string;
  /** Optional base URL baked into the manifest (fallback if the env var is unset). */
  baseUrl: string;
  /** Keys are `${translation}/${bookId}/${chapter}` → true. */
  chapters: Record<string, boolean>;
};

const m = manifest as Manifest;

/** `${SUPABASE_URL}/storage/v1/object/public/${bucket}` — Supabase Storage fallback. */
function supabaseBase(): string | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return null;
  return `${url.replace(/\/$/, "")}/storage/v1/object/public/${m.bucket}`;
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

  const path = `${translation}/${bookId}/${chapter}.${m.format}`;

  // Preferred: an explicit public base (R2 dev URL, custom domain, or CDN).
  // Object keys sit at the bucket root, so no bucket segment in the path.
  const explicit = (process.env.NEXT_PUBLIC_BIBLE_AUDIO_BASE_URL || m.baseUrl || "").trim();
  if (explicit) return `${explicit.replace(/\/$/, "")}/${path}`;

  // Fallback: Supabase Storage (bucket is part of the public URL).
  const sb = supabaseBase();
  if (sb) return `${sb}/${path}`;

  return null;
}

/** Whether any pre-generated audio is registered (useful for UI hints/tests). */
export function hasAnyBibleAudio(): boolean {
  return Boolean(m.chapters && Object.keys(m.chapters).length > 0);
}
