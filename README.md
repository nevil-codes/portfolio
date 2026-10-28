# Nevil Amraniya — Portfolio

Personal portfolio built with Next.js 16 (App Router) and Tailwind CSS.
A dark, editorial single page (work / now / stack / about / certifications /
writing / contact) plus a print-friendly resume at `/resume`.

Highlights: an animated dot-field hero that reacts to the cursor, a notebook
cell that "prints" your profile as a pandas Series, per-project illustrations,
a ⌘K / Ctrl+K command menu, scroll reveals, and a generated share image and
favicon. Everything respects `prefers-reduced-motion` and reads fine without
JavaScript.

## Editing content

**All text, links, projects, skills, education, and certifications live in one file:**

```
data/content.json
```

Edit that file (directly on GitHub works too) and the site updates on the next
deploy — no code changes needed. For example, to add a certification:

```json
"certifications": [
  {
    "name": "Certification name",
    "issuer": "Issuing organization",
    "year": "2026",
    "verifyUrl": "https://link-to-verify"
  }
]
```

An empty `certifications` array hides the section entirely. Sections are
numbered automatically (01, 02, …) in the order they appear, so hiding one
never leaves a gap.

### Fields worth knowing

| Field | What it does |
| --- | --- |
| `hero.tagline` | The big line under your name. Wrap words in `*asterisks*` to set them in amber italics. |
| `hero.status` | The green "open to…" pill (also used in the share image). Remove it to hide the pill. |
| `hero.profile` | Key/value pairs printed in the notebook card next to your photo. |
| `projects[].visual` | Illustration on the project card: `pipeline`, `chart`, `phone`, or `heatmap`. Leave it out for a monogram. |
| `projects[].stack` | Tech chips on the card and the resume. |
| `now.items[].tag` | Status pill: `learning`, `building`, or `looking`. |
| `now.updated` | Optional, e.g. `"November 2026"` — shows "Last updated …" on the Now section. |
| `stack[].learning` | `true` styles that row's chips as in-progress. |
| `education[].coords` | `[lat, lon]`; when two entries have them, the timeline shows the distance between them. |
| `writing.posts` | `[{ "title", "date", "url", "summary" }]`. The Writing section and its nav link appear once there's a post. |
| `sections.*.intro` | The short line beside each section title. |
| `site.url` | Used for canonical links, the sitemap, and share metadata. |

The nav's Resume button points at `resumeUrl` — currently the print-friendly
`/resume` page.

## Share image and icons

`app/opengraph-image.js`, `app/icon.js` and `app/apple-icon.js` render at build
time from the fonts in `assets/fonts/` (SIL Open Font License, see the
`OFL-*.txt` files there), so they always match the site and need no network.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build
npm run start
```

Deploys on Vercel with zero config (auto-detected as Next.js).
