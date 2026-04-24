import { ImageResponse } from "next/og";

/**
 * Dynamically generated Open Graph image.
 *
 * Notes on staying compatible with Satori (the engine behind ImageResponse):
 *   - Avoid complex CSS (multi-stop radial gradients, shadows) -> use plain
 *     colors and positioned divs for "glow" effects.
 *   - Avoid non-ASCII glyphs like ◈ -> use inline SVG shapes.
 *   - Avoid `runtime = "edge"` when the page does not strictly need it -
 *     the Node runtime is more forgiving and renders identically.
 */

export const alt = "Compound OS - the operating system for a compounding life.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
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
          color: "#ffffff",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Soft accent glow top-left */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -200,
            width: 700,
            height: 700,
            borderRadius: 9999,
            backgroundColor: "#00d4aa",
            opacity: 0.14,
            filter: "blur(80px)",
          }}
        />
        {/* Soft accent glow bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: -200,
            right: -200,
            width: 700,
            height: 700,
            borderRadius: 9999,
            backgroundColor: "#a78bfa",
            opacity: 0.12,
            filter: "blur(80px)",
          }}
        />

        {/* Top: brand mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              backgroundColor: "#00d4aa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Diamond mark as SVG - renders reliably in Satori */}
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2 L22 12 L12 22 L2 12 Z"
                fill="#0a0b0f"
              />
              <path
                d="M12 7 L17 12 L12 17 L7 12 Z"
                fill="#00d4aa"
              />
            </svg>
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: "-0.01em",
            }}
          >
            Compound OS
          </div>
        </div>

        {/* Middle: headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
              maxWidth: 1000,
              color: "#ffffff",
            }}
          >
            The operating system for a compounding life.
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#a1a1aa",
              letterSpacing: "-0.01em",
              maxWidth: 950,
            }}
          >
            Three pillars. One system. Markets. Fitness. Mindset.
          </div>
        </div>

        {/* Bottom: pillar chips + URL */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 14,
            }}
          >
            {[
              { label: "Markets", color: "#00d4aa" },
              { label: "Fitness", color: "#f97316" },
              { label: "Mindset", color: "#a78bfa" },
            ].map((p) => (
              <div
                key={p.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 22px",
                  borderRadius: 999,
                  border: `1.5px solid ${p.color}`,
                  fontSize: 24,
                  fontWeight: 600,
                  color: p.color,
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 999,
                    backgroundColor: p.color,
                  }}
                />
                {p.label}
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#71717a",
              letterSpacing: "-0.005em",
            }}
          >
            thecompoundsystem.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
