// Country flag helpers.
//
// Strategy:
//  - flagEmoji(iso) returns the Unicode regional-indicator flag emoji
//    (e.g., "NG" -> 🇳🇬). Works offline, in every modern browser/OS,
//    perfect for lists, share text, fallbacks.
//  - flagSvgUrl(iso, width) returns a crisp SVG flag served by flagcdn.com,
//    a free, no-key CDN of public-domain country flags. Used in the
//    hero. Wrap an <img> with onError fallback to the emoji.

export function flagEmoji(iso: string): string {
  if (!iso || iso.length !== 2) return "🏳️";
  const codes = iso
    .toUpperCase()
    .split("")
    .map((c) => 127397 + c.charCodeAt(0));
  return String.fromCodePoint(...codes);
}

export type FlagWidth = 40 | 80 | 160 | 320 | 640 | 1280 | 2560;

export function flagSvgUrl(iso: string, width: FlagWidth = 320): string {
  return `https://flagcdn.com/w${width}/${iso.toLowerCase()}.svg`;
}
