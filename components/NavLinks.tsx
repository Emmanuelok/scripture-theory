"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useUI } from "@/lib/useUI";

/**
 * Locale-aware nav links + the small Start button. Lives as a client
 * island inside the (server-rendered) Nav so we can read the on-device
 * locale without making the whole header a client component.
 */

type NavLink = { href: string; label: string };

function useNavLinks(): { links: NavLink[]; start: string; search: string } {
  const { t } = useUI();
  return {
    links: [
      { href: "/today", label: t.nav.today },
      { href: "/bible", label: t.nav.bible },
      { href: "/practices", label: t.nav.practices },
      { href: "/pray", label: t.nav.pray },
      { href: "/me", label: t.nav.me },
      { href: "/resources", label: t.nav.resources },
    ],
    start: t.nav.start,
    search: t.nav.search,
  };
}

export function NavLinks() {
  const { links } = useNavLinks();
  return (
    <ul className="hidden md:flex items-center gap-6 text-sm text-ink-600">
      {links.map((l) => (
        <li key={l.href}>
          <Link href={l.href} className="hover:text-ink-900 transition-colors">
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function NavStartButton() {
  const { start } = useNavLinks();
  return (
    <Link
      href="/start"
      className="hidden md:inline-flex items-center rounded-full bg-flame-600 text-white px-4 py-1.5 text-sm hover:bg-flame-700 transition-colors"
    >
      {start}
    </Link>
  );
}

/**
 * Mobile primary navigation. On <md the desktop link row is hidden, so this
 * hamburger + collapsible panel is the only way to reach the primary sections
 * on a phone. Closes on link tap and on Escape.
 */
export function MobileNav() {
  const { links, start } = useNavLinks();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center justify-center rounded-full p-2.5 text-ink-700 hover:text-ink-900 hover:bg-ink-100 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
          aria-hidden
        >
          {open ? (
            <>
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </>
          ) : (
            <>
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="absolute left-0 right-0 top-16 z-30 border-b border-ink-200 bg-ink-50 shadow-lg"
        >
          <ul className="mx-auto max-w-6xl flex flex-col px-5 py-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-ink-700 hover:text-ink-900 transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="py-2">
              <Link
                href="/start"
                onClick={() => setOpen(false)}
                className="inline-flex items-center rounded-full bg-flame-600 text-white px-5 py-2.5 text-sm hover:bg-flame-700 transition-colors"
              >
                {start}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export function NavSearchLink() {
  const { search } = useNavLinks();
  return (
    <Link
      href="/search"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 text-ink-600 hover:border-ink-900 hover:text-ink-900 transition-colors"
      aria-label={search}
      title={search}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    </Link>
  );
}
