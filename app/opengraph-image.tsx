import { ImageResponse } from "next/og";

/**
 * Open Graph image for social shares (WhatsApp, iMessage, Twitter, LinkedIn,
 * etc.). Renders the brand lockup — three-tower mark in gold + Cinzel
 * wordmark + Newsreader subtitle — over the brand's ink background.
 *
 * Satori notes:
 *   - All divs with multiple children must declare `display: flex|none`
 *   - Fonts fetched as woff2 binaries (Satori doesn't pull from next/font)
 *   - SVGs render inline as long as paths are simple — gold gradient via
 *     <linearGradient> works
 */

export const alt =
  "The Compound System — the operating system for a compounding life.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function fetchFontData(url: string): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OgImage() {
  // Cinzel for the brand wordmark (the inscription-style gravitas).
  // Newsreader for the editorial tagline.
  // Inter for label-caps + chapter chips.
  const [cinzelMedium, cinzelRegular, newsreaderLight, interMedium] =
    await Promise.all([
      // Cinzel 500
      fetchFontData(
        "https://fonts.gstatic.com/s/cinzel/v25/8vIK7ww63mVu7gtR-kwKxNvkNOjwytbnTYrvDE5ZdqU.woff2"
      ),
      // Cinzel 400
      fetchFontData(
        "https://fonts.gstatic.com/s/cinzel/v25/8vIK7ww63mVu7gtR-kwKxNvkNOjw-tbnTYrvDE4.woff2"
      ),
      // Newsreader Light 300
      fetchFontData(
        "https://fonts.gstatic.com/s/newsreader/v30/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438KizI.woff2"
      ),
      // Inter Medium 500
      fetchFontData(
        "https://fonts.gstatic.com/s/inter/v19/UcCO3FwrK3iLTeHuS_nVMrMxCp50ojIa1ZL7W0Q5nw.woff2"
      ),
    ]);

  const fonts = [
    cinzelMedium && {
      name: "Cinzel",
      data: cinzelMedium,
      style: "normal" as const,
      weight: 500 as const,
    },
    cinzelRegular && {
      name: "Cinzel",
      data: cinzelRegular,
      style: "normal" as const,
      weight: 400 as const,
    },
    newsreaderLight && {
      name: "Newsreader",
      data: newsreaderLight,
      style: "normal" as const,
      weight: 300 as const,
    },
    interMedium && {
      name: "Inter",
      data: interMedium,
      style: "normal" as const,
      weight: 500 as const,
    },
  ].filter(Boolean) as Array<{
    name: string;
    data: ArrayBuffer;
    style: "normal";
    weight: 300 | 400 | 500;
  }>;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#0A0A0A",
          color: "#F4ECD8",
          position: "relative",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Soft gold ambient glow top-right */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -180,
            width: 720,
            height: 720,
            borderRadius: 9999,
            backgroundColor: "#C9A36A",
            opacity: 0.13,
            filter: "blur(120px)",
          }}
        />
        {/* Subtler echo glow bottom-left for editorial balance */}
        <div
          style={{
            position: "absolute",
            bottom: -260,
            left: -200,
            width: 600,
            height: 600,
            borderRadius: 9999,
            backgroundColor: "#9E7B3E",
            opacity: 0.08,
            filter: "blur(140px)",
          }}
        />

        {/* Top row: tiny brand wordmark + issue indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Cinzel, serif",
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#C9A36A",
            }}
          >
            Compound OS
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#8a8579",
            }}
          >
            Vol. I · Issue 01
          </div>
        </div>

        {/* Center: large brand lockup — mark + Cinzel wordmark */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 28,
          }}
        >
          {/* Three-tower mark in gold gradient */}
          <svg
            width="156"
            height="164"
            viewBox="0 0 400 420"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="cs-gold-og" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E4C074" />
                <stop offset="45%" stopColor="#C9A36A" />
                <stop offset="100%" stopColor="#9E7B3E" />
              </linearGradient>
            </defs>
            <path
              d="M 165,380 L 165,150 L 135,190 L 135,350 L 105,380 Z"
              fill="url(#cs-gold-og)"
            />
            <path
              d="M 235,380 L 235,150 L 265,190 L 265,350 L 295,380 Z"
              fill="url(#cs-gold-og)"
            />
            <path
              d="M 170,380 L 170,110 L 200,30 L 230,110 L 230,380 Z"
              fill="url(#cs-gold-og)"
            />
          </svg>

          {/* "THE COMPOUND" wordmark in Cinzel */}
          <div
            style={{
              display: "flex",
              fontFamily: "Cinzel, serif",
              fontSize: 64,
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#F4ECD8",
            }}
          >
            The Compound
          </div>

          {/* "— SYSTEM —" sub-wordmark with rules */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}
          >
            <div
              style={{
                width: 80,
                height: 1.5,
                backgroundColor: "#C9A36A",
              }}
            />
            <div
              style={{
                display: "flex",
                fontFamily: "Cinzel, serif",
                fontSize: 22,
                fontWeight: 400,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "#F4ECD8",
              }}
            >
              System
            </div>
            <div
              style={{
                width: 80,
                height: 1.5,
                backgroundColor: "#C9A36A",
              }}
            />
          </div>

          {/* Tagline in Newsreader italic */}
          <div
            style={{
              display: "flex",
              fontFamily: "Newsreader, Georgia, serif",
              fontSize: 24,
              fontWeight: 300,
              fontStyle: "normal",
              color: "#C7BCA0",
              letterSpacing: "0.01em",
              marginTop: 12,
            }}
          >
            The operating system for a compounding life
          </div>
        </div>

        {/* Bottom row: pillar virtues + URL */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: 24,
            borderTop: "1px solid rgba(201,163,106,0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Inter, sans-serif",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#8a8579",
              gap: 0,
            }}
          >
            Discipline &nbsp;·&nbsp; Alignment &nbsp;·&nbsp; Compound Power
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Newsreader, Georgia, serif",
              fontSize: 16,
              fontStyle: "italic",
              fontWeight: 300,
              color: "#8a8579",
            }}
          >
            thecompoundsystem.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      ...(fonts.length > 0 ? { fonts } : {}),
    }
  );
}
