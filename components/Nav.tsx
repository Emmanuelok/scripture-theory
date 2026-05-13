import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/today", label: "Today" },
  { href: "/bible", label: "Bible" },
  { href: "/memory", label: "Memory" },
  { href: "/pray", label: "Pray" },
  { href: "/disciple/journey", label: "Journey" },
  { href: "/resources", label: "Resources" },
  { href: "/connect", label: "One Body" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-ink-50/80 border-b border-ink-200">
      <nav className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 text-flame-300 font-serif text-lg">
            ST
          </span>
          <span className="font-serif text-lg tracking-tight text-ink-900 group-hover:text-flame-700 transition-colors">
            Scripture Theory
          </span>
        </Link>
        <ul className="hidden md:flex items-center gap-6 text-sm text-ink-600">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-ink-900 transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/search"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink-200 text-ink-600 hover:border-ink-900 hover:text-ink-900 transition-colors"
            aria-label="Search"
            title="Search"
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
          <ThemeToggle />
          <Link
            href="/start"
            className="hidden md:inline-flex items-center rounded-full bg-flame-600 text-white px-4 py-1.5 text-sm hover:bg-flame-700 transition-colors"
          >
            Start
          </Link>
        </div>
      </nav>
    </header>
  );
}
