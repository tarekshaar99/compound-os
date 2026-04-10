"use client";

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
      className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-6 mb-5"
      style={{ borderLeft: `3px solid ${accent}` }}
    >
      {title && (
        <h3 className="text-lg font-semibold mb-4" style={{ color: accent }}>
          {title}
        </h3>
      )}
      <div className="text-[var(--text-secondary)] text-sm leading-7">
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
    <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-5 flex-1 min-w-[160px]">
      <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1.5 font-mono">
        {label}
      </div>
      <div className="text-2xl font-bold text-[var(--accent)]">{value}</div>
      {sub && (
        <div className="text-xs text-[var(--text-secondary)] mt-1">{sub}</div>
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
    <div className="overflow-x-auto mb-4">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="text-left px-3.5 py-2.5 border-b-2 border-[var(--accent)] text-[var(--accent)] font-semibold whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-[var(--border)]">
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-3.5 py-2.5 text-[var(--text-secondary)] align-top"
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
    <div className="flex gap-4 items-start bg-[var(--card-bg)] border border-[var(--border)] rounded-xl px-5 py-4 mb-3">
      <div
        className="min-w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm font-mono"
        style={{
          background: highlight ? "var(--accent)" : "var(--border)",
          color: highlight ? "#000" : "var(--text-secondary)",
        }}
      >
        {number}
      </div>
      <p className="text-[var(--text-primary)] leading-relaxed text-sm">
        {text}
      </p>
    </div>
  );
}
