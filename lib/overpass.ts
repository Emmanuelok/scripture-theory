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

// Each entry is the canonical OSM `denomination=` tag value(s) for that
// tradition. Drawn from OpenStreetMap taginfo (community tag frequency).
// Synonyms are mutually exclusive — no tag value appears in more than one
// list, so picking "Pentecostal" can never return Catholic, and vice versa.
export const DENOMINATION_SYNONYMS: Record<string, string[]> = {
  catholic: [
    "catholic", "roman_catholic", "old_catholic",
  ],
  orthodox: [
    "orthodox", "eastern_orthodox", "greek_orthodox", "russian_orthodox",
    "serbian_orthodox", "romanian_orthodox", "bulgarian_orthodox",
    "georgian_orthodox", "antiochian_orthodox", "ukrainian_orthodox",
    "coptic_orthodox", "ethiopian_orthodox", "eritrean_orthodox",
    "armenian_apostolic", "oriental_orthodox", "syriac_orthodox",
    "indian_orthodox", "malankara_orthodox",
  ],
  anglican: [
    "anglican", "episcopalian", "episcopal", "anglican_communion",
    "church_of_england", "church_in_wales", "scottish_episcopal",
    "church_of_ireland",
  ],
  baptist: [
    "baptist", "southern_baptist", "american_baptist", "national_baptist",
    "general_baptist", "free_baptist", "primitive_baptist",
    "independent_baptist", "missionary_baptist", "reformed_baptist",
    "freewill_baptist", "free_will_baptist",
  ],
  methodist: [
    "methodist", "united_methodist", "free_methodist", "wesleyan",
    "wesleyan_methodist", "african_methodist_episcopal", "ame", "ame_zion",
    "amez", "cme", "global_methodist",
  ],
  lutheran: [
    "lutheran", "evangelical_lutheran", "elca", "lcms", "wels",
    "missouri_synod", "wisconsin_synod", "evangelical_lutheran_in_america",
    "evangelische", "lutheran_church",
  ],
  presbyterian: [
    "presbyterian", "presbyterian_church", "pca", "pcusa", "opc", "epc",
    "cumberland_presbyterian", "free_presbyterian",
  ],
  reformed: [
    "reformed", "dutch_reformed", "christian_reformed", "crc", "rca",
    "united_reformed", "reformed_church", "swiss_reformed", "calvinist",
  ],
  evangelical: [
    "evangelical", "evangelical_christian", "evangelical_free",
    "evangelical_protestant", "evangelical_community",
    "free_evangelical", "evangelical_free_church",
  ],
  pentecostal: [
    "pentecostal", "charismatic", "assemblies_of_god", "assembly_of_god",
    "foursquare", "international_foursquare", "apostolic",
    "united_pentecostal", "pentecostal_holiness", "vineyard",
    "calvary_chapel", "elim", "redeemed_christian_church_of_god",
    "rccg", "deeper_life", "winners_chapel", "mountain_of_fire",
  ],
  nondenominational: [
    "nondenominational", "non_denominational", "non-denominational",
    "independent", "interdenominational", "community_church",
  ],
  adventist: [
    "adventist", "seventh_day_adventist", "seventh-day_adventist",
    "sda",
  ],
  protestant: [
    // "protestant" without further specificity. Kept distinct so users who
    // pick a specific Protestant tradition don't get generic Protestant
    // tags mixed in.
    "protestant",
  ],
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
    const list = DENOMINATION_SYNONYMS[opts.denomination] ?? [opts.denomination];
    // Anchored, case-insensitive, exact match over the union of synonyms.
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
