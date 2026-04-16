"use client";

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

/**
 * Per-module client state. Every Lesson page wraps its children in a
 * <ModuleProvider moduleId="trading.foundations"> so the primitives below
 * (Checklist, Quiz, Reflection, CompleteModule) can:
 *
 *   - persist per-module state in localStorage (keyed by moduleId)
 *   - ask the server "is this module already complete?" on mount
 *   - fire POST /api/progress when the user hits CompleteModule
 */

export interface ModuleState {
  moduleId: string;
  completed: boolean;
  /** true while we're round-tripping the server to fetch initial state. */
  loading: boolean;
  /** checklists, quizzes, reflections all write into `items` keyed by local id. */
  items: Record<string, unknown>;
  setItem: (key: string, value: unknown) => void;
  markComplete: (extraData?: Record<string, unknown>) => Promise<boolean>;
}

const ModuleCtx = createContext<ModuleState | null>(null);

function lsKey(moduleId: string) {
  return `cos_module_${moduleId}`;
}

export function ModuleProvider({
  moduleId,
  children,
}: {
  moduleId: string;
  children: ReactNode;
}) {
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Record<string, unknown>>({});
  const visitedRef = useRef(false);

  // Hydrate from localStorage immediately so the user sees their checkboxes
  // even before the server responds.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(lsKey(moduleId));
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, [moduleId]);

  // Fetch server state and bump last-active.
  useEffect(() => {
    let cancelled = false;
    async function init() {
      try {
        const res = await fetch("/api/progress", { credentials: "same-origin" });
        if (!res.ok) throw new Error("not authed");
        const data = await res.json();
        if (cancelled) return;
        const done = Array.isArray(data.completed) && data.completed.includes(moduleId);
        setCompleted(done);
      } catch {
        // Unauthed or offline - safe to leave completed=false.
      } finally {
        if (!cancelled) setLoading(false);
      }
      // Fire-and-forget: tell server we visited this module.
      if (!visitedRef.current) {
        visitedRef.current = true;
        fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({ action: "visit", moduleId }),
        }).catch(() => {});
      }
    }
    init();
    return () => {
      cancelled = true;
    };
  }, [moduleId]);

  const setItem = (key: string, value: unknown) => {
    setItems((prev) => {
      const next = { ...prev, [key]: value };
      try {
        localStorage.setItem(lsKey(moduleId), JSON.stringify(next));
      } catch {
        // storage full / disabled - fine
      }
      return next;
    });
  };

  const markComplete = async (extraData: Record<string, unknown> = {}): Promise<boolean> => {
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          action: "complete",
          moduleId,
          data: { ...items, ...extraData },
        }),
      });
      if (!res.ok) return false;
      setCompleted(true);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <ModuleCtx.Provider
      value={{ moduleId, completed, loading, items, setItem, markComplete }}
    >
      {children}
    </ModuleCtx.Provider>
  );
}

export function useModule(): ModuleState {
  const ctx = useContext(ModuleCtx);
  if (!ctx) {
    throw new Error(
      "useModule must be called inside <ModuleProvider>. Wrap your Lesson page."
    );
  }
  return ctx;
}

/** Convenience: advance to next path (used by CompleteModule "Continue" btn). */
export function useGoNext() {
  const router = useRouter();
  return (path: string) => router.push(path);
}
