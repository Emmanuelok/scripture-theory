// Regenerate the self-hosted ONNX Runtime Web files under public/ort/.
//
// The neural voice (kokoro-js → onnxruntime-web) loads BOTH its wasm binary and
// its `.mjs` glue from `env.wasmPaths` (see lib/tts/kokoro.ts). We pin that to
// our own origin (/ort) rather than the library's default jsdelivr CDN, because
// the `.mjs` is a *script* and our Content-Security-Policy does not allow
// third-party script hosts. These files are COMMITTED (public/ort/) so every
// deploy has them without relying on an install/build hook.
//
// Run this manually after bumping @huggingface/transformers, then commit the
// result:  node scripts/copy-ort-runtime.mjs
import { copyFile, mkdir, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(root, "node_modules", "@huggingface", "transformers", "dist");
const outDir = join(root, "public", "ort");
const FILES = ["ort-wasm-simd-threaded.jsep.wasm", "ort-wasm-simd-threaded.jsep.mjs"];

await mkdir(outDir, { recursive: true });
let copied = 0;
for (const file of FILES) {
  const src = join(srcDir, file);
  try {
    await access(src);
  } catch {
    console.warn(`[copy-ort] source missing: ${file}`);
    continue;
  }
  await copyFile(src, join(outDir, file));
  copied += 1;
}
console.log(`[copy-ort] wrote ${copied}/${FILES.length} runtime file(s) → public/ort/ (commit them)`);
