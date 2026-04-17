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

const CHECKLIST_KEY = "split-actions";
const CHECKLIST_COUNT = 3;

export default async function Page() {
  const gate = await enforceModule("fitness.weekly-split");
  if (gate) return gate;

  return (
    <Lesson
      moduleId="fitness.weekly-split"
      pillar="fitness"
      title="The Weekly Split"
      subtitle="Three strength days, two to three cardio sessions, mobility daily. The structure that actually works."
      estMinutes={14}
    >
      <LessonSection title="What this is">
        <P>
          A training week that honors all five hybrid rules. You don't
          need more sessions than this. You need these sessions, done well,
          for years.
        </P>
      </LessonSection>

      <Principle>
        The best split is the one you'll still be running in 52 weeks.
        Sustainable structure beats ambitious structure every time.
      </Principle>

      <LessonSection title="The template">
        <P>
          <strong>Monday:</strong> Strength A (lower body focus).
        </P>
        <P>
          <strong>Tuesday:</strong> Zone 2 cardio, 45-60 minutes. Easy
          pace, nose breathing, you can hold a conversation.
        </P>
        <P>
          <strong>Wednesday:</strong> Strength B (upper body focus).
        </P>
        <P>
          <strong>Thursday:</strong> Intervals. 20-30 minutes total work.
          Hard.
        </P>
        <P>
          <strong>Friday:</strong> Strength C (full body, lighter,
          skill-focused).
        </P>
        <P>
          <strong>Saturday:</strong> Optional easy activity. Hike, walk,
          mobility flow.
        </P>
        <P>
          <strong>Sunday:</strong> Full rest.
        </P>
        <P>
          Mobility 10 minutes daily, end of day or pre-session.
        </P>
      </LessonSection>

      <LessonSection title="The strength template (per session)">
        <P>
          <strong>Warm-up:</strong> 5 minutes dynamic movement + 2 ramp
          sets of the first lift.
        </P>
        <P>
          <strong>Main lift:</strong> 4 sets of 5-8 reps, 8 RPE. This is
          the lift the session is built around.
        </P>
        <P>
          <strong>Secondary:</strong> 3 sets of 8-12 reps, 7-8 RPE.
          Supporting pattern.
        </P>
        <P>
          <strong>Accessories:</strong> 2-3 movements, 3 sets of 10-15
          reps, focused on weaknesses.
        </P>
        <P>
          <strong>Finisher (optional):</strong> 5-8 minute conditioning
          piece. Skip on heavy days.
        </P>
        <P>
          Total: 45-60 minutes. Anything longer is probably junk.
        </P>
      </LessonSection>

      <Example title="A real Monday session">
        <P>
          Warm-up: 5 min on the bike, hip flows, 2 ramp sets of squats.
        </P>
        <P>
          Main: Back squat, 4x5 at 80% of current 5RM.
        </P>
        <P>
          Secondary: Romanian deadlift, 3x8.
        </P>
        <P>
          Accessories: Split squat 3x10 each leg, standing calf raise
          3x12, plank 3x45s.
        </P>
        <P>
          Done. 50 minutes. You're walking out stronger, not
          destroyed.
        </P>
      </Example>

      <Mistakes
        items={[
          "Stacking strength back-to-back without Zone 2 in between. You'll burn out your central nervous system and miss the aerobic base that lets you recover.",
          "Making every strength session a max-effort day. The 5-8 rep range at 8 RPE is where long-term strength lives.",
          "Skipping intervals because they're unpleasant. Intervals are the one session that moves V02max, which correlates directly with how long you live well.",
          "Adding a sixth and seventh session because you feel good. 'Feel good' weeks are where you consolidate, not pile on.",
          "Doing the split but ignoring the 10 min daily mobility. It is not optional. It is the insurance premium.",
        ]}
      />

      <Checklist
        title="Actions to complete this module"
        storageKey={CHECKLIST_KEY}
        items={[
          {
            id: "plan",
            label: "Pick the 3 strength days and 2-3 cardio days that fit your schedule and write them on your calendar for the next 4 weeks.",
            hint: "Same days each week. Decision fatigue kills consistency.",
          },
          {
            id: "mobility",
            label: "Pick a time for daily 10-minute mobility. Anchor it to something you already do.",
            hint: "Post-shower, pre-breakfast, end of workday. Anchors beat willpower.",
          },
          {
            id: "write-first",
            label: "Write out this week's first strength session in full: warm-up, main, secondary, accessories.",
            hint: "You are 10x more likely to train well if you walk in with the session already written.",
          },
        ]}
      />

      <Quiz
        questions={[
          {
            id: "q1",
            prompt: "You're short on time and can only do one cardio session this week. Which one?",
            options: [
              "Zone 2, because it's easier and you're tired.",
              "Intervals, because they give the most V02max benefit per minute.",
              "A long hike.",
              "Skip cardio entirely.",
            ],
            correct: 1,
            explain:
              "If you can only afford one, intervals win on a per-minute basis. Ideally you want both.",
          },
          {
            id: "q2",
            prompt: "You feel great Friday morning. Your session calls for 'Strength C, lighter, skill-focused.' What should you do?",
            options: [
              "Go heavy because you feel good.",
              "Stick to the plan. Feeling good on Friday is the result of planned Friday volume, not an invitation to escalate.",
              "Skip it and lift heavy Saturday.",
              "Double the accessories.",
            ],
            correct: 1,
            explain:
              "The feel-good-so-go-heavy pattern is the most common path to the mid-cycle injury. The split is working; don't break it.",
          },
          {
            id: "q3",
            prompt: "Your main lift prescription is 4x5 at 8 RPE and on the last set the 5th rep feels like a grinder. What should you do next week?",
            options: [
              "Increase the weight 5%.",
              "Keep the weight, the grinder tells you 8 RPE was accurate. Progress is still earned by adding weight only when the last rep feels clean.",
              "Decrease the weight.",
              "Add a 5th set.",
            ],
            correct: 1,
            explain:
              "RPE programming rewards patience. Next week could be the same weight at better quality, and then the following week goes up.",
          },
        ]}
      />

      <Reflection
        prompt="Which day of this split are you most likely to skip? Be honest. What's the specific friction, and what's one change that would eliminate 80% of the friction?"
        minChars={120}
      />

      <CompleteModule
        nextPath="/fitness/m/tut"
        nextLabel="Next: Time Under Tension"
        requireChecklistKey={CHECKLIST_KEY}
        requireChecklistCount={CHECKLIST_COUNT}
      />
    </Lesson>
  );
}
