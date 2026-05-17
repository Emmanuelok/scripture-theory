import { ImageResponse } from "next/og";
import { findCourse } from "@/data/courseTrack";

export const runtime = "nodejs";
export const revalidate = 86_400;

const WIDTH = 1600;
const HEIGHT = 1100;

const ACCENT_HEX: Record<string, { primary: string; soft: string }> = {
  flame: { primary: "#b8420c", soft: "#fdba74" },
  blue: { primary: "#0369a1", soft: "#bae6fd" },
  emerald: { primary: "#047857", soft: "#a7f3d0" },
  violet: { primary: "#6d28d9", soft: "#ddd6fe" },
  amber: { primary: "#b45309", soft: "#fcd34d" },
  rose: { primary: "#be123c", soft: "#fda4af" },
};

export async function GET(
  req: Request,
  { params }: { params: Promise<{ courseId: string; name: string }> }
) {
  const { courseId, name: encName } = await params;
  const course = findCourse(courseId);
  if (!course) {
    return new Response("Course not found", { status: 404 });
  }

  const url = new URL(req.url);
  const dateParam = url.searchParams.get("date") ?? "";
  const scoreParam = url.searchParams.get("score") ?? "";

  let name = decodeURIComponent(encName || "Beloved Believer");
  name = name.replace(/[<>]/g, "").slice(0, 60).trim() || "Beloved Believer";
  const completedOn =
    dateParam ||
    new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const accent = ACCENT_HEX[course.accent] ?? ACCENT_HEX.flame;

  return new ImageResponse(
    (
      <div
        style={{
          width: WIDTH,
          height: HEIGHT,
          display: "flex",
          flexDirection: "column",
          background: "#fbf7f0",
          color: "#13120f",
          padding: 80,
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", inset: 32, border: `2px solid ${accent.primary}`, borderRadius: 16, display: "flex" }} />
        <div style={{ position: "absolute", inset: 44, border: `1px solid ${accent.soft}`, borderRadius: 12, display: "flex" }} />

        <div style={{ position: "absolute", top: 80, left: 80, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: "#0a0604", display: "flex", alignItems: "center", justifyContent: "center", color: accent.soft, fontSize: 28, fontWeight: 600 }}>
            ST
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 14, letterSpacing: 4, textTransform: "uppercase", color: accent.primary }}>
              Scripture Theory
            </span>
            <span style={{ fontSize: 18, color: "#6b6754", fontStyle: "italic", marginTop: 4 }}>
              Certificate of completion
            </span>
          </div>
        </div>

        <div style={{ marginTop: 220, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <span style={{ fontSize: 20, color: "#6b6754", letterSpacing: 6, textTransform: "uppercase" }}>
            This certifies that
          </span>
          <span style={{ fontSize: 96, color: "#13120f", marginTop: 24, maxWidth: 1300, lineHeight: 1.1 }}>
            {name}
          </span>
          <span style={{ fontSize: 22, color: "#6b6754", marginTop: 28, maxWidth: 1100, lineHeight: 1.5 }}>
            has faithfully completed the twelve-week course
          </span>
          <span style={{ fontSize: 56, color: accent.primary, fontStyle: "italic", marginTop: 16 }}>
            {course.title}
          </span>
        </div>

        <div style={{ position: "absolute", bottom: 96, left: 96, right: 96, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 14, color: "#6b6754", letterSpacing: 3, textTransform: "uppercase" }}>Completed</span>
            <span style={{ fontSize: 24, color: "#13120f" }}>{completedOn}</span>
          </div>
          {scoreParam && (
            <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
              <span style={{ fontSize: 14, color: "#6b6754", letterSpacing: 3, textTransform: "uppercase" }}>Final exam</span>
              <span style={{ fontSize: 24, color: "#13120f" }}>{scoreParam}</span>
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
            <span style={{ fontSize: 14, color: "#6b6754", letterSpacing: 3, textTransform: "uppercase" }}>Issued by</span>
            <span style={{ fontSize: 24, color: "#13120f", fontStyle: "italic" }}>Scripture Theory</span>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 36, left: 0, right: 0, textAlign: "center", fontSize: 16, color: "#6b6754", fontStyle: "italic", display: "flex", justifyContent: "center" }}>
          "He who began a good work in you will complete it." — Philippians 1:6
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400, immutable" },
    }
  );
}
