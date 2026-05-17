import { ImageResponse } from "next/og";
import { readingPlans } from "@/data/readings";

export const runtime = "nodejs";
export const revalidate = 86_400;

const WIDTH = 1600;
const HEIGHT = 1100;

export async function GET(
  req: Request,
  { params }: { params: Promise<{ planId: string }> }
) {
  const { planId } = await params;
  const url = new URL(req.url);
  const name = (url.searchParams.get("name") ?? "Beloved Believer")
    .replace(/[<>]/g, "")
    .slice(0, 60)
    .trim() || "Beloved Believer";
  const dateParam = url.searchParams.get("date") ?? "";

  const plan = readingPlans.find((p) => p.id === planId);
  if (!plan) {
    return new Response("Plan not found", { status: 404 });
  }

  const completedOn =
    dateParam ||
    new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

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
        <div
          style={{
            position: "absolute",
            inset: 32,
            border: "2px solid #b8420c",
            borderRadius: 16,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 44,
            border: "1px solid #fdba74",
            borderRadius: 12,
            display: "flex",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 80,
            left: 80,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#0a0604",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fdba74",
              fontSize: 28,
              fontWeight: 600,
            }}
          >
            ST
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 14,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#b8420c",
              }}
            >
              Scripture Theory
            </span>
            <span
              style={{
                fontSize: 18,
                color: "#6b6754",
                fontStyle: "italic",
                marginTop: 4,
              }}
            >
              Reading plan · completion
            </span>
          </div>
        </div>

        <div
          style={{
            marginTop: 220,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: 20,
              color: "#6b6754",
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            This honors the faithfulness of
          </span>
          <span
            style={{
              fontSize: 84,
              color: "#13120f",
              marginTop: 24,
              maxWidth: 1300,
              lineHeight: 1.1,
            }}
          >
            {name}
          </span>
          <span
            style={{
              fontSize: 22,
              color: "#6b6754",
              marginTop: 28,
              maxWidth: 1100,
              lineHeight: 1.5,
            }}
          >
            for walking the {plan.totalDays}-day reading plan
          </span>
          <span
            style={{
              fontSize: 48,
              color: "#b8420c",
              fontStyle: "italic",
              marginTop: 12,
              maxWidth: 1300,
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            {plan.name}
          </span>
          {plan.tagline && (
            <span
              style={{
                fontSize: 20,
                color: "#6b6754",
                fontStyle: "italic",
                marginTop: 12,
                maxWidth: 1100,
                lineHeight: 1.4,
              }}
            >
              "{plan.tagline}"
            </span>
          )}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 96,
            left: 96,
            right: 96,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span
              style={{
                fontSize: 14,
                color: "#6b6754",
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              Completed
            </span>
            <span style={{ fontSize: 24, color: "#13120f" }}>{completedOn}</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 14,
                color: "#6b6754",
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              Days
            </span>
            <span style={{ fontSize: 24, color: "#13120f" }}>{plan.totalDays} / {plan.totalDays}</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              alignItems: "flex-end",
            }}
          >
            <span
              style={{
                fontSize: 14,
                color: "#6b6754",
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              Issued by
            </span>
            <span style={{ fontSize: 24, color: "#13120f", fontStyle: "italic" }}>
              Scripture Theory
            </span>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 36,
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: 16,
            color: "#6b6754",
            fontStyle: "italic",
            display: "flex",
            justifyContent: "center",
          }}
        >
          "Lay these words of mine in your heart and in your soul." — Deuteronomy 11:18
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
