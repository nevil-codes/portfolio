import { now, section } from "@/lib/content";
import Section from "./Section";
import { cardClass, chipClass, stretchedLink } from "./ui";

// Status pill per item `tag` in content.json; unknown tags get the neutral style.
const tags = {
  learning: { text: "text-ink/80", ring: "border-ink/20", dot: "bg-ink/70" },
  building: { text: "text-amber", ring: "border-amber/30", dot: "bg-amber animate-pulse" },
  looking: { text: "text-mint", ring: "border-mint/30", dot: "bg-mint" },
};

export default function Now() {
  const s = section("now");
  if (!s) return null;

  const aside = now.updated ? (
    <p className="m-0 font-mono text-xs text-dim">Last updated {now.updated}</p>
  ) : null;

  return (
    <Section section={s} aside={aside}>
      <ol className="m-0 grid list-none gap-5 p-0 md:grid-cols-3">
        {now.items.map((item, i) => {
          const tag = tags[item.tag] ?? tags.learning;
          return (
            <li key={item.title} data-reveal style={{ "--delay": `${i * 100}ms` }}>
              <article className={`${cardClass} gap-5 p-7`}>
                <div className="flex items-center justify-between gap-3 font-mono text-xs">
                  {item.tag ? (
                    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 ${tag.ring} ${tag.text}`}>
                      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${tag.dot}`} />
                      {item.tag}
                    </span>
                  ) : (
                    <span />
                  )}
                  <span className="text-dim">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="m-0 font-serif font-normal text-[32px] leading-[1.05] tracking-[-0.01em]">
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className={stretchedLink}>
                      {item.title}
                    </a>
                  ) : (
                    item.title
                  )}
                </h3>
                <p className="m-0 text-[15px] leading-relaxed text-muted text-pretty">{item.description}</p>
                {item.stack?.length > 0 && (
                  <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                    {item.stack.map((t) => (
                      <li key={t} className={chipClass}>
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
                {item.link && (
                  <span aria-hidden="true" className="mt-auto font-mono text-xs text-muted transition-colors group-hover:text-amber">
                    View on GitHub ↗
                  </span>
                )}
              </article>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
