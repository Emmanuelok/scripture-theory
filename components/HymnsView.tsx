"use client";

import { useMemo, useState } from "react";
import { hymns, hymnCategories, type Hymn } from "@/data/hymns";

export default function HymnsView() {
  const [filter, setFilter] = useState<Hymn["category"] | "all">("all");
  const [open, setOpen] = useState<string | null>(null);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    let list = filter === "all" ? hymns : hymns.filter((h) => h.category === filter);
    if (q.trim()) {
      const s = q.trim().toLowerCase();
      list = list.filter(
        (h) =>
          h.title.toLowerCase().includes(s) ||
          h.author.toLowerCase().includes(s) ||
          h.verses.some((v) => v.toLowerCase().includes(s))
      );
    }
    return list;
  }, [filter, q]);

  return (
    <div className="space-y-8">
      <section>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search a line, a title, an author…"
          className="w-full rounded-2xl border border-ink-300 bg-card px-4 py-3 text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-flame-500"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <Pill active={filter === "all"} onClick={() => setFilter("all")}>
            All
          </Pill>
          {(Object.entries(hymnCategories) as [Hymn["category"], (typeof hymnCategories)[keyof typeof hymnCategories]][]).map(([id, info]) => (
            <Pill key={id} active={filter === id} onClick={() => setFilter(id)}>
              {info.label}
            </Pill>
          ))}
        </div>
      </section>

      <section>
        <p className="text-xs text-ink-500">
          {filtered.length} {filtered.length === 1 ? "hymn" : "hymns"}
          {filter !== "all" && (
            <span className="ml-2 italic">— {hymnCategories[filter as Hymn["category"]].sub}</span>
          )}
        </p>
        <ul className="mt-4 grid sm:grid-cols-2 gap-4">
          {filtered.map((h) => (
            <li key={h.id} className="rounded-2xl border border-ink-200 bg-card p-5">
              <button
                onClick={() => setOpen(h.id)}
                className="text-left w-full"
              >
                <div className="text-[10px] uppercase tracking-widest text-flame-700">
                  {hymnCategories[h.category].label} · {h.year}
                </div>
                <div className="font-serif text-xl text-ink-900 mt-1 group-hover:text-flame-700">
                  {h.title}
                </div>
                <div className="text-xs text-ink-500 mt-0.5">{h.author}</div>
                <div className="mt-3 text-sm text-ink-700 italic line-clamp-2">
                  {h.verses[0].split("\n")[0]}…
                </div>
              </button>
            </li>
          ))}
        </ul>
        {filtered.length === 0 && (
          <p className="mt-6 text-ink-500 text-sm">
            No hymns match. Try a different word, or clear the filter.
          </p>
        )}
      </section>

      {open && (
        <HymnModal
          hymn={hymns.find((h) => h.id === open)!}
          onClose={() => setOpen(null)}
        />
      )}
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs ${
        active
          ? "bg-flame-600 text-ink-50"
          : "border border-ink-300 text-ink-700 hover:border-ink-900"
      }`}
    >
      {children}
    </button>
  );
}

function HymnModal({ hymn, onClose }: { hymn: Hymn; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-40 flex items-end md:items-center justify-center p-3 bg-ink-900/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-card text-ink-900 rounded-3xl border border-ink-200 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-card border-b border-ink-200 p-5 flex items-baseline justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-flame-700">
              {hymnCategories[hymn.category].label} · {hymn.year}
            </div>
            <h2 className="font-serif text-2xl text-ink-900 mt-1">{hymn.title}</h2>
            <div className="text-xs text-ink-500 mt-0.5">{hymn.author}</div>
          </div>
          <button onClick={onClose} className="text-ink-500 hover:text-ink-900 text-2xl leading-none">
            ×
          </button>
        </div>
        <div className="p-6 space-y-5">
          {hymn.verses.map((v, i) => (
            <div key={i}>
              <div className="text-[10px] uppercase tracking-widest text-flame-700">Verse {i + 1}</div>
              <p className="mt-1 prose-scripture text-ink-900 whitespace-pre-line">{v}</p>
              {hymn.refrain && (
                <p className="mt-2 prose-scripture text-flame-700 italic whitespace-pre-line text-sm">
                  {hymn.refrain}
                </p>
              )}
            </div>
          ))}
          <div className="pt-4 border-t border-ink-200">
            <div className="text-[10px] uppercase tracking-widest text-flame-700">Scripture</div>
            <ul className="mt-1 text-sm text-ink-700 list-disc pl-5">
              {hymn.scriptures.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-ink-500 italic">
            Public domain. Sing it, pray it, hand it to a friend.
          </p>
        </div>
      </div>
    </div>
  );
}
