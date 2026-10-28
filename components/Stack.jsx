import { stack, section } from "@/lib/content";
import Section from "./Section";

const columns = "md:grid-cols-[260px_minmax(0,1fr)] md:gap-x-6";

// The stack, printed like a pandas DataFrame.
export default function Stack() {
  const s = section("stack");
  if (!s) return null;

  return (
    <Section section={s}>
      <div data-reveal className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3 font-mono text-xs text-dim">
          <span>
            <span className="text-amber">In [2]:</span> <span className="text-ink">stack</span>
          </span>
          <span>{stack.length} rows × 3 columns</span>
        </div>

        <div
          aria-hidden="true"
          className={`hidden md:grid ${columns} border-b border-border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-dim`}
        >
          <span className="flex gap-4">
            <span className="w-8" />
            category
          </span>
          <span className="flex justify-between">
            items <span>n</span>
          </span>
        </div>

        <dl className="m-0">
          {stack.map((group, i) => (
            <div
              key={group.label}
              className={`grid gap-y-3 ${columns} border-b border-border px-5 py-5 last:border-b-0 transition-colors hover:bg-raised/60`}
            >
              <dt className="flex items-baseline gap-4">
                <span aria-hidden="true" className="w-8 shrink-0 font-mono text-xs text-dim">
                  {i}
                </span>
                <span className="font-mono text-sm text-ink">{group.label}</span>
              </dt>
              <dd className="m-0 flex items-start gap-4 pl-12 md:pl-0">
                <ul className="m-0 flex flex-1 list-none flex-wrap gap-2 p-0">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className={`rounded-md border px-3 py-1.5 font-mono text-[13px] transition-colors ${
                        group.learning
                          ? "border-dashed border-amber/40 bg-amber/[0.04] text-amber-light"
                          : "border-border bg-bg/70 text-ink hover:border-border-strong"
                      }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <span aria-hidden="true" className="hidden w-8 shrink-0 pt-1.5 text-right font-mono text-xs text-dim md:block">
                  {group.items.length}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
