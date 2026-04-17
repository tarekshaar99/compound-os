/**
 * Small, defensive HTML-entity decoder.
 *
 * Why this file exists:
 *   Content for module Checklists, Quizzes, and Reflections is authored as
 *   JavaScript string literals and passed through JSX expression containers
 *   (e.g. `items={[{ label: "..." }]}`). React does NOT HTML-decode text
 *   inside expression containers. If a string contains `&apos;` or `&quot;`,
 *   it renders as those literal characters on screen.
 *
 *   The canonical fix is authoring strings with real characters (done). This
 *   helper is a safety net so a future edit that slips an entity back in
 *   won't surface on the page.
 *
 * Scope rules:
 *   - Apply ONLY to text that is authored in the app and rendered for
 *     display (labels, prompts, hints, options, explanations).
 *   - Do NOT apply to URLs, HTML attributes, user input, auth strings, or
 *     anything that might legitimately contain `&` / `<` characters as
 *     part of its value.
 *   - Never use this to feed dangerouslySetInnerHTML; plain text only.
 */

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  apos: "'",
  quot: '"',
  lt: "<",
  gt: ">",
  nbsp: "\u00A0",
  mdash: "\u2014",
  ndash: "\u2013",
  hellip: "\u2026",
  lsquo: "\u2018",
  rsquo: "\u2019",
  ldquo: "\u201C",
  rdquo: "\u201D",
  copy: "\u00A9",
  reg: "\u00AE",
  trade: "\u2122",
  middot: "\u00B7",
};

// Single-pass decoder. One regex match = one entity replacement, which means
// `&amp;apos;` decodes to the literal string `&apos;` (not `'`). That's the
// correct interpretation of a pre-escaped ampersand.
const ENTITY_RE = /&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi;

export function decodeEntities(input: string): string {
  if (!input || input.indexOf("&") === -1) return input;

  return input.replace(ENTITY_RE, (match, body: string) => {
    if (body[0] === "#") {
      const isHex = body[1] === "x" || body[1] === "X";
      const codePoint = isHex
        ? parseInt(body.slice(2), 16)
        : parseInt(body.slice(1), 10);
      if (Number.isFinite(codePoint) && codePoint > 0 && codePoint <= 0x10ffff) {
        try {
          return String.fromCodePoint(codePoint);
        } catch {
          return match;
        }
      }
      return match;
    }
    const named = NAMED_ENTITIES[body.toLowerCase()];
    return named ?? match;
  });
}
