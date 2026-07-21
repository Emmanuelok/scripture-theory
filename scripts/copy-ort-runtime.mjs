// Self-host the ONNX Runtime Web artifacts used by the neural voice.
//
// kokoro-js loads its model through @huggingface/transformers, which by default
// pulls the onnxruntime-web wasm from a third-party CDN (jsdelivr). Our
// Content-Security-Policy is deliberately tight, so instead of loosening it to
// trust an external script/host, we copy the two runtime files into
// public/ort/ and point the runtime at that same-origin path (see
// lib/tts/kokoro.ts → env.wasmPaths). Only the model *weights* are fetched
// remotely (from huggingface.co), which is data, not executable page script.
//
// Runs as `postinstall`, so Vercel/CI always regenerate these after
// `npm install`. Never throws — the neural voice degrades to the device voice
// if the runtime is missing, so a copy failure must not break install/build.

import { copyFile, mkdir, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(root, "node_modules", "@huggingface", "transformers", "dist");
const outDir = join(root, "public", "ort");

// The unified SIMD+threaded JSEP build covers both the wasm (CPU) and webgpu
// execution paths in transformers.js v3. Copy the binary and its JS glue.
const FILES = [
  "ort-wasm-simd-threaded.jsep.wasm",
  "ort-wasm-simd-threaded.jsep.mjs",
];

async function main() {
  await mkdir(outDir, { recursive: true });
  let copied = 0;
  for (const file of FILES) {
    const src = join(srcDir, file);
    try {
      await access(src);
    } catch {
      console.warn(`[copy-ort] source missing, skipping: ${file}`);
      continue;
    }
    await copyFile(src, join(outDir, file));
    copied += 1;
  }
  console.log(`[copy-ort] self-hosted ${copied}/${FILES.length} runtime file(s) → public/ort/`);
}

main().catch((err) => {
  // Best-effort only. Do not fail the install.
  console.warn("[copy-ort] skipped:", err?.message ?? err);
});
