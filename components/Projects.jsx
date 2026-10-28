import { projects, social, section } from "@/lib/content";
import Section from "./Section";
import ProjectVisual from "./ProjectVisual";
import { cardClass, chipClass, stretchedLink } from "./ui";

export default function Projects() {
  const s = section("work");
  if (!s) return null;

  return (
    <Section section={s}>
      <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 lg:grid-cols-12">
        {projects.map((p, i) => {
          // Rows alternate wide|narrow, then narrow|wide.
          const wide = i % 4 === 0 || i % 4 === 3;
          return (
            <li
              key={p.name}
              data-reveal
              style={{ "--delay": `${(i % 2) * 120}ms` }}
              className={wide ? "lg:col-span-7" : "lg:col-span-5"}
            >
              <article className={cardClass}>
                <div className="grid-paper relative h-[210px] sm:h-[250px] border-b border-border">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_50%,rgb(245_165_36/0.13),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="relative h-full px-3 py-2">
                    <ProjectVisual project={p} index={i} />
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
                  <div className="flex items-center justify-between gap-4 font-mono text-xs">
                    <span className="text-dim">
                      {String(i + 1).padStart(2, "0")} — {p.meta}
                    </span>
                    <span className="whitespace-nowrap text-amber">{p.lang}</span>
                  </div>
                  <h3 className="m-0 font-serif font-normal text-[34px] md:text-[40px] leading-none tracking-[-0.01em]">
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className={stretchedLink}>
                      {p.name}
                    </a>
                  </h3>
                  <p className="m-0 text-[15px] leading-relaxed text-muted text-pretty">{p.desc}</p>
                  <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-3">
                    {p.stack?.length > 0 ? (
                      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                        {p.stack.map((t) => (
                          <li key={t} className={chipClass}>
                            {t}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span />
                    )}
                    <span aria-hidden="true" className="font-mono text-xs text-muted transition-colors group-hover:text-amber">
                      GitHub{" "}
                      <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                        ↗
                      </span>
                    </span>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
      <a
        data-reveal
        href={social.github}
        target="_blank"
        rel="noopener noreferrer"
        className="u-link mt-10 inline-block font-mono text-[13px] text-muted no-underline hover:text-amber"
      >
        All repositories on GitHub ↗
      </a>
    </Section>
  );
}
