import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "He is alive. Stories from around the world.";
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
            "radial-gradient(70% 60% at 0% 0%, rgba(249,115,22,0.22), transparent 60%), radial-gradient(60% 40% at 100% 100%, rgba(184,66,12,0.20), transparent 60%), linear-gradient(180deg, #0f172a 0%, #1c0f0a 100%)",
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
          Witness · Scripture Theory
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 80 }}>
          <div style={{ fontSize: 132, lineHeight: 1.05, fontWeight: 300, color: "#fdf6ec" }}>
            He is <span style={{ color: "#fb923c", fontStyle: "italic" }}>alive.</span>
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 40,
              lineHeight: 1.2,
              color: "#fed7aa",
              maxWidth: 900,
              fontStyle: "italic",
            }}
          >
            Real testimonies from real believers — gathered to lift up the Lord who is in them.
          </div>
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
          }}
        >
          <div style={{ fontStyle: "italic", color: "#fed7aa" }}>
            &ldquo;They overcame him by the blood of the Lamb, and by the word of their testimony.&rdquo;
          </div>
          <div style={{ color: "#fdba74", letterSpacing: 4, textTransform: "uppercase", fontSize: 18 }}>
            Revelation 12:11
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
