"use client";

import { useEffect, useState } from "react";
import { resumeUrl, site, social, visibleSections } from "@/lib/content";
import { openPalette } from "./CommandPalette";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [shortcut, setShortcut] = useState("⌘K");

  useEffect(() => {
    const platform = navigator.userAgentData?.platform ?? navigator.platform ?? "";
    if (!/mac|iphone|ipad/i.test(platform)) setShortcut("Ctrl K");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: whichever section crosses the middle of the viewport is active.
  useEffect(() => {
    const ids = ["top", ...visibleSections.map((s) => s.key)];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id === "top" ? null : entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // The menu is hidden from lg up, so close it when the viewport grows past
  // that (e.g. a tablet rotating) — otherwise its scroll lock would stay on.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => e.matches && setOpen(false);
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKeyDown);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <nav
      aria-label="Main"
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? "border-border bg-bg/80 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <div className="max-w-content mx-auto flex items-center justify-between gap-6 px-5 sm:px-8 md:px-12 py-4">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="font-mono text-sm font-medium tracking-wide text-ink no-underline"
        >
          {site.domain}
          <span className="text-amber">.{site.domainTld}</span>
        </a>

        <ul className="m-0 hidden list-none items-center gap-1 p-0 lg:flex">
          {visibleSections.map((s) => (
            <li key={s.key}>
              <a
                href={`#${s.key}`}
                aria-current={active === s.key ? "true" : undefined}
                className={`relative rounded-full px-3 py-1.5 text-sm capitalize no-underline transition-colors ${
                  active === s.key ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {s.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-amber transition-opacity ${
                    active === s.key ? "opacity-100" : "opacity-0"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openPalette}
            aria-label="Open command menu"
            aria-keyshortcuts="Meta+K Control+K"
            title="Command menu"
            className="hidden items-center rounded-full border border-border-strong px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-amber hover:text-ink lg:inline-flex"
          >
            {shortcut}
          </button>
          <a
            href={resumeUrl}
            className="hidden rounded-full bg-amber px-4 py-1.5 font-mono text-xs font-medium text-bg no-underline transition-colors hover:bg-amber-light sm:inline-flex"
          >
            Resume →
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="rounded-full border border-border-strong px-3.5 py-1.5 font-mono text-xs text-muted transition-colors hover:border-amber hover:text-ink lg:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="h-[calc(100dvh-61px)] animate-fade overflow-y-auto border-t border-border px-5 pb-10 pt-4 sm:px-8 lg:hidden"
        >
          <ul className="m-0 list-none p-0">
            {visibleSections.map((s) => (
              <li key={s.key} className="border-b border-border">
                <a
                  href={`#${s.key}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-5 no-underline"
                >
                  <span className="font-serif text-4xl capitalize text-ink">{s.label}</span>
                  <span className="font-mono text-xs text-dim">{s.number}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={resumeUrl}
              onClick={() => setOpen(false)}
              className="rounded-full bg-amber px-5 py-2.5 font-mono text-[13px] font-medium text-bg no-underline"
            >
              Resume →
            </a>
            <a
              href={`mailto:${social.email}`}
              className="rounded-full border border-border-strong px-5 py-2.5 font-mono text-[13px] text-ink no-underline"
            >
              Email me
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
