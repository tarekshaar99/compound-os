"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getSupabase } from "../../lib/supabase";

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    // Preserve the originally-requested path through the OAuth round-trip.
    // Same internal-path allowlist used in LoginForm / login page to prevent
    // open-redirect.
    const returnParam = searchParams.get("return");
    const safeReturn =
      returnParam && /^\/[^/]/.test(returnParam) ? returnParam : "/dashboard";

    async function syncCookieAndRoute(accessToken: string) {
      const res = await fetch("/api/session/sync", {
        method: "POST",
        credentials: "same-origin",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.ok) {
        router.push(safeReturn);
      } else if (res.status === 402) {
        // Logged in but not paid - send to pricing.
        router.push("/#pricing");
      } else {
        setError(true);
      }
    }

    async function handleCallback() {
      const supabase = getSupabase();

      // Method 1: PKCE flow - exchange code for session
      const code = searchParams.get("code");
      if (code) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error && data.session) {
          await syncCookieAndRoute(data.session.access_token);
          return;
        }
        console.error("Auth callback code exchange error:", error);
      }

      // Method 2: Implicit flow (hash token) - the client auto-detects it.
      if (typeof window !== "undefined" && window.location.hash) {
        await new Promise((r) => setTimeout(r, 500));
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          await syncCookieAndRoute(session.access_token);
          return;
        }
      }

      // Method 3: Session already established.
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await syncCookieAndRoute(session.access_token);
        return;
      }

      setError(true);
    }

    handleCallback();
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <span className="font-serif text-[44px] block mb-4 text-[var(--accent)]/40">
            &mdash;
          </span>
          <h1 className="font-serif text-[34px] text-[var(--text-primary)] mb-4 font-light">
            Login link expired.
          </h1>
          <p className="font-serif italic text-[16px] text-[var(--text-secondary)] mb-10 leading-relaxed">
            This sign-in link has expired or was already used. Please request
            a fresh one.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--accent)] text-[var(--on-accent)] label-caps border border-[var(--accent)] hover:bg-transparent hover:text-[var(--accent)] transition-all duration-300"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-15 rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(191,154,98,0.5), transparent 70%)",
          filter: "blur(120px)",
        }}
      />
      <div className="relative text-center">
        <div className="w-10 h-10 border border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
        <p className="font-serif italic text-[16px] text-[var(--text-secondary)]">
          Signing you in…
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
          <div className="w-10 h-10 border border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CallbackHandler />
    </Suspense>
  );
}
