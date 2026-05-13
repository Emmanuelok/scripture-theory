"use client";

import { useMemo } from "react";
import type { NewsItem } from "@/lib/news";

type Item = NewsItem & { prayerWorthy?: boolean };

// A handful of region coordinates (% of viewport) — used to place dots on a
// stylized world map. We map item titles to regions via simple keyword match
// so each headline gets a rough geographic pin.
const REGIONS: { label: string; x: number; y: number; keywords: string[] }[] = [
  { label: "USA", x: 22, y: 38, keywords: ["united states", "america", "us ", "u.s.", "biden", "trump", "washington", "new york", "texas", "california"] },
  { label: "Canada", x: 22, y: 28, keywords: ["canada", "ottawa", "toronto"] },
  { label: "Mexico", x: 19, y: 47, keywords: ["mexico", "cartel"] },
  { label: "Brazil", x: 33, y: 60, keywords: ["brazil", "lula", "rio", "amazon"] },
  { label: "Argentina", x: 30, y: 75, keywords: ["argentina", "buenos aires"] },
  { label: "Venezuela", x: 28, y: 53, keywords: ["venezuela", "maduro", "caracas"] },
  { label: "Colombia", x: 27, y: 55, keywords: ["colombia", "bogota"] },
  { label: "UK", x: 47, y: 30, keywords: ["uk", "britain", "british", "london", "england", "scotland"] },
  { label: "France", x: 49, y: 33, keywords: ["france", "paris", "macron"] },
  { label: "Germany", x: 51, y: 31, keywords: ["germany", "berlin", "merz"] },
  { label: "Spain", x: 47, y: 36, keywords: ["spain", "madrid", "barcelona"] },
  { label: "Italy", x: 51, y: 36, keywords: ["italy", "rome", "vatican", "pope"] },
  { label: "Russia", x: 60, y: 28, keywords: ["russia", "putin", "kremlin", "moscow"] },
  { label: "Ukraine", x: 55, y: 32, keywords: ["ukraine", "kyiv", "zelensky"] },
  { label: "Poland", x: 53, y: 30, keywords: ["poland", "warsaw"] },
  { label: "Turkey", x: 56, y: 38, keywords: ["turkey", "ankara", "istanbul", "erdogan"] },
  { label: "Israel", x: 56, y: 42, keywords: ["israel", "tel aviv", "jerusalem", "netanyahu"] },
  { label: "Palestine", x: 56, y: 43, keywords: ["palestine", "gaza", "hamas", "west bank"] },
  { label: "Lebanon", x: 56, y: 41, keywords: ["lebanon", "beirut", "hezbollah"] },
  { label: "Syria", x: 57, y: 41, keywords: ["syria", "damascus", "aleppo"] },
  { label: "Iran", x: 60, y: 41, keywords: ["iran", "tehran"] },
  { label: "Iraq", x: 58, y: 41, keywords: ["iraq", "baghdad", "mosul"] },
  { label: "Saudi Arabia", x: 59, y: 46, keywords: ["saudi", "riyadh", "mbs"] },
  { label: "Yemen", x: 60, y: 50, keywords: ["yemen", "houthi", "sana"] },
  { label: "Egypt", x: 56, y: 47, keywords: ["egypt", "cairo", "sisi"] },
  { label: "Sudan", x: 56, y: 53, keywords: ["sudan", "khartoum", "darfur"] },
  { label: "Ethiopia", x: 59, y: 56, keywords: ["ethiopia", "addis"] },
  { label: "Kenya", x: 59, y: 60, keywords: ["kenya", "nairobi"] },
  { label: "Nigeria", x: 51, y: 56, keywords: ["nigeria", "lagos", "abuja", "boko haram"] },
  { label: "DRC", x: 55, y: 60, keywords: ["congo", "kinshasa", "drc"] },
  { label: "South Africa", x: 56, y: 73, keywords: ["south africa", "johannesburg", "cape town"] },
  { label: "Morocco", x: 47, y: 44, keywords: ["morocco", "rabat"] },
  { label: "India", x: 70, y: 47, keywords: ["india", "delhi", "modi", "mumbai"] },
  { label: "Pakistan", x: 67, y: 43, keywords: ["pakistan", "islamabad", "karachi"] },
  { label: "Bangladesh", x: 73, y: 47, keywords: ["bangladesh", "dhaka"] },
  { label: "Afghanistan", x: 67, y: 40, keywords: ["afghanistan", "kabul", "taliban"] },
  { label: "China", x: 78, y: 40, keywords: ["china", "beijing", "xi", "shanghai", "hong kong"] },
  { label: "Japan", x: 86, y: 40, keywords: ["japan", "tokyo", "kyoto"] },
  { label: "S. Korea", x: 84, y: 40, keywords: ["korea", "seoul"] },
  { label: "N. Korea", x: 84, y: 38, keywords: ["north korea", "pyongyang", "kim jong"] },
  { label: "Indonesia", x: 80, y: 60, keywords: ["indonesia", "jakarta"] },
  { label: "Philippines", x: 84, y: 53, keywords: ["philippines", "manila"] },
  { label: "Vietnam", x: 79, y: 50, keywords: ["vietnam", "hanoi"] },
  { label: "Thailand", x: 77, y: 51, keywords: ["thailand", "bangkok"] },
  { label: "Myanmar", x: 75, y: 49, keywords: ["myanmar", "burma"] },
  { label: "Australia", x: 84, y: 73, keywords: ["australia", "sydney", "melbourne"] },
  { label: "New Zealand", x: 92, y: 80, keywords: ["new zealand", "auckland", "wellington"] },
];

function placeItem(it: Item) {
  const hay = `${it.title} ${it.description ?? ""}`.toLowerCase();
  for (const r of REGIONS) {
    for (const k of r.keywords) if (hay.includes(k)) return r;
  }
  return null;
}

export default function WorldMapView({ items }: { items: Item[] }) {
  const placed = useMemo(() => {
    const out: { region: typeof REGIONS[number]; item: Item }[] = [];
    for (const it of items) {
      const r = placeItem(it);
      if (r) out.push({ region: r, item: it });
    }
    return out;
  }, [items]);

  // Group by region for cluster sizing
  const byRegion = useMemo(() => {
    const m = new Map<string, { region: typeof REGIONS[number]; items: Item[] }>();
    for (const p of placed) {
      const cur = m.get(p.region.label);
      if (cur) cur.items.push(p.item);
      else m.set(p.region.label, { region: p.region, items: [p.item] });
    }
    return Array.from(m.values());
  }, [placed]);

  return (
    <div className="rounded-3xl border border-ink-200 bg-card-subtle p-5 md:p-6">
      <div className="flex items-baseline justify-between mb-3">
        <div className="text-xs uppercase tracking-widest text-ink-500">
          Where the world is praying right now
        </div>
        <span className="text-[10px] uppercase tracking-widest text-ink-400">
          {byRegion.length} region{byRegion.length === 1 ? "" : "s"} · {placed.length} stor{placed.length === 1 ? "y" : "ies"}
        </span>
      </div>

      <div className="relative w-full aspect-[2/1] rounded-2xl bg-ink-100 overflow-hidden">
        {/* Stylized continents — simplified SVG */}
        <svg
          viewBox="0 0 1000 500"
          className="absolute inset-0 h-full w-full text-ink-300"
          aria-hidden
        >
          <g fill="currentColor">
            {/* North America */}
            <path d="M150 160 L235 130 L290 145 L320 200 L300 270 L240 290 L170 270 L130 220 Z" />
            {/* Central America */}
            <path d="M205 280 L240 290 L255 320 L235 340 L210 320 Z" />
            {/* South America */}
            <path d="M280 320 L340 305 L350 380 L320 460 L290 470 L260 410 Z" />
            {/* Greenland */}
            <path d="M340 90 L390 80 L405 130 L380 150 L335 135 Z" />
            {/* Europe */}
            <path d="M460 140 L520 120 L560 130 L555 175 L495 195 L460 180 Z" />
            {/* Africa */}
            <path d="M460 215 L545 205 L580 250 L595 350 L570 415 L520 425 L490 385 L470 320 L455 270 Z" />
            {/* Middle East */}
            <path d="M555 195 L600 200 L615 240 L585 250 L555 235 Z" />
            {/* Russia / Central Asia */}
            <path d="M555 90 L750 70 L800 100 L780 145 L700 165 L600 155 L555 130 Z" />
            {/* India */}
            <path d="M670 200 L730 195 L740 250 L705 270 L675 245 Z" />
            {/* East Asia */}
            <path d="M740 130 L840 130 L865 175 L850 220 L800 230 L745 205 Z" />
            {/* SE Asia */}
            <path d="M750 240 L820 250 L830 290 L770 295 Z" />
            {/* Indonesia / archipelago */}
            <path d="M770 305 L870 305 L880 330 L780 335 Z" />
            {/* Australia */}
            <path d="M810 360 L900 355 L915 405 L860 415 L815 395 Z" />
            {/* New Zealand */}
            <path d="M915 405 L935 410 L935 430 L910 425 Z" />
            {/* Japan */}
            <path d="M858 175 L885 170 L890 200 L865 205 Z" />
            {/* British Isles */}
            <path d="M448 145 L470 140 L470 165 L450 165 Z" />
          </g>
        </svg>

        {/* Story dots */}
        {byRegion.map(({ region, items: regionItems }) => {
          const urgent = regionItems.filter((i) => i.prayerWorthy).length;
          const size = Math.min(28, 12 + regionItems.length * 3);
          return (
            <div
              key={region.label}
              className="group absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${region.x}%`, top: `${region.y}%` }}
            >
              <div
                className={`rounded-full ${
                  urgent > 0 ? "bg-flame-500 ring-2 ring-flame-300/50" : "bg-ink-500"
                } animate-pulse cursor-pointer transition-transform group-hover:scale-110`}
                style={{ width: size, height: size }}
                aria-label={`${regionItems.length} stories in ${region.label}`}
              />
              <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium text-ink-700 opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-ink-200 rounded px-1.5 py-0.5 shadow z-10 pointer-events-none">
                {region.label} · {regionItems.length}{urgent > 0 && ` · 🔥${urgent}`}
              </div>
            </div>
          );
        })}
      </div>

      {placed.length === 0 && (
        <p className="mt-3 text-xs text-ink-500 text-center italic">
          No stories matched a known region this cycle. Pull-to-refresh in a moment.
        </p>
      )}
      <p className="mt-3 text-[11px] text-ink-500 leading-relaxed text-center">
        Dot size ~ number of stories from that region. Flame = at least one urgent story.
        Hover or tap to see the count.
      </p>
    </div>
  );
}
