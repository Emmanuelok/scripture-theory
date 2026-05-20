import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Scripture Theory — Encounter Jesus, engage the Word, live the Kingdom.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Root Open Graph image. Renders a flame-bordered card with the
 * platform's mark, the tagline, and a closing scripture — Hebrews 13:8.
 * Used as the default share card for any route without its own.
 */
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
            "radial-gradient(60% 50% at 50% 0%, rgba(249,115,22,0.30), transparent 65%), linear-gradient(180deg, #0f172a 0%, #1c0f0a 100%)",
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
            fontSize: 28,
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

        <div style={{ display: "flex", flexDirection: "column", marginTop: 90 }}>
          <div style={{ fontSize: 88, lineHeight: 1.05, fontWeight: 300, color: "#fdf6ec" }}>
            Encounter <span style={{ color: "#fb923c" }}>Jesus.</span>
          </div>
          <div style={{ fontSize: 88, lineHeight: 1.05, fontWeight: 300, color: "#fdf6ec" }}>
            Engage the Word.
          </div>
          <div style={{ fontSize: 88, lineHeight: 1.05, fontWeight: 300, color: "#fdf6ec" }}>
            Live the Kingdom.
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
            &ldquo;Jesus Christ is the same yesterday and today and forever.&rdquo;
          </div>
          <div style={{ color: "#fdba74", letterSpacing: 4, textTransform: "uppercase", fontSize: 18 }}>
            Hebrews 13:8
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
