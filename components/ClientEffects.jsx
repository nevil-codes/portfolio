"use client";

import { useEffect } from "react";
import { site, social, hero } from "@/lib/content";

// Page-level side effects with no UI of their own.
export default function ClientEffects() {
  // Reveal [data-reveal] elements as they scroll into view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // A hello for anyone who opens DevTools.
  useEffect(() => {
    console.log(
      `%c${site.name}%c\nYou opened DevTools — my kind of person.\n${hero.status ? `${hero.status} → ` : ""}${social.email}`,
      "font: 32px Georgia, serif; color: #f5a524;",
      "font: 13px ui-monospace, monospace; color: #a8a294; line-height: 1.6;"
    );
  }, []);

  return null;
}
