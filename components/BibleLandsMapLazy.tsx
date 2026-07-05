"use client";

import dynamic from "next/dynamic";

// Client wrapper so the atlas (a server component) can ship the d3-geo /
// topojson map lazily and client-only, keeping it out of the initial bundle.
const BibleLandsMap = dynamic(() => import("@/components/BibleLandsMap"), {
  ssr: false,
  loading: () => (
    <div className="aspect-[16/9] w-full animate-pulse rounded-3xl bg-ink-100" aria-hidden />
  ),
});

export default function BibleLandsMapLazy() {
  return <BibleLandsMap />;
}
