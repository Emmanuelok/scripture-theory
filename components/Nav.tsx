import Link from "next/link";
import Logo from "@/components/Logo";
import AccountChip from "@/components/AccountChip";
import { NavLinks, NavStartButton, NavSearchLink } from "@/components/NavLinks";

export default function Nav() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-ink-50/80 border-b border-ink-200">
      <nav className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <Logo size={36} className="shrink-0" />
          <span className="font-serif text-lg tracking-tight text-ink-900 group-hover:text-flame-700 transition-colors">
            Scripture Theory
          </span>
        </Link>
        <NavLinks />
        <div className="flex items-center gap-2 shrink-0">
          <NavSearchLink />
          <AccountChip />
          <NavStartButton />
        </div>
      </nav>
    </header>
  );
}
