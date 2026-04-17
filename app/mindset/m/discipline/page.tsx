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

const CHECKLIST_KEY = "discipline-actions";
const CHECKLIST_COUNT = 3;

export default async function Page() {
  const gate = await enforceModule("mindset.discipline");
  if (gate) return gate;

  return (
    <Lesson
      moduleId="mindset.discipline"
      pillar="mindset"
      title="Daily Discipline"
      subtitle="Motivation is unreliable. Systems aren't. The habits that hold everything else up."
      estMinutes={10}
    >
      <LessonSection title="What this is">
        <P>
          Discipline isn't white-knuckling every morning. It's
          the set of systems that let you consistently do the work without
          needing to be motivated. If the only thing between you and a
          good day is whether you feel like it, you're already in
          trouble.
        </P>
      </LessonSection>

      <Principle>
        You don't need more willpower. You need fewer decisions.
        Every default you set in advance is one decision you don't
        have to win under fatigue.
      </Principle>

      <LessonSection title="The four pillars of daily discipline">
        <P>
          <strong>1. Anchor the morning.</strong> First 60 to 90 minutes of
          your day set the tone. Fixed wake time, water, light, one
          physical and one cognitive task. No phone for 30 minutes minimum.
          This is the single highest-leverage hour of the day.
        </P>
        <P>
          <strong>2. Ship the hardest thing first.</strong> Whatever
          you're most avoiding goes first, before email, before
          scrolling, before meetings. Your best energy should touch your
          highest-leverage work.
        </P>
        <P>
          <strong>3. Protect the physical.</strong> Training session
          blocked in the calendar like a meeting. Sleep window defended
          like a meeting. If you don't protect these, everything
          else decays within weeks.
        </P>
        <P>
          <strong>4. Evening shutdown.</strong> Three minutes to close
          open loops: what happened today, what's tomorrow's
          hardest thing, is my calendar set. Without this, you sleep
          worse and start the next day reactive.
        </P>
      </LessonSection>

      <Example title="A real operator's day">
        <P>
          6:30 alarm. No snooze. Water, sunlight, 10-minute mobility.
        </P>
        <P>
          7:30 at the desk. Phone still in the other room. Hardest work
          for 90 minutes uninterrupted.
        </P>
        <P>
          9:00 reactive work, email, calls.
        </P>
        <P>
          12:00 training session. Non-negotiable block.
        </P>
        <P>
          18:00 hard shutdown on work. Evening for life, not laptops.
        </P>
        <P>
          22:00 three-minute review, phone in another room, lights down.
        </P>
        <P>
          This is not heroic. It's just pre-decided. That's the
          whole point.
        </P>
      </Example>

      <Mistakes
        items={[
          "Grading yourself on whether you felt motivated. Motivation is weather. Discipline is climate. Stop checking the weather.",
          "Bundling too many habits into one morning. Five new habits at once is how people quit by Thursday. Install one, run it for four weeks, then add the next.",
          "Leaving phone access to chance. The phone breaks mornings, training, sleep, and deep work. It is the single biggest leverage point for most people.",
          "Grinding through when the system breaks instead of fixing the system. If you're fighting the same battle every day, the system is wrong, not your willpower.",
        ]}
      />

      <Checklist
        title="Actions to complete this module"
        storageKey={CHECKLIST_KEY}
        items={[
          {
            id: "morning",
            label: "Design and write down your ideal first 60 minutes. Put it where you'll see it when you wake up.",
            hint: "It doesn't need to be complicated. Wake, water, move, one real task before phone.",
          },
          {
            id: "phone",
            label: "Set one phone rule tonight. The simplest: phone does not enter the bedroom, period.",
            hint: "Cheap alarm clock. Done. Returns approximately 45 minutes of sleep and an hour of morning focus.",
          },
          {
            id: "shutdown",
            label: "Block 3 minutes at end of workday for a shutdown review and tomorrow's top priority.",
            hint: "Write: what got done, what's tomorrow's one thing, is the calendar right. That's it.",
          },
        ]}
      />

      <Quiz
        questions={[
          {
            id: "q1",
            prompt: "Which of these is the highest-leverage change for most people?",
            options: [
              "Adding a new morning routine step.",
              "Keeping the phone out of the bedroom.",
              "Journaling for 10 minutes.",
              "Cold showers.",
            ],
            correct: 1,
            explain:
              "Phone in bedroom wrecks sleep and primes reactive mornings. Removing it is the single cheapest, highest-impact lever available.",
          },
          {
            id: "q2",
            prompt:
              "You're busy this week. Which pillar do you sacrifice first?",
            options: [
              "Skip the morning anchor.",
              "Skip training.",
              "Skip the shutdown.",
              "None. Busy weeks are exactly why these exist. Shrink the rituals, don't skip them.",
            ],
            correct: 3,
            explain:
              "Skipping in busy weeks is how systems fail long-term. Shrink: 5-minute anchor, 20-minute training, 60-second shutdown. But keep the structure.",
          },
          {
            id: "q3",
            prompt: "Why ship the hardest thing first?",
            options: [
              "To feel productive.",
              "Because it requires the highest-quality cognitive resources, and those deplete throughout the day.",
              "Because it's unpleasant.",
              "Because meetings happen in the afternoon.",
            ],
            correct: 1,
            explain:
              "Decision quality drops with fatigue. Hard work done early is done at the best quality. Easy work deferred costs nothing.",
          },
        ]}
      />

      <Reflection
        prompt="Which of the four pillars is weakest in your current week? What's the smallest possible version you could install tomorrow to start repairing it?"
        minChars={120}
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
