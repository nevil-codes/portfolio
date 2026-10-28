// Helpers for build-time images (share card, favicons). Fonts are vendored
// in assets/fonts so rendering never depends on the network.
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const colors = {
  bg: "#0c0b09",
  ink: "#efeae1",
  muted: "#a8a294",
  dim: "#8b8678",
  amber: "#f5a524",
  mint: "#7ee0a8",
};

export function loadFont(file) {
  return readFile(join(process.cwd(), "assets/fonts", file));
}

// The "N." mark used for the favicon and home-screen icon.
export async function markResponse({ width, height }, { radius = 0 } = {}) {
  const serif = await loadFont("InstrumentSerif-Regular.ttf");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: colors.bg,
          borderRadius: radius,
          color: colors.ink,
          fontFamily: "Serif",
          fontSize: height * 0.86,
          lineHeight: 1,
          paddingBottom: height * 0.06,
        }}
      >
        N<span style={{ color: colors.amber }}>.</span>
      </div>
    ),
    { width, height, fonts: [{ name: "Serif", data: serif, style: "normal", weight: 400 }] }
  );
}
