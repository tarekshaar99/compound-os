// Progress tracking via localStorage
// Simple, no backend needed. Stores which sections the user has completed per pillar.

const STORAGE_KEY = "cos_progress";

export interface PillarProgress {
  completedSections: string[];
}

export interface AllProgress {
  trading: PillarProgress;
  fitness: PillarProgress;
  mindset: PillarProgress;
  lastVisited?: { pillar: string; section: string; timestamp: number };
  onboardingSeen?: boolean;
}

function getDefault(): AllProgress {
  return {
    trading: { completedSections: [] },
    fitness: { completedSections: [] },
    mindset: { completedSections: [] },
  };
}

export function getProgress(): AllProgress {
  if (typeof window === "undefined") return getDefault();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefault();
    return { ...getDefault(), ...JSON.parse(raw) };
  } catch {
    return getDefault();
  }
}

export function saveProgress(progress: AllProgress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function markSectionComplete(pillar: "trading" | "fitness" | "mindset", sectionId: string) {
  const p = getProgress();
  if (!p[pillar].completedSections.includes(sectionId)) {
    p[pillar].completedSections.push(sectionId);
  }
  saveProgress(p);
  return p;
}

export function markSectionIncomplete(pillar: "trading" | "fitness" | "mindset", sectionId: string) {
  const p = getProgress();
  p[pillar].completedSections = p[pillar].completedSections.filter((s) => s !== sectionId);
  saveProgress(p);
  return p;
}

export function setLastVisited(pillar: string, section: string) {
  const p = getProgress();
  p.lastVisited = { pillar, section, timestamp: Date.now() };
  saveProgress(p);
}

export function markOnboardingSeen() {
  const p = getProgress();
  p.onboardingSeen = true;
  saveProgress(p);
}

export function getPillarStats(pillar: "trading" | "fitness" | "mindset", totalSections: number) {
  const p = getProgress();
  const completed = p[pillar].completedSections.length;
  return {
    completed,
    total: totalSections,
    percentage: totalSections > 0 ? Math.round((completed / totalSections) * 100) : 0,
  };
}
