"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { visibleSections, social, resumeUrl, handle } from "@/lib/content";
import { copyEmail } from "./CopyEmail";

// Open from anywhere: openPalette(). Also bound to ⌘K / Ctrl+K.
export function openPalette() {
  window.dispatchEvent(new Event("site:palette"));
}

function goTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  history.replaceState(null, "", `#${id}`);
  // Move focus so keyboard users continue from the section they jumped to.
  el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

const profiles = [
  ["GitHub", social.github],
  ["LinkedIn", social.linkedin],
  ["LeetCode", social.leetcode],
  ["HackerRank", social.hackerrank],
].filter(([, url]) => url);

const commands = [
  ...visibleSections.map((s) => ({
    id: `go-${s.key}`,
    group: "Jump to",
    label: s.label.charAt(0).toUpperCase() + s.label.slice(1),
    hint: s.number,
    keywords: s.title,
    run: () => goTo(s.key),
  })),
  { id: "resume", group: "Actions", label: "Open resume", run: () => (window.location.href = resumeUrl) },
  { id: "copy-email", group: "Actions", label: "Copy email address", hint: social.email, run: () => copyEmail(social.email) },
  { id: "email", group: "Actions", label: "Write me an email", run: () => (window.location.href = `mailto:${social.email}`) },
  ...profiles.map(([label, url]) => ({
    id: label.toLowerCase(),
    group: "Profiles",
    label,
    hint: handle(url),
    run: () => window.open(url, "_blank", "noopener,noreferrer"),
  })),
];

function matches(cmd, query) {
  const haystack = `${cmd.label} ${cmd.hint ?? ""} ${cmd.keywords ?? ""} ${cmd.group}`.toLowerCase();
  return query.toLowerCase().split(/\s+/).filter(Boolean).every((word) => haystack.includes(word));
}

const slug = (s) => s.toLowerCase().replace(/\s+/g, "-");

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const isOpen = useRef(false);
  const returnFocusTo = useRef(null);
  const restoreFocus = useRef(true);

  const results = useMemo(() => commands.filter((c) => matches(c, query)), [query]);
  const groups = [...new Set(results.map((c) => c.group))];

  // Reset in the same event that opens it, so the input never mounts with
  // the previous query, and remember where focus was to hand it back.
  function show() {
    returnFocusTo.current = document.activeElement;
    restoreFocus.current = true;
    isOpen.current = true;
    setQuery("");
    setActive(0);
    setOpen(true);
  }

  function close() {
    isOpen.current = false;
    setOpen(false);
  }

  function run(cmd) {
    restoreFocus.current = false;
    document.documentElement.style.overflow = "";
    close();
    cmd.run();
  }

  useEffect(() => {
    function onKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen.current) close();
        else show();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("site:palette", show);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("site:palette", show);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      if (restoreFocus.current) returnFocusTo.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (open) document.getElementById(`cmd-${results[active]?.id}`)?.scrollIntoView({ block: "nearest" });
  }, [open, active, results]);

  function onInputKeyDown(e) {
    const n = results.length;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (n) setActive((i) => (i + 1) % n);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (n) setActive((i) => (i - 1 + n) % n);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[active]) run(results[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      // The input is the dialog's only focus stop; keep focus inside it.
      e.preventDefault();
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-start justify-center px-4 pt-[12vh]">
      <div aria-hidden="true" onClick={close} className="absolute inset-0 animate-fade bg-black/60 backdrop-blur-sm" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        className="relative w-full max-w-[560px] animate-pop overflow-hidden rounded-2xl border border-border-strong bg-raised shadow-[0_30px_80px_-10px_rgb(0_0_0/0.8)]"
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-dim" aria-hidden="true">
            <circle cx="9" cy="9" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M13.2 13.2L17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input
            autoFocus
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="cmd-list"
            aria-autocomplete="list"
            aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
            placeholder="Jump to a section or run a command…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKeyDown}
            spellCheck={false}
            autoComplete="off"
            className="h-14 w-full bg-transparent text-[15px] text-ink placeholder:text-dim focus:outline-none"
          />
          <kbd className="rounded border border-border-strong px-1.5 py-0.5 font-mono text-[10px] text-dim">esc</kbd>
        </div>

        <div id="cmd-list" role="listbox" aria-label="Commands" className="max-h-[min(420px,55vh)] overflow-y-auto p-2">
          {results.length === 0 && (
            <p className="m-0 px-3 py-8 text-center text-sm text-dim">No results for “{query}”</p>
          )}
          {groups.map((group) => (
            <div key={group} role="presentation" className="mb-1">
              <div
                aria-hidden="true"
                id={`cmd-group-${slug(group)}`}
                className="px-3 pb-1.5 pt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-dim"
              >
                {group}
              </div>
              <div role="group" aria-labelledby={`cmd-group-${slug(group)}`}>
                {results.map((cmd, i) =>
                  cmd.group !== group ? null : (
                    <div
                      key={cmd.id}
                      id={`cmd-${cmd.id}`}
                      role="option"
                      aria-selected={i === active}
                      onMouseMove={() => setActive(i)}
                      onClick={() => run(cmd)}
                      className={`flex cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-[15px] transition-colors ${
                        i === active ? "bg-amber/10 text-ink" : "text-muted"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className={`h-1.5 w-1.5 shrink-0 rounded-full ${i === active ? "bg-amber" : "bg-border-strong"}`}
                        />
                        {cmd.label}
                      </span>
                      {cmd.hint && <span className="truncate font-mono text-xs text-dim">{cmd.hint}</span>}
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-5 border-t border-border px-4 py-2.5 font-mono text-[11px] text-dim">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
