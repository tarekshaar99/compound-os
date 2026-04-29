/**
 * The Compound System brand mark — three-tower spire in the brand's gold
 * gradient (or a flat monochrome variant). This is the single source of
 * truth for the inline logo across the website, OG image, and email.
 *
 * The path data + gradient stops mirror the canonical assets in
 * public/brand/the-compound-system-icon*.svg. Don't edit by hand —
 * regenerate from the brand kit if the mark ever changes.
 */

type Variant = "gold" | "white" | "black";

export default function BrandMark({
  size = 22,
  variant = "gold",
  className,
}: {
  /** Width in px. Height auto-scales to maintain the 400:420 aspect. */
  size?: number;
  /** Color treatment. Default `gold` uses the brand gradient. */
  variant?: Variant;
  className?: string;
}) {
  const height = Math.round(size * 1.05);

  if (variant === "gold") {
    return (
      <svg
        width={size}
        height={height}
        viewBox="0 0 400 420"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="cs-gold-mark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E4C074" />
            <stop offset="45%" stopColor="#C9A36A" />
            <stop offset="100%" stopColor="#9E7B3E" />
          </linearGradient>
        </defs>
        <path
          d="M 165,380 L 165,150 L 135,190 L 135,350 L 105,380 Z"
          fill="url(#cs-gold-mark)"
        />
        <path
          d="M 235,380 L 235,150 L 265,190 L 265,350 L 295,380 Z"
          fill="url(#cs-gold-mark)"
        />
        <path
          d="M 170,380 L 170,110 L 200,30 L 230,110 L 230,380 Z"
          fill="url(#cs-gold-mark)"
        />
      </svg>
    );
  }

  const color = variant === "white" ? "#FFFFFF" : "#0A0A0A";
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 400 420"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 165,380 L 165,150 L 135,190 L 135,350 L 105,380 Z"
        fill={color}
      />
      <path
        d="M 235,380 L 235,150 L 265,190 L 265,350 L 295,380 Z"
        fill={color}
      />
      <path
        d="M 170,380 L 170,110 L 200,30 L 230,110 L 230,380 Z"
        fill={color}
      />
    </svg>
  );
}
