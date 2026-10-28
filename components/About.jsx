import { about, education, section, formatCoords, distanceKm } from "@/lib/content";
import Section from "./Section";

export default function About() {
  const s = section("about");

  return (
    <Section section={s}>
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        <p
          data-reveal
          className="m-0 lg:col-span-7 font-serif text-[28px] sm:text-[34px] md:text-[40px] leading-[1.18] tracking-[-0.005em] text-ink text-pretty"
        >
          {about.text}
        </p>

        <div data-reveal style={{ "--delay": "120ms" }} className="lg:col-span-5 lg:pl-6">
          <h3 className="m-0 mb-8 font-mono text-xs font-normal uppercase tracking-[0.2em] text-dim">
            {s.educationTitle}
          </h3>
          <ol className="m-0 list-none p-0">
            {education.map((e, i) => {
              const next = education[i + 1];
              const km = e.coords && next?.coords ? distanceKm(e.coords, next.coords) : null;
              return (
                <li key={e.degree} className="relative pl-9 pb-2">
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-1 h-3 w-3 rounded-full border-2 ${
                      i === 0 ? "border-amber bg-amber/30 shadow-[0_0_0_5px_rgb(245_165_36/0.12)]" : "border-border-strong bg-bg"
                    }`}
                  />
                  {next && (
                    <span aria-hidden="true" className="absolute bottom-0 left-[5px] top-6 border-l border-dashed border-border-strong" />
                  )}
                  <p className="m-0 font-mono text-xs text-amber">{e.years}</p>
                  <h4 className="m-0 mt-2 text-lg font-semibold leading-snug text-ink">{e.degree}</h4>
                  <p className="m-0 mt-1 text-[15px] leading-relaxed text-muted">{e.school}</p>
                  {e.coords && <p className="m-0 mt-2 font-mono text-[11px] text-dim">{formatCoords(e.coords)}</p>}
                  {next && (
                    <div className="my-8 font-mono text-[11px] text-dim">
                      {km && `${km.toLocaleString("en")} km apart`}
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}
