"use client";

import SectionLayout, { SectionItem } from "../../components/SectionLayout";
import { Card, StatBox, Table, RuleCard } from "../../components/Card";
import Paywall from "../../components/Paywall";

const SECTIONS: SectionItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "◈" },

  // ── Foundations ──
  { id: "foundations", label: "Investing Foundations", icon: "🧭" },
  { id: "smart-risk", label: "Smart Risk Formula", icon: "⚖" },
  { id: "wealth-stages", label: "The 4 Wealth Stages", icon: "📶" },
  { id: "money-beliefs", label: "Beliefs About Money", icon: "💭" },

  // ── Analysis ──
  { id: "analysis-framework", label: "6-Step Analysis Framework", icon: "🔍" },
  { id: "macro", label: "Macro Framework", icon: "🌍" },
  { id: "indicators", label: "Key Indicators", icon: "📈" },
  { id: "regimes", label: "Macro Regimes", icon: "🔄" },
  { id: "technical-analysis", label: "Technical Analysis", icon: "📐" },
  { id: "elliott-waves", label: "Elliott Waves & Fib", icon: "🌊" },
  { id: "case-studies", label: "Case Studies", icon: "📚" },

  // ── Portfolio ──
  { id: "allocation", label: "3-Tier Allocation", icon: "🏛" },
  { id: "position-sizing", label: "Position Sizing", icon: "📏" },
  { id: "sample-portfolio", label: "Sample Portfolio", icon: "📊" },
  { id: "mistakes", label: "11 Mistakes to Avoid", icon: "⚠" },

  // ── The Wheel Strategy ──
  { id: "wheel", label: "The Wheel Strategy", icon: "⟳" },
  { id: "vix", label: "VIX Framework", icon: "📊" },
  { id: "csps", label: "Cash-Secured Puts", icon: "📉" },
  { id: "covered-calls", label: "Covered Calls", icon: "📞" },
  { id: "spreads", label: "Bear Call Spreads", icon: "🐻" },
  { id: "leaps", label: "LEAPS", icon: "🚀" },
  { id: "stock-criteria", label: "Stock Criteria", icon: "✅" },
  { id: "safe-haven", label: "Safe Haven Stocks", icon: "🛡" },

  // ── Execution ──
  { id: "principles", label: "Wheel Strategy Rules", icon: "📋" },
  { id: "risk", label: "Risk Management", icon: "🛟" },
  { id: "weekly-routine", label: "Weekly Routine", icon: "📅" },
  { id: "checklist", label: "Pre-Trade Checklist", icon: "☑" },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{children}</h2>;
}

function Sub({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-[var(--text-secondary)] mb-7 leading-relaxed">{children}</p>;
}

function B({ children }: { children: React.ReactNode }) {
  return <strong className="text-[var(--text-primary)]">{children}</strong>;
}

function P({ children, last, className }: { children: React.ReactNode; last?: boolean; className?: string }) {
  return <p className={`${last ? "m-0" : "mb-2"}${className ? " " + className : ""}`}>{children}</p>;
}

// ─── Section Content ───

function Dashboard() {
  return (
    <>
      <SectionTitle>Markets Dashboard</SectionTitle>
      <Sub>Your complete investing, trading, and macro reference. Start at Foundations if you&apos;re new. Jump to the Wheel Strategy if you&apos;re here to run the income engine.</Sub>
      <div className="flex flex-wrap gap-3.5 mb-7">
        <StatBox label="Core Strategy" value="The Wheel" sub="CSPs → Assignment → Covered Calls" />
        <StatBox label="Max Allocation" value="10-12%" sub="Per individual stock" />
        <StatBox label="Target Delta (CSP)" value="20-25δ" sub="Safe account baseline" />
        <StatBox label="CC Duration" value="25-45d" sub="Optimal income & flexibility" />
      </div>
      <Card title="How This Pillar Is Organized" accent="#4ecdc4">
        <P><B>1. Foundations</B> - investing principles, the 4 wealth stages, how to think about risk and money. Start here if you&apos;re building your first portfolio.</P>
        <P><B>2. Analysis</B> - the 6-step framework, macro, technical analysis, Elliott Waves, and the 11 mistakes that kill most investors.</P>
        <P><B>3. Portfolio</B> - the 3-tier allocation system, position sizing math, and a real sample portfolio.</P>
        <P><B>4. Wheel Strategy</B> - the mechanical options income engine. CSPs, covered calls, spreads, LEAPS, and the VIX-based deployment framework.</P>
        <P last><B>5. Execution</B> - the rules, routines, and checklists that keep the system running when your emotions say otherwise.</P>
      </Card>
      <Card title="The Wheel Strategy - Quick Reference" accent="#4ecdc4">
        <P><B>1. Sell Cash-Secured Puts</B> on stocks you believe in at 20-25 delta, 25-45 DTE</P>
        <P><B>2. Get Assigned</B> - this is the plan, not a failure. Immediately sell covered calls.</P>
        <P><B>3. Sell Covered Calls</B> at cost basis or above. Use delta based on conviction.</P>
        <P><B>4. Manage by VIX</B> - adjust cash allocation, delta, and strategy per VIX regime.</P>
        <P last><B>5. Add Bear Call Spreads</B> monthly on indices for short-delta income (5-8% of portfolio).</P>
      </Card>
      <Card title="Key Behavioral Rules" accent="#ff6b6b">
        <P>• Don&apos;t react to news - capitalize on the fear it creates</P>
        <P>• Paper losses are temporary if fundamentals are intact</P>
        <P>• Stay mechanical - don&apos;t let individual losses change overall strategy</P>
        <P>• Expected moves are typically mispriced on the put side - this is your edge</P>
        <P last>• Patience is the most profitable skill in volatile markets</P>
      </Card>
    </>
  );
}

function Foundations() {
  return (
    <>
      <SectionTitle>Investing Foundations</SectionTitle>
      <Sub>The beliefs and principles that separate wealth builders from the people still saving their way to retirement.</Sub>
      <Card title="Core Beliefs" accent="#4ecdc4">
        <P>• <B>You don&apos;t need a lot of money to start.</B> Waiting until you have &quot;enough&quot; is how decades pass with nothing to show for them.</P>
        <P>• <B>Savers lose.</B> Keeping money in cash is not safe - inflation is a guaranteed loss. Investing is the only way to preserve purchasing power.</P>
        <P>• <B>Buy and hold isn&apos;t enough.</B> The wealthy use leverage to compound faster. The middle class avoids it and compounds slower.</P>
        <P>• <B>OPM is how you skip the savings grind.</B> Borrowing $100K can take a week. Saving it takes a decade. Debt used correctly is an instrument for wealth.</P>
        <P>• <B>Ideas make money.</B> It doesn&apos;t take money to make money - it takes capability.</P>
        <P>• <B>Your first $100K is the hardest.</B> Prioritize getting liquid to six figures. After that it snowballs.</P>
        <P last>• <B>True wealth is knowledge + freedom, not a number.</B> The number is just how you measure whether you bought back your time.</P>
      </Card>
      <Card title="The Wealth-Building Sequence" accent="#ffd93d">
        <P><B>Stage 1 - Make money.</B> Increase income. Cash flow is the raw material for everything else.</P>
        <P><B>Stage 2 - Multiply it.</B> Build an investing skillset. Compounding starts here.</P>
        <P><B>Stage 3 - Detach income from time.</B> Income-producing assets. Residual streams. Systems that run without you.</P>
        <P last><B>Stage 4 - Protect and structure.</B> Entities, trusts, tax strategy. The wealth you don&apos;t defend is wealth you don&apos;t keep.</P>
      </Card>
      <Card title="Leverage & Debt">
        <P>Leverage = borrowed capital to amplify ROI. Used correctly, it&apos;s the highest-impact tool in the wealth toolkit. Used recklessly, it blows you up.</P>
        <P>Saving will never make you rich. Only investing and leveraging can.</P>
        <P>The wealthy want MORE debt. The middle class wants to live debt-free. These are fundamentally different operating systems.</P>
        <P last>Educate yourself on how to leverage OPM with minimal risk before you deploy it.</P>
      </Card>
      <Card title="Ways to Make Money in Markets">
        <P><B>Stocks</B> - Buy low, sell high. Use fundamental analysis: cash flow, balance sheet, debt ratios.</P>
        <P><B>Options</B> - Calls are bullish, puts are bearish. Intrinsic value = strike − stock price. Selling options is your income engine (see Wheel Strategy).</P>
        <P><B>Futures</B> - Long (rise) and short (drop) with defined contract expiries.</P>
        <P last><B>Leveraged assets</B> - LEAPS, leveraged ETFs. Use in bull markets with caution. Avoid in bear markets.</P>
      </Card>
    </>
  );
}

function SmartRisk() {
  return (
    <>
      <SectionTitle>The Smart Risk Formula</SectionTitle>
      <Sub>Risk isn&apos;t volatility. Risk is what you don&apos;t understand.</Sub>
      <Card title="The Formula" accent="#4ecdc4">
        <p className="text-[var(--text-primary)] text-center text-lg font-semibold my-4">
          SMART RISK = (SKILL + PREPARATION) × ACTION
        </p>
        <P>Take calculated risks - the kind you&apos;ve studied, stress-tested, and prepared for.</P>
        <P>Recklessness isn&apos;t bold. It&apos;s just broke in slow motion.</P>
        <P last>The only risks worth taking are the ones where you understand exactly what you&apos;re risking and why.</P>
      </Card>
      <Card title="Risk Is Inversely Proportional to Research" accent="#ffd93d">
        <P>At a first-principles level, risk is a simple question: will I lose my money or not?</P>
        <P>The more hours you&apos;ve spent understanding an investment, the lower your actual risk - regardless of what Wall Street calls &quot;risky.&quot;</P>
        <P>Volatility is short-term noise. It is not risk.</P>
        <P last>The investment Wall Street labels &quot;risky&quot; is often the one where the researcher has a massive edge and the ignorant get smoked.</P>
      </Card>
      <Card title="The Asymmetric Question">
        <P className="italic">
          &quot;If I have a ~25% chance of losing 50%+ of my net worth in a once-every-20-year bear market, but a ~75% chance of adding an extra 0 to my net worth in the next few years - how can I position myself so I win in EITHER outcome?&quot;
        </P>
        <P last>That&apos;s the only question that matters for long-term positioning.</P>
      </Card>
    </>
  );
}

function WealthStages() {
  return (
    <>
      <SectionTitle>The 4 Wealth Stages</SectionTitle>
      <Sub>Your portfolio strategy must change as your net worth does. Running a $50K portfolio like a $5M portfolio guarantees you never get to $5M.</Sub>
      <Card title="Stage 1 - Aggressive Growth ($0 – $500K)" accent="#4ecdc4">
        <P><B>Mindset:</B> Extreme concentration. You are here to build, not protect.</P>
        <P><B>Positions:</B> Smaller cap, undervalued growth stocks. Early-cycle crypto.</P>
        <P><B>Leverage:</B> Strategic use of OPM and LEAPS. This is where asymmetry lives.</P>
        <P><B>Cash:</B> 10-15%.</P>
        <P last><B>Bottleneck:</B> Your identity. The first $100K is harder than going from $100K to $1M.</P>
      </Card>
      <Card title="Stage 2 - Momentum ($500K – $1.5M)" accent="#ffd93d">
        <P><B>Mindset:</B> You&apos;ve broken inertia. Now refine entries and protect the compounder.</P>
        <P><B>Positions:</B> 5-10 high-conviction holdings with 3-10x potential over 5-7 years.</P>
        <P><B>Crypto:</B> Concentrate toward Bitcoin.</P>
        <P><B>Leverage:</B> Scale back.</P>
        <P last><B>Cash:</B> 20-25%.</P>
      </Card>
      <Card title="Stage 3 - Maturity ($1.5M – $5M)" accent="#ff6b6b">
        <P><B>Mindset:</B> Financially independent. Add diversification without losing the edge.</P>
        <P><B>Positions:</B> Core holdings + safer tech plays + ETFs (QQQ, SMH, SPY).</P>
        <P><B>Leverage:</B> Small % play money only.</P>
        <P><B>Cash:</B> 30%+.</P>
        <P last><B>Math:</B> At this stage, 10-20% CAGR makes you wildly wealthy. Protect the base.</P>
      </Card>
      <Card title="Stage 4 - Legacy ($5M – $50M+)">
        <P><B>Mindset:</B> Preserve, structure, transfer.</P>
        <P><B>Positions:</B> S&P 500, savings vehicles, life insurance. Small allocation to growth.</P>
        <P><B>Inflation hedges:</B> Gold, silver, Bitcoin, indexes.</P>
        <P><B>Structure:</B> Trusts, estate planning, tax strategy become the real work.</P>
        <P last><B>Cash:</B> 50%+.</P>
      </Card>
      <Card title="The $500K Tipping Point" accent="#ffd93d">
        <P>Going from $0 to $500K liquid is the hardest milestone of the entire journey.</P>
        <P>Below $500K, your #1 bottleneck is identity - the invisible ceiling your subconscious holds.</P>
        <P last>Above $500K, capital starts doing work that used to require your time. The game changes.</P>
      </Card>
    </>
  );
}

function MoneyBeliefs() {
  return (
    <>
      <SectionTitle>Beliefs About Money</SectionTitle>
      <Sub>Your unconscious money scripts set the ceiling. Identifying and rewriting them is the highest-leverage work you&apos;ll do.</Sub>
      <Card title="Limiting Beliefs to Audit" accent="#ff6b6b">
        <P>• &quot;Money is hard to earn.&quot;</P>
        <P>• &quot;Money comes and goes.&quot; (impermanence)</P>
        <P>• &quot;Money should be spent with care.&quot; (scarcity)</P>
        <P>• &quot;I deserve to spend on expensive things because why not.&quot; (waste)</P>
        <P last>• &quot;Spending is fine because money always comes back.&quot; (denial)</P>
      </Card>
      <Card title="The Reprogramming Principles" accent="#4ecdc4">
        <P>• Money is energy. It circulates to people who value it.</P>
        <P>• Celebrate spending on assets, education, and experiences - neutral emotion around outflow.</P>
        <P>• &quot;I am not the victim. I am the creator.&quot; Outcomes are a product of identity, not luck.</P>
        <P>• Your net worth will follow how you perceive yourself and the people around you.</P>
        <P last>• 95% of financial behavior runs from subconscious programming installed before age 7. Reprogramming is not optional.</P>
      </Card>
      <Card title="The Identity-Wealth Link">
        <P>If $1M was wired to your account tomorrow, you&apos;d still dress, think, associate, and behave the same way. Money alone doesn&apos;t change you.</P>
        <P>That&apos;s why lottery winners go broke. Their internal operating system is calibrated for scarcity. Any reality that conflicts with it gets auto-corrected.</P>
        <P last>Wealth is inside-out. Rewrite identity first. Reality follows.</P>
      </Card>
    </>
  );
}

function AnalysisFramework() {
  return (
    <>
      <SectionTitle>The 6-Step Analysis Framework</SectionTitle>
      <Sub>How to research an investment from zero to conviction. Skip a step and you&apos;re gambling with extra steps.</Sub>
      <Card title="Step 1 - In-Depth Analysis (5 Levels)" accent="#4ecdc4">
        <P><B>Level 1: Macro.</B> Always start here. If the landscape is bearish, even great companies won&apos;t do well. If bullish, even mediocre companies float. Five questions: rates direction, GDP growth, global liquidity (M2), business cycle (ISM), policy tailwinds.</P>
        <P><B>Level 2: Microeconomic.</B> 2+ annual shareholder letters. 3+ quarterly transcripts. Know the mission, model, differentiators, revenue segments, top 5 opportunities, top 5 threats.</P>
        <P><B>Level 3: Qualitative.</B> Founder-led? Executive track record? Management: capital allocation, culture, long-term focus, shareholder friendliness. Structural: talent density, decentralized decisions, meritocracy.</P>
        <P><B>Level 4: Quantitative.</B> FCF, revenue growth, margin expansion, P/E and P/S vs. industry, share count trend, working capital ratio, CAGR, operating leverage, cash vs. debt.</P>
        <P last><B>Level 5: Competition.</B> Moat assessment - economies of scale, network effects, switching costs, brand, process power. Then repeat steps 2-4 on top competitors.</P>
      </Card>
      <Card title="Step 2 - Synthesize & Rate" accent="#ffd93d">
        <P><B>Score operational traits 0-10.</B> Management, operations (customer focus, iteration pace, failure tolerance), structure (talent density, meritocracy).</P>
        <P><B>Score the moat 0-10.</B> Has it survived disruption? Is operational efficiency improving? Are economies of scale being shared with customers?</P>
        <P last><B>Average 9+</B> = Tier 1 candidate. Extract deeper KPIs specific to the industry. Look for what Wall Street doesn&apos;t see yet.</P>
      </Card>
      <Card title="Step 3 - Write Your Investment Thesis" accent="#ff6b6b">
        <P>Build three cases: <B>Base, Bear, Bull.</B></P>
        <P>Cover: dominant narratives benefiting the company, TAM and asymmetric upside, core value creation mechanism, scaling story, moat vs. competition, key financial trajectory, real risks in depth, 3/5/10-year price targets, final conclusion and your &quot;why.&quot;</P>
        <P last>If you can&apos;t write it in clear prose, you don&apos;t understand the investment well enough to size it.</P>
      </Card>
      <Card title="Steps 4-6: Entries, Exits, Quarterly Reviews">
        <P><B>Step 4: Entry plan.</B> Scale in, rarely starting more than 50% of intended allocation. Usually 20% or less.</P>
        <P><B>Step 5: Exit plan.</B> Scale out in 3-4 waves of 25-35% each - unless the thesis has broken.</P>
        <P><B>Step 6: Quarterly due diligence.</B> Reread the thesis. Has anything changed? Is the thesis intact? If broken, cut fast.</P>
        <P last><B>Bonus:</B> Annual portfolio review. What worked, what didn&apos;t, what do you need to learn.</P>
      </Card>
      <Card title="The Fantastic Four Mental Model" accent="#4ecdc4">
        <P><B>Macro</B> (economy as a system) + <B>Qualitative</B> (your crystal ball on the company) + <B>Quantitative</B> (the numbers) + <B>Technical</B> (entry timing).</P>
        <P last>Seek CONFLUENCE. The intersection of qualitative + quantitative + technical = your highest-conviction decisions.</P>
      </Card>
    </>
  );
}

function Macro() {
  return (
    <>
      <SectionTitle>Macro Framework</SectionTitle>
      <Sub>The three pillars and how they drive every asset class.</Sub>
      <Card title="The Three Pillars of Macro" accent="#4ecdc4">
        <P><B>1. Growth</B> - How fast is the economy growing? Accelerating or decelerating? Drives corporate earnings and stock prices.</P>
        <P><B>2. Inflation</B> - At what rate are prices rising? Impacts interest rates, bond yields, and all asset valuations.</P>
        <P last><B>3. Policy</B> - How are central banks responding? Tightening to fight inflation or easing to support growth?</P>
      </Card>
      <Card title="The 5 Macro Questions (Ask Every Month)" accent="#ffd93d">
        <P>• Are interest rates trending up or down? (Higher = bearish for equities; lower = bullish)</P>
        <P>• Is U.S. GDP growth positive, neutral, or negative? (Best case: 2%+ expected)</P>
        <P>• Is global liquidity (M2) in an uptrend or downtrend? (TradingView: M2SL)</P>
        <P>• Is the business cycle in expansion or contraction? (TradingView: USMPR for ISM)</P>
        <P last>• Are economic policies providing tailwinds (bullish) or headwinds (bearish)?</P>
      </Card>
      <Card title="Business Cycle Phases">
        <Table
          headers={["Phase", "Characteristics", "What Drives It"]}
          rows={[
            ["Expansion", "GDP rising, unemployment falling, profits strong", "Credit expansion, rising confidence"],
            ["Peak", "Economy at full capacity, inflation building", "Capacity constraints, labor scarcity"],
            ["Contraction", "GDP falling, unemployment rising, profits declining", "Credit tightening, falling confidence"],
            ["Trough", "Maximum pain, bottoming out", "Aggressive policy easing, capitulation"],
          ]}
        />
      </Card>
      <Card title="Key Concepts">
        <P><B>Real Rate</B> = Nominal Rate − Inflation. The most important price in finance.</P>
        <P><B>Leading Indicators</B> change before the economy (stock prices, PMIs, building permits).</P>
        <P><B>Coincident Indicators</B> change with the economy (payrolls, industrial production).</P>
        <P><B>Lagging Indicators</B> change after the economy (unemployment rate, CPI).</P>
        <P><B>Credit</B> is more important than money - most &quot;money&quot; is created by bank lending.</P>
        <P last><B>Don&apos;t Fight the Fed</B> - anticipating the central bank pivot is a core macro skill.</P>
      </Card>
      <Card title="Rule of Thumb" accent="#ff6b6b">
        <P>If the economy is in EXPANSION - most investments perform well short-term.</P>
        <P last>If in CONTRACTION - nearly all equities underperform. Use contractions to identify 5-10 winners at undervalued prices.</P>
      </Card>
    </>
  );
}

function Indicators() {
  return (
    <>
      <SectionTitle>Key Economic Indicators</SectionTitle>
      <Sub>The data that tells you where we are in the cycle. Track these, not opinions.</Sub>
      <Table
        headers={["Indicator", "Frequency", "What It Measures", "Why It Matters"]}
        rows={[
          ["ISM PMI", "Monthly", "Manufacturing/services health", "Leading indicator. >50 = expansion. Master indicator."],
          ["M2SL", "Monthly", "Global liquidity (money supply)", "Expansion = bullish for risk assets."],
          ["Non-Farm Payrolls", "Monthly (1st Fri)", "Change in US jobs", "Broadest labor market measure."],
          ["CPI", "Monthly", "Consumer price inflation", "Most watched inflation gauge."],
          ["Core PCE", "Monthly", "Fed's preferred inflation", "Fed targets 2% Core PCE."],
          ["GDP", "Quarterly", "Total economic output", "Broadest growth measure."],
          ["Retail Sales", "Monthly", "Consumer spending", "Consumer = 70% of GDP."],
          ["Jobless Claims", "Weekly (Thu)", "New unemployment filings", "Most timely labor market pulse."],
          ["10Y-2Y Spread", "Daily", "Yield curve shape", "Inversion = recession warning."],
          ["HY Spreads", "Daily", "Junk bond risk premium", "Widening = financial stress."],
          ["VIX", "Daily", "Expected S&P 500 volatility", "Fear gauge. >30 = extreme fear."],
          ["DXY", "Daily", "US Dollar strength", "Strong = risk-off / flight to safety."],
          ["CME FedWatch", "Daily", "Rate cut/hike probabilities", "Primary policy signal."],
        ]}
      />
      <Card title="Why ISM Is the Master Indicator" accent="#4ecdc4">
        <P>ISM called the October 2022 bottom in real time. It tells you when cyclical markets are ending.</P>
        <P>When ISM expands: stay invested.</P>
        <P>When ISM rolls over: get defensive.</P>
        <P last>No single indicator is perfect, but ISM has the highest signal-to-noise ratio of anything on this list.</P>
      </Card>
      <Card title="Practical Tools" accent="#ffd93d">
        <P>• <B>CME FedWatch</B> - primary policy signal. Rate cut odds directly affect positioning.</P>
        <P>• <B>VIX</B> - dictates cash allocation and delta selection for the Wheel.</P>
        <P>• <B>Bollinger Bands</B> - primary technical tool for entry timing.</P>
        <P>• <B>Put-to-call ratio</B> - contrarian indicator. Extremes signal reversals.</P>
        <P>• <B>S5FI Index</B> - stocks above 50-day MA. Few = buying opportunities in oversold names.</P>
        <P last>• <B>Market breadth</B> - % of stocks making ATH. Narrowing breadth precedes almost every crash.</P>
      </Card>
    </>
  );
}

function Regimes() {
  return (
    <>
      <SectionTitle>The Four Macro Regimes</SectionTitle>
      <Sub>Identify the regime → follow the playbook. This is the core macro edge.</Sub>
      <Table
        headers={["Regime", "Growth", "Inflation", "Fed", "Best Assets", "Worst Assets"]}
        rows={[
          ["Disinflationary Boom (Goldilocks)", "↑ Accelerating", "↓ Falling", "Neutral/Dovish", "Growth stocks, Tech, Credit", "Defensives, Bonds"],
          ["Inflationary Boom (Overheating)", "↑ Strong", "↑ Rising", "Hawkish", "Commodities, Value, TIPS", "Long bonds, Growth stocks"],
          ["Stagflation (Worst)", "↓ Weak", "↑ High", "Hawkish (trapped)", "Gold, USD, Commodities", "Stocks, Bonds, Credit"],
          ["Disinflationary Bust (Recession)", "↓ Weak", "↓ Falling", "Dovish (cutting)", "Long bonds, Gold, USD, Defensives", "Cyclicals, Commodities, HY Credit"],
        ]}
      />
      <Card title="Regime Transition Pattern" accent="#4ecdc4">
        <P>Economies typically cycle clockwise through the regimes:</P>
        <p className="text-[var(--text-primary)] font-semibold text-center text-sm my-3">
          Disinflationary Bust → Disinflationary Boom → Inflationary Boom → Stagflation → Disinflationary Bust
        </p>
        <P last>Your job: identify the current regime AND where we&apos;re headed next. Position ahead of the crowd.</P>
      </Card>
      <Card title="Correlation Shifts" accent="#ff6b6b">
        <P><B>Disinflationary regimes:</B> Stock-bond correlation is negative (bonds hedge stocks).</P>
        <P last><B>Inflationary regimes:</B> Stock-bond correlation turns positive (both fall together - 2022 lesson).</P>
      </Card>
    </>
  );
}

function TechnicalAnalysis() {
  return (
    <>
      <SectionTitle>Technical Analysis</SectionTitle>
      <Sub>Not a crystal ball. A way to time entries and exits when you&apos;ve already decided what&apos;s worth owning.</Sub>
      <Card title="Support & Resistance" accent="#4ecdc4">
        <P>• Traders buy at support, sell at resistance. That is literally what drives price.</P>
        <P>• Resistance becomes support when price breaks through it in an uptrend.</P>
        <P>• Support becomes resistance when price breaks down through it in a downtrend.</P>
        <P>• Mark S&R on HIGH timeframes (daily and weekly) - they&apos;re more meaningful.</P>
        <P last>• S&R levels are more important than trendlines. 4-5 touches = strong zone.</P>
      </Card>
      <Card title="Trends & Patterns" accent="#ffd93d">
        <P><B>Uptrend:</B> Higher highs and higher lows (HH/HL).</P>
        <P><B>Downtrend:</B> Lower highs and lower lows (LH/LL).</P>
        <P><B>Impulse:</B> Breakout or expansion move.</P>
        <P><B>Consolidation:</B> Price held between constant high/low range - correction/retracement.</P>
        <P>Channels can be parallel, triangular, or flag-shaped.</P>
        <P last>Patterns repeat because they represent human emotion. The market is emotional in the short run, rational in the long run.</P>
      </Card>
      <Card title="Candlestick Patterns (Most Reliable on Daily Timeframe)" accent="#ff6b6b">
        <P><B>Engulfing:</B> Candle fully engulfs the prior candle. A third confirming candle is ideal.</P>
        <P><B>Tweezer:</B> More reliable near identified S&R levels.</P>
        <P><B>Doji:</B> Open and close very close - indecision.</P>
        <P><B>Big wicks:</B> Uncertainty. Long upper wick = buyers pushed up, sellers brought it back. Long lower wick = sellers drove down, buyers recovered.</P>
        <P><B>No down wick at market open:</B> Strong bullish momentum - buyers dominated from the start.</P>
        <P last><B>Body vs. wicks:</B> Body = priority. Wicks = secondary. Gaps always fill eventually.</P>
      </Card>
      <Card title="Supply & Demand Zones">
        <P>Zone strength = how far a wick or candle traces into a zone, and how many candles trade inside before moving out.</P>
        <P>• <B>Strongest:</B> Wick touches the edge and bounces immediately.</P>
        <P>• <B>Weakest:</B> Multiple candles trading deep into the zone - orders have been absorbed.</P>
        <P last>Strength tests apply on retrace to a zone, not on zone formation.</P>
      </Card>
      <Card title="Seasonality & Timing" accent="#4ecdc4">
        <P>• <B>Best months:</B> November through April (Q4 + Q1).</P>
        <P>• <B>Worst months:</B> May through October.</P>
        <P>• <B>Q4</B> is tech&apos;s best quarter historically.</P>
        <P>• <B>Quad Witching</B> (3rd Friday of 3rd month each quarter) - classic LEAPS entry.</P>
        <P last>• Every company has peak-demand quarters. Every sector has seasonal tilts. Learn the ones you trade.</P>
      </Card>
      <Card title="Trading Psychology" accent="#ffd93d">
        <P>• Base emotions: fear and hope. Advanced destructive: greed, euphoria, FOMO, anger, revenge trading.</P>
        <P>• ALWAYS have a plan for every trade. Written. Before you enter.</P>
        <P>• Sticking to rules on a bad trade beats breaking rules and getting lucky. Every time.</P>
        <P>• Fear stops you from entering or makes you exit prematurely. Hope turns small losses into big ones. Greed stops you from closing winners at target.</P>
        <P last>• 90-95% of traders are unsuccessful. Behave like the 5% - emotional control, rule adherence, and analytical foundation.</P>
      </Card>
    </>
  );
}

function ElliottWaves() {
  return (
    <>
      <SectionTitle>Elliott Waves & Fibonacci</SectionTitle>
      <Sub>A framework for reading trend structure. Use for context and entry timing - not as a crystal ball.</Sub>
      <Card title="The Core Structure" accent="#4ecdc4">
        <P>Each impulse wave (1, 3, 5) has 5 subwaves inside it.</P>
        <P>Each corrective wave (2, 4) has 3 subwaves (A, B, C).</P>
        <P>Waves exist inside waves - fractal at every timeframe.</P>
        <P last>In a healthy trend, price should respect this structure. When it stops, the trend is changing.</P>
      </Card>
      <Card title="The Non-Negotiable Rules" accent="#ffd93d">
        <P>• <B>Wave 2 can never fall below the start of Wave 1.</B> If it does, the impulse pattern is invalidated.</P>
        <P>• <B>Wave 3 is typically the largest and longest</B> impulse wave. This is where you want to make your money.</P>
        <P>• <B>Wave 3 can be shorter than Wave 1 or Wave 5, but cannot be shorter than both.</B></P>
        <P>• <B>Wave 4 cannot retrace below Wave 1&apos;s peak</B> without invalidating the pattern.</P>
        <P>• <B>Waves 2 and 4 retrace in inverse</B> - if Wave 2 is deep (.5+ fib), Wave 4 is shallow (.382), and vice versa.</P>
        <P last>• <B>Wave 5 is vertical and aggressive.</B> Euphoria enters. Can extend from 2.618 to 3.618 Fib or higher.</P>
      </Card>
      <Card title="Fibonacci Levels to Memorize" accent="#ff6b6b">
        <P><B>Wave 2 retracement:</B> 0.382, 0.5, 0.618 Fib levels.</P>
        <P><B>Wave 3 target:</B> 1.618 Fib extension from Wave 0 to Wave 1 (the Golden Level).</P>
        <P><B>Wave 4 retracement:</B> 0.382 (mild) to 0.618 (deep).</P>
        <P last><B>Wave 5 target:</B> 2.618+ Fib extension. Blowoff top territory.</P>
      </Card>
      <Card title="How to Use It Practically">
        <P>• <B>Best risk-adjusted entry:</B> After Wave 1 impulse has confirmed a Wave 2 correction bottom.</P>
        <P>• <B>Identify Wave 1:</B> Increasing volume + market structure shift. You often start Wave 1 near the low.</P>
        <P>• <B>Confirmation Wave 2 has ended:</B> Price holds a fib/support/MA level, higher high forms on a lower timeframe, volume returns.</P>
        <P>• <B>Price targets:</B> Use Trend-Based Fib Extensions on higher timeframes. Conservative, 1.618 (golden), 2.618 (stretched).</P>
        <P last>• <B>ZTFO principle:</B> Zoom The F*** Out. Monthly charts, not daily. The longer the timeframe, the cleaner the pattern.</P>
      </Card>
    </>
  );
}

function CaseStudies() {
  return (
    <>
      <SectionTitle>Historical Case Studies</SectionTitle>
      <Sub>Pattern recognition from major market episodes. History rhymes even when it doesn&apos;t repeat.</Sub>
      <Card title="1970s Stagflation" accent="#ff6b6b">
        <P><B>What happened:</B> Oil embargo + loose monetary policy → a decade of high inflation + weak growth.</P>
        <P><B>Winners:</B> Commodities, Gold. <B>Losers:</B> Stocks (negative real returns), Bonds.</P>
        <P last><B>Lesson:</B> Inflation is the ultimate destroyer of wealth. Supply shocks create the worst macro environment.</P>
      </Card>
      <Card title="2000 Dot-Com Bubble" accent="#ffd93d">
        <P><B>What happened:</B> &quot;New Economy&quot; narrative + speculative excess → NASDAQ fell 80%.</P>
        <P><B>Winners:</B> Value stocks, Bonds, USD. <B>Losers:</B> Growth/tech stocks.</P>
        <P last><B>Lesson:</B> Valuation matters eventually. &quot;This time is different&quot; is always wrong.</P>
      </Card>
      <Card title="2008 Global Financial Crisis" accent="#4ecdc4">
        <P><B>What happened:</B> Housing bubble + leverage + subprime → S&amp;P fell 57%. Lehman collapse.</P>
        <P><B>Winners:</B> Treasury bonds, USD. <B>Losers:</B> Everything risky.</P>
        <P last><B>Lesson:</B> Credit is the key - watch spreads. In a crisis, all correlations go to 1.</P>
      </Card>
      <Card title="2010-2012 Eurozone Crisis">
        <P><B>What happened:</B> PIIGS debt crisis. Doom loop between banks and sovereigns.</P>
        <P><B>Ended by:</B> Draghi&apos;s &quot;whatever it takes&quot; - credible verbal intervention.</P>
        <P last><B>Lesson:</B> Politics dominate markets more than people want to admit. Credible verbal intervention works.</P>
      </Card>
      <Card title="Deemer&apos;s 11 Timeless Rules" accent="#4ecdc4">
        <P>• Markets return to the mean over time.</P>
        <P>• Excesses in one direction lead to opposite excesses.</P>
        <P>• There are no new eras. Excesses are never permanent.</P>
        <P>• Rapidly rising or falling markets usually go further than you think - but they don&apos;t correct by going sideways.</P>
        <P>• The public buys the most at tops and the least at bottoms.</P>
        <P>• Fear and greed are stronger than long-term resolve.</P>
        <P>• Markets are strongest when broad, weakest when narrow.</P>
        <P>• Bear markets have three stages: sharp down, reflexive rebound, drawn-out fundamental downtrend.</P>
        <P>• When experts agree, something else happens.</P>
        <P>• Bull markets are more fun than bear markets.</P>
        <P last>• Conditions change. Companies change. Regulations change. Human nature stays the same.</P>
      </Card>
    </>
  );
}

function Allocation() {
  return (
    <>
      <SectionTitle>3-Tier Portfolio Allocation</SectionTitle>
      <Sub>A concentrated portfolio beats a diversified one - but only if every position earned its weight through research.</Sub>
      <Card title="Tier 1 - 20%+ Allocation" accent="#4ecdc4">
        <P><B>Research:</B> 50+ hours targeted analysis.</P>
        <P><B>Requirements:</B> Full qualitative + quantitative framework. Written investment thesis.</P>
        <P><B>Conviction:</B> 7-10x growth potential over 5-10 years AND extremely low risk of not returning capital.</P>
        <P><B>Frequency:</B> Only 1-3 assets per decade earn this allocation.</P>
        <P><B>Edge:</B> Information asymmetry - you see what the market doesn&apos;t see yet.</P>
        <P last><B>Critical rule:</B> A Tier 1 is not about upside - it&apos;s about the most RESISTANCE TO DOWNSIDE baked into the price.</P>
      </Card>
      <Card title="Tier 2 - 10-15% Allocation" accent="#ffd93d">
        <P><B>Research:</B> 25-50 hours of targeted analysis.</P>
        <P><B>Requirements:</B> Full framework completed. Written thesis.</P>
        <P><B>Conviction:</B> 5x+ growth over 5-10 years the market hasn&apos;t recognized.</P>
        <P last><B>Moat:</B> Irrefutable. No real competition. Flywheel + network effects.</P>
      </Card>
      <Card title="Tier 3 - 1-8% Allocation" accent="#ff6b6b">
        <P><B>Research:</B> &lt;25 hours.</P>
        <P><B>Profile:</B> Cyclical, slower growth, swing trades, speculative plays.</P>
        <P><B>Purpose:</B> Smaller bets while learning, or highly asymmetric speculative exposure.</P>
        <P last><B>Warning:</B> Don&apos;t fill your portfolio with Tier 3 positions. Fake diversification - no concentration, no strategy.</P>
      </Card>
      <Card title="Bear vs. Bull Market Rules">
        <P><B>Bear market posture:</B></P>
        <P>• Consolidate to large-cap + highly profitable FCF generators.</P>
        <P>• Condense holdings to core 5-8.</P>
        <P>• Exit unprofitable companies - they get demolished.</P>
        <P>• Avoid leverage and options (unless experienced at shorting).</P>
        <P>• Cash: 30-50%.</P>
        <p className="mt-3"><B>Bull market posture (early stages):</B></p>
        <P>• Expand breadth into small and mid caps.</P>
        <P>• 8-15 core holdings.</P>
        <P>• Consider companies close to FCF profitability.</P>
        <P>• Add leverage (options, LEAPS, leveraged ETFs).</P>
        <P last>• Cash: 15-30%. As bull matures, trim profits and raise cash.</P>
      </Card>
    </>
  );
}

function PositionSizing() {
  return (
    <>
      <SectionTitle>Position Sizing & Laddering</SectionTitle>
      <Sub>The math nobody wants to hear: position size matters more than stock picking.</Sub>
      <Card title="Position Sizing Math" accent="#4ecdc4">
        <Table
          headers={["Position Size", "Gain on Position", "Portfolio Growth"]}
          rows={[
            ["20% position", "100% gain", "20%"],
            ["10% position", "100% gain", "10%"],
            ["1% position", "100% gain", "1%"],
            ["1% position", "400% gain", "4%"],
            ["20% position", "20% gain", "4%"],
          ]}
        />
        <P>A smaller gain on a much larger position is how generational wealth is built.</P>
        <P>20% gain on a 20% position = 400% gain on a 1% position.</P>
        <P last>Most investors obsess over picking the biggest winner. The winners matter less than how much of your portfolio is in them.</P>
      </Card>
      <Card title="Avoiding Over-Diversification" accent="#ff6b6b">
        <P>• A portfolio of 20 stocks at 5% each = no concentration, no strategy.</P>
        <P>• That structure assumes all picks are equal in risk/reward. They&apos;re not.</P>
        <P>• Your biggest winners should have the highest allocation.</P>
        <P>• Some diversification hedges being wrong - but it&apos;s a tax you pay, not an achievement.</P>
        <P last>• Concentration builds wealth. Diversification keeps wealth. Stage 1 investors need the first, not the second.</P>
      </Card>
      <Card title="The Laddering System" accent="#ffd93d">
        <P><B>Scale in (entries):</B> Rarely start with more than 50% of intended allocation. Often 20% or less.</P>
        <P><B>Scale up:</B> If the thesis is playing out, add to winners on pullbacks. Double down - don&apos;t rotate out of what&apos;s working.</P>
        <P><B>Scale out (exits):</B> Always ladder in 3-4 waves of 25-35% per sale - unless cutting a loser or the thesis has changed.</P>
        <P last>Laddering works because your best information about an investment arrives AFTER you&apos;ve bought it.</P>
      </Card>
    </>
  );
}

function SamplePortfolio() {
  return (
    <>
      <SectionTitle>Sample Portfolio</SectionTitle>
      <Sub>A real-world example of what a concentrated, tiered portfolio actually looks like.</Sub>
      <Card title="Setup" accent="#4ecdc4">
        <P>• <B>Total liquidity:</B> $250K</P>
        <P>• <B>Cash position:</B> 20% ($50K)</P>
        <P last>• <B>Capital to deploy:</B> $200K</P>
      </Card>
      <Card title="The Allocation">
        <Table
          headers={["Position", "Tier", "Type", "Allocation", "Amount"]}
          rows={[
            ["Cash in brokerage", "-", "Cash", "20%", "$50,000"],
            ["Stock 1", "Tier 1", "Shares", "20%", "$50,000"],
            ["Stock 1 LEAPS", "Tier 1", "LEAPS", "6%", "$15,000"],
            ["Stock 2", "Tier 2", "Shares", "12%", "$30,000"],
            ["Stock 2 LEAPS", "Tier 2", "LEAPS", "4%", "$10,000"],
            ["Stock 3", "Tier 2", "Shares", "10%", "$25,000"],
            ["Stock 3 LEAPS", "Tier 2", "LEAPS", "3%", "$7,500"],
            ["Stock 4", "Tier 2", "Shares only", "10%", "$25,000"],
            ["Stock 5", "Tier 3", "Shares", "8%", "$20,000"],
            ["Stock 6", "Tier 3", "Shares", "4%", "$10,000"],
            ["Stock 7", "Tier 3", "Shares", "2%", "$5,000"],
            ["Stock 8", "Tier 3 (spec)", "Shares", "1%", "$2,500"],
          ]}
        />
      </Card>
      <Card title="Key Observations" accent="#ffd93d">
        <P>• 8 different companies - NOT equally weighted. That&apos;s the point.</P>
        <P>• 3 positions hold both stock AND options (stacked conviction).</P>
        <P>• 4 positions: stock only. 1 position: options only (speculative).</P>
        <P>• Stock 1 gets 26% of deployable capital. That level of allocation requires massive certainty that this is a generational opportunity.</P>
        <P>• If your portfolio looks evenly distributed, you likely don&apos;t know what you&apos;re doing - or you don&apos;t have enough conviction to concentrate.</P>
        <P last>• Don&apos;t fill with Tier 3 positions. Find your 2-3 Tier 1 investments. Use the other tiers to balance around them.</P>
      </Card>
    </>
  );
}

function Mistakes() {
  const items = [
    { title: "Failing to Look Under the Hood", body: "Price action is lagging. Don&apos;t conflate price with whether it&apos;s a good investment. If you can&apos;t teach a 10-year-old how to find winners in any asset class, you don&apos;t understand investing. Bull markets make everyone feel like a genius - bears give you the real feedback." },
    { title: "The Diversification Myth", body: "First question: am I investing to not lose, or to be FREE? Concentration builds wealth. Diversification keeps it. They serve different stages of the journey." },
    { title: "Following the Herd", body: "The Alpha Cycle: alpha → outperformance → mainstream attention → edge is lost → repeat. By the time something is mainstream, the edge is gone." },
    { title: "Lack of Nuance in Wealth Stages", body: "Running a $50K portfolio like a $5M portfolio guarantees you never get to $5M. Every stage has different rules. See the Wealth Stages section." },
    { title: "Being Dogmatic About Your Investments", body: "When an investment becomes a religion, be careful. Cut losing positions when the thesis changes. Would you rather be right or wealthy?" },
    { title: "Investing Based on the Past", body: "Dividend stocks, oil/gas, commodities, value stocks, broad indexes - these are investing in the past. Historical P/E and S&P averages are lagging indicators. Outsized returns come from spotting what the market doesn&apos;t yet see. Study 5, 10, 20 years out. The market operates quarter to quarter." },
    { title: "Being Too Zoomed In (ZTFO)", body: "Look at decades, not months. The longer the timeframe, the better the returns. People who want to get rich overnight end up day trading and losing." },
    { title: "Inaccurately Defining Risk", body: "Risk is NOT volatility - that&apos;s short-term noise. Risk is proportional to how deeply you&apos;ve researched. More hours = lower actual risk. At first principles: will I lose my money or not?" },
    { title: "Not Laddering Positions", body: "Scale in (20-50% of intended allocation to start). Scale up into winners on pullbacks. Scale out in 3-4 waves of 25-35% - unless the thesis breaks." },
    { title: "Overlooking Seasonality", body: "History rhymes. Learn the months and quarters that tend to under- or over-perform. 4-year election cycles. Each company has peak-demand quarters. Each sector has seasonal tilts." },
    { title: "Overtrading in the Bull", body: "Quality over quantity. Don&apos;t buy every dip and chase every rally - it dilutes concentration. FOMO is real in bull markets. Wait for rotation back into your positions. After taking profits, sit on them. Don&apos;t immediately redeploy. That&apos;s greed." },
  ];
  return (
    <>
      <SectionTitle>11 Investing Mistakes to Avoid</SectionTitle>
      <Sub>In a bull market, discipline is the #1 requirement. In a bear market, it&apos;s courage. Most mistakes are just one of those two missing.</Sub>
      {items.map((item, i) => (
        <Card key={i} title={`${i + 1}. ${item.title}`} accent={i % 3 === 0 ? "#4ecdc4" : i % 3 === 1 ? "#ffd93d" : "#ff6b6b"}>
          <P last>
            <span dangerouslySetInnerHTML={{ __html: item.body }} />
          </P>
        </Card>
      ))}
      <Card title="The Asymmetric Risk Question" accent="#4ecdc4">
        <P className="italic">
          &quot;If I have a ~25% chance of losing 50%+ of my net worth in a once-every-20-year bear market, but a ~75% chance of adding an extra 0 to my net worth in the next few years - how can I position myself so I win in EITHER outcome?&quot;
        </P>
        <P last>Answer that question, and most of the 11 mistakes solve themselves.</P>
      </Card>
    </>
  );
}

function Wheel() {
  return (
    <>
      <SectionTitle>The Wheel Strategy</SectionTitle>
      <Sub>The core income engine - a systematic cycle of selling puts, getting assigned, and selling calls.</Sub>
      <Card title="Why Sell Options?" accent="#4ecdc4">
        <P>• Multiple trades expiring every week = predictable income range.</P>
        <P>• Target win rate: 85-90% per month.</P>
        <P>• Time commitment: 3-5 hours/week for analysis, setup, and management.</P>
        <P>• You&apos;re not trying to predict where the stock WILL go - you&apos;re predicting where it WON&apos;T go.</P>
        <P last>• Time decay works in your favor as a seller. Option buyers lose value daily - you collect it.</P>
      </Card>
      <Card title="Phase 1: Sell Cash-Secured Puts" accent="#4ecdc4">
        <P><B>Goal:</B> Collect premium while waiting to buy stock at a discount.</P>
        <P><B>Delta:</B> 20-25 delta for safe account, up to 30 delta for aggressive.</P>
        <P><B>DTE:</B> 25-45 days to expiration. Target minimum 1.5% return at 30δ/30DTE.</P>
        <P><B>Entry timing:</B> Sell on red days, ideally at lower Bollinger Band.</P>
        <P last><B>Management:</B> Close at 80% profit, or manage Monday of expiration week.</P>
      </Card>
      <Card title="Phase 2: Get Assigned (This Is The Plan)" accent="#ffd93d">
        <P>Assignment is not a failure - it&apos;s the expected outcome of the wheel.</P>
        <P>Your cost basis = Strike Price − Premium Collected.</P>
        <P last>Immediately move to Phase 3 upon assignment.</P>
      </Card>
      <Card title="Phase 3: Sell Covered Calls" accent="#ff6b6b">
        <P><B>At/Above Cost Basis:</B> Sell 15-30 day covered calls at 20-30 delta based on conviction.</P>
        <P><B>Below Cost Basis:</B> Sell 8-12 delta covered calls, 7-9 days out. Grind cost basis down with weekly premium.</P>
        <P><B>If called away:</B> Cycle restarts - go back to Phase 1.</P>
        <P last><B>Rolling:</B> Roll up and out once max. If tested again, let shares get called away.</P>
      </Card>
      <Card title="Assignment Levels + VIX Framework">
        <Table
          headers={["VIX Level", "Assigned Shares", "Strategy Posture"]}
          rows={[
            ["Below 15 (Low)", "~20-35% in shares", "Majority in cash/CSPs. Cash = flexibility."],
            ["15-20 (Mid)", "~35-50% in shares", "Balanced wheel. Both CSPs and CCs work."],
            ["Above 20 (High)", "~50-65% in shares", "Assignment desirable. CCs pay well."],
          ]}
        />
        <p className="mt-2.5 italic text-xs">When VIX is low, want more cash than stock. When VIX is high, more comfortable owning shares.</p>
      </Card>
    </>
  );
}

function Vix() {
  return (
    <>
      <SectionTitle>VIX Cash Allocation Framework</SectionTitle>
      <Sub>The VIX dictates how much capital to deploy. Higher fear = more invested. Lower fear = more cash.</Sub>
      <Table
        headers={["VIX Level", "Sentiment", "Cash %", "Invested %", "Action"]}
        rows={[
          ["≤ 12", "Extreme Greed", "40-50%", "50-60%", "Maximum patience. Wait for better entries."],
          ["12-15", "Greed", "30-40%", "60-70%", "Cautious deployment. Premiums are thin."],
          ["15-20", "Slight Fear", "20-25%", "75-80%", "Normal operations. Standard wheel."],
          ["20-25", "Fear", "10-15%", "85-90%", "Deploy more aggressively. Good premiums."],
          ["25-30", "Very Fearful", "5-10%", "90-95%", "Heavy deployment. Sell further OTM for same returns."],
          ["≥ 30", "Extreme Fear", "0-5%", "95-100%", "All in. Add new cash to brokerage. Historically signals bottoms."],
        ]}
      />
      <Card title="Key VIX Principles" accent="#ff6b6b">
        <P>• VIX $18-$20 is a gray area - wait for break above $21 to deploy remaining capital</P>
        <P>• VIX above 30 historically signals market bottoms - deploy capital, don&apos;t panic</P>
        <P>• Low VIX = compressed premiums, so hold more cash for when volatility returns</P>
        <P>• High VIX = sell further OTM for the same or better premium returns</P>
        <P last>• Avoid bear call spreads when VIX is elevated - use CSPs instead</P>
      </Card>
      <Card title="VIX-Based Strategy Map">
        <Table
          headers={["VIX Zone", "Strategy Actions"]}
          rows={[
            ["Below ~20", "Open bear call spreads, buy long puts as hedges"],
            ["~20-25", "Close short puts, open bear call spreads"],
            ["~25-30", "Short puts, close bear call spreads"],
            ["Above ~35", "Short puts / buy stock aggressively"],
          ]}
        />
      </Card>
    </>
  );
}

function CoveredCalls() {
  return (
    <>
      <SectionTitle>Covered Calls</SectionTitle>
      <Sub>Selling calls against shares you own to generate income and reduce cost basis.</Sub>
      <Card title="Covered Call Dynamics - Delta by Conviction" accent="#4ecdc4">
        <Table
          headers={["Conviction", "Delta", "Duration", "Notes"]}
          rows={[
            ["Extremely Bullish", "No CC", "-", "Leave uncovered for full upside"],
            ["Bullish", "20-25 delta", "15-30 days", "Standard income play"],
            ["Neutral", "30 delta", "15-30 days", "More premium, less upside"],
            ["Bearish", "ATM call", "7-14 days", "Maximum premium extraction"],
            ["Extremely Bearish", "Sell stock", "-", "Exit the position entirely"],
          ]}
        />
      </Card>
      <Card title="Below-Cost Basis Covered Calls" accent="#ff6b6b">
        <P><B>Rule:</B> Never sell a covered call below your cost basis unless you are OK losing money.</P>
        <P><B>Delta:</B> 8-12 delta (very conservative to avoid assignment below cost)</P>
        <P><B>Duration:</B> 7-9 days out (Wednesday to Friday schedule)</P>
        <P><B>Premium target:</B> 0.3-0.5% per week</P>
        <P><B>Timing:</B> Sell on green days only. Wait until Wednesday.</P>
        <P last><B>Earnings:</B> NEVER sell below-cost CCs past earnings dates - assignment risk is too high.</P>
      </Card>
      <Card title="Covered Call Timing Rules">
        <P>• Sell CCs on Wednesday for Friday or following Friday expiration</P>
        <P>• Uncover positions before Fed meetings for potential upside capture</P>
        <P>• Use shorter durations (7-9 days) during high volatility for flexibility</P>
        <P>• Roll up and out maximum once - then let shares get called away</P>
        <P>• When delta reaches 45 on a sold CC, time to take action (roll or close)</P>
        <P last>• For LEAPS: only cover LEAPS during bear markets, not during bull runs</P>
      </Card>
    </>
  );
}

function CSPs() {
  return (
    <>
      <SectionTitle>Cash-Secured Puts</SectionTitle>
      <Sub>The entry point of the wheel - selling puts on stocks you want to own at a discount.</Sub>
      <Card title="CSP Entry Framework" accent="#4ecdc4">
        <P><B>Safe Account:</B> 20-25 delta, 25-45 DTE. Target 1.5%+ return.</P>
        <P><B>Aggressive Account:</B> 25-30 delta, 25-45 DTE. Target 2%+ return.</P>
        <P><B>Best entries:</B> Stock at lower Bollinger Band, VIX above 15, red day.</P>
        <P><B>Management:</B> Close at 80% profit. Roll Monday of expiration week if needed.</P>
        <P last><B>Layering:</B> Don&apos;t sell all contracts at one strike. Layer in to average down if assigned.</P>
      </Card>
      <Card title="Optimal Trade Parameters" accent="#ffd93d">
        <P><B>Implied Volatility Rank (IVR):</B> Look for 20+ - high IVR = better risk:reward as a seller.</P>
        <P><B>Pullbacks:</B> Enter during pullbacks - put prices rise when stocks fall. You want high premiums.</P>
        <P><B>Expiration window:</B> 30-60 days. Sweet spot for good prices + time for the trade to work.</P>
        <P><B>Strike selection:</B> Target 2:1-3:1 risk:reward. P50 (probability of 50% profit) around 75-80%.</P>
        <P last><B>Strike width (spreads):</B> Max profit = fill price. Max loss = (strike width − fill price) × 100.</P>
      </Card>
      <Card title="CSP vs LEAPS Decision">
        <Table
          headers={["Factor", "Cash-Secured Puts", "LEAPS"]}
          rows={[
            ["Best when", "High VIX, earnings-heavy", "Stock at lower BB, VIX >15"],
            ["Risk", "Assignment (which is planned)", "Full premium loss if wrong"],
            ["Capital", "Full collateral required", "Fraction of share cost"],
            ["Income", "Monthly premium collection", "Appreciation play"],
            ["Max portfolio", "No strict limit", "Never exceed 10%"],
          ]}
        />
      </Card>
      <Card title="When NOT to Sell CSPs" accent="#ff6b6b">
        <P>• Stock is near upper Bollinger Band (wait for pullback)</P>
        <P>• Earnings within the expiration window</P>
        <P>• VIX is extremely low (premiums are too thin)</P>
        <P>• You&apos;re already at 10%+ allocation in that stock</P>
        <P last>• The stock has a negative PE, declining earnings, or broken chart</P>
      </Card>
    </>
  );
}

function Spreads() {
  return (
    <>
      <SectionTitle>Bear Call Spreads</SectionTitle>
      <Sub>Monthly short-delta income on indices - a hedge and income addition to the wheel.</Sub>
      <Card title="Bear Call Spread Framework" accent="#ff6b6b">
        <P><B>Underlyings:</B> SPX (preferred - cash settled), QQQ, SPY. Never individual stocks.</P>
        <P><B>Delta:</B> 15 delta or lower for the short leg.</P>
        <P><B>Width:</B> 5-10 point spreads. 5-point can offer better risk/reward.</P>
        <P><B>DTE:</B> 3-5 weeks to expiration.</P>
        <P><B>Allocation:</B> Max 5-8% of portfolio. Scale in gradually.</P>
        <P><B>Profit target:</B> Close at 50% profit. Close at 25% if market drops sharply.</P>
        <P><B>Loss management:</B> Close at 50% loss (of max loss).</P>
        <P last><B>Timing:</B> Avoid when VIX is elevated. Best in low-mid VIX environments.</P>
      </Card>
      <Card title="Why Bear Call Spreads?" accent="#4ecdc4">
        <P>• Adds short delta to offset long-delta wheel portfolio</P>
        <P>• Probability of profit typically ~85-95%</P>
        <P>• Premium received upfront (credit spread)</P>
        <P>• SPX is cash-settled - no assignment risk</P>
        <P last>• Monthly implementation creates consistent income layer</P>
      </Card>
    </>
  );
}

function Leaps() {
  return (
    <>
      <SectionTitle>LEAPS Options</SectionTitle>
      <Sub>Long-dated call options for leveraged appreciation - used sparingly and only at ideal entries.</Sub>
      <Card title="LEAPS Entry Criteria (ALL must be met)" accent="#ffd93d">
        <P>✓ Stock is at or near the <B>lower Bollinger Band</B></P>
        <P>✓ VIX is <B>above 15</B></P>
        <P>✓ <B>400+ days</B> until expiration</P>
        <P>✓ Stock meets all approved stock criteria</P>
        <P>✓ Total LEAPS allocation <B>never exceeds 10%</B> of portfolio</P>
        <P last>✓ Not entering around earnings (gap risk too high)</P>
      </Card>
      <Card title="LEAPS Rules" accent="#4ecdc4">
        <P>• <B>Duration:</B> Buy 2-year contracts. Sell after 18 months.</P>
        <P>• <B>Entry timing:</B> Expansion phase (M2 up, rates down). September Quad Witching = ideal.</P>
        <P>• <B>Exit timing:</B> January/February after the Q4 runup.</P>
        <P last>• <B>The Greeks:</B> Delta (direction sensitivity), Gamma (delta acceleration), Theta (time decay - your enemy), Vega (volatility sensitivity).</P>
      </Card>
      <Card title="LEAPS Management" accent="#ff6b6b">
        <P>• Manage 60-90 days before expiration to salvage remaining premium</P>
        <P>• Out-of-the-money LEAPS cause significant P&L swings - expect this</P>
        <P>• Returns smooth out once LEAPS return in-the-money</P>
        <P>• Only sell covered calls against LEAPS during bear markets</P>
        <P>• Tax-loss harvest by October if deep underwater with no recovery path</P>
        <P last>• Avoid LEAPS on stocks with imminent earnings - use CSPs instead</P>
      </Card>
    </>
  );
}

function StockCriteria() {
  return (
    <>
      <SectionTitle>Stock Selection Criteria</SectionTitle>
      <Sub>The qualifying standards every stock must meet before entering the approved list.</Sub>
      <Card title="Mandatory Criteria" accent="#4ecdc4">
        <P>📈 <B>Clear upward trend</B> over the past 1.5 years</P>
        <P>💰 <B>P/E ratio under 100</B> or strong cash reserves (NO negative P/E)</P>
        <P>💸 <B>Attractive options premiums:</B> Minimum 1.5% return using 30 Delta / 30 DTE</P>
        <P>✅ <B>Positive earnings:</B> Past 2 earnings reports should be positive</P>
        <P>📊 <B>Liquid options</B> with tight bid-ask spreads and weekly availability preferred</P>
        <P last>🏢 <B>Positive free cash flow</B> and healthy market sentiment</P>
      </Card>
      <Card title="Disqualification Triggers" accent="#ff6b6b">
        <P>✗ Two consecutive earnings misses → removed from list</P>
        <P>✗ Negative P/E ratio (unprofitable)</P>
        <P>✗ Chart breaks down from long-term uptrend</P>
        <P>✗ Options become illiquid or spreads widen excessively</P>
        <P last>✗ Fundamental business model deterioration</P>
      </Card>
      <Card title="Metrics to Evaluate">
        <P>• <B>Market Capitalization:</B> Total outstanding shares × current price. Know the company size.</P>
        <P>• <B>P/E Ratio:</B> Price relative to earnings. Lower = better value.</P>
        <P>• <B>Free Cash Flow:</B> Cash generated after expenses. Must be positive.</P>
        <P last>• <B>Market Sentiment:</B> Institutional flow, analyst ratings, options activity.</P>
      </Card>
    </>
  );
}

function SafeHaven() {
  const stocks = [
    { ticker: "BRK.B", name: "Berkshire Hathaway", pe: 12, div: "-", note: "Conglomerate of great companies. Insurance, Coca Cola, BofA, Occidental." },
    { ticker: "MCD", name: "McDonald's", pe: 26, div: "2.31%", note: "Affordable food. Owns land & buildings. Triple income: dividend + CC + appreciation." },
    { ticker: "LMT", name: "Lockheed Martin", pe: 20, div: "2.83%", note: "Government contracts. F-35, F-16, missiles, radar, helicopters. Rallied during crash." },
    { ticker: "XOM", name: "Exxon Mobil", pe: 14, div: "3.42%", note: "Energy sector. Solid fundamentals. Diversification into energy." },
    { ticker: "PGR", name: "Progressive", pe: 19, div: "0.15%", note: "Multi-line insurance. Prints cash. Made new ATH during crash." },
    { ticker: "ALL", name: "Allstate", pe: 12, div: "1.9%", note: "Multi-line insurance. Less liquid options but monthly expiries available." },
    { ticker: "PG", name: "Procter & Gamble", pe: 26, div: "2.4%", note: "Household items (Tide, Dawn, Pampers, Oral-B). New ATH during crash." },
    { ticker: "T", name: "AT&T", pe: 17, div: "4.14%", note: "Boring, easy to understand. Everyone uses cellphones in any economy." },
  ];
  return (
    <>
      <SectionTitle>Safe Haven Stocks</SectionTitle>
      <Sub>Defensive stocks with &lt;5% drawdowns during crashes. For capital preservation, not growth.</Sub>
      <Card title="Safe Haven Criteria" accent="#4ecdc4">
        <P>1. Good upward trending chart, long term</P>
        <P>2. Low PE ratio &lt; 26</P>
        <P>3. Liquid options with enough premium</P>
        <P>4. Expect 7-15% returns (appreciation + dividends + covered calls)</P>
        <P last>5. Max 10% of portfolio per position</P>
      </Card>
      <Card title="Entry Method" accent="#ffd93d">
        <P>1. Enter on a down day: sell aggressive 40+ delta put, 15-30 days out, OR buy 100 shares</P>
        <P>2. Once assigned, immediately sell 25 delta covered call</P>
        <P last>3. CASH remains the best capital preservation tool during crashes</P>
      </Card>
      {stocks.map((s) => (
        <div
          key={s.ticker}
          className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl px-5 py-4 mb-2.5 flex gap-4 items-center flex-wrap"
        >
          <div className="min-w-[70px] font-bold text-lg text-[var(--accent)] font-mono">{s.ticker}</div>
          <div className="flex-1 min-w-[200px]">
            <div className="font-semibold text-[var(--text-primary)] mb-1">{s.name}</div>
            <div className="text-xs text-[var(--text-secondary)]">{s.note}</div>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-[11px] text-[var(--text-muted)]">P/E</div>
              <div className="font-semibold text-[var(--text-primary)]">{s.pe}</div>
            </div>
            <div className="text-center">
              <div className="text-[11px] text-[var(--text-muted)]">DIV</div>
              <div className="font-semibold text-[var(--text-primary)]">{s.div}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

function Principles() {
  const rules = [
    "Only sell put options on stocks you truly believe in and don't mind owning. The stock must have a good upward trending chart, good fundamentals (positive earnings, low PE ratio relative to industry), and rich options that are liquid.",
    "Your portfolio should never exceed 10% on LEAPS options as our goal is to multiply capital efficiently with monthly income from options selling.",
    "Never chase premium for the sake of making income. The setup must look good and you must refer to Rule #1.",
    "No selling options on Leveraged ETFs or Leveraged Stocks (NVDL, TQQQ, MSTX, etc.). If you get assigned, theta decay will work against you.",
    "Always manage positions early if you don't want to get assigned or you are trading vertical spreads. Monday of expiration week, or earlier.",
    "VIX $18–$20 is a gray area. Wait for a break above $21 to deploy remaining capital.",
    "Margin is never recommended. Cash secured keeps you safe in a major volatility spike. (Learned from a $100k loss on margin during 2020 Covid Crash).",
    "Never allocate more than 10-12% of portfolio to any one individual stock. Less than 10% for high risk/high premium plays. Layer in strike prices to avoid getting assigned on the whole allocation at one strike.",
  ];
  return (
    <>
      <SectionTitle>Wheel Strategy Rules</SectionTitle>
      <Sub>Core rules - the non-negotiables for running the Wheel Strategy.</Sub>
      {rules.map((r, i) => (
        <RuleCard key={i} number={i + 1} text={r} highlight={i === 0 || i === 6 || i === 7} />
      ))}
      <Card title="Additional Principles from Coaching Calls" accent="#ffd93d">
        <P>• Sell covered calls on Wednesday for Friday (or following Friday) expiration for optimal time premium</P>
        <P>• Don&apos;t sell covered calls on red days - wait for green days for better premiums</P>
        <P>• Uncover positions before Fed meetings to capture potential upside moves</P>
        <P>• Avoid selling covered calls through earnings - assignment risk is too high</P>
        <P>• Roll puts down/out only once - after that, take assignment and switch to covered calls</P>
        <P>• Treat each lot at different cost bases separately</P>
        <P>• Tax-loss harvest deep underwater LEAPS by October if not near breakeven</P>
        <P last>• Use SPX over SPY for bear call spreads - cash-settled, no assignment risk</P>
      </Card>
    </>
  );
}

function Risk() {
  return (
    <>
      <SectionTitle>Risk Management</SectionTitle>
      <Sub>Position sizing, allocation limits, and defensive frameworks.</Sub>
      <Card title="Position Sizing Rules" accent="#ff6b6b">
        <Table
          headers={["Rule", "Limit"]}
          rows={[
            ["Max allocation per stock", "10-12% of portfolio"],
            ["High risk/high premium stocks", "Less than 10%"],
            ["LEAPS total allocation", "Never exceed 10%"],
            ["Bear call spreads", "5-8% of portfolio"],
            ["Safe haven defensive stocks", "Max 10% each"],
            ["Cash minimum (low VIX)", "30-50%"],
            ["Gold/precious metals exposure", "No more than 10%"],
          ]}
        />
      </Card>
      <Card title="When To Increase Cash" accent="#ffd93d">
        <P>• VIX drops below 15 - premiums compress, hold more cash</P>
        <P>• Let covered calls get called away naturally (don&apos;t fight it)</P>
        <P>• Sell portions of profitable premium positions to maintain liquidity</P>
        <P>• Before earnings season - reduce exposure to avoid gap risk</P>
        <P last>• When geopolitical uncertainty is elevated</P>
      </Card>
      <Card title="Loss Management">
        <P>• Close bear call spreads at 50% loss of max loss</P>
        <P>• Manage LEAPS 60-90 days before expiration</P>
        <P>• Roll puts down/out maximum once - then take assignment</P>
        <P>• Never use margin - cash secured keeps you safe</P>
        <P last>• Tax-loss harvest underwater positions by October</P>
      </Card>
    </>
  );
}

function WeeklyRoutine() {
  return (
    <>
      <SectionTitle>Weekly Macro Routine</SectionTitle>
      <Sub>A 5-step weekend process for staying ahead of markets.</Sub>
      <Card title="Step 1: Data Sweep (The 'What')" accent="#4ecdc4">
        <P last>Update your dashboard with the week&apos;s data. Note surprises vs. consensus. Record policy announcements.</P>
      </Card>
      <Card title="Step 2: Narrative Review (The 'Why')" accent="#ffd93d">
        <P last>Read weekly summaries. Identify the market&apos;s focus. Compare narrative to actual data - disconnects are opportunities.</P>
      </Card>
      <Card title="Step 3: Cross-Asset Check (The 'How')" accent="#ff6b6b">
        <P last>Review S&amp;P, 10Y yield, yield curve, USD, Gold, Oil. Are they telling a consistent story?</P>
      </Card>
      <Card title="Step 4: Formulate Your View (The 'So What')">
        <P last>Where are we in the cycle? What&apos;s the likely path for growth, inflation, policy over 1-3 months? Write it down in 2-3 sentences.</P>
      </Card>
      <Card title="Step 5: Trade Ideas & Risk (The 'Now What')" accent="#4ecdc4">
        <P last>Which assets align with your view? Find specific entries using technicals. Generate 1-3 high-conviction ideas with entry, stop, and target.</P>
      </Card>
    </>
  );
}

function Checklist() {
  return (
    <>
      <SectionTitle>Pre-Trade Checklist</SectionTitle>
      <Sub>Run through this before every trade. If you can&apos;t answer clearly, don&apos;t trade.</Sub>
      <Card title="The Thesis" accent="#4ecdc4">
        <P>□ What is my current macro view?</P>
        <P>□ How does this trade express that view?</P>
        <P last>□ Conviction level (1-5)?</P>
      </Card>
      <Card title="The Setup" accent="#ffd93d">
        <P>□ Is this the best asset to express my view?</P>
        <P>□ What is the specific technical setup?</P>
        <P>□ Does the stock meet all approved criteria?</P>
        <P last>□ Are other asset classes confirming my thesis?</P>
      </Card>
      <Card title="Risk Management" accent="#ff6b6b">
        <P>□ What is my precise entry price?</P>
        <P>□ Where is my stop-loss and why?</P>
        <P>□ What is my target and risk/reward ratio? (Must be &gt; 1:1)</P>
        <P>□ How much am I risking (% of portfolio)?</P>
        <P last>□ Am I within allocation limits?</P>
      </Card>
      <Card title="Self-Audit">
        <P>□ Am I chasing (FOMO) or following my process?</P>
        <P>□ Have I considered what would prove me wrong?</P>
        <P>□ Am I trading on the right day for this strategy?</P>
        <P last>□ Is there an earnings event within my expiration window?</P>
      </Card>
    </>
  );
}

// ─── Section Map ───

const SECTION_MAP: Record<string, () => React.ReactNode> = {
  dashboard: Dashboard,
  foundations: Foundations,
  "smart-risk": SmartRisk,
  "wealth-stages": WealthStages,
  "money-beliefs": MoneyBeliefs,
  "analysis-framework": AnalysisFramework,
  macro: Macro,
  indicators: Indicators,
  regimes: Regimes,
  "technical-analysis": TechnicalAnalysis,
  "elliott-waves": ElliottWaves,
  "case-studies": CaseStudies,
  allocation: Allocation,
  "position-sizing": PositionSizing,
  "sample-portfolio": SamplePortfolio,
  mistakes: Mistakes,
  wheel: Wheel,
  vix: Vix,
  csps: CSPs,
  "covered-calls": CoveredCalls,
  spreads: Spreads,
  leaps: Leaps,
  "stock-criteria": StockCriteria,
  "safe-haven": SafeHaven,
  principles: Principles,
  risk: Risk,
  "weekly-routine": WeeklyRoutine,
  checklist: Checklist,
};

export default function MarketsPage() {
  const preview = (
    <SectionLayout
      title="Markets"
      subtitle="Investing, Trading & Macro"
      accent="var(--accent-trading)"
      sections={SECTIONS}
      locked={true}
    >
      {() => <Dashboard />}
    </SectionLayout>
  );

  const full = (
    <SectionLayout
      title="Markets"
      subtitle="Investing, Trading & Macro"
      accent="var(--accent-trading)"
      sections={SECTIONS}
      pillar="trading"
    >
      {(active) => {
        const Component = SECTION_MAP[active] ?? Dashboard;
        return <Component />;
      }}
    </SectionLayout>
  );

  return (
    <Paywall
      previewContent={preview}
      accent="var(--accent-trading)"
    >
      {full}
    </Paywall>
  );
}
