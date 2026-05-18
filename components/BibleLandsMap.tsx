"use client";

import { useEffect, useMemo, useState } from "react";
import { geoMercator, geoPath, type GeoProjection } from "d3-geo";
import { feature, mesh } from "topojson-client";
import type { Feature, FeatureCollection, MultiLineString } from "geojson";
import type { Topology, GeometryObject as TopoGeometryObject } from "topojson-specification";
import {
  atlasRegions,
  BIBLE_LANDS_BBOX,
  type AtlasPlace,
  type AtlasRegion,
  type EraId,
} from "@/data/atlas";

const WIDTH = 1000;
const HEIGHT = 620;

type Marker = { region: AtlasRegion; place: AtlasPlace };

/**
 * Interactive Bible-lands map.
 *
 * Renders the Mediterranean / Levant / Mesopotamia at a usable zoom, drops a
 * colored dot at every named place in the atlas, and lets the reader filter
 * by era. Tapping a dot scrolls to the matching entry in the text below.
 */
export default function BibleLandsMap() {
  const [topo, setTopo] = useState<Topology | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeEra, setActiveEra] = useState<EraId | "all">("all");
  const [hoverKey, setHoverKey] = useState<string | null>(null);

  // Pull country polygons once. The /api/world-topojson endpoint is the
  // same one /pray/live uses — Natural Earth 110m, proxied so the browser
  // doesn't reach across origins.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/world-topojson")
      .then((r) => (r.ok ? r.json() : null))
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

  // Projection fitted to the Bible lands bounding box. Mercator is fine
  // for this latitude band; everything we care about sits north of the
  // tropics and well south of the Arctic.
  const projection: GeoProjection = useMemo(() => {
    const bboxFeature: Feature = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [BIBLE_LANDS_BBOX.west, BIBLE_LANDS_BBOX.south],
            [BIBLE_LANDS_BBOX.east, BIBLE_LANDS_BBOX.south],
            [BIBLE_LANDS_BBOX.east, BIBLE_LANDS_BBOX.north],
            [BIBLE_LANDS_BBOX.west, BIBLE_LANDS_BBOX.north],
            [BIBLE_LANDS_BBOX.west, BIBLE_LANDS_BBOX.south],
          ],
        ],
      },
    };
    return geoMercator().fitExtent(
      [[24, 24], [WIDTH - 24, HEIGHT - 24]],
      bboxFeature,
    );
  }, []);

  const path = useMemo(() => geoPath(projection), [projection]);

  const countries: FeatureCollection | null = useMemo(() => {
    if (!topo) return null;
    return feature(
      topo,
      topo.objects.countries as TopoGeometryObject,
    ) as unknown as FeatureCollection;
  }, [topo]);

  const borders: MultiLineString | null = useMemo(() => {
    if (!topo) return null;
    return mesh(
      topo,
      topo.objects.countries as TopoGeometryObject,
      (a, b) => a !== b,
    ) as unknown as MultiLineString;
  }, [topo]);

  // Flatten every era's places into one list, carrying the parent era so
  // we can color and link correctly.
  const allMarkers: Marker[] = useMemo(
    () =>
      atlasRegions.flatMap((region) =>
        region.places.map((place) => ({ region, place })),
      ),
    [],
  );

  const visibleMarkers =
    activeEra === "all"
      ? allMarkers
      : allMarkers.filter((m) => m.region.id === activeEra);

  function scrollTo(id: string) {
    if (typeof document === "undefined") return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="rounded-3xl border border-ink-200 bg-card p-3 md:p-4 overflow-hidden">
      {/* Era filter — colored chips */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        <button
          onClick={() => setActiveEra("all")}
          className={`rounded-full border px-3 py-1 text-xs transition-colors ${
            activeEra === "all"
              ? "bg-ink-900 text-ink-50 border-ink-900"
              : "border-ink-300 text-ink-700 hover:border-ink-900"
          }`}
        >
          All eras · {allMarkers.length} places
        </button>
        {atlasRegions.map((r) => (
          <button
            key={r.id}
            onClick={() => setActiveEra(r.id)}
            className={`rounded-full border px-3 py-1 text-xs transition-colors inline-flex items-center gap-1.5 ${
              activeEra === r.id
                ? "border-ink-900 bg-ink-900 text-ink-50"
                : "border-ink-300 text-ink-700 hover:border-ink-900"
            }`}
            title={r.title}
          >
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: r.color }}
            />
            <span className="whitespace-nowrap">
              {r.title.split("—")[0].trim().split("·")[0].trim()}
            </span>
            <span className="text-ink-400">· {r.places.length}</span>
          </button>
        ))}
      </div>

      {/* The SVG map */}
      <div className="relative rounded-2xl overflow-hidden bg-ink-50/40 dark:bg-ink-100/10 border border-ink-100">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          role="img"
          aria-label="Map of the Bible lands with named places"
        >
          {/* Sea fill */}
          <rect x={0} y={0} width={WIDTH} height={HEIGHT} fill="#dbe7f1" />
          {/* Country fills + borders */}
          {countries && (
            <g>
              {countries.features.map((f, i) => {
                const d = path(f as Feature);
                if (!d) return null;
                return (
                  <path
                    key={i}
                    d={d}
                    fill="#f1ecdf"
                    stroke="#d6cdb4"
                    strokeWidth={0.5}
                  />
                );
              })}
            </g>
          )}
          {borders && (
            <path
              d={path(borders) ?? undefined}
              fill="none"
              stroke="#9c9072"
              strokeWidth={0.7}
              strokeLinejoin="round"
            />
          )}

          {/* Place markers */}
          {visibleMarkers.map((m) => {
            const xy = projection([m.place.lon, m.place.lat]);
            if (!xy) return null;
            const key = `${m.region.id}:${m.place.name}`;
            const isHover = hoverKey === key;
            return (
              <g
                key={key}
                transform={`translate(${xy[0]} ${xy[1]})`}
                onMouseEnter={() => setHoverKey(key)}
                onMouseLeave={() => setHoverKey((h) => (h === key ? null : h))}
                onClick={() => scrollTo(m.region.id)}
                style={{ cursor: "pointer" }}
              >
                <circle
                  r={isHover ? 9 : 6}
                  fill={m.region.color}
                  fillOpacity={0.4}
                />
                <circle
                  r={isHover ? 4.5 : 3.5}
                  fill={m.region.color}
                  stroke="#0a0a0c"
                  strokeWidth={isHover ? 1.2 : 0.8}
                />
              </g>
            );
          })}

          {/* Hover label, rendered last so it's on top */}
          {visibleMarkers.map((m) => {
            const xy = projection([m.place.lon, m.place.lat]);
            if (!xy) return null;
            const key = `${m.region.id}:${m.place.name}`;
            if (hoverKey !== key) return null;
            const label = m.place.name + (m.place.approx ? " (~)" : "");
            const textWidth = label.length * 7 + 14;
            const above = xy[1] > 60;
            return (
              <g
                key={`label-${key}`}
                transform={`translate(${xy[0]} ${xy[1] + (above ? -18 : 18)})`}
                pointerEvents="none"
              >
                <rect
                  x={-textWidth / 2}
                  y={above ? -16 : 0}
                  width={textWidth}
                  height={20}
                  rx={6}
                  fill="#0a0a0c"
                  fillOpacity={0.92}
                />
                <text
                  textAnchor="middle"
                  y={above ? -2 : 14}
                  fontSize={12}
                  fontFamily="ui-sans-serif, system-ui, sans-serif"
                  fill="#fafaf6"
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>

        {error && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-ink-500 bg-ink-50/80">
            {error}
          </div>
        )}
        {!topo && !error && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-ink-400">
            Loading the Bible-lands map…
          </div>
        )}
      </div>

      <p className="mt-3 text-[11px] text-ink-500 leading-relaxed">
        Country outlines from Natural Earth (public domain). Site coordinates from public-domain
        biblical geography. Tap a dot to jump to its entry below. <span className="italic">(~)</span>{" "}
        marks an approximate or contested location (e.g. Eden, Mount Sinai).
      </p>
    </div>
  );
}
