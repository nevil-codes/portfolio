import { social, site, section, handle } from "@/lib/content";
import { Eyebrow } from "./Section";
import CopyEmail from "./CopyEmail";

const links = [
  { href: social.github, label: "GitHub" },
  { href: social.linkedin, label: "LinkedIn" },
  { href: social.leetcode, label: "LeetCode" },
  { href: social.hackerrank, label: "HackerRank" },
].filter((l) => l.href);

export default function Footer() {
  const s = section("contact");
  const words = s.title.split(" ");
  const lastWord = words.pop();

  return (
    <footer id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[560px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(245_165_36/0.09),transparent)]"
      />
      <div className="max-w-content mx-auto px-5 sm:px-8 md:px-12 pt-24 md:pt-36 pb-10">
        <div data-reveal>
          <Eyebrow number={s.number} label={s.label} />
          <h2
            id="contact-title"
            className="m-0 mt-6 font-serif font-normal text-[clamp(4.5rem,14vw,12rem)] leading-[0.85] tracking-[-0.03em]"
          >
            {words.join(" ")} <em className="text-amber">{lastWord}</em>
          </h2>
          {s.text && (
            <p className="m-0 mt-8 max-w-[52ch] text-lg leading-relaxed text-muted text-pretty">{s.text}</p>
          )}
        </div>

        <div data-reveal style={{ "--delay": "120ms" }} className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-4">
          <a
            href={`mailto:${social.email}`}
            className="u-link break-all font-mono text-xl sm:text-2xl md:text-3xl text-ink no-underline hover:text-amber"
          >
            {social.email}
          </a>
          <CopyEmail email={social.email} />
        </div>

        <ul
          data-reveal
          style={{ "--delay": "200ms" }}
          className="m-0 mt-16 grid list-none grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border p-0 sm:grid-cols-2 lg:grid-cols-4"
        >
          {links.map((l) => (
            <li key={l.label} className="bg-bg">
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-center justify-between gap-4 px-6 py-6 no-underline transition-colors hover:bg-surface"
              >
                <span>
                  <span className="block text-lg text-ink transition-colors group-hover:text-amber">{l.label}</span>
                  <span className="mt-1 block font-mono text-xs text-dim">{handle(l.href)}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="font-mono text-muted transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber"
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 font-mono text-xs text-dim">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span className="hidden md:inline">Set in Instrument Serif, Instrument Sans &amp; JetBrains Mono · Built with Next.js</span>
          <a href="#top" className="u-link text-muted no-underline hover:text-ink">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
