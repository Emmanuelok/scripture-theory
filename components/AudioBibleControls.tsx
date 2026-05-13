"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ChapterText } from "@/data/bible/seed";

const RATES = [0.85, 1.0, 1.15, 1.3];

// Map a translation language to the BCP-47 prefix for matching browser voices.
const LANG_PREFIX: Record<string, string> = {
  English: "en",
  Spanish: "es",
  Portuguese: "pt",
  French: "fr",
  German: "de",
  Russian: "ru",
  Chinese: "zh",
  Latin: "la",
};

export default function AudioBibleControls({
  chapter,
  language,
}: {
  chapter: ChapterText | undefined;
  language: string;
}) {
  const [supported, setSupported] = useState(false);
  const [status, setStatus] = useState<"idle" | "playing" | "paused">("idle");
  const [rate, setRate] = useState(1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceURI, setVoiceURI] = useState<string | null>(null);
  const [activeVerse, setActiveVerse] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const queueRef = useRef<SpeechSynthesisUtterance[]>([]);

  // Detect support + load voices
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }
    setSupported(true);

    const refresh = () => {
      const all = window.speechSynthesis.getVoices();
      setVoices(all);
      if (!voiceURI && all.length > 0) {
        const want = LANG_PREFIX[language] ?? "en";
        const match =
          all.find((v) => v.lang.toLowerCase().startsWith(`${want}-`)) ??
          all.find((v) => v.lang.toLowerCase().startsWith(want));
        if (match) setVoiceURI(match.voiceURI);
      }
    };
    refresh();
    window.speechSynthesis.onvoiceschanged = refresh;
    return () => {
      window.speechSynthesis.cancel();
      window.speechSynthesis.onvoiceschanged = null;
    };
    // language dependency is enough — voiceURI is internal
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const stop = useCallback(() => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    queueRef.current = [];
    setStatus("idle");
    setActiveVerse(null);
  }, []);

  const play = useCallback(() => {
    if (!chapter || typeof window === "undefined") return;
    setError(null);
    window.speechSynthesis.cancel();

    const voice = voices.find((v) => v.voiceURI === voiceURI) ?? null;

    // Speak each verse as its own utterance so we can highlight which verse
    // is currently being read.
    const utterances = chapter.verses.map((v) => {
      const u = new SpeechSynthesisUtterance(v.t);
      u.rate = rate;
      if (voice) {
        u.voice = voice;
        u.lang = voice.lang;
      }
      u.onstart = () => setActiveVerse(v.v);
      u.onend = () => {
        // last verse: end
        if (chapter.verses[chapter.verses.length - 1].v === v.v) {
          setStatus("idle");
          setActiveVerse(null);
        }
      };
      u.onerror = (ev) => {
        // Browsers fire `interrupted` when cancel() is called intentionally —
        // not an error worth surfacing.
        if ((ev as SpeechSynthesisErrorEvent).error !== "interrupted") {
          setError((ev as SpeechSynthesisErrorEvent).error || "speech error");
          setStatus("idle");
        }
      };
      return u;
    });

    queueRef.current = utterances;
    setStatus("playing");
    for (const u of utterances) window.speechSynthesis.speak(u);
  }, [chapter, rate, voiceURI, voices]);

  const pause = useCallback(() => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.pause();
    setStatus("paused");
  }, []);

  const resume = useCallback(() => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.resume();
    setStatus("playing");
  }, []);

  // Stop on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") window.speechSynthesis.cancel();
    };
  }, []);

  // If the user changes rate or voice while playing, restart from the top.
  useEffect(() => {
    if (status === "playing") {
      play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rate, voiceURI]);

  if (!supported) {
    return (
      <div className="text-xs text-ink-500 italic">
        Audio Bible isn't supported in this browser.
      </div>
    );
  }

  const matchingVoices = voices.filter((v) => {
    const want = LANG_PREFIX[language] ?? "en";
    return v.lang.toLowerCase().startsWith(want);
  });
  const usableVoices = matchingVoices.length > 0 ? matchingVoices : voices;

  return (
    <div className="rounded-2xl border border-ink-200 bg-card-subtle p-3 md:p-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          {status === "idle" && (
            <button
              onClick={play}
              disabled={!chapter}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 text-ink-50 px-4 py-1.5 text-sm hover:bg-flame-700 disabled:opacity-40"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                <path d="M8 5v14l11-7z" />
              </svg>
              Listen
            </button>
          )}
          {status === "playing" && (
            <>
              <button
                onClick={pause}
                className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 text-ink-50 px-4 py-1.5 text-sm hover:bg-flame-700"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
                </svg>
                Pause
              </button>
              <button
                onClick={stop}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink-300 px-3 py-1.5 text-xs text-ink-700 hover:border-ink-900"
              >
                Stop
              </button>
            </>
          )}
          {status === "paused" && (
            <>
              <button
                onClick={resume}
                className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 text-ink-50 px-4 py-1.5 text-sm hover:bg-flame-700"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Resume
              </button>
              <button
                onClick={stop}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink-300 px-3 py-1.5 text-xs text-ink-700 hover:border-ink-900"
              >
                Stop
              </button>
            </>
          )}
        </div>

        {/* Speed */}
        <div className="flex items-center gap-1 ml-auto">
          <span className="text-[10px] uppercase tracking-widest text-ink-500 mr-1">Speed</span>
          {RATES.map((r) => (
            <button
              key={r}
              onClick={() => setRate(r)}
              className={`h-7 px-2 rounded-full text-xs font-medium transition-colors ${
                Math.abs(rate - r) < 0.01
                  ? "bg-ink-900 text-ink-50"
                  : "text-ink-500 hover:text-ink-900"
              }`}
            >
              {r === 1 ? "1×" : `${r}×`}
            </button>
          ))}
        </div>

        {/* Voice */}
        {usableVoices.length > 0 && (
          <select
            value={voiceURI ?? ""}
            onChange={(e) => setVoiceURI(e.target.value || null)}
            className="rounded-full border border-ink-300 bg-card px-3 py-1.5 text-xs text-ink-700 hover:border-ink-900 focus:outline-none focus:ring-2 focus:ring-flame-300 max-w-[12rem]"
            title="Voice"
          >
            {usableVoices.map((v) => (
              <option key={v.voiceURI} value={v.voiceURI}>
                {v.name} ({v.lang})
              </option>
            ))}
          </select>
        )}
      </div>

      {activeVerse !== null && status === "playing" && (
        <div className="mt-2 text-xs text-flame-700">
          Now reading verse {activeVerse} · tap any verse to jump in
        </div>
      )}

      {error && (
        <div className="mt-2 text-xs text-amber-700">
          Audio error: {error}. Try a different voice or browser.
        </div>
      )}

      <p className="mt-2 text-[11px] text-ink-500 leading-relaxed">
        Reads the chapter using your browser's built-in voices — works offline,
        in your language, no account needed.
      </p>
    </div>
  );
}
