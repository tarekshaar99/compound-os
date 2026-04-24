import { Resend } from "resend";

/**
 * Transactional email via Resend.
 *
 * Env required:
 *   RESEND_API_KEY      - Resend API key (server-side only)
 *   EMAIL_FROM          - e.g. "Compound OS <tarek@thecompoundsystem.com>"
 *
 * If either is missing, all send* functions become no-ops that log a
 * warning and return false. The caller must treat email as best-effort -
 * a failed send should never break a critical flow like the webhook.
 */

let _resend: Resend | null = null;
function getResend(): Resend | null {
  if (_resend) return _resend;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  _resend = new Resend(key);
  return _resend;
}

/**
 * Returns the `from` header in RFC 5322 format: `Display Name <email@domain>`.
 *
 * Why this wrapper: if `EMAIL_FROM` is set to a bare email like
 * `tarek@thecompoundsystem.com`, most inbox clients (Gmail, Apple Mail)
 * render the sender as the local part - "hello" - which looks broken.
 * Forcing a display name of "Compound OS" fixes the sender card.
 *
 * Accepts either format in the env var:
 *   - "tarek@thecompoundsystem.com"            → normalized with display name
 *   - "Compound OS <tarek@thecompoundsystem.com>" → returned as-is
 */
function getFrom(): string | null {
  const raw = process.env.EMAIL_FROM?.trim();
  if (!raw) return null;
  // Already has a display name (contains `<email>` syntax) - respect it.
  if (raw.includes("<") && raw.includes(">")) return raw;
  // Bare email - prefix a display name so inbox clients don't fall back
  // to the local part.
  return `Compound OS <${raw}>`;
}

function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") ||
    process.env.NEXT_PUBLIC_BASE_URL?.trim().replace(/\/+$/, "") ||
    "https://thecompoundsystem.com"
  );
}

/**
 * Sent after Stripe grants access. Goal: the customer has an email in
 * their inbox with a link they can click later (if they close the success
 * tab) that takes them through the OTP flow to /dashboard.
 */
export async function sendWelcomeEmail(args: {
  to: string;
  isFounding?: boolean;
}): Promise<boolean> {
  const resend = getResend();
  const from = getFrom();
  if (!resend || !from) {
    console.warn("[email] RESEND_API_KEY or EMAIL_FROM not set - skipping welcome email");
    return false;
  }

  const site = getSiteUrl();
  const dashboardUrl = `${site}/dashboard`;
  const signInUrl = `${site}/login`;
  const foundingLine = args.isFounding
    ? "You came in as a founding member. Your price is locked in - future updates included, always."
    : "You have lifetime access. Future updates included, always.";

  const subject = "You're in - welcome to Compound OS";

  const text = [
    "Welcome to Compound OS.",
    "",
    foundingLine,
    "",
    `Start here: ${dashboardUrl}`,
    "",
    `Signing in from a new device? Enter this email at ${signInUrl} and we'll send a 6-digit code.`,
    "",
    "- Tarek",
    "Compound OS",
  ].join("\n");

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#0a0b0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#e5e5e5;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0b0f;padding:40px 20px;">
    <tr><td align="center">
      <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width:520px;background:#121317;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:36px 32px;">
        <tr><td>
          <div style="font-size:14px;color:#00d4aa;font-weight:700;letter-spacing:0.5px;margin-bottom:24px;">COMPOUND OS</div>
          <h1 style="font-size:22px;font-weight:700;color:#fff;margin:0 0 16px 0;letter-spacing:-0.01em;">You're in.</h1>
          <p style="font-size:15px;line-height:1.6;color:#c0c0c0;margin:0 0 20px 0;">
            ${foundingLine}
          </p>
          <p style="font-size:15px;line-height:1.6;color:#c0c0c0;margin:0 0 28px 0;">
            The system is waiting for you. Open it, pick the pillar you want to start with, and execute.
          </p>
          <div style="margin:0 0 32px 0;">
            <a href="${dashboardUrl}" style="display:inline-block;background:#00d4aa;color:#0a0b0f;text-decoration:none;font-weight:700;font-size:15px;padding:14px 28px;border-radius:10px;">Open your dashboard →</a>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:20px;margin-top:20px;">
            <p style="font-size:13px;line-height:1.6;color:#888;margin:0 0 8px 0;">
              <strong style="color:#c0c0c0;">Signing in from a new device?</strong>
            </p>
            <p style="font-size:13px;line-height:1.6;color:#888;margin:0;">
              Enter this email at <a href="${signInUrl}" style="color:#00d4aa;text-decoration:none;">${signInUrl}</a> and we'll send a 6-digit code.
            </p>
          </div>
          <p style="font-size:13px;line-height:1.6;color:#888;margin:28px 0 0 0;">
            - Tarek<br/>Compound OS
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  try {
    const { error } = await resend.emails.send({
      from,
      to: args.to,
      subject,
      text,
      html,
    });
    if (error) {
      console.error("[email] welcome send failed:", error);
      return false;
    }
    console.log(`[email] welcome sent to ${args.to}`);
    return true;
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    console.error("[email] welcome threw:", msg);
    return false;
  }
}
