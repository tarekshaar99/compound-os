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

const CHECKLIST_KEY = "decisions-actions";
const CHECKLIST_COUNT = 3;

export default async function Page() {
  const gate = await enforceModule("mindset.decision-making");
  if (gate) return gate;

  return (
    <Lesson
      moduleId="mindset.decision-making"
      pillar="mindset"
      title="Decision-Making Under Pressure"
      subtitle="Binary thinking, sleep-on-it rules, and the pre-mortem. How to choose when you can&apos;t think straight."
      estMinutes={11}
    >
      <LessonSection title="What this is">
        <P>
          Most bad decisions are not the result of bad thinking. They&apos;re
          the result of thinking at the wrong time, from the wrong state.
          This module gives you three tools that collectively handle 80
          percent of the high-pressure decisions you&apos;ll face.
        </P>
      </LessonSection>

      <Principle>
        Under pressure, your decision quality is a function of state, not
        intelligence. The move is to change the state before you make the
        call.
      </Principle>

      <LessonSection title="Tool one: the binary frame">
        <P>
          When you&apos;re overwhelmed by options, collapse to two: do it
          or don&apos;t. Yes or no. Enter or skip. Most indecision is a
          false option count. Clarity usually lives in the binary, not
          the spectrum.
        </P>
        <P>
          If the binary answer is &quot;I don&apos;t know,&quot; that IS
          the answer. &quot;I don&apos;t know&quot; means no.
        </P>
      </LessonSection>

      <LessonSection title="Tool two: the sleep-on-it rule">
        <P>
          For any decision above a certain size (money, time, relationships),
          the rule is you wait one full sleep cycle before executing. No
          irreversible action within six hours of a strong emotion.
        </P>
        <P>
          The best version of yourself shows up after sleep. If the
          decision still makes sense tomorrow morning, execute. If it
          suddenly looks silly, you just saved yourself a costly lesson.
        </P>
      </LessonSection>

      <LessonSection title="Tool three: the pre-mortem">
        <P>
          Before committing to a non-trivial decision, spend two minutes
          imagining it&apos;s a year from now and it has gone badly. Write
          down the three most likely reasons.
        </P>
        <P>
          This simple exercise surfaces the risks your optimism suppressed,
          and often reveals a cheap modification that kills the biggest
          failure mode. Most bad decisions look the same on the
          pre-mortem: the author ignored a risk that was obvious in
          retrospect.
        </P>
      </LessonSection>

      <Example title="A real-world call">
        <P>
          Offer: a big career move with 40% more money but a relocation.
        </P>
        <P>
          Binary frame: take it or don&apos;t. Not &quot;take it with
          conditions&quot; yet.
        </P>
        <P>
          Sleep rule: no response before 24 hours, ideally 48.
        </P>
        <P>
          Pre-mortem: year from now, this went badly. Why? Most likely:
          spouse was miserable, I underestimated cost of living, or the
          role wasn&apos;t what was pitched.
        </P>
        <P>
          Now you have three specific risks to check before yes. You just
          turned a flood of anxiety into three concrete questions to
          answer.
        </P>
      </Example>

      <Mistakes
        items={[
          "Making big calls while emotionally activated. Anger, fear, euphoria, jealousy. The state writes the decision, the decision cashes the check.",
          "Treating the sleep-on-it rule as optional &apos;when it&apos;s obvious.&apos; The obvious calls are exactly when you&apos;re most likely to be in a compromised state.",
          "Running the pre-mortem half-heartedly. If the three &apos;why it went bad&apos; reasons are generic (&apos;bad luck,&apos; &apos;timing&apos;), you haven&apos;t done it right. Push until you have three real risks.",
          "Using the binary frame to avoid depth. The point is to collapse false optionality, not to skip the thinking that belongs at stage two.",
        ]}
      />

      <Checklist
        title="Actions to complete this module"
        storageKey={CHECKLIST_KEY}
        items={[
          {
            id: "rule",
            label: "Define the threshold for your sleep-on-it rule: the dollar, time, or relationship cost that triggers it.",
            hint: "For most people, any irreversible decision over a thousand dollars or two weeks of time. Pick your number.",
          },
          {
            id: "pending",
            label: "Identify one current pending decision. Run the binary frame and pre-mortem on it today.",
            hint: "Even tiny ones. The muscle is the whole point.",
          },
          {
            id: "journal",
            label: "When the decision is made (yours or someone else&apos;s), write the three pre-mortem risks and revisit in six months.",
            hint: "Your pre-mortems calibrate with practice. You get dramatically better at spotting risks that matter.",
          },
        ]}
      />

      <Quiz
        questions={[
          {
            id: "q1",
            prompt: "You get bad news about your portfolio at 10pm and feel the urge to act. What does the framework say?",
            options: [
              "Act immediately. Faster is usually better.",
              "Sleep on it. No irreversible action within six hours of a strong emotion.",
              "Call a friend and ask what to do.",
              "Do half of what you&apos;re considering.",
            ],
            correct: 1,
            explain:
              "The bias cost of acting in high emotion at night is enormous. Sleep is free. The decision is almost always clearer at 7am.",
          },
          {
            id: "q2",
            prompt: "You&apos;re debating five possible strategies and can&apos;t pick. What&apos;s the first move?",
            options: [
              "Research more.",
              "Collapse the decision to binary: is any one of these a clear yes, or are they all unclear? If all unclear, the answer is no.",
              "Poll friends.",
              "Pick randomly.",
            ],
            correct: 1,
            explain:
              "Indecision among many options usually means none is a clear yes. The binary frame exposes this quickly and saves weeks of spinning.",
          },
          {
            id: "q3",
            prompt: "Your pre-mortem output is &quot;it went badly because of bad luck.&quot; What does that tell you?",
            options: [
              "The decision is low-risk.",
              "You haven&apos;t actually done the pre-mortem. Push until you have three specific, concrete failure modes.",
              "Bad luck is a real risk.",
              "You should do the decision anyway.",
            ],
            correct: 1,
            explain:
              "Generic pre-mortems are avoidance dressed as analysis. Real pre-mortems produce specific, actionable risks.",
          },
        ]}
      />

      <Reflection
        prompt="Pick one decision you made in the last year that went badly. Run the pre-mortem on it now, retroactively. Which of the risks would you have actually seen if you&apos;d done the exercise before committing?"
        minChars={200}
      />

      <CompleteModule
        nextPath="/mindset"
        nextLabel="Back to Mindset"
        requireChecklistKey={CHECKLIST_KEY}
        requireChecklistCount={CHECKLIST_COUNT}
      />
    </Lesson>
  );
}
