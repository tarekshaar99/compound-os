import { NextRequest, NextResponse } from "next/server";
import { verifySession, COOKIE_NAME } from "./app/lib/session";

/**
 * Gate paywalled routes at the edge.
 *
 * Request arrives → we verify the cos_session JWT cookie.
 * - If valid AND (paid || admin) → let request through.
 * - Otherwise → redirect to /login?return=<path>.
 *
 * This is the ONLY access check. No client-side paywall, no localStorage.
 * localStorage tricks cannot grant access because the page never renders
 * without a valid cookie.
 */
export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const jwt = req.cookies.get(COOKIE_NAME)?.value;
  const session = await verifySession(jwt);

  if (session && (session.paid || session.admin)) {
    return NextResponse.next();
  }

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/login";
  loginUrl.search = `?return=${encodeURIComponent(pathname + search)}`;
  return NextResponse.redirect(loginUrl);
}

export const config = {
  // Match the 3 pillars and dashboard. Excludes /api/*, /_next/*, static assets.
  matcher: [
    "/trading/:path*",
    "/fitness/:path*",
    "/mindset/:path*",
    "/dashboard/:path*",
  ],
};
