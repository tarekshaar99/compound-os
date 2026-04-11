"use client";

import { useState } from "react";
import { getSupabase } from "../lib/supabase";

export default function LoginForm({
  defaultEmail = "",
  mode = "signin",
  compact = false,
}: {
  defaultEmail?: string;
  mode?: "signin" | "signup";
  compact?: boolean;
}) {
  const [email, setEmail] = useState(defaultEmail);
  const [activeTab, setActiveTab] = useState<"signin" | "signup">(mode);
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          shouldCreateUser: true,
        },
      });

      if (error) {
        console.error("Supabase OTP error:", error);
        setErrorMsg(error.message || "Failed to send login link.");
        setStatus("error");
      } else {
        setStatus("sent");
      }
    } catch (err) {
      console.error("Auth error:", err);
      setErrorMsg("Connection error. Please try again.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div
        className={`bg-[var(--card-bg)] border border-[var(--accent)]/20 rounded-2xl ${compact ? "p-6" : "p-8"} text-center`}
      >
        <div className="w-14 h-14 rounded-full bg-[var(--accent)]/12 flex items-center justify-center text-[var(--accent)] text-2xl mx-auto mb-4">
          ✓
        </div>
        <h3
          className={`${compact ? "text-lg" : "text-xl"} font-bold text-[var(--text-primary)] mb-2`}
        >
          Check your email
        </h3>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-xs mx-auto">
          We sent a magic link to{" "}
          <strong className="text-[var(--text-primary)]">{email}</strong>. Click
          it to {activeTab === "signup" ? "create your account" : "sign in"}.
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setEmail("");
          }}
          className="mt-5 text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors cursor-pointer"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Tabs */}
      {!compact && (
        <div className="flex bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-1 mb-6">
          <button
            onClick={() => setActiveTab("signin")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              activeTab === "signin"
                ? "bg-[var(--accent)] text-[#0a0b0f]"
                : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              activeTab === "signup"
                ? "bg-[var(--accent)] text-[#0a0b0f]"
                : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            }`}
          >
            Create Account
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div
          className={`bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl ${compact ? "p-5" : "p-7"}`}
        >
          <p className={`text-[var(--text-secondary)] text-sm mb-5 leading-relaxed ${compact ? "" : "text-center"}`}>
            {activeTab === "signup"
              ? "Create your account to access the system from any device."
              : "Enter your email and we'll send you a magic link to sign in."}
          </p>

          <label className="block text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text-primary)] text-base outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/30 transition-all"
          />

          {status === "error" && (
            <p className="mt-3 text-sm text-[#ef4444]">
              {errorMsg || "Something went wrong. Please try again."}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className={`w-full ${compact ? "mt-4" : "mt-5"} px-6 py-3.5 rounded-xl bg-[var(--accent)] text-[#0a0b0f] font-bold text-sm transition-all hover:opacity-90 disabled:opacity-50 cursor-pointer`}
          >
            {status === "loading"
              ? "Sending..."
              : activeTab === "signup"
                ? "Create Account"
                : "Send Login Link"}
          </button>
        </div>
      </form>
    </div>
  );
}
