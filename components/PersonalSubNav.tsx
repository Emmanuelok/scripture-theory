"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";

/**
 * Segmented sub-nav for the personal area.
 * Mounted at the top of /me, /secret-place, /disciple/journey, /account
 * so the four routes feel like one home with rooms.
 */

type Item = {
  href: string;
  label: string;
  glyph: React.ReactNode;
  matchPrefixes: string[];
  hideWhenSignedOut?: boolean;
};

const ITEMS: Item[] = [
  {
    href: "/me",
    label: "Walk",
    matchPrefixes: ["/me"],
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <circle cx="5" cy="6" r="1.4" />
        <circle cx="12" cy="12" r="1.4" />
        <circle cx="19" cy="18" r="1.4" />
        <path d="M5 6c4 0 4 6 7 6s3 6 7 6" />
      </svg>
    ),
  },
  {
    href: "/secret-place",
    label: "Secret Place",
    matchPrefixes: ["/secret-place"],
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M5 3h14v18H5z" />
        <circle cx="15" cy="12" r="0.9" fill="currentColor" />
        <path d="M9 3v18" />
      </svg>
    ),
  },
  {
    href: "/disciple/journey",
    label: "Journey",
    matchPrefixes: ["/disciple/journey", "/disciple"],
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <circle cx="9" cy="8" r="2.4" />
        <path d="M4 19c0-3 2.5-5 5-5s5 2 5 5" />
        <circle cx="17" cy="10" r="2" />
        <path d="M14 19c0-2 1.5-3.5 3-3.5s3 1.5 3 3.5" />
      </svg>
    ),
  },
  {
    href: "/account",
    label: "Account",
    matchPrefixes: ["/account"],
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
      </svg>
    ),
  },
];

export default function PersonalSubNav() {
  const pathname = usePathname() ?? "";
  const { configured, user } = useAuth();

  const items = ITEMS.filter((it) => {
    if (it.href === "/account" && !configured) return false;
    return true;
  });

  return (
    <nav
      aria-label="My personal area"
      className="-mt-4 mb-8 flex flex-wrap items-center gap-1.5 rounded-2xl border border-ink-200 bg-card-subtle p-1.5"
    >
      {items.map((it) => {
        const active = it.matchPrefixes.some((p) => pathname === p || pathname.startsWith(p + "/"));
        return (
          <Link
            key={it.href}
            href={it.href}
            aria-current={active ? "page" : undefined}
            className={[
              "group inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm transition-colors",
              active
                ? "bg-ink-900 text-ink-50"
                : "text-ink-600 hover:text-ink-900 hover:bg-card",
            ].join(" ")}
          >
            <span className={active ? "text-flame-300" : "text-flame-700/70"}>{it.glyph}</span>
            <span className="font-medium">{it.label}</span>
            {it.href === "/account" && user && (
              <span
                aria-hidden
                className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full bg-flame-500"
                title="Signed in"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
