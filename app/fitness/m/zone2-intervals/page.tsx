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

const CHECKLIST_KEY = "zone2-actions";
const CHECKLIST_COUNT = 3;

export default async function Page() {
  const gate = await enforceModule("fitness.zone2-intervals");
  if (gate) return gate;

  return (
    <Lesson
      moduleId="fitness.zone2-intervals"
      pillar="fitness"
      title="Zone 2 and Intervals"
      subtitle="The cardio structure: how much Zone 2, how many intervals, and how to know which one to do today."
      estMinutes={13}
    >
      <LessonSection title="What this is">
        <P>
          Cardio gets confused in most fitness circles because people treat
          it as one thing. It's two. Low intensity (Zone 2) builds the
          aerobic base that lets you recover between everything else. High
          intensity (intervals) moves V02max, which is the single
          best-validated metric for healthspan.
        </P>
        <P>
          You need both. The trick is doing them in the right ratio and
          actually staying in the right zone.
        </P>
      </LessonSection>

      <Principle>
        Zone 2 is supposed to feel almost too easy. Intervals are supposed
        to feel honestly hard. Most retail fitness is stuck in the middle,
        which is where you get tired without getting fitter.
      </Principle>

      <LessonSection title="Zone 2: the base">
        <P>
          <strong>Definition:</strong> aerobic intensity where you're
          breathing through your nose, or can speak full sentences without
          gasping. Heart rate roughly 60-70% of max, though nasal-breath
          test is more reliable than any formula.
        </P>
        <P>
          <strong>Dose:</strong> 45-60 minutes, once per week minimum, twice
          ideal. Bike, easy run, brisk hike, incline walk on treadmill.
        </P>
        <P>
          <strong>The feel test:</strong> if you finish and feel slightly
          better than you started, you did Zone 2. If you finish tired, you
          were in Zone 3, which does little for the base and costs real
          recovery.
        </P>
      </LessonSection>

      <LessonSection title="Intervals: the V02max driver">
        <P>
          <strong>Format:</strong> 4-6 rounds of 3-4 minutes hard, 3-4
          minutes easy. Total session 20-30 minutes plus warm-up.
        </P>
        <P>
          <strong>Effort:</strong> during the hard interval, you can say
          maybe 3 words without gasping. It's meant to be
          uncomfortable. If you're chatting, you're not in
          interval pace.
        </P>
        <P>
          <strong>Dose:</strong> once per week. Twice if you're
          specifically chasing fitness gains and not in a heavy strength
          cycle.
        </P>
      </LessonSection>

      <Example title="A real interval session">
        <P>
          10-minute easy warm-up on the bike.
        </P>
        <P>
          5 rounds of: 3 minutes at ~85% max effort ("hard enough that
          you can't hold it much longer than 3 minutes"), 3
          minutes easy.
        </P>
        <P>
          5-minute cooldown.
        </P>
        <P>
          Total: 45 minutes, 15 minutes of actual work, V02max meaningfully
          stimulated.
        </P>
      </Example>

      <Mistakes
        items={[
          "Running Zone 2 too hard. The most common mistake. Wearing a heart rate strap once is the cheapest education you can buy.",
          "Running intervals too soft. If it's comfortable, it's not intervals. The hard interval needs to be honestly hard.",
          "Doing intervals twice a week while also doing 5 strength days. Stacked stress. Either the strength program suffers or a knee/hip gives up.",
          "Chasing distance or speed in Zone 2. The point is time in zone. A slow Zone 2 session is not a failed run, it's the point.",
          "Treating a steady jog that's neither Zone 2 nor intervals as 'the workout.' Call it recovery if you must, but don't count it as either.",
        ]}
      />

      <Checklist
        title="Actions to complete this module"
        storageKey={CHECKLIST_KEY}
        items={[
          {
            id: "plan",
            label: "Pick the day for Zone 2 and the day for intervals for the next 4 weeks.",
            hint: "Put them on the calendar. Anything without a scheduled slot doesn't happen.",
          },
          {
            id: "hr-or-nose",
            label: "Choose your effort gauge: heart rate strap, nasal breath test, or talk test. Use it every session.",
            hint: "Nasal breath test is free and nearly as good. Any gauge beats guessing.",
          },
          {
            id: "first-session",
            label: "Run one Zone 2 session this week at the correct pace. It will probably feel almost embarrassingly easy.",
            hint: "If you finish and you're barely breathing hard, that's Zone 2. Congrats.",
          },
        ]}
      />

      <Quiz
        questions={[
          {
            id: "q1",
            prompt: "How do you know in real time that you're in Zone 2?",
            options: [
              "You feel exhausted afterward.",
              "You can't speak.",
              "You can speak full sentences, or breathe through your nose the entire session.",
              "You burn at least 500 calories.",
            ],
            correct: 2,
            explain:
              "Full-sentence speech or sustained nasal breathing is the most reliable cue. If either breaks, slow down.",
          },
          {
            id: "q2",
            prompt: "You're running 3-minute hard intervals and you find yourself chatting with a partner during the hard block. What's happening?",
            options: [
              "Your V02max is excellent.",
              "You're not actually at interval effort. Increase the hard block until conversation is not possible.",
              "The interval is fine, just shorter recovery.",
              "You're over-trained.",
            ],
            correct: 1,
            explain:
              "Intervals only work if the hard block is honestly hard. Chatting = middle zone = worst of both worlds.",
          },
          {
            id: "q3",
            prompt: "You have one cardio day this week. You feel a little beat up from strength. Which session should you do?",
            options: [
              "Intervals, to feel better.",
              "Zone 2, because it actively aids recovery and builds base.",
              "Skip cardio.",
              "Max effort sprint session.",
            ],
            correct: 1,
            explain:
              "Zone 2 is the session that coexists best with heavy strength. Intervals stack stress and can blow up your recovery.",
          },
        ]}
      />

      <Reflection
        prompt="Which of your past 'cardio' sessions were actually Zone 2, and which were middle-zone tiredness? What's the session you're going to stop doing?"
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
