import { ImageResponse } from "next/og";
import { COURSE_WEEKS } from "@/data/course";

export const runtime = "nodejs";
export const revalidate = 86_400;

const WIDTH = 1200;
const HEIGHT = 630;

export async function GET(
  req: Request,
  { params }: { params: Promise<{ week: string }> }
) {
  const { week: weekParam } = await params;
  const url = new URL(req.url);
  const scoreParam = url.searchParams.get("score") ?? "";
  const nameParam = (url.searchParams.get("name") ?? "").replace(/[<>]/g, "").slice(0, 60).trim();

  const weekNum = Number(weekParam);
  const week = COURSE_WEEKS.find((w) => w.week === weekNum);

  if (!week) {
    return new Response("Not found", { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: WIDTH,
          height: HEIGHT,
          display: "flex",
          flexDirection: "column",
          background: "#0a0604",
          color: "#fbf7f0",
          padding: 64,
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Flame radial */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(60% 60% at 0% 0%, rgba(249,115,22,0.22), transparent 60%), radial-gradient(50% 50% at 100% 100%, rgba(184,66,12,0.18), transparent 60%)",
            display: "flex",
          }}
        />

        {/* Mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            position: "relative",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: "#fdba74",
              color: "#0a0604",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            ST
          </div>
          <span
            style={{
              fontSize: 14,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#fdba74",
            }}
          >
            Scripture Theory · Foundations of the Faith
          </span>
        </div>

        {/* Body */}
        <div
          style={{
            position: "relative",
            marginTop: 56,
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <span
            style={{
              fontSize: 22,
              color: "#fdba74",
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Week {week.week} of 12 · complete
          </span>
          <span
            style={{
              fontSize: 64,
              color: "#fbf7f0",
              marginTop: 14,
              lineHeight: 1.05,
              maxWidth: 1000,
            }}
          >
            {week.title}
          </span>
          <span
            style={{
              fontSize: 26,
              color: "#d3cfb8",
              marginTop: 18,
              fontStyle: "italic",
              maxWidth: 1000,
              lineHeight: 1.4,
            }}
          >
            {week.tagline}
          </span>

          <div
            style={{
              marginTop: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 6,
              maxWidth: 1000,
            }}
          >
            <span style={{ fontSize: 14, letterSpacing: 4, textTransform: "uppercase", color: "#fdba74" }}>
              Memory · {week.memoryVerse.ref}
            </span>
            <span style={{ fontSize: 22, color: "#fbf7f0", fontStyle: "italic", lineHeight: 1.4 }}>
              "{week.memoryVerse.text.length > 180 ? week.memoryVerse.text.slice(0, 177) + "…" : week.memoryVerse.text}"
            </span>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: 24,
            borderTop: "1px solid rgba(253,186,116,0.25)",
            paddingTop: 18,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "#fdba74" }}>
              Walked by
            </span>
            <span style={{ fontSize: 22, color: "#fbf7f0" }}>
              {nameParam || "A fellow believer"}
            </span>
          </div>
          {scoreParam && (
            <div style={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
              <span style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "#fdba74" }}>
                Quiz
              </span>
              <span style={{ fontSize: 22, color: "#fbf7f0" }}>{scoreParam}</span>
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-end" }}>
            <span style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "#fdba74" }}>
              Anchor
            </span>
            <span style={{ fontSize: 22, color: "#fbf7f0" }}>{week.scripture.ref}</span>
          </div>
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400, immutable",
      },
    }
  );
}
