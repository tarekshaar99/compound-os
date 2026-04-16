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

const CHECKLIST_KEY = "phil-actions";
const CHECKLIST_COUNT = 3;

export default async function Page() {
  const gate = await enforceModule("fitness.philosophy");
  if (gate) return gate;

  return (
    <Lesson
      moduleId="fitness.philosophy"
      pillar="fitness"
      title="Training Philosophy"
      subtitle="Hybrid athlete, not gym rat. The principles that govern strength, cardio, mobility, and recovery."
      estMinutes={10}
    >
      <LessonSection title="What this is">
        <P>
          Most fitness content is sold by people optimizing for one thing.
          Bodybuilders who don&apos;t run. Runners who can&apos;t squat.
          CrossFit boxes full of shoulder injuries. The hybrid athlete
          philosophy rejects all of it. You want to be strong, conditioned,
          mobile, and durable at forty and at sixty.
        </P>
        <P>
          This module sets the rules that govern every subsequent decision:
          how often to train, how hard, how long, and what to stop doing.
        </P>
      </LessonSection>

      <Principle>
        Train to be strong enough to be useful, fit enough to enjoy life,
        and durable enough to keep doing both for decades. Anything else is
        a phase.
      </Principle>

      <LessonSection title="The five rules">
        <P>
          <strong>1. Less volume, more intent.</strong> Four serious lifts
          at 8 RPE beat ten junk sets. Quality reps compound, junk reps
          just fatigue you.
        </P>
        <P>
          <strong>2. Tempo over weight.</strong> Controlled eccentrics
          build more muscle, fewer injuries, and better joints than ego
          numbers. If you can&apos;t control it down, you don&apos;t own
          the weight.
        </P>
        <P>
          <strong>3. Train the whole envelope.</strong> Strength, Zone 2,
          intervals, mobility, recovery. One of these skipped for months
          is where injury or burnout starts.
        </P>
        <P>
          <strong>4. Recovery is training.</strong> Sleep, food, and off
          days aren&apos;t interruptions to the plan. They are the plan.
          You don&apos;t get stronger in the gym, you get stronger
          recovering from the gym.
        </P>
        <P>
          <strong>5. Consistency over peaks.</strong> Five years of steady
          work crushes six months of intense work followed by an injury.
          Durability is the real goal.
        </P>
      </LessonSection>

      <Example title="What a hybrid week looks like">
        <P>
          3 strength sessions (45-60 min each), 2-3 cardio sessions (one
          Zone 2, one interval, optional third easy), daily mobility (10
          min), one full rest day, six to eight hours of sleep targeted.
        </P>
        <P>
          No single day is extreme. No week is extreme. But year over
          year, you&apos;re stronger, leaner, and moving better than 99
          percent of your peers.
        </P>
      </Example>

      <Mistakes
        items={[
          "Training through real pain. Soreness is fine. Sharp, localized, reproducible pain is a signal, not a challenge.",
          "Optimizing for a single metric. Bodyweight, squat number, 5k time. Any one of these, chased alone, eventually breaks one of the others.",
          "Mistaking exhaustion for effectiveness. A crushing session that wrecks your week is a worse session than a clean one that lets you train tomorrow.",
          "Programming by YouTube. Influencers sell intensity because intensity sells. Most of their content is peak-week programming marketed as a baseline.",
        ]}
      />

      <Checklist
        title="Actions to complete this module"
        storageKey={CHECKLIST_KEY}
        items={[
          {
            id: "audit",
            label: "Audit your last 4 weeks of training. Count sessions by type: strength, Zone 2, intervals, mobility, full rest.",
            hint: "The honest count tells you which of the five rules you&apos;re already living and which you&apos;re pretending to.",
          },
          {
            id: "sleep",
            label: "Write down your average sleep hours for the last 7 days.",
            hint: "If it&apos;s under 7, the fastest training upgrade available to you is sleep, not a new program.",
          },
          {
            id: "stop",
            label: "Identify one thing you&apos;re going to STOP doing that violates one of the five rules.",
            hint: "&apos;Less volume, more intent&apos; usually means one specific workout you can&apos;t justify anymore.",
          },
        ]}
      />

      <Quiz
        questions={[
          {
            id: "q1",
            prompt:
              "You&apos;re 35, strong but inflexible. A coach offers a program with 5 strength days per week and no mobility work. What&apos;s the philosophy answer?",
            options: [
              "Take it. More strength days is more progress.",
              "Take it but add cardio.",
              "Pass. It violates &apos;train the whole envelope&apos; and will compound your inflexibility.",
              "Take it for one cycle only.",
            ],
            correct: 2,
            explain:
              "Programs that systematically skip a pillar are how long-term injuries are built. Even a 5-day strength block should have dedicated mobility.",
          },
          {
            id: "q2",
            prompt: "Which of these is a sign you&apos;re violating &apos;less volume, more intent&apos;?",
            options: [
              "You&apos;re hitting PRs every few weeks.",
              "Your sessions are 45-60 minutes.",
              "You&apos;re chronically sore but progress has stalled.",
              "You take a full rest day per week.",
            ],
            correct: 2,
            explain:
              "Chronic soreness plus stalled progress is the classic junk-volume signature. Cut sets, raise intent, reassess in 3 weeks.",
          },
          {
            id: "q3",
            prompt: "What&apos;s the strongest argument for &apos;consistency over peaks&apos;?",
            options: [
              "Peaks aren&apos;t fun.",
              "Durability compounds; peaks usually precede injuries or burnout.",
              "Coaches prefer consistency.",
              "It&apos;s easier.",
            ],
            correct: 1,
            explain:
              "The peak-and-crash cycle is the most common path to regression. Five steady years beats one great year followed by two injured ones.",
          },
        ]}
      />

      <Reflection
        prompt="Which of the five rules are you currently violating most? What does the violation actually look like in your week, and what would fixing it cost you?"
        minChars={120}
      />

      <CompleteModule
        nextPath="/fitness/m/weekly-split"
        nextLabel="Next: Weekly Split"
        requireChecklistKey={CHECKLIST_KEY}
        requireChecklistCount={CHECKLIST_COUNT}
      />
    </Lesson>
  );
}
