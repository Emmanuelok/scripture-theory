"use client";

import { useEffect, useState } from "react";

/**
 * Install prompt for the PWA.
 *
 * - Android / Desktop Chrome: listens for `beforeinstallprompt`, stashes
 *   the event, and shows a small banner with an "Install" button.
 * - iOS Safari: doesn't expose a programmatic install, so we show
 *   instructions: tap Share → Add to Home Screen.
 *
 * Dismissals (or installs) are remembered in localStorage so we never
 * pester the believer.
 */

const DISMISS_KEY = "scripture-theory-install-dismissed";
const INSTALLED_KEY = "scripture-theory-installed";
const SUPPRESS_DAYS = 30;

type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isIos(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || (navigator as { vendor?: string }).vendor || "";
  const iOS = /iPad|iPhone|iPod/.test(ua) && !("MSStream" in window);
  // Newer iPads report as Mac with touch support
  const iPadOS =
    /Macintosh/.test(ua) && typeof document !== "undefined" && "ontouchend" in document;
  return iOS || iPadOS;
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(display-mode: standalone)").matches) return true;
  // iOS-specific
  return Boolean((window.navigator as { standalone?: boolean }).standalone);
}

function recentlyDismissed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    const at = new Date(raw).getTime();
    if (Number.isNaN(at)) return false;
    return Date.now() - at < SUPPRESS_DAYS * 86_400_000;
  } catch {
    return false;
  }
}

export default function InstallPrompt() {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<"android" | "ios">("android");
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isStandalone()) {
      try {
        window.localStorage.setItem(INSTALLED_KEY, "1");
      } catch {}
      return;
    }
    if (recentlyDismissed()) return;
    if (typeof window.localStorage !== "undefined" && window.localStorage.getItem(INSTALLED_KEY)) {
      return;
    }

    // Android / desktop Chrome
    function onBIP(e: Event) {
      e.preventDefault();
      setDeferred(e as BIPEvent);
      setMode("android");
      // Tiny delay so it doesn't fight the page on load
      setTimeout(() => setShow(true), 1500);
    }
    window.addEventListener("beforeinstallprompt", onBIP);

    // Track real installs
    function onInstalled() {
      try {
        window.localStorage.setItem(INSTALLED_KEY, "1");
      } catch {}
      setShow(false);
    }
    window.addEventListener("appinstalled", onInstalled);

    // iOS branch — show instructions after a short delay on iOS only
    if (isIos()) {
      setMode("ios");
      const t = setTimeout(() => setShow(true), 3000);
      return () => {
        clearTimeout(t);
        window.removeEventListener("beforeinstallprompt", onBIP);
        window.removeEventListener("appinstalled", onInstalled);
      };
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onBIP);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  function dismiss() {
    setShow(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, new Date().toISOString());
    } catch {}
  }

  async function doInstall() {
    if (!deferred) return;
    try {
      await deferred.prompt();
      const choice = await deferred.userChoice;
      if (choice.outcome === "accepted") {
        try {
          window.localStorage.setItem(INSTALLED_KEY, "1");
        } catch {}
      } else {
        dismiss();
      }
    } catch {
      dismiss();
    } finally {
      setDeferred(null);
      setShow(false);
    }
  }

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 pointer-events-none">
      <div className="mx-auto max-w-2xl px-3 pb-3 md:pb-5">
        <div
          role="dialog"
          aria-label="Add Scripture Theory to your home screen"
          className="pointer-events-auto relative overflow-hidden rounded-2xl border border-ink-200 bg-ink-900 text-ink-50 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] animate-slide-up"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-80"
            style={{
              background:
                "radial-gradient(60% 50% at 0% 0%, rgba(249,115,22,0.18), transparent 60%), radial-gradient(40% 40% at 100% 100%, rgba(184,66,12,0.16), transparent 60%)",
            }}
          />
          <div className="relative p-4 md:p-5">
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-0.5">
                {/* Bundled SVG monogram — keeps it crisp without an extra request */}
                <svg
                  viewBox="0 0 64 64"
                  width="40"
                  height="40"
                  className="rounded-xl border border-ink-700"
                  aria-hidden
                >
                  <rect width="64" height="64" rx="14" fill="#0a0604" />
                  <text
                    x="32"
                    y="42"
                    textAnchor="middle"
                    fontFamily="Georgia, serif"
                    fontSize="28"
                    fontWeight="600"
                    fill="#fdba74"
                  >
                    ST
                  </text>
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] uppercase tracking-[0.18em] text-flame-300">
                  Install Scripture Theory
                </div>
                <h3 className="font-serif text-lg leading-snug mt-0.5">
                  {mode === "ios"
                    ? "Keep it on your home screen."
                    : "Add it to your home screen."}
                </h3>
                {mode === "ios" ? (
                  <p className="mt-1 text-xs text-ink-300 leading-relaxed">
                    Tap the{" "}
                    <span className="inline-flex items-center gap-1 rounded-md bg-ink-800/80 px-1.5 py-0.5 text-flame-300">
                      <svg
                        viewBox="0 0 24 24"
                        width="12"
                        height="12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M12 16V4M8 8l4-4 4 4M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
                      </svg>
                      Share
                    </span>{" "}
                    button in Safari, then{" "}
                    <span className="text-flame-300">Add to Home Screen</span>. Opens full-screen,
                    works offline, no app store needed.
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-ink-300 leading-relaxed">
                    One tap. Full-screen, on your home screen, works offline. Not an app store
                    install — just a quiet shortcut to the Word.
                  </p>
                )}
              </div>
              <button
                onClick={dismiss}
                aria-label="Dismiss"
                className="shrink-0 text-ink-400 hover:text-ink-50 text-lg leading-none px-1"
              >
                ✕
              </button>
            </div>

            {mode === "android" && deferred && (
              <div className="relative mt-3 flex flex-wrap gap-2">
                <button
                  onClick={doInstall}
                  className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-4 py-1.5 text-sm hover:bg-flame-500 transition-colors"
                >
                  Install →
                </button>
                <button
                  onClick={dismiss}
                  className="inline-flex items-center rounded-full border border-ink-700 px-4 py-1.5 text-sm text-ink-300 hover:border-flame-300 hover:text-ink-50 transition-colors"
                >
                  Not now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
