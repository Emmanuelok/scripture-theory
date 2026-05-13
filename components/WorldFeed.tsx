"use client";

import { useEffect, useState } from "react";
import type { NewsItem } from "@/lib/news";

type Item = NewsItem & { prayerWorthy?: boolean };
type FilterMode = "all" | "urgent";

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

export default function WorldFeed() {
  const [items, setItems] = useState<Item[]>([]);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [error, setError] = useState<string>("");
  const [filter, setFilter] = useState<FilterMode>("all");
  const [refreshAt, setRefreshAt] = useState<Date | null>(null);

  function load() {
    setStatus("loading");
    fetch("/api/news/world")
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.ok) {
          setStatus("error");
          setError(data.error || "Couldn't reach the live news sources.");
          return;
        }
        setItems(data.items ?? []);
        setStatus("ok");
        setRefreshAt(new Date());
      })
      .catch((err) => {
        setStatus("error");
        setError(String(err));
      });
  }

  useEffect(() => {
    load();
    // Auto-refresh every 5 minutes while the page is open
    const id = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const visible = filter === "urgent" ? items.filter((it) => it.prayerWorthy) : items;
  const urgentCount = items.filter((it) => it.prayerWorthy).length;

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-ink-200 bg-card-subtle p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-ink-500">
            Live world news · for prayer
          </div>
          <div className="mt-1 text-sm text-ink-700">
            {status === "ok" && (
              <>
                <strong className="text-ink-900">{items.length}</strong> stories ·{" "}
                <strong className="text-flame-700">{urgentCount}</strong> calling for urgent
                intercession
                {refreshAt && (
                  <span className="text-ink-400 ml-2">
                    · refreshed {refreshAt.toLocaleTimeString()}
                  </span>
                )}
              </>
            )}
            {status === "loading" && "Loading the world…"}
            {status === "error" && "We couldn't reach the news sources."}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-full px-3 py-1 text-xs border ${
              filter === "all"
                ? "bg-ink-900 text-ink-50 border-ink-900"
                : "bg-card text-ink-700 border-ink-200 hover:border-ink-400"
            }`}
          >
            All ({items.length})
          </button>
          <button
            onClick={() => setFilter("urgent")}
            className={`rounded-full px-3 py-1 text-xs border ${
              filter === "urgent"
                ? "bg-flame-600 text-white border-flame-600"
                : "bg-card text-flame-700 border-flame-200 hover:border-flame-400"
            }`}
          >
            Pray-now ({urgentCount})
          </button>
          <button
            onClick={load}
            className="rounded-full border border-ink-300 bg-card px-3 py-1 text-xs text-ink-700 hover:border-ink-900"
            disabled={status === "loading"}
          >
            Refresh
          </button>
        </div>
      </div>

      {status === "loading" && items.length === 0 && <FeedSkeleton />}

      {status === "error" && items.length === 0 && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-5 text-sm text-amber-900">
          We couldn't reach the live news sources right now: <em>{error}</em>. Try refreshing in
          a moment, or pray from the Lord's Prayer (<a href="/pray" className="underline">/pray</a>)
          while we recover.
        </div>
      )}

      {visible.length > 0 && (
        <ul className="space-y-3">
          {visible.map((it) => (
            <li
              key={it.id}
              className={`rounded-2xl border bg-card p-5 transition-colors ${
                it.prayerWorthy ? "border-flame-300 hover:border-flame-500" : "border-ink-200 hover:border-ink-400"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-2 h-2.5 w-2.5 rounded-full shrink-0 ${
                    it.prayerWorthy ? "bg-flame-500 ring-2 ring-flame-200" : "bg-ink-300"
                  }`}
                  aria-hidden
                />
                <div className="flex-1 min-w-0">
                  <a
                    href={it.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-900 hover:text-flame-700 font-medium leading-snug block text-base"
                  >
                    {it.title}
                  </a>
                  {it.description && (
                    <p className="mt-1.5 text-sm text-ink-600 leading-relaxed line-clamp-2">
                      {it.description}
                    </p>
                  )}
                  <div className="mt-2 text-xs text-ink-500 flex flex-wrap gap-2">
                    <span className="font-medium text-ink-700">{it.source}</span>
                    {it.publishedAt && (
                      <>
                        <span aria-hidden>·</span>
                        <span>{timeAgo(it.publishedAt)}</span>
                      </>
                    )}
                    {it.prayerWorthy && (
                      <>
                        <span aria-hidden>·</span>
                        <span className="text-flame-700 font-medium">Stand in the gap</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FeedSkeleton() {
  return (
    <ul className="space-y-3 animate-pulse">
      {[0, 1, 2, 3, 4].map((i) => (
        <li key={i} className="rounded-2xl border border-ink-200 bg-card p-5">
          <div className="h-4 bg-ink-100 rounded w-11/12" />
          <div className="mt-2 h-3 bg-ink-100 rounded w-2/3" />
          <div className="mt-3 h-2 bg-ink-100 rounded w-1/4" />
        </li>
      ))}
    </ul>
  );
}
