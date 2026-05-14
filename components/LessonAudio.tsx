"use client";

import { useEffect, useRef, useState } from "react";

/**
 * LessonAudio — device-voice (browser SpeechSynthesis) for course
 * content. Distinct from the Bible reader (which we deliberately do
 * not auto-narrate) because here the content is the platform's own
 * editorial: the lesson, the scripture quoted, the memory verse, the
 * prayer prompts. Reading it aloud is a legitimate accessibility
 * affordance for commuters, the visually impaired, dyslexic readers,
 * and anyone who prefers ear to eye.
 *
 * Saves voice + rate preferences globally; resets state when the
 * underlying script changes.
 */

type Segment = { label: string; text: string };

type Props = {
  /** Title shown in the player (e.g. "Week 1 · Who Jesus Is"). */
  title: string;
  /** Ordered segments to read. Each is announced with its label. */
  segments: Segment[];
};

const VOICE_PREF_KEY = "scripture-theory-tts-voice";
const RATE_PREF_KEY = "scripture-theory-tts-rate";

export default function LessonAudio({ title, segments }: Props) {
  const [supported, setSupported] = useState<boolean>(true);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceURI, setVoiceURI] = useState<string>("");
  const [rate, setRate] = useState<number>(1);
  const [status, setStatus] = useState<"idle" | "speaking" | "paused">("idle");
  const [position, setPosition] = useState<{ segment: number; total: number } | null>(
    null
  );
  const cancelledRef = useRef(false);

  // Init: detect support, load voices, load saved prefs
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }
    function refresh() {
      const v = window.speechSynthesis.getVoices();
      setVoices(v);
    }
    refresh();
    window.speechSynthesis.addEventListener?.("voiceschanged", refresh);

    try {
      const saved = window.localStorage.getItem(VOICE_PREF_KEY);
      if (saved) setVoiceURI(saved);
      const r = window.localStorage.getItem(RATE_PREF_KEY);
      if (r) setRate(parseFloat(r));
    } catch {}

    return () => {
      window.speechSynthesis.removeEventListener?.("voiceschanged", refresh);
      window.speechSynthesis.cancel();
    };
  }, []);

  // Stop when segments change (different week)
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    setStatus("idle");
    setPosition(null);
    cancelledRef.current = false;
  }, [segments]);

  // Persist prefs
  useEffect(() => {
    if (!voiceURI) return;
    try { window.localStorage.setItem(VOICE_PREF_KEY, voiceURI); } catch {}
  }, [voiceURI]);
  useEffect(() => {
    try { window.localStorage.setItem(RATE_PREF_KEY, String(rate)); } catch {}
  }, [rate]);

  // Pick a default voice if none selected — prefer English
  const effectiveVoice = (() => {
    if (voiceURI) return voices.find((v) => v.voiceURI === voiceURI);
    return voices.find((v) => v.lang.toLowerCase().startsWith("en")) ?? voices[0];
  })();

  function play() {
    if (!supported) return;
    window.speechSynthesis.cancel();
    cancelledRef.current = false;
    let i = 0;
    function step() {
      if (cancelledRef.current) return;
      if (i >= segments.length) {
        setStatus("idle");
        setPosition(null);
        return;
      }
      const seg = segments[i];
      setPosition({ segment: i + 1, total: segments.length });
      const utter = new SpeechSynthesisUtterance(`${seg.label}. ${seg.text}`);
      if (effectiveVoice) utter.voice = effectiveVoice;
      utter.rate = rate;
      utter.lang = effectiveVoice?.lang ?? "en-US";
      utter.onend = () => {
        i += 1;
        step();
      };
      utter.onerror = () => {
        setStatus("idle");
        setPosition(null);
      };
      window.speechSynthesis.speak(utter);
    }
    setStatus("speaking");
    step();
  }

  function pause() {
    window.speechSynthesis.pause();
    setStatus("paused");
  }
  function resume() {
    window.speechSynthesis.resume();
    setStatus("speaking");
  }
  function stop() {
    cancelledRef.current = true;
    window.speechSynthesis.cancel();
    setStatus("idle");
    setPosition(null);
  }

  if (!supported) {
    return (
      <div className="rounded-2xl border border-ink-200 bg-card-subtle p-4 text-sm text-ink-600">
        This device doesn't support speech synthesis. Try a modern browser, or read the lesson as
        usual.
      </div>
    );
  }

  return (
    <section className="rounded-2xl border border-ink-200 bg-card-subtle p-4 md:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-flame-700">
            Listen · device voice
          </div>
          <h3 className="font-serif text-base text-ink-900 mt-0.5">{title}</h3>
        </div>
        {position && (
          <span className="text-[11px] text-ink-500">
            Part {position.segment} / {position.total}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {status === "idle" && (
          <button
            onClick={play}
            className="inline-flex items-center gap-1.5 rounded-full bg-flame-600 text-ink-50 px-4 py-1.5 text-sm hover:bg-flame-500"
          >
            ▶ Play
          </button>
        )}
        {status === "speaking" && (
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
        {status !== "idle" && (
          <button
            onClick={stop}
            className="inline-flex items-center rounded-full border border-ink-300 px-3 py-1.5 text-sm text-ink-700 hover:border-ink-900"
          >
            ■ Stop
          </button>
        )}

        {voices.length > 0 && (
          <select
            value={voiceURI || effectiveVoice?.voiceURI || ""}
            onChange={(e) => setVoiceURI(e.target.value)}
            className="rounded-full border border-ink-300 bg-card px-3 py-1 text-xs text-ink-700 max-w-[220px] truncate"
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

      <p className="mt-3 text-[11px] text-ink-500 leading-relaxed">
        Your device reads the lesson aloud — works offline once the page is cached. For
        commuters, the visually impaired, and anyone who learns by ear.
      </p>
    </section>
  );
}
