import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Visual diagrams — interactive maps of Scripture, doctrine, and Christian practice.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "radial-gradient(50% 60% at 50% 50%, rgba(249,115,22,0.28), transparent 65%), linear-gradient(180deg, #0f172a 0%, #1c0f0a 100%)",
          color: "#fdf6ec",
          padding: "72px 88px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: "#fdba74",
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          Visual diagrams · Scripture Theory
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 60 }}>
          <div style={{ fontSize: 128, lineHeight: 1.05, fontWeight: 300, color: "#fdf6ec" }}>
            Geometry doing
          </div>
          <div
            style={{
              fontSize: 128,
              lineHeight: 1.05,
              fontWeight: 300,
              color: "#fb923c",
              fontStyle: "italic",
            }}
          >
            theology.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 36,
            marginTop: 40,
            fontSize: 26,
            color: "#fed7aa",
            flexWrap: "wrap",
          }}
        >
          <span>Trinity Shield</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span>Gospel Arc</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span>Church Year Wheel</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span>Fruit of the Spirit</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span>Sending Compass</span>
        </div>

        <div
          style={{
            marginTop: "auto",
            paddingTop: 48,
            borderTop: "1px solid rgba(253, 186, 116, 0.35)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            fontSize: 24,
            color: "#fdba74",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div>34 interactive diagrams</div>
          <div>Psalm 19:1</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
