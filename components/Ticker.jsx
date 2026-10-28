import { stack, expandItem } from "@/lib/content";

// A slow ticker of everything in the stack, styled like a market feed.
// Decorative only — the Stack section lists the same items — so it's hidden
// from assistive tech.
export default function Ticker() {
  const items = [...new Set(stack.flatMap((g) => g.items.flatMap(expandItem)))];

  return (
    <div aria-hidden="true" className="relative overflow-hidden border-b border-border bg-surface/60 py-4">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="m-0 flex shrink-0 list-none items-center gap-7 p-0 pr-7 font-mono text-xs uppercase tracking-[0.18em] text-muted"
          >
            {items.map((item) => (
              <li key={item} className="flex items-center gap-7 whitespace-nowrap">
                <span>{item}</span>
                <span className="text-[9px] text-amber">▲</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
    </div>
  );
}
