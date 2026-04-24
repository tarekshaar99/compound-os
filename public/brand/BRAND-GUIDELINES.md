# THE COMPOUND SYSTEM — Brand Guidelines

*The Stack — final identity system*

---

## The mark

Three horizontal bars, stacked with tight gaps, each wider than the one above it. The widths follow a Fibonacci progression (5:8:13) and all three share a perfect vertical center axis. No gradient, no container, no outline, no ornament. The mark is the method.

---

## Spacing system

Every dimension is expressed in units of `u`, where `u` equals the bar height. This makes the mark infinitely scalable and gives you one rule to remember.

| Element            | Value         | Why                                                |
|--------------------|---------------|----------------------------------------------------|
| Bar height         | `1u`          | Atomic unit. All three bars are this tall.         |
| Top bar width      | `5u`          |                                                    |
| Middle bar width   | `8u`          |                                                    |
| Bottom bar width   | `13u`         |                                                    |
| Gap between bars   | `0.5u`        | Tight — preserves reading as one system.           |
| Clear space        | `1u`          | Minimum padding on all four sides of the mark.     |
| Mark → wordmark gap | `2u`         | In the primary lockup.                             |
| Rule (horizontal lockup) | `3u` tall | Hairline divider between mark and wordmark.      |

At the base canvas (viewBox 300×120), `1u = 20 units`.

---

## Color

Three values. That is the entire palette. No gradients, no tertiary colors, no hover states in lighter tints. Restraint is the brand.

| Name       | Hex       | Role                                              |
|------------|-----------|---------------------------------------------------|
| Champagne  | `#BF9A62` | The mark. Accent text. Rules. Gold moments only.  |
| Ink        | `#0A0A0A` | Primary background. Black type on light surfaces. |
| Parchment  | `#F4ECD8` | Body text on dark. Light-surface background.      |

**Why this gold, not a brighter one.** `#BF9A62` is warmer, less saturated, and more desaturated-bronze than the default "gold" most luxury brands reach for. It's further from real-estate gold and closer to a 1970s hardback book cover.

---

## Typography

### Primary — Fraunces
Free via Google Fonts. Use the 144-optical-size variant at weight 300. The modulated strokes and slight wedge serifs give it editorial authority without the over-familiarity of Playfair/Cinzel. It reads as a *publication*, not a logo font.

- Wordmark — caps, letter-spacing 4–6px, weight 300
- Caption ("SYSTEM") — caps, letter-spacing 10px, font-size 11px, color champagne

### Premium upgrade — Canela Deck (Commercial Type, paid license)
If the brand grows, license Canela Deck. It sits in the same tonal register as Fraunces but with more personality and sharper proportions. The upgrade path is seamless — the metrics are close enough that no redesign is needed.

### Alternates — GT Sectra Display, Editorial New
Both would also work. Avoid anything on this list: Cinzel, Playfair, Trajan, Libre Caslon, Cormorant. Over-exposed.

### Body — Inter
For UI, body copy, and navigation. Weight 300 or 400. Never use a serif for body text at small sizes.

---

## "SYSTEM" — how to handle it

The word "SYSTEM" is a descriptor, not a name. It should never fight "THE COMPOUND" for attention.

Three valid treatments, in preferred order:

1. **Demoted caption**. Below the wordmark, champagne color, font-size 11px, letter-spacing 10px, spelled as `S Y S T E M` with single spaces between letters. This is the default.
2. **Dropped entirely**. In the app icon, favicon, watermark, and any tight space, omit it. The brand is "The Compound" — "System" is the approach.
3. **Integrated in the horizontal lockup only**. Directly below "THE COMPOUND," same hierarchy as #1.

Never treat it with em-dash flourishes (`— SYSTEM —`). That's decorative, not structural.

---

## Logo variants

- **Primary stacked lockup** — Mark above, wordmark below. Default for print, brand sheets, document headers.
- **Horizontal lockup** — Mark left, hairline rule, wordmark right. Default for web headers, email signatures, business cards.
- **Icon only** — The mark alone. For watermarks, favicons, merchandise, any secondary application.
- **Monochrome white** — On dark photography, video, or non-black dark backgrounds.
- **Monochrome black** — On light backgrounds, documents, invoices, press.

---

## Where not to take this mark

- Never inside a circular or hexagonal container. A mark that needs a container isn't strong enough.
- Never with a gradient. Gradients are a shortcut; the solid form is the brand.
- Never rotated, mirrored, or with the bar order reversed.
- Never with a tagline in the primary lockup ("Compound Power," "Discipline — Wealth — Fitness"). The mark and wordmark carry everything.
- Never alongside an arrow, an upward graph, a coin, a crown, or any other "success" signifier. You already signal compounding — stacking it with other success icons makes it a crypto brand.
- Never in any gold other than `#BF9A62`. Especially not metallic gradient gold.
- Never in a weight other than the specified Fraunces 300 for the wordmark.

---

## Favicon notes

The favicon uses a slightly adjusted geometry — bars are proportionally taller (1.4u) and gaps slightly tighter (0.4u) so all three remain legible at 16px. This is the one place where the base spacing system is overridden. Use `stack-favicon.svg` for all favicon and app-icon applications, not the base icon.

---

## File index

| File                                | Purpose                              |
|-------------------------------------|--------------------------------------|
| `stack-icon.svg`                    | Primary icon, champagne              |
| `stack-icon-white.svg`              | Mono white                           |
| `stack-icon-black.svg`              | Mono black                           |
| `stack-lockup-vertical.svg`         | Stacked lockup (primary)             |
| `stack-lockup-horizontal.svg`       | Horizontal lockup                    |
| `stack-favicon.svg`                 | Optimized for small sizes            |
| `stack-app-icon.svg`                | Rounded-square app icon              |
| `stack-favicon-{16,32,48,64,192,512}.png` | PNG favicon exports            |
| `stack-app-icon-{32,64,192,512,1024}.png` | App icon PNG ladder           |
| `stack-lockup-vertical.png`         | 1800px raster, dark bg               |
| `stack-lockup-horizontal.png`       | 2200px raster, dark bg               |
| `stack-brand-sheet.html`            | Complete brand sheet (open in browser) |
