import { describe, expect, it } from "vitest";
import {
  publicApiTranslations,
  translationOrder,
  translations,
  translationSupportsTestament,
} from "@/data/bible/translations";
import { canon } from "@/data/bible/canon";
import { BIBLE_API_BOOK_ID, parseEsvVerses } from "@/lib/bible-fetch";

describe("Bible translation registry", () => {
  it("catalogues 21 unique, internally consistent editions", () => {
    expect(translationOrder).toHaveLength(21);
    expect(new Set(translationOrder).size).toBe(translationOrder.length);

    for (const id of translationOrder) {
      expect(translations[id].id).toBe(id);
      expect(translations[id].bcp47).toBeTruthy();
      expect(() => new Intl.Locale(translations[id].bcp47)).not.toThrow();
    }
  });

  it("connects every public runtime edition to a unique provider id", () => {
    expect(publicApiTranslations).toHaveLength(15);
    const apiIds = publicApiTranslations.map((id) => translations[id].apiId);
    expect(apiIds.every(Boolean)).toBe(true);
    expect(new Set(apiIds).size).toBe(apiIds.length);
    expect(translations.DRA.apiId).toBe("dra");
    expect(translations.SYNODAL.provider).toBe("bundled");
    expect(translations.VULGATE.provider).toBe("bundled");
  });

  it("maps every canonical book to one unique structured API id", () => {
    const ids = canon.map((book) => BIBLE_API_BOOK_ID[book.id]);
    expect(ids.every(Boolean)).toBe(true);
    expect(new Set(ids).size).toBe(canon.length);
  });

  it("does not advertise New-Testament-only editions for Old Testament books", () => {
    for (const id of ["YLT", "CHEROKEE"] as const) {
      expect(translationSupportsTestament(id, "OT")).toBe(false);
      expect(translationSupportsTestament(id, "NT")).toBe(true);
    }
    expect(translationSupportsTestament("WEB", "OT")).toBe(true);
    expect(translationSupportsTestament("WEB", "NT")).toBe(true);
  });

  it("keeps selected-passage editions out of runtime coverage promises", () => {
    for (const id of [
      "RVR1909",
      "LSG",
      "LUT1912",
      "SYNODAL",
      "VULGATE",
    ] as const) {
      expect(translationSupportsTestament(id, "OT")).toBe(false);
      expect(translationSupportsTestament(id, "NT")).toBe(false);
    }
  });
});

describe("ESV plain-text parser", () => {
  it("turns Crossway verse markers into normalized rows", () => {
    const text = `John 3\n\n[1]  Now there was a man\n    of the Pharisees.\n[2] This man came to Jesus by night. (ESV)`;
    expect(parseEsvVerses(text)).toEqual([
      { v: 1, t: "Now there was a man of the Pharisees." },
      { v: 2, t: "This man came to Jesus by night." },
    ]);
  });

  it("returns an empty list for a malformed upstream body", () => {
    expect(parseEsvVerses("temporarily unavailable")).toEqual([]);
  });
});
