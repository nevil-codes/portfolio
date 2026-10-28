import { ImageResponse } from "next/og";
import { site, hero, resume, plain, emphasis } from "@/lib/content";
import { colors, loadFont } from "@/lib/og";

export const alt = `${site.name} — ${plain(hero.tagline)}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// A dot field fading out from the top-right corner, like the hero.
const dots = [];
for (let row = 0; row < 14; row++) {
  for (let col = 0; col < 26; col++) {
    const x = 30 + col * 46;
    const y = 24 + row * 44;
    const fade = Math.max(0, 1 - Math.hypot(x - 1060, y - 150) / 760);
    if (fade > 0.02) dots.push({ x, y, fade });
  }
}

// Amber crop marks at each corner, echoing the photo frame.
const edge = `2px solid ${colors.amber}`;
const corners = [
  { top: 36, left: 36, borderTop: edge, borderLeft: edge },
  { top: 36, right: 36, borderTop: edge, borderRight: edge },
  { bottom: 36, left: 36, borderBottom: edge, borderLeft: edge },
  { bottom: 36, right: 36, borderBottom: edge, borderRight: edge },
];

export default async function Image() {
  const [serif, serifItalic, mono] = await Promise.all([
    loadFont("InstrumentSerif-Regular.ttf"),
    loadFont("InstrumentSerif-Italic.ttf"),
    loadFont("JetBrainsMono-Regular.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          background: colors.bg,
          color: colors.ink,
          padding: "76px 84px",
          fontFamily: "Mono",
        }}
      >
        {dots.map((d) => (
          <div
            key={`${d.x}-${d.y}`}
            style={{
              position: "absolute",
              left: d.x,
              top: d.y,
              width: 3,
              height: 3,
              background: d.fade > 0.55 ? colors.amber : colors.ink,
              opacity: 0.08 + d.fade * 0.45,
            }}
          />
        ))}
        {corners.map((c, i) => (
          <div key={i} style={{ position: "absolute", width: 26, height: 26, ...c }} />
        ))}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22 }}>
          <div style={{ display: "flex", color: colors.ink }}>
            {site.domain}
            <span style={{ color: colors.amber }}>.{site.domainTld}</span>
          </div>
          {hero.status && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: colors.mint,
                border: "1px solid rgba(126, 224, 168, 0.35)",
                borderRadius: 999,
                padding: "8px 18px",
                background: "rgba(126, 224, 168, 0.07)",
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: 999, background: colors.mint, marginRight: 12 }} />
              {hero.status}
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Serif", fontSize: 150, lineHeight: 0.9, letterSpacing: "-0.02em" }}>{site.name}</div>
          <div style={{ display: "flex", fontFamily: "Serif", fontSize: 58, marginTop: 26 }}>
            {emphasis(hero.tagline).map((part, i) => (
              <span
                key={i}
                style={{
                  whiteSpace: "pre",
                  fontStyle: part.em ? "italic" : "normal",
                  color: part.em ? colors.amber : colors.ink,
                }}
              >
                {part.text}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, color: colors.dim }}>
          <span>{site.role}</span>
          <span>{resume.location}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Serif", data: serif, style: "normal", weight: 400 },
        { name: "Serif", data: serifItalic, style: "italic", weight: 400 },
        { name: "Mono", data: mono, style: "normal", weight: 400 },
      ],
    }
  );
}
