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
 */
function getFrom(): string | null {
  const raw = process.env.EMAIL_FROM?.trim();
  if (!raw) return null;
  if (raw.includes("<") && raw.includes(">")) return raw;
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
 * Sent after Stripe grants access. Editorial Quarterly direction:
 * Newsreader serif headline, champagne accent, hairline rules, sharp
 * corners. Inline styles only (Outlook), table layout (Gmail/Outlook),
 * Google Fonts link with serif fallbacks (handles clients that block
 * web fonts).
 *
 * The dark palette is forced via inline `background` + a `color-scheme`
 * meta — Gmail iOS' dark-mode-invert sometimes flips light backgrounds
 * but will respect an already-dark email.
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
    ? "You came in as a founding member. Your price is locked — future updates included, always."
    : "You have lifetime access. Future updates included, always.";

  const subject = "You're in — welcome to Compound OS";
  const year = new Date().getFullYear();
  const yearRoman = toRoman(year);

  // Plain-text version. Some clients (work email, security tools) only
  // render this. Keep it editorial in tone, not a stripped log.
  const text = [
    "VOL. I · WELCOME",
    "",
    "The system is yours.",
    "",
    foundingLine,
    "",
    "The system is waiting. Open it, pick the pillar you want to start with, and execute.",
    "",
    `Open your dashboard: ${dashboardUrl}`,
    "",
    "—",
    "Signing in from a new device?",
    `Enter this email at ${signInUrl} and we'll send a 6-digit code.`,
    "",
    "— Tarek",
    `Compound OS · ${yearRoman}`,
  ].join("\n");

  // The Compound System brand:
  //   - Cinzel for brand wordmarks ("THE COMPOUND" / "Compound OS")
  //   - Newsreader for editorial display + body
  //   - Inter for label-caps + UI
  //   - Gold gradient: #E4C074 → #C9A36A → #9E7B3E (highlight → core → deep)
  //   - Ink #0A0A0A bg, warm card #141210, gold-tinted hairlines
  //   - Three-tower spire mark embedded as inline SVG (modern clients
  //     render it; Outlook desktop falls back to empty space, which is
  //     acceptable for v1 — the wordmark + content carry the brand)
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="dark only">
  <meta name="supported-color-schemes" content="dark">
  <title>${subject}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Newsreader:ital,wght@0,300;0,400;1,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    body, table, td { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .serif { font-family: 'Newsreader', Georgia, 'Times New Roman', serif; }
    .cinzel { font-family: 'Cinzel', 'Trajan Pro', Georgia, serif; }
    a { text-decoration: none; }
    @media (max-width: 540px) {
      .card { padding: 32px 24px !important; }
      .display { font-size: 32px !important; line-height: 1.1 !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#0A0A0A;color:#F4ECD8;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0A0A0A;padding:48px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">

          <!-- Masthead: brand mark + Cinzel wordmark + issue indicator -->
          <tr>
            <td style="padding:0 0 36px 0;" align="center">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" valign="middle" style="padding:0;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td valign="middle" style="padding:0 14px 0 0;">
                          <!-- Three-tower brand mark, gold gradient -->
                          <svg width="28" height="29" viewBox="0 0 400 420" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                              <linearGradient id="cs-gold-mh" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stop-color="#E4C074"/>
                                <stop offset="45%" stop-color="#C9A36A"/>
                                <stop offset="100%" stop-color="#9E7B3E"/>
                              </linearGradient>
                            </defs>
                            <path d="M 165,380 L 165,150 L 135,190 L 135,350 L 105,380 Z" fill="url(#cs-gold-mh)"/>
                            <path d="M 235,380 L 235,150 L 265,190 L 265,350 L 295,380 Z" fill="url(#cs-gold-mh)"/>
                            <path d="M 170,380 L 170,110 L 200,30 L 230,110 L 230,380 Z" fill="url(#cs-gold-mh)"/>
                          </svg>
                        </td>
                        <td valign="middle" class="cinzel" style="font-family:'Cinzel','Trajan Pro',Georgia,serif;font-size:14px;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;color:#C9A36A;">
                          Compound OS
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" valign="middle" style="font-family:'Inter',sans-serif;font-size:11px;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;color:#8a8579;">
                    Vol. I · Welcome
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Editorial card -->
          <tr>
            <td class="card" style="background:#141210;border:1px solid rgba(201,163,106,0.18);padding:48px 44px;">

              <!-- Section eyebrow -->
              <p style="margin:0 0 18px 0;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;font-size:11px;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;color:#C9A36A;">
                Letter from the editor
              </p>

              <!-- Display headline (Newsreader) -->
              <h1 class="serif display" style="margin:0 0 24px 0;font-family:'Newsreader',Georgia,'Times New Roman',serif;font-size:42px;font-weight:300;line-height:1.05;letter-spacing:-0.02em;color:#F4ECD8;">
                The system is yours.
              </h1>

              <!-- Gold hairline rule -->
              <div style="height:1.5px;width:48px;background:#C9A36A;margin:0 0 28px 0;line-height:1px;font-size:0;">&nbsp;</div>

              <!-- Italic founding line -->
              <p class="serif" style="margin:0 0 22px 0;font-family:'Newsreader',Georgia,'Times New Roman',serif;font-size:18px;font-style:italic;font-weight:400;line-height:1.55;color:#C7BCA0;">
                ${foundingLine}
              </p>

              <!-- Roman body paragraph -->
              <p class="serif" style="margin:0 0 36px 0;font-family:'Newsreader',Georgia,'Times New Roman',serif;font-size:17px;font-weight:400;line-height:1.7;color:#C7BCA0;">
                The system is waiting. Open it, pick the pillar you want to start with, and execute.
              </p>

              <!-- CTA — gold fill, sharp corners, label-caps -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 40px 0;">
                <tr>
                  <td style="background:#C9A36A;padding:0;">
                    <a href="${dashboardUrl}" style="display:inline-block;padding:16px 32px;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#0A0A0A;text-decoration:none;">
                      Open your dashboard &nbsp;→
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Hairline divider -->
              <div style="height:1px;background:rgba(201,163,106,0.18);margin:32px 0;line-height:1px;font-size:0;">&nbsp;</div>

              <!-- New device note -->
              <p style="margin:0 0 6px 0;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;font-size:11px;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;color:#8a8579;">
                Signing in from a new device
              </p>
              <p class="serif" style="margin:0;font-family:'Newsreader',Georgia,'Times New Roman',serif;font-size:15px;font-style:italic;font-weight:400;line-height:1.6;color:#C7BCA0;">
                Enter this email at <a href="${signInUrl}" style="color:#C9A36A;text-decoration:underline;text-underline-offset:3px;">${signInUrl.replace(/^https?:\/\//, "")}</a> and we'll send a 6-digit code.
              </p>

              <!-- Hairline divider -->
              <div style="height:1px;background:rgba(201,163,106,0.18);margin:36px 0 28px 0;line-height:1px;font-size:0;">&nbsp;</div>

              <!-- Signature -->
              <p class="serif" style="margin:0;font-family:'Newsreader',Georgia,'Times New Roman',serif;font-size:16px;font-style:italic;font-weight:400;line-height:1.5;color:#C7BCA0;">
                — Tarek
              </p>

            </td>
          </tr>

          <!-- Editorial footer — brand virtues -->
          <tr>
            <td align="center" style="padding:32px 8px 0 8px;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;font-size:10px;font-weight:500;letter-spacing:0.32em;text-transform:uppercase;color:#8a8579;">
              Discipline &nbsp;·&nbsp; Alignment &nbsp;·&nbsp; Compound Power
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:14px 0 0 0;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;font-size:10px;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;color:#5a554d;">
              © ${yearRoman} The Compound System
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

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

/**
 * Roman-numeral the year. Cap at 3999 (the conventional upper bound for
 * standard roman numerals).
 */
function toRoman(num: number): string {
  if (num <= 0 || num >= 4000) return String(num);
  const map: Array<[number, string]> = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let n = num;
  let out = "";
  for (const [val, sym] of map) {
    while (n >= val) {
      out += sym;
      n -= val;
    }
  }
  return out;
}
