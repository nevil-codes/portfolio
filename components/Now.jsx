import { now } from "@/lib/content";

const cardClass =
  "flex flex-col gap-2.5 px-6 py-[22px] bg-surface border border-border rounded-[10px] no-underline text-inherit transition-colors";

export default function Now() {
  const last = now.items.length - 1;

  return (
    <section id="now" className="py-24 md:py-[88px] border-b border-border">
      <div className="font-mono text-[13px] text-amber mb-3">
        {now.sectionNumber} / {now.sectionLabel}
      </div>
      <h2 className="m-0 mb-4 text-[34px] font-semibold tracking-tight">{now.title}</h2>
      <p className="m-0 mb-11 font-mono text-sm text-dim">{now.eyebrow}</p>

      <div className="flex flex-col gap-3.5">
        {now.items.map((item, i) => {
          const body = (
            <>
              <div className="flex flex-wrap gap-2.5 items-baseline">
                <span className="font-mono text-[15px] font-semibold text-ink">{item.title}</span>
                {item.link && (
                  <span className="font-mono text-xs text-amber whitespace-nowrap">
                    view on github →
                  </span>
                )}
              </div>
              <p className="m-0 text-sm leading-relaxed text-muted text-pretty">
                {item.description}
              </p>
              {item.stack?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item.stack.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs text-muted bg-[#1c1c1a] border border-border px-[9px] py-1 rounded-[5px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </>
          );

          return (
            <div key={item.title} className="grid grid-cols-[28px_1fr] gap-3.5 items-start">
              <div className="flex flex-col items-center self-stretch pt-[26px]">
                <div className="w-[11px] h-[11px] rounded-full shrink-0 bg-amber shadow-[0_0_0_4px_#f59e0b26]" />
                {i !== last && <div className="w-px flex-1 min-h-[18px] mt-2 bg-border-strong" />}
              </div>

              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cardClass} hover:border-amber/40`}
                >
                  {body}
                </a>
              ) : (
                <div className={cardClass}>{body}</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
