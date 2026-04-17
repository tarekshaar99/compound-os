import { enforceModule } from "../../../components/module/ModuleGate";
import {
  Lesson,
  LessonSection,
  P,
  Principle,
  Example,
  Mistakes,
} from "../../../components/module/Lesson";
import {
  Checklist,
  Quiz,
  Reflection,
  CompleteModule,
} from "../../../components/module/Interactive";

export const dynamic = "force-dynamic";

const CHECKLIST_KEY = "basics-actions";
const CHECKLIST_COUNT = 4;

/* ---- Glossary data ----------------------------------------------------- */

const GLOSSARY: { term: string; short: string; body: string }[] = [
  {
    term: "Ticker",
    short: "Short code for a stock or ETF.",
    body:
      "AAPL is Apple, SPY is the S&P 500 ETF, QQQ is the Nasdaq 100 ETF. When you hear someone say a name, the ticker is how you look it up anywhere.",
  },
  {
    term: "ETF",
    short: "Exchange-Traded Fund. A basket of stocks in one ticker.",
    body:
      "An ETF lets you buy the whole S&P 500 or the whole energy sector in one trade. Lower fees than mutual funds, and you can buy and sell them during the day like a normal stock.",
  },
  {
    term: "Volatility",
    short: "How much a price swings.",
    body:
      "High volatility means big daily moves (both up and down). Low volatility means the price is grinding sideways. Volatility is not the same as direction; something can be very volatile and still go nowhere over a month.",
  },
  {
    term: "VIX",
    short: "The market's expected volatility over the next 30 days.",
    body:
      "Below 15 is calm. 15 to 20 is normal. Above 25 is stressed. Above 35 is panic. The VIX rises when markets fall, so it is often called the fear index. The Markets pillar uses it to decide how much capital to deploy.",
  },
  {
    term: "Option",
    short: "A contract tied to a stock, with a price, strike, and expiry.",
    body:
      "A call option is the right to buy 100 shares at a set price (the strike) before a date. A put option is the right to sell. You pay a premium upfront. Options are how the Wheel Strategy generates income.",
  },
  {
    term: "Strike / Premium",
    short: "The agreed price, and what you pay for the contract.",
    body:
      "Strike is the price written into the option contract. Premium is what it costs to buy that contract today. If you sell an option, you collect the premium.",
  },
  {
    term: "Delta",
    short: "A rough probability the option expires with value.",
    body:
      "A 20-delta put has roughly a 20% chance of being assigned. The Wheel Strategy targets 20 to 25 delta specifically, because it balances income against the odds of getting assigned.",
  },
  {
    term: "Bid / Ask / Spread",
    short: "The two prices you actually see in real time.",
    body:
      "Bid is what a buyer is willing to pay. Ask is what a seller wants. The spread is the gap between them. Wide spreads mean low liquidity, and low liquidity is one of the silent ways to lose money.",
  },
  {
    term: "Liquidity",
    short: "How easily you can get in and out without moving the price.",
    body:
      "High volume and tight spreads equal high liquidity. Big-name tickers (AAPL, SPY, MSFT) are liquid. Small obscure tickers often are not. The Pre-Trade Checklist asks about liquidity for a reason.",
  },
  {
    term: "Market Cap",
    short: "Total value of a company (share price x shares outstanding).",
    body:
      "Large cap means big and established (Apple). Mid cap is medium. Small cap is smaller and more volatile. Micro cap usually means be careful.",
  },
  {
    term: "P/E Ratio",
    short: "Price divided by earnings per share.",
    body:
      "A shorthand for how expensive a stock is relative to its profit. A P/E of 20 means the price is 20x the yearly earnings per share. Context matters: tech runs high, banks run low.",
  },
  {
    term: "Dividend / Yield",
    short: "Cash a company pays shareholders, and its rate.",
    body:
      "Dividend yield = annual dividend divided by share price. A 4% yield means $4 per year in dividends for every $100 invested at today's price. Not every company pays dividends.",
  },
];

/* ---- Tools data -------------------------------------------------------- */

const TOOLS: {
  name: string;
  url: string;
  role: string;
  why: string;
  free: boolean;
}[] = [
  {
    name: "TradingView",
    url: "https://www.tradingview.com",
    role: "Charts and watchlists",
    why:
      "The cleanest free charting platform. Build a watchlist, set price alerts, draw levels. You do not need the paid tier to start.",
    free: true,
  },
  {
    name: "Interactive Brokers",
    url: "https://www.interactivebrokers.com",
    role: "Broker (where you actually trade)",
    why:
      "Low fees, global access, proper options chains. If you are outside the US and serious about trading, this is the default answer. Open an account, fund it, and keep it simple.",
    free: true,
  },
  {
    name: "Finviz",
    url: "https://finviz.com",
    role: "Screening and market map",
    why:
      "Free stock screener with a heatmap view of the whole market. Quickest way to find tickers that match a set of rules (sector, P/E, market cap, earnings date).",
    free: true,
  },
  {
    name: "CME FedWatch",
    url: "https://www.cmegroup.com/markets/interest-rates/cme-fedwatch-tool.html",
    role: "Rate-hike probabilities",
    why:
      "The market's consensus on what the Fed will do at the next meeting, updated live. If you trade anything macro-sensitive, this replaces reading ten headlines.",
    free: true,
  },
  {
    name: "SEC EDGAR",
    url: "https://www.sec.gov/edgar",
    role: "Company filings, unfiltered",
    why:
      "Every 10-K, 10-Q, 8-K, and insider trade. Raw data, no analyst spin. When something is off about a company, this is where you find it.",
    free: true,
  },
];

export default async function Page() {
  const gate = await enforceModule("trading.basics");
  if (gate) return gate;

  return (
    <Lesson
      moduleId="trading.basics"
      pillar="trading"
      title="Markets 101: Terms and Tools"
      subtitle="Before the strategies, the vocabulary. And the five websites that replace 90% of the paid tools people buy."
      estMinutes={12}
    >
      <LessonSection title="Why this module exists">
        <P>
          Most trading content assumes you already know what a ticker is,
          what the VIX is, what delta means. If you do not, every chart and
          every explanation feels like code. That is not a skill gap. It is
          a vocabulary gap.
        </P>
        <P>
          This module gives you the dozen terms and the five websites that
          everything else in the Markets pillar builds on. Read it once. Keep
          the tab open while you work through the next few modules. Come
          back when something does not click.
        </P>
      </LessonSection>

      <Principle>
        You do not need more data. You need fluency in the basic vocabulary
        so data stops feeling intimidating.
      </Principle>

      {/* Glossary */}
      <LessonSection title="The 12 terms you actually need">
        <P>
          In plain language, with the nuance that matters. If a term here
          shows up later in the Markets pillar, assume it means exactly
          what is written below.
        </P>
        <dl className="mt-6 space-y-5">
          {GLOSSARY.map((g) => (
            <div
              key={g.term}
              className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card-bg)]"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <dt className="text-[15px] font-semibold text-[var(--text-primary)] tracking-tight">
                  {g.term}
                </dt>
                <span className="mt-1 sm:mt-0 text-[12px] text-[var(--accent)] font-medium">
                  {g.short}
                </span>
              </div>
              <dd className="mt-2.5 text-[14px] text-[var(--text-secondary)] leading-relaxed">
                {g.body}
              </dd>
            </div>
          ))}
        </dl>
      </LessonSection>

      {/* Tools */}
      <LessonSection title="The five websites to bookmark">
        <P>
          Save these five. Between them, you have charts, a broker,
          screening, macro signal, and primary sources. Everything else is
          optional.
        </P>
        <ul className="mt-6 space-y-4">
          {TOOLS.map((t, i) => (
            <li
              key={t.name}
              className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card-bg)]"
            >
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-[11px] font-mono text-[var(--text-muted)] tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                >
                  {t.name}
                </a>
                {t.free && (
                  <span className="ml-auto text-[10px] uppercase tracking-widest text-[var(--accent)] font-semibold">
                    Free tier
                  </span>
                )}
              </div>
              <div className="text-[12px] uppercase tracking-widest text-[var(--text-muted)] font-medium mb-2 pl-8">
                {t.role}
              </div>
              <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed pl-8">
                {t.why}
              </p>
              <div className="mt-3 pl-8">
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12px] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  Visit site
                  <span aria-hidden>&rarr;</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </LessonSection>

      <Example title="Walking through one ticker end to end">
        <P>
          Take AAPL. Open TradingView and pull up the 1-year chart. You
          see price, a volume bar under it, and some moving averages. That
          is it. No indicators yet.
        </P>
        <P>
          Now open Finviz and look at Apple&apos;s page. You see market
          cap, P/E, forward P/E, dividend yield, insider ownership, 52-week
          range. Those are the reference points every analyst uses.
        </P>
        <P>
          Finally, open SEC EDGAR, search AAPL, and look at the most recent
          10-Q. You do not have to read it. Just see that it exists, in
          plain English, with everything the company has formally told
          the public.
        </P>
        <P>
          That is a full fluency lap. Three tabs, three lenses, one ticker.
          If you can do that for any company, the rest of the Markets
          pillar is just building on this muscle.
        </P>
      </Example>

      <Mistakes
        items={[
          "Treating trading content like it has a different language and giving up instead of looking up the term.",
          "Paying for premium tools before you have used the free ones. Everyone does this. Nobody needs to.",
          "Bookmarking ten sites and using none. Five is the ceiling. More is avoidance.",
          "Confusing volatility with direction. Volatile does not mean going down. It means moving.",
        ]}
      />

      <Checklist
        title="Actions"
        storageKey={CHECKLIST_KEY}
        items={[
          {
            id: "tv",
            label: "Create a free TradingView account and start a watchlist with three tickers you actually care about.",
            hint: "SPY and QQQ are good anchors even if you never trade them. Add one company you think about regularly.",
          },
          {
            id: "bookmark",
            label: "Bookmark the five websites above in a folder called Markets in your browser.",
            hint: "Browser folder, not a notes app. You want them one click away when you open a lesson.",
          },
          {
            id: "scan",
            label: "Open Finviz and look at the market heatmap for today. Notice which sectors are green and which are red.",
            hint: "You do not have to do anything with this. The goal is getting comfortable looking at the whole board.",
          },
          {
            id: "broker",
            label: "Decide which broker you will use, and write it down. If you are already with one, confirm it supports options.",
            hint: "Interactive Brokers is the default answer outside the US. In the US, Fidelity and Schwab are also fine. The worst choice is indecision.",
          },
        ]}
      />

      <Quiz
        title="Quick check"
        storageKey="basics-quiz"
        questions={[
          {
            id: "q1",
            prompt:
              "The VIX is at 32. Based on the scale above, how would you describe the current environment?",
            options: [
              "Calm. Deploy aggressively.",
              "Normal. Trade your plan.",
              "Stressed, close to panic. Slow down and keep cash.",
              "The VIX does not tell you anything useful about market stress.",
            ],
            correct: 2,
            explain:
              "Above 25 is stressed. Above 35 is panic. Thirty-two is on the upper end of stressed, which is when experienced operators reduce size, not add.",
          },
          {
            id: "q2",
            prompt:
              "You see a ticker with a bid of 12.00 and an ask of 12.90. What does that spread tell you?",
            options: [
              "The stock is a bargain.",
              "Liquidity is low; trading this will be expensive.",
              "The stock is going up.",
              "Nothing, spreads are random.",
            ],
            correct: 1,
            explain:
              "A 90-cent spread on a $12 ticker is roughly 7% wide. Getting in and out will cost you real money before the trade even starts. That is a liquidity warning.",
          },
          {
            id: "q3",
            prompt:
              "You are handed a stock tip with a ticker you have never heard of. What is the smallest first move?",
            options: [
              "Buy a small amount and see what happens.",
              "Look it up on TradingView and Finviz, check market cap, volume, and the 10-Q on SEC EDGAR.",
              "Ask the person for more details.",
              "Google the ticker and read the news.",
            ],
            correct: 1,
            explain:
              "Primary sources first. Ticker to chart to filings. If the company does not hold up after that three-tab review, you stop. That habit alone will save you from most bad ideas.",
          },
        ]}
      />

      <Reflection
        prompt="Which term above was the one you realized you did not actually understand cleanly, even though you have seen it used many times? Write a one-sentence definition of it in your own words."
        storageKey="basics-reflection"
        minChars={60}
      />

      <CompleteModule
        nextPath="/trading/m/foundations"
        nextLabel="On to Investing Foundations"
        requireChecklistKey={CHECKLIST_KEY}
        requireChecklistCount={CHECKLIST_COUNT}
      />
    </Lesson>
  );
}
