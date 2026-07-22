// Neural text-to-speech (Kokoro-82M) — driven from a Web Worker.
//
// Kokoro is an open-weight (Apache-2.0) TTS model that sounds genuinely human,
// unlike the device `speechSynthesis` voices. Inference runs entirely in the
// browser, but in a WORKER (lib/tts/tts.worker.ts) — ONNX Runtime's WASM
// backend blocks the thread it runs on, so keeping it off the main thread is
// what stops the page from freezing while it speaks.
//
// The model weights (~86 MB, q8) download once from the Hugging Face Hub and
// are cached by the browser; after that the voice works offline. Nothing is
// sent to a server — synthesis happens on the user's device.

export type KokoroVoiceId = string;
export type TtsDevice = "webgpu" | "wasm";

/** Progress info while the model downloads/initialises. */
export type LoadProgress = {
  status?: string;
  file?: string;
  progress?: number;
  loaded?: number;
  total?: number;
};

let worker: Worker | null = null;
let ready = false;
let readyPromise: Promise<void> | null = null;
let progressCb: ((p: LoadProgress) => void) | null = null;
let activeDevice: TtsDevice | null = null;
let seq = 0;
const pending = new Map<number, { resolve: (b: Blob) => void; reject: (e: Error) => void }>();

export function isNeuralTtsSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof Worker !== "undefined" &&
    typeof WebAssembly !== "undefined"
  );
}

export function isEngineLoaded(): boolean {
  return ready;
}

export function getActiveDevice(): TtsDevice | null {
  return activeDevice;
}

function ensureWorker(): Worker {
  if (worker) return worker;
  const w = new Worker(new URL("./tts.worker.ts", import.meta.url), { type: "module" });
  w.onmessage = (e: MessageEvent) => {
    const m = e.data;
    if (!m) return;
    if (m.type === "progress") {
      progressCb?.(m.data as LoadProgress);
    } else if (m.type === "device") {
      activeDevice = m.device as TtsDevice;
    } else if (m.type === "result") {
      pending.get(m.id)?.resolve(m.blob as Blob);
      pending.delete(m.id);
    } else if (m.type === "error" && m.id != null) {
      pending.get(m.id)?.reject(new Error(m.message));
      pending.delete(m.id);
    }
    // 'ready' and load-time 'error' (no id) are handled by loadEngine's listener.
  };
  w.onerror = (e) => {
    // eslint-disable-next-line no-console
    console.error("[tts] worker error:", e.message || e);
  };
  worker = w;
  return w;
}

/** Load the model (once). Concurrent callers share one in-flight promise. */
export function loadEngine(onProgress?: (p: LoadProgress) => void): Promise<void> {
  if (onProgress) progressCb = onProgress;
  const w = ensureWorker();
  if (ready) return Promise.resolve();
  if (!readyPromise) {
    readyPromise = new Promise<void>((resolve, reject) => {
      const onMsg = (e: MessageEvent) => {
        const m = e.data;
        if (m?.type === "ready") {
          ready = true;
          w.removeEventListener("message", onMsg);
          resolve();
        } else if (m?.type === "error" && m.id == null) {
          w.removeEventListener("message", onMsg);
          readyPromise = null; // allow a retry
          reject(new Error(m.message));
        }
      };
      w.addEventListener("message", onMsg);
      w.postMessage({ type: "load" });
    });
  }
  return readyPromise;
}

/** Synthesise a block of text into a single WAV Blob (generated in the worker). */
export async function synthesize(
  text: string,
  opts: { voice: KokoroVoiceId; speed?: number }
): Promise<Blob> {
  const w = ensureWorker();
  await loadEngine();
  const id = ++seq;
  return new Promise<Blob>((resolve, reject) => {
    pending.set(id, { resolve, reject });
    w.postMessage({ type: "generate", id, text, voice: opts.voice, speed: opts.speed ?? 1 });
  });
}
