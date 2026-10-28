import Link from "next/link";
import MissingPath from "@/components/MissingPath";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-5 py-16">
      <div className="w-full max-w-[620px]">
        <p className="m-0 font-mono text-xs uppercase tracking-[0.2em] text-amber">404 — not found</p>
        <h1 className="m-0 mt-5 font-serif font-normal text-6xl md:text-8xl leading-[0.9] tracking-[-0.02em]">
          Lost in the <em className="text-amber">data</em>.
        </h1>

        <div className="mt-10 overflow-hidden rounded-xl border border-border-strong bg-raised font-mono text-[13px] leading-relaxed">
          <div className="border-b border-border px-4 py-2.5 text-[11px] text-dim">site.ipynb</div>
          <div className="overflow-x-auto px-4 py-4">
            <p className="m-0 whitespace-nowrap">
              <span className="text-amber">In [1]:</span> site.pages[<MissingPath />]
            </p>
            <p className="m-0 mt-2 whitespace-nowrap text-dim">----------------------------------------</p>
            <p className="m-0 whitespace-nowrap">
              <span className="text-amber">KeyError</span>: <MissingPath />
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-[15px] font-medium text-bg no-underline transition-colors hover:bg-amber-light"
        >
          ← Back to the homepage
        </Link>
      </div>
    </main>
  );
}
