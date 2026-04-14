"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSupabase } from "../lib/supabase";
import { getProgress, getPillarStats, markOnboardingSeen, AllProgress } from "../lib/progress";
import Header from "../components/Header";

const PILLAR_CONFIG = {
  trading: {
    label: "Markets",
    description: "Investing foundations, the Wheel Strategy, macro & portfolio strategy",
    icon: "◈",
    accent: "var(--accent-trading)",
    accentHex: "#00d4aa",
    href: "/trading",
    totalSections: 28,
    quickAction: { label: "Investing Foundations", section: "foundations" },
  },
  fitness: {
    label: "Fitness",
    description: "Hybrid athlete system, nutrition, recovery, nervous system",
    icon: "⚡",
    accent: "var(--accent-fitness)",
    accentHex: "#f97316",
    href: "/fitness",
    totalSections: 10,
    quickAction: { label: "Weekly Schedule", section: "schedule" },
  },
  mindset: {
    label: "Mindset",
    description: "Identity, emotional mastery, wealth psychology, daily practice",
    icon: "◉",
    accent: "var(--accent-mindset)",
    accentHex: "#a78bfa",
    href: "/mindset",
    totalSections: 7,
    quickAction: { label: "Daily Practice", section: "practice" },
  },
} as const;

type PillarKey = keyof typeof PILLAR_CONFIG;

function ProgressBar({ percentage, color }: { percentage: number; color: string }) {
  return (
    <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{
          width: `${percentage}%`,
          background: color,
          opacity: percentage === 0 ? 0 : 1,
        }}
      />
    </div>
  );
}

function PillarCard({ pillar, progress }: { pillar: PillarKey; progress: AllProgress }) {
  const config = PILLAR_CONFIG[pillar];
  const stats = getPillarStats(pillar, config.totalSections);
  const hasStarted = stats.completed > 0;

  return (
    <Link
      href={config.href}
      className="group block p-6 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
          style={{
            background: `color-mix(in srgb, ${config.accentHex} 12%, transparent)`,
            color: config.accentHex,
          }}
        >
          {config.icon}
        </div>
        {hasStarted && (
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              background: `color-mix(in srgb, ${config.accentHex} 12%, transparent)`,
              color: config.accentHex,
            }}
          >
            {stats.percentage}%
          </span>
        )}
      </div>

      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1 tracking-tight">
        {config.label}
      </h3>
      <p className="text-sm text-[var(--text-muted)] mb-5 leading-relaxed">
        {config.description}
      </p>

      <ProgressBar percentage={stats.percentage} color={config.accentHex} />

      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-[var(--text-muted)]">
          {stats.completed} of {stats.total} sections
        </span>
        <span
          className="text-xs font-semibold group-hover:translate-x-0.5 transition-transform duration-300"
          style={{ color: config.accentHex }}
        >
          {hasStarted ? "Continue" : "Start"} &rarr;
        </span>
      </div>
    </Link>
  );
}

function QuickActionCard({
  label,
  href,
  icon,
  color,
}: {
  label: string;
  href: string;
  icon: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] hover:border-white/[0.12] transition-all duration-300 group"
    >
      <span className="text-lg" style={{ color }}>
        {icon}
      </span>
      <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
        {label}
      </span>
    </Link>
  );
}

function StartHereBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="relative rounded-2xl border border-[var(--accent)]/20 bg-gradient-to-br from-[var(--accent)]/[0.06] to-transparent p-6 md:p-8 mb-8 overflow-hidden">
      {/* Subtle glow */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none"
        style={{ background: "var(--accent)" }}
      />

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
              Welcome to The Compound System
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-lg">
              Three interconnected pillars designed to compound together. Start with whichever resonates most — there&apos;s no wrong entry point. Each pillar strengthens the others.
            </p>
          </div>
          <button
            onClick={onDismiss}
            className="text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors p-1 -mt-1 -mr-1 shrink-0"
            title="Dismiss"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4.5 4.5l9 9M13.5 4.5l-9 9" />
            </svg>
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mt-5">
          <Link
            href="/trading"
            className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: "#00d4aa", color: "#0a0b0f" }}
          >
            Start with Markets
          </Link>
          <Link
            href="/fitness"
            className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: "#f97316", color: "#0a0b0f" }}
          >
            Start with Fitness
          </Link>
          <Link
            href="/mindset"
            className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: "#a78bfa", color: "#0a0b0f" }}
          >
            Start with Mindset
          </Link>
        </div>
      </div>
    </div>
  );
}

function OverallProgress({ progress }: { progress: AllProgress }) {
  const tradingStats = getPillarStats("trading", PILLAR_CONFIG.trading.totalSections);
  const fitnessStats = getPillarStats("fitness", PILLAR_CONFIG.fitness.totalSections);
  const mindsetStats = getPillarStats("mindset", PILLAR_CONFIG.mindset.totalSections);

  const totalCompleted = tradingStats.completed + fitnessStats.completed + mindsetStats.completed;
  const totalSections = tradingStats.total + fitnessStats.total + mindsetStats.total;
  const overallPercentage = totalSections > 0 ? Math.round((totalCompleted / totalSections) * 100) : 0;

  if (totalCompleted === 0) return null;

  return (
    <div className="flex items-center gap-4 px-5 py-4 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] mb-8">
      <div className="relative w-14 h-14 shrink-0">
        <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
          <circle cx="28" cy="28" r="24" fill="none" stroke="var(--border)" strokeWidth="4" />
          <circle
            cx="28"
            cy="28"
            r="24"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 24}`}
            strokeDashoffset={`${2 * Math.PI * 24 * (1 - overallPercentage / 100)}`}
            className="transition-all duration-700"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[var(--text-primary)]">
          {overallPercentage}%
        </span>
      </div>
      <div>
        <div className="text-sm font-semibold text-[var(--text-primary)]">
          Overall Progress
        </div>
        <div className="text-xs text-[var(--text-muted)] mt-0.5">
          {totalCompleted} of {totalSections} sections completed across all pillars
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);
  const [progress, setProgress] = useState<AllProgress | null>(null);
  const [showStartHere, setShowStartHere] = useState(false);

  useEffect(() => {
    async function init() {
      // Check auth — redirect if not logged in
      const token = localStorage.getItem("cos_access");
      let email: string | null = null;

      if (!token) {
        try {
          const { data: { session } } = await getSupabase().auth.getSession();
          if (session?.user?.email) {
            email = session.user.email;
            // Verify they have access
            const res = await fetch("/api/access", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (!data.access) {
              router.push("/");
              return;
            }
          } else {
            router.push("/");
            return;
          }
        } catch {
          router.push("/");
          return;
        }
      }

      // Load progress
      const p = getProgress();
      setProgress(p);
      setShowStartHere(!p.onboardingSeen);

      // Extract name from email for greeting
      if (email) {
        const namePart = email.split("@")[0];
        // Capitalize first letter, handle dots/underscores
        const formatted = namePart
          .split(/[._-]/)
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
        setUserName(formatted);
      }

      setLoading(false);
    }

    init();
  }, [router]);

  const handleDismissStartHere = () => {
    markOnboardingSeen();
    setShowStartHere(false);
    setProgress(getProgress());
  };

  const handleLogout = async () => {
    localStorage.removeItem("cos_access");
    localStorage.removeItem("cos_progress");
    try {
      await getSupabase().auth.signOut();
    } catch {
      // Silent fail
    }
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!progress) return null;

  const lastVisited = progress.lastVisited;

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />

      <div className="max-w-5xl mx-auto px-6 pt-24 pb-20">
        {/* Welcome */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              {userName ? `Welcome back, ${userName}` : "Welcome back"}
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-1.5">
              Pick up where you left off, or explore something new.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="hidden sm:block text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors px-3 py-2 rounded-lg border border-transparent hover:border-[var(--border)]"
          >
            Sign out
          </button>
        </div>

        {/* Start Here — first visit only */}
        {showStartHere && <StartHereBanner onDismiss={handleDismissStartHere} />}

        {/* Overall progress ring — shown once they've started */}
        <OverallProgress progress={progress} />

        {/* Continue where you left off */}
        {lastVisited && (
          <div className="mb-8">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-3">
              Continue where you left off
            </h2>
            <Link
              href={`/${lastVisited.pillar}`}
              className="flex items-center gap-4 px-5 py-4 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] hover:border-white/[0.12] transition-all duration-300 group"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0"
                style={{
                  background: `color-mix(in srgb, ${PILLAR_CONFIG[lastVisited.pillar as PillarKey]?.accentHex || "#00d4aa"} 12%, transparent)`,
                  color: PILLAR_CONFIG[lastVisited.pillar as PillarKey]?.accentHex || "#00d4aa",
                }}
              >
                {PILLAR_CONFIG[lastVisited.pillar as PillarKey]?.icon || "◈"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-[var(--text-primary)]">
                  {PILLAR_CONFIG[lastVisited.pillar as PillarKey]?.label || lastVisited.pillar} &mdash; {lastVisited.section}
                </div>
                <div className="text-xs text-[var(--text-muted)] mt-0.5">
                  Last visited {getTimeAgo(lastVisited.timestamp)}
                </div>
              </div>
              <span
                className="text-sm font-semibold group-hover:translate-x-0.5 transition-transform"
                style={{ color: PILLAR_CONFIG[lastVisited.pillar as PillarKey]?.accentHex || "#00d4aa" }}
              >
                Resume &rarr;
              </span>
            </Link>
          </div>
        )}

        {/* Three Pillar Cards */}
        <div className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-3">
            Your Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <PillarCard pillar="trading" progress={progress} />
            <PillarCard pillar="fitness" progress={progress} />
            <PillarCard pillar="mindset" progress={progress} />
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-3">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <QuickActionCard
              label="Pre-Trade Checklist"
              href="/trading"
              icon="☑"
              color="#00d4aa"
            />
            <QuickActionCard
              label="Weekly Training Schedule"
              href="/fitness"
              icon="📅"
              color="#f97316"
            />
            <QuickActionCard
              label="Daily Practice"
              href="/mindset"
              icon="◉"
              color="#a78bfa"
            />
          </div>
        </div>

        {/* Mobile sign out */}
        <div className="sm:hidden mt-12 text-center">
          <button
            onClick={handleLogout}
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

function getTimeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "yesterday";
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}
