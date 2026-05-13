"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { geoNaturalEarth1, geoPath, type GeoProjection } from "d3-geo";
import { feature, mesh } from "topojson-client";
import type { Feature, FeatureCollection, MultiLineString } from "geojson";
import type { Topology, GeometryObject as TopoGeometryObject } from "topojson-specification";
import { PRAYER_CATEGORIES, categoryById } from "@/data/prayer-categories";

export type PrayerDot = {
  id: string;
  title: string;
  link: string;
  source: string;
  publishedAt: string | null;
  description: string | null;
  categoryId: string;
  lat: number;
  lng: number;
  placeName: string;
};

type Props = {
  stories: PrayerDot[];
  onSelect: (dot: PrayerDot) => void;
};

// Render width is constant; the height is computed from the projection.
const WIDTH = 1000;
const HEIGHT = 500;

export default function WorldMap({ stories, onSelect }: Props) {
  const [topo, setTopo] = useState<Topology | null>(null);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | "all">("all");
  const [hoverId, setHoverId] = useState<string | null>(null);

  // Load the Natural Earth TopoJSON exactly once per page lifecycle.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/world-topojson")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled) return;
        if (data && data.type === "Topology") setTopo(data as Topology);
        else setError("Map data unavailable");
      })
      .catch((e) => {
        if (!cancelled) setError(String(e));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Compose the projection once, fitted to the SVG viewport.
  const projection: GeoProjection = useMemo(
    () => geoNaturalEarth1().scale(180).translate([WIDTH / 2, HEIGHT / 2]),
    []
  );
  const path = useMemo(() => geoPath(projection), [projection]);

  // Country polygons (light) and clean borders (darker).
  const countries: FeatureCollection | null = useMemo(() => {
    if (!topo) return null;
    return feature(topo, topo.objects.countries as TopoGeometryObject) as unknown as FeatureCollection;
  }, [topo]);

  const borders: MultiLineString | null = useMemo(() => {
    if (!topo) return null;
    return mesh(topo, topo.objects.countries as TopoGeometryObject, (a, b) => a !== b) as unknown as MultiLineString;
  }, [topo]);

  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? stories
        : stories.filter((s) => s.categoryId === activeFilter),
    [stories, activeFilter]
  );

  function projectDot(d: PrayerDot): { x: number; y: number } | null {
    const p = projection([d.lng, d.lat]);
    if (!p) return null;
    return { x: p[0], y: p[1] };
  }

  // Cluster overlapping dots so they don't all stack.
  const placedDots = useMemo(() => {
    const out: { dot: PrayerDot; x: number; y: number }[] = [];
    for (const d of filtered) {
      const p = projectDot(d);
      if (!p) continue;
      out.push({ dot: d, x: p.x, y: p.y });
    }
    return out;
  }, [filtered, projection]);

  const usedCategories = useMemo(() => {
    const ids = new Set(stories.map((s) => s.categoryId));
    return PRAYER_CATEGORIES.filter((c) => ids.has(c.id));
  }, [stories]);

  return (
    <div className="space-y-4">
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 items-center">
        <button
          onClick={() => setActiveFilter("all")}
          className={`rounded-full px-3 py-1 text-xs border transition-colors ${
            activeFilter === "all"
              ? "bg-ink-900 text-ink-50 border-ink-900"
              : "bg-card text-ink-700 border-ink-200 hover:border-ink-400"
          }`}
        >
          All ({stories.length})
        </button>
        {usedCategories.map((c) => {
          const count = stories.filter((s) => s.categoryId === c.id).length;
          const on = activeFilter === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActiveFilter(c.id)}
              className={`rounded-full px-3 py-1 text-xs border transition-colors flex items-center gap-1.5 ${
                on
                  ? "bg-flame-600 text-white border-flame-600"
                  : "bg-card text-ink-700 border-ink-200 hover:border-flame-400"
              }`}
            >
              <span>{c.emoji}</span>
              {c.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Map */}
      <div
        ref={containerRef}
        className="relative rounded-3xl border border-ink-200 bg-card overflow-hidden glow-ring"
      >
        {!topo && !error && <MapLoading />}
        {error && <MapError message={error} />}
        {topo && countries && (
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="w-full h-auto block"
            role="img"
            aria-label="World map of stories calling for prayer"
          >
            {/* Ocean background */}
            <rect x={0} y={0} width={WIDTH} height={HEIGHT} fill="rgb(var(--ink-100))" />

            {/* Land — every country */}
            <g className="countries">
              {(countries.features as Feature[]).map((f, i) => (
                <path
                  key={i}
                  d={path(f as Feature) ?? undefined}
                  fill="rgb(var(--ink-200))"
                  stroke="none"
                />
              ))}
            </g>

            {/* Crisp country borders */}
            {borders && (
              <path
                d={path(borders) ?? undefined}
                fill="none"
                stroke="rgb(var(--ink-300))"
                strokeWidth={0.4}
                strokeLinejoin="round"
              />
            )}

            {/* Prayer dots */}
            <g className="dots">
              {placedDots.map(({ dot, x, y }) => {
                const cat = categoryById(dot.categoryId);
                const isHover = hoverId === dot.id;
                return (
                  <g
                    key={dot.id}
                    transform={`translate(${x},${y})`}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoverId(dot.id)}
                    onMouseLeave={() => setHoverId(null)}
                    onClick={() => onSelect(dot)}
                  >
                    {/* Pulse halo */}
                    <circle
                      r={isHover ? 12 : 8}
                      fill="rgb(var(--flame-500))"
                      opacity={0.25}
                      className="transition-all"
                    >
                      <animate
                        attributeName="r"
                        values="5;10;5"
                        dur="2.6s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.45;0.05;0.45"
                        dur="2.6s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    {/* Solid center */}
                    <circle
                      r={isHover ? 5 : 3.8}
                      fill="rgb(var(--flame-600))"
                      stroke="rgb(var(--card))"
                      strokeWidth={1.2}
                      className="transition-all"
                    />
                    <title>
                      {cat?.emoji ?? "🔥"} {dot.placeName} — {dot.title}
                    </title>
                  </g>
                );
              })}
            </g>
          </svg>
        )}
      </div>

      <p className="text-[11px] text-ink-500 leading-relaxed text-center">
        {stories.length === 0
          ? "Loading prayer points…"
          : `${placedDots.length} prayer point${placedDots.length === 1 ? "" : "s"} across the world. Tap a dot to read the story and pray.`}
      </p>
    </div>
  );
}

function MapLoading() {
  return (
    <div className="aspect-[2/1] w-full flex items-center justify-center text-sm text-ink-500">
      <div className="text-center space-y-2">
        <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-flame-500 border-t-transparent" />
        <div>Loading the world…</div>
      </div>
    </div>
  );
}

function MapError({ message }: { message: string }) {
  return (
    <div className="aspect-[2/1] w-full flex items-center justify-center text-sm text-amber-900 bg-amber-50/60 p-6">
      <div className="text-center max-w-md">
        <div className="font-medium">Map data couldn't load.</div>
        <div className="text-xs mt-1 text-amber-700">{message}</div>
      </div>
    </div>
  );
}
