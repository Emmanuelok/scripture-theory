import { ImageResponse } from "next/og";
import { getChapter } from "@/lib/bible";
import { getBook } from "@/data/bible/canon";
import { translations, type TranslationId } from "@/data/bible/translations";

export const runtime = "nodejs";
export const revalidate = 604800; // a week

// Supported aspect ratios. Square is the default (rich-card / feed posts);
// "story" is 9:16 for Instagram / WhatsApp / Snapchat stories;
// "landscape" is 16:9 for slides / X cards.
const ASPECT_DIMS = {
  square: { w: 1080, h: 1080 },
  story: { w: 1080, h: 1920 },
  landscape: { w: 1920, h: 1080 },
} as const;
type AspectId = keyof typeof ASPECT_DIMS;

export async function GET(
  req: Request,
  { params }: { params: Promise<{ book: string; chapter: string; verse: string }> }
) {
  const { book: bookId, chapter: chapterStr, verse: verseStr } = await params;
  const url = new URL(req.url);
  const translation = (url.searchParams.get("translation") ?? "WEB") as TranslationId;
  const theme = url.searchParams.get("theme") === "dark" ? "dark" : "light";
  const aspectParam = url.searchParams.get("aspect") as AspectId | null;
  const aspect: AspectId = aspectParam && aspectParam in ASPECT_DIMS ? aspectParam : "square";
  const WIDTH = ASPECT_DIMS[aspect].w;
  const HEIGHT = ASPECT_DIMS[aspect].h;

  const book = getBook(bookId);
  if (!book) return new Response("Unknown book", { status: 404 });
  const chapter = Number(chapterStr);
  const verseNum = Number(verseStr);
  if (Number.isNaN(chapter) || Number.isNaN(verseNum)) {
    return new Response("Invalid", { status: 400 });
  }

  const chapterText = await getChapter(bookId, chapter, translation);
  const verse = chapterText?.verses.find((v) => v.v === verseNum);
  if (!verse) {
    return new Response("Verse not found", { status: 404 });
  }

  const meta = translations[translation];
  const abbrev = meta?.abbrev ?? translation;
  const ref = `${book.name} ${chapter}:${verseNum}`;

  const palette =
    theme === "dark"
      ? { bg: "#0a0a0c", fg: "#fafaf9", muted: "#a1a1aa", accent: "#fb923c" }
      : { bg: "#fafaf6", fg: "#13120f", muted: "#6b6754", accent: "#ea580c" };

  // Heuristic font sizing so very long verses still fit.
  const len = verse.t.length;
  const verseFontSize = len > 320 ? 36 : len > 220 ? 44 : len > 140 ? 54 : 64;

  return new ImageResponse(
    (
      <div
        style={{
          width: WIDTH,
          height: HEIGHT,
          display: "flex",
          flexDirection: "column",
          background: palette.bg,
          color: palette.fg,
          padding: 80,
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Aurora wash */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              theme === "dark"
                ? "radial-gradient(40% 30% at 80% 10%, rgba(251,146,60,0.18), transparent 60%)"
                : "radial-gradient(40% 30% at 80% 10%, rgba(234,88,12,0.10), transparent 60%)",
          }}
        />

        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: "system-ui, sans-serif",
            fontSize: 22,
            color: palette.muted,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              background: palette.fg,
              color: palette.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Georgia, serif",
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            ST
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>Scripture Theory</span>
          </div>
        </div>

        {/* Big quote mark */}
        <div
          style={{
            position: "absolute",
            top: 110,
            left: 70,
            fontSize: 220,
            color: palette.accent,
            opacity: 0.18,
            fontFamily: "Georgia, serif",
            lineHeight: 0.9,
          }}
        >
          “
        </div>

        {/* Verse body */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            paddingLeft: 30,
            paddingRight: 30,
          }}
        >
          <div
            style={{
              fontSize: verseFontSize,
              lineHeight: 1.35,
              textAlign: "center",
              fontFamily: "Georgia, serif",
              color: palette.fg,
            }}
          >
            {verse.t}
          </div>
        </div>

        {/* Reference + translation */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            zIndex: 2,
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontFamily: "Georgia, serif",
              color: palette.fg,
            }}
          >
            {ref}
          </div>
          <div
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: 18,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: palette.muted,
            }}
          >
            {abbrev} · scripture-theory.org
          </div>
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      headers: {
        "Cache-Control": "public, s-maxage=604800, stale-while-revalidate=2592000",
      },
    }
  );
}
