"use client";

import Link from "next/link";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
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
            Member Access
          </h1>
          <p className="text-[var(--text-secondary)] text-sm">
            Sign in or create your account below.
          </p>
        </div>

        <LoginForm />

        <p className="text-center text-sm text-[var(--text-muted)] mt-6">
          Don&apos;t have access yet?{" "}
          <Link
            href="/#pricing"
            className="text-[var(--accent)] hover:underline"
          >
            Get the System
          </Link>
        </p>
      </div>
    </div>
  );
}
