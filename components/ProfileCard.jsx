import { Fragment } from "react";
import { hero, site } from "@/lib/content";

const TYPE_START = 900; // ms after load the prompt starts typing
const TYPE_STEP = 55; // ms per character, matches .type in globals.css

// A notebook cell that "prints" hero.profile as a pandas Series.
export default function ProfileCard({ className = "" }) {
  const rows = Object.entries(hero.profile ?? {});
  if (!rows.length) return null;

  const name = site.name.split(" ")[0].toLowerCase();
  const prompt = `df.loc["${name}"]`;
  const outputAt = TYPE_START + prompt.length * TYPE_STEP + 150;

  return (
    <figure
      className={`m-0 overflow-hidden rounded-xl border border-border-strong bg-raised/90 font-mono text-[12px] leading-relaxed shadow-[0_24px_60px_-12px_rgb(0_0_0/0.75)] backdrop-blur-md ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <span className="ml-2 text-[11px] text-dim">profile.ipynb</span>
      </div>
      <div className="px-4 py-3.5">
        <p className="m-0 whitespace-nowrap">
          <span className="text-amber">In [1]:</span>{" "}
          <span className="type text-ink" style={{ "--n": prompt.length, "--d": `${TYPE_START}ms` }}>
            {prompt}
          </span>
        </p>
        <div className="hero-in" style={{ "--d": `${outputAt}ms` }}>
          <p className="m-0 mt-2 text-dim">Out[1]:</p>
          <dl className="m-0 mt-1 grid grid-cols-[auto_1fr] gap-x-5">
            {rows.map(([key, value]) => (
              <Fragment key={key}>
                <dt className="text-dim">{key}</dt>
                <dd className="m-0 text-ink">{value}</dd>
              </Fragment>
            ))}
          </dl>
          <p className="m-0 mt-1 text-dim">
            Name: {name}, dtype: object
          </p>
        </div>
        <p className="m-0 mt-3">
          <span className="text-amber">In [2]:</span> <span aria-hidden="true" className="caret" />
        </p>
      </div>
    </figure>
  );
}
