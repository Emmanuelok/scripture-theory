// Resolve a pre-generated Bible-chapter recording, if one could exist.
//
// The Listen player calls this first; when it returns a URL, that studio-quality
// recording plays instantly (zero model download, works on every device). When
// it returns null, the player synthesises on-device.
//
// Availability is **optimistic, not gated by a manifest**. We return the file's
// public URL for any translation we pre-render audio for, and let the player
// simply try to play it: if the file exists it plays instantly; if it doesn't
// exist yet (a chapter still being generated), the <audio> element errors and
// the player falls back to on-device synthesis. This means a chapter goes live
// the *instant* its MP3 lands in object storage — no manifest commit, no lag,
// and generation batches can run in parallel without racing on a shared file.
//
// Audio files live in object storage (Cloudflare R2 by default; any public
// bucket/CDN works), keyed `${translation}/${bookId}/${chapter}.${format}`,
// produced by scripts/generate_bible_audio.py.
//
// Configure the public base with NEXT_PUBLIC_BIBLE_AUDIO_BASE_URL, e.g.
//   https://pub-xxxxxxxx.r2.dev            (R2 public dev URL)
//   https://audio.your-domain.com          (R2 custom domain / CDN)

import manifest from "@/data/bible/audio-manifest.json";
import type { TranslationId } from "@/data/bible/translations";

type Manifest = {
  version: number;
  voice: string;
  format: string;
  bucket: string;
  /** Optional base URL baked into the manifest (fallback if the env var is unset). */
  baseUrl: string;
  /** Translations we pre-render audio for (optional override of the default). */
  translations?: string[];
  /** Legacy per-chapter availability map — no longer used for gating. */
  chapters?: Record<string, boolean>;
};

const m = manifest as Manifest;

// Translations we generate studio audio for. We only render public-domain
// editions (licensing), and today just the World English Bible. The manifest
// can override/extend this; the code default keeps audio working even if a
// generation run rewrites the manifest without this field.
const AUDIO_TRANSLATIONS: string[] =
  Array.isArray(m.translations) && m.translations.length ? m.translations : ["WEB"];

/** `${SUPABASE_URL}/storage/v1/object/public/${bucket}` — Supabase Storage fallback. */
function supabaseBase(): string | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return null;
  return `${url.replace(/\/$/, "")}/storage/v1/object/public/${m.bucket}`;
}

/**
 * Return a candidate URL for a pre-generated chapter recording, or null if we
 * don't pre-render this translation (so the caller synthesises on-device).
 *
 * The URL is returned *optimistically* — we don't verify the file exists here.
 * The player attempts playback and falls back to on-device synthesis if the
 * file isn't there yet. Voice is ignored: the recording is a single canonical
 * voice.
 */
export function resolveBibleAudioUrl(
  translation: TranslationId,
  bookId: string,
  chapter: number,
  _voiceId?: string
): string | null {
  if (!AUDIO_TRANSLATIONS.includes(translation)) return null;

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

/** Whether pre-generated audio is configured at all (useful for UI hints/tests). */
export function hasAnyBibleAudio(): boolean {
  const base = (process.env.NEXT_PUBLIC_BIBLE_AUDIO_BASE_URL || m.baseUrl || "").trim();
  return AUDIO_TRANSLATIONS.length > 0 && (Boolean(base) || Boolean(supabaseBase()));
}

/**
 * Whether a translation offers pre-generated voice narration — drives the 🔊
 * badge in the UI. Data-driven: any translation we add to audio coverage
 * (AUDIO_TRANSLATIONS / the manifest) automatically shows the badge.
 */
export function translationHasAudio(translation: string): boolean {
  return AUDIO_TRANSLATIONS.includes(translation);
}
