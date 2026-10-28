// Class strings shared by the card-based sections.

export const cardClass =
  "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition duration-500 ease-out hover:-translate-y-1 hover:border-amber/40 has-[a:focus-visible]:outline has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-amber";

// The title link stretches over the whole card, so the card is clickable
// while the link's accessible name stays just the title.
export const stretchedLink = "text-ink no-underline outline-none after:absolute after:inset-0";

export const chipClass =
  "rounded-md border border-border bg-bg/60 px-2.5 py-1 font-mono text-[11.5px] text-muted";
