import { passages } from "@/data/lens";
import { readingPlans } from "@/data/readings";
import { lordsPrayer, acts, worldPrayer } from "@/data/prayers";
import { churches, cities, traditionLabels } from "@/data/churches";
import { gospelMovements } from "@/data/gospel";
import { testimonies } from "@/data/testimonies";
import { canon } from "@/data/bible/canon";
import { seedChaptersOf, getChapterSync } from "@/lib/bible";

export type SearchKind =
  | "scripture"
  | "bible"
  | "plan"
  | "prayer"
  | "church"
  | "gospel"
  | "testimony";

export type SearchResult = {
  kind: SearchKind;
  title: string;
  subtitle: string;
  snippet: string;
  href: string;
  weight: number;
};

const KIND_LABEL: Record<SearchKind, string> = {
  scripture: "Verse Lens",
  bible: "Bible (WEB)",
  plan: "Reading plan",
  prayer: "Prayer",
  church: "Church",
  gospel: "The Gospel",
  testimony: "Testimony",
};

export function searchKindLabel(k: SearchKind) {
  return KIND_LABEL[k];
}

type Indexed = SearchResult & { hay: string };

let CACHE: Indexed[] | null = null;

function buildIndex(): Indexed[] {
  if (CACHE) return CACHE;

  const items: Indexed[] = [];

  // Scripture (Lens passages)
  for (const p of passages) {
    items.push({
      kind: "scripture",
      title: p.reference,
      subtitle: p.translation,
      snippet: p.text,
      href: "/lens",
      weight: 5,
      hay: [
        p.reference,
        p.text,
        p.context,
        p.literal,
        p.christCentered,
        p.agreement,
        p.disagreement,
        ...p.readings.flatMap((r) => [r.label, r.emphasis, r.reading, ...r.voices]),
      ]
        .join(" \n ")
        .toLowerCase(),
    });
  }

  // Reading plans
  for (const plan of readingPlans) {
    items.push({
      kind: "plan",
      title: plan.name,
      subtitle: plan.tagline,
      snippet: plan.description,
      href: "/read",
      weight: 4,
      hay: `${plan.name} ${plan.tagline} ${plan.description}`.toLowerCase(),
    });
    for (const day of plan.days) {
      items.push({
        kind: "plan",
        title: `${plan.name} · Day ${day.day} — ${day.reference}`,
        subtitle: day.title,
        snippet: day.meditation,
        href: "/read",
        weight: 2,
        hay: `${plan.name} day ${day.day} ${day.reference} ${day.title} ${day.meditation}`.toLowerCase(),
      });
    }
  }

  // Lord's Prayer lines
  for (const line of lordsPrayer) {
    items.push({
      kind: "prayer",
      title: "The Lord's Prayer",
      subtitle: line.phrase,
      snippet: line.meditation,
      href: "/pray",
      weight: 3,
      hay: `lords prayer ${line.phrase} ${line.meditation} ${line.prompt}`.toLowerCase(),
    });
  }

  // ACTS
  for (const m of acts) {
    items.push({
      kind: "prayer",
      title: `ACTS · ${m.word}`,
      subtitle: m.scripture,
      snippet: m.body,
      href: "/pray",
      weight: 2,
      hay: `acts ${m.letter} ${m.word} ${m.body} ${m.scripture} ${m.reference}`.toLowerCase(),
    });
  }

  // World prayer regions
  for (const r of worldPrayer) {
    items.push({
      kind: "prayer",
      title: `Pray for ${r.region}`,
      subtitle: r.focus,
      snippet: r.pray.join(" · "),
      href: "/pray",
      weight: 2,
      hay: `${r.region} ${r.focus} ${r.pray.join(" ")}`.toLowerCase(),
    });
  }

  // Churches
  for (const c of churches) {
    const city = cities[c.city];
    const tradition = traditionLabels[c.tradition];
    items.push({
      kind: "church",
      title: c.name,
      subtitle: `${tradition} · ${c.neighborhood}, ${city.label}`,
      snippet: c.discipleship,
      href: "/connect",
      weight: 3,
      hay: `${c.name} ${c.neighborhood} ${city.label} ${city.country} ${tradition} ${c.languages.join(" ")} ${c.discipleship}`.toLowerCase(),
    });
  }

  // Gospel movements
  for (const m of gospelMovements) {
    items.push({
      kind: "gospel",
      title: `${m.title} — ${m.subtitle}`,
      subtitle: m.reference,
      snippet: m.body,
      href: "/gospel",
      weight: 5,
      hay: `${m.title} ${m.subtitle} ${m.scripture} ${m.reference} ${m.body} ${m.echoes.join(" ")}`.toLowerCase(),
    });
  }

  // Loaded Bible chapters (seed + any ingested)
  for (const book of canon) {
    for (const ch of seedChaptersOf(book.id)) {
      const chapter = getChapterSync(book.id, ch);
      if (!chapter) continue;
      const fullText = chapter.verses.map((v) => `${v.v} ${v.t}`).join(" ");
      const preview = chapter.verses.slice(0, 2).map((v) => v.t).join(" ");
      items.push({
        kind: "bible",
        title: `${book.name} ${ch}`,
        subtitle: `WEB · ${chapter.verses.length} verses`,
        snippet: preview,
        href: `/bible/${book.id}/${ch}`,
        weight: 6,
        hay: `${book.name} ${book.abbrev} ${ch} ${fullText}`.toLowerCase(),
      });
    }
  }

  // Testimonies
  for (const t of testimonies) {
    items.push({
      kind: "testimony",
      title: `${t.name} · ${t.place}`,
      subtitle: t.verse,
      snippet: `${t.before} — ${t.encounter} — ${t.now}`,
      href: "/witness",
      weight: 2,
      hay: `${t.name} ${t.place} ${t.verse} ${t.before} ${t.encounter} ${t.now}`.toLowerCase(),
    });
  }

  CACHE = items;
  return items;
}

function tokenize(q: string): string[] {
  return q
    .toLowerCase()
    .replace(/[^\p{L}\p{N}:\s]/gu, " ")
    .split(/\s+/)
    .filter((t) => t.length >= 2);
}

export function search(q: string, limit = 30): SearchResult[] {
  const query = q.trim();
  if (!query) return [];
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const index = buildIndex();
  const scored = index
    .map((item) => {
      let hits = 0;
      for (const token of tokens) {
        if (item.hay.includes(token)) hits++;
      }
      if (hits === 0) return null;
      const score = hits * 10 + item.weight + (item.title.toLowerCase().includes(query.toLowerCase()) ? 20 : 0);
      return { item, score };
    })
    .filter(Boolean) as { item: Indexed; score: number }[];

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(({ item }) => {
    const { hay, ...rest } = item;
    void hay;
    return rest;
  });
}

export function quickStats() {
  const index = buildIndex();
  const counts: Record<SearchKind, number> = {
    scripture: 0,
    bible: 0,
    plan: 0,
    prayer: 0,
    church: 0,
    gospel: 0,
    testimony: 0,
  };
  for (const item of index) counts[item.kind]++;
  return counts;
}
