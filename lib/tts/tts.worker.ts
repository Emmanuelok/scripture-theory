// TTS Web Worker — runs Kokoro entirely off the main thread.
//
// ONNX Runtime's WASM backend executes inference synchronously; on the main
// thread that FREEZES the page for the duration of every clip. Running the
// model here keeps the UI responsive. The main thread talks to this worker
// with simple messages (see lib/tts/kokoro.ts).

import { KokoroTTS, env } from "kokoro-js";

type Ctx = {
  postMessage(message: unknown): void;
  onmessage: ((e: MessageEvent) => void) | null;
};
const ctx = self as unknown as Ctx;

const MODEL_ID = "onnx-community/Kokoro-82M-v1.0-ONNX";
let ttsPromise: Promise<KokoroTTS> | null = null;

function getTts(): Promise<KokoroTTS> {
  if (!ttsPromise) {
    // Self-hosted onnxruntime-web runtime (same-origin; see public/ort/).
    try {
      (env as unknown as { wasmPaths?: string }).wasmPaths = "/ort/";
    } catch {
      /* keep library default */
    }
    // WASM/CPU with q8 weights: the reliable, correct path. It's slower than a
    // GPU would be, but WebGPU proved unreliable in practice (q8 emits silence;
    // fp16 failed on real hardware we can't reproduce), so we stay on WASM.
    ttsPromise = (async () => {
      const tts = await KokoroTTS.from_pretrained(MODEL_ID, {
        dtype: "q8",
        device: "wasm",
        progress_callback: (p: unknown) => ctx.postMessage({ type: "progress", data: p }),
      });
      ctx.postMessage({ type: "device", device: "wasm" });
      return tts;
    })();
  }
  return ttsPromise;
}

ctx.onmessage = async (e: MessageEvent) => {
  const msg = e.data as
    | { type: "load" }
    | { type: "generate"; id: number; text: string; voice: string; speed: number }
    | undefined;
  if (!msg) return;

  if (msg.type === "load") {
    try {
      await getTts();
      ctx.postMessage({ type: "ready" });
    } catch (err) {
      ctx.postMessage({ type: "error", message: describe(err) });
    }
    return;
  }

  if (msg.type === "generate") {
    try {
      const tts = await getTts();
      const audio = await tts.generate(msg.text, { voice: msg.voice as never, speed: msg.speed });
      ctx.postMessage({ type: "result", id: msg.id, blob: audio.toBlob() });
    } catch (err) {
      ctx.postMessage({ type: "error", id: msg.id, message: describe(err) });
    }
  }
};

function describe(err: unknown): string {
  return err instanceof Error ? `${err.name}: ${err.message}` : String(err);
}
