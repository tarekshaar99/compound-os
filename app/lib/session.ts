import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";
import type { NextResponse } from "next/server";

/**
 * Server-signed session cookie. This is the ONLY source of truth for
 * paywalled-route access. Middleware verifies this on every request to
 * /trading, /fitness, /mindset, /dashboard.
 *
 * Contents:
 *   sub   = email (lowercased)
 *   paid  = boolean
 *   admin = boolean
 *
 * Signed with HS256 over COS_SESSION_SECRET (48-byte base64 secret).
 * 30-day absolute expiry, no sliding refresh.
 */

export const COOKIE_NAME = "cos_session";
export const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days
const ISSUER = "cos";
const AUDIENCE = "cos-app";

export interface CosSession {
  sub: string;
  paid: boolean;
  admin: boolean;
}

function getSecret(): Uint8Array {
  const s = process.env.COS_SESSION_SECRET;
  if (!s || s.length < 32) {
    throw new Error("COS_SESSION_SECRET is missing or too short (need >=32 chars)");
  }
  return new TextEncoder().encode(s);
}

/** Mint a new session JWT. Caller is responsible for setting the cookie. */
export async function signSession(payload: CosSession): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${COOKIE_MAX_AGE_SECONDS}s`)
    .sign(getSecret());
}

/** Verify a session JWT. Returns null if invalid/expired. Edge-safe. */
export async function verifySession(jwt: string | undefined | null): Promise<CosSession | null> {
  if (!jwt) return null;
  try {
    const { payload } = await jwtVerify(jwt, getSecret(), {
      issuer: ISSUER,
      audience: AUDIENCE,
    });
    if (typeof payload.sub !== "string") return null;
    return {
      sub: payload.sub,
      paid: (payload as JWTPayload & { paid?: boolean }).paid === true,
      admin: (payload as JWTPayload & { admin?: boolean }).admin === true,
    };
  } catch {
    return null;
  }
}

/** Standard cookie options used on both set and clear. */
export function cookieOptions() {
  return {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
  };
}

/**
 * Sets the session cookie on a NextResponse (for use inside Route Handlers
 * that return a NextResponse, e.g. /api/verify).
 */
export function setSessionCookie(res: NextResponse, jwt: string): void {
  res.cookies.set(COOKIE_NAME, jwt, cookieOptions());
}

/** Clears the session cookie on a NextResponse. */
export function clearSessionCookie(res: NextResponse): void {
  res.cookies.set(COOKIE_NAME, "", { ...cookieOptions(), maxAge: 0 });
}

/**
 * Reads the current session from cookies (Server Component / Route Handler).
 * Edge-safe.
 */
export async function getCurrentSession(): Promise<CosSession | null> {
  const c = await cookies();
  return verifySession(c.get(COOKIE_NAME)?.value);
}
