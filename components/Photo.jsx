import Image from "next/image";
import photo from "@/public/images/nevil.jpg";
import { site, resume } from "@/lib/content";

// Amber crop marks at each corner, like a print proof.
const corners = [
  "left-0 top-0 border-l border-t",
  "right-0 top-0 border-r border-t",
  "left-0 bottom-0 border-l border-b",
  "right-0 bottom-0 border-r border-b",
];

export default function Photo() {
  return (
    <figure className="relative m-0 p-3">
      {corners.map((c) => (
        <span key={c} aria-hidden="true" className={`absolute h-5 w-5 border-amber/80 ${c}`} />
      ))}
      <div className="group relative aspect-[4/5] overflow-hidden rounded-md bg-surface">
        <Image
          src={photo}
          alt={`Portrait of ${site.name}`}
          fill
          priority
          placeholder="blur"
          sizes="(min-width: 1024px) 360px, (min-width: 768px) 320px, 80vw"
          className="object-cover object-top grayscale sepia-[.22] contrast-[1.06] brightness-[.92] transition duration-700 ease-out group-hover:grayscale-0 group-hover:sepia-0 group-hover:brightness-100 group-hover:scale-[1.03]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-bg/70 via-bg/0 to-bg/0" />
      </div>
      <figcaption className="absolute left-full top-3 ml-1 hidden whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.22em] text-dim [writing-mode:vertical-rl] lg:block">
        fig. 1 — {site.name}, {resume.location}
      </figcaption>
    </figure>
  );
}
