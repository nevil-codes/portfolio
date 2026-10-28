import { writing, section } from "@/lib/content";
import Section from "./Section";

// Hidden until writing.posts in content.json has at least one entry.
export default function Writing() {
  const s = section("writing");
  if (!s) return null;

  return (
    <Section section={s}>
      <ul className="m-0 list-none border-t border-border p-0">
        {writing.posts.map((post) => {
          const external = /^https?:\/\//.test(post.url);
          return (
            <li key={post.url} data-reveal className="border-b border-border">
              <a
                href={post.url}
                {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                className="group grid gap-2 py-7 no-underline md:grid-cols-[160px_minmax(0,1fr)_auto] md:items-baseline md:gap-8"
              >
                <span className="font-mono text-xs text-dim">{post.date}</span>
                <span>
                  <span className="block font-serif text-3xl leading-tight text-ink transition-colors group-hover:text-amber">
                    {post.title}
                  </span>
                  {post.summary && <span className="mt-2 block text-[15px] text-muted">{post.summary}</span>}
                </span>
                <span aria-hidden="true" className="hidden font-mono text-sm text-muted transition-colors group-hover:text-amber md:block">
                  {external ? "↗" : "→"}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
