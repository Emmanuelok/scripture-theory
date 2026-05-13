import { NextRequest, NextResponse } from "next/server";

/**
 * Server-side audio-Bible proxy.
 *
 * Streams a chapter's MP3 from a public source. WordProject and most
 * Christian audio hosts block direct browser hotlinking but allow
 * server-to-server requests with a proper Referer header. We try a list
 * of sources in order and stream the first one that responds 200.
 *
 * URL shape: /api/audio-bible/<bookOrder>/<chapter>
 *   bookOrder: 01..66 (Genesis=01, Revelation=66)
 *   chapter:   01..NN
 */

export const runtime = "edge";

type Source = {
  name: string;
  url: (order: string, chapter: string) => string;
  referer?: string;
};

const SOURCES: Source[] = [
  // WordProject — English KJV, 66 books. Public-domain audio.
  {
    name: "wordproject-kjv",
    url: (o, c) => `https://www.wordproject.org/bibles/audio/01_english/b${o}_${c}.mp3`,
    referer: "https://www.wordproject.org/",
  },
  // Mirror with hyphenated path used historically by some Christian sites
  {
    name: "wordproject-kjv-alt",
    url: (o, c) => `https://wordproject.org/bibles/audio/01_english/b${o}_${c}.mp3`,
    referer: "https://wordproject.org/",
  },
];

function pad2(n: number | string) {
  const s = String(n);
  return s.length >= 2 ? s : `0${s}`;
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ order: string; chapter: string }> }
) {
  const { order, chapter } = await context.params;
  const orderN = Number(order);
  const chapterN = Number(chapter);
  if (!Number.isFinite(orderN) || orderN < 1 || orderN > 66) {
    return NextResponse.json({ error: "invalid book order" }, { status: 400 });
  }
  if (!Number.isFinite(chapterN) || chapterN < 1 || chapterN > 200) {
    return NextResponse.json({ error: "invalid chapter" }, { status: 400 });
  }

  const o = pad2(orderN);
  const c = pad2(chapterN);

  for (const src of SOURCES) {
    try {
      const upstream = await fetch(src.url(o, c), {
        headers: {
          // A real-browser User-Agent + a Referer that satisfies most
          // hotlink-protection setups.
          "User-Agent":
            "Mozilla/5.0 (compatible; Scripture-Theory/1.0; +https://scripture-theory.vercel.app)",
          ...(src.referer ? { Referer: src.referer } : {}),
          Accept: "audio/mpeg, audio/*;q=0.9, */*;q=0.5",
        },
        // Edge runtime supports streaming Response bodies directly.
        cache: "no-store",
      });

      if (!upstream.ok || !upstream.body) continue;

      const headers = new Headers();
      headers.set("Content-Type", upstream.headers.get("Content-Type") ?? "audio/mpeg");
      const len = upstream.headers.get("Content-Length");
      if (len) headers.set("Content-Length", len);
      headers.set("Accept-Ranges", "bytes");
      // Cache at the edge for a week — these files don't change.
      headers.set("Cache-Control", "public, max-age=3600, s-maxage=604800, immutable");
      headers.set("X-Audio-Source", src.name);

      return new Response(upstream.body, { status: 200, headers });
    } catch {
      // try next source
    }
  }

  return NextResponse.json(
    { error: "No upstream source available for this chapter." },
    { status: 502 }
  );
}
