import type { MetadataRoute } from "next";
import { canon } from "@/data/bible/canon";

/**
 * Sitemap for Scripture Theory.
 *
 * We list every stable, public, non-personal route. Pages that depend on
 * on-device state (e.g. /me, /account, /bible/my) are intentionally
 * deprioritized — they're useful but not landing-page-worthy.
 *
 * Dynamic routes: a chapter URL is generated for every chapter of every
 * book in the canon (Genesis 1 through Revelation 22).
 */

const BASE =
  (process.env.NEXT_PUBLIC_SITE_URL ?? "https://scripture-theory.vercel.app").replace(
    /\/$/,
    "",
  );

const STATIC_ROUTES: { path: string; priority: number; changefreq: "daily" | "weekly" | "monthly" | "yearly" }[] = [
  // Top-of-funnel
  { path: "/",                priority: 1.0, changefreq: "daily" },
  { path: "/today",           priority: 0.9, changefreq: "daily" },
  { path: "/gospel",          priority: 1.0, changefreq: "monthly" },
  { path: "/jesus",           priority: 1.0, changefreq: "monthly" },
  { path: "/new-believer",    priority: 0.9, changefreq: "monthly" },
  { path: "/start",           priority: 0.8, changefreq: "monthly" },

  // Reading & memory
  { path: "/bible",           priority: 0.9, changefreq: "weekly" },
  { path: "/bible/translations", priority: 0.7, changefreq: "monthly" },
  { path: "/read",            priority: 0.7, changefreq: "weekly" },
  { path: "/memory",          priority: 0.7, changefreq: "weekly" },
  { path: "/devotional",      priority: 0.7, changefreq: "daily" },
  { path: "/listen",          priority: 0.6, changefreq: "weekly" },

  // Prayer
  { path: "/pray",            priority: 0.8, changefreq: "weekly" },
  { path: "/pray/live",       priority: 0.7, changefreq: "weekly" },
  { path: "/pray/nations",    priority: 0.8, changefreq: "daily" },
  { path: "/pray/wall",       priority: 0.6, changefreq: "weekly" },
  { path: "/persecuted",      priority: 0.7, changefreq: "weekly" },

  // Discipleship & courses
  { path: "/course",          priority: 0.8, changefreq: "monthly" },
  { path: "/track",           priority: 0.7, changefreq: "monthly" },
  { path: "/disciple",        priority: 0.7, changefreq: "monthly" },
  { path: "/disciple/journey",priority: 0.6, changefreq: "monthly" },

  // Practices
  { path: "/practices",       priority: 0.7, changefreq: "monthly" },
  { path: "/secret-place",    priority: 0.7, changefreq: "monthly" },
  { path: "/family",          priority: 0.7, changefreq: "monthly" },
  { path: "/kids",            priority: 0.7, changefreq: "monthly" },
  { path: "/examen",          priority: 0.6, changefreq: "monthly" },
  { path: "/hours",           priority: 0.6, changefreq: "monthly" },
  { path: "/communion",       priority: 0.6, changefreq: "monthly" },
  { path: "/sabbath",         priority: 0.6, changefreq: "monthly" },
  { path: "/sabbath/letter",  priority: 0.5, changefreq: "weekly" },
  { path: "/fast",            priority: 0.6, changefreq: "monthly" },
  { path: "/forgive",         priority: 0.6, changefreq: "monthly" },
  { path: "/heal",            priority: 0.6, changefreq: "monthly" },
  { path: "/lament",          priority: 0.6, changefreq: "monthly" },
  { path: "/fruit",           priority: 0.5, changefreq: "monthly" },
  { path: "/gifts",           priority: 0.5, changefreq: "monthly" },
  { path: "/rule",            priority: 0.5, changefreq: "monthly" },
  { path: "/calendar",        priority: 0.6, changefreq: "monthly" },

  // Mission
  { path: "/witness",         priority: 0.7, changefreq: "weekly" },
  { path: "/sending",         priority: 0.9, changefreq: "weekly" },
  { path: "/sending/begin",   priority: 0.8, changefreq: "monthly" },
  { path: "/connect",         priority: 0.7, changefreq: "monthly" },
  { path: "/give",            priority: 0.6, changefreq: "monthly" },
  { path: "/vocation",        priority: 0.6, changefreq: "monthly" },
  { path: "/calling",         priority: 0.6, changefreq: "monthly" },
  { path: "/marriage",        priority: 0.6, changefreq: "monthly" },
  { path: "/parenting",       priority: 0.6, changefreq: "monthly" },

  // Resources
  { path: "/resources",       priority: 0.8, changefreq: "monthly" },
  { path: "/resources/topical-index", priority: 0.7, changefreq: "monthly" },
  { path: "/resources/creeds",      priority: 0.7, changefreq: "monthly" },
  { path: "/resources/glossary",    priority: 0.7, changefreq: "monthly" },
  { path: "/resources/disciplines", priority: 0.6, changefreq: "monthly" },
  { path: "/hymns",           priority: 0.6, changefreq: "monthly" },
  { path: "/atlas",           priority: 0.6, changefreq: "yearly" },
  { path: "/timeline",        priority: 0.6, changefreq: "yearly" },
  { path: "/figures",         priority: 0.7, changefreq: "monthly" },
  { path: "/apologetics",     priority: 0.6, changefreq: "monthly" },

  // Themed Scripture pages
  { path: "/beatitudes",      priority: 0.6, changefreq: "yearly" },
  { path: "/armor",           priority: 0.6, changefreq: "yearly" },
  { path: "/seven-words",     priority: 0.6, changefreq: "yearly" },
  { path: "/apostles",        priority: 0.6, changefreq: "yearly" },

  // Trust & meta
  { path: "/about",           priority: 0.6, changefreq: "yearly" },
  { path: "/beliefs",         priority: 0.7, changefreq: "yearly" },
  { path: "/privacy",         priority: 0.6, changefreq: "yearly" },
  { path: "/accessibility",   priority: 0.4, changefreq: "yearly" },
  { path: "/help",            priority: 0.4, changefreq: "monthly" },
  { path: "/roadmap",         priority: 0.4, changefreq: "monthly" },
  { path: "/whats-new",       priority: 0.4, changefreq: "weekly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changefreq,
    priority: r.priority,
  }));

  // Per-book index pages.
  const bookEntries: MetadataRoute.Sitemap = canon.map((b) => ({
    url: `${BASE}/bible/${b.id}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  // Every chapter of every book — the bulk of the platform's evangelistic
  // surface, and the one search engines should index thoroughly.
  const chapterEntries: MetadataRoute.Sitemap = [];
  for (const b of canon) {
    for (let ch = 1; ch <= b.chapters; ch++) {
      chapterEntries.push({
        url: `${BASE}/bible/${b.id}/${ch}`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.6,
      });
    }
  }

  return [...staticEntries, ...bookEntries, ...chapterEntries];
}
