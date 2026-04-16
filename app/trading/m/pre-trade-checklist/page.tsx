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

const CHECKLIST_KEY = "pretrade-checklist-actions";
const CHECKLIST_COUNT = 3;

export default async function Page() {
  const gate = await enforceModule("trading.pre-trade-checklist");
  if (gate) return gate;

  return (
    <Lesson
      moduleId="trading.pre-trade-checklist"
      pillar="trading"
      title="The Pre-Trade Checklist"
      subtitle="Nine questions you answer out loud before any position. If you can&apos;t answer one, you don&apos;t trade."
      estMinutes={10}
    >
      <LessonSection title="What this is">
        <P>
          The single most effective edge a retail trader can build is a
          friction layer between the impulse to trade and the act of
          trading. This module is that layer. It&apos;s nine questions.
          Answer them out loud or in writing. If any answer is fuzzy, you
          skip the trade.
        </P>
        <P>
          This sounds trivial. It is not. Most of the losses in a trading
          career come from trades that would not have happened if the
          trader had been forced to articulate them first.
        </P>
      </LessonSection>

      <Principle>
        The quality of your trades is the quality of your questions. No
        good answers, no entry.
      </Principle>

      <LessonSection title="The nine questions">
        <P>1. What regime am I in? Bull, bear, chop, high vol, low vol?</P>
        <P>
          2. What&apos;s my thesis in one sentence? If it takes a paragraph,
          it isn&apos;t a thesis, it&apos;s a rationalization.
        </P>
        <P>3. What is the exact invalidation level or thesis-break event?</P>
        <P>4. What&apos;s my risk per trade in dollars?</P>
        <P>
          5. What&apos;s my size, given that risk and the stop distance?
        </P>
        <P>
          6. What&apos;s the reward-to-risk ratio if I&apos;m right?
          (Below 1.5, think twice. Below 1.0, skip.)
        </P>
        <P>
          7. What&apos;s my time horizon? Am I managing this hourly, daily,
          weekly?
        </P>
        <P>
          8. How does this position correlate with what I already hold?
          (Five tech names is one position.)
        </P>
        <P>
          9. If the market closed for a month right after I enter, would I
          be comfortable? If not, why am I taking it?
        </P>
      </LessonSection>

      <Example title="A trade that passes the checklist">
        <P>
          Regime: VIX 24, mild correction in progress, quality names on
          sale. Thesis: blue-chip name X is trading 20 percent below its
          five-year average multiple with fundamentals intact.
          Invalidation: weekly close below prior cycle low. Risk: $500.
          Stop distance: $6/share. Size: 83 shares = ~$8,300. R:R if
          target hits mean: 3:1. Horizon: three to six months. Correlation:
          low vs existing book. Would I hold if market closed: yes.
        </P>
        <P>
          That&apos;s a trade. Every answer fits on a single line.
        </P>
      </Example>

      <Mistakes
        items={[
          "Skipping the checklist for &apos;easy&apos; setups. The ones that feel easy are exactly where confirmation bias is strongest.",
          "Answering the questions after entering. You&apos;re now auditing a position, not evaluating a trade. Different job, worse outcome.",
          "Treating the checklist as a bureaucratic formality. If you&apos;re writing &apos;good&apos; on every line, you&apos;re not using it. The point is to find reasons to say no.",
          "Not tracking which answers were wrong. Your edge is in the review: which questions does the market keep telling you you&apos;re bad at answering?",
        ]}
      />

      <Checklist
        title="Set up your own checklist"
        storageKey={CHECKLIST_KEY}
        items={[
          {
            id: "template",
            label: "Create a text/notes file titled &quot;Pre-Trade Checklist&quot; with the nine questions as a template.",
            hint: "Copy-paste a blank version each time. Takes 30 seconds to fill out. Saves you from dozens of bad trades a year.",
          },
          {
            id: "run-one",
            label: "Run the checklist against one position you&apos;re currently holding or thinking about.",
            hint: "Find the question you can&apos;t answer cleanly. That&apos;s the weak point of the idea.",
          },
          {
            id: "no-skip",
            label: "Commit in writing: no entry without a completed checklist for the next 30 days.",
            hint: "One sentence in your journal. It&apos;s the commitment device that makes the habit stick.",
          },
        ]}
      />

      <Quiz
        questions={[
          {
            id: "q1",
            prompt: "Your checklist answer to &quot;invalidation level&quot; is &quot;probably around $90, maybe lower.&quot; What should you do?",
            options: [
              "Take the trade. Markets are fuzzy.",
              "Skip the trade. Fuzzy invalidation = no invalidation.",
              "Set a stop at whatever number you said first.",
              "Take half size.",
            ],
            correct: 1,
            explain:
              "Fuzzy exits are the main way stops disappear in real time. A &apos;maybe&apos; becomes a &apos;let&apos;s see&apos; becomes a hold-and-hope. Skip the trade.",
          },
          {
            id: "q2",
            prompt:
              "You own 4 tech stocks and are considering a fifth. Which checklist question is the most important to answer honestly?",
            options: [
              "What&apos;s my thesis?",
              "What&apos;s my size?",
              "How does this correlate with what I already hold?",
              "What&apos;s my time horizon?",
            ],
            correct: 2,
            explain:
              "Correlation is the question retail traders miss most. Five tech names in a tech drawdown is one massively oversized position.",
          },
          {
            id: "q3",
            prompt: "What is the actual purpose of the pre-trade checklist?",
            options: [
              "To justify trades to yourself.",
              "To make a compelling case for every entry.",
              "To give you a reason to say no.",
              "To document trades for taxes.",
            ],
            correct: 2,
            explain:
              "A checklist that never disqualifies trades isn&apos;t doing its job. The whole value is friction.",
          },
        ]}
      />

      <Reflection
        prompt="Pick one of your losing trades from the past six months. Which of the nine questions could you not have answered cleanly before you entered? Be specific."
        minChars={120}
      />

      <CompleteModule
        nextPath="/trading"
        nextLabel="Back to Markets"
        requireChecklistKey={CHECKLIST_KEY}
        requireChecklistCount={CHECKLIST_COUNT}
      />
    </Lesson>
  );
}
