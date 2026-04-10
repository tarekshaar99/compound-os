"use client";

import SectionLayout, { SectionItem } from "../components/SectionLayout";
import { Card, StatBox, Table, RuleCard } from "../components/Card";

const SECTIONS: SectionItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "◈" },
  { id: "principles", label: "Trading Principles", icon: "⚖" },
  { id: "wheel", label: "The Wheel Strategy", icon: "⟳" },
  { id: "vix", label: "VIX Framework", icon: "📊" },
  { id: "covered-calls", label: "Covered Calls", icon: "📞" },
  { id: "csps", label: "Cash-Secured Puts", icon: "📉" },
  { id: "spreads", label: "Bear Call Spreads", icon: "🐻" },
  { id: "leaps", label: "LEAPS", icon: "🚀" },
  { id: "stock-criteria", label: "Stock Criteria", icon: "✅" },
  { id: "safe-haven", label: "Safe Haven Stocks", icon: "🛡" },
  { id: "risk", label: "Risk Management", icon: "⚠" },
  { id: "macro", label: "Macro Framework", icon: "🌍" },
  { id: "indicators", label: "Key Indicators", icon: "📈" },
  { id: "regimes", label: "Macro Regimes", icon: "🔄" },
  { id: "case-studies", label: "Case Studies", icon: "📚" },
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

function P({ children, last }: { children: React.ReactNode; last?: boolean }) {
  return <p className={last ? "m-0" : "mb-2"}>{children}</p>;
}

// ─── Section Content ───

function Dashboard() {
  return (
    <>
      <SectionTitle>Trading Knowledge Dashboard</SectionTitle>
      <Sub>Your complete OTU options trading &amp; macro investing reference.</Sub>
      <div className="flex flex-wrap gap-3.5 mb-7">
        <StatBox label="Core Strategy" value="The Wheel" sub="CSPs → Assignment → Covered Calls" />
        <StatBox label="Max Allocation" value="10-12%" sub="Per individual stock" />
        <StatBox label="Target Delta (CSP)" value="20-25δ" sub="Safe account baseline" />
        <StatBox label="CC Duration" value="25-45d" sub="Optimal income & flexibility" />
      </div>
      <Card title="Quick Reference — The OTU Framework" accent="#4ecdc4">
        <P><B>1. Sell Cash-Secured Puts</B> on stocks you believe in at 20-25 delta, 25-45 DTE</P>
        <P><B>2. Get Assigned</B> — this is the plan, not a failure. Immediately sell covered calls.</P>
        <P><B>3. Sell Covered Calls</B> at cost basis or above. Use delta based on conviction.</P>
        <P><B>4. Manage by VIX</B> — adjust cash allocation, delta, and strategy per VIX regime.</P>
        <P last><B>5. Add Bear Call Spreads</B> monthly on indices for short-delta income (5-8% of portfolio).</P>
      </Card>
      <Card title="Key Behavioral Rules" accent="#ff6b6b">
        <P>• Don&apos;t react to news — capitalize on the fear it creates</P>
        <P>• Paper losses are temporary if fundamentals are intact</P>
        <P>• Stay mechanical — don&apos;t let individual losses change overall strategy</P>
        <P>• Expected moves are typically mispriced on the put side — this is your edge</P>
        <P last>• Patience is the most profitable skill in volatile markets</P>
      </Card>
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
      <SectionTitle>Trading Principles</SectionTitle>
      <Sub>Core rules — the non-negotiables for the OTU strategy.</Sub>
      {rules.map((r, i) => (
        <RuleCard key={i} number={i + 1} text={r} highlight={i === 0 || i === 6 || i === 7} />
      ))}
      <Card title="Additional Principles from Coaching Calls" accent="#ffd93d">
        <P>• Sell covered calls on Wednesday for Friday (or following Friday) expiration for optimal time premium</P>
        <P>• Don&apos;t sell covered calls on red days — wait for green days for better premiums</P>
        <P>• Uncover positions before Fed meetings to capture potential upside moves</P>
        <P>• Avoid selling covered calls through earnings — assignment risk is too high</P>
        <P>• Roll puts down/out only once — after that, take assignment and switch to covered calls</P>
        <P>• Treat each lot at different cost bases separately</P>
        <P>• Tax-loss harvest deep underwater LEAPS by October if not near breakeven</P>
        <P last>• Use SPX over SPY for bear call spreads — cash-settled, no assignment risk</P>
      </Card>
    </>
  );
}

function Wheel() {
  return (
    <>
      <SectionTitle>The Wheel Strategy</SectionTitle>
      <Sub>The core income engine — a systematic cycle of selling puts, getting assigned, and selling calls.</Sub>
      <Card title="Phase 1: Sell Cash-Secured Puts" accent="#4ecdc4">
        <P><B>Goal:</B> Collect premium while waiting to buy stock at a discount.</P>
        <P><B>Delta:</B> 20-25 delta for safe account, up to 30 delta for aggressive.</P>
        <P><B>DTE:</B> 25-45 days to expiration. Target minimum 1.5% return at 30δ/30DTE.</P>
        <P><B>Entry timing:</B> Sell on red days, ideally at lower Bollinger Band.</P>
        <P last><B>Management:</B> Close at 80% profit, or manage Monday of expiration week.</P>
      </Card>
      <Card title="Phase 2: Get Assigned (This Is The Plan)" accent="#ffd93d">
        <P>Assignment is not a failure — it&apos;s the expected outcome of the wheel.</P>
        <P>Your cost basis = Strike Price – Premium Collected.</P>
        <P last>Immediately move to Phase 3 upon assignment.</P>
      </Card>
      <Card title="Phase 3: Sell Covered Calls" accent="#ff6b6b">
        <P><B>At/Above Cost Basis:</B> Sell 15-30 day covered calls at 20-30 delta based on conviction.</P>
        <P><B>Below Cost Basis:</B> Sell 8-12 delta covered calls, 7-9 days out. Grind cost basis down with weekly premium.</P>
        <P><B>If called away:</B> Cycle restarts — go back to Phase 1.</P>
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
        <P>• VIX $18-$20 is a gray area — wait for break above $21 to deploy remaining capital</P>
        <P>• VIX above 30 historically signals market bottoms — deploy capital, don&apos;t panic</P>
        <P>• Low VIX = compressed premiums, so hold more cash for when volatility returns</P>
        <P>• High VIX = sell further OTM for the same or better premium returns</P>
        <P last>• Avoid bear call spreads when VIX is elevated — use CSPs instead</P>
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
      <Card title="Covered Call Dynamics — Delta by Conviction" accent="#4ecdc4">
        <Table
          headers={["Conviction", "Delta", "Duration", "Notes"]}
          rows={[
            ["Extremely Bullish", "No CC", "—", "Leave uncovered for full upside"],
            ["Bullish", "20-25 delta", "15-30 days", "Standard income play"],
            ["Neutral", "30 delta", "15-30 days", "More premium, less upside"],
            ["Bearish", "ATM call", "7-14 days", "Maximum premium extraction"],
            ["Extremely Bearish", "Sell stock", "—", "Exit the position entirely"],
          ]}
        />
      </Card>
      <Card title="Below-Cost Basis Covered Calls" accent="#ff6b6b">
        <P><B>Rule:</B> Never sell a covered call below your cost basis unless you are OK losing money.</P>
        <P><B>Delta:</B> 8-12 delta (very conservative to avoid assignment below cost)</P>
        <P><B>Duration:</B> 7-9 days out (Wednesday to Friday schedule)</P>
        <P><B>Premium target:</B> 0.3-0.5% per week</P>
        <P><B>Timing:</B> Sell on green days only. Wait until Wednesday.</P>
        <P last><B>Earnings:</B> NEVER sell below-cost CCs past earnings dates — assignment risk is too high.</P>
      </Card>
      <Card title="Covered Call Timing Rules">
        <P>• Sell CCs on Wednesday for Friday or following Friday expiration</P>
        <P>• Uncover positions before Fed meetings for potential upside capture</P>
        <P>• Use shorter durations (7-9 days) during high volatility for flexibility</P>
        <P>• Roll up and out maximum once — then let shares get called away</P>
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
      <Sub>The entry point of the wheel — selling puts on stocks you want to own at a discount.</Sub>
      <Card title="CSP Entry Framework" accent="#4ecdc4">
        <P><B>Safe Account:</B> 20-25 delta, 25-45 DTE. Target 1.5%+ return.</P>
        <P><B>Aggressive Account:</B> 25-30 delta, 25-45 DTE. Target 2%+ return.</P>
        <P><B>Best entries:</B> Stock at lower Bollinger Band, VIX above 15, red day.</P>
        <P><B>Management:</B> Close at 80% profit. Roll Monday of expiration week if needed.</P>
        <P last><B>Layering:</B> Don&apos;t sell all contracts at one strike. Layer in to average down if assigned.</P>
      </Card>
      <Card title="CSP vs LEAPS Decision" accent="#ffd93d">
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
      <Card title="When NOT to Sell CSPs">
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
      <Sub>Monthly short-delta income on indices — a hedge and income addition to the wheel.</Sub>
      <Card title="Bear Call Spread Framework" accent="#ff6b6b">
        <P><B>Underlyings:</B> SPX (preferred — cash settled), QQQ, SPY. Never individual stocks.</P>
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
        <P>• SPX is cash-settled — no assignment risk</P>
        <P last>• Monthly implementation creates consistent income layer</P>
      </Card>
    </>
  );
}

function Leaps() {
  return (
    <>
      <SectionTitle>LEAPS Options</SectionTitle>
      <Sub>Long-dated call options for leveraged appreciation — used sparingly and only at ideal entries.</Sub>
      <Card title="LEAPS Entry Criteria (ALL must be met)" accent="#ffd93d">
        <P>✓ Stock is at or near the <B>lower Bollinger Band</B></P>
        <P>✓ VIX is <B>above 15</B></P>
        <P>✓ <B>400+ days</B> until expiration</P>
        <P>✓ Stock meets all approved stock criteria</P>
        <P>✓ Total LEAPS allocation <B>never exceeds 10%</B> of portfolio</P>
        <P last>✓ Not entering around earnings (gap risk too high)</P>
      </Card>
      <Card title="LEAPS Management" accent="#ff6b6b">
        <P>• Manage 60-90 days before expiration to salvage remaining premium</P>
        <P>• Out-of-the-money LEAPS cause significant P&L swings — expect this</P>
        <P>• Returns smooth out once LEAPS return in-the-money</P>
        <P>• Only sell covered calls against LEAPS during bear markets</P>
        <P>• Tax-loss harvest by October if deep underwater with no recovery path</P>
        <P last>• Avoid LEAPS on stocks with imminent earnings — use CSPs instead</P>
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
    { ticker: "BRK.B", name: "Berkshire Hathaway", pe: 12, div: "—", note: "Conglomerate of great companies. Insurance, Coca Cola, BofA, Occidental." },
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
        <P>• VIX drops below 15 — premiums compress, hold more cash</P>
        <P>• Let covered calls get called away naturally (don&apos;t fight it)</P>
        <P>• Sell portions of profitable premium positions to maintain liquidity</P>
        <P>• Before earnings season — reduce exposure to avoid gap risk</P>
        <P last>• When geopolitical uncertainty is elevated</P>
      </Card>
      <Card title="Loss Management">
        <P>• Close bear call spreads at 50% loss of max loss</P>
        <P>• Manage LEAPS 60-90 days before expiration</P>
        <P>• Roll puts down/out maximum once — then take assignment</P>
        <P>• Never use margin — cash secured keeps you safe</P>
        <P last>• Tax-loss harvest underwater positions by October</P>
      </Card>
    </>
  );
}

function Macro() {
  return (
    <>
      <SectionTitle>Macro Framework</SectionTitle>
      <Sub>The three pillars and how they drive markets.</Sub>
      <Card title="The Three Pillars of Macro" accent="#4ecdc4">
        <P><B>1. Growth</B> — How fast is the economy growing? Accelerating or decelerating? Drives corporate earnings and stock prices.</P>
        <P><B>2. Inflation</B> — At what rate are prices rising? Impacts interest rates, bond yields, and all asset valuations.</P>
        <P last><B>3. Policy</B> — How are central banks responding? Tightening to fight inflation or easing to support growth?</P>
      </Card>
      <Card title="Business Cycle Phases" accent="#ffd93d">
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
        <P><B>Credit</B> is more important than money — most &quot;money&quot; is created by bank lending.</P>
        <P last><B>Don&apos;t Fight the Fed</B> — anticipating the central bank pivot is a core macro skill.</P>
      </Card>
    </>
  );
}

function Indicators() {
  return (
    <>
      <SectionTitle>Key Economic Indicators</SectionTitle>
      <Sub>The &quot;Macro Alphabet&quot; — data that tells you where we are in the cycle.</Sub>
      <Table
        headers={["Indicator", "Frequency", "What It Measures", "Why It Matters"]}
        rows={[
          ["ISM PMI", "Monthly", "Manufacturing/services health", "Leading indicator. >50 = expansion."],
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
      <Card title="Key Indicators from Coaching Calls" accent="#ffd93d">
        <P>• <B>CME FedWatch Tool</B> — primary signal for positioning. Rate cut odds directly affect strategy.</P>
        <P>• <B>VIX</B> — dictates cash allocation and delta selection.</P>
        <P>• <B>Bollinger Bands</B> — primary technical tool for entry timing.</P>
        <P>• <B>Put-to-call ratio</B> — contrarian indicator. Extremes signal reversals.</P>
        <P>• <B>S5FI Index</B> — stocks above 50-day MA. Fewer = buying opportunities in oversold names.</P>
        <P last>• <B>Unusual Whales</B> — institutional options flow for trade idea generation.</P>
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
        <P last><B>Inflationary regimes:</B> Stock-bond correlation turns positive (both fall together — 2022 lesson).</P>
      </Card>
    </>
  );
}

function CaseStudies() {
  return (
    <>
      <SectionTitle>Historical Case Studies</SectionTitle>
      <Sub>Pattern recognition from major market episodes — history rhymes.</Sub>
      <Card title="1970s Stagflation" accent="#ff6b6b">
        <P><B>What happened:</B> Oil embargo + loose monetary policy → decade of high inflation + weak growth.</P>
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
        <P last><B>Lesson:</B> Credit is the key — watch spreads. In a crisis, all correlations go to 1.</P>
      </Card>
      <Card title="2010-2012 Eurozone Crisis">
        <P><B>What happened:</B> PIIGS debt crisis, doom loop between banks and sovereigns.</P>
        <P><B>Ended by:</B> Draghi&apos;s &quot;whatever it takes&quot; — credible verbal intervention.</P>
        <P last><B>Lesson:</B> Politics can dominate markets. Verbal intervention works if credible.</P>
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
        <P last>Read weekly summaries. Identify the market&apos;s focus. Compare narrative to actual data — disconnects are opportunities.</P>
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
  principles: Principles,
  wheel: Wheel,
  vix: Vix,
  "covered-calls": CoveredCalls,
  csps: CSPs,
  spreads: Spreads,
  leaps: Leaps,
  "stock-criteria": StockCriteria,
  "safe-haven": SafeHaven,
  risk: Risk,
  macro: Macro,
  indicators: Indicators,
  regimes: Regimes,
  "case-studies": CaseStudies,
  "weekly-routine": WeeklyRoutine,
  checklist: Checklist,
};

export default function TradingPage() {
  return (
    <SectionLayout
      title="Trading"
      subtitle="Options & Macro Framework"
      accent="var(--accent-trading)"
      sections={SECTIONS}
    >
      {(active) => {
        const Component = SECTION_MAP[active] ?? Dashboard;
        return <Component />;
      }}
    </SectionLayout>
  );
}
