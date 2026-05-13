"use client";

import { useEffect, useState } from "react";
import type { NewsItem } from "@/lib/news";

type Item = NewsItem & { prayerWorthy?: boolean };

function timeAgo(iso: string | null): string {
  if (!iso) return "";
  const ms = Date.now() - Date.parse(iso);
  if (Number.isNaN(ms)) return "";
  const m = Math.floor(ms / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export default function NationNews({ iso, nationName }: { iso: string; nationName: string }) {
  const [state, setState] = useState<
    { status: "loading" } | { status: "ok"; items: Item[] } | { status: "error"; message: string }
  >({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });
    fetch(`/api/news/nation/${iso.toLowerCase()}`)
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (!res.ok || !data.ok) {
          setState({
            status: "error",
            message: data.error || "Couldn't reach the news source right now.",
          });
        } else {
          setState({ status: "ok", items: data.items ?? [] });
        }
      })
      .catch((err) => {
        if (!cancelled) setState({ status: "error", message: String(err) });
      });
    return () => {
      cancelled = true;
    };
  }, [iso]);

  return (
    <section className="rounded-3xl border border-ink-200 bg-card-subtle p-6 md:p-8">
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <div>
          <div className="text-xs uppercase tracking-widest text-flame-700">
            From the news in {nationName}
          </div>
          <h3 className="font-serif text-xl text-ink-900 mt-1">
            What is happening — and what to lift up.
          </h3>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-ink-400">
          via Google News · refreshed every 30 min
        </span>
      </div>

      {state.status === "loading" && <NewsSkeleton />}

      {state.status === "error" && (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm text-amber-900">
          The news feed is not reachable right now. Pray from the points above
          — the Lord knows the news. ({state.message})
        </div>
      )}

      {state.status === "ok" && state.items.length === 0 && (
        <p className="mt-4 text-sm text-ink-500">
          No recent stories surfaced. Lean on the prayer points above.
        </p>
      )}

      {state.status === "ok" && state.items.length > 0 && (
        <ul className="mt-5 space-y-3">
          {state.items.map((it) => (
            <li
              key={it.id}
              className="rounded-2xl border border-ink-200 bg-card p-4 hover:border-flame-500 transition-colors"
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${
                    it.prayerWorthy ? "bg-flame-500" : "bg-ink-300"
                  }`}
                  aria-hidden
                  title={it.prayerWorthy ? "Suggests urgent intercession" : ""}
                />
                <div className="flex-1 min-w-0">
                  <a
                    href={it.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-900 hover:text-flame-700 font-medium leading-snug block"
                  >
                    {it.title}
                  </a>
                  <div className="mt-1 text-xs text-ink-500 flex flex-wrap gap-2">
                    <span>{it.source}</span>
                    {it.publishedAt && (
                      <>
                        <span aria-hidden>·</span>
                        <span>{timeAgo(it.publishedAt)}</span>
                      </>
                    )}
                    {it.prayerWorthy && (
                      <>
                        <span aria-hidden>·</span>
                        <span className="text-flame-700 font-medium">
                          Pray now
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-5 text-xs text-ink-500 leading-relaxed">
        Every story shown here is sourced from public news feeds, not from us. The flame dot
        marks stories whose subjects (war, disaster, persecution, suffering) often invite
        urgent intercession. We do not endorse any outlet — bring what you read to the King
        of every nation.
      </p>
    </section>
  );
}

function NewsSkeleton() {
  return (
    <ul className="mt-5 space-y-3 animate-pulse">
      {[0, 1, 2, 3].map((i) => (
        <li key={i} className="rounded-2xl border border-ink-200 bg-card p-4">
          <div className="h-3 bg-ink-100 rounded w-11/12" />
          <div className="mt-2 h-3 bg-ink-100 rounded w-2/3" />
          <div className="mt-3 h-2 bg-ink-100 rounded w-1/4" />
        </li>
      ))}
    </ul>
  );
}
