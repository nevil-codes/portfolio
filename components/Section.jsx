// Shared shell for every numbered section: eyebrow, serif title, optional
// intro on the right, then the section's own content.
export default function Section({ section, aside, children }) {
  return (
    <section
      id={section.key}
      aria-labelledby={`${section.key}-title`}
      className="border-b border-border"
    >
      <div className="max-w-content mx-auto px-5 sm:px-8 md:px-12 py-24 md:py-32">
        <div
          data-reveal
          className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,400px)] md:items-end mb-12 md:mb-16"
        >
          <div>
            <Eyebrow number={section.number} label={section.label} />
            <h2
              id={`${section.key}-title`}
              className="m-0 mt-5 font-serif font-normal text-[44px] sm:text-6xl md:text-7xl leading-[0.95] tracking-[-0.01em] text-balance"
            >
              {section.title}
            </h2>
          </div>
          {(section.intro || aside) && (
            <div className="flex flex-col gap-3 md:pb-2">
              {section.intro && (
                <p className="m-0 text-base md:text-lg leading-relaxed text-muted text-pretty">
                  {section.intro}
                </p>
              )}
              {aside}
            </div>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({ number, label }) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-amber">
      <span>{number}</span>
      <span aria-hidden="true" className="h-px w-10 bg-amber/50" />
      <span>{label}</span>
    </div>
  );
}
