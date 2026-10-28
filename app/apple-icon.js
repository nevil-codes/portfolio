import { markResponse } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS rounds the corners itself, so this one stays square.
export default function AppleIcon() {
  return markResponse(size);
}
