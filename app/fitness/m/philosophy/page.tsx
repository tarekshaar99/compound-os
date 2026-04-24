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
          Bodybuilders who don't run. Runners who can't squat.
          CrossFit boxes full of shoulder injuries. The hybrid athlete
          philosophy rejects all of it. You want to be strong, conditioned,
          mobile, and durable at forty and at sixty.
        </P>
        <P>
          This module sets the rules that govern every subsequent decision:
          how often to train, how hard, how long, and what to stop doing.
        </P>
      </LessonSection>

      <LessonSection title="The vocabulary first">
        <P>
          A handful of terms show up in every fitness module. If any of
          these are new, read this section slowly. The rest of the pillar
          assumes you know them.
        </P>
        <dl className="mt-6 space-y-4">
          {[
            {
              term: "RPE (Rate of Perceived Exertion)",
              body:
                "A 1 to 10 scale for how hard a set felt. RPE 8 means you could have done two more clean reps but not three. Most productive strength work lives at RPE 7 to 9. RPE 10 is failure, which you rarely need.",
            },
            {
              term: "Tempo",
              body:
                "The speed of each phase of a rep, written as four digits. Example: a 3-1-2-0 squat means 3 seconds down (eccentric), 1 second pause at the bottom, 2 seconds up (concentric), 0 seconds at the top. Controlled tempo is the single fastest way to build muscle without wrecking joints.",
            },
            {
              term: "Eccentric",
              body:
                "The lowering phase of a lift - lowering the bar in a bench press, or sitting into the bottom of a squat. This is where most muscle is built and most injuries happen. Controlling it is non-negotiable.",
            },
            {
              term: "Concentric",
              body:
                "The lifting phase - pressing the bar up, standing out of the squat. Fast concentric is fine. Fast eccentric is not.",
            },
            {
              term: "Heart rate zones",
              body:
                "Five rough bands of effort based on heart rate. Zone 1 is walking. Zone 2 is a steady effort you can hold a conversation in (roughly 60 to 70 percent of max heart rate) - the aerobic base builder. Zone 3 is uncomfortable steady. Zone 4 is hard (threshold). Zone 5 is all-out intervals. Most of your cardio should be Zone 2, with a smaller amount of Zone 4 and 5.",
            },
            {
              term: "Intervals",
              body:
                "Short, hard efforts (30 seconds to 4 minutes) with rest in between. Builds VO2 max, anaerobic capacity, and raw engine. Used sparingly - one or two sessions a week on top of your Zone 2 base.",
            },
            {
              term: "Accessories",
              body:
                "Secondary lifts done after the main compound movement. Example: after bench press, doing cable flies and tricep pushdowns. Accessories build muscle and fix weak points that the main lift alone can't address.",
            },
            {
              term: "VO2 max",
              body:
                "The maximum amount of oxygen your body can use during hard exercise. It is one of the strongest predictors of long-term health and longevity. It drops with age unless you train it, and interval work is how you train it.",
            },
          ].map((t) => (
            <div
              key={t.term}
              className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card-bg)]"
            >
              <dt className="text-[15px] font-semibold text-[var(--text-primary)] tracking-tight mb-1.5">
                {t.term}
              </dt>
              <dd className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                {t.body}
              </dd>
            </div>
          ))}
        </dl>
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
          numbers. If you can't control it down, you don't own
          the weight.
        </P>
        <P>
          <strong>3. Train the whole envelope.</strong> Strength, Zone 2,
          intervals, mobility, recovery. One of these skipped for months
          is where injury or burnout starts.
        </P>
        <P>
          <strong>4. Recovery is training.</strong> Sleep, food, and off
          days aren't interruptions to the plan. They are the plan.
          You don't get stronger in the gym, you get stronger
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
          year, you're stronger, leaner, and moving better than 99
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
            hint: "The honest count tells you which of the five rules you're already living and which you're pretending to.",
          },
          {
            id: "sleep",
            label: "Write down your average sleep hours for the last 7 days.",
            hint: "If it's under 7, the fastest training upgrade available to you is sleep, not a new program.",
          },
          {
            id: "stop",
            label: "Identify one thing you're going to STOP doing that violates one of the five rules.",
            hint: "'Less volume, more intent' usually means one specific workout you can't justify anymore.",
          },
        ]}
      />

      <Quiz
        questions={[
          {
            id: "q1",
            prompt:
              "You're 35, strong but inflexible. A coach offers a program with 5 strength days per week and no mobility work. What's the philosophy answer?",
            options: [
              "Take it. More strength days is more progress.",
              "Take it but add cardio.",
              "Pass. It violates 'train the whole envelope' and will compound your inflexibility.",
              "Take it for one cycle only.",
            ],
            correct: 2,
            explain:
              "Programs that systematically skip a pillar are how long-term injuries are built. Even a 5-day strength block should have dedicated mobility.",
          },
          {
            id: "q2",
            prompt: "Which of these is a sign you're violating 'less volume, more intent'?",
            options: [
              "You're hitting PRs every few weeks.",
              "Your sessions are 45-60 minutes.",
              "You're chronically sore but progress has stalled.",
              "You take a full rest day per week.",
            ],
            correct: 2,
            explain:
              "Chronic soreness plus stalled progress is the classic junk-volume signature. Cut sets, raise intent, reassess in 3 weeks.",
          },
          {
            id: "q3",
            prompt: "What's the strongest argument for 'consistency over peaks'?",
            options: [
              "Peaks aren't fun.",
              "Durability compounds; peaks usually precede injuries or burnout.",
              "Coaches prefer consistency.",
              "It's easier.",
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
