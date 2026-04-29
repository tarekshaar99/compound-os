import { NextRequest, NextResponse } from "next/server";
import { verifySession, COOKIE_NAME } from "./app/lib/session";

/**
 * Edge-runtime gate. Two jobs:
 *
 * 1. Paywalled routes (/trading, /fitness, /mindset, /dashboard):
 *    valid cos_session cookie required → else redirect to /login?return=<path>.
 *
 * 2. Marketing home (/):
 *    if the user is already a paid/admin member, bounce them straight to
 *    /dashboard so they never see the public landing page again.
 *
 * No client-side paywall. No localStorage. The page never renders without
 * a valid server-signed cookie.
 */
export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const jwt = req.cookies.get(COOKIE_NAME)?.value;
  const session = await verifySession(jwt);
  const authed = !!(session && (session.paid || session.admin));

  // Logged-in members hitting the marketing home → send to the app.
  if (pathname === "/" && authed) {
    const dashUrl = req.nextUrl.clone();
    dashUrl.pathname = "/dashboard";
    dashUrl.search = "";
    return NextResponse.redirect(dashUrl);
  }

  // Pillar index pages (/trading, /fitness, /mindset) are PUBLIC for SEO —
  // they render an editorial preview with module titles + paywall CTA when
  // unauthenticated. Their sub-paths (/trading/m/*, /trading/library, etc.)
  // remain gated.
  const isPublicPillarIndex =
    pathname === "/trading" ||
    pathname === "/fitness" ||
    pathname === "/mindset";

  // Paywalled / private routes.
  const isPaywalled =
    !isPublicPillarIndex &&
    (pathname.startsWith("/trading") ||
      pathname.startsWith("/fitness") ||
      pathname.startsWith("/mindset") ||
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/account") ||
      pathname.startsWith("/onboarding"));

  if (isPaywalled) {
    if (authed) return NextResponse.next();
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.search = `?return=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/trading/:path*",
    "/fitness/:path*",
    "/mindset/:path*",
    "/dashboard/:path*",
    "/account/:path*",
    "/onboarding/:path*",
  ],
};
