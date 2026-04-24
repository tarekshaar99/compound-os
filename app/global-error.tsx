"use client";

// Global error boundary for Next.js App Router. Catches render errors at the
// root and ships them to Sentry. Must be a client component.
// https://nextjs.org/docs/app/api-reference/file-conventions/error

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        {/* NextError is the fallback Next.js ships. It renders a minimal
            500 page, which is fine - we just want to capture the error. */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
