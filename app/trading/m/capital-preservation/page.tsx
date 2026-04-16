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

const CHECKLIST_KEY = "cap-pres-actions";
const CHECKLIST_COUNT = 4;

export default async function Page() {
  const gate = await enforceModule("trading.capital-preservation");
  if (gate) return gate;

  return (
    <Lesson
      moduleId="trading.capital-preservation"
      pillar="trading"
      title="Capital Preservation"
      subtitle="Rule one: don&apos;t blow up. Rule two: remember rule one."
      estMinutes={14}
    >
      <LessonSection title="What this is">
        <P>
          Most retail traders never recover from their first real drawdown
          because they sized every position as if it were their best idea.
          Capital preservation is the set of fixed rules that keep one bad
          week from ending your career.
        </P>
        <P>
          This module gives you three numbers to live by and the math that
          makes them non-negotiable.
        </P>
      </LessonSection>

      <LessonSection title="Why it matters">
        <P>
          A 50 percent drawdown requires a 100 percent gain to get back to
          even. An 80 percent drawdown requires a 400 percent gain. The
          math of drawdowns is brutally asymmetric, which is why preserving
          capital is worth far more than finding extra alpha.
        </P>
        <P>
          You cannot compound a blown-up account. Survival is the strategy.
        </P>
      </LessonSection>

      <Principle>
        No single loss can take you out of the game. If one position going
        to zero ends you, you were never trading, you were gambling with
        extra steps.
      </Principle>

      <LessonSection title="The three numbers">
        <P>
          <strong>Max per-trade risk: 1% of portfolio.</strong> This is the
          dollar amount you&apos;re willing to lose if a trade hits stop.
          Not the position size. The loss. If your portfolio is 50K and
          you&apos;re willing to risk 500 dollars per trade, your stop
          placement determines your size.
        </P>
        <P>
          <strong>Max portfolio drawdown before review: 10%.</strong> Hit
          it, stop opening new positions, do a full weekly review, identify
          what broke. Then, and only then, resume with half size until the
          account recovers to the prior high.
        </P>
        <P>
          <strong>Minimum cash: 20%.</strong> Always. This is the buffer
          that lets you buy when everyone else is forced to sell. Cash is a
          position, not the absence of one.
        </P>
      </LessonSection>

      <Example title="Position sizing from a stop">
        <P>
          Portfolio: $50,000. Max risk per trade: 1% = $500.
        </P>
        <P>
          Entry: $100. Stop: $92. Risk per share: $8. Max shares: 500 / 8
          = 62 shares. Position size in dollars: 62 × 100 = $6,200, which
          is 12.4% of portfolio.
        </P>
        <P>
          Notice: the position size came out of the risk rule, not the
          other way around. Never pick a size first and back into a stop.
          That&apos;s how stops quietly become suggestions.
        </P>
      </Example>

      <Mistakes
        items={[
          "Sizing by conviction. Your high-conviction idea is still a single position in an uncertain world. Conviction doesn&apos;t change the risk rule.",
          "Averaging down without a plan. Adding to a loser because it got cheaper means your risk per trade just went up. You&apos;re now breaking rule one to rescue a position that already broke rule two.",
          "Running no stop because &apos;I&apos;ll just watch it.&apos; You will not. Stops exist because your attention is a depleting resource.",
          "Treating cash as dead capital. Cash is optionality. Optionality is the most valuable asset you can hold going into a dislocation.",
        ]}
      />

      <Checklist
        title="Actions to complete this module"
        storageKey={CHECKLIST_KEY}
        items={[
          {
            id: "calc",
            label: "Calculate your 1% dollar risk and write it at the top of your trade journal.",
            hint: "If you don&apos;t have a journal, a text file works. The point is having one number you stare at before every entry.",
          },
          {
            id: "audit",
            label: "Audit every open position and compute the actual dollar risk if it hit a reasonable stop.",
            hint: "If any single position is risking more than 2% of portfolio, resize it.",
          },
          {
            id: "cash",
            label: "Check your cash percentage. If it&apos;s below 20%, trim the weakest position to get back above.",
            hint: "&apos;Weakest&apos; means lowest conviction or worst setup, not &apos;biggest loser.&apos;",
          },
          {
            id: "drawdown-rule",
            label: "Write down your 10% drawdown rule somewhere you&apos;ll see it before trading.",
            hint: "Phone note, sticky on the monitor, trade journal first page. Doesn&apos;t matter where. Matters that it&apos;s there.",
          },
        ]}
      />

      <Quiz
        questions={[
          {
            id: "q1",
            prompt:
              "Your portfolio hits a 12% drawdown. What does the framework say to do?",
            options: [
              "Stop, do a full weekly review, resume at half size after the review.",
              "Keep going. Drawdowns are normal.",
              "Close all positions and go to 100% cash.",
              "Double up on your best idea to recover faster.",
            ],
            correct: 0,
            explain:
              "The 10% rule is not &apos;panic.&apos; It&apos;s &apos;pause and diagnose.&apos; Half size afterward is the seatbelt while you verify the process is intact.",
          },
          {
            id: "q2",
            prompt:
              "A $50k account. You want to enter a position at $20 with a stop at $19. What&apos;s the correct number of shares at 1% risk?",
            options: [
              "500 shares ($10,000 position).",
              "250 shares ($5,000 position).",
              "50 shares ($1,000 position).",
              "As many as you can afford.",
            ],
            correct: 0,
            explain:
              "Risk per share is $1. $500 risk / $1 per share = 500 shares. Position dollar size falls out of the math.",
          },
          {
            id: "q3",
            prompt: "What is the correct relationship between position size and stop distance?",
            options: [
              "Stop distance is whatever the chart says. Size is fixed.",
              "Size is fixed by conviction. Stops are optional.",
              "Stop distance and size together determine dollar risk. Dollar risk is the fixed thing.",
              "Stops are set so your dollar loss equals your dollar gain target.",
            ],
            correct: 2,
            explain:
              "Dollar risk is the anchor. Stop distance is set by the chart/thesis. Size is derived. Never reverse that order.",
          },
        ]}
      />

      <Reflection
        prompt="What is the biggest single-day drawdown you&apos;ve ever taken? What broke that day: the market, or a rule you didn&apos;t have in place?"
        minChars={120}
      />

      <CompleteModule
        nextPath="/trading/m/pre-trade-checklist"
        nextLabel="Next: Pre-Trade Checklist"
        requireChecklistKey={CHECKLIST_KEY}
        requireChecklistCount={CHECKLIST_COUNT}
      />
    </Lesson>
  );
}
