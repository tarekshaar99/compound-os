"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "../lib/supabase";
import { track } from "../lib/track";

export default function LoginForm({
  defaultEmail = "",
  mode = "signin",
  compact = false,
  redirectTo,
}: {
  defaultEmail?: string;
  mode?: "signin" | "signup";
  compact?: boolean;
  /** Optional path to redirect to on successful sign-in. Must start with "/"
   *  to prevent open-redirect. Defaults to /dashboard. */
  redirectTo?: string;
}) {
  // Whitelist: only accept internal paths. Anything else falls back to dashboard.
  const safeRedirect =
    redirectTo && /^\/[^/]/.test(redirectTo) ? redirectTo : "/dashboard";
  const router = useRouter();
  const [email, setEmail] = useState(defaultEmail);
  const [activeTab, setActiveTab] = useState<"signin" | "signup">(mode);
  const [status, setStatus] = useState<
    "idle" | "loading" | "code_sent" | "verifying" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const OTP_LENGTH = 6;
  const [otpCode, setOtpCode] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Step 1: Send OTP code to email
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
        },
      });

      if (error) {
        console.error("Supabase OTP error:", error);
        track("login_failed", { stage: "otp_send", reason: error.message }, email);
        if (error.message?.toLowerCase().includes("rate") || error.status === 429) {
          setErrorMsg("Too many attempts. Please wait a few minutes and try again.");
        } else {
          setErrorMsg(error.message || "Failed to send verification code.");
        }
        setStatus("error");
      } else {
        track("login_otp_requested", { tab: activeTab }, email);
        setStatus("code_sent");
        // Focus first input
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
      }
    } catch (err) {
      console.error("Auth error:", err);
      setErrorMsg("Connection error. Please try again.");
      setStatus("error");
    }
  };

  // Step 2: Verify the 6-digit code
  const handleVerifyCode = async (code: string) => {
    if (code.length !== OTP_LENGTH) return;

    setStatus("verifying");
    setErrorMsg("");

    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: "email",
      });

      if (error) {
        console.error("OTP verify error:", error);
        setErrorMsg("Invalid or expired code. Please try again.");
        setStatus("code_sent");
        setOtpCode(Array(OTP_LENGTH).fill(""));
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
      } else if (data.session) {
        // Supabase authenticated. Now sync into a cos_session cookie so
        // middleware will allow pillar routes. If the user has no paid record,
        // /api/session/sync returns 402 and we route them to the pricing page.
        try {
          const sync = await fetch("/api/session/sync", {
            method: "POST",
            credentials: "same-origin",
            headers: { Authorization: `Bearer ${data.session.access_token}` },
          });
          if (sync.ok) {
            track("login_otp_verified", { outcome: "paid" }, email);
            setStatus("success");
            setTimeout(() => router.push(safeRedirect), 600);
          } else if (sync.status === 402) {
            // Logged in but no purchase. Route to checkout.
            track("login_otp_verified", { outcome: "unpaid" }, email);
            router.push("/#pricing");
          } else {
            track("login_failed", { stage: "session_sync", status: sync.status }, email);
            setErrorMsg("Session sync failed. Please try again.");
            setStatus("code_sent");
          }
        } catch {
          setErrorMsg("Connection error during session sync.");
          setStatus("code_sent");
        }
      } else {
        setErrorMsg("Verification failed. Please request a new code.");
        setStatus("code_sent");
      }
    } catch (err) {
      console.error("Verify error:", err);
      setErrorMsg("Connection error. Please try again.");
      setStatus("code_sent");
    }
  };

  // Handle OTP input changes
  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    const digit = value.replace(/\D/g, "").slice(-1);
    const newCode = [...otpCode];
    newCode[index] = digit;
    setOtpCode(newCode);

    // Auto-advance to next input
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits entered
    const fullCode = newCode.join("");
    if (fullCode.length === OTP_LENGTH) {
      handleVerifyCode(fullCode);
    }
  };

  // Handle paste of full code
  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (pasted.length === OTP_LENGTH) {
      const newCode = pasted.split("");
      setOtpCode(newCode);
      handleVerifyCode(pasted);
    }
  };

  // Handle backspace
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // ── Success state ──
  if (status === "success") {
    return (
      <div
        className={`bg-[var(--card-bg)] border border-[var(--accent)]/20 rounded-2xl ${compact ? "p-6" : "p-8"} text-center`}
      >
        <div className="w-14 h-14 rounded-full bg-[var(--accent)]/12 flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3
          className={`${compact ? "text-lg" : "text-xl"} font-bold text-[var(--text-primary)] mb-2`}
        >
          You're in
        </h3>
        <p className="text-[var(--text-secondary)] text-sm">
          Redirecting to your dashboard...
        </p>
      </div>
    );
  }

  // ── Code entry state ──
  if (status === "code_sent" || status === "verifying") {
    return (
      <div>
        <div
          className={`bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl ${compact ? "p-5" : "p-7"}`}
        >
          <div className={`${compact ? "" : "text-center"} mb-6`}>
            <h3 className={`${compact ? "text-base" : "text-lg"} font-bold text-[var(--text-primary)] mb-2`}>
              Check your email
            </h3>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              We sent a 6-digit code to{" "}
              <strong className="text-[var(--text-primary)]">{email}</strong>
            </p>
          </div>

          {/* 6-digit code input */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mb-5">
            {otpCode.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onPaste={i === 0 ? handleOtpPaste : undefined}
                onKeyDown={(e) => handleOtpKeyDown(i, e)}
                disabled={status === "verifying"}
                className="w-9 h-12 sm:w-10 sm:h-13 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text-primary)] text-center text-lg font-bold outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/30 transition-all disabled:opacity-50"
              />
            ))}
          </div>

          {status === "verifying" && (
            <div className="flex justify-center mb-4">
              <div className="w-5 h-5 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {errorMsg && (
            <p className="text-sm text-[#ef4444] text-center mb-4">
              {errorMsg}
            </p>
          )}

          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setStatus("idle");
                setOtpCode(Array(OTP_LENGTH).fill(""));
                setErrorMsg("");
              }}
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors cursor-pointer"
            >
              &larr; Change email
            </button>
            <button
              onClick={handleSendCode}
              disabled={status === "verifying"}
              className="text-sm text-[var(--accent)] hover:opacity-80 transition-opacity cursor-pointer disabled:opacity-50"
            >
              Resend code
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Email entry state ──
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

      <form onSubmit={handleSendCode}>
        <div
          className={`bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl ${compact ? "p-5" : "p-7"}`}
        >
          <p
            className={`text-[var(--text-secondary)] text-sm mb-5 leading-relaxed ${compact ? "" : "text-center"}`}
          >
            {activeTab === "signup"
              ? "Create your account to access the system from any device."
              : "Enter your email and we'll send you a verification code."}
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
                : "Send Verification Code"}
          </button>
        </div>
      </form>
    </div>
  );
}
