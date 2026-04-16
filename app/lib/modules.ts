/**
 * Single source of truth for every module in the product.
 *
 * Each module has:
 *  - id: stable identifier, used as primary key in user_progress
 *  - pillar: trading | fitness | mindset
 *  - tier: "core" (unlocked by default once paid) or "advanced" (gated)
 *  - title, blurb: display copy on pillar index and dashboard
 *  - path: where the full lesson lives (e.g. /trading/m/foundations)
 *  - unlockBy: list of module ids that must be completed to unlock (advanced only)
 *  - estMinutes: honest read/execution time
 *
 * Add a new module by appending to MODULES. Everything else picks it up.
 */

export type Pillar = "trading" | "fitness" | "mindset";
export type Tier = "core" | "advanced";

export interface ModuleDef {
  id: string;
  pillar: Pillar;
  tier: Tier;
  title: string;
  blurb: string;
  path: string;
  unlockBy?: string[];
  estMinutes: number;
  /** Optional. If true, it's the suggested first module for its pillar. */
  startHere?: boolean;
}

export const MODULES: ModuleDef[] = [
  /* ───────── TRADING ───────── */
  {
    id: "trading.foundations",
    pillar: "trading",
    tier: "core",
    title: "Investing Foundations",
    blurb:
      "The mental model behind every position. Capital preservation, time horizons, and the difference between speculation and investing.",
    path: "/trading/m/foundations",
    estMinutes: 18,
    startHere: true,
  },
  {
    id: "trading.capital-preservation",
    pillar: "trading",
    tier: "core",
    title: "Capital Preservation",
    blurb:
      "Rule one: don't blow up. Position sizing, max drawdown rules, and when to hold cash.",
    path: "/trading/m/capital-preservation",
    estMinutes: 14,
  },
  {
    id: "trading.pre-trade-checklist",
    pillar: "trading",
    tier: "core",
    title: "The Pre-Trade Checklist",
    blurb:
      "Nine questions you answer out loud before any position. If you can't answer, you don't trade.",
    path: "/trading/m/pre-trade-checklist",
    estMinutes: 10,
  },
  {
    id: "trading.wheel-strategy",
    pillar: "trading",
    tier: "advanced",
    title: "The Wheel Strategy",
    blurb:
      "Cash-secured puts into covered calls. The income engine for sideways markets, with strike-selection math.",
    path: "/trading/m/wheel-strategy",
    unlockBy: ["trading.foundations", "trading.capital-preservation"],
    estMinutes: 22,
  },
  {
    id: "trading.vix-framework",
    pillar: "trading",
    tier: "advanced",
    title: "VIX Regime Framework",
    blurb:
      "Volatility tells you when to deploy, when to hold cash, and when to size up. With the deployment ladder.",
    path: "/trading/m/vix-framework",
    unlockBy: ["trading.foundations"],
    estMinutes: 16,
  },
  {
    id: "trading.weekly-review",
    pillar: "trading",
    tier: "advanced",
    title: "Weekly Review Ritual",
    blurb:
      "Thirty minutes every Sunday. The only thing that separates operators from gamblers.",
    path: "/trading/m/weekly-review",
    unlockBy: ["trading.pre-trade-checklist"],
    estMinutes: 12,
  },

  /* ───────── FITNESS ───────── */
  {
    id: "fitness.philosophy",
    pillar: "fitness",
    tier: "core",
    title: "Training Philosophy",
    blurb:
      "Hybrid athlete, not gym rat. The principles that govern strength, cardio, mobility, and recovery.",
    path: "/fitness/m/philosophy",
    estMinutes: 10,
    startHere: true,
  },
  {
    id: "fitness.weekly-split",
    pillar: "fitness",
    tier: "core",
    title: "The Weekly Split",
    blurb:
      "Three strength days, two to three cardio sessions, mobility daily. The structure that actually works.",
    path: "/fitness/m/weekly-split",
    estMinutes: 14,
  },
  {
    id: "fitness.tut",
    pillar: "fitness",
    tier: "core",
    title: "Time Under Tension",
    blurb:
      "Why tempo matters more than weight. The TUT rules that stopped my injuries.",
    path: "/fitness/m/tut",
    estMinutes: 12,
  },
  {
    id: "fitness.zone2-intervals",
    pillar: "fitness",
    tier: "advanced",
    title: "Zone 2 and Intervals",
    blurb:
      "The cardio structure: how much Zone 2, how many intervals, and how to know which one to do today.",
    path: "/fitness/m/zone2-intervals",
    unlockBy: ["fitness.philosophy", "fitness.weekly-split"],
    estMinutes: 13,
  },
  {
    id: "fitness.recovery",
    pillar: "fitness",
    tier: "advanced",
    title: "Recovery and Sleep",
    blurb:
      "The part most people skip. Sleep targets, deload logic, and how to read when you're cooked.",
    path: "/fitness/m/recovery",
    unlockBy: ["fitness.weekly-split"],
    estMinutes: 11,
  },
  {
    id: "fitness.peptides-note",
    pillar: "fitness",
    tier: "advanced",
    title: "Peptides: An Honest Note",
    blurb:
      "What they are, why people look into them, and the risks. Educational, conservative, not medical advice.",
    path: "/fitness/m/peptides-note",
    unlockBy: ["fitness.philosophy"],
    estMinutes: 8,
  },

  /* ───────── MINDSET ───────── */
  {
    id: "mindset.identity",
    pillar: "mindset",
    tier: "core",
    title: "Identity and Self-Image",
    blurb:
      "You act out the person you believe you are. Change the story, change the behavior.",
    path: "/mindset/m/identity",
    estMinutes: 11,
    startHere: true,
  },
  {
    id: "mindset.emotional-regulation",
    pillar: "mindset",
    tier: "core",
    title: "Emotional Regulation",
    blurb:
      "The difference between a reactor and an operator. Naming, metabolizing, and responding rather than reacting.",
    path: "/mindset/m/emotional-regulation",
    estMinutes: 12,
  },
  {
    id: "mindset.discipline",
    pillar: "mindset",
    tier: "core",
    title: "Daily Discipline",
    blurb:
      "Motivation is unreliable. Systems aren't. The habits that hold everything else up.",
    path: "/mindset/m/discipline",
    estMinutes: 10,
  },
  {
    id: "mindset.triggers",
    pillar: "mindset",
    tier: "advanced",
    title: "Trigger Awareness",
    blurb:
      "The three-step protocol for catching yourself mid-pattern and choosing something else.",
    path: "/mindset/m/triggers",
    unlockBy: ["mindset.emotional-regulation"],
    estMinutes: 10,
  },
  {
    id: "mindset.journaling",
    pillar: "mindset",
    tier: "advanced",
    title: "Structured Journaling",
    blurb:
      "Not a diary. A feedback loop. The three prompts that surface the pattern you're running.",
    path: "/mindset/m/journaling",
    unlockBy: ["mindset.identity"],
    estMinutes: 9,
  },
  {
    id: "mindset.decision-making",
    pillar: "mindset",
    tier: "advanced",
    title: "Decision-Making Under Pressure",
    blurb:
      "Binary thinking, sleep-on-it rules, and the pre-mortem. How to choose when you can't think straight.",
    path: "/mindset/m/decision-making",
    unlockBy: ["mindset.discipline", "mindset.emotional-regulation"],
    estMinutes: 11,
  },
];

export function getModule(id: string): ModuleDef | undefined {
  return MODULES.find((m) => m.id === id);
}

export function getPillarModules(pillar: Pillar): ModuleDef[] {
  return MODULES.filter((m) => m.pillar === pillar);
}

/** Given a set of completed module ids, return which modules are unlocked. */
export function computeUnlocked(completedIds: Set<string>): Set<string> {
  const unlocked = new Set<string>();
  for (const m of MODULES) {
    if (m.tier === "core") {
      unlocked.add(m.id);
      continue;
    }
    const prereqs = m.unlockBy ?? [];
    if (prereqs.every((id) => completedIds.has(id))) {
      unlocked.add(m.id);
    }
  }
  return unlocked;
}

/** Next recommended module: first unlocked, not-yet-completed module in the
 *  user's priority pillar, falling back to the first pillar with progress. */
export function recommendNext(
  completedIds: Set<string>,
  priorityPillar?: Pillar | null
): ModuleDef | null {
  const unlocked = computeUnlocked(completedIds);
  const candidates = MODULES.filter(
    (m) => unlocked.has(m.id) && !completedIds.has(m.id)
  );
  if (candidates.length === 0) return null;

  if (priorityPillar) {
    const inPriority = candidates.find((m) => m.pillar === priorityPillar);
    if (inPriority) return inPriority;
  }
  // Core first, then advanced. startHere modules win ties.
  candidates.sort((a, b) => {
    if (a.tier !== b.tier) return a.tier === "core" ? -1 : 1;
    if (!!a.startHere !== !!b.startHere) return a.startHere ? -1 : 1;
    return 0;
  });
  return candidates[0];
}

export function pillarStats(
  pillar: Pillar,
  completedIds: Set<string>
): { completed: number; total: number; pct: number } {
  const mods = getPillarModules(pillar);
  const completed = mods.filter((m) => completedIds.has(m.id)).length;
  const total = mods.length;
  return {
    completed,
    total,
    pct: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}
