import { passages } from "@/data/lens";
import { readingPlans } from "@/data/readings";
import { lordsPrayer, acts, worldPrayer } from "@/data/prayers";
import { gospelMovements } from "@/data/gospel";
import { testimonies } from "@/data/testimonies";
import { canon } from "@/data/bible/canon";
import { seedChaptersOf, getChapterSync } from "@/lib/bible";
import { GLOSSARY } from "@/data/resources/glossary";
import { TOPICS } from "@/data/resources/topics";
import { CREEDS } from "@/data/resources/creeds";
import { DISCIPLINES } from "@/data/resources/disciplines";
import { apologetics, topicInfo as apolTopicInfo } from "@/data/apologetics";
import { hymns } from "@/data/hymns";
import { STAGES as PATH_STAGES } from "@/data/path";
import { TRACK } from "@/data/courseTrack";

export type SearchKind =
  | "scripture"
  | "bible"
  | "plan"
  | "prayer"
  | "gospel"
  | "testimony"
  | "glossary"
  | "topical"
  | "creed"
  | "catechism"
  | "apologetic"
  | "hymn"
  | "discipline"
  | "path"
  | "course";

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
  gospel: "The Gospel",
  testimony: "Testimony",
  glossary: "Glossary",
  topical: "Topical",
  creed: "Creed",
  catechism: "Catechism",
  apologetic: "Apologetics",
  hymn: "Hymn",
  discipline: "Discipline",
  path: "The Path",
  course: "Foundations course",
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

  // Glossary
  for (const g of GLOSSARY) {
    items.push({
      kind: "glossary",
      title: g.word,
      subtitle: g.short,
      snippet: g.long,
      href: `/resources/glossary#letter-${g.word[0]?.toUpperCase() ?? "A"}`,
      weight: 3,
      hay: `${g.word} ${g.short} ${g.long} ${(g.refs ?? []).join(" ")}`.toLowerCase(),
    });
  }

  // Topical index
  for (const t of TOPICS) {
    items.push({
      kind: "topical",
      title: t.title,
      subtitle: `${t.category} · ${t.verses.length} verses`,
      snippet: t.blurb,
      href: `/resources/topical-index`,
      weight: 3,
      hay: `${t.title} ${t.category} ${t.blurb} ${t.verses.map((v) => `${v.ref} ${v.text}`).join(" ")}`.toLowerCase(),
    });
  }

  // Creeds
  for (const c of CREEDS) {
    items.push({
      kind: "creed",
      title: c.name,
      subtitle: `${c.era} · ${c.origin}`,
      snippet: c.why,
      href: `/resources/creeds#${c.slug}`,
      weight: 4,
      hay: `${c.name} ${c.era} ${c.origin} ${c.why} ${c.text}`.toLowerCase(),
    });
  }

  // Disciplines
  for (const d of DISCIPLINES) {
    items.push({
      kind: "discipline",
      title: d.name,
      subtitle: d.oneLine,
      snippet: d.why,
      href: `/resources/disciplines`,
      weight: 3,
      hay: `${d.name} ${d.oneLine} ${d.why} ${d.start.join(" ")} ${d.scriptures.map((s) => `${s.ref} ${s.text}`).join(" ")}`.toLowerCase(),
    });
  }

  // Apologetics
  for (const a of apologetics) {
    const topicLabel = apolTopicInfo[a.topic]?.label ?? a.topic;
    items.push({
      kind: "apologetic",
      title: a.question,
      subtitle: topicLabel,
      snippet: a.oneLine,
      href: `/apologetics`,
      weight: 3,
      hay: `${a.question} ${a.oneLine} ${a.answer.join(" ")} ${a.scripture.join(" ")} ${topicLabel}`.toLowerCase(),
    });
  }

  // Hymns
  for (const h of hymns) {
    items.push({
      kind: "hymn",
      title: h.title,
      subtitle: `${h.author} · ${h.year}`,
      snippet: h.verses[0] ?? "",
      href: `/hymns`,
      weight: 2,
      hay: `${h.title} ${h.author} ${h.year} ${h.category} ${h.verses.join(" ")} ${h.refrain ?? ""} ${h.scriptures.join(" ")}`.toLowerCase(),
    });
  }

  // All courses in the growth tract (Foundations, Story of God,
  // Disciplines, Sermon on the Mount, and any future course).
  // Foundations keeps its /course/* URLs for backward compat; every
  // other course uses /track/[slug]/*.
  for (const tc of TRACK) {
    const isFoundations = tc.id === "foundations";
    const weekHref = (week: number) =>
      isFoundations ? `/course/week/${week}` : `/track/${tc.slug}/week/${week}`;

    for (const w of tc.data) {
      // Week overview
      items.push({
        kind: "course",
        title: `Week ${w.week} · ${w.title}`,
        subtitle: `${tc.title} · ${w.scripture.ref}`,
        snippet: w.tagline,
        href: weekHref(w.week),
        weight: 5,
        hay: `${tc.title} ${tc.id} week ${w.week} ${w.title} ${w.tagline} ${w.scripture.ref} ${w.scripture.text} ${w.memoryVerse.ref} ${w.memoryVerse.text} ${w.practice} ${w.journalPrompt} ${w.lesson.join(" ")} ${w.reflection.join(" ")} ${w.discussion.join(" ")}`.toLowerCase(),
      });
      // Memory verse
      items.push({
        kind: "course",
        title: `Memory · ${w.memoryVerse.ref}`,
        subtitle: `${tc.title} Week ${w.week} · ${w.title}`,
        snippet: w.memoryVerse.text,
        href: `${weekHref(w.week)}#memory`,
        weight: 4,
        hay: `memory verse ${tc.title} ${tc.id} week ${w.week} ${w.memoryVerse.ref} ${w.memoryVerse.text}`.toLowerCase(),
      });
      // Witnesses
      for (const wit of w.witnesses) {
        items.push({
          kind: "course",
          title: `${wit.who} on ${w.title}`,
          subtitle: `${tc.title} · Week ${w.week} · ${wit.when}`,
          snippet: wit.quote,
          href: `${weekHref(w.week)}#witnesses`,
          weight: 2,
          hay: `${wit.who} ${wit.when} ${wit.quote} ${wit.source ?? ""} ${tc.title} ${tc.id} week ${w.week} ${w.title}`.toLowerCase(),
        });
      }
      // Tradition voices
      if (w.traditions) {
        for (const tr of w.traditions) {
          items.push({
            kind: "course",
            title: `${tr.tradition} · ${w.title}`,
            subtitle: `${tc.title} · Week ${w.week} · traditions`,
            snippet: tr.voice,
            href: `${weekHref(w.week)}#traditions`,
            weight: 2,
            hay: `${tr.tradition} ${tr.voice} ${tc.title} ${tc.id} week ${w.week} ${w.title}`.toLowerCase(),
          });
        }
      }
      // Daily steps
      for (const d of w.days) {
        items.push({
          kind: "course",
          title: `Day ${d.day} · ${d.title}`,
          subtitle: `${tc.title} · Week ${w.week} · ${d.passage}`,
          snippet: d.meditation,
          href: `${weekHref(w.week)}#days`,
          weight: 1,
          hay: `day ${d.day} ${d.label} ${d.title} ${d.passage} ${d.meditation} ${tc.title} ${tc.id} week ${w.week} ${w.title}`.toLowerCase(),
        });
      }
    }
  }

  // The Path stages
  for (const s of PATH_STAGES) {
    items.push({
      kind: "path",
      title: `Stage ${s.stage} · ${s.name}`,
      subtitle: s.scripture,
      snippet: s.focus,
      href: "/disciple",
      weight: 3,
      hay: `stage ${s.stage} ${s.name} ${s.scripture} ${s.focus} ${s.observable} ${s.nextStep} ${s.kind}`.toLowerCase(),
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

export function search(q: string, limit = 40): SearchResult[] {
  const query = q.trim();
  if (!query) return [];
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];
  const fullLower = query.toLowerCase();

  const index = buildIndex();
  const scored = index
    .map((item) => {
      let hits = 0;
      for (const token of tokens) {
        if (item.hay.includes(token)) hits++;
      }
      if (hits === 0) return null;
      let score = hits * 10 + item.weight;
      if (item.title.toLowerCase().includes(fullLower)) score += 30;
      if (item.subtitle.toLowerCase().includes(fullLower)) score += 10;
      if (item.hay.includes(fullLower)) score += 5;
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

export function quickStats(): Record<SearchKind, number> {
  const index = buildIndex();
  const counts = {
    scripture: 0,
    bible: 0,
    plan: 0,
    prayer: 0,
    gospel: 0,
    testimony: 0,
    glossary: 0,
    topical: 0,
    creed: 0,
    catechism: 0,
    apologetic: 0,
    hymn: 0,
    discipline: 0,
    path: 0,
    course: 0,
  } as Record<SearchKind, number>;
  for (const item of index) counts[item.kind]++;
  return counts;
}
