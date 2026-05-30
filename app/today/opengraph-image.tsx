import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Today — your daily rhythm with Jesus and His Word.";
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
            "radial-gradient(55% 50% at 50% 0%, rgba(249,115,22,0.32), transparent 65%), linear-gradient(180deg, #0f172a 0%, #1c0f0a 100%)",
          color: "#fdf6ec",
          padding: "72px 88px",
          fontFamily: "serif",
          position: "relative",
        }}
      >
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
          <div>Scripture Theory · Today</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 80 }}>
          <div style={{ fontSize: 128, lineHeight: 1.0, fontWeight: 300 }}>
            Today, <span style={{ color: "#fb923c", fontStyle: "italic" }}>with Him.</span>
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#fed7aa",
              marginTop: 28,
              maxWidth: 920,
              lineHeight: 1.4,
            }}
          >
            Meditate. Read the Word. Journal. Pray. Five minutes each is enough
            — the Lord asks for the heart, not the hour.
          </div>
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
            &ldquo;His mercies are new every morning; great is Your faithfulness.&rdquo;
          </div>
          <div
            style={{
              color: "#fdba74",
              letterSpacing: 4,
              textTransform: "uppercase",
              fontSize: 16,
            }}
          >
            Lamentations 3:22-23
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
