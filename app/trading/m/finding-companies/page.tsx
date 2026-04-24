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

const CHECKLIST_KEY = "finding-companies-actions";
const CHECKLIST_COUNT = 4;

/* ---- Example companies (teaching cases, not recommendations) ------------ */

const CASE_STUDIES: { ticker: string; name: string; thesis: string }[] = [
  {
    ticker: "HOOD",
    name: "Robinhood Markets",
    thesis:
      "Retail broker that rebuilt itself around options, crypto, and a growing gold membership. Revenue mix keeps diversifying and the user base skews young - a structural tailwind if the platform keeps them as they earn more.",
  },
  {
    ticker: "SOFI",
    name: "SoFi Technologies",
    thesis:
      "Digital bank trying to be the one financial app for a generation that never walked into a branch. Worth watching how deposit growth, net interest margin, and the tech platform (Galileo) contribute to the total business.",
  },
  {
    ticker: "PLTR",
    name: "Palantir Technologies",
    thesis:
      "Software used by governments and large enterprises to run complex data operations. Expensive on traditional multiples, but its commercial growth and AI products make it a conversation about narrative premium vs. underlying fundamentals.",
  },
  {
    ticker: "META",
    name: "Meta Platforms",
    thesis:
      "Mega-cap with durable ad revenue from Instagram and Facebook, plus a long AI and AR spend cycle. A textbook case of a profitable core business funding a speculative bet on the next computing platform - read the shareholder letters to see how they frame it.",
  },
  {
    ticker: "IREN",
    name: "IREN (Iris Energy)",
    thesis:
      "Started as a Bitcoin miner, pivoting to AI-cloud compute with its data centers. Volatile, cyclical, and closely tied to the price of Bitcoin and the demand for AI GPUs. A good lens for studying how a business can reinvent itself.",
  },
  {
    ticker: "NVDA",
    name: "NVIDIA",
    thesis:
      "The infrastructure of the AI buildout. Growth has been extreme, so the real question is sustainability - data-center capex cycles, customer concentration, and competition. A masterclass in reading an earnings report and separating signal from noise.",
  },
];

const SIGNALS: { label: string; detail: string }[] = [
  {
    label: "Positive earnings (or a clear path to them)",
    detail:
      "Look at net income and free cash flow over the last few years. Is the company actually making money, or burning it? If it's losing money, ask what the path to profit looks like and how long that runway is.",
  },
  {
    label: "Revenue growth",
    detail:
      "A business that isn't growing is shrinking in real terms. Look at year-over-year revenue and, more importantly, the trend across the last eight quarters.",
  },
  {
    label: "Manageable debt",
    detail:
      "Check total debt vs. cash on hand, and debt vs. annual earnings. A company with too much debt loses optionality in a downturn. Interest coverage ratio tells you if they can comfortably service it.",
  },
  {
    label: "Free cash flow",
    detail:
      "Earnings can be massaged. Cash can't. Free cash flow is what's left after the company pays to keep the lights on and invest in growth. This is what eventually funds dividends, buybacks, and resilience.",
  },
  {
    label: "Leadership you trust",
    detail:
      "Read a few earnings transcripts. Do they talk straight about what's working and what isn't, or do they dodge? Is the CEO a builder or a promoter? Insider buying (on Fiscal.ai or Finviz) is a useful secondary signal.",
  },
  {
    label: "A story that holds up in plain English",
    detail:
      "If you can't explain what the company does and why it makes money to someone who knows nothing about markets, you don't understand it well enough to own it.",
  },
];

export default async function Page() {
  const gate = await enforceModule("trading.finding-companies");
  if (gate) return gate;

  return (
    <Lesson
      moduleId="trading.finding-companies"
      pillar="trading"
      title="Finding Good Companies"
      subtitle="How to spot businesses worth researching deeper, using AI and a handful of free tools. Start here if 'which stock should I buy?' is still the question in your head."
      estMinutes={18}
    >
      <LessonSection title="Before you read: a 10-minute primer">
        <P>
          If the stock market still feels abstract, watch this short video
          first. It covers the core concepts - what a stock actually is,
          how the market functions, and why prices move - in plain English.
          The rest of this module assumes you have those basics. It is
          ten minutes well spent.
        </P>
        <div className="mt-4 aspect-video w-full rounded-xl overflow-hidden border border-[var(--border)] bg-black">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/lUv27513cfU?start=116"
            title="Stock market primer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <P>
          If the video is confusing, rewind it. This is the vocabulary
          layer, and we are about to build on top of it.
        </P>
      </LessonSection>

      <LessonSection title="Why this module exists">
        <P>
          The question every new investor asks is &ldquo;what should I
          buy?&rdquo; It is the wrong first question. The right first
          question is &ldquo;what makes a company worth owning at all?&rdquo;
          Once you know that, the universe of tickers gets small fast, and
          the ones that survive your filter are the ones worth researching
          deeper.
        </P>
        <P>
          This module gives you a simple signal list, a tool workflow, and
          six teaching cases to practice on. You will not leave with a buy
          list. You will leave with a way to build one for yourself.
        </P>
      </LessonSection>

      <Principle>
        A good business you understand beats a great business you do not.
        Your edge is the depth of your homework, not the cleverness of
        your ticker pick.
      </Principle>

      {/* Signals */}
      <LessonSection title="Six things that make a company worth a deeper look">
        <P>
          These are not buy signals. They are filter signals. If a company
          does not clear most of these, move on - there are thousands of
          others. If it does clear them, open a doc and start researching.
        </P>
        <dl className="mt-6 space-y-4">
          {SIGNALS.map((s, i) => (
            <div
              key={s.label}
              className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card-bg)]"
            >
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-[11px] font-mono text-[var(--text-muted)] tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <dt className="text-[15px] font-semibold text-[var(--text-primary)] tracking-tight">
                  {s.label}
                </dt>
              </div>
              <dd className="text-[14px] text-[var(--text-secondary)] leading-relaxed pl-8">
                {s.detail}
              </dd>
            </div>
          ))}
        </dl>
      </LessonSection>

      {/* AI workflow */}
      <LessonSection title="Using AI to narrow the universe">
        <P>
          There are thousands of public companies. You cannot read every
          10-K. The job of AI tools - ChatGPT, Claude, and specialized
          products like Fiscal.ai - is to do the first pass for you, so
          you can spend your time on the ten companies that clear the
          filter instead of the thousand that don&apos;t.
        </P>
        <P>
          A simple workflow:
        </P>
        <P>
          <strong>1.</strong> Ask an AI assistant for 10 to 20 public
          companies in a theme you care about (AI infrastructure,
          fintech, consumer health, whatever). Ask it to prioritize ones
          with positive earnings, growing revenue, and manageable debt.
        </P>
        <P>
          <strong>2.</strong> Take the output and open each name on
          Fiscal.ai. Look at five numbers: revenue growth, net income,
          free cash flow, total debt, and insider ownership. This takes
          minutes, not hours.
        </P>
        <P>
          <strong>3.</strong> Pick the 3 that interest you. For each,
          read the most recent 10-Q summary on Fiscal.ai. If the
          business model does not hold up in plain English after that,
          drop it.
        </P>
        <P>
          <strong>4.</strong> The one or two left are worth a deep dive
          - a research doc you save and revisit.
        </P>
      </LessonSection>

      {/* Case studies */}
      <LessonSection title="Six companies worth studying">
        <P>
          These are not recommendations. They are teaching cases -
          businesses that illustrate different kinds of stories: a
          platform business, a digital bank, a data-software name, a
          mega-cap compounding machine, a cyclical pivoting between
          themes, and the AI infrastructure standard. Pick one or two
          and run them through the six signals above as practice.
        </P>
        <ul className="mt-6 space-y-4">
          {CASE_STUDIES.map((c) => (
            <li
              key={c.ticker}
              className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card-bg)]"
            >
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono text-[13px] font-semibold text-[var(--accent)] tracking-tight">
                  {c.ticker}
                </span>
                <span className="text-[14px] text-[var(--text-primary)] font-medium">
                  {c.name}
                </span>
              </div>
              <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                {c.thesis}
              </p>
            </li>
          ))}
        </ul>
        <P>
          Nothing above is permission to buy. Each of these has real
          risks that a quick paragraph cannot cover. Use them as
          starting points for your own research, not as the conclusion.
        </P>
      </LessonSection>

      {/* Chart patterns */}
      <LessonSection title="Chart patterns worth knowing">
        <P>
          You do not need to become a chartist. But once you&apos;ve
          picked a company to own, knowing a handful of patterns helps
          you avoid buying at the worst possible moment. Here are the
          ones worth recognizing on sight:
        </P>
        <P>
          <strong>Breakout.</strong> Price has been ranging and closes
          above the top of the range on strong volume. This is where
          momentum starts.
        </P>
        <P>
          <strong>Support and resistance.</strong> Horizontal levels
          where buyers repeatedly step in (support) or sellers repeatedly
          appear (resistance). Useful for timing entries and trims.
        </P>
        <P>
          <strong>Bull flag.</strong> A strong rally, followed by a
          shallow pullback that looks like a flag on the chart. Often
          resolves higher.
        </P>
        <P>
          <strong>Head and shoulders.</strong> A reversal pattern - three
          peaks, with the middle one highest. A break of the neckline
          often means the trend has ended.
        </P>
        <P>
          <strong>Moving average reclaim.</strong> Price that has been
          below a major moving average (50-day, 200-day) closes decisively
          above it. A sign of changing character.
        </P>
        <P>
          TradingView is the easiest way to look at these. Open a chart,
          turn on the 50 and 200 day moving averages, and practice
          spotting the patterns. You will see them everywhere once you
          know what you are looking for.
        </P>
        <div className="mt-4">
          <a
            href="/trading/patterns"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--accent)]/40 bg-[var(--accent)]/[0.06] text-[var(--accent)] text-sm font-semibold hover:bg-[var(--accent)]/[0.12] transition-colors"
          >
            See every pattern with visual examples →
          </a>
        </div>
      </LessonSection>

      <Example title="A real research loop, start to finish">
        <P>
          You keep hearing about &ldquo;AI infrastructure.&rdquo; You
          open ChatGPT and ask: &ldquo;List 10 public companies involved
          in AI data-center infrastructure - chips, networking, power -
          that are profitable and growing. No commentary, just tickers
          with a one-line description.&rdquo;
        </P>
        <P>
          It returns a list. You open Fiscal.ai and look up four of the
          names that are new to you. Two have great revenue growth but
          concerning debt. One is losing money but has a clear narrative.
          One is profitable, growing, and has low debt. You save that
          name.
        </P>
        <P>
          You then pull up the chart on TradingView. Price has been
          consolidating near its 50-day moving average for six weeks.
          You set a price alert above the range and move on.
        </P>
        <P>
          That is a research loop. No urgency, no guessing. The name
          might never trigger. That is fine. You just added one high-
          quality candidate to a list you&apos;ll build over months.
        </P>
      </Example>

      <Mistakes
        items={[
          "Buying the first name that sounds exciting. The ones you are most emotionally sold on are usually the ones you have researched least.",
          "Confusing price action with business quality. A stock can go up for years on a bad business (story stocks), and a great business can go sideways for years. Both are temporary.",
          "Trusting a single AI output as research. AI gives you a starting point. The filings, the chart, and the numbers on Fiscal.ai are the actual research.",
          "Ignoring debt. A company with a great story and a dangerous balance sheet will blow up in the next recession. Look at debt every time.",
          "Falling in love with a thesis. If the facts change, the thesis has to change too. Write it down when you buy so you can compare to reality later.",
        ]}
      />

      <Checklist
        title="Actions"
        storageKey={CHECKLIST_KEY}
        items={[
          {
            id: "fiscal",
            label:
              "Create a free Fiscal.ai account and search one company you are curious about.",
            hint: "Look at revenue, net income, free cash flow, and total debt. Spend ten minutes orienting yourself. You are building a tool, not researching a trade yet.",
          },
          {
            id: "ai-list",
            label:
              "Ask an AI assistant for 10 to 20 public companies in a theme you care about, with positive earnings and growing revenue.",
            hint: "Prompt: 'List 10 public companies in [theme] that are profitable and growing. One-line description each. No commentary.' Paste the output into a notes file.",
          },
          {
            id: "screen",
            label:
              "Open three of those names on Fiscal.ai. For each, check revenue growth, net income, free cash flow, and total debt.",
            hint: "This is the filter step. Most names will fail it. That is the point - the ones that survive are the ones worth a real deep dive.",
          },
          {
            id: "deep-dive",
            label:
              "Pick one survivor and start a research doc for it: business model in one paragraph, the six signals, the chart, and your thesis in one sentence.",
            hint: "This becomes your company file. Revisit it every quarter when earnings come out. Your library of these is your edge over time.",
          },
        ]}
      />

      <Quiz
        title="Quick check"
        storageKey="finding-companies-quiz"
        questions={[
          {
            id: "q1",
            prompt:
              "You are excited about a company because their story sounds incredible - but they have lost money for five years and have large debt. What is the right move?",
            options: [
              "Buy a small position because the story could still work out.",
              "Skip it. Story without financial health is how retail investors get caught in terminal declines.",
              "Short the stock.",
              "Wait until it doubles and then buy.",
            ],
            correct: 1,
            explain:
              "Stories can persist for years, but a company burning cash with leverage has a clock running. Until the financials support the narrative, it is a speculation, not an investment. There is nothing wrong with speculating - just call it what it is.",
          },
          {
            id: "q2",
            prompt:
              "You ask an AI for 15 public companies in a theme you like. It gives you a clean list. What is the right next step?",
            options: [
              "Buy the top three equally.",
              "Research each one on Fiscal.ai and filter by the six signals before you consider any of them seriously.",
              "Pick the one with the best ticker.",
              "Wait for the AI to tell you which one to buy.",
            ],
            correct: 1,
            explain:
              "AI narrows the universe. It does not do the research for you. The filter (earnings, growth, debt, cash flow, leadership, clarity) is still your job. That filter is your edge.",
          },
          {
            id: "q3",
            prompt:
              "What is the purpose of saving a research doc for a company, even if you do not buy it?",
            options: [
              "It looks good in a portfolio.",
              "You can compare your written thesis to what actually happens over the next year, and learn whether your reasoning was sound.",
              "It helps with taxes.",
              "No purpose - only owned positions matter.",
            ],
            correct: 1,
            explain:
              "The research doc is a feedback loop on your own thinking. Most retail investors never do this, which is why their reasoning never improves. A library of these docs, revisited quarterly, is how you build real pattern recognition over time.",
          },
        ]}
      />

      <Reflection
        prompt="Pick one company from the six case studies - or any other you care about - and write a paragraph on why a business like this might be worth owning for the next five years. Then write one honest sentence about what could go wrong. The exercise is not to be right. It is to practice articulating a thesis and its risks in plain English, because that is the skill every investing decision rests on."
        storageKey="finding-companies-reflection"
        minChars={140}
      />

      <CompleteModule
        nextPath="/trading/m/foundations"
        nextLabel="Next: Investing Foundations"
        requireChecklistKey={CHECKLIST_KEY}
        requireChecklistCount={CHECKLIST_COUNT}
      />
    </Lesson>
  );
}
