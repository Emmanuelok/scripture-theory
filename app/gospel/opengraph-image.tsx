import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "The Gospel — Christ died, was buried, rose, was seen. He is alive. He is Lord.";
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
            "radial-gradient(60% 60% at 50% 0%, rgba(249,115,22,0.34), transparent 65%), linear-gradient(180deg, #0f172a 0%, #1c0f0a 100%)",
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
          <div>The Gospel · 1 Corinthians 15</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 60 }}>
          <div style={{ fontSize: 68, lineHeight: 1.15, fontWeight: 300 }}>Christ died for our sins.</div>
          <div style={{ fontSize: 68, lineHeight: 1.15, fontWeight: 300 }}>He was buried.</div>
          <div style={{ fontSize: 68, lineHeight: 1.15, fontWeight: 300 }}>He rose on the third day.</div>
          <div style={{ fontSize: 68, lineHeight: 1.15, fontWeight: 300 }}>He was seen.</div>
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.15,
              fontWeight: 300,
              color: "#fb923c",
              fontStyle: "italic",
              marginTop: 8,
            }}
          >
            He is alive. He is Lord.
          </div>
        </div>

        <div
          style={{
            marginTop: "auto",
            paddingTop: 28,
            borderTop: "1px solid rgba(253, 186, 116, 0.35)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            fontSize: 22,
          }}
        >
          <div style={{ fontStyle: "italic", color: "#fed7aa" }}>
            &ldquo;I delivered to you, first of all, that which I also received.&rdquo;
          </div>
          <div
            style={{
              color: "#fdba74",
              letterSpacing: 4,
              textTransform: "uppercase",
              fontSize: 16,
            }}
          >
            1 Cor 15:3
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
