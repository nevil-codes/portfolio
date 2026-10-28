import { certifications, section } from "@/lib/content";
import Section from "./Section";
import { cardClass, stretchedLink } from "./ui";

export default function Certifications() {
  const s = section("certifications");
  if (!s) return null;

  return (
    <Section section={s}>
      <ul className="m-0 grid list-none gap-5 p-0 md:grid-cols-2">
        {certifications.map((c, i) => (
          <li key={c.name} data-reveal style={{ "--delay": `${(i % 2) * 100}ms` }}>
            <article className={`${cardClass} gap-10 p-7 md:p-8`}>
              <div className="flex items-start justify-between gap-4">
                <Seal />
                <span className="font-mono text-xs text-dim">{c.year}</span>
              </div>
              <div>
                <h3 className="m-0 font-serif font-normal text-[28px] md:text-[32px] leading-[1.1] tracking-[-0.01em] text-balance">
                  <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer" className={stretchedLink}>
                    {c.name}
                  </a>
                </h3>
                <p className="m-0 mt-3 text-[15px] text-muted">{c.issuer}</p>
              </div>
              <span aria-hidden="true" className="mt-auto font-mono text-xs text-amber">
                Verify credential{" "}
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  ↗
                </span>
              </span>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Seal() {
  return (
    <svg viewBox="0 0 44 44" className="h-11 w-11" aria-hidden="true">
      <circle
        cx="22"
        cy="22"
        r="20"
        fill="none"
        stroke="#f5a524"
        strokeOpacity="0.5"
        strokeDasharray="2 3.2"
        className="origin-center transition-transform duration-[1.6s] ease-out [transform-box:fill-box] group-hover:rotate-90"
      />
      <circle cx="22" cy="22" r="14" fill="rgb(245 165 36 / 0.1)" stroke="#f5a524" />
      <path d="M16 22.5l4 4 8-8.5" fill="none" stroke="#f5a524" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
