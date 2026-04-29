"use client";

/**
 * Editorial Quarterly card primitives used by the deep-dive libraries
 * (/trading/library, /fitness/library, /mindset/library).
 *
 * - Card: hairline-bordered article block with left accent rule
 * - StatBox: editorial fact tile with serif numeral + label-caps caption
 * - Table: hairline-ruled data table with label-caps headers
 * - RuleCard: numbered editorial rule with serif body
 *
 * All sharp 0px corners, no rounded geometry, no shadows.
 */

export function Card({
  title,
  children,
  accent = "var(--accent)",
}: {
  title?: string;
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <div
      className="border border-[var(--border)] bg-[var(--card-bg)] p-6 mb-6"
      style={{ borderLeft: `2px solid ${accent}` }}
    >
      {title && (
        <h3
          className="label-caps mb-5 pb-3 border-b border-[var(--border-soft)]"
          style={{ color: accent }}
        >
          {title}
        </h3>
      )}
      <div className="font-serif text-[15px] md:text-[16px] text-[var(--text-secondary)] leading-[1.75] space-y-4">
        {children}
      </div>
    </div>
  );
}

export function StatBox({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border)] p-5 flex-1 min-w-[160px]">
      <div className="label-caps text-[var(--text-muted)] mb-3">
        {label}
      </div>
      <div className="font-serif text-[24px] md:text-[28px] text-[var(--accent)] tracking-tight font-light leading-tight">
        {value}
      </div>
      {sub && (
        <div className="font-serif italic text-[13px] text-[var(--text-secondary)] mt-2 leading-relaxed">
          {sub}
        </div>
      )}
    </div>
  );
}

export function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto mb-6">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="label-caps text-left px-4 py-3 border-b border-[var(--accent)] text-[var(--accent)] whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className="border-b border-[var(--border-soft)] last:border-b-0"
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-4 py-3 font-serif text-[14px] md:text-[15px] text-[var(--text-secondary)] align-top leading-[1.65]"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function RuleCard({
  number,
  text,
  highlight,
}: {
  number: number;
  text: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-baseline gap-5 border border-[var(--border)] bg-[var(--card-bg)] px-5 py-4 mb-3">
      <span
        className="label-caps shrink-0 w-10"
        style={{
          color: highlight ? "var(--accent)" : "var(--text-muted)",
        }}
      >
        №{String(number).padStart(2, "0")}
      </span>
      <p className="font-serif text-[15px] md:text-[16px] text-[var(--text-primary)] leading-[1.7]">
        {text}
      </p>
    </div>
  );
}
