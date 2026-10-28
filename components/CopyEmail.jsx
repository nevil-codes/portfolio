"use client";

import { useState } from "react";
import { toast } from "./Toaster";

// Copies the address, or falls back to opening the mail client.
export async function copyEmail(email) {
  try {
    await navigator.clipboard.writeText(email);
    toast("Email copied to clipboard");
    return true;
  } catch {
    window.location.href = `mailto:${email}`;
    return false;
  }
}

export default function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false);

  async function onClick() {
    if (!(await copyEmail(email))) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Copy email address"
      className="inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-2 font-mono text-xs text-muted transition-colors hover:border-amber hover:text-amber"
    >
      {copied ? "Copied ✓" : "Copy"}
    </button>
  );
}
