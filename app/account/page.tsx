"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import { getSupabase } from "../lib/supabase";

interface AccountInfo {
  authenticated: boolean;
  email?: string;
  paid?: boolean;
  admin?: boolean;
  paidAt?: string | null;
  refundedAt?: string | null;
  memberSince?: string | null;
}

function formatDate(iso: string | null | undefined): string {
  if (!iso) return "-";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "-";
  }
}

export default function AccountPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<AccountInfo | null>(null);

  useEffect(() => {
    fetch("/api/account", { credentials: "same-origin" })
      .then((r) => r.json())
      .then((data) => {
        if (!data?.authenticated) {
          router.push("/login?return=%2Faccount");
          return;
        }
        setInfo(data);
      })
      .catch(() => router.push("/login?return=%2Faccount"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST", credentials: "same-origin" });
    } catch {
      // ignore
    }
    try {
      await getSupabase().auth.signOut();
    } catch {
      // ignore
    }
    window.location.href = "/";
  };

  if (loading || !info) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const status = info.refundedAt
    ? { label: "Refunded", color: "#ef4444" }
    : info.paid
      ? { label: "Active", color: "#00d4aa" }
      : { label: "Inactive", color: "#888" };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />

      <div className="max-w-2xl mx-auto px-6 pt-28 pb-20">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
            Your account
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1.5">
            Manage your Compound OS access.
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 md:p-7 mb-6">
          <Row label="Email" value={info.email ?? "-"} />
          <Row
            label="Status"
            value={
              <span
                className="inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: status.color }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: status.color }}
                />
                {status.label}
                {info.admin && (
                  <span className="text-xs text-[var(--text-muted)] font-normal">
                    (admin)
                  </span>
                )}
              </span>
            }
          />
          <Row label="Member since" value={formatDate(info.memberSince)} />
          {info.paid && (
            <Row label="Purchased" value={formatDate(info.paidAt)} last />
          )}
          {info.refundedAt && (
            <Row label="Refunded" value={formatDate(info.refundedAt)} last />
          )}
        </div>

        {info.paid && (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 md:p-7 mb-6">
            <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
              Access
            </h2>
            <p className="text-sm text-[var(--text-muted)] mb-4 leading-relaxed">
              You have lifetime access to all three pillars. Every future update is included.
            </p>
            <Link
              href="/dashboard"
              className="inline-block px-5 py-2.5 rounded-lg bg-[var(--accent)] text-[#0a0b0f] font-semibold text-sm transition-all hover:opacity-90"
            >
              Open dashboard →
            </Link>
          </div>
        )}

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 md:p-7">
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
            Session
          </h2>
          <p className="text-sm text-[var(--text-muted)] mb-4 leading-relaxed">
            Signed in on this device. To access on another device, sign in with{" "}
            <span className="text-[var(--text-secondary)]">{info.email}</span> at{" "}
            <Link
              href="/login"
              className="text-[var(--accent)] hover:opacity-80 transition-opacity"
            >
              /login
            </Link>
            .
          </p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-white/[0.12] transition-all cursor-pointer"
          >
            Sign out
          </button>
        </div>

        <p className="mt-8 text-xs text-[var(--text-muted)] text-center">
          Questions or refund request? Reach out at{" "}
          <a
            href="mailto:hi@thecompoundsystem.com"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            hi@thecompoundsystem.com
          </a>
        </p>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  last,
}: {
  label: string;
  value: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between py-3 ${
        last ? "" : "border-b border-[var(--border)]"
      }`}
    >
      <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-medium">
        {label}
      </span>
      <span className="text-sm text-[var(--text-primary)]">{value}</span>
    </div>
  );
}
