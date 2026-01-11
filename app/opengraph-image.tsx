import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "ACME";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#0a0a0a",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px",
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "#fafafa",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          ACME
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#a1a1a1",
            textAlign: "center",
            maxWidth: "900px",
            lineHeight: 1.4,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          Soluciones digitales para impulsar el crecimiento de tu marca
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  );
}
