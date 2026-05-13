"use client";

import { useEffect, useRef, useState } from "react";
import { getBook } from "@/data/bible/canon";

/**
 * Human-narrated audio Bible.
 *
 * Source: WordProject.org's public English (KJV) Bible audio, hosted at
 *   https://www.wordproject.org/bibles/audio/01_english/b{NN}_{CC}.mp3
 * where NN is the two-digit book order (01 Genesis … 66 Revelation) and CC
 * is the two-digit chapter number. WordProject is a 20+ year-old missionary
 * site that hosts free Bible resources for the world.
 *
 * We surface this as a clearly-labeled KJV audio track even when the user is
 * reading a different translation — because hearing Scripture read by a real
 * human alongside whatever text translation you have is genuinely useful.
 *
 * If the upstream file is unreachable, we show an honest "audio not available
 * for this chapter" message rather than a broken player.
 */
function audioUrl(bookOrder: number, chapter: number): string {
  const nn = String(bookOrder).padStart(2, "0");
  const cc = String(chapter).padStart(2, "0");
  return `https://www.wordproject.org/bibles/audio/01_english/b${nn}_${cc}.mp3`;
}

export default function AudioBibleControls({
  bookId,
  chapter,
}: {
  bookId: string;
  chapter: number;
}) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const book = getBook(bookId);

  useEffect(() => {
    setError(false);
    setLoaded(false);
  }, [bookId, chapter]);

  if (!book) return null;

  const src = audioUrl(book.order, chapter);

  return (
    <div className="rounded-2xl border border-ink-200 bg-card-subtle p-3 md:p-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-baseline gap-2 shrink-0">
          <span className="text-[10px] uppercase tracking-widest text-flame-700">
            Listen · human-narrated KJV
          </span>
          <span className="text-[10px] text-ink-400">
            via WordProject (free, public)
          </span>
        </div>

        {!error ? (
          <audio
            ref={audioRef}
            controls
            preload="none"
            className="flex-1 min-w-[200px] h-9"
            onError={() => setError(true)}
            onLoadedMetadata={() => setLoaded(true)}
          >
            <source src={src} type="audio/mpeg" />
            Your browser does not support audio playback.
          </audio>
        ) : (
          <div className="flex-1 text-xs text-amber-700 italic">
            Audio for {book.name} {chapter} couldn't load. The chapter is
            still readable above — and audio for more translations will arrive
            with the Bible-Brain integration.
          </div>
        )}

        {!error && (
          <a
            href={src}
            download={`${book.id}-${chapter}-kjv.mp3`}
            className="rounded-full border border-ink-300 bg-card px-3 py-1 text-xs text-ink-700 hover:border-ink-900 shrink-0"
            title="Download this chapter for offline listening"
          >
            ↓ MP3
          </a>
        )}
      </div>

      <p className="mt-2 text-[11px] text-ink-500 leading-relaxed">
        Real human narration of {book.name} {chapter} in the King James Version.
        You can play it alongside whatever translation you're reading above.
        {loaded ? "" : " First press of play may take a second to start."}
      </p>
    </div>
  );
}
