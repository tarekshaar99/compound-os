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

const CHECKLIST_KEY = "triggers-actions";
const CHECKLIST_COUNT = 3;

export default async function Page() {
  const gate = await enforceModule("mindset.triggers");
  if (gate) return gate;

  return (
    <Lesson
      moduleId="mindset.triggers"
      pillar="mindset"
      title="Trigger Awareness"
      subtitle="The three-step protocol for catching yourself mid-pattern and choosing something else."
      estMinutes={10}
    >
      <LessonSection title="What this is">
        <P>
          Most self-sabotage is patterned. Same trigger, same reaction,
          same regret. You don&apos;t change the pattern by trying
          harder. You change it by catching it earlier. This module
          teaches you the three-step protocol that creates enough space
          between trigger and response for a different choice to exist.
        </P>
      </LessonSection>

      <Principle>
        Every unwanted pattern has an early warning system. You just have
        to learn to listen to it before it&apos;s too late to act on it.
      </Principle>

      <LessonSection title="The three steps">
        <P>
          <strong>1. Map the pattern.</strong> What is the typical
          sequence? Trigger → thought → feeling → urge → action → regret.
          Write it out for one specific pattern you know well.
        </P>
        <P>
          <strong>2. Name the earliest tell.</strong> There&apos;s always
          a body signal or thought that appears before the urge fully
          arrives. Maybe it&apos;s jaw tension. Maybe it&apos;s a specific
          phrase in your head. That signal is your alarm.
        </P>
        <P>
          <strong>3. Install a delay.</strong> When the alarm fires, you
          do one predetermined thing that breaks the chain. Three deep
          breaths. A two-minute walk. Writing the pattern in your notes
          app. The delay is the space where a different choice becomes
          possible.
        </P>
      </LessonSection>

      <Example title="A trader who revenge-trades">
        <P>
          <strong>Pattern:</strong> take a loss → chest tight, heat in face
          → thought &quot;I can make it back&quot; → open random ticker →
          larger size than usual → bigger loss → spiral.
        </P>
        <P>
          <strong>Earliest tell:</strong> the phrase &quot;I can make it
          back&quot; appearing in the head.
        </P>
        <P>
          <strong>Installed delay:</strong> when that phrase appears,
          close the trading app and walk around the block. No exceptions.
        </P>
        <P>
          Result: the chain is broken before the second trade happens. The
          single biggest driver of account destruction for retail traders
          is neutralized with a 10-minute walk.
        </P>
      </Example>

      <Mistakes
        items={[
          "Trying to spot the pattern at the action step. By the time you&apos;re clicking buy, the window closed 20 minutes ago. The whole point is to move the spotting earlier in the chain.",
          "Making the installed delay too ambitious. &apos;I&apos;ll meditate for 20 minutes when the urge hits.&apos; You won&apos;t. Make it small enough that it actually happens under stress.",
          "Shaming yourself for the pattern. Patterns are information. Every time one fires, you&apos;re learning about your system. Shame just makes you look away.",
          "Working on ten patterns at once. Pick the single most costly one and get good at catching it. The others often improve on their own once you&apos;re practicing awareness.",
        ]}
      />

      <Checklist
        title="Actions to complete this module"
        storageKey={CHECKLIST_KEY}
        items={[
          {
            id: "pattern",
            label: "Pick one costly pattern and map the full sequence: trigger, thought, feeling, urge, action, regret.",
            hint: "Pick one. Not three. The point is depth on one, not a survey of many.",
          },
          {
            id: "tell",
            label: "Identify the earliest tell in that sequence: the first body signal or thought that reliably appears.",
            hint: "If you can&apos;t find it, it&apos;s still there. Pay attention the next time the pattern runs and you&apos;ll catch it.",
          },
          {
            id: "install",
            label: "Pick one small, pre-committed action for when the tell fires. Write it down.",
            hint: "Breathing, walking, writing, calling one specific person. Small, specific, always available.",
          },
        ]}
      />

      <Quiz
        questions={[
          {
            id: "q1",
            prompt: "What&apos;s the single most important step in the three-step protocol?",
            options: [
              "The installed delay.",
              "Catching the earliest tell. Without that, the delay never triggers.",
              "Writing the pattern down.",
              "Naming the urge.",
            ],
            correct: 1,
            explain:
              "Late in the chain, willpower can&apos;t save you. Early in the chain, almost anything can. The whole game is where you catch it.",
          },
          {
            id: "q2",
            prompt: "Your installed delay is &quot;meditate for 15 minutes.&quot; You haven&apos;t done it a single time in two weeks. What&apos;s the issue?",
            options: [
              "You&apos;re not disciplined enough.",
              "The delay is too ambitious for the state you&apos;re in when it fires. Make it smaller.",
              "You need a better meditation app.",
              "The pattern is unchangeable.",
            ],
            correct: 1,
            explain:
              "Delays that only work when you&apos;re already calm aren&apos;t useful. Three breaths or a two-minute walk work from any state.",
          },
          {
            id: "q3",
            prompt: "Why is it counterproductive to shame yourself when a pattern fires?",
            options: [
              "Shame is always bad.",
              "Shame makes you avoid observing the pattern, which is the only way you can catch it earlier next time.",
              "Patterns can&apos;t be changed.",
              "You should feel nothing.",
            ],
            correct: 1,
            explain:
              "Awareness is the tool. Shame makes you look away from exactly what you need to be looking at.",
          },
        ]}
      />

      <Reflection
        prompt="Describe one pattern in enough detail that you could spot it at step 2 next time it fires. What&apos;s the tell, and what&apos;s your installed delay?"
        minChars={150}
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
