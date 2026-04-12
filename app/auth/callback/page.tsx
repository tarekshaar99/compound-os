"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabase } from "../../lib/supabase";

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    async function handleCallback() {
      const code = searchParams.get("code");

      if (code) {
        // Exchange the code for a session on the CLIENT side
        // This stores the session in browser localStorage
        const { error } = await getSupabase().auth.exchangeCodeForSession(code);

        if (!error) {
          // Session is now stored in browser — redirect home
          router.push("/");
          return;
        }

        console.error("Auth callback error:", error);
      }

      // If no code or exchange failed, show error
      setError(true);
    }

    handleCallback();
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-4xl mb-6">⚠</div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
            Login link expired
          </h1>
          <p className="text-[var(--text-secondary)] mb-8">
            This login link has expired or was already used. Please request a new one.
          </p>
          <a
            href="/login"
            className="inline-block px-8 py-3 rounded-xl bg-[var(--accent)] text-[#0a0b0f] font-bold text-sm transition-all hover:opacity-90"
          >
            Back to Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
        <p className="text-[var(--text-secondary)] text-lg">
          Signing you in...
        </p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="w-12 h-12 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CallbackHandler />
    </Suspense>
  );
}
