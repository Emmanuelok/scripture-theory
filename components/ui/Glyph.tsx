import type { SVGProps } from "react";

/**
 * Shared icon library. Tiny, elegant, inline SVG.
 * Use stroke="currentColor" so tone is inherited.
 */

export type GlyphId =
  | "book"
  | "open-book"
  | "scroll"
  | "library"
  | "flame"
  | "dove"
  | "door"
  | "house"
  | "compass"
  | "cross"
  | "chalice"
  | "bread"
  | "harp"
  | "hours"
  | "eye"
  | "ear"
  | "hands"
  | "fruit"
  | "tree"
  | "rings"
  | "altar"
  | "examen"
  | "lament"
  | "forgive"
  | "heal"
  | "rule"
  | "sabbath"
  | "fast"
  | "memory"
  | "catechism"
  | "shield"
  | "globe"
  | "chain"
  | "lamp"
  | "wreath"
  | "tablet"
  | "key"
  | "anchor"
  | "wave"
  | "people"
  | "path";

type Props = SVGProps<SVGSVGElement> & { id: GlyphId; size?: number };

export function Glyph({ id, size = 44, ...rest }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...rest,
  };

  switch (id) {
    case "book":
      return (
        <svg {...common}>
          <path d="M3 5.5C3 4.67 3.67 4 4.5 4H11v15H4.5A1.5 1.5 0 0 1 3 17.5v-12Z" />
          <path d="M21 5.5C21 4.67 20.33 4 19.5 4H13v15h6.5a1.5 1.5 0 0 0 1.5-1.5v-12Z" />
          <path d="M11 4v15M13 4v15" />
        </svg>
      );
    case "open-book":
      return (
        <svg {...common}>
          <path d="M3 5l9 2 9-2v14l-9 2-9-2z" />
          <path d="M12 7v14" />
          <path d="M6 8.5l4 1M14 9.5l4-1M6 12l4 1M14 13l4-1" />
        </svg>
      );
    case "scroll":
      return (
        <svg {...common}>
          <path d="M6 4h12v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4Z" />
          <path d="M9 8h6M9 12h6M9 16h4" />
        </svg>
      );
    case "library":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="3" height="16" />
          <rect x="8" y="4" width="3" height="16" />
          <rect x="13" y="6" width="3" height="14" transform="rotate(8 14.5 13)" />
          <rect x="18" y="4" width="3" height="16" />
        </svg>
      );
    case "flame":
      return (
        <svg {...common} fill="currentColor" opacity="0.85" stroke="none">
          <path d="M12 2c-1 4-5 5-5 10a5 5 0 0 0 10 0c0-3-2-4-2-7 0 2-1 3-3 4 1-3 1-5 0-7Z" />
        </svg>
      );
    case "dove":
      return (
        <svg {...common} fill="currentColor" opacity="0.85" stroke="none">
          <path d="M3 14c2-3 5-5 9-5 0-2 2-3 4-3-1 2-2 3-2 4 2 0 4 1 5 3-2 1-5 1-7 1-1 2-3 4-6 4l-3-1c-1-1-1-2 0-3Z" />
        </svg>
      );
    case "door":
      return (
        <svg {...common}>
          <path d="M5 3h14v18H5z" />
          <circle cx="15" cy="12" r="0.8" fill="currentColor" />
          <path d="M9 3v18" />
        </svg>
      );
    case "house":
      return (
        <svg {...common}>
          <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9Z" />
        </svg>
      );
    case "compass":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9 15l2-6 6-2-2 6Z" fill="currentColor" stroke="none" opacity="0.5" />
        </svg>
      );
    case "cross":
      return (
        <svg {...common}>
          <path d="M10 3h4v6h6v4h-6v8h-4v-8H4V9h6Z" />
        </svg>
      );
    case "chalice":
      return (
        <svg {...common}>
          <path d="M6 4h12l-1 6a5 5 0 0 1-5 5 5 5 0 0 1-5-5Z" />
          <path d="M12 15v5M9 20h6" />
        </svg>
      );
    case "bread":
      return (
        <svg {...common}>
          <path d="M4 12a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v6H4z" />
          <path d="M8 13v3M12 13v3M16 13v3" />
        </svg>
      );
    case "harp":
      return (
        <svg {...common}>
          <path d="M6 3v18M18 3v18" />
          <path d="M6 6c4 0 8 2 12 0M6 10c4 0 8 2 12 0M6 14c4 0 8 2 12 0M6 18c4 0 8 2 12 0" />
        </svg>
      );
    case "hours":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2.5" />
        </svg>
      );
    case "eye":
      return (
        <svg {...common}>
          <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "ear":
      return (
        <svg {...common}>
          <path d="M7 9a5 5 0 0 1 10 0c0 4-3 4-3 7a3 3 0 0 1-6 0" />
          <path d="M10 9a2 2 0 0 1 4 0" />
        </svg>
      );
    case "hands":
      return (
        <svg {...common}>
          <path d="M6 11V7a2 2 0 0 1 4 0v4" />
          <path d="M10 7V4a2 2 0 0 1 4 0v7" />
          <path d="M14 7a2 2 0 0 1 4 0v9a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5v-3" />
        </svg>
      );
    case "fruit":
      return (
        <svg {...common}>
          <path d="M9 6c-3 1-5 4-5 8 0 3 3 6 8 6s8-3 8-6c0-4-2-7-5-8" />
          <path d="M12 3v5" />
          <path d="M14 4c-1 2-3 3-2 4" />
        </svg>
      );
    case "tree":
      return (
        <svg {...common}>
          <path d="M12 21v-7" />
          <path d="M12 14a5 5 0 0 1-5-5 4 4 0 0 1 5-4 4 4 0 0 1 5 4 5 5 0 0 1-5 5Z" />
        </svg>
      );
    case "rings":
      return (
        <svg {...common}>
          <circle cx="9" cy="13" r="5" />
          <circle cx="15" cy="13" r="5" />
        </svg>
      );
    case "altar":
      return (
        <svg {...common}>
          <path d="M4 20h16" />
          <path d="M7 20V10h10v10" />
          <path d="M9 10V6h6v4" />
          <path d="M11 4h2" />
        </svg>
      );
    case "examen":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 13.5c1 1.2 2.4 1.8 4 1.8s3-.6 4-1.8" />
          <circle cx="9" cy="10" r="0.8" fill="currentColor" />
          <circle cx="15" cy="10" r="0.8" fill="currentColor" />
        </svg>
      );
    case "lament":
      return (
        <svg {...common}>
          <path d="M12 3c2 3 5 5 5 9a5 5 0 0 1-10 0c0-4 3-6 5-9Z" />
          <path d="M12 14v5" />
        </svg>
      );
    case "forgive":
      return (
        <svg {...common}>
          <path d="M4 12c2-4 6-7 8-7s6 3 8 7" />
          <path d="M4 12c2 4 6 7 8 7s6-3 8-7" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case "heal":
      return (
        <svg {...common}>
          <path d="M9 4h6v5h5v6h-5v5H9v-5H4V9h5z" />
        </svg>
      );
    case "rule":
      return (
        <svg {...common}>
          <path d="M4 5h16M4 12h16M4 19h16" />
          <circle cx="7" cy="5" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="13" cy="12" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="17" cy="19" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "sabbath":
      return (
        <svg {...common}>
          <path d="M21 13a8 8 0 1 1-10-10 7 7 0 0 0 10 10Z" />
        </svg>
      );
    case "fast":
      return (
        <svg {...common}>
          <path d="M5 7h14M5 12h14M5 17h14" />
          <path d="M2 2l20 20" strokeWidth={1.4} />
        </svg>
      );
    case "memory":
      return (
        <svg {...common}>
          <path d="M9 4a5 5 0 0 0-5 5v6a5 5 0 0 0 5 5h1v-4H9a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1V4Z" />
          <path d="M15 4a5 5 0 0 1 5 5v6a5 5 0 0 1-5 5h-1v-4h1a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-1V4Z" />
        </svg>
      );
    case "catechism":
      return (
        <svg {...common}>
          <path d="M4 5h7v15H4zM13 5h7v15h-7z" />
          <path d="M11 5v15" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6Z" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
      );
    case "chain":
      return (
        <svg {...common}>
          <path d="M9 12a3 3 0 0 1 0-4l2-2a3 3 0 0 1 4 4l-1 1" />
          <path d="M15 12a3 3 0 0 1 0 4l-2 2a3 3 0 0 1-4-4l1-1" />
        </svg>
      );
    case "lamp":
      return (
        <svg {...common}>
          <path d="M9 3h6v3a3 3 0 0 1-6 0z" />
          <path d="M12 6v8" />
          <path d="M7 14h10v3a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3z" />
        </svg>
      );
    case "wreath":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" strokeDasharray="2 2" />
          <path d="M12 4v3M12 17v3M4 12h3M17 12h3" />
        </svg>
      );
    case "tablet":
      return (
        <svg {...common}>
          <rect x="5" y="3" width="14" height="18" rx="3" />
          <path d="M8 8h8M8 12h8M8 16h6" />
        </svg>
      );
    case "key":
      return (
        <svg {...common}>
          <circle cx="8" cy="12" r="3" />
          <path d="M11 12h10M17 12v3M21 12v2" />
        </svg>
      );
    case "anchor":
      return (
        <svg {...common}>
          <circle cx="12" cy="6" r="2" />
          <path d="M12 8v13M5 16c1.5 3 4 5 7 5s5.5-2 7-5M8 11h8" />
        </svg>
      );
    case "wave":
      return (
        <svg {...common}>
          <path d="M3 12c2 0 2-2 5-2s3 2 5 2 3-2 5-2 3 2 3 2" />
          <path d="M3 17c2 0 2-2 5-2s3 2 5 2 3-2 5-2 3 2 3 2" />
        </svg>
      );
    case "people":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20c0-3.5 3-6 6-6s6 2.5 6 6" />
          <circle cx="17" cy="10" r="2.5" />
          <path d="M14 20c0-2.5 2-4.5 4-4.5s4 2 4 4.5" />
        </svg>
      );
    case "path":
      return (
        <svg {...common}>
          <circle cx="5" cy="6" r="1.4" />
          <circle cx="12" cy="12" r="1.4" />
          <circle cx="19" cy="18" r="1.4" />
          <path d="M5 6c4 0 4 6 7 6s3 6 7 6" />
        </svg>
      );
  }
}
