"use client";

import { useEffect, useState } from "react";

// Fire from any client component: toast("Email copied").
export function toast(message) {
  window.dispatchEvent(new CustomEvent("site:toast", { detail: message }));
}

export default function Toaster() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    let timer;
    function onToast(e) {
      setMessage(e.detail);
      clearTimeout(timer);
      timer = setTimeout(() => setMessage(null), 2400);
    }
    window.addEventListener("site:toast", onToast);
    return () => {
      window.removeEventListener("site:toast", onToast);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-[400] -translate-x-1/2 pointer-events-none"
    >
      {message && (
        <div className="animate-pop flex items-center gap-2.5 rounded-full border border-border-strong bg-raised px-4 py-2.5 font-mono text-[13px] text-ink shadow-[0_12px_40px_rgb(0_0_0/0.5)]">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-mint" />
          {message}
        </div>
      )}
    </div>
  );
}
