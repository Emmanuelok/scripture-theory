"use client";

import { useEffect, useRef, useState } from "react";
import { useProfile } from "@/lib/profile";
import { LOCALE_LABELS, RTL_LOCALES } from "@/data/ui-i18n";
import { localeOrder } from "@/data/gospel-i18n";
import type { LocaleCode } from "@/data/gospel-i18n";

/**
 * Tiny locale-switcher dropdown for the navigation bar.
 *
 * Choosing a language writes it to the on-device profile and sets the
 * document direction (LTR / RTL) immediately so the rest of the page
 * flips without a refresh.
 */
export default function LocaleSwitcher({
  direction = "down",
}: {
  /** Whether the dropdown opens above or below the trigger. */
  direction?: "up" | "down";
} = {}) {
  const { profile, update, mounted } = useProfile();
  const [open, setOpen] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement | null>(null);

  const active: LocaleCode = (profile.locale ?? "en") as LocaleCode;
  const label = LOCALE_LABELS[active];

  // Keep the <html dir> attribute in sync with the active locale.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute(
      "dir",
      RTL_LOCALES.includes(active) ? "rtl" : "ltr",
    );
  }, [active]);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (!detailsRef.current) return;
      if (!detailsRef.current.contains(e.target as Node)) {
        setOpen(false);
        detailsRef.current.removeAttribute("open");
      }
    }
    window.addEventListener("click", onClickOutside);
    return () => window.removeEventListener("click", onClickOutside);
  }, [open]);

  function pick(code: LocaleCode) {
    update({ locale: code });
    setOpen(false);
    detailsRef.current?.removeAttribute("open");
  }

  return (
    <details
      ref={detailsRef}
      className="relative"
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary
        className="list-none cursor-pointer inline-flex items-center gap-1.5 h-8 px-2.5 rounded-full border border-ink-200 text-xs text-ink-700 hover:border-ink-900 hover:text-ink-900 transition-colors"
        aria-label="Change language"
        title="Language"
      >
        <span aria-hidden>{label?.flag ?? "🌐"}</span>
        <span className="hidden sm:inline">{label?.native ?? "English"}</span>
        <span className="text-ink-400 text-[10px]">▾</span>
      </summary>
      {mounted && (
        <div
          role="menu"
          className={`absolute right-0 w-56 rounded-2xl border border-ink-200 bg-card shadow-lg p-1.5 z-50 max-h-[70vh] overflow-y-auto ${
            direction === "up" ? "bottom-full mb-2" : "mt-2"
          }`}
        >
          <div className="text-[10px] uppercase tracking-widest text-ink-500 px-2 py-1.5">
            Language · {LOCALE_LABELS[active]?.english}
          </div>
          <ul className="space-y-0.5">
            {localeOrder.map((code) => {
              const l = LOCALE_LABELS[code];
              return (
                <li key={code}>
                  <button
                    onClick={() => pick(code)}
                    aria-current={active === code}
                    className={`w-full text-left rounded-xl px-2.5 py-1.5 text-sm flex items-center gap-2.5 transition-colors ${
                      active === code
                        ? "bg-ink-900 text-ink-50"
                        : "text-ink-800 hover:bg-card-subtle"
                    }`}
                  >
                    <span aria-hidden>{l.flag}</span>
                    <span className="flex-1 min-w-0 truncate">{l.native}</span>
                    <span
                      className={`text-[10px] uppercase tracking-widest ${
                        active === code ? "text-flame-300" : "text-ink-400"
                      }`}
                    >
                      {code}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </details>
  );
}
