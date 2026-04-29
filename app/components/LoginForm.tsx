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

  // Google OAuth: Supabase handles the round-trip through accounts.google.com
  // and back to our /auth/callback page, which then calls /api/session/sync.
  // We forward the safeRedirect as ?return= so the callback lands on the
  // originally-requested path after sign-in.
  const handleGoogleSignIn = async () => {
    setStatus("loading");
    setErrorMsg("");
    try {
      const supabase = getSupabase();
      const origin =
        typeof window !== "undefined" ? window.location.origin : "";
      const redirectTo = `${origin}/auth/callback?return=${encodeURIComponent(
        safeRedirect
      )}`;
      track("login_oauth_started", { provider: "google" }, email || "anon");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });
      if (error) {
        console.error("Google OAuth error:", error);
        track(
          "login_failed",
          { stage: "oauth_start", provider: "google", reason: error.message },
          email || "anon"
        );
        setErrorMsg(
          "Couldn't start Google sign-in. Please try again or use email."
        );
        setStatus("error");
      }
      // On success, Supabase redirects the browser away. No further action.
    } catch (err) {
      console.error("Google OAuth error:", err);
      setErrorMsg("Connection error. Please try again or use email.");
      setStatus("error");
    }
  };

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
        className={`bg-[var(--card-bg)] border border-[var(--accent)]/30 ${compact ? "p-6" : "p-8"} text-center relative`}
      >
        {/* Corner accents */}
        <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--accent)]" />
        <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--accent)]" />
        <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[var(--accent)]" />
        <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[var(--accent)]" />

        <div className="w-12 h-12 border border-[var(--accent)] flex items-center justify-center mx-auto mb-5">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className={`font-serif ${compact ? "text-[20px]" : "text-[24px]"} text-[var(--text-primary)] mb-2 font-light`}>
          You&apos;re in.
        </h3>
        <p className="font-serif italic text-[14px] text-[var(--text-secondary)]">
          Redirecting to your dashboard…
        </p>
      </div>
    );
  }

  // ── Code entry state ──
  if (status === "code_sent" || status === "verifying") {
    return (
      <div className={`bg-[var(--card-bg)] border border-[var(--border)] ${compact ? "p-6" : "p-8"}`}>
        <div className="mb-6 text-center">
          <span className="label-caps text-[var(--accent)] block mb-3">
            Step 02
          </span>
          <h3 className={`font-serif ${compact ? "text-[20px]" : "text-[24px]"} text-[var(--text-primary)] mb-2 font-light`}>
            Check your email.
          </h3>
          <p className="font-serif italic text-[14px] text-[var(--text-secondary)]">
            We sent a 6-digit code to{" "}
            <strong className="not-italic font-normal text-[var(--text-primary)]">{email}</strong>
          </p>
        </div>

        {/* 6-digit code input — sharp boxes, hairline borders */}
        <div className="flex justify-center gap-1.5 sm:gap-2 mb-5">
          {otpCode.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              aria-label={`Digit ${i + 1} of 6`}
              onChange={(e) => handleOtpChange(i, e.target.value)}
              onPaste={i === 0 ? handleOtpPaste : undefined}
              onKeyDown={(e) => handleOtpKeyDown(i, e)}
              disabled={status === "verifying"}
              className="w-10 h-13 sm:w-11 sm:h-14 border border-[var(--border)] bg-[var(--bg)] text-[var(--text-primary)] font-serif text-center text-[20px] outline-none focus:border-[var(--accent)] focus-visible:border-[var(--accent)] transition-colors disabled:opacity-50"
            />
          ))}
        </div>

        {status === "verifying" && (
          <div className="flex justify-center mb-4">
            <div className="w-5 h-5 border border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {errorMsg && (
          <p className="font-serif italic text-[13px] text-[#ef4444] text-center mb-4">
            {errorMsg}
          </p>
        )}

        <div className="flex items-center justify-between mt-6 pt-5 border-t border-[var(--border)]">
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setOtpCode(Array(OTP_LENGTH).fill(""));
              setErrorMsg("");
            }}
            className="label-caps text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            &larr; Change email
          </button>
          <button
            type="button"
            onClick={handleSendCode}
            disabled={status === "verifying"}
            className="label-caps text-[var(--accent)] hover:opacity-80 transition-opacity cursor-pointer disabled:opacity-50"
          >
            Resend code
          </button>
        </div>
      </div>
    );
  }

  // ── Email entry state ──
  return (
    <div>
      {/* Tabs (only when not compact) */}
      {!compact && (
        <div className="flex border border-[var(--border)] mb-8">
          <button
            type="button"
            onClick={() => setActiveTab("signin")}
            className={`flex-1 py-3 label-caps transition-colors cursor-pointer ${
              activeTab === "signin"
                ? "bg-[var(--accent)] text-[var(--on-accent)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-3 label-caps transition-colors cursor-pointer border-l border-[var(--border)] ${
              activeTab === "signup"
                ? "bg-[var(--accent)] text-[var(--on-accent)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            Create Account
          </button>
        </div>
      )}

      <div className={`bg-[var(--card-bg)] border border-[var(--border)] ${compact ? "p-6" : "p-8"}`}>
        <p className={`font-serif italic text-[14px] text-[var(--text-secondary)] mb-6 leading-relaxed ${compact ? "" : "text-center"}`}>
          {activeTab === "signup"
            ? "Create your account to access the system from any device."
            : "Enter your email and we'll send you a verification code."}
        </p>

        {/* Google OAuth button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={status === "loading"}
          className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border border-[var(--border)] bg-[var(--bg)] text-[var(--text-primary)] label-caps transition-all hover:border-[var(--accent)]/40 hover:bg-[var(--card-bg-2)] focus-visible:border-[var(--accent)] disabled:opacity-50 cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path fill="#4285F4" d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9086c1.7018-1.5668 2.6837-3.8741 2.6837-6.615z" />
            <path fill="#34A853" d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9086-2.2581c-.806.54-1.8373.8618-3.0478.8618-2.3441 0-4.3282-1.5831-5.0359-3.7104H.9573v2.3318C2.4382 15.9832 5.4818 18 9 18z" />
            <path fill="#FBBC05" d="M3.9641 10.71c-.18-.54-.2823-1.1168-.2823-1.71s.1023-1.17.2823-1.71V4.9582H.9573C.3477 6.1732 0 7.5477 0 9c0 1.4523.3477 2.8268.9573 4.0418L3.9641 10.71z" />
            <path fill="#EA4335" d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.4259 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.9641 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z" />
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-[var(--border)]" />
          <span className="label-caps text-[var(--text-muted)]">or</span>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>

        <form onSubmit={handleSendCode}>
          <label htmlFor="login-email" className="label-caps text-[var(--text-muted)] block mb-3">
            Email address
          </label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            aria-required="true"
            className="w-full px-4 py-3.5 border border-[var(--border)] bg-[var(--bg)] text-[var(--text-primary)] font-serif text-[16px] outline-none placeholder:text-[var(--text-muted)] placeholder:font-serif placeholder:italic focus:border-[var(--accent)] focus-visible:border-[var(--accent)] transition-colors"
          />

          {status === "error" && (
            <p className="mt-3 font-serif italic text-[13px] text-[#ef4444]">
              {errorMsg || "Something went wrong. Please try again."}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className={`w-full ${compact ? "mt-5" : "mt-6"} px-6 py-4 bg-[var(--accent)] text-[var(--on-accent)] label-caps border border-[var(--accent)] hover:bg-transparent hover:text-[var(--accent)] transition-all duration-300 disabled:opacity-50 cursor-pointer`}
          >
            {status === "loading"
              ? "Sending…"
              : activeTab === "signup"
                ? "Create Account"
                : "Send Verification Code"}
          </button>
        </form>
      </div>
    </div>
  );
}
