"use client";

import Link from "next/link";
import { useUI } from "@/lib/useUI";

/**
 * Locale-aware nav links + the small Start button. Lives as a client
 * island inside the (server-rendered) Nav so we can read the on-device
 * locale without making the whole header a client component.
 */
export function NavLinks() {
  const { t } = useUI();
  const links = [
    { href: "/today", label: t.nav.today },
    { href: "/bible", label: t.nav.bible },
    { href: "/practices", label: t.nav.practices },
    { href: "/pray", label: t.nav.pray },
    { href: "/me", label: t.nav.me },
    { href: "/resources", label: t.nav.resources },
  ];
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
  const { t } = useUI();
  return (
    <Link
      href="/start"
      className="hidden md:inline-flex items-center rounded-full bg-flame-600 text-white px-4 py-1.5 text-sm hover:bg-flame-700 transition-colors"
    >
      {t.nav.start}
    </Link>
  );
}

export function NavSearchLink() {
  const { t } = useUI();
  return (
    <Link
      href="/search"
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink-200 text-ink-600 hover:border-ink-900 hover:text-ink-900 transition-colors"
      aria-label={t.nav.search}
      title={t.nav.search}
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
