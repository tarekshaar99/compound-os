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

const CHECKLIST_KEY = "weekly-review-actions";
const CHECKLIST_COUNT = 4;

export default async function Page() {
  const gate = await enforceModule("trading.weekly-review");
  if (gate) return gate;

  return (
    <Lesson
      moduleId="trading.weekly-review"
      pillar="trading"
      title="Weekly Review Ritual"
      subtitle="Thirty minutes every Sunday. The only thing that separates operators from gamblers."
      estMinutes={12}
    >
      <LessonSection title="What this is">
        <P>
          Every pro has a review cadence. Retail traders almost never do.
          The weekly review is not about P&L. It's about process:
          which rules did you follow, which did you break, and what does
          that tell you about your next week.
        </P>
        <P>
          Thirty minutes, every Sunday, same time, same template. That's
          the whole ritual.
        </P>
      </LessonSection>

      <Principle>
        Results lie in the short run. Process doesn't. The weekly
        review is where you see which one you're actually running.
      </Principle>

      <LessonSection title="The six-question template">
        <P>
          1. What did I do well this week? (Process wins, not dollar
          wins.)
        </P>
        <P>
          2. What did I do poorly? (Rule breaks, not bad luck.)
        </P>
        <P>
          3. Which trades were in my edge? Which were not?
        </P>
        <P>
          4. What's the current regime? Has it changed in the last
          week?
        </P>
        <P>
          5. What's one adjustment I'll make next week, in
          writing?
        </P>
        <P>
          6. What am I watching? (Three names, three levels.)
        </P>
      </LessonSection>

      <Example title="A realistic review">
        <P>
          <strong>Well:</strong> held cash through the Tuesday whipsaw
          instead of forcing trades. Closed two winners at target instead
          of hoping for more.
        </P>
        <P>
          <strong>Poorly:</strong> added to the tech name on Thursday
          without a fresh checklist. Pure anchoring to my cost basis.
        </P>
        <P>
          <strong>In edge:</strong> the energy spread on Monday. Clean
          setup, clean execution.
        </P>
        <P>
          <strong>Out of edge:</strong> the afternoon SPY scalp. Shouldn't
          even be trading intraday SPY with my horizon.
        </P>
        <P>
          <strong>Regime:</strong> VIX 22, trending up. Staying on the
          lower end of position sizing.
        </P>
        <P>
          <strong>Adjustment:</strong> no intraday trades for 30 days.
        </P>
        <P>
          <strong>Watching:</strong> NVDA below 110, XLE at 88, SMH
          weekly close below 220.
        </P>
      </Example>

      <Mistakes
        items={[
          "Reviewing P&L only. 'Up 3%' tells you nothing about whether you followed your rules. You can lose money doing everything right and make money doing everything wrong. Grade the process.",
          "Skipping the review in a bad week. That is exactly the week you need it most.",
          "Making the review a ritual of self-congratulation. If every answer to 'what did I do poorly' is 'nothing,' you're not reviewing.",
          "Not writing the adjustment down. Mental notes don't compound. Written adjustments, revisited the following Sunday, do.",
        ]}
      />

      <Checklist
        title="Set up the ritual"
        storageKey={CHECKLIST_KEY}
        items={[
          {
            id: "time",
            label: "Pick a fixed 30-minute block every Sunday and put it in your calendar.",
            hint: "Same time every week. The consistency is the value.",
          },
          {
            id: "template",
            label: "Create a template with the six questions as headings. Duplicate it each week.",
            hint: "Notes app, Notion, Google Doc, paper journal. Any works. Weekly files make longitudinal review easier.",
          },
          {
            id: "first-review",
            label: "Do the review for the week that just passed. Today.",
            hint: "You are not waiting for the 'right' week to start. This one counts.",
          },
          {
            id: "commit",
            label: "Write the single most honest 'adjustment' you can think of for next week.",
            hint: "If it stings a little, it's the right one.",
          },
        ]}
      />

      <Quiz
        questions={[
          {
            id: "q1",
            prompt:
              "You had your best P&L week of the year, but you broke three of your own rules to get there. What does the framework say?",
            options: [
              "Celebrate the win.",
              "Ignore the rules you broke since they clearly weren't needed.",
              "Flag the rule breaks. You just got lucky, and the pattern will cost you later.",
              "Stop trading.",
            ],
            correct: 2,
            explain:
              "Lucky wins are the most dangerous kind of win. They teach the wrong lesson. The review is where you separate outcome from process.",
          },
          {
            id: "q2",
            prompt: "You're on a three-week losing streak. You're tempted to skip the review because it'll be depressing. What's the right call?",
            options: [
              "Skip it. You need a break.",
              "Do it anyway. The pattern is almost certainly in the process, and the review is the only way to find it.",
              "Do a P&L-only review.",
              "Outsource the review to someone else.",
            ],
            correct: 1,
            explain:
              "Drawdowns are where reviews earn their keep. Skip the review and you'll be in a drawdown twice as long.",
          },
          {
            id: "q3",
            prompt: "What's the most important output of the weekly review?",
            options: [
              "Updated P&L spreadsheet.",
              "A single written adjustment for next week.",
              "A watchlist.",
              "A feeling of closure on the week.",
            ],
            correct: 1,
            explain:
              "One concrete, written, testable adjustment is how reviews compound. No adjustment = no learning.",
          },
        ]}
      />

      <Reflection
        prompt="Run the six-question review for the past seven days right now. Be brief but honest. Make sure you write a specific, testable adjustment for next week."
        minChars={200}
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
