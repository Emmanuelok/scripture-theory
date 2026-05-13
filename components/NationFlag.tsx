"use client";

import { useState } from "react";
import {
  flagEmoji,
  flagSvgUrl,
  flagSvgFallbackUrl,
  flagPngFallbackUrl,
  type FlagWidth,
} from "@/lib/flags";

type Props = {
  iso: string;
  alt?: string;
  width?: FlagWidth;
  className?: string;
  cover?: boolean; // when true, fills container with object-cover
};

// Renders a country flag with a graceful fallback chain:
//   flagcdn SVG → jsdelivr SVG → flagcdn PNG → emoji block
export default function NationFlag({
  iso,
  alt,
  width = 640,
  className = "",
  cover = true,
}: Props) {
  const [stage, setStage] = useState<"primary" | "secondary" | "tertiary" | "emoji">("primary");

  if (!iso || iso.length !== 2) {
    return (
      <span
        role="img"
        aria-label={alt ?? "flag"}
        className={`inline-flex items-center justify-center text-6xl ${className}`}
      >
        🏳️
      </span>
    );
  }

  const isoLower = iso.toLowerCase();
  const altText = alt ?? `Flag of ${iso.toUpperCase()}`;

  if (stage === "emoji") {
    // Last resort: render the unicode flag emoji as a centered glyph filling
    // the container with a neutral backdrop so it still looks intentional.
    return (
      <span
        role="img"
        aria-label={altText}
        className={`flex items-center justify-center bg-ink-100 text-7xl md:text-8xl ${className}`}
      >
        {flagEmoji(iso)}
      </span>
    );
  }

  const src =
    stage === "primary"
      ? flagSvgUrl(iso, width)
      : stage === "secondary"
        ? flagSvgFallbackUrl(iso)
        : flagPngFallbackUrl(iso, width);

  return (
    <img
      key={`${isoLower}-${stage}`}
      src={src}
      alt={altText}
      loading="lazy"
      decoding="async"
      className={`${cover ? "object-cover" : "object-contain"} ${className}`}
      onError={() => {
        if (stage === "primary") setStage("secondary");
        else if (stage === "secondary") setStage("tertiary");
        else setStage("emoji");
      }}
    />
  );
}
