"use client";

/**
 * Logo studies — eight monogram directions for Scripture Theory, ported from
 * the Claude Design "CCAI Global" handoff bundle (Logo Studies.html).
 *
 * Palette: ink #120a06, vellum #f3e7c8, gold #c89557, gold-bright #d4a574,
 * gold-faint #6b4e2a, oxblood #7a2222. The wordmark and the inner ornaments
 * use the Cormorant Garamond serif (loaded by the /brand page).
 *
 * Each component renders an SVG with viewBox 360×240 and scales to its
 * container. They are pure presentational components — no state, no props,
 * easy to drop into any tile or hero.
 */

const INK = "#120a06";
const VELLUM = "#f3e7c8";
const GOLD = "#c89557";
const GOLD_BRIGHT = "#d4a574";
const GOLD_FAINT = "#6b4e2a";

// ─────────────────────────── 01 · Lapidary ────────────────────────────
export function LogoLapidary() {
  return (
    <svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scripture Theory — Lapidary">
      <defs>
        <linearGradient id="lap-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={GOLD_BRIGHT} />
          <stop offset="1" stopColor={GOLD} />
        </linearGradient>
      </defs>
      <line x1="60" y1="58" x2="300" y2="58" stroke={GOLD_FAINT} strokeWidth="0.8" />
      <line x1="60" y1="182" x2="300" y2="182" stroke={GOLD_FAINT} strokeWidth="0.8" />
      <text x="130" y="158" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="148" fontWeight="500" fill="url(#lap-g)" letterSpacing="2">S</text>
      <circle cx="180" cy="120" r="3.2" fill={GOLD_BRIGHT} />
      <text x="230" y="158" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="148" fontWeight="500" fill="url(#lap-g)" letterSpacing="2">T</text>
      <text x="180" y="210" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="13" fill={VELLUM} letterSpacing="6">SCRIPTURE&nbsp;&nbsp;THEORY</text>
    </svg>
  );
}

// ─────────────────────────── 02 · Vesica ──────────────────────────────
export function LogoVesica() {
  return (
    <svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scripture Theory — Vesica">
      <path d="M180 50 A 100 100 0 0 1 180 190 A 100 100 0 0 1 180 50 Z" fill="none" stroke={GOLD} strokeWidth="1.4" />
      <path d="M180 60 A 92 92 0 0 1 180 180 A 92 92 0 0 1 180 60 Z" fill="none" stroke={GOLD_FAINT} strokeWidth="0.6" />
      <text x="180" y="148" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="92" fontWeight="500" fontStyle="italic" fill={VELLUM}>
        S<tspan dx="-12" fill={GOLD_BRIGHT}>T</tspan>
      </text>
      <text x="180" y="222" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="11" fill={VELLUM} letterSpacing="5">SCRIPTURE&nbsp;&nbsp;THEORY</text>
    </svg>
  );
}

// ─────────────────────────── 03 · Crossbar ────────────────────────────
export function LogoCross() {
  return (
    <svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scripture Theory — Crossbar">
      <rect x="80" y="62" width="200" height="6" fill={GOLD} />
      <rect x="176" y="62" width="8" height="120" fill={VELLUM} />
      <text x="120" y="174" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="148" fontWeight="500" fontStyle="italic" fill={GOLD_BRIGHT}>S</text>
      <text x="180" y="216" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="12" fill={VELLUM} letterSpacing="5">SCRIPTURE&nbsp;&nbsp;THEORY</text>
    </svg>
  );
}

// ─────────────────────────── 04 · Illuminated ─────────────────────────
export function LogoIlluminated() {
  return (
    <svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scripture Theory — Illuminated">
      <rect x="110" y="40" width="140" height="140" fill="none" stroke={GOLD} strokeWidth="1.2" />
      <rect x="116" y="46" width="128" height="128" fill="none" stroke={GOLD_FAINT} strokeWidth="0.6" />
      {[[110, 40], [250, 40], [110, 180], [250, 180]].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.2" fill={GOLD} />
      ))}
      <text x="180" y="148" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="148" fontWeight="600" fill={GOLD_BRIGHT}>S</text>
      <text x="218" y="166" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="44" fontWeight="500" fontStyle="italic" fill={VELLUM}>t</text>
      <text x="180" y="212" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="11" fill={VELLUM} letterSpacing="5">SCRIPTURE&nbsp;&nbsp;THEORY</text>
    </svg>
  );
}

// ─────────────────────────── 05 · Stacked Plate ───────────────────────
export function LogoStacked() {
  return (
    <svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scripture Theory — Stacked Plate">
      <rect x="135" y="36" width="90" height="148" fill="none" stroke={GOLD} strokeWidth="1" />
      <text x="180" y="100" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="76" fontWeight="500" fill={VELLUM}>S</text>
      <line x1="148" y1="110" x2="212" y2="110" stroke={GOLD_BRIGHT} strokeWidth="0.9" />
      <text x="180" y="170" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="76" fontWeight="500" fill={GOLD_BRIGHT}>T</text>
      <text x="180" y="216" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="11" fill={VELLUM} letterSpacing="5">SCRIPTURE&nbsp;&nbsp;THEORY</text>
    </svg>
  );
}

// ─────────────────────────── 06 · Seal ────────────────────────────────
export function LogoSeal() {
  return (
    <svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scripture Theory — Seal">
      <circle cx="180" cy="110" r="74" fill={GOLD_BRIGHT} />
      <text x="180" y="156" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="128" fontWeight="700" fill={INK}>S</text>
      <text x="180" y="138" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="48" fontWeight="500" fill={VELLUM}>T</text>
      <text x="180" y="216" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="11" fill={VELLUM} letterSpacing="5">SCRIPTURE&nbsp;&nbsp;THEORY</text>
    </svg>
  );
}

// ─────────────────────────── 07 · Ligature ────────────────────────────
export function LogoLigature() {
  return (
    <svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scripture Theory — Ligature">
      <text x="180" y="160" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="170" fontWeight="500" fontStyle="italic" fill={GOLD_BRIGHT} style={{ fontFeatureSettings: "'liga' 1, 'dlig' 1" }}>St</text>
      <path d="M 96 178 C 160 196, 220 196, 268 174" fill="none" stroke={VELLUM} strokeWidth="1.2" strokeLinecap="round" />
      <text x="180" y="214" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="11" fill={VELLUM} letterSpacing="5">SCRIPTURE&nbsp;&nbsp;THEORY</text>
    </svg>
  );
}

// ─────────────────────────── 08 · Compass ─────────────────────────────
export function LogoCompass() {
  const ticks = Array.from({ length: 24 }, (_, i) => i);
  return (
    <svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scripture Theory — Compass">
      <g transform="translate(180 112)">
        <circle r="84" fill="none" stroke={GOLD} strokeWidth="1.2" />
        <circle r="76" fill="none" stroke={GOLD_FAINT} strokeWidth="0.6" />
        {ticks.map((i) => {
          const isMajor = i % 6 === 0;
          const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
          const r1 = 76;
          const r2 = isMajor ? 66 : 71;
          return (
            <line
              key={i}
              x1={Math.cos(a) * r1}
              y1={Math.sin(a) * r1}
              x2={Math.cos(a) * r2}
              y2={Math.sin(a) * r2}
              stroke={isMajor ? GOLD_BRIGHT : GOLD_FAINT}
              strokeWidth={isMajor ? 1.4 : 0.7}
            />
          );
        })}
        <text y="22" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="86" fontWeight="500" fill={VELLUM}>
          S<tspan dx="-6" fill={GOLD_BRIGHT}>T</tspan>
        </text>
      </g>
      <text x="180" y="220" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="11" fill={VELLUM} letterSpacing="5">SCRIPTURE&nbsp;&nbsp;THEORY</text>
    </svg>
  );
}

// ─────────────────────────── catalog ──────────────────────────────────

export type LogoStudy = {
  id: "lapidary" | "vesica" | "cross" | "illuminated" | "stacked" | "seal" | "ligature" | "compass";
  num: string;
  name: string;
  tag: string;
  concept: string;
  Comp: React.ComponentType;
};

export const logoStudies: LogoStudy[] = [
  {
    id: "lapidary",
    num: "01",
    name: "Lapidary",
    tag: "Inscription · classical",
    concept:
      "Roman inscription. S·T with a center dot and hairline rules above and below — the gravitas of stone-cut Scripture.",
    Comp: LogoLapidary,
  },
  {
    id: "vesica",
    num: "02",
    name: "Vesica",
    tag: "Vesica · sacred geometry",
    concept:
      "The mandorla — two overlapping circles, an ancient Christian seal. Italic monogram nested inside the almond.",
    Comp: LogoVesica,
  },
  {
    id: "cross",
    num: "03",
    name: "Crossbar",
    tag: "Cross · grounded",
    concept:
      "The T's crossbar extends — Scripture grounded in the Cross. Italic S leans in. Subtle, not preachy.",
    Comp: LogoCross,
  },
  {
    id: "illuminated",
    num: "04",
    name: "Illuminated",
    tag: "Drop cap · manuscript",
    concept:
      "A bordered drop cap. Large S, italic t tucked into its lower counter. Echoes manuscript and medieval book arts.",
    Comp: LogoIlluminated,
  },
  {
    id: "stacked",
    num: "05",
    name: "Stacked Plate",
    tag: "Plate · publisher's mark",
    concept:
      "S over T inside a thin rule — a publisher's imprint. Vertical, archival, neutral; works at small sizes.",
    Comp: LogoStacked,
  },
  {
    id: "seal",
    num: "06",
    name: "Seal",
    tag: "Disc · seal",
    concept:
      "A gold disc — Scripture as light. Heavy S cut from the field, a small T centered as a quiet anchor.",
    Comp: LogoSeal,
  },
  {
    id: "ligature",
    num: "07",
    name: "Ligature",
    tag: "Hand · italic",
    concept:
      "A flowing italic St ligature with a calligraphic swash. The most human of the eight — voiced, written.",
    Comp: LogoLigature,
  },
  {
    id: "compass",
    num: "08",
    name: "Compass",
    tag: "Medallion · for the nations",
    concept:
      "A medallion with 24 ticks — the world the Body is sent to. Monogram at center, gold cardinal marks.",
    Comp: LogoCompass,
  },
];
