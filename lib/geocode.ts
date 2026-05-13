// Nominatim geocoder — converts a place name typed by the user into
// (lat, lng). Nominatim is the open-source geocoder used by OpenStreetMap
// itself. Per their usage policy we identify ourselves and cap calls.

const NOMINATIM = "https://nominatim.openstreetmap.org/search";
const USER_AGENT =
  "ScriptureTheory/1.0 (church-finder; +https://scripture-theory.org; mailto:contact@scripture-theory.org)";

export type GeocodeResult = {
  displayName: string;
  lat: number;
  lng: number;
  type: string;
  importance: number;
};

export async function geocode(q: string, limit = 5): Promise<GeocodeResult[]> {
  const url = `${NOMINATIM}?q=${encodeURIComponent(q)}&format=json&addressdetails=0&limit=${limit}`;
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "application/json",
        "Accept-Language": "en",
      },
      next: { revalidate: 86400, tags: [`nominatim:${q.toLowerCase()}`] },
    });
    if (!res.ok) return [];
    const arr = (await res.json()) as Array<{
      display_name: string;
      lat: string;
      lon: string;
      type?: string;
      importance?: number;
    }>;
    return arr.map((r) => ({
      displayName: r.display_name,
      lat: parseFloat(r.lat),
      lng: parseFloat(r.lon),
      type: r.type ?? "",
      importance: r.importance ?? 0,
    }));
  } catch {
    return [];
  }
}
