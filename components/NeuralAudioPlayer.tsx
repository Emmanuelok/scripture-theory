"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  getActiveDevice,
  isNeuralTtsSupported,
  loadEngine,
  synthesize,
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
  /**
   * External "start from part N" trigger. Bump `nonce` (and set `index`) to make
   * the player start reading from a given segment — e.g. the Bible reader's
   * "Read from here" on a selected verse.
   */
  playRequest?: { index: number; nonce: number };
  className?: string;
};

const NEURAL_VOICE_KEY = "scripture-theory-tts-voice-neural";
const DEVICE_VOICE_KEY = "scripture-theory-tts-voice";
const RATE_KEY = "scripture-theory-tts-rate";
const MODE_KEY = "scripture-theory-tts-mode";

const APPROX_DOWNLOAD = "one-time download";

// A tiny silent WAV used to "unlock" the <audio> element inside the click
// handler. Browsers (especially iOS Safari) only allow programmatic playback
// after a user gesture; playing this during the click grants the element
// permission so the real audio — which starts seconds later, after the model
// loads — isn't blocked.
let silentUrlCache: string | null = null;
function silentWavUrl(): string {
  if (silentUrlCache) return silentUrlCache;
  const sampleRate = 8000;
  const samples = 1;
  const buf = new ArrayBuffer(44 + samples);
  const dv = new DataView(buf);
  const ascii = (off: number, s: string) => {
    for (let i = 0; i < s.length; i++) dv.setUint8(off + i, s.charCodeAt(i));
  };
  ascii(0, "RIFF");
  dv.setUint32(4, 36 + samples, true);
  ascii(8, "WAVE");
  ascii(12, "fmt ");
  dv.setUint32(16, 16, true);
  dv.setUint16(20, 1, true);
  dv.setUint16(22, 1, true);
  dv.setUint32(24, sampleRate, true);
  dv.setUint32(28, sampleRate, true);
  dv.setUint16(32, 1, true);
  dv.setUint16(34, 8, true);
  ascii(36, "data");
  dv.setUint32(40, samples, true);
  dv.setUint8(44, 128); // 8-bit silence
  let bin = "";
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  silentUrlCache = "data:audio/wav;base64," + btoa(bin);
  return silentUrlCache;
}

function fmtTime(s: number): string {
  if (!Number.isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
}

export default function NeuralAudioPlayer({
  title,
  eyebrow = "Listen",
  segments,
  resolveAudioUrl,
  playRequest,
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
  const [clock, setClock] = useState<{ current: number; duration: number }>({ current: 0, duration: 0 });

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
  const startIndexRef = useRef(0);
  // Live voice/speed so a change mid-reading applies to upcoming parts.
  const voiceRef = useRef(neuralVoiceId);
  const rateRef = useRef(rate);

  // A stable signature so we only reset when the *content* changes, not on
  // every parent re-render that hands us a fresh array identity.
  const contentSig = useMemo(
    () => `${segments.length}:${segments.map((s) => s.text).join("|").slice(0, 160)}`,
    [segments]
  );

  // ── init: audio element, device voices, saved prefs ────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    const audio = new Audio();
    audioRef.current = audio;
    const onTime = () =>
      setClock({
        current: audio.currentTime || 0,
        duration: Number.isFinite(audio.duration) ? audio.duration : 0,
      });
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onTime);
    audio.addEventListener("durationchange", onTime);

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
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onTime);
      audio.removeEventListener("durationchange", onTime);
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
  useEffect(() => { voiceRef.current = neuralVoiceId; }, [neuralVoiceId]);
  useEffect(() => { rateRef.current = rate; }, [rate]);
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
        p.catch((err: unknown) => {
          // play() was rejected (e.g. autoplay policy). Never hang: if the run
          // is still current, surface it so the loop stops with a clear error.
          if (stoppedRef.current) { cleanup(); resolve(); return; }
          // eslint-disable-next-line no-console
          console.warn("[tts] audio.play() rejected:", err);
          cleanup();
          reject(err instanceof Error ? err : new Error("audio playback blocked"));
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
    // Watchdog: if the model download makes no progress for 45s (blocked host,
    // dead connection), stop waiting and fall back rather than spin forever.
    let lastTick = Date.now();
    let stallTimer: ReturnType<typeof setInterval> | undefined;
    const clearStall = () => { if (stallTimer) clearInterval(stallTimer); stallTimer = undefined; };
    try {
      const watchdog = new Promise<never>((_, reject) => {
        stallTimer = setInterval(() => {
          if (Date.now() - lastTick > 45000) {
            reject(new Error("voice download stalled — network too slow or blocked"));
          }
        }, 5000);
      });
      await Promise.race([
        loadEngine((p: LoadProgress) => {
          lastTick = Date.now();
          if (p && typeof p.progress === "number") setLoadPct(Math.round(p.progress));
        }),
        watchdog,
      ]);
      clearStall();
    } catch (err) {
      clearStall();
      setLoadPct(null);
      if (runId !== runIdRef.current) return;
      const msg = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
      // eslint-disable-next-line no-console
      console.error("[tts] engine load failed — falling back to device voice:", err);
      // Neural couldn't load (offline, blocked network, unsupported device).
      // Show the real reason and fall back to the device voice for this run.
      setMode("device");
      setEngineBadge("Device voice");
      setError(`Natural voice couldn't load — ${msg}. Using your device's voice.`);
      return runDevice(runId, false);
    }
    setLoadPct(null);
    if (stoppedRef.current || runId !== runIdRef.current) return;

    setEngineBadge(deviceLabel());
    setStatus("playing");
    try {
      const textAt = (i: number) =>
        segments[i].label ? `${segments[i].label}. ${segments[i].text}` : segments[i].text;
      // Synthesise one segment, isolating failures so a single bad verse can't
      // end the whole reading. Returns null on error.
      const synth = async (i: number): Promise<Blob | null> => {
        try {
          return await synthesize(textAt(i), { voice: voiceRef.current, speed: rateRef.current });
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(`[tts] synth failed at part ${i + 1}:`, e);
          return null;
        }
      };
      const start = Math.min(Math.max(0, startIndexRef.current), Math.max(0, segments.length - 1));
      // Pipeline: generate the next segment while the current one plays so
      // WASM's slower synthesis doesn't stall playback between verses.
      let nextBlob: Promise<Blob | null> = segments.length ? synth(start) : Promise.resolve(null);
      for (let i = start; i < segments.length; i++) {
        if (stoppedRef.current || runId !== runIdRef.current) return;
        await waitIfPaused();
        if (stoppedRef.current || runId !== runIdRef.current) return;
        setPosition({ index: i + 1, total: segments.length });
        // eslint-disable-next-line no-console
        console.info(`[tts] part ${i + 1}/${segments.length}`);
        const blob = await nextBlob;
        // Kick off the next generation before playing this clip.
        nextBlob = i + 1 < segments.length ? synth(i + 1) : Promise.resolve(null);
        if (stoppedRef.current || runId !== runIdRef.current) return;
        await waitIfPaused();
        if (stoppedRef.current || runId !== runIdRef.current) return;
        if (!blob) continue; // failed segment — skip, keep reading
        const url = URL.createObjectURL(blob);
        objectUrlsRef.current.push(url);
        await playSource(url, true);
      }
      if (!stoppedRef.current && runId === runIdRef.current) {
        setStatus("idle");
        setPosition(null);
        startIndexRef.current = 0;
      }
    } catch (err) {
      if (runId !== runIdRef.current) return;
      // eslint-disable-next-line no-console
      console.error("[tts] playback error:", err);
      setStatus("idle");
      setPosition(null);
      const blocked = err instanceof Error && /allow|gesture|NotAllowed/i.test(err.name + err.message);
      setError(
        blocked
          ? "Your browser blocked audio autoplay. Tap Play once more to start."
          : "Couldn't play the natural voice here. Switch to the device voice to keep going."
      );
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
    // Voices can load lazily; re-read if our cached list is empty.
    const voices = deviceVoices.length ? deviceVoices : window.speechSynthesis.getVoices();
    const voice =
      voices.find((v) => v.voiceURI === deviceVoiceURI) ??
      voices.find((v) => v.lang.toLowerCase().startsWith("en")) ??
      voices[0];
    // eslint-disable-next-line no-console
    console.info(`[tts] device voice: ${voices.length} voice(s), using "${voice?.name ?? "default"}"`);

    let i = Math.min(Math.max(0, startIndexRef.current), Math.max(0, segments.length - 1));
    const step = () => {
      if (stoppedRef.current || runId !== runIdRef.current) return;
      if (i >= segments.length) {
        setStatus("idle");
        setPosition(null);
        startIndexRef.current = 0;
        return;
      }
      setPosition({ index: i + 1, total: segments.length });
      const seg = segments[i];
      const utter = new SpeechSynthesisUtterance(seg.label ? `${seg.label}. ${seg.text}` : seg.text);
      if (voice) utter.voice = voice;
      utter.rate = rate;
      utter.lang = voice?.lang ?? "en-US";
      utter.onend = () => { i += 1; step(); };
      utter.onerror = (e) => {
        // eslint-disable-next-line no-console
        console.error("[tts] speechSynthesis error:", e.error);
        if (e.error !== "interrupted" && e.error !== "canceled") {
          setStatus("idle");
          setPosition(null);
          setError(`Your device's voice failed (${e.error}). No offline voices may be installed.`);
        }
      };
      window.speechSynthesis.speak(utter);
      // Chrome sometimes leaves the queue paused after a prior cancel(); nudge it.
      try { window.speechSynthesis.resume(); } catch {}
    };
    step();
  }

  // ── public controls ────────────────────────────────────────────────────────
  function play(startIndex = 0) {
    startIndexRef.current = Math.max(0, startIndex);
    hardStop();
    stoppedRef.current = false;
    pausedRef.current = false;

    // Unlock the audio element within this user gesture so a later
    // programmatic play() (after the model loads) isn't blocked by autoplay.
    const a = audioRef.current;
    if (a) {
      try {
        a.src = silentWavUrl();
        const up = a.play();
        if (up && typeof up.then === "function") {
          up.then(() => {
            if (a.src.startsWith("data:")) { a.pause(); a.currentTime = 0; }
          }).catch(() => {});
        }
      } catch {
        /* best effort */
      }
    }

    // Prime speechSynthesis in the same gesture so the device-voice fallback
    // still speaks if it kicks in seconds later (after a failed neural load).
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
        const warm = new SpeechSynthesisUtterance(" ");
        warm.volume = 0;
        window.speechSynthesis.speak(warm);
      } catch {
        /* best effort */
      }
    }

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
    setClock({ current: 0, duration: 0 });
    startIndexRef.current = 0;
  }

  /** Restart playback from a given part index (0-based). */
  function jumpTo(index: number) {
    const clamped = Math.min(Math.max(0, index), Math.max(0, segments.length - 1));
    play(clamped);
  }
  const currentZeroBased = (position?.index ?? 1) - 1;
  function prevPart() { jumpTo(currentZeroBased - 1); }
  function nextPart() { jumpTo(currentZeroBased + 1); }

  /** Seek within the currently playing clip (device voice can't seek). */
  function seekTo(seconds: number) {
    const audio = audioRef.current;
    if (audio && Number.isFinite(audio.duration) && audio.duration > 0) {
      audio.currentTime = Math.min(Math.max(0, seconds), audio.duration);
      setClock({ current: audio.currentTime, duration: audio.duration });
    }
  }

  // Fulfil an external "play from part N" request (e.g. "Read from here").
  useEffect(() => {
    if (playRequest && playRequest.nonce > 0) play(playRequest.index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playRequest?.nonce]);

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

      {/* Seek bar for the current clip (neural / studio audio; the device
          voice can't be scrubbed, so its duration stays 0 and this hides). */}
      {(status === "playing" || status === "paused") && clock.duration > 0 && (
        <div className="mb-3 flex items-center gap-2">
          <span className="text-[10px] tabular-nums text-ink-500 w-9 text-right">
            {fmtTime(clock.current)}
          </span>
          <input
            type="range"
            min={0}
            max={clock.duration}
            step={0.1}
            value={Math.min(clock.current, clock.duration)}
            onChange={(e) => seekTo(parseFloat(e.target.value))}
            className="flex-1 accent-flame-600"
            aria-label="Seek within the current part"
          />
          <span className="text-[10px] tabular-nums text-ink-500 w-9">
            {fmtTime(clock.duration)}
          </span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {status === "idle" && (
          <button
            onClick={() => play()}
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
        {(status === "playing" || status === "paused") && segments.length > 1 && (
          <>
            <button
              onClick={prevPart}
              disabled={currentZeroBased <= 0}
              title="Previous part"
              aria-label="Previous part"
              className="inline-flex items-center rounded-full border border-ink-300 px-2.5 py-1.5 text-sm text-ink-700 hover:border-ink-900 disabled:opacity-40 disabled:hover:border-ink-300"
            >
              ⏮
            </button>
            <button
              onClick={nextPart}
              disabled={currentZeroBased >= segments.length - 1}
              title="Next part"
              aria-label="Next part"
              className="inline-flex items-center rounded-full border border-ink-300 px-2.5 py-1.5 text-sm text-ink-700 hover:border-ink-900 disabled:opacity-40 disabled:hover:border-ink-300"
            >
              ⏭
            </button>
          </>
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
            className="rounded-full border border-ink-300 bg-card px-3 py-1 text-xs text-ink-700 max-w-[220px] truncate"
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
