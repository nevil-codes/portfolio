// All site content lives in data/content.json — edit that file to change
// any text, link, project, or list on the site. This module re-exports it,
// plus a few helpers the components share.
import data from "@/data/content.json";

export const site = data.site;
export const sections = data.sections;
export const now = data.now;
export const social = data.social;
export const resumeUrl = data.resumeUrl;
export const hero = data.hero;
export const about = data.about;
export const resume = data.resume;
export const projects = data.projects;
export const stack = data.stack;
export const education = data.education;
export const certifications = data.certifications;
export const writing = data.writing;

// Sections render in this order. Any without content are skipped, and the
// rest are numbered 01, 02, … automatically — so hiding one never leaves a gap.
const order = ["work", "now", "stack", "about", "certifications", "writing", "contact"];
const hasContent = {
  work: projects?.length > 0,
  now: now?.items?.length > 0,
  stack: stack?.length > 0,
  about: true,
  certifications: certifications?.length > 0,
  writing: writing?.posts?.length > 0,
  contact: true,
};

export const visibleSections = order
  .filter((key) => hasContent[key])
  .map((key, i) => ({ key, number: String(i + 1).padStart(2, "0"), ...sections[key] }));

export function section(key) {
  return visibleSections.find((s) => s.key === key);
}

// "Turning *messy data* into …" → [{ text, em }] so a phrase can be emphasised
// from content.json without writing markup.
export function emphasis(text = "") {
  return text.split("*").map((part, i) => ({ text: part, em: i % 2 === 1 })).filter((p) => p.text);
}

export function plain(text = "") {
  return text.replaceAll("*", "");
}

// "Python (pandas, NumPy)" → ["Python", "pandas", "NumPy"]
export function expandItem(item) {
  const match = item.match(/^(.*?)\s*\((.*)\)$/);
  if (!match) return [item];
  return [match[1], ...match[2].split(",").map((s) => s.trim())];
}

export function handle(url) {
  return url.replace(/\/+$/, "").split("/").pop();
}

export function bareUrl(url) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/+$/, "");
}

export function formatCoords([lat, lon]) {
  const fmt = (v, pos, neg) => `${Math.abs(v).toFixed(2)}°${v >= 0 ? pos : neg}`;
  return `${fmt(lat, "N", "S")} ${fmt(lon, "E", "W")}`;
}

// Great-circle distance in km between two [lat, lon] points.
export function distanceKm([lat1, lon1], [lat2, lon2]) {
  const rad = (d) => (d * Math.PI) / 180;
  const a =
    Math.sin(rad(lat2 - lat1) / 2) ** 2 +
    Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(rad(lon2 - lon1) / 2) ** 2;
  return Math.round(6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}
