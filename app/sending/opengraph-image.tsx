import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Sent. The Great Commission for every believer. Project 1M — our quiet prayer.";
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
          background:
            "radial-gradient(45% 60% at 30% 50%, rgba(249,115,22,0.42), transparent 65%), linear-gradient(180deg, #0f172a 0%, #1c0f0a 100%)",
          color: "#fdf6ec",
          padding: "72px 88px",
          fontFamily: "serif",
        }}
      >
        {/* Left — vision */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 24,
              color: "#fdba74",
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Project 1M · Scripture Theory
          </div>
          <div
            style={{
              marginTop: 56,
              fontSize: 200,
              lineHeight: 1,
              fontWeight: 300,
              color: "#fdf6ec",
            }}
          >
            Sent.
          </div>
          <div
            style={{
              marginTop: 36,
              fontSize: 32,
              lineHeight: 1.3,
              color: "#fed7aa",
              maxWidth: 580,
            }}
          >
            The Great Commission for every believer. A quiet prayer for one million ordinary
            evangelists.
          </div>

          <div
            style={{
              marginTop: "auto",
              fontSize: 22,
              color: "#fdba74",
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Matthew 28:18-20
          </div>
        </div>

        {/* Right — the "1M" badge */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 320,
            border: "3px solid rgba(253, 186, 116, 0.55)",
            borderRadius: 32,
            background: "rgba(15, 23, 42, 0.55)",
          }}
        >
          <div
            style={{
              fontSize: 220,
              lineHeight: 1,
              fontWeight: 700,
              color: "#fed7aa",
              letterSpacing: -4,
            }}
          >
            1M
          </div>
          <div
            style={{
              marginTop: 16,
              fontSize: 20,
              color: "#fdba74",
              letterSpacing: 4,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Prayed,
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#fdba74",
              letterSpacing: 4,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Not Measured
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
