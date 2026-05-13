// Country flag helpers.
//
// We use multiple sources so flags always render even if one CDN has a
// hiccup or is blocked by a corporate firewall:
//
//   1. flagcdn.com  — fast, slim SVG public-domain flags
//   2. jsdelivr serving the MIT-licensed lipis/flag-icons package
//   3. Wikimedia Commons direct PNG (per-country mapping)
//   4. Unicode regional-indicator emoji (always works, browser-native)
//
// The <NationFlag> component cascades through these on error.

export function flagEmoji(iso: string): string {
  if (!iso || iso.length !== 2) return "🏳️";
  const codes = iso
    .toUpperCase()
    .split("")
    .map((c) => 127397 + c.charCodeAt(0));
  return String.fromCodePoint(...codes);
}

export type FlagWidth = 40 | 80 | 160 | 320 | 640 | 1280 | 2560;

// Primary: flagcdn.com — width-controlled SVG
export function flagSvgUrl(iso: string, width: FlagWidth = 320): string {
  return `https://flagcdn.com/w${width}/${iso.toLowerCase()}.svg`;
}

// Fallback: jsDelivr CDN serving the MIT-licensed flag-icons package
export function flagSvgFallbackUrl(iso: string): string {
  return `https://cdn.jsdelivr.net/npm/flag-icons@7.2.3/flags/4x3/${iso.toLowerCase()}.svg`;
}

// Last-resort raster fallback served by flagcdn (PNG is more universally
// supported than SVG on a few older devices).
export function flagPngFallbackUrl(iso: string, width: FlagWidth = 640): string {
  return `https://flagcdn.com/w${width}/${iso.toLowerCase()}.png`;
}
