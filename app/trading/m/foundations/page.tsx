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

const CHECKLIST_KEY = "foundations-actions";
const CHECKLIST_COUNT = 4;

export default async function Page() {
  const gate = await enforceModule("trading.foundations");
  if (gate) return gate;

  return (
    <Lesson
      moduleId="trading.foundations"
      pillar="trading"
      title="Investing Foundations"
      subtitle="Before any position, before any strategy: the mental model that governs how you deploy capital."
      estMinutes={18}
    >
      <LessonSection title="What this is">
        <P>
          Most losing traders don&apos;t lose because their strategy is wrong.
          They lose because they never decided what they&apos;re actually doing.
          Are you investing, speculating, or gambling? Each has different
          rules. Mixing them up is the single fastest way to blow up an
          account.
        </P>
        <P>
          This module gives you the scaffolding every trade sits on top of.
          Once it&apos;s in place, strategy becomes a matter of execution
          rather than improvisation.
        </P>
      </LessonSection>

      <LessonSection title="Why it matters">
        <P>
          A clear mental model is the difference between a bad week that
          costs you two percent and a bad week that costs you everything.
          The market does not care how smart you are. It cares whether your
          framework survives contact with uncertainty.
        </P>
      </LessonSection>

      <Principle>
        Every position is an answer to one question: am I being paid enough
        for the risk I&apos;m actually taking? If you can&apos;t say the risk
        out loud, you&apos;re not investing, you&apos;re guessing.
      </Principle>

      <LessonSection title="The three modes of capital deployment">
        <P>
          <strong>Investing.</strong> Multi-year horizon, business
          fundamentals, you own a piece of something productive. Volatility
          is noise. The exit is defined by thesis break, not price.
        </P>
        <P>
          <strong>Speculating.</strong> Months to quarters, structural
          setups and regime plays. Volatility is the product. The exit is
          defined by invalidation of the setup.
        </P>
        <P>
          <strong>Gambling.</strong> Hours to days, no edge, feelings
          driving clicks. Volatility is entertainment. There is no exit
          rule because there was never a plan.
        </P>
        <P>
          There is nothing wrong with speculation. There is everything
          wrong with doing it while telling yourself you&apos;re investing.
        </P>
      </LessonSection>

      <Example title="What this looks like in practice">
        <P>
          <strong>Investing example.</strong> You buy an index ETF every
          two weeks for ten years because you believe productive economies
          grow. A 30 percent drawdown is a feature, not a reason to sell.
        </P>
        <P>
          <strong>Speculating example.</strong> VIX is at 40, credit
          spreads blowing out, you sell a cash-secured put on a company
          you&apos;d be happy to own at that strike. You defined the worst
          case before entering.
        </P>
        <P>
          <strong>Gambling example.</strong> A ticker is trending on
          social media. You buy 0-day options because it feels like
          it&apos;s going up. No thesis, no stop, no size rule. That&apos;s
          not a trade, it&apos;s a donation.
        </P>
      </Example>

      <Mistakes
        items={[
          "Starting with a ticker. A ticker is the last thing you pick, not the first. Start with the regime, then the strategy, then size, then the ticker.",
          "Letting a bad speculation turn into a long-term investment by lowering your standards after you&apos;re underwater.",
          "Confusing being early with being wrong, or being lucky with being right. The market will pay you for both mistakes eventually.",
          "Measuring yourself on individual trades instead of the process. One trade means nothing. A hundred trades tell you everything.",
        ]}
      />

      <Checklist
        title="Actions to complete this module"
        storageKey={CHECKLIST_KEY}
        items={[
          {
            id: "classify",
            label: "Classify every open position as investing, speculating, or gambling.",
            hint: "Be honest. If a position doesn&apos;t fit any category cleanly, that&apos;s the answer.",
          },
          {
            id: "thesis",
            label: "For every open position, write one sentence stating the exit trigger.",
            hint: "Thesis break for investments. Invalidation level for speculation. If you can&apos;t write it, close it.",
          },
          {
            id: "size",
            label: "Cap any single speculative position at 5% of portfolio value.",
            hint: "This is the ceiling, not the target. Most positions should be smaller.",
          },
          {
            id: "close-gambles",
            label: "Close anything you classified as gambling before the next market open.",
            hint: "The loss you&apos;ve already taken is sunk. The cost of keeping a gambling position is the slot it occupies.",
          },
        ]}
      />

      <Quiz
        questions={[
          {
            id: "q1",
            prompt:
              "A stock you bought as a three-year hold drops 40% in a month. The business fundamentals are unchanged. What&apos;s the right move?",
            options: [
              "Sell immediately to preserve capital.",
              "Hold. The thesis hasn&apos;t broken. A 40% drawdown on an investment is normal.",
              "Average down aggressively to lower your basis.",
              "Sell half to feel better.",
            ],
            correct: 1,
            explain:
              "Investing horizons are defined by thesis, not price. Emotional rebalancing is the enemy. That said: adding on drawdown is a separate decision with its own risk rules.",
          },
          {
            id: "q2",
            prompt:
              "You opened a speculation with a clear invalidation at $90. Price hits $88. What should happen?",
            options: [
              "Wait. It might recover.",
              "Move the stop to $85 since the move looks overdone.",
              "Close the position. The setup is invalidated.",
              "Double the position size.",
            ],
            correct: 2,
            explain:
              "Speculation without discipline around invalidation is gambling. If you move the stop, the stop never existed.",
          },
          {
            id: "q3",
            prompt:
              "Which of these is the clearest sign you&apos;re gambling rather than speculating?",
            options: [
              "The holding period is short.",
              "You&apos;re using options instead of shares.",
              "You can&apos;t state the exit rule out loud before entering.",
              "The position is down.",
            ],
            correct: 2,
            explain:
              "Short holding periods and options are tools. Not being able to state the exit rule is the real tell. No rule, no trade.",
          },
        ]}
      />

      <Reflection
        prompt="Write one paragraph about the last trade you lost money on. Which of the three modes were you actually in? Not which one you told yourself you were in."
        minChars={120}
      />

      <CompleteModule
        nextPath="/trading/m/capital-preservation"
        nextLabel="Next: Capital Preservation"
        requireChecklistKey={CHECKLIST_KEY}
        requireChecklistCount={CHECKLIST_COUNT}
      />
    </Lesson>
  );
}
