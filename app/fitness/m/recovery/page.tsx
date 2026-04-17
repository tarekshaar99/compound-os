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

const CHECKLIST_KEY = "recovery-actions";
const CHECKLIST_COUNT = 3;

export default async function Page() {
  const gate = await enforceModule("fitness.recovery");
  if (gate) return gate;

  return (
    <Lesson
      moduleId="fitness.recovery"
      pillar="fitness"
      title="Recovery and Sleep"
      subtitle="The part most people skip. Sleep targets, deload logic, and how to read when you're cooked."
      estMinutes={11}
    >
      <LessonSection title="What this is">
        <P>
          Training is the stimulus. Recovery is the adaptation. Skip the
          second half and you accumulated all the cost and none of the
          benefit. This module gives you the four levers and a simple
          decision tree for when you're fried.
        </P>
      </LessonSection>

      <Principle>
        You are as strong as your worst recovery week. Chronic
        under-recovery doesn't show up as one bad day. It shows up as
        an injury you never saw coming.
      </Principle>

      <LessonSection title="The four levers">
        <P>
          <strong>Sleep:</strong> 7-9 hours nightly. Non-negotiable. A
          single bad night costs you ~15% on CNS-demanding work the next
          day. A bad week erases weeks of training adaptation.
        </P>
        <P>
          <strong>Food:</strong> enough protein (0.8g per lb bodyweight
          minimum), enough calories to support the work. Under-fueling
          while training hard is a slow injury.
        </P>
        <P>
          <strong>Stress management:</strong> work stress and training
          stress share one recovery bucket. A brutal work week is not the
          time to PR.
        </P>
        <P>
          <strong>Deloads:</strong> every 4-6 weeks, reduce volume by
          ~40%. This is not optional. The training that comes after a
          deload is the training that actually produces gains.
        </P>
      </LessonSection>

      <LessonSection title="How to know you're cooked">
        <P>
          Five signals. Two or more showing at once means a deload week,
          not a "push through" week:
        </P>
        <P>
          1. Resting heart rate elevated 5+ bpm over baseline for 3+ days.
        </P>
        <P>
          2. Sleep duration holding steady but you're still tired.
        </P>
        <P>
          3. Irritability that's out of character.
        </P>
        <P>
          4. Warm-up weights feeling heavy that shouldn't.
        </P>
        <P>
          5. Minor tweaks (elbow, knee, low back) flaring up that were
          fine last week.
        </P>
      </LessonSection>

      <Example title="A real deload week">
        <P>
          Normal week: 3 strength sessions at working intensity, 2 cardio
          sessions (one Zone 2, one intervals), mobility daily.
        </P>
        <P>
          Deload week: 3 strength sessions at 60-65% of working weight,
          same reps, crisp technique. Zone 2 replaces intervals. Mobility
          same. No interval session.
        </P>
        <P>
          You finish the week feeling sharper, not weaker. Week after is
          usually the best training week of the cycle.
        </P>
      </Example>

      <Mistakes
        items={[
          "Treating sleep as the adjustable variable when life gets busy. It's the least adjustable. Work, social, scrolling all flex before sleep does.",
          "Skipping deloads because 'I'm not tired yet.' Deloads that happen before you need them are called training plans. Deloads forced on you are called injuries.",
          "Confusing rest days with recovery. Rest days are part of the week. Recovery is the whole system: food, sleep, stress. You can have 2 rest days and still be massively under-recovered.",
          "Using caffeine to paper over accumulated fatigue. That's a loan, not a solution. The interest is real and compounds.",
          "Ignoring small joint tweaks. A 4-day low-intensity reset on a minor tweak saves a 6-week full rehab down the line.",
        ]}
      />

      <Checklist
        title="Actions to complete this module"
        storageKey={CHECKLIST_KEY}
        items={[
          {
            id: "sleep-target",
            label: "Set a fixed bedtime that gives you 8 hours before your normal wake time. Write it down.",
            hint: "Bedtime is the adjustable lever. Wake time rarely is. Work back from wake time.",
          },
          {
            id: "deload-schedule",
            label: "Schedule a deload week every 5 weeks on your training calendar for the next 3 months.",
            hint: "Pre-committed deloads beat reactive deloads.",
          },
          {
            id: "tracking",
            label: "Pick one recovery metric to track daily: resting HR on waking, or subjective 1-10 readiness.",
            hint: "Doesn't matter which. Matters that you have a trend line when signals start flashing.",
          },
        ]}
      />

      <Quiz
        questions={[
          {
            id: "q1",
            prompt: "You have a big strength session scheduled. You slept 5 hours last night, poorly. What does the framework say?",
            options: [
              "Push through. Training state is adaptive.",
              "Skip entirely.",
              "Downshift today's session: same movements, drop working weight 20-30%, same technique focus.",
              "Double your caffeine.",
            ],
            correct: 2,
            explain:
              "Skipping fully breaks the habit. Going full intensity on no sleep is how injuries happen. A light-touch session keeps the rhythm and the tissue.",
          },
          {
            id: "q2",
            prompt: "Three of the five 'cooked' signals are flashing this week. What's the call?",
            options: [
              "One hard session to see if you can break through.",
              "Deload week: 60-65% of working weight, reps unchanged, Zone 2 instead of intervals.",
              "Take the week completely off.",
              "Supplement stack to recover faster.",
            ],
            correct: 1,
            explain:
              "A full week off often kills momentum. A proper deload resets the system while maintaining the pattern.",
          },
          {
            id: "q3",
            prompt: "What's the single highest-leverage recovery lever for most people?",
            options: [
              "Ice baths.",
              "Massage gun.",
              "Sleep. Adding one hour of sleep per night is worth more than any supplement or modality.",
              "Electrolytes.",
            ],
            correct: 2,
            explain:
              "None of the modalities touch sleep for ROI. Nearly every supplement and gadget is a rounding error compared to a consistent extra hour of sleep.",
          },
        ]}
      />

      <Reflection
        prompt="Which of the four recovery levers is your current weakest link? What's one specific change you'll make this week to fix it?"
        minChars={100}
      />

      <CompleteModule
        nextPath="/fitness"
        nextLabel="Back to Fitness"
        requireChecklistKey={CHECKLIST_KEY}
        requireChecklistCount={CHECKLIST_COUNT}
      />
    </Lesson>
  );
}
