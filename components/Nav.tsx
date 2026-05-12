import Link from "next/link";

const links = [
  { href: "/gospel", label: "Gospel" },
  { href: "/read", label: "Read" },
  { href: "/pray", label: "Pray" },
  { href: "/witness", label: "Witness" },
  { href: "/disciple", label: "Disciple" },
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
        <Link
          href="/gospel"
          className="hidden md:inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-4 py-1.5 text-sm hover:bg-flame-700 transition-colors shrink-0"
        >
          Meet Jesus
        </Link>
      </nav>
    </header>
  );
}
