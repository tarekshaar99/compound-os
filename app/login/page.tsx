"use client";

import Link from "next/link";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
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
        </div>

        <LoginForm
          heading="Access your account"
          subtext="Enter your email to receive a login link. No password needed."
        />

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
