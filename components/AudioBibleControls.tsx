"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getBook } from "@/data/bible/canon";

/**
 * Audio Bible — two modes that always give the believer audio.
 *
 *  1. Human-narrated KJV via our server-side proxy (real recordings).
 *  2. Device voice via the browser's SpeechSynthesis API (TTS) reading
 *     the actual verses we have in the page. Works offline once the
 *     page itself is cached. Locale-aware.
 *
 * The component starts in "human" mode, probes our proxy on play, and
 * silently switches to "device voice" mode if the upstream is
 * unreachable — so the user never sees a dead player.
 */

type Verse = { v: number; t: string };
type Mode = "human" | "device";

function pad2(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

export default function AudioBibleControls({
  bookId,
  chapter,
  bookName,
  verses,
  langCode = "en",
}: {
  bookId: string;
  chapter: number;
  bookName?: string;
  verses?: Verse[];
  langCode?: string;
}) {
  const book = getBook(bookId);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [mode, setMode] = useState<Mode>("human");
  const [humanStatus, setHumanStatus] = useState<"idle" | "loading" | "ready" | "missing">("idle");
  const [ttsStatus, setTtsStatus] = useState<"idle" | "speaking" | "paused">("idle");
  const [ttsRate, setTtsRate] = useState(1);
  const [ttsVoiceURI, setTtsVoiceURI] = useState<string>("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [ttsProgress, setTtsProgress] = useState<{ verse: number; total: number } | null>(null);

  const order = book?.order ?? 0;
  const proxyUrl = useMemo(
    () => (order > 0 ? `/api/audio-bible/${pad2(order)}/${pad2(chapter)}` : ""),
    [order, chapter]
  );

  // Reset state when chapter changes
  useEffect(() => {
    setHumanStatus("idle");
    setTtsStatus("idle");
    setTtsProgress(null);
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, [bookId, chapter]);

  // Load device voices
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    function refresh() {
      const v = window.speechSynthesis.getVoices();
      setVoices(v);
      // Prefer a voice matching the chapter's language
      if (!ttsVoiceURI && v.length > 0) {
        const match =
          v.find((x) => x.lang.toLowerCase().startsWith(langCode.toLowerCase())) ?? v[0];
        if (match) setTtsVoiceURI(match.voiceURI);
      }
    }
    refresh();
    window.speechSynthesis.addEventListener?.("voiceschanged", refresh);
    return () => window.speechSynthesis.removeEventListener?.("voiceschanged", refresh);
  }, [langCode, ttsVoiceURI]);

  // Stop TTS on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!book) return null;

  /* ── Device voice (TTS) ───────────────────────────────── */

  function speakChapter() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (!verses || verses.length === 0) return;

    window.speechSynthesis.cancel();
    const voice = voices.find((v) => v.voiceURI === ttsVoiceURI);

    let i = 0;
    function next() {
      if (i >= verses!.length) {
        setTtsStatus("idle");
        setTtsProgress(null);
        return;
      }
      const v = verses![i];
      setTtsProgress({ verse: v.v, total: verses!.length });
      const utter = new SpeechSynthesisUtterance(`Verse ${v.v}. ${v.t}`);
      if (voice) utter.voice = voice;
      utter.rate = ttsRate;
      utter.lang = voice?.lang ?? langCode;
      utter.onend = () => {
        i += 1;
        next();
      };
      utter.onerror = () => {
        setTtsStatus("idle");
        setTtsProgress(null);
      };
      window.speechSynthesis.speak(utter);
    }

    setTtsStatus("speaking");
    next();
  }

  function pauseTts() {
    window.speechSynthesis.pause();
    setTtsStatus("paused");
  }
  function resumeTts() {
    window.speechSynthesis.resume();
    setTtsStatus("speaking");
  }
  function stopTts() {
    window.speechSynthesis.cancel();
    setTtsStatus("idle");
    setTtsProgress(null);
  }

  /* ── Human narration (proxy) ──────────────────────────── */

  async function tryHuman() {
    if (!proxyUrl) return;
    setHumanStatus("loading");
    try {
      const head = await fetch(proxyUrl, { method: "HEAD" });
      if (head.ok) {
        setHumanStatus("ready");
        // Defer play to user gesture below
      } else {
        setHumanStatus("missing");
        setMode("device");
      }
    } catch {
      setHumanStatus("missing");
      setMode("device");
    }
  }

  const ttsAvailable =
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    !!verses &&
    verses.length > 0;

  return (
    <div className="rounded-2xl border border-ink-200 bg-card-subtle p-3 md:p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <span className="text-[10px] uppercase tracking-widest text-flame-700">
            Listen · {book.name} {chapter}
          </span>
          {mode === "human" && humanStatus === "missing" && (
            <span className="text-[10px] text-amber-700">
              Human KJV unavailable — switched to device voice
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 rounded-full bg-card border border-ink-200 p-0.5">
          <button
            onClick={() => {
              setMode("human");
              if (humanStatus === "idle") tryHuman();
            }}
            aria-pressed={mode === "human"}
            className={[
              "text-xs px-3 py-1 rounded-full transition-colors",
              mode === "human" ? "bg-ink-900 text-ink-50" : "text-ink-600 hover:text-ink-900",
            ].join(" ")}
            title="Human-narrated KJV audio"
          >
            Human · KJV
          </button>
          <button
            onClick={() => setMode("device")}
            aria-pressed={mode === "device"}
            disabled={!ttsAvailable}
            className={[
              "text-xs px-3 py-1 rounded-full transition-colors",
              mode === "device" ? "bg-ink-900 text-ink-50" : "text-ink-600 hover:text-ink-900",
              !ttsAvailable && "opacity-50 cursor-not-allowed",
            ]
              .filter(Boolean)
              .join(" ")}
            title="Read aloud on this device (TTS)"
          >
            Device voice
          </button>
        </div>
      </div>

      <div className="mt-3">
        {mode === "human" ? (
          humanStatus === "missing" ? (
            <p className="text-xs text-ink-500 italic">
              Real human KJV audio is unavailable for this chapter right now. Use Device voice
              above — it reads the actual verses on this page.
            </p>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <audio
                ref={audioRef}
                controls
                preload="none"
                className="flex-1 min-w-[200px] h-9"
                onPlay={() => {
                  if (humanStatus === "idle") setHumanStatus("loading");
                }}
                onCanPlay={() => setHumanStatus("ready")}
                onError={() => {
                  setHumanStatus("missing");
                  setMode("device");
                }}
              >
                <source src={proxyUrl} type="audio/mpeg" />
                Your browser does not support audio playback.
              </audio>
              <a
                href={proxyUrl}
                download={`${book.id}-${chapter}-kjv.mp3`}
                className="rounded-full border border-ink-300 bg-card px-3 py-1 text-xs text-ink-700 hover:border-ink-900 shrink-0"
                title="Download this chapter for offline listening"
              >
                ↓ MP3
              </a>
            </div>
          )
        ) : ttsAvailable ? (
          <div className="flex flex-wrap items-center gap-2">
            {ttsStatus === "idle" && (
              <button
                onClick={speakChapter}
                className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-4 py-1.5 text-sm hover:bg-flame-700"
              >
                ▶ Read aloud
              </button>
            )}
            {ttsStatus === "speaking" && (
              <button
                onClick={pauseTts}
                className="inline-flex items-center rounded-full bg-ink-900 text-ink-50 px-4 py-1.5 text-sm hover:bg-flame-700"
              >
                ❚❚ Pause
              </button>
            )}
            {ttsStatus === "paused" && (
              <button
                onClick={resumeTts}
                className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-4 py-1.5 text-sm hover:bg-flame-700"
              >
                ▶ Resume
              </button>
            )}
            {(ttsStatus === "speaking" || ttsStatus === "paused") && (
              <button
                onClick={stopTts}
                className="inline-flex items-center rounded-full border border-ink-300 px-3 py-1.5 text-sm text-ink-700 hover:border-ink-900"
              >
                ■ Stop
              </button>
            )}

            {voices.length > 0 && (
              <select
                value={ttsVoiceURI}
                onChange={(e) => setTtsVoiceURI(e.target.value)}
                className="rounded-full border border-ink-300 bg-card px-3 py-1 text-xs text-ink-700 max-w-[200px] truncate"
                aria-label="Voice"
                title="Choose a voice"
              >
                {voices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} · {v.lang}
                  </option>
                ))}
              </select>
            )}

            <label className="flex items-center gap-1.5 text-xs text-ink-600">
              <span>Speed</span>
              <input
                type="range"
                min={0.75}
                max={1.5}
                step={0.05}
                value={ttsRate}
                onChange={(e) => setTtsRate(parseFloat(e.target.value))}
                className="accent-flame-600"
              />
              <span className="tabular-nums w-8 text-ink-500">{ttsRate.toFixed(2)}×</span>
            </label>

            {ttsProgress && (
              <span className="text-[11px] text-ink-500 ml-auto">
                Reading verse {ttsProgress.verse} / {ttsProgress.total}
              </span>
            )}
          </div>
        ) : (
          <p className="text-xs text-ink-500 italic">
            This device doesn't support speech synthesis. Try a modern browser, or use Human · KJV.
          </p>
        )}
      </div>

      <p className="mt-2 text-[11px] text-ink-500 leading-relaxed">
        {mode === "human"
          ? `Real human narration of ${book.name} ${chapter} (KJV), streamed through our server.`
          : `Your device reads ${bookName ?? book.name} ${chapter} aloud from the verses on this page — works offline.`}
      </p>
    </div>
  );
}
