// Small line-art illustrations for project cards, picked by `visual` in
// content.json ("pipeline" | "chart" | "phone" | "heatmap"). Projects without
// one get a monogram. Motion is plain CSS (see globals.css), so these stay
// server-rendered.

const CREAM = "#efeae1";
const AMBER = "#f5a524";
const SURFACE = "#141310";
const BG = "#0c0b09";
const DIM = "#8b8678";

const svgProps = {
  viewBox: "0 0 480 240",
  className: "h-full w-full",
  preserveAspectRatio: "xMidYMid meet",
  "aria-hidden": true,
  focusable: "false",
};

function Label({ x, y, anchor = "start", color = DIM, size = 11, children }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fill={color} fontSize={size} className="font-mono">
      {children}
    </text>
  );
}

// PDFragen: pdf → chunk → embed → chroma → ollama → answer, with packets flowing through.
function Pipeline() {
  const y = 126;
  const xs = [44, 122, 200, 278, 356, 434];
  const labels = ["pdf", "chunk", "embed", "chroma", "ollama", "answer"];

  return (
    <svg {...svgProps}>
      <Label x={24} y={38}>rag.pipeline(pdf, question)</Label>
      <Label x={456} y={38} anchor="end" color={AMBER}>
        ● fully local
      </Label>

      {xs.slice(0, -1).map((x, i) => (
        <line
          key={x}
          x1={x + 24}
          x2={xs[i + 1] - 24}
          y1={y}
          y2={y}
          stroke={CREAM}
          strokeOpacity="0.35"
          strokeWidth="1.5"
          className="viz-dash"
        />
      ))}
      {[0, 1.4, 2.8].map((delay) => (
        <circle
          key={delay}
          cx={xs[0]}
          cy={y}
          r="3.5"
          fill={AMBER}
          className="viz-packet"
          style={{ "--travel": `${xs[5] - xs[0]}px`, "--delay": `${delay}s` }}
        />
      ))}

      {/* pdf */}
      <g stroke={CREAM} strokeOpacity="0.7" strokeWidth="1.5" fill={SURFACE}>
        <path d={`M${xs[0] - 16} ${y - 22} h22 l10 10 v34 h-32 z`} />
        <path d={`M${xs[0] + 6} ${y - 22} v10 h10`} fill="none" />
        <path d={`M${xs[0] - 9} ${y - 3} h18 M${xs[0] - 9} ${y + 4} h18 M${xs[0] - 9} ${y + 11} h11`} strokeOpacity="0.35" />
      </g>
      {/* chunks */}
      <g fill={SURFACE} strokeWidth="1.5">
        <rect x={xs[1] - 15} y={y - 19} width="26" height="9" rx="2" stroke={CREAM} strokeOpacity="0.5" />
        <rect x={xs[1] - 11} y={y - 5} width="26" height="9" rx="2" stroke={AMBER} />
        <rect x={xs[1] - 15} y={y + 9} width="26" height="9" rx="2" stroke={CREAM} strokeOpacity="0.5" />
      </g>
      {/* embedding vector */}
      <rect x={xs[2] - 20} y={y - 20} width="40" height="40" rx="7" fill={SURFACE} stroke={CREAM} strokeOpacity="0.35" strokeWidth="1.5" />
      {[14, 24, 9, 19, 12].map((h, i) => (
        <rect
          key={i}
          x={xs[2] - 13 + i * 6}
          y={y + 11 - h}
          width="3.5"
          height={h}
          rx="1"
          fill={i % 2 ? CREAM : AMBER}
          fillOpacity={i % 2 ? 0.5 : 0.9}
        />
      ))}
      {/* vector store */}
      <g stroke={CREAM} strokeOpacity="0.7" strokeWidth="1.5" fill={SURFACE}>
        <path d={`M${xs[3] - 18} ${y - 14} v28 a18 6 0 0 0 36 0 v-28`} />
        <ellipse cx={xs[3]} cy={y - 14} rx="18" ry="6" />
        <path d={`M${xs[3] - 18} ${y} a18 6 0 0 0 36 0`} fill="none" strokeOpacity="0.3" />
      </g>
      {/* local llm */}
      <rect x={xs[4] - 19} y={y - 19} width="38" height="38" rx="10" fill={SURFACE} stroke={AMBER} strokeWidth="1.5" />
      <path
        d={`M${xs[4]} ${y - 10} L${xs[4] + 3} ${y - 3} L${xs[4] + 10} ${y} L${xs[4] + 3} ${y + 3} L${xs[4]} ${y + 10} L${xs[4] - 3} ${y + 3} L${xs[4] - 10} ${y} L${xs[4] - 3} ${y - 3} Z`}
        fill={AMBER}
      />
      {/* answer */}
      <path
        d={`M${xs[5] - 17} ${y - 17} H${xs[5] + 17} A5 5 0 0 1 ${xs[5] + 22} ${y - 12} V${y + 6} A5 5 0 0 1 ${xs[5] + 17} ${y + 11} H${xs[5] - 8} L${xs[5] - 15} ${y + 18} V${y + 11} H${xs[5] - 17} A5 5 0 0 1 ${xs[5] - 22} ${y + 6} V${y - 12} A5 5 0 0 1 ${xs[5] - 17} ${y - 17} Z`}
        fill={SURFACE}
        stroke={AMBER}
        strokeWidth="1.5"
      />
      <path d={`M${xs[5] - 13} ${y - 7} h26 M${xs[5] - 13} ${y + 1} h17`} stroke={CREAM} strokeOpacity="0.5" strokeWidth="1.5" />

      {xs.map((x, i) => (
        <Label key={x} x={x} y={y + 50} anchor="middle">
          {labels[i]}
        </Label>
      ))}
    </svg>
  );
}

// Delivery KPI: orders per hour by weekday against a bonus target. Shape only — no real values.
function Chart() {
  const bars = [0.55, 0.62, 0.5, 0.68, 0.8, 0.9, 0.72];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const top = 62;
  const base = 192;
  const h = base - top;
  const left = 56;
  const right = 452;
  const step = (right - left) / bars.length;
  const target = 0.7;
  const ty = base - target * h;

  return (
    <svg {...svgProps}>
      <Label x={24} y={38}>orders / hour</Label>
      <Label x={456} y={38} anchor="end">
        by weekday
      </Label>
      {[0.25, 0.5, 0.75, 1].map((g) => (
        <line key={g} x1={left} x2={right} y1={base - g * h} y2={base - g * h} stroke={CREAM} strokeOpacity="0.06" />
      ))}
      <line x1={left} x2={right} y1={base} y2={base} stroke={CREAM} strokeOpacity="0.3" />
      {bars.map((v, i) => {
        const x = left + i * step + step * 0.2;
        const w = step * 0.6;
        const hit = v >= target;
        return (
          <g key={i}>
            <rect
              x={x}
              y={base - v * h}
              width={w}
              height={v * h}
              rx="3"
              fill={hit ? AMBER : CREAM}
              fillOpacity={hit ? 0.9 : 0.2}
              className="viz-bar"
              style={{ "--delay": `${i * 70}ms` }}
            />
            <Label x={x + w / 2} y={base + 22} anchor="middle">
              {days[i]}
            </Label>
          </g>
        );
      })}
      <line x1={left - 10} x2={right + 6} y1={ty} y2={ty} stroke={AMBER} strokeWidth="1.5" className="viz-dash" />
      <Label x={left} y={ty - 9} color={AMBER}>
        bonus target
      </Label>
    </svg>
  );
}

// QLess: price comparison across stores, reserve, live sync.
function Phone() {
  const px = 112;
  const py = 16;
  const pw = 108;
  const ph = 208;
  const rows = [
    { y: 70, price: "€1.29" },
    { y: 100, price: "€1.19", best: true },
    { y: 130, price: "€1.49" },
  ];
  const notes = [
    { y: 52, text: "compare prices", from: 82 },
    { y: 104, text: "reserve & collect", from: 178 },
    { y: 156, text: "live sync · firebase", from: 200, live: true },
  ];

  return (
    <svg {...svgProps}>
      <rect x={px} y={py} width={pw} height={ph} rx="18" fill={SURFACE} stroke={CREAM} strokeOpacity="0.5" strokeWidth="1.5" />
      <rect x={px + pw / 2 - 16} y={py + 8} width="32" height="6" rx="3" fill={CREAM} fillOpacity="0.15" />
      <rect x={px + 12} y={py + 26} width={pw - 24} height="16" rx="8" fill={CREAM} fillOpacity="0.05" stroke={CREAM} strokeOpacity="0.15" />
      <circle cx={px + 22} cy={py + 34} r="3.5" fill="none" stroke={CREAM} strokeOpacity="0.5" />
      <rect x={px + 30} y={py + 32} width="40" height="4" rx="2" fill={CREAM} fillOpacity="0.25" />
      {rows.map((r) => (
        <g key={r.y}>
          <rect
            x={px + 12}
            y={r.y}
            width={pw - 24}
            height="24"
            rx="6"
            fill={r.best ? AMBER : CREAM}
            fillOpacity={r.best ? 0.12 : 0.04}
            stroke={r.best ? AMBER : CREAM}
            strokeOpacity={r.best ? 0.9 : 0.12}
          />
          <circle cx={px + 22} cy={r.y + 12} r="4" fill={CREAM} fillOpacity="0.3" />
          <rect x={px + 31} y={r.y + 10} width="22" height="4" rx="2" fill={CREAM} fillOpacity="0.3" />
          <Label x={px + pw - 18} y={r.y + 16} anchor="end" size={10} color={r.best ? AMBER : CREAM}>
            {r.price}
          </Label>
        </g>
      ))}
      <rect x={px + 12} y={166} width={pw - 24} height="24" rx="12" fill={AMBER} />
      <Label x={px + pw / 2} y={182} anchor="middle" size={10} color={BG}>
        reserve
      </Label>
      <rect x={px + pw / 2 - 18} y={py + ph - 10} width="36" height="3" rx="1.5" fill={CREAM} fillOpacity="0.3" />

      {notes.map((n) => (
        <g key={n.text}>
          <path
            d={`M${px + pw + 4} ${n.from} C${px + pw + 24} ${n.from}, ${258} ${n.y + 16}, ${266} ${n.y + 16}`}
            fill="none"
            stroke={CREAM}
            strokeOpacity="0.3"
            className="viz-dash"
          />
          <rect x={266} y={n.y} width="190" height="32" rx="16" fill={SURFACE} stroke={CREAM} strokeOpacity="0.18" />
          <circle cx={284} cy={n.y + 16} r="3.5" fill={n.live ? "#7ee0a8" : AMBER} />
          {n.live && <circle cx={284} cy={n.y + 16} r="3.5" fill="none" stroke="#7ee0a8" className="viz-pulse" />}
          <Label x={296} y={n.y + 20} color={CREAM} size={11.5}>
            {n.text}
          </Label>
        </g>
      ))}
    </svg>
  );
}

// EverTrack: a habit heatmap with an expense sparkline underneath.
function Heatmap({ id }) {
  const cols = 26;
  const rows = 7;
  const pitch = 15;
  const size = 11;
  const x0 = 40;
  const y0 = 50;
  const width = cols * pitch - 4;
  const levels = [0.07, 0.28, 0.5, 0.72, 1];
  // Deterministic pseudo-random levels that trend upward over time.
  const level = (c, r) => Math.min(4, Math.floor((((c * 7919 + r * 104729) % 97) / 97) * 2.6 + (c / cols) * 2.2));
  const spend = [10, 16, 9, 20, 14, 24, 12, 19, 11, 23, 17, 13, 21, 15];
  const sx = (i) => x0 + (i * width) / (spend.length - 1);
  const sy = (v) => 224 - v;
  const points = spend.map((v, i) => `${sx(i)},${sy(v)}`).join(" ");
  const last = spend.length - 1;

  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={AMBER} stopOpacity="0.28" />
          <stop offset="1" stopColor={AMBER} stopOpacity="0" />
        </linearGradient>
      </defs>
      <Label x={x0} y={38}>habits</Label>
      <Label x={x0 + width - 100} y={38} anchor="end">
        less
      </Label>
      {levels.map((o, i) => (
        <rect key={o} x={x0 + width - 94 + i * 12} y={29} width="9" height="9" rx="2" fill={i ? AMBER : CREAM} fillOpacity={o} />
      ))}
      <Label x={x0 + width} y={38} anchor="end">
        more
      </Label>

      {Array.from({ length: cols * rows }, (_, k) => {
        const c = Math.floor(k / rows);
        const r = k % rows;
        const l = level(c, r);
        return (
          <rect
            key={k}
            x={x0 + c * pitch}
            y={y0 + r * pitch}
            width={size}
            height={size}
            rx="2.5"
            fill={l ? AMBER : CREAM}
            fillOpacity={levels[l]}
            className="viz-cell"
            style={{ "--delay": `${c * 28}ms` }}
          />
        );
      })}

      <Label x={x0} y={182}>expenses</Label>
      <polygon points={`${x0},224 ${points} ${sx(last)},224`} fill={`url(#${id})`} />
      <polyline points={points} fill="none" stroke={AMBER} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx={sx(last)} cy={sy(spend[last])} r="3" fill={AMBER} />
      <circle cx={sx(last)} cy={sy(spend[last])} r="3" fill="none" stroke={AMBER} className="viz-pulse" />
    </svg>
  );
}

function Monogram({ name, lang }) {
  return (
    <svg {...svgProps}>
      <Label x={24} y={38}>{lang}</Label>
      <text
        x="240"
        y="184"
        textAnchor="middle"
        fontSize="170"
        fill="none"
        stroke={AMBER}
        strokeOpacity="0.8"
        strokeWidth="1.2"
        className="font-serif"
      >
        {name.charAt(0)}
      </text>
    </svg>
  );
}

const visuals = { pipeline: Pipeline, chart: Chart, phone: Phone, heatmap: Heatmap };

export default function ProjectVisual({ project, index }) {
  const Visual = visuals[project.visual];
  if (!Visual) return <Monogram name={project.name} lang={project.lang} />;
  return <Visual id={`viz-${index}`} />;
}
