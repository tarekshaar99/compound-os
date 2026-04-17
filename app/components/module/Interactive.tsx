"use client";

import { useMemo, useState } from "react";
import { useModule } from "./ModuleContext";
import { decodeEntities } from "../../lib/text";

/* ────────────────── Checklist ────────────────── */

/**
 * Persisted checklist. Each item has a stable local `id` so we can hydrate
 * from ModuleContext.items[itemId] = boolean.
 *
 * Designed so `CompleteModule` can require "all checked" before enabling.
 */
export interface ChecklistItem {
  id: string;
  label: string;
  hint?: string;
}

export function Checklist({
  title,
  items,
  storageKey = "checklist",
}: {
  title?: string;
  items: ChecklistItem[];
  storageKey?: string;
}) {
  const { items: state, setItem } = useModule();
  const map = (state[storageKey] as Record<string, boolean> | undefined) ?? {};

  const toggle = (id: string) => {
    const next = { ...map, [id]: !map[id] };
    setItem(storageKey, next);
  };

  const doneCount = items.filter((it) => map[it.id]).length;

  return (
    <section>
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
          {title ?? "Action checklist"}
        </h2>
        <span className="text-xs text-[var(--text-muted)] tabular-nums">
          {doneCount} / {items.length}
        </span>
      </div>
      <ul className="space-y-2">
        {items.map((it) => {
          const checked = !!map[it.id];
          return (
            <li key={it.id}>
              <button
                onClick={() => toggle(it.id)}
                className={`w-full text-left flex gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                  checked
                    ? "border-[var(--accent)]/40 bg-[var(--accent)]/[0.04]"
                    : "border-[var(--border)] bg-[var(--card-bg)] hover:border-white/[0.12]"
                }`}
              >
                <span
                  className={`shrink-0 w-5 h-5 mt-0.5 rounded-md border-2 flex items-center justify-center transition-colors ${
                    checked
                      ? "border-[var(--accent)] bg-[var(--accent)]"
                      : "border-[var(--text-muted)]"
                  }`}
                  aria-hidden
                >
                  {checked && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#0a0b0f" strokeWidth="2.5">
                      <polyline points="2 6 5 9 10 3" />
                    </svg>
                  )}
                </span>
                <span className="flex-1">
                  <span
                    className={`block text-[15px] leading-snug ${
                      checked
                        ? "text-[var(--text-primary)] font-medium"
                        : "text-[var(--text-secondary)]"
                    }`}
                  >
                    {decodeEntities(it.label)}
                  </span>
                  {it.hint && (
                    <span className="block mt-1 text-[13px] text-[var(--text-muted)] leading-relaxed">
                      {decodeEntities(it.hint)}
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ────────────────── Quiz ────────────────── */

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  /** index of correct option */
  correct: number;
  /** one-line explanation shown after they answer */
  explain?: string;
}

export function Quiz({
  title,
  questions,
  storageKey = "quiz",
}: {
  title?: string;
  questions: QuizQuestion[];
  storageKey?: string;
}) {
  const { items, setItem } = useModule();
  const answers = (items[storageKey] as Record<string, number> | undefined) ?? {};

  const choose = (qid: string, i: number) => {
    const next = { ...answers, [qid]: i };
    setItem(storageKey, next);
  };

  return (
    <section>
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] mb-4">
        {title ?? "Quick check"}
      </h2>
      <div className="space-y-6">
        {questions.map((q) => {
          const chosen = answers[q.id];
          const answered = typeof chosen === "number";
          return (
            <div key={q.id} className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card-bg)]">
              <p className="text-[15px] text-[var(--text-primary)] font-medium leading-snug mb-4">
                {decodeEntities(q.prompt)}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, i) => {
                  const isChosen = chosen === i;
                  const isCorrect = i === q.correct;
                  let state: "idle" | "right" | "wrong" | "missed" = "idle";
                  if (answered) {
                    if (isChosen && isCorrect) state = "right";
                    else if (isChosen && !isCorrect) state = "wrong";
                    else if (!isChosen && isCorrect) state = "missed";
                  }
                  const cls =
                    state === "right"
                      ? "border-[var(--accent)]/60 bg-[var(--accent)]/[0.08] text-[var(--text-primary)]"
                      : state === "wrong"
                      ? "border-[#ef4444]/50 bg-[#ef4444]/[0.06] text-[var(--text-secondary)]"
                      : state === "missed"
                      ? "border-[var(--accent)]/30 text-[var(--text-secondary)]"
                      : isChosen
                      ? "border-white/20 bg-white/[0.03] text-[var(--text-primary)]"
                      : "border-[var(--border)] hover:border-white/15 text-[var(--text-secondary)]";
                  return (
                    <button
                      key={i}
                      onClick={() => choose(q.id, i)}
                      disabled={answered}
                      className={`w-full text-left px-4 py-3 rounded-lg border text-[14px] leading-snug transition-colors ${cls} ${
                        answered ? "cursor-default" : "cursor-pointer"
                      }`}
                    >
                      {decodeEntities(opt)}
                    </button>
                  );
                })}
              </div>
              {answered && q.explain && (
                <p className="mt-4 text-[13px] text-[var(--text-muted)] leading-relaxed">
                  {decodeEntities(q.explain)}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ────────────────── Reflection ────────────────── */

export function Reflection({
  prompt,
  placeholder = "Write your answer",
  storageKey = "reflection",
  minChars = 40,
}: {
  prompt: string;
  placeholder?: string;
  storageKey?: string;
  minChars?: number;
}) {
  const { items, setItem } = useModule();
  const value = (items[storageKey] as string | undefined) ?? "";
  const chars = value.trim().length;
  const ok = chars >= minChars;

  return (
    <section>
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] mb-4">
        Reflection
      </h2>
      <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card-bg)]">
        <p className="text-[15px] text-[var(--text-primary)] font-medium leading-snug mb-3">
          {decodeEntities(prompt)}
        </p>
        <textarea
          value={value}
          onChange={(e) => setItem(storageKey, e.target.value)}
          placeholder={placeholder}
          rows={5}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5 text-[14px] text-[var(--text-primary)] leading-relaxed outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/30 resize-y"
        />
        <div className="mt-2 flex justify-between items-center text-[11px] tabular-nums">
          <span className="text-[var(--text-muted)]">
            {ok ? "Saved locally. Only you can see this." : `At least ${minChars} characters`}
          </span>
          <span className={ok ? "text-[var(--accent)]" : "text-[var(--text-muted)]"}>
            {chars} chars
          </span>
        </div>
      </div>
    </section>
  );
}

/* ────────────────── Calculator (generic container) ────────────────── */

export function Calculator({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] mb-4">
        {title}
      </h2>
      <div className="p-5 md:p-6 rounded-xl border border-[var(--accent)]/25 bg-[var(--accent)]/[0.03]">
        {children}
      </div>
    </section>
  );
}

/* ────────────────── CompleteModule ────────────────── */

/**
 * The action that actually marks the module complete on the server.
 * If `requireChecklistKey` is set, it checks that every item in that
 * checklist is ticked before enabling the button.
 */
export function CompleteModule({
  nextPath,
  nextLabel,
  requireChecklistKey,
  requireChecklistCount,
}: {
  /** Where to send the user after completion. Defaults to the pillar index. */
  nextPath?: string;
  nextLabel?: string;
  /** Storage key of a Checklist that must be fully checked. */
  requireChecklistKey?: string;
  /** Total number of checklist items (we need this to know "all checked"). */
  requireChecklistCount?: number;
}) {
  const { completed, markComplete, items } = useModule();
  const [saving, setSaving] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  const canComplete = useMemo(() => {
    if (!requireChecklistKey || !requireChecklistCount) return true;
    const map = (items[requireChecklistKey] as Record<string, boolean> | undefined) ?? {};
    const done = Object.values(map).filter(Boolean).length;
    return done >= requireChecklistCount;
  }, [items, requireChecklistKey, requireChecklistCount]);

  const onClick = async () => {
    if (completed) {
      if (nextPath) window.location.href = nextPath;
      return;
    }
    setSaving(true);
    const ok = await markComplete();
    setSaving(false);
    if (ok) {
      setJustCompleted(true);
      // Give the success state a beat, then move on.
      setTimeout(() => {
        if (nextPath) window.location.href = nextPath;
      }, 900);
    }
  };

  const isDone = completed || justCompleted;

  return (
    <section className="pt-6 border-t border-[var(--border)]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
            {isDone ? "Module complete" : "When you've done the task"}
          </div>
          <div className="text-[15px] text-[var(--text-primary)] font-medium mt-1">
            {isDone
              ? "Nice. Your progress is saved to your account."
              : canComplete
              ? "Mark complete to save progress and unlock what's next."
              : "Finish the checklist above to enable the completion button."}
          </div>
        </div>
        <button
          onClick={onClick}
          disabled={!canComplete || saving}
          className={`shrink-0 px-5 py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
            isDone
              ? "bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/40"
              : "bg-[var(--accent)] text-[#0a0b0f] hover:opacity-90 cursor-pointer"
          }`}
        >
          {saving
            ? "Saving..."
            : isDone
            ? nextLabel
              ? `${nextLabel} →`
              : "Continue →"
            : "Mark complete"}
        </button>
      </div>
    </section>
  );
}

/* ────────────────── UnlockGate (for locked advanced modules) ────────────────── */

export function UnlockGate({
  requiredTitles,
  pillarHref,
}: {
  requiredTitles: string[];
  pillarHref: string;
}) {
  return (
    <div className="max-w-2xl mx-auto px-6 pt-24 pb-24">
      <div className="p-8 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-white/[0.04] flex items-center justify-center mb-4">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--text-muted)" strokeWidth="1.8">
            <rect x="4" y="9" width="12" height="8" rx="1.5" />
            <path d="M7 9V6a3 3 0 0 1 6 0v3" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
          Advanced module
        </h2>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
          Finish these first. It takes maybe fifteen minutes and the advanced material lands much harder with them in place.
        </p>
        <ul className="inline-block text-left space-y-2 mb-8">
          {requiredTitles.map((t) => (
            <li key={t} className="flex items-center gap-2.5 text-[14px] text-[var(--text-secondary)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" aria-hidden />
              {t}
            </li>
          ))}
        </ul>
        <div>
          <a
            href={pillarHref}
            className="inline-block px-5 py-3 rounded-xl bg-[var(--accent)] text-[#0a0b0f] text-sm font-bold hover:opacity-90 transition-opacity"
          >
            Back to pillar
          </a>
        </div>
      </div>
    </div>
  );
}
