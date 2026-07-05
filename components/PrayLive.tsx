"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { type PrayerDot } from "@/components/WorldMap";
import PrayerStoryModal from "@/components/PrayerStoryModal";

// The world map pulls in d3-geo + topojson-client (heavy). Load it lazily,
// client-only, so it doesn't sit in the initial /pray/live bundle.
const WorldMap = dynamic(() => import("@/components/WorldMap"), {
  ssr: false,
  loading: () => (
    <div className="aspect-[2/1] w-full animate-pulse rounded-3xl bg-ink-100" aria-hidden />
  ),
});

export default function PrayLive() {
  const [stories, setStories] = useState<PrayerDot[]>([]);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [error, setError] = useState<string>("");
  const [active, setActive] = useState<PrayerDot | null>(null);
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
        setStories(data.stories ?? []);
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
    const id = setInterval(load, 5 * 60 * 1000); // auto-refresh every 5 min
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-ink-200 bg-card-subtle p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-ink-700">
          {status === "ok" && (
            <>
              <strong className="text-ink-900">{stories.length}</strong> prayer point{stories.length === 1 ? "" : "s"} across the world right now
              {refreshAt && (
                <span className="text-ink-400 ml-2 text-xs">
                  · refreshed {refreshAt.toLocaleTimeString()}
                </span>
              )}
            </>
          )}
          {status === "loading" && "Listening to the world…"}
          {status === "error" && "We couldn't reach the news sources."}
        </div>
        <button
          onClick={load}
          className="rounded-full border border-ink-300 bg-card px-3 py-1 text-xs text-ink-700 hover:border-ink-900"
          disabled={status === "loading"}
        >
          Refresh
        </button>
      </div>

      {status === "error" && stories.length === 0 && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-5 text-sm text-amber-900">
          The live news sources are unreachable right now: <em>{error}</em>. Pull-to-refresh in a
          moment, or pray from the <a href="/pray" className="underline">Lord's Prayer</a> while
          we recover.
        </div>
      )}

      <WorldMap stories={stories} onSelect={setActive} />

      <PrayerStoryModal dot={active} onClose={() => setActive(null)} />
    </div>
  );
}
