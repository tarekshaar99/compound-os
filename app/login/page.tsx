"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LoginForm from "../components/LoginForm";

function LoginPageInner() {
  const params = useSearchParams();
  // Set when /api/checkout bounces a user who already has access.
  const existing = params.get("existing") === "1";
  const emailParam = params.get("email") ?? "";

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] uppercase tracking-widest transition-colors"
          >
            &larr; Compound OS
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mt-8 mb-2">
            {existing ? "You already have access" : "Sign in"}
          </h1>
          <p className="text-[var(--text-secondary)] text-sm max-w-sm mx-auto leading-relaxed">
            {existing
              ? "This email is already a member. We'll send you a 6-digit sign-in code - no new purchase needed."
              : "Already purchased? Enter the email you used and we'll send a 6-digit code. Works from any device."}
          </p>
        </div>

        <LoginForm defaultEmail={emailParam} />

        <p className="text-center text-sm text-[var(--text-muted)] mt-6">
          {existing ? (
            <>
              Wrong email?{" "}
              <Link href="/#pricing" className="text-[var(--accent)] hover:underline">
                Use a different one
              </Link>
            </>
          ) : (
            <>
              Don&apos;t have access yet?{" "}
              <Link href="/#pricing" className="text-[var(--accent)] hover:underline">
                Get the System
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageInner />
    </Suspense>
  );
}
