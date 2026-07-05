import { describe, it, expect } from "vitest";
import { canon, getBook, oldTestament, newTestament } from "@/data/bible/canon";
import { memoryVerses } from "@/data/memory";
import { GLOSSARY } from "@/data/resources/glossary";
import { TOPICS } from "@/data/resources/topics";

describe("bible canon", () => {
  it("is the 66-book Protestant canon", () => {
    expect(canon).toHaveLength(66);
    expect(oldTestament.length + newTestament.length).toBe(66);
  });
  it("every book has a positive chapter count and unique id", () => {
    const ids = new Set<string>();
    for (const b of canon) {
      expect(b.chapters).toBeGreaterThanOrEqual(1);
      expect(ids.has(b.id)).toBe(false);
      ids.add(b.id);
    }
  });
  it("getBook resolves a known slug and rejects an unknown one", () => {
    expect(getBook("john")?.name).toBe("John");
    expect(getBook("not-a-book")).toBeUndefined();
  });
});

describe("memory verses", () => {
  it("have unique ids", () => {
    const ids = memoryVerses.map((v) => v.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("glossary cross-references", () => {
  it("every `related` slug resolves to a real entry", () => {
    const slugs = new Set(GLOSSARY.map((t) => t.slug));
    const dangling: string[] = [];
    for (const t of GLOSSARY) {
      for (const r of t.related ?? []) if (!slugs.has(r)) dangling.push(`${t.slug} -> ${r}`);
    }
    expect(dangling).toEqual([]);
  });
  it("has unique slugs", () => {
    const slugs = GLOSSARY.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("topical index cross-references", () => {
  it("every `cross` slug resolves to a real topic", () => {
    const slugs = new Set(TOPICS.map((t) => t.slug));
    const dangling: string[] = [];
    for (const t of TOPICS) {
      for (const c of t.cross ?? []) if (!slugs.has(c)) dangling.push(`${t.slug} -> ${c}`);
    }
    expect(dangling).toEqual([]);
  });
});
