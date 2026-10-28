import { Fragment } from "react";
import { hero, social, site, resume, emphasis } from "@/lib/content";
import DataField from "./DataField";
import LocalTime from "./LocalTime";
import Photo from "./Photo";
import ProfileCard from "./ProfileCard";

const btnPrimary =
  "group inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-[15px] font-medium text-bg no-underline transition-colors hover:bg-amber-light";
const btnGhost =
  "inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-[15px] font-medium text-ink no-underline transition-colors hover:border-amber hover:text-amber";
const btnLink = "u-link mx-2 py-1 font-mono text-[13px] text-muted no-underline hover:text-ink";

export default function Hero() {
  const [first, ...rest] = hero.heading.split(" ");

  return (
    <header id="top" className="relative isolate overflow-hidden border-b border-border">
      {/* Single-column layouts keep the dots up behind the name, clear of the paragraph. */}
      <DataField className="absolute inset-0 -z-10 h-full w-full [mask-image:radial-gradient(ellipse_80%_70%_at_70%_40%,#000_15%,transparent_80%)] max-lg:[mask-image:radial-gradient(ellipse_100%_32%_at_80%_18%,#000_15%,transparent_80%)]" />

      <div className="max-w-content mx-auto px-5 sm:px-8 md:px-12 pt-28 md:pt-32 pb-20 md:pb-28">
        <div
          className="hero-in flex flex-wrap items-center justify-between gap-x-6 gap-y-3 font-mono text-xs text-muted"
          style={{ "--d": "0ms" }}
        >
          {hero.status && (
            <span className="inline-flex items-center gap-2.5 rounded-full border border-mint/25 bg-mint/[0.07] px-3.5 py-1.5 text-mint">
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
              </span>
              {hero.status}
            </span>
          )}
          <span className="inline-flex items-center gap-2.5">
            <span>{resume.location}</span>
            <span aria-hidden="true" className="text-border-strong">/</span>
            <LocalTime timeZone={site.timeZone} />
          </span>
        </div>

        <div className="mt-12 md:mt-14 grid items-end gap-16 lg:gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            <p className="hero-in m-0 font-mono text-sm text-amber" style={{ "--d": "80ms" }}>
              {hero.kicker}
            </p>
            <h1 className="m-0 mt-6 font-serif font-normal text-[clamp(4.5rem,11vw,10rem)] leading-[0.84] tracking-[-0.025em]">
              <span className="hero-in block" style={{ "--d": "140ms" }}>
                {first}
              </span>
              {rest.length > 0 && (
                <>
                  {" "}
                  <span className="hero-in block pl-[0.5em]" style={{ "--d": "260ms" }}>
                    {rest.join(" ")}
                  </span>
                </>
              )}
            </h1>
            {hero.tagline && (
              <p
                className="hero-in m-0 mt-10 max-w-[19ch] font-serif text-[2rem] sm:text-4xl md:text-[2.75rem] leading-[1.08] text-ink text-balance"
                style={{ "--d": "380ms" }}
              >
                {emphasis(hero.tagline).map((part, i) =>
                  part.em ? (
                    <em key={i} className="text-amber">
                      {part.text}
                    </em>
                  ) : (
                    <Fragment key={i}>{part.text}</Fragment>
                  )
                )}
              </p>
            )}
            <p
              className="hero-in m-0 mt-6 max-w-[48ch] text-[17px] md:text-lg leading-relaxed text-muted text-pretty"
              style={{ "--d": "480ms" }}
            >
              {hero.intro}
            </p>
            <div className="hero-in mt-10 flex flex-wrap items-center gap-3" style={{ "--d": "580ms" }}>
              <a href="#work" className={btnPrimary}>
                See my work
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5">
                  ↓
                </span>
              </a>
              <a href={`mailto:${social.email}`} className={btnGhost}>
                Email me
              </a>
              <a href={social.github} target="_blank" rel="noopener noreferrer" className={btnLink}>
                GitHub ↗
              </a>
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className={btnLink}>
                LinkedIn ↗
              </a>
            </div>
          </div>

          <div className="relative w-full max-w-[340px] mx-auto lg:mx-0">
            <div className="hero-in" style={{ "--d": "200ms" }}>
              <Photo />
            </div>
            <div
              className="hero-in relative z-10 -mt-24 ml-auto w-[min(100%,292px)] xl:absolute xl:-left-36 xl:bottom-10 xl:mt-0 xl:ml-0"
              style={{ "--d": "700ms" }}
            >
              <ProfileCard />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
