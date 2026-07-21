// Pre-generate Bible-chapter narration and publish it to Supabase Storage.
//
// This is an OFFLINE batch job — run it on a machine with network access and
// (optionally) ffmpeg, not on the serverless app. It:
//   1. fetches the public-domain chapter text (bible-api.com),
//   2. synthesises it with Kokoro (the same model the browser uses),
//   3. concatenates the verses into one chapter file (+ optional mp3/opus
//      compression via ffmpeg),
//   4. uploads it to a public Supabase Storage bucket, and
//   5. records availability in data/bible/audio-manifest.json (commit that
//      file so the reader knows the recording exists).
//
// The reader then plays these instantly with zero per-user model download; any
// chapter not generated still falls back to on-device synthesis.
//
// Usage:
//   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... \
//     node scripts/generate-bible-audio.mjs --books=gospels,psalms
//   node scripts/generate-bible-audio.mjs --books=john --limit=1 --dry-run
//
// Flags:
//   --books=gospels,psalms,<id>   book set(s) / ids (default: gospels,psalms)
//   --translation=WEB             public-domain translation (default: WEB)
//   --voice=af_heart              Kokoro voice (default: manifest voice)
//   --format=mp3|opus|wav         output format (default: manifest format)
//   --limit=N                     stop after N chapters (smoke testing)
//   --force                       re-generate chapters already in the manifest
//   --dry-run                     synthesize + write locally, skip upload

import { KokoroTTS } from "kokoro-js";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { writeFileSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { tmpdir } from "node:os";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST_PATH = join(ROOT, "data", "bible", "audio-manifest.json");
const CANON_PATH = join(ROOT, "data", "bible", "canon.ts");
const MODEL_ID = "onnx-community/Kokoro-82M-v1.0-ONNX";

const BOOK_SETS = {
  gospels: ["matthew", "mark", "luke", "john"],
  psalms: ["psalms"],
};

// ── args ────────────────────────────────────────────────────────────────────
function parseArgs(argv) {
  const out = {};
  for (const a of argv) {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    if (m) out[m[1]] = m[2] === undefined ? true : m[2];
  }
  return out;
}
const args = parseArgs(process.argv.slice(2));

// ── canon (chapter counts + display names) ──────────────────────────────────
async function loadCanon() {
  const src = await readFile(CANON_PATH, "utf8");
  const re = /id:\s*"([^"]+)",\s*name:\s*"([^"]+)"[^}]*?chapters:\s*(\d+)/g;
  const map = new Map();
  let m;
  while ((m = re.exec(src)) !== null) {
    map.set(m[1], { id: m[1], name: m[2], chapters: Number(m[3]) });
  }
  return map;
}

function resolveBookIds(canon) {
  const raw = (args.books || "gospels,psalms").split(",").map((s) => s.trim()).filter(Boolean);
  const ids = [];
  for (const token of raw) {
    if (BOOK_SETS[token]) ids.push(...BOOK_SETS[token]);
    else if (canon.has(token)) ids.push(token);
    else console.warn(`[skip] unknown book/set: ${token}`);
  }
  return [...new Set(ids)];
}

// ── text fetch (public domain via bible-api.com) ────────────────────────────
async function fetchChapterText(bookName, chapter, apiKey) {
  const url = `https://bible-api.com/${encodeURIComponent(`${bookName} ${chapter}`)}?translation=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`bible-api ${res.status} for ${bookName} ${chapter}`);
  const data = await res.json();
  if (!data.verses?.length) throw new Error(`no verses for ${bookName} ${chapter}`);
  return data.verses.map((v) => (v.text || "").replace(/\s+/g, " ").trim()).filter(Boolean);
}

// ── audio helpers ───────────────────────────────────────────────────────────
function silence(seconds, sampleRate) {
  return new Float32Array(Math.max(0, Math.round(seconds * sampleRate)));
}
function concat(chunks) {
  const total = chunks.reduce((n, c) => n + c.length, 0);
  const out = new Float32Array(total);
  let o = 0;
  for (const c of chunks) { out.set(c, o); o += c.length; }
  return out;
}
function float32ToWav(samples, sampleRate) {
  const buffer = Buffer.alloc(44 + samples.length * 2);
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + samples.length * 2, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(1, 22); // mono
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(samples.length * 2, 40);
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    buffer.writeInt16LE((s < 0 ? s * 0x8000 : s * 0x7fff) | 0, 44 + i * 2);
  }
  return buffer;
}
const hasFfmpeg = () => {
  try { return spawnSync("ffmpeg", ["-version"]).status === 0; } catch { return false; }
};
function encode(wavBuffer, format) {
  if (format === "wav") return { buffer: wavBuffer, ext: "wav", contentType: "audio/wav" };
  const inPath = join(tmpdir(), `st-${process.pid}-in.wav`);
  const outExt = format === "opus" ? "opus" : "mp3";
  const outPath = join(tmpdir(), `st-${process.pid}-out.${outExt}`);
  writeFileSync(inPath, wavBuffer);
  const codec = format === "opus" ? ["-c:a", "libopus", "-b:a", "48k"] : ["-c:a", "libmp3lame", "-q:a", "4"];
  const r = spawnSync("ffmpeg", ["-y", "-i", inPath, ...codec, outPath]);
  if (r.status !== 0) throw new Error("ffmpeg failed: " + (r.stderr?.toString() || ""));
  const buffer = readFileSync(outPath);
  return { buffer, ext: outExt, contentType: format === "opus" ? "audio/ogg" : "audio/mpeg" };
}

// ── main ────────────────────────────────────────────────────────────────────
async function main() {
  const canon = await loadCanon();
  const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
  const translation = (args.translation || "WEB").toUpperCase();
  const voice = args.voice || manifest.voice || "af_heart";
  let format = args.format || manifest.format || "mp3";
  const apiKey = translation.toLowerCase(); // bible-api key: web, kjv, asv…
  const dryRun = Boolean(args["dry-run"]);
  const force = Boolean(args.force);
  const limit = args.limit ? Number(args.limit) : Infinity;

  if ((format === "mp3" || format === "opus") && !hasFfmpeg()) {
    console.warn(`[warn] ffmpeg not found — falling back to uncompressed WAV.`);
    format = "wav";
  }

  // Supabase (skipped in --dry-run)
  let supabase = null;
  const supaUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supaKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE;
  if (!dryRun) {
    if (!supaUrl || !supaKey) {
      console.error("Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY. Use --dry-run to test without upload.");
      process.exit(1);
    }
    const { createClient } = await import("@supabase/supabase-js");
    supabase = createClient(supaUrl, supaKey, { auth: { persistSession: false } });
    // Ensure a public bucket exists.
    const { data: buckets } = await supabase.storage.listBuckets();
    if (!buckets?.some((b) => b.name === manifest.bucket)) {
      const { error } = await supabase.storage.createBucket(manifest.bucket, { public: true });
      if (error && !/already exists/i.test(error.message)) throw error;
      console.log(`[bucket] created public bucket "${manifest.bucket}"`);
    }
  }

  const bookIds = resolveBookIds(canon);
  const outDir = join(ROOT, "bible-audio-out");
  if (dryRun) await mkdir(outDir, { recursive: true });

  console.log(`Loading Kokoro (${MODEL_ID})…`);
  const tts = await KokoroTTS.from_pretrained(MODEL_ID, { dtype: "fp32" });

  manifest.voice = voice;
  manifest.format = format;
  manifest.chapters = manifest.chapters || {};

  let done = 0;
  for (const bookId of bookIds) {
    const book = canon.get(bookId);
    if (!book) continue;
    for (let ch = 1; ch <= book.chapters; ch++) {
      if (done >= limit) break;
      const key = `${translation}/${bookId}/${ch}`;
      if (manifest.chapters[key] && !force) { continue; }

      try {
        const verses = await fetchChapterText(book.name, ch, apiKey);
        const parts = [];
        let sr = 24000;
        for (const text of verses) {
          const audio = await tts.generate(text, { voice });
          sr = audio.sampling_rate;
          parts.push(audio.audio, silence(0.28, sr));
        }
        const wav = float32ToWav(concat(parts), sr);
        const { buffer, ext, contentType } = encode(wav, format);
        const path = `${translation}/${bookId}/${ch}.${ext}`;

        if (dryRun) {
          const local = join(outDir, path);
          await mkdir(dirname(local), { recursive: true });
          await writeFile(local, buffer);
          console.log(`[dry-run] ${path} (${(buffer.length / 1024).toFixed(0)} KB)`);
        } else {
          const { error } = await supabase.storage
            .from(manifest.bucket)
            .upload(path, buffer, { contentType, upsert: true });
          if (error) throw error;
          console.log(`[upload] ${path} (${(buffer.length / 1024).toFixed(0)} KB)`);
        }

        manifest.chapters[key] = true;
        done++;
      } catch (err) {
        console.error(`[fail] ${key}: ${err?.message ?? err}`);
      }
    }
    if (done >= limit) break;
  }

  // Persist the manifest (sorted for stable diffs).
  const sorted = {};
  for (const k of Object.keys(manifest.chapters).sort()) sorted[k] = manifest.chapters[k];
  manifest.chapters = sorted;
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`\nDone. ${done} chapter(s) generated. Manifest → data/bible/audio-manifest.json`);
  console.log(dryRun ? `Local audio in ${outDir}` : `Commit the manifest so the reader serves these recordings.`);
}

// Only run the batch job when invoked directly (so helpers stay importable
// for tests without triggering a model download).
const invokedDirectly =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (invokedDirectly) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

export { loadCanon, resolveBookIds, float32ToWav, concat, silence, encode };

