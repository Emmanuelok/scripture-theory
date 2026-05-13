// Overpass API client — queries the OpenStreetMap dataset for places of
// worship tagged as Christian. OpenStreetMap is community-edited, openly
// licensed (ODbL), and the same data source used by Apple Maps, Wikipedia,
// and most non-Google mapping apps. We never invent church data; we only
// show what real contributors have tagged.

const OVERPASS_ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
];

const USER_AGENT =
  "ScriptureTheory/1.0 (church-finder; +https://scripture-theory.org; mailto:contact@scripture-theory.org)";

export type OsmChurch = {
  id: string;
  osmType: "node" | "way" | "relation";
  name: string | null;
  lat: number;
  lng: number;
  // OSM `denomination` tag, normalized to a friendly label when possible.
  denomination: string | null;
  denominationRaw: string | null;
  address: {
    street?: string;
    housenumber?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
    full?: string;
  };
  website: string | null;
  phone: string | null;
  email: string | null;
  openingHours: string | null;
  wheelchair: string | null;
  serviceTimes: string | null;
};

const DENOM_LABELS: Record<string, string> = {
  catholic: "Roman Catholic",
  roman_catholic: "Roman Catholic",
  orthodox: "Eastern Orthodox",
  greek_orthodox: "Greek Orthodox",
  russian_orthodox: "Russian Orthodox",
  serbian_orthodox: "Serbian Orthodox",
  coptic_orthodox: "Coptic Orthodox",
  ethiopian_orthodox: "Ethiopian Orthodox",
  romanian_orthodox: "Romanian Orthodox",
  oriental_orthodox: "Oriental Orthodox",
  syriac_orthodox: "Syriac Orthodox",
  anglican: "Anglican",
  episcopalian: "Episcopalian",
  episcopal: "Episcopalian",
  baptist: "Baptist",
  southern_baptist: "Southern Baptist",
  methodist: "Methodist",
  united_methodist: "United Methodist",
  lutheran: "Lutheran",
  evangelical_lutheran: "Evangelical Lutheran",
  presbyterian: "Presbyterian",
  reformed: "Reformed",
  evangelical: "Evangelical",
  pentecostal: "Pentecostal",
  charismatic: "Charismatic",
  protestant: "Protestant",
  nondenominational: "Non-denominational",
  non_denominational: "Non-denominational",
  nazarene: "Nazarene",
  adventist: "Seventh-day Adventist",
  seventh_day_adventist: "Seventh-day Adventist",
  mennonite: "Mennonite",
  quaker: "Quaker",
  brethren: "Plymouth Brethren",
  apostolic: "Apostolic",
  vineyard: "Vineyard",
  calvary_chapel: "Calvary Chapel",
  alliance: "Christian & Missionary Alliance",
  church_of_god: "Church of God",
  assembly_of_god: "Assembly of God",
  church_of_christ: "Church of Christ",
  international: "Independent",
};

function tidyDenomination(raw: string | null): string | null {
  if (!raw) return null;
  const key = raw.toLowerCase().replace(/[\s-]+/g, "_");
  return DENOM_LABELS[key] ?? raw.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

type OverpassTags = Record<string, string>;
type OverpassElement = {
  type: "node" | "way" | "relation";
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: OverpassTags;
};

function buildQuery(opts: {
  lat: number;
  lng: number;
  radiusMeters: number;
  denomination?: string | null;
}): string {
  // Some denominations have multiple OSM synonyms — accept any of them.
  const denomFilter = (() => {
    if (!opts.denomination || opts.denomination === "any") return "";
    const synonyms: Record<string, string[]> = {
      catholic: ["catholic", "roman_catholic"],
      orthodox: [
        "orthodox", "greek_orthodox", "russian_orthodox", "serbian_orthodox",
        "coptic_orthodox", "ethiopian_orthodox", "romanian_orthodox",
        "oriental_orthodox", "syriac_orthodox",
      ],
      anglican: ["anglican", "episcopalian", "episcopal"],
      baptist: ["baptist", "southern_baptist"],
      methodist: ["methodist", "united_methodist", "free_methodist"],
      lutheran: ["lutheran", "evangelical_lutheran"],
      presbyterian: ["presbyterian"],
      reformed: ["reformed"],
      evangelical: ["evangelical"],
      pentecostal: ["pentecostal", "charismatic", "assembly_of_god", "church_of_god"],
      nondenominational: ["nondenominational", "non_denominational"],
      adventist: ["adventist", "seventh_day_adventist"],
      protestant: ["protestant"],
    };
    const list = synonyms[opts.denomination] ?? [opts.denomination];
    const re = `^(${list.join("|")})$`;
    return `["denomination"~"${re}",i]`;
  })();

  return `
[out:json][timeout:25];
(
  node["amenity"="place_of_worship"]["religion"="christian"]${denomFilter}(around:${opts.radiusMeters},${opts.lat},${opts.lng});
  way["amenity"="place_of_worship"]["religion"="christian"]${denomFilter}(around:${opts.radiusMeters},${opts.lat},${opts.lng});
  relation["amenity"="place_of_worship"]["religion"="christian"]${denomFilter}(around:${opts.radiusMeters},${opts.lat},${opts.lng});
);
out tags center 200;
`.trim();
}

function parseElement(el: OverpassElement): OsmChurch | null {
  const lat = el.lat ?? el.center?.lat;
  const lng = el.lon ?? el.center?.lon;
  if (lat === undefined || lng === undefined) return null;
  const tags = el.tags ?? {};
  const denomRaw = tags["denomination"] ?? null;
  return {
    id: `${el.type}/${el.id}`,
    osmType: el.type,
    name: tags["name"] ?? tags["name:en"] ?? null,
    lat,
    lng,
    denomination: tidyDenomination(denomRaw),
    denominationRaw: denomRaw,
    address: {
      housenumber: tags["addr:housenumber"],
      street: tags["addr:street"],
      city: tags["addr:city"],
      state: tags["addr:state"],
      postcode: tags["addr:postcode"],
      country: tags["addr:country"],
      full: tags["addr:full"],
    },
    website: tags["website"] ?? tags["contact:website"] ?? tags["url"] ?? null,
    phone: tags["phone"] ?? tags["contact:phone"] ?? null,
    email: tags["email"] ?? tags["contact:email"] ?? null,
    openingHours: tags["opening_hours"] ?? null,
    wheelchair: tags["wheelchair"] ?? null,
    serviceTimes: tags["service_times"] ?? null,
  };
}

export async function searchChurches(opts: {
  lat: number;
  lng: number;
  radiusMeters: number;
  denomination?: string | null;
}): Promise<OsmChurch[]> {
  const query = buildQuery(opts);
  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": USER_AGENT,
          Accept: "application/json",
        },
        body: `data=${encodeURIComponent(query)}`,
        // Cache per (lat, lng, radius, denomination) for 24h server-side.
        next: { revalidate: 86400, tags: [`overpass:${opts.lat}:${opts.lng}:${opts.radiusMeters}:${opts.denomination ?? ""}`] },
      });
      if (!res.ok) continue;
      const json = (await res.json()) as { elements?: OverpassElement[] };
      const elements = json.elements ?? [];
      const churches = elements
        .map(parseElement)
        .filter((c): c is OsmChurch => c !== null);
      return churches;
    } catch {
      // try next mirror
    }
  }
  throw new Error("All Overpass mirrors are unreachable");
}
