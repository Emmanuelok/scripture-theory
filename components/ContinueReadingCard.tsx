"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { slotKey, SLOT_CHANGE_EVENT } from "@/lib/slots";

type LastRead = {
  bookId: string;
  bookName: string;
  chapter: number;
  translation: string;
  at: string;
};

function fmtRelative(iso: string) {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diff = Date.now() - then;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export default function ContinueReadingCard() {
  const [last, setLast] = useState<LastRead | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    function refresh() {
      try {
        const raw = window.localStorage.getItem(slotKey("scripture-theory-last-read"));
        setLast(raw ? JSON.parse(raw) : null);
      } catch {
        setLast(null);
      }
    }
    refresh();
    const onSlot = () => refresh();
    window.addEventListener(SLOT_CHANGE_EVENT, onSlot);
    return () => window.removeEventListener(SLOT_CHANGE_EVENT, onSlot);
  }, []);

  if (!last) return null;

  return (
    <Link
      href={`/bible/${last.bookId}/${last.chapter}`}
      className="group relative block overflow-hidden rounded-3xl bg-ink-900 text-ink-50 p-6 md:p-7 border border-ink-800 hover:border-flame-500/60 transition-colors mb-10"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(60% 50% at 0% 0%, rgba(249,115,22,0.18), transparent 60%), radial-gradient(60% 40% at 100% 100%, rgba(184,66,12,0.16), transparent 60%)",
        }}
      />
      <div className="relative grid md:grid-cols-[1fr_auto] gap-4 items-center">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-flame-300">
            Continue reading · {fmtRelative(last.at)}
          </div>
          <h2 className="font-serif text-3xl md:text-4xl mt-1.5 leading-tight">
            {last.bookName} {last.chapter}
          </h2>
          <p className="mt-1 text-xs text-ink-300">
            Last opened in <span className="text-flame-300">{last.translation}</span> — pick up
            where you left off.
          </p>
        </div>
        <div className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-4 py-2 text-sm group-hover:bg-flame-500 transition-colors w-fit">
          Open →
        </div>
      </div>
    </Link>
  );
}
