"use client";

import { useMemo, useState } from "react";
import { useModule } from "./ModuleContext";
import { decodeEntities } from "../../lib/text";
import Reveal from "../motion/Reveal";

/* ────────────────── Checklist ────────────────── */

/**
 * Persisted checklist. Each item has a stable local `id` so we can hydrate
 * from ModuleContext.items[itemId] = boolean.
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
    <Reveal as="section">
      <div className="flex items-baseline justify-between mb-5 pb-3 border-b border-[var(--border)]">
        <h2 className="label-caps text-[var(--accent)]">
          {title ?? "Action checklist"}
        </h2>
        <span className="label-caps text-[var(--text-muted)] tabular-nums">
          {doneCount} / {items.length}
        </span>
      </div>
      <ul className="divide-y divide-[var(--border)]">
        {items.map((it) => {
          const checked = !!map[it.id];
          return (
            <li key={it.id}>
              <button
                type="button"
                onClick={() => toggle(it.id)}
                className="w-full text-left flex items-baseline gap-4 py-4 hover:bg-[var(--card-bg)] transition-colors px-2 -mx-2 cursor-pointer"
              >
                <span
                  className="shrink-0 w-5 h-5 mt-0.5 border flex items-center justify-center transition-colors"
                  style={
                    checked
                      ? {
                          borderColor: "var(--accent)",
                          background: "var(--accent)",
                        }
                      : { borderColor: "var(--text-muted)" }
                  }
                  aria-hidden
                >
                  {checked && (
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="#0a0b0f"
                      strokeWidth="2.5"
                    >
                      <polyline points="2 6 5 9 10 3" />
                    </svg>
                  )}
                </span>
                <span className="flex-1">
                  <span
                    className={`block font-serif text-[16px] md:text-[17px] leading-snug ${
                      checked
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)]"
                    }`}
                  >
                    {decodeEntities(it.label)}
                  </span>
                  {it.hint && (
                    <span className="block mt-1.5 font-serif italic text-[14px] text-[var(--text-muted)] leading-relaxed">
                      {decodeEntities(it.hint)}
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </Reveal>
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
    <Reveal as="section">
      <h2 className="label-caps text-[var(--accent)] mb-5 pb-3 border-b border-[var(--border)]">
        {title ?? "Quick check"}
      </h2>
      <div className="space-y-8">
        {questions.map((q, qi) => {
          const chosen = answers[q.id];
          const answered = typeof chosen === "number";
          return (
            <div
              key={q.id}
              className="bg-[var(--card-bg)] border border-[var(--border)] p-5 md:p-6"
            >
              <div className="flex items-baseline gap-3 mb-5">
                <span className="label-caps text-[var(--text-muted)] shrink-0">
                  Q{String(qi + 1).padStart(2, "0")}
                </span>
                <p className="font-serif text-[16px] md:text-[18px] text-[var(--text-primary)] leading-snug">
                  {decodeEntities(q.prompt)}
                </p>
              </div>
              <div className="space-y-1.5">
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
                      ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--text-primary)]"
                      : state === "wrong"
                        ? "border-[#ef4444]/50 bg-[#ef4444]/[0.06] text-[var(--text-secondary)]"
                        : state === "missed"
                          ? "border-[var(--accent)]/30 text-[var(--text-secondary)]"
                          : isChosen
                            ? "border-[var(--text-primary)] text-[var(--text-primary)]"
                            : "border-[var(--border)] hover:border-[var(--text-muted)] text-[var(--text-secondary)]";
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => choose(q.id, i)}
                      disabled={answered}
                      className={`w-full text-left px-4 py-3 border font-serif text-[15px] leading-snug transition-colors ${cls} ${
                        answered ? "cursor-default" : "cursor-pointer"
                      }`}
                    >
                      {decodeEntities(opt)}
                    </button>
                  );
                })}
              </div>
              {answered && q.explain && (
                <p className="mt-4 pt-4 border-t border-[var(--border-soft)] font-serif italic text-[14px] text-[var(--text-muted)] leading-relaxed">
                  {decodeEntities(q.explain)}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </Reveal>
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
    <Reveal as="section">
      <h2 className="label-caps text-[var(--accent)] mb-5 pb-3 border-b border-[var(--border)]">
        Reflection
      </h2>
      <div className="bg-[var(--card-bg)] border border-[var(--border)] p-5 md:p-6">
        <p className="font-serif italic text-[16px] md:text-[18px] text-[var(--text-primary)] leading-snug mb-4">
          {decodeEntities(prompt)}
        </p>
        <label className="sr-only" htmlFor={`reflection-${storageKey}`}>
          Your reflection
        </label>
        <textarea
          id={`reflection-${storageKey}`}
          value={value}
          onChange={(e) => setItem(storageKey, e.target.value)}
          placeholder={placeholder}
          rows={5}
          className="w-full border border-[var(--border)] bg-[var(--bg)] px-4 py-3 font-serif text-[15px] text-[var(--text-primary)] leading-relaxed outline-none focus:border-[var(--accent)] focus-visible:border-[var(--accent)] resize-y placeholder:font-serif placeholder:italic placeholder:text-[var(--text-muted)]"
        />
        <div className="mt-3 flex justify-between items-center label-caps tabular-nums">
          <span className="text-[var(--text-muted)] normal-case tracking-normal font-serif italic text-[12px]">
            {ok ? "Saved locally · only you can see this" : `At least ${minChars} characters`}
          </span>
          <span className={ok ? "text-[var(--accent)]" : "text-[var(--text-muted)]"}>
            {chars}
          </span>
        </div>
      </div>
    </Reveal>
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
    <Reveal as="section">
      <h2 className="label-caps text-[var(--accent)] mb-5 pb-3 border-b border-[var(--border)]">
        {title}
      </h2>
      <div className="relative bg-[var(--card-bg)] border border-[var(--border)] p-5 md:p-6">
        <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--accent)]" />
        <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--accent)]" />
        {children}
      </div>
    </Reveal>
  );
}

/* ────────────────── CompleteModule ────────────────── */

/**
 * Marks the module complete on the server. If `requireChecklistKey` is set,
 * checks that every item in that checklist is ticked before enabling.
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
      setTimeout(() => {
        if (nextPath) window.location.href = nextPath;
      }, 900);
    }
  };

  const isDone = completed || justCompleted;

  return (
    <section className="pt-10 border-t border-[var(--border)]">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <span className="label-caps text-[var(--text-muted)] block mb-2">
            {isDone ? "Module synthesized" : "When you've done the task"}
          </span>
          <p className="font-serif text-[16px] md:text-[18px] text-[var(--text-primary)] leading-snug">
            {isDone
              ? "Nice. Your progress is saved to your account."
              : canComplete
                ? "Mark complete to save progress and unlock what's next."
                : "Finish the checklist above to enable the completion button."}
          </p>
        </div>
        <button
          type="button"
          onClick={onClick}
          disabled={!canComplete || saving}
          className={`group inline-flex items-center justify-center gap-3 px-7 py-4 label-caps border transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shrink-0 ${
            isDone
              ? "border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/10 cursor-pointer"
              : "bg-[var(--accent)] text-[var(--on-accent)] border-[var(--accent)] hover:bg-transparent hover:text-[var(--accent)] cursor-pointer"
          }`}
        >
          {saving
            ? "Saving…"
            : isDone
              ? nextLabel
                ? `${nextLabel}`
                : "Continue"
              : "Mark Complete"}
          {!saving && (
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          )}
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
    <div className="max-w-2xl mx-auto px-6 pt-32 pb-24">
      <div className="relative bg-[var(--card-bg)] border border-[var(--border)] p-8 md:p-12 text-center">
        <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--accent)]" />
        <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--accent)]" />
        <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[var(--accent)]" />
        <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[var(--accent)]" />

        <span className="label-caps text-[var(--accent)] block mb-6">
          Advanced &middot; locked
        </span>
        <h2 className="font-serif text-[28px] md:text-[36px] leading-[1.1] tracking-tight text-[var(--text-primary)] font-light mb-4">
          Finish these first.
        </h2>
        <p className="font-serif italic text-[15px] md:text-[16px] text-[var(--text-secondary)] leading-relaxed mb-8 max-w-md mx-auto">
          It takes maybe fifteen minutes and the advanced material lands much
          harder with them in place.
        </p>
        <ul className="inline-block text-left space-y-3 mb-10">
          {requiredTitles.map((t) => (
            <li
              key={t}
              className="flex items-baseline gap-3 font-serif text-[15px] md:text-[16px] text-[var(--text-secondary)]"
            >
              <span
                className="label-caps text-[var(--accent)] shrink-0"
                aria-hidden
              >
                &mdash;
              </span>
              {t}
            </li>
          ))}
        </ul>
        <a
          href={pillarHref}
          className="inline-flex items-center gap-3 px-7 py-4 bg-[var(--accent)] text-[var(--on-accent)] label-caps border border-[var(--accent)] hover:bg-transparent hover:text-[var(--accent)] transition-all duration-300"
        >
          Back to pillar
        </a>
      </div>
    </div>
  );
}
