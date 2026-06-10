import { ImageResponse } from "next/og";
import { getChapter } from "@/lib/bible";
import { getBook } from "@/data/bible/canon";
import { translations, type TranslationId } from "@/data/bible/translations";

export const runtime = "nodejs";
export const revalidate = 604800; // a week

/* ──────────────────────────────────────────────────────────────────
   Verse card · server-rendered share image.

   Query parameters (all optional, all safe to combine):
     translation  WEB | KJV | …  (default WEB)
     template     minimal | classic | sunrise | aurora | banner | quiet
     palette      light | dark | sepia | midnight | olive | dawn
     aspect       square | story | landscape
     align        center | left
     size         auto | s | m | l | xl
     mark         1 | 0     show the ST mark
     caption      (override the verse text — for personal phrasing)
     subtitle     (override the reference label)
     t            (server-side optimisation: pre-resolved verse text;
                   skips the upstream Bible API fetch)
   The legacy ?theme=light|dark still works and maps onto palette.
────────────────────────────────────────────────────────────────── */

const ASPECT_DIMS = {
  square: { w: 1080, h: 1080 },
  story: { w: 1080, h: 1920 },
  landscape: { w: 1920, h: 1080 },
} as const;
type AspectId = keyof typeof ASPECT_DIMS;

type Palette = {
  bg: string;
  fg: string;
  muted: string;
  accent: string;
  /** Subtle wash painted behind the verse for atmosphere. */
  wash: string;
  /** Secondary accent for templates that use two tones (e.g. Sunrise). */
  accent2?: string;
};

const PALETTES: Record<string, Palette> = {
  light: {
    bg: "#fafaf6",
    fg: "#13120f",
    muted: "#6b6754",
    accent: "#ea580c",
    wash: "radial-gradient(40% 30% at 80% 10%, rgba(234,88,12,0.10), transparent 60%)",
  },
  dark: {
    bg: "#0a0a0c",
    fg: "#fafaf9",
    muted: "#a1a1aa",
    accent: "#fb923c",
    wash: "radial-gradient(40% 30% at 80% 10%, rgba(251,146,60,0.18), transparent 60%)",
  },
  sepia: {
    bg: "#f5ecd9",
    fg: "#3b2a14",
    muted: "#8a7651",
    accent: "#a3631c",
    wash: "radial-gradient(50% 35% at 50% 0%, rgba(163,99,28,0.10), transparent 60%)",
  },
  midnight: {
    bg: "#0b1226",
    fg: "#f1f5f9",
    muted: "#94a3b8",
    accent: "#fbbf24",
    accent2: "#7dd3fc",
    wash: "radial-gradient(45% 35% at 50% 100%, rgba(251,191,36,0.16), transparent 60%)",
  },
  olive: {
    bg: "#f3f0e6",
    fg: "#1f2a14",
    muted: "#6c7757",
    accent: "#658328",
    wash: "radial-gradient(40% 30% at 80% 100%, rgba(101,131,40,0.12), transparent 60%)",
  },
  dawn: {
    bg: "#fff1ea",
    fg: "#28110d",
    muted: "#8a5a51",
    accent: "#e11d48",
    accent2: "#fb923c",
    wash:
      "radial-gradient(60% 50% at 50% 0%, rgba(225,29,72,0.14), transparent 65%), radial-gradient(50% 35% at 50% 100%, rgba(251,146,60,0.18), transparent 60%)",
  },
};

const SIZE_SCALE: Record<string, number> = { s: 0.78, m: 1.0, l: 1.18, xl: 1.36 };

type Args = {
  ref: string;
  verseText: string;
  attribution: string;
  palette: Palette;
  align: "left" | "center";
  showMark: boolean;
  width: number;
  height: number;
  fontSize: number; // base body font size
};

/* ──────────────────────────────────────────────────────────────────
   Templates — each returns the inner content of the card; the route
   wraps them in the outer container with width/height/background.
────────────────────────────────────────────────────────────────── */

function MarkBadge({ palette, label }: { palette: Palette; label: string }) {
  return (
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
      <div>{label}</div>
    </div>
  );
}

function templateMinimal(a: Args) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 80,
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: a.palette.wash }} />
      {a.showMark && <MarkBadge palette={a.palette} label="Scripture Theory" />}
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 70,
          fontSize: 220,
          color: a.palette.accent,
          opacity: 0.18,
          fontFamily: "Georgia, serif",
          lineHeight: 0.9,
        }}
      >
        “
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: a.align === "left" ? "flex-start" : "center",
          zIndex: 2,
          padding: "0 30px",
        }}
      >
        <div
          style={{
            fontSize: a.fontSize,
            lineHeight: 1.35,
            textAlign: a.align,
            fontFamily: "Georgia, serif",
            color: a.palette.fg,
          }}
        >
          {a.verseText}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: a.align === "left" ? "flex-start" : "center",
          gap: 8,
          zIndex: 2,
        }}
      >
        <div style={{ fontSize: 36, fontFamily: "Georgia, serif", color: a.palette.fg }}>
          {a.ref}
        </div>
        <div
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: a.palette.muted,
          }}
        >
          {a.attribution}
        </div>
      </div>
    </div>
  );
}

function templateClassic(a: Args) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 100,
        position: "relative",
      }}
    >
      <div
        style={{
          height: 2,
          width: "30%",
          background: a.palette.fg,
          opacity: 0.6,
          marginBottom: 36,
        }}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: a.fontSize,
            lineHeight: 1.4,
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            textAlign: a.align,
            color: a.palette.fg,
          }}
        >
          {a.verseText}
        </div>
        <div
          style={{
            marginTop: 56,
            fontSize: 28,
            fontFamily: "system-ui, sans-serif",
            letterSpacing: 8,
            textTransform: "uppercase",
            color: a.palette.muted,
            textAlign: a.align,
          }}
        >
          — {a.ref}
        </div>
      </div>
      <div
        style={{
          height: 2,
          width: "30%",
          background: a.palette.fg,
          opacity: 0.6,
          marginTop: 36,
          marginLeft: a.align === "center" ? "auto" : 0,
        }}
      />
      {a.showMark && (
        <div
          style={{
            marginTop: 24,
            fontFamily: "system-ui, sans-serif",
            fontSize: 18,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: a.palette.muted,
            textAlign: a.align,
          }}
        >
          {a.attribution}
        </div>
      )}
    </div>
  );
}

function templateSunrise(a: Args) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 80,
        position: "relative",
        background: `radial-gradient(60% 50% at 50% 0%, ${a.palette.accent}, transparent 70%), ${
          a.palette.accent2 ? `radial-gradient(60% 50% at 50% 100%, ${a.palette.accent2}33, transparent 60%)` : ""
        }`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: a.height * 0.35,
          background: `linear-gradient(180deg, ${a.palette.accent}40 0%, transparent 100%)`,
        }}
      />
      {a.showMark && <MarkBadge palette={a.palette} label="Scripture Theory" />}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: a.align === "left" ? "flex-start" : "center",
          padding: "60px 20px",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: a.fontSize,
            lineHeight: 1.32,
            textAlign: a.align,
            fontFamily: "Georgia, serif",
            color: a.palette.fg,
          }}
        >
          {a.verseText}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: a.align === "left" ? "flex-start" : "center",
          gap: 10,
          padding: "20px 0",
          borderTop: `2px solid ${a.palette.accent}`,
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: 40,
            fontFamily: "Georgia, serif",
            color: a.palette.fg,
            fontStyle: "italic",
          }}
        >
          {a.ref}
        </div>
        <div
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: a.palette.muted,
          }}
        >
          {a.attribution}
        </div>
      </div>
    </div>
  );
}

function templateAurora(a: Args) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 90,
        position: "relative",
        background: a.palette.bg,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(55% 45% at 25% 20%, ${a.palette.accent}40, transparent 60%), radial-gradient(40% 35% at 80% 80%, ${a.palette.accent}30, transparent 65%), radial-gradient(35% 25% at 60% 40%, ${
            a.palette.accent2 ?? a.palette.accent
          }28, transparent 65%)`,
        }}
      />
      {a.showMark && <MarkBadge palette={a.palette} label="Scripture Theory" />}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: a.align === "left" ? "flex-start" : "center",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: a.fontSize,
            lineHeight: 1.32,
            textAlign: a.align,
            fontFamily: "Georgia, serif",
            color: a.palette.fg,
            fontWeight: 300,
          }}
        >
          {a.verseText}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: a.align === "left" ? "flex-start" : "center",
          gap: 8,
          zIndex: 2,
        }}
      >
        <div style={{ fontSize: 36, fontFamily: "Georgia, serif", color: a.palette.accent }}>
          {a.ref}
        </div>
        <div
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: a.palette.muted,
          }}
        >
          {a.attribution}
        </div>
      </div>
    </div>
  );
}

function templateBanner(a: Args) {
  const isPortrait = a.height > a.width;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: isPortrait ? "column" : "row",
      }}
    >
      <div
        style={{
          flexBasis: isPortrait ? "32%" : "38%",
          background: a.palette.accent,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 70,
          color: a.palette.bg,
        }}
      >
        <div
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          {a.showMark ? "Scripture Theory" : ""}
        </div>
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: isPortrait ? 96 : 84,
            lineHeight: 1.0,
            fontStyle: "italic",
          }}
        >
          {a.ref}
        </div>
        <div
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
            opacity: 0.8,
          }}
        >
          {a.attribution}
        </div>
      </div>
      <div
        style={{
          flex: 1,
          background: a.palette.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: a.align === "left" ? "flex-start" : "center",
          padding: 80,
        }}
      >
        <div
          style={{
            fontSize: a.fontSize,
            lineHeight: 1.32,
            textAlign: a.align,
            fontFamily: "Georgia, serif",
            color: a.palette.fg,
          }}
        >
          {a.verseText}
        </div>
      </div>
    </div>
  );
}

function templateQuiet(a: Args) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 140,
      }}
    >
      <div
        style={{
          fontSize: a.fontSize * 0.92,
          lineHeight: 1.45,
          textAlign: a.align,
          fontFamily: "Georgia, serif",
          color: a.palette.fg,
          fontWeight: 300,
        }}
      >
        {a.verseText}
      </div>
      <div
        style={{
          marginTop: 60,
          fontFamily: "system-ui, sans-serif",
          fontSize: 22,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: a.palette.muted,
          textAlign: a.align,
        }}
      >
        {a.ref}
        {a.showMark ? ` · ${a.attribution.split(" · ")[0]}` : ""}
      </div>
    </div>
  );
}

const TEMPLATE_FNS: Record<string, (a: Args) => React.ReactElement> = {
  minimal: templateMinimal,
  classic: templateClassic,
  sunrise: templateSunrise,
  aurora: templateAurora,
  banner: templateBanner,
  quiet: templateQuiet,
};

/* ──────────────────────────────────────────────────────────────────
   Route handler
────────────────────────────────────────────────────────────────── */

function clamp(v: string | null, allowed: readonly string[], fallback: string): string {
  return v && (allowed as readonly string[]).includes(v) ? v : fallback;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ book: string; chapter: string; verse: string }> },
) {
  const { book: bookId, chapter: chapterStr, verse: verseStr } = await params;
  const url = new URL(req.url);

  const translation = (url.searchParams.get("translation") ?? "WEB") as TranslationId;
  // Legacy theme= maps onto palette so old links keep working
  const legacyTheme = url.searchParams.get("theme");
  const paletteId = clamp(
    url.searchParams.get("palette") ?? (legacyTheme === "dark" ? "dark" : null),
    Object.keys(PALETTES),
    "light",
  );
  const template = clamp(url.searchParams.get("template"), Object.keys(TEMPLATE_FNS), "minimal");
  const aspect = clamp(url.searchParams.get("aspect"), Object.keys(ASPECT_DIMS), "square") as AspectId;
  const align = clamp(url.searchParams.get("align"), ["center", "left"], "center") as
    | "center"
    | "left";
  const sizeKey = clamp(url.searchParams.get("size"), ["auto", "s", "m", "l", "xl"], "auto");
  const showMark = url.searchParams.get("mark") !== "0";

  const book = getBook(bookId);
  if (!book) return new Response("Unknown book", { status: 404 });
  const chapter = Number(chapterStr);
  const verseNum = Number(verseStr);
  if (Number.isNaN(chapter) || Number.isNaN(verseNum)) {
    return new Response("Invalid", { status: 400 });
  }

  // Verse text — caller-provided, else fetched
  const tParam = url.searchParams.get("t");
  const captionOverride = url.searchParams.get("caption");
  let verseText = (captionOverride ?? tParam ?? "").trim();
  if (!verseText) {
    const chapterText = await getChapter(bookId, chapter, translation);
    const verse = chapterText?.verses.find((v) => v.v === verseNum);
    if (!verse) return new Response("Verse not found", { status: 404 });
    verseText = verse.t;
  }
  // Safety guard so the editor can't break the renderer with a giant blob
  if (verseText.length > 800) verseText = verseText.slice(0, 800) + "…";

  const meta = translations[translation];
  const abbrev = meta?.abbrev ?? translation;
  const defaultRef = `${book.name} ${chapter}:${verseNum}`;
  const refOverride = (url.searchParams.get("subtitle") ?? "").trim();
  const ref = (refOverride || defaultRef).slice(0, 80);
  const attribution = `${abbrev} · scripture-theory.org`;

  const WIDTH = ASPECT_DIMS[aspect].w;
  const HEIGHT = ASPECT_DIMS[aspect].h;

  // Base font size — auto by length, then scaled by user preference
  const len = verseText.length;
  const autoBase = len > 320 ? 36 : len > 220 ? 44 : len > 140 ? 54 : 64;
  const scale = sizeKey === "auto" ? 1 : SIZE_SCALE[sizeKey] ?? 1;
  const fontSize = Math.round(autoBase * scale);

  const palette = PALETTES[paletteId] ?? PALETTES.light;
  const render = TEMPLATE_FNS[template] ?? TEMPLATE_FNS.minimal;

  return new ImageResponse(
    (
      <div
        style={{
          width: WIDTH,
          height: HEIGHT,
          display: "flex",
          background: palette.bg,
          color: palette.fg,
          fontFamily: "Georgia, serif",
        }}
      >
        {render({
          ref,
          verseText,
          attribution,
          palette,
          align,
          showMark,
          width: WIDTH,
          height: HEIGHT,
          fontSize,
        })}
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      headers: {
        "Cache-Control": "public, s-maxage=604800, stale-while-revalidate=2592000",
      },
    },
  );
}
