// Neural text-to-speech engine (Kokoro-82M) — runs entirely in the browser.
//
// Kokoro is an open-weight (Apache-2.0) TTS model that sounds genuinely human,
// unlike the device `speechSynthesis` voices. We run it client-side through
// kokoro-js → @huggingface/transformers, using onnxruntime-web. Nothing is sent
// to a server: the model weights are fetched once from the Hugging Face Hub,
// cached by the browser, and inference happens on the user's device (WebGPU
// when available, otherwise WebAssembly on the CPU).
//
// The heavy library is imported lazily (only when the user actually presses
// play) so it never touches the initial bundle or SSR.

import type { KokoroTTS } from "kokoro-js";

/** A subset of Kokoro's voices — the model accepts any of its voice ids. */
export type KokoroVoiceId = string;

export type TtsDevice = "webgpu" | "wasm";

/** Progress info while the model downloads/initialises. */
export type LoadProgress = {
  status?: string;
  file?: string;
  /** 0–100 for the file currently downloading, when known. */
  progress?: number;
  loaded?: number;
  total?: number;
};

// onnx-community's ONNX export of Kokoro v1.0 — the build kokoro-js expects.
const MODEL_ID = "onnx-community/Kokoro-82M-v1.0-ONNX";

let instance: KokoroTTS | null = null;
let loadPromise: Promise<KokoroTTS> | null = null;
let activeDevice: TtsDevice | null = null;

export function isEngineLoaded(): boolean {
  return instance !== null;
}

export function getActiveDevice(): TtsDevice | null {
  return activeDevice;
}

/** True if the browser can plausibly run the engine at all. */
export function isNeuralTtsSupported(): boolean {
  if (typeof window === "undefined") return false;
  // WebAssembly is the floor; WebGPU is a bonus we detect at load time.
  return typeof WebAssembly !== "undefined";
}

async function hasWebGPU(): Promise<boolean> {
  try {
    const gpu = (navigator as unknown as { gpu?: { requestAdapter(): Promise<unknown> } }).gpu;
    if (!gpu?.requestAdapter) return false;
    const adapter = await gpu.requestAdapter();
    return Boolean(adapter);
  } catch {
    return false;
  }
}

/**
 * Load (once) and return the Kokoro engine. Concurrent callers share a single
 * in-flight promise; a failed load is not cached, so the next attempt retries.
 */
export async function loadEngine(onProgress?: (p: LoadProgress) => void): Promise<KokoroTTS> {
  if (instance) return instance;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const { KokoroTTS, env } = await import("kokoro-js");

    // Point onnxruntime-web at our same-origin, self-hosted wasm (public/ort/)
    // so the tight CSP never needs to trust a third-party script host.
    try {
      (env as unknown as { wasmPaths?: string }).wasmPaths = "/ort/";
    } catch {
      /* if the shape changes, fall back to the library default */
    }

    const webgpu = await hasWebGPU();
    // WebGPU: fp16 is a good quality/size balance (~163MB) and well supported by
    // the JSEP webgpu backend. WASM (CPU): q8 keeps the download small (~86MB)
    // and broadly compatible. If the preferred path throws, fall back.
    const attempts: { device: TtsDevice; dtype: "fp16" | "q8" }[] = webgpu
      ? [
          { device: "webgpu", dtype: "fp16" },
          { device: "wasm", dtype: "q8" },
        ]
      : [{ device: "wasm", dtype: "q8" }];

    let lastError: unknown;
    for (const attempt of attempts) {
      try {
        const tts = await KokoroTTS.from_pretrained(MODEL_ID, {
          dtype: attempt.dtype,
          device: attempt.device,
          progress_callback: onProgress as never,
        });
        instance = tts;
        activeDevice = attempt.device;
        return tts;
      } catch (err) {
        lastError = err;
      }
    }
    throw lastError ?? new Error("Kokoro TTS failed to initialise");
  })();

  try {
    return await loadPromise;
  } catch (err) {
    // Allow a later retry after a transient failure (e.g. network blip).
    loadPromise = null;
    throw err;
  }
}

/**
 * Stream audio for a block of text, sentence by sentence. Yields a WAV Blob per
 * chunk so playback can begin before the whole passage is synthesised.
 */
export async function* streamSpeech(
  text: string,
  opts: { voice: KokoroVoiceId; speed?: number }
): AsyncGenerator<Blob, void, void> {
  const tts = await loadEngine();
  const stream = tts.stream(text, { voice: opts.voice as never, speed: opts.speed ?? 1 });
  for await (const chunk of stream) {
    yield chunk.audio.toBlob();
  }
}
