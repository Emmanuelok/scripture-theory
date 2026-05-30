import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Pray. He hears. — The Lord's Prayer, ACTS, and a day-by-day rhythm for the world.";
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
            "radial-gradient(50% 60% at 50% 100%, rgba(249,115,22,0.30), transparent 65%), linear-gradient(180deg, #0f172a 0%, #1c0f0a 100%)",
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
          <div>Scripture Theory · Pray</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 90 }}>
          <div style={{ fontSize: 192, lineHeight: 1.0, fontWeight: 300 }}>
            Pray.
          </div>
          <div
            style={{
              fontSize: 144,
              lineHeight: 1.0,
              fontWeight: 300,
              color: "#fb923c",
              fontStyle: "italic",
              marginTop: 12,
            }}
          >
            He hears.
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#fed7aa",
              marginTop: 32,
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            The Lord&apos;s Prayer in eight languages. The ACTS pattern. A
            different nation every day. The whole Body, lifting up one another.
          </div>
        </div>

        <div
          style={{
            marginTop: "auto",
            paddingTop: 32,
            borderTop: "1px solid rgba(253, 186, 116, 0.35)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            fontSize: 22,
          }}
        >
          <div style={{ fontStyle: "italic", color: "#fed7aa" }}>
            &ldquo;O You who hear prayer, to You all flesh will come.&rdquo;
          </div>
          <div
            style={{
              color: "#fdba74",
              letterSpacing: 4,
              textTransform: "uppercase",
              fontSize: 16,
            }}
          >
            Psalm 65:2
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
