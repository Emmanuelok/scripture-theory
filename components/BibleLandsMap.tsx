"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
const HEIGHT = 640;
const MIN_ZOOM = 1;
const MAX_ZOOM = 16;

// At what zoom does each label-tier become eligible to render?
// (Collision avoidance can still hide a label even when eligible.)
const TIER_ZOOM_THRESHOLD: Record<1 | 2 | 3, number> = {
  1: 0,    // continental landmarks — always
  2: 1.6,  // major regional — when zoomed once
  3: 2.8,  // local detail — when zoomed deeper
};

type Marker = { region: AtlasRegion; place: AtlasPlace; orderInEra: number };

/**
 * Interactive Bible-lands map.
 *
 * - Wheel / pinch to zoom, drag to pan, +/-/reset buttons for touch users.
 * - Era filter chips; selecting an era draws the journey path connecting
 *   that era's places in narrative order, with arrowheads.
 * - Numbered markers (1, 2, 3 …) show the story sequence within an era.
 * - Major places get permanent labels at default zoom; everything else
 *   labels on hover/tap. At zoom > 2, all labels appear.
 * - Bottom strip shows the active era's title, dates, and short narrative,
 *   so the map tells the story even without scrolling to the text below.
 */
export default function BibleLandsMap() {
  const [topo, setTopo] = useState<Topology | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeEra, setActiveEra] = useState<EraId | "all">("all");
  const [hoverKey, setHoverKey] = useState<string | null>(null);
  const [pinnedKey, setPinnedKey] = useState<string | null>(null);

  // Zoom + pan state. (zoom is a scalar; pan is in SVG units before scale.)
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const draggingRef = useRef<{ startX: number; startY: number; startPan: { x: number; y: number } } | null>(null);
  const pinchRef = useRef<{ d0: number; zoom0: number } | null>(null);
  const pointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Pull country polygons once.
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

  // Mercator projection fitted to the Bible-lands bounding box.
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
    return geoMercator().fitExtent([[24, 24], [WIDTH - 24, HEIGHT - 24]], bboxFeature);
  }, []);

  const path = useMemo(() => geoPath(projection), [projection]);

  const countries: FeatureCollection | null = useMemo(() => {
    if (!topo) return null;
    return feature(topo, topo.objects.countries as TopoGeometryObject) as unknown as FeatureCollection;
  }, [topo]);

  const borders: MultiLineString | null = useMemo(() => {
    if (!topo) return null;
    return mesh(topo, topo.objects.countries as TopoGeometryObject, (a, b) => a !== b) as unknown as MultiLineString;
  }, [topo]);

  const allMarkers: Marker[] = useMemo(
    () =>
      atlasRegions.flatMap((region) =>
        region.places.map((place, i) => ({ region, place, orderInEra: i + 1 })),
      ),
    [],
  );

  const visibleMarkers =
    activeEra === "all" ? allMarkers : allMarkers.filter((m) => m.region.id === activeEra);

  const activeRegion = activeEra === "all" ? null : atlasRegions.find((r) => r.id === activeEra) ?? null;

  // Journey polyline for the active era (its places in order).
  const journey = useMemo(() => {
    if (!activeRegion) return null;
    const points: [number, number][] = [];
    for (const place of activeRegion.places) {
      const xy = projection([place.lon, place.lat]);
      if (xy) points.push([xy[0], xy[1]]);
    }
    return points;
  }, [activeRegion, projection]);

  // ─────────── Zoom + pan handlers ───────────

  function clampPan(p: { x: number; y: number }, z: number) {
    // Allow some over-pan so the user doesn't feel clamped, but keep the map
    // mostly in view. With scale z, contents span z*WIDTH × z*HEIGHT;
    // allow pan range so the map can still be seen.
    const slack = 200;
    const maxX = slack;
    const minX = WIDTH - z * WIDTH - slack;
    const maxY = slack;
    const minY = HEIGHT - z * HEIGHT - slack;
    return {
      x: Math.min(maxX, Math.max(minX, p.x)),
      y: Math.min(maxY, Math.max(minY, p.y)),
    };
  }

  function zoomAt(svgX: number, svgY: number, nextZoom: number) {
    const z = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, nextZoom));
    const k = z / zoom;
    // Keep the anchor point fixed under the scale change.
    const newPan = {
      x: svgX - k * (svgX - pan.x),
      y: svgY - k * (svgY - pan.y),
    };
    setZoom(z);
    setPan(clampPan(newPan, z));
  }

  function getSvgPoint(clientX: number, clientY: number): { x: number; y: number } | null {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * WIDTH,
      y: ((clientY - rect.top) / rect.height) * HEIGHT,
    };
  }

  function onWheel(e: React.WheelEvent<SVGSVGElement>) {
    e.preventDefault();
    const p = getSvgPoint(e.clientX, e.clientY);
    if (!p) return;
    const factor = e.deltaY > 0 ? 0.85 : 1.18;
    zoomAt(p.x, p.y, zoom * factor);
  }

  function onPointerDown(e: React.PointerEvent<SVGSVGElement>) {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    // Two-finger pinch
    if (pointersRef.current.size === 2) {
      const [a, b] = Array.from(pointersRef.current.values());
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      pinchRef.current = { d0: d, zoom0: zoom };
      draggingRef.current = null;
      return;
    }
    // Single-pointer drag
    draggingRef.current = { startX: e.clientX, startY: e.clientY, startPan: pan };
  }

  function onPointerMove(e: React.PointerEvent<SVGSVGElement>) {
    if (!pointersRef.current.has(e.pointerId)) return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    // Pinch zoom
    if (pointersRef.current.size === 2 && pinchRef.current) {
      const [a, b] = Array.from(pointersRef.current.values());
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const ratio = d / pinchRef.current.d0;
      const mid = {
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2,
      };
      const p = getSvgPoint(mid.x, mid.y);
      if (p) zoomAt(p.x, p.y, pinchRef.current.zoom0 * ratio);
      return;
    }

    // Drag
    const d = draggingRef.current;
    if (!d) return;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const dx = ((e.clientX - d.startX) / rect.width) * WIDTH;
    const dy = ((e.clientY - d.startY) / rect.height) * HEIGHT;
    setPan(clampPan({ x: d.startPan.x + dx, y: d.startPan.y + dy }, zoom));
  }

  function onPointerUp(e: React.PointerEvent<SVGSVGElement>) {
    pointersRef.current.delete(e.pointerId);
    if (pointersRef.current.size < 2) pinchRef.current = null;
    if (pointersRef.current.size === 0) draggingRef.current = null;
  }

  function resetView() {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }

  function scrollTo(id: string) {
    if (typeof document === "undefined") return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ─────────── Render ───────────

  // Project markers into post-transform coordinates so we can compute labels.
  const projectedMarkers = useMemo(() => {
    return visibleMarkers
      .map((m) => {
        const xy = projection([m.place.lon, m.place.lat]);
        if (!xy) return null;
        return { ...m, x: xy[0], y: xy[1] };
      })
      .filter((m): m is Marker & { x: number; y: number } => m !== null);
  }, [visibleMarkers, projection]);

  /**
   * Tier-aware collision-checked set of labels that should render.
   *
   * Computed in screen-space (after pan/zoom) so two labels next to each
   * other near a high-density area (Jerusalem, Galilee, the Aegean) don't
   * stack on top of each other. The classical algorithm: sort by tier,
   * greedily place highest-priority labels first, drop any later label
   * that would overlap an already-placed one.
   */
  const visibleLabelKeys = useMemo(() => {
    // On-screen pixel constants — labels inside the scaled <g> use
    // fontSize / zoom so their on-screen size is constant.
    const FONT_PX = 11;
    const PADDING_PX = 4;
    const OFFSET_PX = 10;

    const items = projectedMarkers.map((m) => {
      const tier = (m.place.tier ?? (m.place.major ? 2 : 3)) as 1 | 2 | 3;
      const eligible = zoom >= TIER_ZOOM_THRESHOLD[tier];
      const screenX = pan.x + m.x * zoom;
      const screenY = pan.y + m.y * zoom;
      const label = m.place.short ?? m.place.name;
      const w = label.length * (FONT_PX * 0.58) + PADDING_PX * 2;
      const h = FONT_PX + PADDING_PX * 2;
      const box = {
        x: screenX - w / 2,
        y: screenY - OFFSET_PX - h,
        w,
        h,
      };
      const key = `${m.region.id}:${m.place.name}`;
      return { key, tier, eligible, box };
    });

    // Highest priority first (tier 1 before tier 2 before tier 3).
    items.sort((a, b) => a.tier - b.tier);

    const placed: Array<{ x: number; y: number; w: number; h: number }> = [];
    const visible = new Set<string>();

    for (const { eligible, box, key } of items) {
      if (!eligible) continue;
      // Skip if the label box is fully outside the viewport (some slack).
      if (box.x + box.w < -50 || box.x > WIDTH + 50) continue;
      if (box.y + box.h < -50 || box.y > HEIGHT + 50) continue;
      // Skip if it overlaps any already-placed label.
      const overlaps = placed.some(
        (p) =>
          box.x < p.x + p.w &&
          box.x + box.w > p.x &&
          box.y < p.y + p.h &&
          box.y + box.h > p.y,
      );
      if (overlaps) continue;
      placed.push(box);
      visible.add(key);
    }
    return visible;
  }, [projectedMarkers, zoom, pan]);

  return (
    <div className="rounded-3xl border border-ink-200 bg-card p-3 md:p-4 overflow-hidden">
      {/* Era filter chips */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        <button
          onClick={() => setActiveEra("all")}
          className={`rounded-full border px-3 py-1 text-xs transition-colors ${
            activeEra === "all"
              ? "bg-ink-900 text-ink-50 border-ink-900"
              : "border-ink-300 text-ink-700 hover:border-ink-900"
          }`}
        >
          All eras · {allMarkers.length}
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
            <span aria-hidden className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: r.color }} />
            <span className="whitespace-nowrap">{r.title.split("—")[0].trim().split("·")[0].trim()}</span>
            <span className={activeEra === r.id ? "text-flame-300" : "text-ink-400"}>· {r.places.length}</span>
          </button>
        ))}
      </div>

      {/* Map + zoom controls */}
      <div className="relative rounded-2xl overflow-hidden bg-ink-50/40 dark:bg-ink-100/10 border border-ink-100 touch-none select-none">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          style={{ cursor: draggingRef.current ? "grabbing" : "grab" }}
          role="img"
          aria-label="Interactive map of the Bible lands"
          onWheel={onWheel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
            </marker>
          </defs>

          {/* Sea fill (does not move with zoom) */}
          <rect x={0} y={0} width={WIDTH} height={HEIGHT} fill="#dbe7f1" />

          <g transform={`translate(${pan.x} ${pan.y}) scale(${zoom})`}>
            {/* Country fills */}
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
                      strokeWidth={0.5 / zoom}
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
                strokeWidth={0.7 / zoom}
                strokeLinejoin="round"
              />
            )}

            {/* Journey path for the active era */}
            {journey && journey.length > 1 && activeRegion && (
              <g style={{ color: activeRegion.color }}>
                <polyline
                  points={journey.map((p) => p.join(",")).join(" ")}
                  fill="none"
                  stroke={activeRegion.color}
                  strokeWidth={2.5 / zoom}
                  strokeLinecap="round"
                  strokeDasharray={`${6 / zoom} ${4 / zoom}`}
                  opacity={0.75}
                  markerEnd="url(#arrow)"
                />
              </g>
            )}

            {/* Markers */}
            {projectedMarkers.map((m) => {
              const key = `${m.region.id}:${m.place.name}`;
              const isHover = hoverKey === key || pinnedKey === key;
              const r = (isHover ? 9 : 6) / zoom;
              const rOuter = (isHover ? 13 : 9) / zoom;
              const showOrder = activeEra !== "all";
              return (
                <g
                  key={key}
                  transform={`translate(${m.x} ${m.y})`}
                  onMouseEnter={() => setHoverKey(key)}
                  onMouseLeave={() => setHoverKey((h) => (h === key ? null : h))}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPinnedKey((cur) => (cur === key ? null : key));
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <circle r={rOuter} fill={m.region.color} fillOpacity={0.35} />
                  <circle
                    r={r}
                    fill={m.region.color}
                    stroke="#0a0a0c"
                    strokeWidth={(isHover ? 1.4 : 0.9) / zoom}
                  />
                  {showOrder && (
                    <text
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={6.5 / zoom}
                      fontWeight={700}
                      fontFamily="ui-sans-serif, system-ui, sans-serif"
                      fill="#ffffff"
                      pointerEvents="none"
                    >
                      {m.orderInEra}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Labels — tier-thresholded + collision-checked.
                Focused (hover/pinned) labels always show, even if they would
                otherwise overlap. */}
            {projectedMarkers.map((m) => {
              const key = `${m.region.id}:${m.place.name}`;
              const isFocused = hoverKey === key || pinnedKey === key;
              if (!visibleLabelKeys.has(key) && !isFocused) return null;
              const label = m.place.short ?? m.place.name;
              const fontSize = (isFocused ? 13 : 11) / zoom;
              const textW = label.length * (fontSize * 0.58);
              const offset = 10 / zoom;
              return (
                <g
                  key={`label-${key}`}
                  transform={`translate(${m.x} ${m.y})`}
                  pointerEvents="none"
                >
                  {isFocused ? (
                    <>
                      <rect
                        x={-textW / 2 - 6 / zoom}
                        y={-offset - fontSize - 6 / zoom}
                        width={textW + 12 / zoom}
                        height={fontSize + 8 / zoom}
                        rx={6 / zoom}
                        fill="#0a0a0c"
                        fillOpacity={0.92}
                      />
                      <text
                        textAnchor="middle"
                        y={-offset - 2 / zoom}
                        fontSize={fontSize}
                        fontFamily="ui-sans-serif, system-ui, sans-serif"
                        fontWeight={600}
                        fill="#fafaf6"
                      >
                        {label}
                      </text>
                    </>
                  ) : (
                    <>
                      <text
                        textAnchor="middle"
                        y={-offset}
                        fontSize={fontSize}
                        fontFamily="ui-sans-serif, system-ui, sans-serif"
                        fontWeight={600}
                        stroke="#fafaf6"
                        strokeWidth={3 / zoom}
                        strokeLinejoin="round"
                        paintOrder="stroke"
                        fill="#1a1a1a"
                      >
                        {label}
                      </text>
                    </>
                  )}
                </g>
              );
            })}
          </g>

          {/* "Compass" — fixed corner watermark */}
          <g transform={`translate(${WIDTH - 56} 44)`} pointerEvents="none">
            <circle cx={0} cy={0} r={24} fill="#fafaf6" fillOpacity={0.92} stroke="#9c9072" strokeWidth={1} />
            <path d="M 0 -16 L 4 0 L 0 16 L -4 0 z" fill="#0a0a0c" />
            <text textAnchor="middle" y={-26} fontSize={9} fontFamily="ui-sans-serif,system-ui" fill="#6b6754">
              N
            </text>
          </g>
        </svg>

        {/* Zoom controls — overlay */}
        <div className="absolute right-3 bottom-3 flex flex-col gap-1.5 bg-card/95 backdrop-blur rounded-full border border-ink-200 p-1">
          <button
            onClick={() => zoomAt(WIDTH / 2, HEIGHT / 2, zoom * 1.5)}
            className="h-7 w-7 rounded-full text-base text-ink-700 hover:bg-ink-100 inline-flex items-center justify-center"
            aria-label="Zoom in"
            title="Zoom in"
          >
            +
          </button>
          <button
            onClick={() => zoomAt(WIDTH / 2, HEIGHT / 2, zoom / 1.5)}
            className="h-7 w-7 rounded-full text-base text-ink-700 hover:bg-ink-100 inline-flex items-center justify-center"
            aria-label="Zoom out"
            title="Zoom out"
          >
            −
          </button>
          <button
            onClick={resetView}
            className="h-7 w-7 rounded-full text-[10px] text-ink-700 hover:bg-ink-100 inline-flex items-center justify-center"
            aria-label="Reset view"
            title="Reset view"
          >
            ⤢
          </button>
        </div>

        {/* Pinned-place card — overlay top-left */}
        {(() => {
          const key = pinnedKey ?? hoverKey;
          if (!key) return null;
          const m = projectedMarkers.find((x) => `${x.region.id}:${x.place.name}` === key);
          if (!m) return null;
          return (
            <div className="absolute left-3 top-3 max-w-[14rem] rounded-2xl border border-ink-200 bg-card/95 backdrop-blur shadow-lg p-3 text-sm">
              <div className="text-[10px] uppercase tracking-widest" style={{ color: m.region.color }}>
                {m.region.era}
              </div>
              <div className="font-serif text-ink-900 text-base mt-0.5 leading-tight">
                {m.place.name}
              </div>
              <p className="mt-1 text-xs text-ink-700 leading-relaxed">{m.place.what}</p>
              {m.place.ref && (
                <p className="mt-1 text-[11px] text-flame-700">{m.place.ref}</p>
              )}
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => scrollTo(m.region.id)}
                  className="text-[11px] text-ink-500 hover:text-ink-900 underline"
                >
                  Read the era →
                </button>
                {pinnedKey && (
                  <button
                    onClick={() => setPinnedKey(null)}
                    className="text-[11px] text-ink-400 hover:text-ink-700 ml-auto"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          );
        })()}

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

      {/* Active-era story strip below the map */}
      {activeRegion ? (
        <div
          className="mt-3 rounded-2xl border p-4"
          style={{ borderColor: activeRegion.color, background: `${activeRegion.color}10` }}
        >
          <div className="flex flex-wrap items-baseline gap-3">
            <div className="text-[10px] uppercase tracking-widest" style={{ color: activeRegion.color }}>
              {activeRegion.era}
            </div>
            <button
              onClick={() => scrollTo(activeRegion.id)}
              className="ml-auto text-[11px] text-ink-500 hover:text-ink-900 underline"
            >
              Read the full era →
            </button>
          </div>
          <h3 className="font-serif text-lg md:text-xl text-ink-900 mt-1 leading-snug">
            {activeRegion.title}
          </h3>
          <p className="mt-2 text-sm text-ink-700 leading-relaxed">{activeRegion.blurb}</p>
          <div className="mt-2 text-[11px] text-ink-500">
            Story order: {activeRegion.places.map((p, i) => `${i + 1}. ${p.short ?? p.name}`).join(" → ")}
          </div>
        </div>
      ) : (
        <p className="mt-3 text-[11px] text-ink-500 leading-relaxed">
          Scroll to zoom · drag to pan · pinch on mobile · tap any dot for details · pick an era
          above to draw its journey arrows. <span className="italic">(approx)</span> marks an
          approximate or contested location (Eden, Mount Sinai, Sea of Reeds, Emmaus).
        </p>
      )}
    </div>
  );
}
