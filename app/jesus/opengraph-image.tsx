import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Jesus — the One the whole story is about.";
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
          flexDirection: "row",
          background:
            "radial-gradient(55% 70% at 25% 50%, rgba(249,115,22,0.42), transparent 65%), linear-gradient(180deg, #0f172a 0%, #1c0f0a 100%)",
          color: "#fdf6ec",
          padding: "64px 80px",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 24,
              color: "#fdba74",
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 9999,
                border: "2px solid #fdba74",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: 700,
                color: "#fdba74",
              }}
            >
              ST
            </div>
            <div>Scripture Theory</div>
          </div>

          <div
            style={{
              marginTop: 70,
              fontSize: 28,
              color: "#fed7aa",
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            The center
          </div>
          <div style={{ fontSize: 96, lineHeight: 1.0, fontWeight: 300, marginTop: 12 }}>
            The One the whole story
          </div>
          <div style={{ fontSize: 96, lineHeight: 1.0, fontWeight: 300 }}>
            is <span style={{ color: "#fb923c", fontStyle: "italic" }}>about.</span>
          </div>

          <div
            style={{
              marginTop: "auto",
              paddingTop: 36,
              borderTop: "1px solid rgba(253, 186, 116, 0.35)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              fontSize: 22,
            }}
          >
            <div style={{ fontStyle: "italic", color: "#fed7aa" }}>
              &ldquo;In the beginning was the Word, and the Word was with God,
              and the Word was God.&rdquo;
            </div>
            <div
              style={{
                color: "#fdba74",
                letterSpacing: 4,
                textTransform: "uppercase",
                fontSize: 16,
                marginLeft: 24,
                whiteSpace: "nowrap",
              }}
            >
              John 1:1
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 24,
            marginLeft: 24,
            fontSize: 380,
            lineHeight: 0.9,
            fontWeight: 300,
            color: "#fb923c",
            fontStyle: "italic",
            textShadow: "0 12px 60px rgba(249,115,22,0.4)",
          }}
        >
          Jesus
        </div>
      </div>
    ),
    { ...size },
  );
}
