import { ImageResponse } from "next/og";

/**
 * Editorial Quarterly Open Graph image.
 *
 * Notes on staying compatible with Satori (the engine behind ImageResponse):
 *   - Avoid complex CSS (multi-stop radial gradients, shadows) -> use plain
 *     colors and positioned divs for "glow" effects.
 *   - Newsreader is loaded explicitly via fetch() since Satori doesn't pull
 *     from next/font; if the fetch fails we fall back to plain serif.
 *   - Avoid `runtime = "edge"` — the Node runtime is more forgiving and
 *     renders identically.
 */

export const alt =
  "Compound OS — the operating system for a compounding life.";
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
  // Newsreader Light (300) for the headline + Regular (400) for body / mark.
  // Hosted via Google Fonts CSS endpoint which 302s to woff2 binaries.
  const [light, regular] = await Promise.all([
    fetchFontData(
      "https://fonts.gstatic.com/s/newsreader/v30/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438KizI.woff2"
    ),
    fetchFontData(
      "https://fonts.gstatic.com/s/newsreader/v30/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438Ki1k.woff2"
    ),
  ]);

  const fonts = [
    light && {
      name: "Newsreader",
      data: light,
      style: "normal" as const,
      weight: 300 as const,
    },
    regular && {
      name: "Newsreader",
      data: regular,
      style: "normal" as const,
      weight: 400 as const,
    },
  ].filter(Boolean) as Array<{
    name: string;
    data: ArrayBuffer;
    style: "normal";
    weight: 300 | 400;
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
          padding: "72px 80px",
          backgroundColor: "#0a0b0f",
          color: "#e9e1da",
          position: "relative",
          fontFamily: "Newsreader, Georgia, serif",
        }}
      >
        {/* Soft champagne glow top-right (Editorial restraint — only one) */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -150,
            width: 700,
            height: 700,
            borderRadius: 9999,
            backgroundColor: "#BF9A62",
            opacity: 0.12,
            filter: "blur(80px)",
          }}
        />

        {/* Top: masthead */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Brand mark + wordmark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <svg
              width="44"
              height="44"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="35" y="23" width="30" height="14" fill="#BF9A62" />
              <rect x="25" y="43" width="50" height="14" fill="#BF9A62" />
              <rect x="10" y="63" width="80" height="14" fill="#BF9A62" />
            </svg>
            <div
              style={{
                fontSize: 22,
                fontWeight: 400,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#BF9A62",
              }}
            >
              Compound OS
            </div>
          </div>

          {/* Issue indicator */}
          <div
            style={{
              fontSize: 14,
              fontWeight: 400,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#9a8f81",
            }}
          >
            Vol. I · Issue 01
          </div>
        </div>

        {/* Middle: serif display headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          <div
            style={{
              fontSize: 84,
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 1000,
              color: "#e9e1da",
            }}
          >
            The operating system for a compounding life.
          </div>
          <div
            style={{
              fontSize: 28,
              fontStyle: "italic",
              fontWeight: 400,
              color: "#d2c4b5",
              letterSpacing: "-0.005em",
              maxWidth: 900,
              lineHeight: 1.5,
            }}
          >
            Three pillars. One system. Markets. Fitness. Mindset.
          </div>
        </div>

        {/* Bottom: pillar chapters + URL */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: 28,
            borderTop: "1px solid #4e453a",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 40,
            }}
          >
            {[
              { roman: "I", label: "Markets", color: "#00d4aa" },
              { roman: "II", label: "Fitness", color: "#f97316" },
              { roman: "III", label: "Mindset", color: "#a78bfa" },
            ].map((p) => (
              <div
                key={p.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: 14,
                    fontWeight: 400,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: p.color,
                  }}
                >
                  {`Ch. ${p.roman}`}
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 300,
                    color: "#e9e1da",
                  }}
                >
                  {p.label}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: 16,
              fontStyle: "italic",
              fontWeight: 400,
              color: "#9a8f81",
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
