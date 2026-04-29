# Compound OS Design System — Stitch import

Source: Stitch project `projects/3281912290993590496` (created 2026-04-29 by tarek@thecompoundsystem.com).

This directory holds the **raw, untouched** import. Do not edit files in `raw/` or
`assets/screenshots/` — they are the source of truth that all later fixes diff
against.

## What's in here

```
compound-os-design-system/
├── README.md                    # this file
├── raw/                         # unmodified Stitch output
│   ├── _project.json            # project metadata
│   ├── _screens-manifest.json   # screen ID → file → production-route mapping
│   ├── _design-systems.json     # all 3 design system specs (Editorial / Terminal / Luxury)
│   ├── 00-design-brief.md       # markdown design brief from Stitch
│   ├── 01-home-editorial.html   # 6964px tall homepage in Editorial Quarterly
│   ├── 02-login.html
│   ├── 03-onboarding.html
│   ├── 04-pricing.html
│   ├── 05-success.html
│   ├── 06-dashboard.html
│   ├── 07-module-fibonacci.html # module page sample (trading pillar)
│   ├── 08-home-private-terminal.html  # alt theme exploration
│   └── 09-home-quiet-luxury.html      # alt theme exploration
├── assets/
│   └── screenshots/             # PNG previews of each screen for reference
│       ├── 01-home-editorial.png  …  09-home-quiet-luxury.png
│       └── 00-project-thumbnail.png
└── screens/                     # (placeholder for fix-pass output — empty until Step 1)
```

## Active design direction

**Editorial Quarterly** — high-end print journalism aesthetic.
- Headlines: Newsreader (serif, 300–400 weight)
- Body: Inter
- Background: `#16130f` (ink-dark)
- Accent: `#BF9A62` (champagne, matches existing brand mark)
- Pillar colors: `#00d4aa` (markets/teal), `#f97316` (fitness/orange), `#a78bfa` (mindset/violet)
- Sharp 0px corners everywhere except the Fibonacci brand mark
- Hairline rules instead of shadows
- 48px+ container margins; print-style "essay" centered single-column for long-form content

The two alternate themes (`Private Terminal`, `Quiet Luxury`) are kept for
reference but are not the active direction.

## How this maps to the live Compound OS Next.js app

| Imported file | Production route |
|---|---|
| `01-home-editorial.html` | `/` |
| `02-login.html` | `/login` |
| `03-onboarding.html` | `/onboarding` |
| `04-pricing.html` | `/#pricing` (section of home) |
| `05-success.html` | `/success` |
| `06-dashboard.html` | `/dashboard` |
| `07-module-fibonacci.html` | `/trading/m/fibonacci-retracements` (sample module page pattern) |

The fixes pipeline preserves each imported HTML in `raw/` and writes corrected
copies to `screens/`. Diff every step against `raw/`.

## Tech notes for the import

Each HTML file is a self-contained page that uses:
- Tailwind via CDN (`https://cdn.tailwindcss.com?plugins=forms,container-queries`)
- Google Fonts (Newsreader, Inter, Material Symbols Outlined)
- An inline `tailwind.config` script with the design system's color tokens

This is great for previewing the design but is not production-ready as-is. The
fix pipeline will lift tokens out of the inline configs into a single token
file, normalize typography, fix accessibility gaps, add animations, and so on.
