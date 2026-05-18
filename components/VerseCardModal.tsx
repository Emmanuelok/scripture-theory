"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Verse-card share modal.
 * Drives the existing /api/verse-card endpoint. Lets the believer preview,
 * theme-swap, copy-as-image, download, or native-share the verse card.
 */
export default function VerseCardModal({
  bookId,
  bookName,
  chapter,
  verse,
  verseText,
  translation,
  translationAbbrev,
  onClose,
}: {
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  verseText: string;
  translation: string;
  translationAbbrev: string;
  onClose: () => void;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [aspect, setAspect] = useState<"square" | "story" | "landscape">("square");
  const [imgLoaded, setImgLoaded] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const url = useMemo(
    () =>
      `/api/verse-card/${bookId}/${chapter}/${verse}?translation=${translation}&theme=${theme}&aspect=${aspect}`,
    [bookId, chapter, verse, translation, theme, aspect]
  );

  // Re-render the preview when aspect changes.
  useEffect(() => {
    setImgLoaded(false);
  }, [aspect]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function fetchBlob(): Promise<Blob | null> {
    try {
      const r = await fetch(url);
      if (!r.ok) return null;
      return await r.blob();
    } catch {
      return null;
    }
  }

  async function onDownload() {
    setBusy(true);
    setStatus("");
    const blob = await fetchBlob();
    if (!blob) {
      setStatus("Couldn't generate the card. Try again.");
      setBusy(false);
      return;
    }
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = `${bookId}-${chapter}-${verse}-${translation}-${theme}-${aspect}.png`;
    a.click();
    URL.revokeObjectURL(href);
    setStatus("Saved to your downloads.");
    setBusy(false);
  }

  async function onCopy() {
    setBusy(true);
    setStatus("");
    try {
      const blob = await fetchBlob();
      if (!blob) throw new Error("no blob");
      if ("clipboard" in navigator && "write" in navigator.clipboard) {
        await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
        setStatus("Image copied to clipboard.");
      } else {
        setStatus("Clipboard image copy is not supported here — try Download.");
      }
    } catch {
      setStatus("Couldn't copy the image — try Download instead.");
    } finally {
      setBusy(false);
    }
  }

  async function onShare() {
    setBusy(true);
    setStatus("");
    try {
      const blob = await fetchBlob();
      if (!blob) throw new Error("no blob");
      const file = new File([blob], `${bookId}-${chapter}-${verse}.png`, { type: blob.type });
      const data: ShareData = {
        title: `${bookName} ${chapter}:${verse}`,
        text: `"${verseText}" — ${bookName} ${chapter}:${verse} (${translationAbbrev})`,
        files: [file],
      };
      if (navigator.canShare?.(data) && navigator.share) {
        await navigator.share(data);
        setStatus("Shared.");
      } else if (navigator.share) {
        await navigator.share({ title: data.title, text: data.text });
        setStatus("Shared the text — image copy not supported on this device.");
      } else {
        setStatus("This device can't open the share sheet — try Download.");
      }
    } catch (e) {
      if ((e as Error)?.name !== "AbortError") {
        setStatus("Share canceled.");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-ink-900/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Share verse card"
      >
        <div
          className="relative w-full max-w-md rounded-3xl border border-ink-200 bg-card p-5 md:p-6 shadow-2xl max-h-[92vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-baseline justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-flame-700">Share</div>
              <h3 className="font-serif text-xl text-ink-900 mt-0.5">
                {bookName} {chapter}:{verse}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-xs text-ink-500 hover:text-ink-900"
              aria-label="Close"
            >
              Close ✕
            </button>
          </div>

          {/* Theme toggle */}
          <div className="mt-4 flex items-center gap-1.5 rounded-full bg-card-subtle border border-ink-200 p-1 w-fit">
            <button
              onClick={() => {
                setImgLoaded(false);
                setTheme("light");
              }}
              aria-pressed={theme === "light"}
              className={[
                "text-xs px-3 py-1 rounded-full",
                theme === "light" ? "bg-ink-900 text-ink-50" : "text-ink-600",
              ].join(" ")}
            >
              Light
            </button>
            <button
              onClick={() => {
                setImgLoaded(false);
                setTheme("dark");
              }}
              aria-pressed={theme === "dark"}
              className={[
                "text-xs px-3 py-1 rounded-full",
                theme === "dark" ? "bg-ink-900 text-ink-50" : "text-ink-600",
              ].join(" ")}
            >
              Dark
            </button>
          </div>

          {/* Aspect / format */}
          <div className="mt-3 flex items-center gap-1.5 rounded-full bg-card-subtle border border-ink-200 p-1 w-fit">
            {(
              [
                { id: "square", label: "Square · 1:1", title: "Feed posts" },
                { id: "story", label: "Story · 9:16", title: "Instagram / WhatsApp story" },
                { id: "landscape", label: "Wide · 16:9", title: "Slides / X" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                onClick={() => setAspect(opt.id)}
                aria-pressed={aspect === opt.id}
                title={opt.title}
                className={[
                  "text-xs px-3 py-1 rounded-full whitespace-nowrap",
                  aspect === opt.id ? "bg-ink-900 text-ink-50" : "text-ink-600",
                ].join(" ")}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Preview */}
          <div
            className={[
              "mt-4 relative rounded-2xl overflow-hidden border border-ink-200 bg-ink-50",
              aspect === "square"
                ? "aspect-square"
                : aspect === "story"
                ? "aspect-[9/16]"
                : "aspect-video",
            ].join(" ")}
          >
            {!imgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center text-ink-400 text-sm">
                Rendering card…
              </div>
            )}
            <img
              ref={imgRef}
              src={url}
              alt={`Verse card for ${bookName} ${chapter}:${verse}`}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgLoaded(true)}
              className={[
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
                imgLoaded ? "opacity-100" : "opacity-0",
              ].join(" ")}
            />
          </div>

          {/* Actions */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={onShare}
              disabled={busy}
              className="inline-flex items-center justify-center rounded-full bg-flame-600 text-ink-50 px-4 py-2 text-sm hover:bg-flame-700 disabled:opacity-50"
            >
              Share…
            </button>
            <button
              onClick={onDownload}
              disabled={busy}
              className="inline-flex items-center justify-center rounded-full border border-ink-300 px-4 py-2 text-sm text-ink-800 hover:border-ink-900 disabled:opacity-50"
            >
              ↓ Download
            </button>
            <button
              onClick={onCopy}
              disabled={busy}
              className="inline-flex items-center justify-center rounded-full border border-ink-300 px-4 py-2 text-sm text-ink-800 hover:border-ink-900 disabled:opacity-50 col-span-2"
            >
              Copy image to clipboard
            </button>
          </div>

          {status && (
            <p className="mt-3 text-xs text-ink-500" role="status">
              {status}
            </p>
          )}

          <p className="mt-3 text-[11px] text-ink-400 leading-relaxed">
            1080 × 1080 image with the verse in {translationAbbrev}. Made for social, made to be
            sent.
          </p>
        </div>
      </div>
    </>
  );
}
