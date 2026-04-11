"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setStatus("error");
    } else {
      setStatus("sent");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link
            href="/"
            className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] uppercase tracking-widest"
          >
            &larr; Compound OS
          </Link>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mt-6 mb-3">
            Access your account
          </h1>
          <p className="text-[var(--text-secondary)]">
            Enter your email to receive a login link. No password needed.
          </p>
        </div>

        {status === "sent" ? (
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-[var(--accent)]/12 flex items-center justify-center text-[var(--accent)] text-2xl mx-auto mb-5">
              ✓
            </div>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
              Check your email
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              We sent a login link to <strong className="text-[var(--text-primary)]">{email}</strong>. Click the link to access your account.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-8">
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text-primary)] text-base outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] transition-colors"
              />

              {status === "error" && (
                <p className="mt-3 text-sm text-[#ef4444]">
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full mt-5 px-6 py-3.5 rounded-xl bg-[var(--accent)] text-[#0a0b0f] font-bold text-base transition-all hover:opacity-90 disabled:opacity-50 cursor-pointer"
              >
                {status === "loading" ? "Sending..." : "Send login link"}
              </button>
            </div>
          </form>
        )}

        <p className="text-center text-sm text-[var(--text-muted)] mt-6">
          Don&apos;t have access yet?{" "}
          <Link href="/#pricing" className="text-[var(--accent)] hover:underline">
            Get the System
          </Link>
        </p>
      </div>
    </div>
  );
}
