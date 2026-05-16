import type { JournalEntry } from "@/lib/profile";

/* ──────────────────────────────────────────────────────────────────
   journalThemes — find past journal entries that share themes with
   the current entry (or a given query). Pure on-device: tokenize,
   remove stopwords, score overlap.

   The point: a believer comes back to /secret-place to journal what
   has been weighing on them — and the platform quietly notices, "you
   wrote about your father three times this year, and twice cited
   Ephesians 6." That kind of awareness is what a wise spiritual
   director offers — without surveillance, without an LLM, on-device.
────────────────────────────────────────────────────────────────── */

const STOPWORDS = new Set([
  "the","a","an","and","or","but","of","to","in","for","on","at","by","with",
  "is","am","are","was","were","be","been","being","do","does","did","done",
  "have","has","had","having","i","me","my","mine","you","your","yours",
  "he","she","it","his","her","its","we","us","our","ours","they","them",
  "their","this","that","these","those","so","as","if","not","no","yes",
  "from","into","up","down","out","over","under","than","then","there",
  "here","when","where","what","which","who","whom","whose","why","how",
  "will","would","could","should","may","might","can","cannot","just",
  "very","really","also","too","more","most","much","any","all","some",
  "one","two","three","every","each","such","own","same","only","other",
  "about","because","while","after","before","again","still","now","ever",
  "never","let","like","get","got","go","going","went","come","came",
  "make","made","take","took","know","knew","think","thought","want","wanted",
  "say","said","tell","told","need","needed","feel","felt","see","saw",
  "lord","jesus","god","christ","father","spirit","amen","prayer","pray",
  "prayed","praying","journal","today","day","week","year","time","life",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((t) => t.length >= 4 && !STOPWORDS.has(t));
}

function termFrequency(tokens: string[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const t of tokens) m.set(t, (m.get(t) ?? 0) + 1);
  return m;
}

export type ThemeMatch = {
  entry: JournalEntry;
  score: number;
  sharedTerms: string[];
};

/**
 * Given a current entry (or draft text), return past entries that share
 * meaningful themes. Excludes the entry itself by id.
 */
export function findThematicallySimilar(
  current: { id?: string; body: string; title?: string },
  past: JournalEntry[],
  limit = 3
): ThemeMatch[] {
  const currentText = `${current.title ?? ""} ${current.body}`;
  const currentTokens = tokenize(currentText);
  if (currentTokens.length < 3) return [];

  const currentTF = termFrequency(currentTokens);
  const currentUnique = new Set(currentTokens);

  const scored: ThemeMatch[] = [];
  for (const entry of past) {
    if (entry.id === current.id) continue;
    const tokens = tokenize(`${entry.title ?? ""} ${entry.body}`);
    if (tokens.length < 3) continue;

    const entryTF = termFrequency(tokens);
    let overlap = 0;
    const shared: string[] = [];
    for (const t of entryTF.keys()) {
      if (currentUnique.has(t)) {
        overlap += Math.min(currentTF.get(t) ?? 0, entryTF.get(t) ?? 0);
        shared.push(t);
      }
    }
    if (overlap < 2 || shared.length < 2) continue;

    // Jaccard-ish similarity, weighted by raw overlap
    const union = new Set([...currentUnique, ...entryTF.keys()]);
    const jaccard = shared.length / union.size;
    const score = overlap * (0.5 + jaccard);

    scored.push({ entry, score, sharedTerms: shared.slice(0, 6) });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
}

/** Surface recurring themes across all journal entries (top N by frequency). */
export function recurringThemes(
  entries: JournalEntry[],
  topN = 6
): { term: string; count: number; lastSeen: string }[] {
  const counts = new Map<string, { count: number; lastSeen: string }>();
  for (const e of entries) {
    const seen = new Set<string>();
    for (const t of tokenize(`${e.title ?? ""} ${e.body}`)) {
      if (seen.has(t)) continue;
      seen.add(t);
      const c = counts.get(t);
      if (!c) {
        counts.set(t, { count: 1, lastSeen: e.date });
      } else {
        c.count++;
        if (e.date > c.lastSeen) c.lastSeen = e.date;
      }
    }
  }
  const out = Array.from(counts.entries())
    .filter(([, v]) => v.count >= 2)
    .map(([term, v]) => ({ term, count: v.count, lastSeen: v.lastSeen }));
  out.sort((a, b) => b.count - a.count);
  return out.slice(0, topN);
}
