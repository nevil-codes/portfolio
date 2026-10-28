"use client";

import { useEffect, useState } from "react";

// The requested path as Python would repr it, read after mount: the 404 page
// is prerendered once, so rendering it on the server would show the wrong
// path and mismatch on hydration.
export default function MissingPath() {
  const [path, setPath] = useState("");

  useEffect(() => {
    let p = window.location.pathname;
    try {
      p = decodeURIComponent(p);
    } catch {
      // Malformed escapes: show the path as typed.
    }
    setPath(p);
  }, []);

  const quote = path.includes("'") && !path.includes('"') ? '"' : "'";
  return (
    <span className="text-mint">
      {quote}
      {path}
      {quote}
    </span>
  );
}
