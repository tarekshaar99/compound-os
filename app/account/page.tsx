"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Reveal from "../components/motion/Reveal";
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
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "—";
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
        <div className="w-10 h-10 border border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const status = info.refundedAt
    ? { label: "Refunded", color: "#ff8a8a" }
    : info.paid
      ? { label: "Active", color: "var(--accent)" }
      : { label: "Inactive", color: "var(--text-muted)" };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />

      <div className="max-w-[680px] mx-auto px-6 pt-32 md:pt-36 pb-24">
        <Reveal>
          <span className="label-caps text-[var(--accent)] block mb-6">
            Subscriber file
          </span>
          <h1 className="font-serif text-[44px] md:text-[56px] leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)] font-light">
            Your account.
          </h1>
          <p className="mt-5 font-serif italic text-[16px] md:text-[18px] text-[var(--text-secondary)]">
            Manage your Compound OS access.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="my-12 h-px w-12 bg-[var(--accent)]" />
        </Reveal>

        {/* Account record */}
        <Reveal delay={0.25}>
          <section className="mb-12">
            <h2 className="label-caps text-[var(--text-muted)] mb-5 pb-3 border-b border-[var(--border)]">
              Record
            </h2>
            <dl className="divide-y divide-[var(--border-soft)]">
              <Row label="Email" value={info.email ?? "—"} />
              <Row
                label="Status"
                value={
                  <span
                    className="inline-flex items-baseline gap-2 label-caps"
                    style={{ color: status.color }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full inline-block"
                      style={{ background: status.color }}
                      aria-hidden
                    />
                    {status.label}
                    {info.admin && (
                      <span className="label-caps text-[var(--text-muted)]">
                        &middot; Admin
                      </span>
                    )}
                  </span>
                }
              />
              <Row label="Member since" value={formatDate(info.memberSince)} />
              {info.paid && (
                <Row label="Purchased" value={formatDate(info.paidAt)} />
              )}
              {info.refundedAt && (
                <Row label="Refunded" value={formatDate(info.refundedAt)} />
              )}
            </dl>
          </section>
        </Reveal>

        {info.paid && (
          <Reveal delay={0.3}>
            <section className="mb-12">
              <h2 className="label-caps text-[var(--accent)] mb-5 pb-3 border-b border-[var(--border)]">
                Access
              </h2>
              <p className="font-serif text-[16px] text-[var(--text-secondary)] leading-[1.75] mb-6">
                You have lifetime access to all three pillars. Every future
                update is included.
              </p>
              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-3 px-7 py-3.5 bg-[var(--accent)] text-[var(--on-accent)] label-caps border border-[var(--accent)] hover:bg-transparent hover:text-[var(--accent)] transition-all duration-300"
              >
                Open dashboard
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </Link>
            </section>
          </Reveal>
        )}

        {/* Session */}
        <Reveal delay={0.35}>
          <section className="mb-12">
            <h2 className="label-caps text-[var(--text-muted)] mb-5 pb-3 border-b border-[var(--border)]">
              Session
            </h2>
            <p className="font-serif text-[16px] text-[var(--text-secondary)] leading-[1.75] mb-6">
              Signed in on this device. To access on another device, sign
              in with{" "}
              <span className="text-[var(--text-primary)]">{info.email}</span>{" "}
              at{" "}
              <Link
                href="/login"
                className="text-[var(--accent)] hover:opacity-80 border-b border-[var(--accent)]/30"
              >
                /login
              </Link>
              .
            </p>
            <button
              type="button"
              onClick={handleLogout}
              className="px-6 py-3 label-caps text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
            >
              Sign out
            </button>
          </section>
        </Reveal>

        <Reveal delay={0.45}>
          <p className="mt-12 font-serif italic text-[13px] text-[var(--text-muted)] text-center">
            Questions or refund request? Reach out at{" "}
            <a
              href="mailto:tarek@thecompoundsystem.com"
              className="text-[var(--accent)] hover:opacity-80 border-b border-[var(--accent)]/30"
            >
              tarek@thecompoundsystem.com
            </a>
          </p>
        </Reveal>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between py-4 gap-4">
      <dt className="label-caps text-[var(--text-muted)]">{label}</dt>
      <dd className="font-serif text-[16px] text-[var(--text-primary)] text-right">
        {value}
      </dd>
    </div>
  );
}
