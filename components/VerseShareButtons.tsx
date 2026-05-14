"use client";

import { useState } from "react";
import VerseCardModal from "@/components/VerseCardModal";

/**
 * Inline share-row used on the verse permalink page. Reuses
 * VerseCardModal for the heavy lifting (download / copy image /
 * native share-with-files).
 */
export default function VerseShareButtons({
  bookId,
  bookName,
  chapter,
  verse,
  verseText,
  translation,
  translationAbbrev,
}: {
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  verseText: string;
  translation: string;
  translationAbbrev: string;
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");

  const ref = `${bookName} ${chapter}:${verse}`;
  const text = `"${verseText}" — ${ref} (${translationAbbrev})`;
  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/verse/${bookId}/${chapter}/${verse}`
      : "";

  async function copyText() {
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setStatus("Verse + link copied.");
    } catch {
      setStatus("Couldn't copy — long-press to copy manually.");
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("Link copied.");
    } catch {
      setStatus("Couldn't copy — long-press to copy manually.");
    }
  }

  async function nativeShare() {
    if (!navigator.share) {
      copyText();
      return;
    }
    try {
      await navigator.share({ title: ref, text, url });
      setStatus("Shared.");
    } catch (e) {
      if ((e as Error)?.name !== "AbortError") setStatus("Share canceled.");
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={nativeShare}
          className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-500"
        >
          Share…
        </button>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2 text-sm text-ink-800 hover:border-ink-900"
        >
          Make a card
        </button>
        <button
          onClick={copyText}
          className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2 text-sm text-ink-800 hover:border-ink-900"
        >
          Copy verse + link
        </button>
        <button
          onClick={copyLink}
          className="inline-flex items-center rounded-full border border-ink-300 px-4 py-2 text-sm text-ink-600 hover:border-ink-900"
        >
          Copy link only
        </button>
      </div>
      {status && (
        <p className="mt-2 text-xs text-ink-500" role="status">
          {status}
        </p>
      )}

      {open && (
        <VerseCardModal
          bookId={bookId}
          bookName={bookName}
          chapter={chapter}
          verse={verse}
          verseText={verseText}
          translation={translation}
          translationAbbrev={translationAbbrev}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
