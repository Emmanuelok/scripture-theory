import type { MetadataRoute } from "next";

const BASE =
  (process.env.NEXT_PUBLIC_SITE_URL ?? "https://scripture-theory.vercel.app").replace(
    /\/$/,
    "",
  );

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // Personal / device-local surfaces we deliberately do not index.
          "/me",
          "/account",
          "/bible/my",
          "/api/",
          // Verse card images aren't pages.
          "/api/verse-card/",
          // Course exam / certificate stay private to the user.
          "/course/exam",
          "/course/certificate",
          // Admin surfaces — never indexed.
          "/admin/",
        ],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
