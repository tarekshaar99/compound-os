import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentSession } from "../../lib/session";
import { getUserMeta } from "../../lib/progress-server";
import Header from "../../components/Header";

export const dynamic = "force-dynamic";

/**
 * Chart Patterns Reference - a visual library of the patterns worth
 * recognizing on sight. Each one gets a small SVG illustration so the
 * user can build pattern recognition from shape, not prose.
 *
 * Not a module - this is a reference page. No completion, no checklist.
 * Linked from the Finding Good Companies module and the dashboard.
 */

const BULL = "#00d4aa";
const BEAR = "#ef4444";
const GRID = "rgba(255,255,255,0.06)";
const LEVEL = "rgba(255,255,255,0.35)";

/* Reusable SVG frame with a subtle grid background.
   All charts use the same viewBox so padding and label positions match. */
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 400 200"
      className="w-full h-auto rounded-lg"
      style={{ background: "rgba(0,0,0,0.25)" }}
      role="img"
    >
      {/* horizontal gridlines */}
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="0" y1={y} x2="400" y2={y} stroke={GRID} strokeWidth="1" />
      ))}
      {/* vertical gridlines */}
      {[80, 160, 240, 320].map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="200" stroke={GRID} strokeWidth="1" />
      ))}
      {children}
    </svg>
  );
}

/* Price path helper - renders a polyline + a faint fill under it.
   Points is an SVG polyline points string. */
function PricePath({ points, color }: { points: string; color: string }) {
  // Build the filled area by closing the path to the bottom of the frame.
  const nums = points.trim().split(/\s+/);
  const first = nums[0]?.split(",") ?? ["0", "100"];
  const last = nums[nums.length - 1]?.split(",") ?? ["400", "100"];
  const areaPoints = `${first[0]},200 ${points} ${last[0]},200`;
  return (
    <>
      <polygon points={areaPoints} fill={color} opacity="0.08" />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

/* Dashed level line with a label to its right. */
function Level({
  y,
  label,
  color = LEVEL,
}: {
  y: number;
  label: string;
  color?: string;
}) {
  return (
    <g>
      <line
        x1="10"
        y1={y}
        x2="370"
        y2={y}
        stroke={color}
        strokeWidth="1.2"
        strokeDasharray="4 4"
      />
      <text x="378" y={y + 4} fontSize="10" fill={color} fontFamily="ui-sans-serif">
        {label}
      </text>
    </g>
  );
}

/* ─────── Pattern SVGs ─────── */

function BreakoutSVG() {
  // Tight range, then break above on a strong candle.
  const points =
    "10,120 30,115 50,125 70,118 90,130 110,120 130,128 150,118 170,126 190,120 210,125 230,118 250,120 270,60 290,55 310,62 330,50 350,58 370,45";
  return (
    <Frame>
      <Level y={110} label="R" />
      <Level y={135} label="S" />
      <PricePath points={points} color={BULL} />
      {/* Breakout arrow */}
      <g>
        <path
          d="M255 108 L255 72"
          stroke={BULL}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M248 80 L255 72 L262 80"
          fill="none"
          stroke={BULL}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </Frame>
  );
}

function SupportResistanceSVG() {
  // Price oscillating between two horizontal levels.
  const points =
    "10,140 40,60 80,135 120,65 160,138 200,62 240,135 280,60 320,138 360,65 390,135";
  return (
    <Frame>
      <Level y={55} label="R" />
      <Level y={140} label="S" />
      <PricePath points={points} color={BULL} />
    </Frame>
  );
}

function BullFlagSVG() {
  // Sharp rally, shallow downward channel, continuation up.
  const flagTop = "130,50 170,65 210,80 250,95";
  const flagBottom = "130,80 170,95 210,110 250,125";
  const points =
    "10,160 30,140 50,115 70,90 90,70 110,55 130,55 150,65 170,75 190,85 210,95 230,85 250,75 270,60 290,45 310,35 330,28 350,25 370,20";
  return (
    <Frame>
      {/* Flag channel (parallel dashed lines) */}
      <polyline
        points={flagTop}
        fill="none"
        stroke={LEVEL}
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      <polyline
        points={flagBottom}
        fill="none"
        stroke={LEVEL}
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      <PricePath points={points} color={BULL} />
      <text x="140" y="155" fontSize="10" fill={LEVEL} fontFamily="ui-sans-serif">
        flag
      </text>
      <text x="295" y="25" fontSize="10" fill={BULL} fontFamily="ui-sans-serif">
        continuation
      </text>
    </Frame>
  );
}

function HeadShouldersSVG() {
  // Left shoulder, head, right shoulder, break below neckline.
  const points =
    "10,140 40,110 70,70 90,90 120,105 150,35 180,90 210,100 240,75 270,105 300,130 330,150 360,165 390,170";
  return (
    <Frame>
      <Level y={110} label="neckline" />
      <PricePath points={points} color={BEAR} />
      {/* Peak labels */}
      <text x="58" y="62" fontSize="10" fill={LEVEL} fontFamily="ui-sans-serif">
        L
      </text>
      <text x="143" y="28" fontSize="10" fill={LEVEL} fontFamily="ui-sans-serif">
        H
      </text>
      <text x="232" y="68" fontSize="10" fill={LEVEL} fontFamily="ui-sans-serif">
        R
      </text>
    </Frame>
  );
}

function DoubleTopSVG() {
  // Two peaks at similar height, then breakdown.
  const points =
    "10,160 40,130 70,80 100,55 130,80 160,110 190,85 220,55 250,85 280,115 310,145 340,165 370,175";
  return (
    <Frame>
      <Level y={55} label="R" />
      <Level y={115} label="neckline" />
      <PricePath points={points} color={BEAR} />
    </Frame>
  );
}

function CupHandleSVG() {
  // Cup: U-shape. Handle: small dip. Breakout at end.
  const points =
    "10,60 30,62 50,75 70,95 90,115 110,130 130,138 150,138 170,130 190,115 210,95 230,75 250,65 260,68 275,80 290,85 305,78 325,62 345,45 365,30";
  return (
    <Frame>
      <Level y={60} label="rim" />
      <PricePath points={points} color={BULL} />
      <text x="95" y="158" fontSize="10" fill={LEVEL} fontFamily="ui-sans-serif">
        cup
      </text>
      <text x="270" y="105" fontSize="10" fill={LEVEL} fontFamily="ui-sans-serif">
        handle
      </text>
    </Frame>
  );
}

function MAReclaimSVG() {
  // Downtrend below a descending MA, then reclaim.
  const price =
    "10,60 35,80 60,95 85,105 110,120 135,135 160,150 180,158 205,150 225,135 245,115 265,95 290,75 315,60 340,50 365,40";
  // Moving average - smoother curve, stays above early, gets reclaimed later.
  const ma =
    "10,50 35,60 60,75 85,90 110,100 135,110 160,118 185,125 210,128 235,125 260,118 285,108 310,95 335,82 360,70 385,58";
  return (
    <Frame>
      <polyline
        points={ma}
        fill="none"
        stroke={LEVEL}
        strokeWidth="1.5"
        strokeDasharray="5 3"
      />
      <PricePath points={price} color={BULL} />
      <text x="265" y="65" fontSize="10" fill={BULL} fontFamily="ui-sans-serif">
        reclaim
      </text>
      <text x="40" y="45" fontSize="10" fill={LEVEL} fontFamily="ui-sans-serif">
        50-day MA
      </text>
    </Frame>
  );
}

function FailedBreakdownSVG() {
  // Price breaks below support, then reverses back up hard.
  const points =
    "10,90 35,100 60,115 85,125 110,135 135,145 160,155 180,170 195,175 210,160 230,135 255,110 280,85 305,65 330,50 355,40 380,35";
  return (
    <Frame>
      <Level y={145} label="S" />
      <PricePath points={points} color={BULL} />
      <text x="180" y="190" fontSize="10" fill={LEVEL} fontFamily="ui-sans-serif">
        false break
      </text>
      <text x="290" y="55" fontSize="10" fill={BULL} fontFamily="ui-sans-serif">
        reversal
      </text>
    </Frame>
  );
}

/* ─────── Pattern data ─────── */

interface Pattern {
  name: string;
  kind: "bullish" | "bearish" | "either";
  tagline: string;
  explainer: string;
  action: string;
  Svg: () => React.ReactElement;
}

const PATTERNS: Pattern[] = [
  {
    name: "Breakout",
    kind: "bullish",
    tagline: "Range, then release.",
    explainer:
      "Price compresses inside a tight range for weeks. One day it closes decisively above the top of the range on heavier-than-average volume. That break is often the start of a new leg up as sidelined buyers pile in.",
    action:
      "Wait for a close above resistance, not just a wick. Confirm with volume. The retest of the old resistance as new support is usually a lower-risk entry than chasing the initial break.",
    Svg: BreakoutSVG,
  },
  {
    name: "Support and resistance",
    kind: "either",
    tagline: "The price levels the market respects.",
    explainer:
      "Support is a horizontal level where buyers have repeatedly stepped in. Resistance is where sellers have repeatedly appeared. The more times a level holds, the more meaningful it becomes - and the bigger the signal when it finally breaks.",
    action:
      "Mark the obvious levels on a daily chart. Plan entries near support, trims near resistance. A clean break of either is a regime change, not a coincidence.",
    Svg: SupportResistanceSVG,
  },
  {
    name: "Bull flag",
    kind: "bullish",
    tagline: "Sharp rally, shallow rest, continuation.",
    explainer:
      "A strong vertical move leaves a visible gain (the pole). Price then drifts down in a shallow, orderly channel on lighter volume (the flag). A break out of the top of the flag often resumes the original trend at roughly the same magnitude.",
    action:
      "Flags are healthier the tighter and shorter they are. A deep, sloppy pullback is not a flag - it's a reversal in progress. Enter on the break out of the top of the channel, stop under the flag low.",
    Svg: BullFlagSVG,
  },
  {
    name: "Head and shoulders",
    kind: "bearish",
    tagline: "A classic reversal.",
    explainer:
      "Three peaks: a left shoulder, a higher head, and a right shoulder at roughly the same height as the left. The line connecting the two dips between them is the neckline. A decisive break below the neckline usually ends the uptrend.",
    action:
      "This is a trim signal on names you hold, not necessarily a short signal. The measured target is the distance from the head to the neckline, projected downward from the break point.",
    Svg: HeadShouldersSVG,
  },
  {
    name: "Double top",
    kind: "bearish",
    tagline: "Two tries, no follow-through.",
    explainer:
      "Price makes a high, pulls back, then rallies up to the same approximate high a second time and fails. The neckline is the low between the two peaks. When that neckline breaks, the uptrend is usually done.",
    action:
      "Until the neckline breaks, it is just a range. Do not front-run the pattern. Trim on the break, size smaller on any bounce back up.",
    Svg: DoubleTopSVG,
  },
  {
    name: "Cup and handle",
    kind: "bullish",
    tagline: "Deep rest, small shake, launch.",
    explainer:
      "Price forms a long rounded bottom that looks like a cup, reclaims the old high, pulls back shallowly (the handle), and then breaks out. The depth of the cup represents accumulation; the handle shakes out late, weak holders before the real move.",
    action:
      "The cup should be smooth, not V-shaped. The handle should be a small, sideways drift on low volume. Enter on the break above the handle high, stop below the handle low.",
    Svg: CupHandleSVG,
  },
  {
    name: "Moving average reclaim",
    kind: "bullish",
    tagline: "Character change.",
    explainer:
      "Price has been trending below a major moving average (typically the 50-day or 200-day) for months. Then it closes decisively above it and holds. That reclaim often marks the end of the downtrend and the start of a new phase.",
    action:
      "Use the 50-day for swing trades and the 200-day for longer-term trend changes. The first reclaim is often tested - a successful retest that holds the MA as new support is a stronger signal than the initial reclaim alone.",
    Svg: MAReclaimSVG,
  },
  {
    name: "Failed breakdown",
    kind: "bullish",
    tagline: "They broke support and nobody came.",
    explainer:
      "Price breaks below a well-known support level but fails to follow through. Instead, it quickly reverses and reclaims the level. Failed breakdowns trap sellers and often lead to fast, powerful moves the other way.",
    action:
      "A break below support that reclaims within a day or two is the signal. This is one of the highest win-rate setups in the book - but only when support was meaningful to begin with.",
    Svg: FailedBreakdownSVG,
  },
];

/* ─────── Page ─────── */

export default async function PatternsPage() {
  const session = await getCurrentSession();
  if (!session || !(session.paid || session.admin)) {
    redirect("/login?return=/trading/patterns");
  }
  const meta = await getUserMeta(session.sub);
  if (!meta.onboardingComplete) {
    redirect("/onboarding");
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-20">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/trading/m/finding-companies"
            className="inline-flex items-center gap-1.5 text-[12px] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors mb-4"
          >
            <span>←</span> Back to Finding Good Companies
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
            Chart Patterns
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-2 leading-relaxed max-w-2xl">
            The handful of shapes worth recognizing on sight. You will not use
            these to predict the future - you will use them to time entries on
            businesses you already decided to own, and to spot when a trend
            has quietly changed character.
          </p>
          <div className="flex items-center gap-4 mt-4 text-[11px] text-[var(--text-muted)]">
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full"
                style={{ background: BULL }}
              />
              Bullish
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full"
                style={{ background: BEAR }}
              />
              Bearish
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full"
                style={{ background: "var(--text-muted)" }}
              />
              Either direction
            </span>
          </div>
        </div>

        {/* Pattern grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {PATTERNS.map((p) => {
            const color =
              p.kind === "bullish"
                ? BULL
                : p.kind === "bearish"
                  ? BEAR
                  : "var(--text-muted)";
            return (
              <article
                key={p.name}
                className="p-5 md:p-6 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)]"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h2 className="text-[17px] font-bold text-[var(--text-primary)] tracking-tight">
                    {p.name}
                  </h2>
                  <span
                    className="text-[10px] uppercase tracking-[0.14em] font-semibold px-2 py-1 rounded-md"
                    style={{
                      color,
                      background:
                        p.kind === "either"
                          ? "rgba(255,255,255,0.04)"
                          : `${color}18`,
                      border: `1px solid ${
                        p.kind === "either" ? "var(--border)" : `${color}40`
                      }`,
                    }}
                  >
                    {p.kind}
                  </span>
                </div>
                <p className="text-[13px] text-[var(--text-muted)] mb-4">
                  {p.tagline}
                </p>

                <div className="mb-5">
                  <p.Svg />
                </div>

                <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed mb-4">
                  {p.explainer}
                </p>

                <div className="pt-3 border-t border-[var(--border)]">
                  <div className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[var(--text-muted)] mb-1.5">
                    What to do
                  </div>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                    {p.action}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Practice prompt */}
        <section className="mt-10 p-6 rounded-2xl border border-[var(--accent)]/30 bg-gradient-to-br from-[var(--accent)]/[0.06] to-transparent">
          <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--accent)] mb-2">
            Practice
          </div>
          <h3 className="text-[18px] font-bold text-[var(--text-primary)] mb-2">
            Go find one on a real chart.
          </h3>
          <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed mb-4">
            Open TradingView. Pick any ticker you own or watch. Turn on the
            50-day and 200-day moving averages. Scroll back a year or two and
            see how many of these patterns you can spot in hindsight. Do this
            five times and pattern recognition stops being an idea and starts
            being a reflex.
          </p>
          <a
            href="https://www.tradingview.com/chart/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2.5 rounded-xl bg-[var(--accent)] text-[#0a0b0f] text-sm font-bold hover:opacity-90 transition-opacity"
          >
            Open TradingView →
          </a>
        </section>
      </div>
    </div>
  );
}
