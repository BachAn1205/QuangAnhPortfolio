import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#070b12",
          color: "#f4f4f5",
          padding: "72px",
        }}
      >
        <div style={{ fontSize: 28, color: "#2dd4bf" }}>Engineering portfolio</div>
        <div style={{ fontSize: 84, fontWeight: 650, marginTop: 12 }}>
          Quang Anh
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#a1a1aa",
            marginTop: 16,
            maxWidth: 820,
          }}
        >
          Electronics, research, and community leadership.
        </div>
      </div>
    ),
    { ...size },
  );
}
