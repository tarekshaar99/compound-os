# Audit 1 — Pre-fix state

Run against `/imported/compound-os-design-system/raw/` on 2026-04-29.
This file is the snapshot the fix pipeline diffs against.

Legend: ✅ OK · ⚠️ minor · ❌ critical · ⏭ N/A

---

## 1. Fonts

- **❌ critical** — Inline font-family override `font-['Newsreader']` used **19 times** across `06-dashboard.html` and `07-module-fibonacci.html` instead of the configured `font-h1`/`font-h2`/`font-h3` tokens. Same for `font-['Manrope']` 10 times in `09-home-quiet-luxury.html`. Tokens exist; they're being bypassed.
- **⚠️ minor** — `font-medium` (weight 500) appears in 3 files (`06-dashboard:1`, `07-module-fibonacci:1`, `09-home-quiet-luxury:1`) on Newsreader text, but Newsreader's design-system spec only defines weights 300 and 400. This is an unsupported weight.
- **⚠️ minor** — Material Symbols Outlined `<link>` tag is **duplicated** in every single one of the 9 HTML files (loaded twice per page).
- **⚠️ minor** — `font-light` (300) used inline 23 times across 7 files; spec defines weight 400 as default for h1–h3, so `font-light` is fine where intended (display-xl) but inconsistent on h2/h3 in `09-home-quiet-luxury.html` (12 uses).

## 2. Heading sizes

- **✅ OK** — All h1/h2/h3 use the design-system tokens (`font-h1`, `text-h1`, etc.) consistently across pages. Sizes match the spec (48 / 32 / 24).
- **⚠️ minor** — `display-xl` (80px) used as h1 in `01-home`, `03-onboarding`, `05-success` but 03's headline is set in two lines (forces wrap) and 05's headline mixes display-xl + a smaller italic span. Visually inconsistent for the same semantic level.

## 3. Colors

- **❌ critical** — `#BF9A62` is hardcoded **46 times** across the body markup of 4 files (`01-home: 10`, `06-dashboard: 19`, `07-module-fibonacci: 9`, `09-home-quiet-luxury: 8`) — this is exactly the color that the `primary-container` token defines. Token bypass.
- **❌ critical** — `#0a0b0f` hardcoded **14 times** across 4 files. The token system uses `#16130f` for `background`, but `#0a0b0f` is the *real* brand background per the design brief. Two backgrounds coexisting → tonal mismatch between sections.
- **❌ critical** — `#a78bfa` (mindset/violet pillar) hardcoded **4 times** in `06-dashboard.html`. There is no token for it in any of the 9 inline tailwind configs — pillar color exists only as raw hex.
- **⚠️ minor** — `text-stone-400` / `text-stone-500` / `text-stone-100` / `border-stone-800` (Tailwind default palette) is used in `06-dashboard` and `09-home-quiet-luxury` instead of the on-surface-variant / outline tokens. ~25 occurrences.
- **⚠️ minor** — Color contrast not verified against WCAG AA. `text-on-surface-variant` (#d2c4b5) on `#16130f` background is fine for body text, but `text-outline` (#9a8f81) on the same background tests at ~4.6:1 — borderline AA for body, fails AAA.

## 4. Animations / micro-interactions

- **❌ critical** — Spec calls for cinematic motion, scroll-revealed entrances, word-by-word headline animations, stagger, layout transitions. Import has **0 entrance animations, 0 scroll-linked effects, 0 stagger, 0 word-by-word, 0 AnimatePresence**. Total motion in the import: one `animate-pulse` on the "99 spots remaining" indicator.
- **❌ critical** — Typo bug: `Transition-colors` (capital T) appears **4 times** in `01-home-editorial.html` lines 230–233 (footer links). Tailwind silently ignores these classes — the footer links **have no hover transition** even though the styling implies they should.
- **⚠️ minor** — Mixed transition durations on the same element: `09-home-quiet-luxury` lines 108–110 declare both `transition-colors duration-500` and `transition-all duration-700` on the same anchor. The browser uses the last one but the markup is ambiguous.
- **⚠️ minor** — Mixed durations across files for similar interactions: hover transitions are 300ms, 500ms, and 700ms scattered without a system. Brand wants "cinematic" but the import has no consistent timing curve.

## 5. Interactive states

- **❌ critical** — Focus-visible / keyboard accessibility states virtually missing. Only `02-login.html` has `focus-within:` (1 use). 0 occurrences of `focus-visible:` across 9 files. Buttons rely entirely on hover; keyboard users get no feedback.
- **⚠️ minor** — Active states (`active:scale-90`) present in `06-dashboard` but absent from buttons in 7 of 9 files.
- **⚠️ minor** — Hover state on the pricing card in `01-home-editorial` is set on a `<div>` (not `<button>`), so it isn't keyboard-reachable.

## 6. Spacing

- **✅ OK** — Every file uses the same custom spacing tokens (xs / sm / md / lg / xl / xxl / gutter / margin / unit) sourced from the design system. Module-to-module rhythm is internally consistent.
- **⚠️ minor** — `tracking-[0.2em]` (0.2em letter-spacing) used in 19 places but the `label-caps` token defines 0.1em. Components that should be `font-label-caps` are getting double the tracking — visible as overly-spaced uppercase nav links.
- **⚠️ minor** — Three different tracking values for the same uppercase nav-label intent: `tracking-[0.1em]`, `tracking-[0.15em]`, `tracking-[0.2em]`, `tracking-widest`, `tracking-[0.3em]`. No single source of truth.

## 7. Z-index

- **✅ OK** — Used values are tidy: `z-0`, `z-10`, `z-20`, `z-30`, `z-40`, `z-50`. No z-index war, no negative z values, no surprising overlaps.

## 8. Responsive

- **❌ critical** — `02-login.html` and `05-success.html` use **zero responsive breakpoints**. They're desktop-only at 2560px wide and will look identical at 375px. Login is one of the highest-traffic pages.
- **❌ critical** — Mobile-first `sm:` (≥640px) breakpoint is **never used in any file** (0 occurrences across all 9). Layouts go directly from base → `md:` (≥768px). Anything between 375 and 768 has no opportunity to adapt.
- **⚠️ minor** — `06-dashboard.html` has `pb-safe` on the bottom nav (line 246, in 07-module-fibonacci) — good iOS safe-area awareness — but no equivalent on top safe area for notched devices.
- **⚠️ minor** — Tap target sizes not visually verified at mobile width but the inline `py-4 px-6` button class meets ≥44px height. The 32px circular icon buttons in dashboard sidebar are below 44px target.

## 9. Component structure

- **⚠️ minor** — Heavy class duplication in `06-dashboard` (4 nav links share an identical 5-line class string) and `01-home-editorial` (3 pillar cards share identical class strings). These should be component-extracted in the React port.
- **❌ critical** — `01-home-editorial.html` line 109 and 222: `flat no shadows` and `full-width top-0` and `docked` are typed as Tailwind classes but **none of those classes exist**. They're unparsed style descriptors leaked from the design tool. Same issue: `06-dashboard:117,155` (4 instances), `08-home-private-terminal:110`. Total **5 broken class strings**.
- **❌ critical** — `03-onboarding.html` lines 112–116: CSS custom property `var(--tw-colors-outline-variant)` is referenced in `.hairline-*` utility CSS, but Tailwind doesn't expose color tokens as `--tw-colors-*` variables by default. The hairline borders **render with no color** (transparent).

## 10. State management

- **⏭ N/A** — These are static HTML files; no React state to audit.

## 11. Performance

- **❌ critical** — All 9 files load Tailwind via CDN (`cdn.tailwindcss.com`) which (a) shows a warning banner in production, (b) parses Tailwind in the browser at runtime, (c) cannot tree-shake. Production needs the compiled Tailwind CSS file or PostCSS pipeline.
- **❌ critical** — All 9 files inline a duplicated `tailwind.config` block (~100 lines × 9 files ≈ 900 lines of duplication). Single source of truth required.
- **⚠️ minor** — Hero images on `01-home`, `06-dashboard`, `07-module-fibonacci` use `lh3.googleusercontent.com` placeholder URLs. These are CDN links; not an issue for now but they'll become broken/expired before launch.
- **⚠️ minor** — No `loading="lazy"` on any of the 7 `<img>` tags. All would load on page open.
- **✅ OK** — Fonts use `display=swap` to avoid flash of unstyled text.

## 12. Accessibility

- **❌ critical** — Buttons missing `type` attribute: **21 of 22 buttons** across 8 files (only `04-pricing.html`'s single button has `type="button"`). Without explicit type, buttons inside forms default to `type="submit"` — bug source.
- **❌ critical** — `02-login.html` has 1 `<input>` but **0 `<label>` elements**. The OTP input has only a placeholder ("ENTER EMAIL FOR OTP"), no associated label. Screen readers won't announce the field correctly.
- **⚠️ minor** — Only 5 `aria-*` attributes total across 9 files (`06-dashboard: 4`, `08-home-private-terminal: 1`). Sidebar/nav landmarks have `aria-label="Sidebar"` and `aria-label="Top Navigation"` in 06; everywhere else, navigation is unlabeled.
- **⚠️ minor** — Icon-only buttons in `06-dashboard` (notification bell, account icon) have `aria-label`. Icon buttons in `02-login` (the arrow_forward submit button) do not.
- **✅ OK** — All `<img>` elements (7 across all files) have `alt` attributes. The `alt` text is generally descriptive (not just empty strings).
- **✅ OK** — `<html lang="en">` set on every file.

## 13. Dead code / typos

- **❌ critical** — `MMXXIV` (Roman numeral 2024) hardcoded as copyright year in 3 files (`01-home-editorial:227`, `03-onboarding:199`, `05-success:224`). Today is **2026**.
- **❌ critical** — `01-home-editorial:230-233`: `Transition-colors` typo (capital T). 4 broken classes.
- **❌ critical** — Invalid Tailwind classes: `flat no shadows`, `full-width top-0`, `docked` scattered in 5 places. These are leaked Stitch style hints, not real classes. Tailwind silently ignores them.
- **⚠️ minor** — `01-home-editorial` line 222: `border-t border-t` (duplicate). One `border-t` is dead.
- **⚠️ minor** — `01-home-editorial:115-118` contain both `hover:text-white` and `hover:text-[#BF9A62]` and both `transition-colors` and `transition-all duration-300` on the same anchor. Both hover targets are written; one wins by source order.

## 14. Environment

- **⏭ N/A** — Static HTML; no API URLs, secrets, or env-bound config to extract.

## 15. Console errors (predicted on first load)

- **❌ critical** — Tailwind CDN will print a console warning: *"cdn.tailwindcss.com should not be used in production"*.
- **⚠️ minor** — Material Symbols `<link>` duplication will produce a network log entry showing the same font loaded twice (browsers dedupe at cache layer, but DevTools will show 2 requests on first cold load).
- **⚠️ minor** — Some `<img>` tags use `data-alt="..."` (custom attribute) alongside the standard `alt="..."` — `data-alt` does nothing. Not a console error, but dead markup.
- **⚠️ minor** — `<img viewbox="...">` in 7 places uses lowercased `viewbox` attribute. SVG requires `viewBox` (case-sensitive). The browser is forgiving for now but this is technically invalid.

---

## Totals

| Category | Critical ❌ | Minor ⚠️ |
|---|---|---|
| 1. Fonts | 1 | 3 |
| 2. Heading sizes | 0 | 1 |
| 3. Colors | 3 | 2 |
| 4. Animations | 2 | 2 |
| 5. Interactive states | 1 | 2 |
| 6. Spacing | 0 | 2 |
| 7. Z-index | 0 | 0 |
| 8. Responsive | 2 | 2 |
| 9. Component structure | 2 | 1 |
| 10. State mgmt | – | – |
| 11. Performance | 2 | 2 |
| 12. Accessibility | 2 | 2 |
| 13. Dead code/typos | 3 | 2 |
| 14. Environment | – | – |
| 15. Console errors | 1 | 3 |
| **TOTAL** | **19** | **24** |

## Most consequential before any fix runs

1. **Hardcoded colors bypass the token system in 4 files** — biggest fix surface (Step 1 of the fix pipeline).
2. **`Transition-colors` typo in homepage footer** (line 230–233) — visibly broken hover behavior.
3. **`flat no shadows` / `docked` etc. as bogus Tailwind classes** — silent failures in 5 locations.
4. **MMXXIV → MMXXVI** — wrong year on production-imminent code.
5. **21/22 buttons missing `type="button"`** — submit-by-accident bug source.
6. **Login + Success pages have zero responsive breakpoints** — these are critical conversion pages and they're desktop-only.
7. **Tailwind CDN in production** — must be replaced with compiled CSS in any deploy.
8. **Animations promised by the brand brief but absent in the import** — biggest "premium feel" gap; needs full implementation pass per the prompt's animation spec (entrances, stagger, hover, layout, scroll, AnimatePresence).
