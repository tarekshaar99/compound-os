"use client";

import { useState } from "react";
import { getSupabase } from "../lib/supabase";

export default function LoginForm({
  defaultEmail = "",
  heading,
  subtext,
  compact = false,
}: {
  defaultEmail?: string;
  heading?: string;
  subtext?: string;
  compact?: boolean;
}) {
  const [email, setEmail] = useState(defaultEmail);
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    const { error } = await getSupabase().auth.signInWithOtp({
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

  if (status === "sent") {
    return (
      <div
        className={`bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl ${compact ? "p-6" : "p-8"} text-center`}
      >
        <div className="w-12 h-12 rounded-full bg-[var(--accent)]/12 flex items-center justify-center text-[var(--accent)] text-xl mx-auto mb-4">
          ✓
        </div>
        <h3
          className={`${compact ? "text-lg" : "text-xl"} font-bold text-[var(--text-primary)] mb-2`}
        >
          Check your email
        </h3>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
          We sent a login link to{" "}
          <strong className="text-[var(--text-primary)]">{email}</strong>. Click
          the link to access your account.
        </p>
      </div>
    );
  }

  return (
    <div>
      {heading && (
        <div className={`text-center ${compact ? "mb-4" : "mb-6"}`}>
          <h3
            className={`${compact ? "text-lg" : "text-2xl"} font-bold text-[var(--text-primary)] mb-1`}
          >
            {heading}
          </h3>
          {subtext && (
            <p className="text-[var(--text-secondary)] text-sm">{subtext}</p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div
          className={`bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl ${compact ? "p-5" : "p-8"}`}
        >
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
            className={`w-full ${compact ? "mt-4" : "mt-5"} px-6 py-3.5 rounded-xl bg-[var(--accent)] text-[#0a0b0f] font-bold text-base transition-all hover:opacity-90 disabled:opacity-50 cursor-pointer`}
          >
            {status === "loading" ? "Sending..." : "Send login link"}
          </button>
        </div>
      </form>
    </div>
  );
}
