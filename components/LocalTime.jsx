"use client";

import { useEffect, useState } from "react";

// Live local time for the given IANA zone, e.g. "16:42 CET". Rendered only
// after mount so server and client markup always match.
export default function LocalTime({ timeZone }) {
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(id);
  }, []);

  if (!now) return <span className="inline-block w-[9ch]" />;

  const time = new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit" }).format(now);
  const zone = new Intl.DateTimeFormat("en-GB", { timeZone, timeZoneName: "short" })
    .formatToParts(now)
    .find((p) => p.type === "timeZoneName")?.value;

  return (
    <time dateTime={now.toISOString()} className="tabular-nums">
      {time} {zone}
    </time>
  );
}
