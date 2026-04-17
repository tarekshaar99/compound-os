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

const CHECKLIST_KEY = "tut-actions";
const CHECKLIST_COUNT = 3;

export default async function Page() {
  const gate = await enforceModule("fitness.tut");
  if (gate) return gate;

  return (
    <Lesson
      moduleId="fitness.tut"
      pillar="fitness"
      title="Time Under Tension"
      subtitle="Why tempo matters more than weight. The TUT rules that stopped my injuries."
      estMinutes={12}
    >
      <LessonSection title="What this is">
        <P>
          Time under tension is how long the muscle is actually working
          during a set. A 5-rep set done in 8 seconds is a totally
          different stimulus than the same 5 reps done in 25 seconds. The
          second set builds muscle. The first one mostly builds ego.
        </P>
      </LessonSection>

      <Principle>
        The weight is what people watch. The tempo is what actually builds
        the body. Slow the eccentric, own the bottom, and the same bar
        weight does twice the work.
      </Principle>

      <LessonSection title="Tempo notation">
        <P>
          Tempo is written as 4 numbers: eccentric / bottom / concentric /
          top. Example: 3-1-1-0 means 3 seconds down, 1 second pause at
          bottom, 1 second up, no pause at top.
        </P>
      </LessonSection>

      <LessonSection title="The TUT rules">
        <P>
          <strong>1. Always control the eccentric.</strong> Minimum 2
          seconds on the way down for every lift. Dropping the bar is
          wasting the best growth stimulus in the rep.
        </P>
        <P>
          <strong>2. Add a pause in the stretched position.</strong> 1
          second at the bottom of the squat, bottom of the bench, stretched
          hamstring on a deadlift. Pauses kill momentum and build real
          strength.
        </P>
        <P>
          <strong>3. Own the concentric, don't explode it unless the
          program calls for it.</strong> Controlled concentric = better
          bar path = fewer injuries. Speed work is a tool for a specific
          cycle, not a default.
        </P>
        <P>
          <strong>4. Target 40-70 seconds of total TUT per working set for
          hypertrophy.</strong> That's the window where mechanical
          tension meets metabolic stress.
        </P>
      </LessonSection>

      <Example title="The same exercise, two ways">
        <P>
          <strong>Before:</strong> Back squat 225 for 8. Set done in 15
          seconds. No pauses, bounces out of the hole. Feels hard for 10
          seconds, then recovers in 30. Joint angles are a mess.
        </P>
        <P>
          <strong>After:</strong> Back squat 185 for 8 at 3-1-1-0 tempo.
          Set done in 40 seconds. Every rep is controlled down, 1-second
          pause, stand clean. Feels harder, joints feel better, growth
          stimulus much higher. Takes weeks off the injury list.
        </P>
      </Example>

      <Mistakes
        items={[
          "Using TUT as an excuse to go too light forever. Progressive overload still matters. Add weight when the tempo stays clean.",
          "Pausing everywhere without intent. The pause is at the stretched position, not the top. Pauses at lockout just waste the set.",
          "Reading tempo numbers as mandatory for every set. Main lifts deserve tempo discipline. Accessories can sometimes just be controlled without a stopwatch.",
          "Making every session a tempo experiment. Pick tempos for a training block and keep them stable so you can actually compare week to week.",
        ]}
      />

      <Checklist
        title="Actions to complete this module"
        storageKey={CHECKLIST_KEY}
        items={[
          {
            id: "pick",
            label: "Pick tempos for your main lifts for the next 4 weeks. Write them next to the lift.",
            hint: "3-1-1-0 is a safe default for squat/bench. 3-0-1-0 for deadlift. 4-1-2-0 for pulling movements.",
          },
          {
            id: "deload",
            label: "Drop working weight by 10-20% this week so you can actually hit the tempo clean.",
            hint: "You are not weaker. You are now doing a harder stimulus. Ego is the only thing taking a hit.",
          },
          {
            id: "record",
            label: "Record one set per session. Watch it back. Are you actually hitting the tempo?",
            hint: "People overestimate their tempo control by about 40%. The camera is the honest friend.",
          },
        ]}
      />

      <Quiz
        questions={[
          {
            id: "q1",
            prompt: "Your tempo is 3-1-1-0. What does the 1 mean?",
            options: [
              "1 second at the top of the rep.",
              "1 second pause at the bottom/stretched position.",
              "1 rep per second.",
              "1 minute rest between sets.",
            ],
            correct: 1,
            explain:
              "The format is eccentric-bottom-concentric-top. The middle 1 is the bottom pause.",
          },
          {
            id: "q2",
            prompt: "You used to squat 225x8. You're now doing 185x8 with a 3-second eccentric and 1-second pause. Are you weaker?",
            options: [
              "Yes.",
              "No, the second stimulus is significantly harder and builds more tissue. Your strength across all rep tempos is improving.",
              "It's identical.",
              "Depends on body weight.",
            ],
            correct: 1,
            explain:
              "Controlled reps with pauses are dramatically harder than bounced reps. Same outcome weight is a real strength increase, not a decrease.",
          },
          {
            id: "q3",
            prompt: "Which part of the rep should you always control, no matter the lift?",
            options: [
              "The concentric.",
              "The top hold.",
              "The eccentric (lowering phase).",
              "The setup.",
            ],
            correct: 2,
            explain:
              "Eccentric control is the single biggest upgrade most people can make. It builds muscle, protects joints, and exposes form breakdowns early.",
          },
        ]}
      />

      <Reflection
        prompt="Which of your main lifts has the worst current tempo? What weight would you need to drop to and what tempo would you impose to fix it?"
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
