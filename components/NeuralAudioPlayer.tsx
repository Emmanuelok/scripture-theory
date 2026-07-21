"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  getActiveDevice,
  isNeuralTtsSupported,
  loadEngine,
  streamSpeech,
  type LoadProgress,
} from "@/lib/tts/kokoro";
import { DEFAULT_VOICE_ID, findVoice, VOICE_PRESETS } from "@/lib/tts/voices";

/**
 * NeuralAudioPlayer — one player for every "read this aloud" surface on the
 * platform (Bible reader, lessons, and anything else). It speaks with a real
 * neural voice (Kokoro, in-browser) that sounds human, and degrades to the
 * device `speechSynthesis` voice if the neural engine can't run or the reader
 * opts out. If a pre-generated recording exists for the passage it plays that
 * instead — instant, zero download.
 */

export type NarrationSegment = {
  /** Optional spoken label, announced before the text (e.g. "Memory verse"). */
  label?: string;
  text: string;
};

type Mode = "neural" | "device";
type Status = "idle" | "preparing" | "playing" | "paused";

type Props = {
  title: string;
  eyebrow?: string;
  segments: NarrationSegment[];
  /**
   * Optional resolver for a pre-generated audio file for the whole passage,
   * given the chosen neural voice id. Return a URL to play it directly, or null
   * to synthesise on-device. Enables cached, studio-consistent Bible audio.
   */
  resolveAudioUrl?: (voiceId: string) => string | null | Promise<string | null>;
  className?: string;
};

const NEURAL_VOICE_KEY = "scripture-theory-tts-voice-neural";
const DEVICE_VOICE_KEY = "scripture-theory-tts-voice";
const RATE_KEY = "scripture-theory-tts-rate";
const MODE_KEY = "scripture-theory-tts-mode";

const APPROX_DOWNLOAD = "~90 MB, one time";

export default function NeuralAudioPlayer({
  title,
  eyebrow = "Listen",
  segments,
  resolveAudioUrl,
  className = "",
}: Props) {
  // Capability flags start optimistic so the server render and the first client
  // render match (WebAssembly/speechSynthesis are near-universal). We resolve
  // the real values after mount to avoid a hydration mismatch.
  const [mounted, setMounted] = useState(false);
  const [neuralSupported, setNeuralSupported] = useState(true);
  const [deviceSupported, setDeviceSupported] = useState(true);

  const [mode, setMode] = useState<Mode>("neural");
  const [status, setStatus] = useState<Status>("idle");
  const [position, setPosition] = useState<{ index: number; total: number } | null>(null);
  const [loadPct, setLoadPct] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [engineBadge, setEngineBadge] = useState<string>("");

  const [neuralVoiceId, setNeuralVoiceId] = useState<string>(DEFAULT_VOICE_ID);
  const [deviceVoices, setDeviceVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [deviceVoiceURI, setDeviceVoiceURI] = useState<string>("");
  const [rate, setRate] = useState<number>(1);

  // ── control refs (don't trigger re-renders) ───────────────────────────────
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const runIdRef = useRef(0);
  const stoppedRef = useRef(false);
  const pausedRef = useRef(false);
  const pauseWaitersRef = useRef<Array<() => void>>([]);
  const cancelBlobRef = useRef<(() => void) | null>(null);
  const objectUrlsRef = useRef<string[]>([]);

  // A stable signature so we only reset when the *content* changes, not on
  // every parent re-render that hands us a fresh array identity.
  const contentSig = useMemo(
    () => `${segments.length}:${segments.map((s) => s.text).join("|").slice(0, 160)}`,
    [segments]
  );

  // ── init: audio element, device voices, saved prefs ────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    audioRef.current = new Audio();

    // Resolve real capabilities now that we're on the client.
    setMounted(true);
    const ns = isNeuralTtsSupported();
    const ds = "speechSynthesis" in window;
    setNeuralSupported(ns);
    setDeviceSupported(ds);
    if (!ns) setMode("device");

    let detach: (() => void) | undefined;
    if ("speechSynthesis" in window) {
      const refresh = () => setDeviceVoices(window.speechSynthesis.getVoices());
      refresh();
      window.speechSynthesis.addEventListener?.("voiceschanged", refresh);
      detach = () =>
        window.speechSynthesis.removeEventListener?.("voiceschanged", refresh);
    }

    try {
      const nv = window.localStorage.getItem(NEURAL_VOICE_KEY);
      if (nv) setNeuralVoiceId(nv);
      const dv = window.localStorage.getItem(DEVICE_VOICE_KEY);
      if (dv) setDeviceVoiceURI(dv);
      const r = window.localStorage.getItem(RATE_KEY);
      if (r) setRate(parseFloat(r));
      const m = window.localStorage.getItem(MODE_KEY);
      if (m === "device" || m === "neural") setMode(ns ? (m as Mode) : "device");
    } catch {
      /* prefs are best-effort */
    }

    return () => {
      detach?.();
      hardStop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Stop and reset when the passage content changes.
  useEffect(() => {
    hardStop();
    setStatus("idle");
    setPosition(null);
    setError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentSig]);

  // Persist prefs
  useEffect(() => {
    try { window.localStorage.setItem(NEURAL_VOICE_KEY, neuralVoiceId); } catch {}
  }, [neuralVoiceId]);
  useEffect(() => {
    if (!deviceVoiceURI) return;
    try { window.localStorage.setItem(DEVICE_VOICE_KEY, deviceVoiceURI); } catch {}
  }, [deviceVoiceURI]);
  useEffect(() => {
    try { window.localStorage.setItem(RATE_KEY, String(rate)); } catch {}
  }, [rate]);
  useEffect(() => {
    try { window.localStorage.setItem(MODE_KEY, mode); } catch {}
  }, [mode]);

  // ── low-level playback helpers ─────────────────────────────────────────────
  function waitIfPaused(): Promise<void> {
    if (!pausedRef.current) return Promise.resolve();
    return new Promise((resolve) => pauseWaitersRef.current.push(resolve));
  }

  function revokeAll() {
    for (const u of objectUrlsRef.current) URL.revokeObjectURL(u);
    objectUrlsRef.current = [];
  }

  /** Play a single audio source (blob URL or file URL); resolves when done. */
  function playSource(url: string, revokeAfter: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      const audio = audioRef.current;
      if (!audio) return resolve();
      const cleanup = () => {
        audio.onended = null;
        audio.onerror = null;
        cancelBlobRef.current = null;
        if (revokeAfter) {
          URL.revokeObjectURL(url);
          objectUrlsRef.current = objectUrlsRef.current.filter((u) => u !== url);
        }
      };
      // Allow stop()/pause-abort to end this wait cleanly.
      cancelBlobRef.current = () => {
        cleanup();
        resolve();
      };
      audio.onended = () => { cleanup(); resolve(); };
      audio.onerror = () => { cleanup(); reject(new Error("audio playback error")); };
      audio.src = url;
      audio.playbackRate = 1;
      const p = audio.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          // Autoplay/interrupt errors are handled via onerror/stop; ignore here.
        });
      }
    });
  }

  /** Immediate, synchronous teardown of any playback. */
  function hardStop() {
    stoppedRef.current = true;
    pausedRef.current = false;
    runIdRef.current += 1;
    const audio = audioRef.current;
    if (audio) {
      try { audio.pause(); } catch {}
      audio.removeAttribute("src");
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try { window.speechSynthesis.cancel(); } catch {}
    }
    cancelBlobRef.current?.();
    cancelBlobRef.current = null;
    const waiters = pauseWaitersRef.current;
    pauseWaitersRef.current = [];
    waiters.forEach((w) => w());
    revokeAll();
  }

  function deviceLabel(): string {
    const dev = getActiveDevice();
    if (dev === "webgpu") return "Natural voice · GPU";
    if (dev === "wasm") return "Natural voice";
    return "Natural voice";
  }

  // ── neural playback ────────────────────────────────────────────────────────
  async function runNeural(runId: number): Promise<void> {
    setError(null);

    // Prefer a pre-generated recording if one exists.
    if (resolveAudioUrl) {
      try {
        const url = await resolveAudioUrl(neuralVoiceId);
        if (url && runId === runIdRef.current && !stoppedRef.current) {
          setEngineBadge("Studio recording");
          setStatus("playing");
          setPosition({ index: 1, total: 1 });
          await playSource(url, false);
          if (!stoppedRef.current && runId === runIdRef.current) {
            setStatus("idle");
            setPosition(null);
          }
          return;
        }
      } catch {
        /* fall through to on-device synthesis */
      }
    }

    setStatus("preparing");
    setLoadPct(0);
    try {
      await loadEngine((p: LoadProgress) => {
        if (p && typeof p.progress === "number") setLoadPct(Math.round(p.progress));
      });
    } catch {
      setLoadPct(null);
      if (runId !== runIdRef.current) return;
      // Neural couldn't load — fall back to the device voice for this run.
      setMode("device");
      setEngineBadge("Device voice");
      return runDevice(runId, true);
    }
    setLoadPct(null);
    if (stoppedRef.current || runId !== runIdRef.current) return;

    setEngineBadge(deviceLabel());
    setStatus("playing");
    try {
      for (let i = 0; i < segments.length; i++) {
        if (stoppedRef.current || runId !== runIdRef.current) return;
        await waitIfPaused();
        if (stoppedRef.current || runId !== runIdRef.current) return;
        setPosition({ index: i + 1, total: segments.length });
        const seg = segments[i];
        const text = seg.label ? `${seg.label}. ${seg.text}` : seg.text;
        for await (const blob of streamSpeech(text, { voice: neuralVoiceId, speed: rate })) {
          if (stoppedRef.current || runId !== runIdRef.current) return;
          await waitIfPaused();
          if (stoppedRef.current || runId !== runIdRef.current) return;
          const url = URL.createObjectURL(blob);
          objectUrlsRef.current.push(url);
          await playSource(url, true);
        }
      }
      if (!stoppedRef.current && runId === runIdRef.current) {
        setStatus("idle");
        setPosition(null);
      }
    } catch {
      if (runId === runIdRef.current) {
        setStatus("idle");
        setPosition(null);
        setError("The natural voice hit a snag mid-passage. Switch to the device voice to keep going.");
      }
    }
  }

  // ── device (speechSynthesis) playback ──────────────────────────────────────
  function runDevice(runId: number, becauseNeuralFailed = false): void {
    if (!("speechSynthesis" in window)) {
      setError("This browser can't read text aloud.");
      setStatus("idle");
      return;
    }
    if (becauseNeuralFailed) {
      setError("Natural voice unavailable on this device — using the device voice.");
    }
    setEngineBadge("Device voice");
    setStatus("playing");
    const voice =
      deviceVoices.find((v) => v.voiceURI === deviceVoiceURI) ??
      deviceVoices.find((v) => v.lang.toLowerCase().startsWith("en")) ??
      deviceVoices[0];

    let i = 0;
    const step = () => {
      if (stoppedRef.current || runId !== runIdRef.current) return;
      if (i >= segments.length) {
        setStatus("idle");
        setPosition(null);
        return;
      }
      setPosition({ index: i + 1, total: segments.length });
      const seg = segments[i];
      const utter = new SpeechSynthesisUtterance(seg.label ? `${seg.label}. ${seg.text}` : seg.text);
      if (voice) utter.voice = voice;
      utter.rate = rate;
      utter.lang = voice?.lang ?? "en-US";
      utter.onend = () => { i += 1; step(); };
      utter.onerror = () => { setStatus("idle"); setPosition(null); };
      window.speechSynthesis.speak(utter);
    };
    step();
  }

  // ── public controls ────────────────────────────────────────────────────────
  function play() {
    hardStop();
    stoppedRef.current = false;
    pausedRef.current = false;
    const runId = runIdRef.current; // hardStop bumped it; this is the current run
    if (mode === "neural" && neuralSupported) {
      void runNeural(runId);
    } else {
      runDevice(runId);
    }
  }

  function pause() {
    pausedRef.current = true;
    setStatus("paused");
    audioRef.current?.pause();
    if ("speechSynthesis" in window) {
      try { window.speechSynthesis.pause(); } catch {}
    }
  }

  function resume() {
    pausedRef.current = false;
    setStatus("playing");
    if (audioRef.current?.src) audioRef.current.play().catch(() => {});
    if ("speechSynthesis" in window) {
      try { window.speechSynthesis.resume(); } catch {}
    }
    const waiters = pauseWaitersRef.current;
    pauseWaitersRef.current = [];
    waiters.forEach((w) => w());
  }

  function stop() {
    hardStop();
    stoppedRef.current = false; // ready for a fresh play
    setStatus("idle");
    setPosition(null);
  }

  if (mounted && !neuralSupported && !deviceSupported) {
    return (
      <div className={`rounded-2xl border border-ink-200 bg-card-subtle p-4 text-sm text-ink-600 ${className}`}>
        This browser can&apos;t read text aloud. Try a recent version of Chrome, Edge, or Safari.
      </div>
    );
  }

  const activeVoice = findVoice(neuralVoiceId);

  return (
    <section className={`rounded-2xl border border-ink-200 bg-card-subtle p-4 md:p-5 ${className}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-flame-700">
            {eyebrow}
            {engineBadge && status !== "idle" ? ` · ${engineBadge}` : mode === "neural" ? " · natural voice" : " · device voice"}
          </div>
          <h3 className="font-serif text-base text-ink-900 mt-0.5">{title}</h3>
        </div>
        {position && (
          <span className="text-[11px] text-ink-500">
            {position.total > 1 ? `Part ${position.index} / ${position.total}` : "Playing"}
          </span>
        )}
      </div>

      {/* Model download progress (first neural play only) */}
      {status === "preparing" && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-[11px] text-ink-500 mb-1">
            <span>Preparing the natural voice ({APPROX_DOWNLOAD})…</span>
            {loadPct !== null && <span className="tabular-nums">{loadPct}%</span>}
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
            <div
              className="h-full rounded-full bg-flame-500 transition-all"
              style={{ width: `${loadPct ?? 8}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {status === "idle" && (
          <button
            onClick={play}
            className="inline-flex items-center gap-1.5 rounded-full bg-flame-600 text-ink-50 px-4 py-1.5 text-sm hover:bg-flame-500"
          >
            ▶ Play
          </button>
        )}
        {status === "preparing" && (
          <button
            disabled
            className="inline-flex items-center gap-1.5 rounded-full bg-ink-300 text-ink-50 px-4 py-1.5 text-sm cursor-wait"
          >
            Preparing…
          </button>
        )}
        {status === "playing" && (
          <button
            onClick={pause}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 text-ink-50 px-4 py-1.5 text-sm hover:bg-flame-700"
          >
            ❚❚ Pause
          </button>
        )}
        {status === "paused" && (
          <button
            onClick={resume}
            className="inline-flex items-center gap-1.5 rounded-full bg-flame-600 text-ink-50 px-4 py-1.5 text-sm hover:bg-flame-500"
          >
            ▶ Resume
          </button>
        )}
        {(status === "playing" || status === "paused") && (
          <button
            onClick={stop}
            className="inline-flex items-center rounded-full border border-ink-300 px-3 py-1.5 text-sm text-ink-700 hover:border-ink-900"
          >
            ■ Stop
          </button>
        )}

        {/* Voice picker */}
        {mode === "neural" ? (
          <select
            value={neuralVoiceId}
            onChange={(e) => setNeuralVoiceId(e.target.value)}
            disabled={status !== "idle"}
            className="rounded-full border border-ink-300 bg-card px-3 py-1 text-xs text-ink-700 max-w-[220px] truncate disabled:opacity-60"
            aria-label="Reading voice"
            title={activeVoice.blurb}
          >
            {VOICE_PRESETS.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} · {v.accent} {v.gender}
              </option>
            ))}
          </select>
        ) : (
          deviceVoices.length > 0 && (
            <select
              value={deviceVoiceURI || ""}
              onChange={(e) => setDeviceVoiceURI(e.target.value)}
              disabled={status !== "idle"}
              className="rounded-full border border-ink-300 bg-card px-3 py-1 text-xs text-ink-700 max-w-[220px] truncate disabled:opacity-60"
              aria-label="Device voice"
            >
              {deviceVoices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} · {v.lang}
                </option>
              ))}
            </select>
          )
        )}

        <label className="flex items-center gap-1.5 text-xs text-ink-600 ml-auto">
          <span>Speed</span>
          <input
            type="range"
            min={0.75}
            max={1.5}
            step={0.05}
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            className="accent-flame-600 w-24"
          />
          <span className="tabular-nums w-9 text-ink-500">{rate.toFixed(2)}×</span>
        </label>
      </div>

      {error && (
        <p className="mt-3 text-[11px] text-amber-700 leading-relaxed">{error}</p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-ink-500 leading-relaxed">
        {neuralSupported && (
          <button
            onClick={() => {
              if (status !== "idle") stop();
              setMode((m) => (m === "neural" ? "device" : "neural"));
              setError(null);
            }}
            className="underline decoration-dotted underline-offset-2 hover:text-ink-800"
          >
            {mode === "neural" ? "Use the device voice instead" : "Use the natural voice"}
          </button>
        )}
        <span>
          {mode === "neural"
            ? "A real neural voice runs privately on your device — downloaded once, then works offline."
            : "Your device's built-in voice. No download; quality varies by device."}
        </span>
      </div>
    </section>
  );
}
