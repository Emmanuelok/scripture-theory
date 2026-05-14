"use client";

import { useEffect, useState } from "react";
import type { CourseWeek } from "@/data/course";

type Item = { id: string; label: string };

export default function CourseWeekTOC({ week }: { week: CourseWeek }) {
  const items: Item[] = [
    { id: "memory", label: "Memory" },
    { id: "days", label: "7 Days" },
    { id: "lesson", label: "Lesson" },
    { id: "witnesses", label: "Witnesses" },
    ...(week.traditions && week.traditions.length > 0
      ? [{ id: "traditions", label: "Traditions" }]
      : []),
    ...(week.crosswalk && week.crosswalk.length > 0
      ? [{ id: "crosswalk", label: "Crosswalk" }]
      : []),
    { id: "reflect", label: "Reflect" },
    { id: "discuss", label: "Discuss" },
    ...(week.recommendedReading && week.recommendedReading.length > 0
      ? [{ id: "reading", label: "Deeper" }]
      : []),
    { id: "practice", label: "Practice" },
    { id: "journal", label: "Journal" },
  ];

  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const ids = items.map((i) => i.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [week.week]);

  function jumpTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <nav
      aria-label="Week sections"
      className="sticky top-2 z-30 mt-4 no-print -mx-2 px-2 py-1.5"
    >
      <div className="rounded-full border border-ink-200 bg-card/95 backdrop-blur shadow-sm">
        <ul className="flex gap-1 overflow-x-auto px-1.5 py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((it) => {
            const isActive = active === it.id;
            return (
              <li key={it.id} className="shrink-0">
                <button
                  onClick={() => jumpTo(it.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={[
                    "text-[11px] uppercase tracking-widest px-3 py-1.5 rounded-full transition-colors",
                    isActive
                      ? "bg-flame-600 text-ink-50"
                      : "text-ink-600 hover:text-flame-700 hover:bg-flame-50",
                  ].join(" ")}
                >
                  {it.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
