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
      const supabase = getSupabase();

      // Method 1: PKCE flow — exchange code for session
      const code = searchParams.get("code");
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
          router.push("/dashboard");
          return;
        }
        console.error("Auth callback code exchange error:", error);
      }

      // Method 2: Check URL hash for implicit flow tokens
      // (Supabase may put access_token in the hash fragment)
      if (typeof window !== "undefined" && window.location.hash) {
        // Supabase client auto-detects hash tokens when detectSessionInUrl is true
        // Give it a moment to process
        await new Promise((r) => setTimeout(r, 500));
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          router.push("/dashboard");
          return;
        }
      }

      // Method 3: Maybe session was already established
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push("/dashboard");
        return;
      }

      // All methods failed
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
