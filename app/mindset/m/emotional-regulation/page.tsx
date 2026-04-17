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

const CHECKLIST_KEY = "regulation-actions";
const CHECKLIST_COUNT = 3;

export default async function Page() {
  const gate = await enforceModule("mindset.emotional-regulation");
  if (gate) return gate;

  return (
    <Lesson
      moduleId="mindset.emotional-regulation"
      pillar="mindset"
      title="Emotional Regulation"
      subtitle="The difference between a reactor and an operator. Naming, metabolizing, and responding rather than reacting."
      estMinutes={12}
    >
      <LessonSection title="What this is">
        <P>
          Emotional regulation isn't about feeling less. It's
          about not being hijacked. The operator feels the fear, names
          it, lets it move through the body, and then makes the decision
          from a clear place. The reactor skips the middle two steps.
        </P>
      </LessonSection>

      <Principle>
        You don't choose what you feel. You choose what you do next.
        The whole skill lives in the gap between those two things.
      </Principle>

      <LessonSection title="The three-part protocol">
        <P>
          <strong>1. Name it.</strong> Out loud or in writing. "I'm
          angry right now." "I'm afraid of looking
          stupid." Naming an emotion measurably reduces its intensity.
          It moves the feeling from the amygdala into language, which is
          the first step toward actually responding instead of reacting.
        </P>
        <P>
          <strong>2. Move through the body.</strong> Emotion is a physical
          event. It lives somewhere: chest, stomach, throat, jaw. Breathe
          into that spot, slow the exhale longer than the inhale, let the
          wave crest and fall. This takes 60 to 90 seconds if you stop
          fighting it.
        </P>
        <P>
          <strong>3. Respond from the other side.</strong> Now the
          decision. Not from the emotion, but informed by it. Emotions are
          signal, not instruction.
        </P>
      </LessonSection>

      <Example title="What this looks like live">
        <P>
          Market dropping. Your unrealized loss is $4,000 and growing.
          Chest tight, fingers hovering over the sell button.
        </P>
        <P>
          Reactor: clicks. Books the loss. Watches the market reverse
          fifteen minutes later.
        </P>
        <P>
          Operator: names it ("I'm panicking"), breathes
          through it (30 seconds, slow exhale), then asks the honest
          question: did my thesis actually break, or am I just
          uncomfortable? If thesis intact, hold. If broken, sell for real
          reasons, not panic.
        </P>
      </Example>

      <Mistakes
        items={[
          "Trying to think your way out of feelings. The body's first. Skip the body and you're running decisions on compromised hardware.",
          "Using 'I'm fine' as the first-level answer. You're never just fine. The willingness to name what's actually happening is the whole skill.",
          "Acting from the emotion while telling yourself you're being rational. Rationalization is the most common cover story for reactive behavior.",
          "Suppressing the emotion to look composed. It doesn't go away. It just runs silently in the background and picks a worse moment to drive the car.",
        ]}
      />

      <Checklist
        title="Actions to complete this module"
        storageKey={CHECKLIST_KEY}
        items={[
          {
            id: "identify",
            label: "Identify the emotional trigger you're most vulnerable to in your trading, training, or work.",
            hint: "For most traders it's watching green turn red. For most trainees it's feeling weak in the gym. For most workers it's a sharp email.",
          },
          {
            id: "rehearse",
            label: "Practice the three-part protocol on a mild emotion today before you need it in a real one.",
            hint: "Get frustrated at traffic. Name it. Breathe through it. Drive normally. That's the rep.",
          },
          {
            id: "rule",
            label: "Write one rule: when I notice [trigger], I pause for 90 seconds before I act. Put it somewhere visible.",
            hint: "Phone wallpaper, sticky note, journal. The rule only works if it's in front of you when you're hijacked.",
          },
        ]}
      />

      <Quiz
        questions={[
          {
            id: "q1",
            prompt: "You're angry at a colleague. What's the operator first step?",
            options: [
              "Tell them off immediately while it's fresh.",
              "Suppress it and act normal.",
              "Name it to yourself ('I'm angry'), feel where it lives in the body, breathe through it, then decide.",
              "Post about it online.",
            ],
            correct: 2,
            explain:
              "Naming reduces intensity. Feeling moves it through. Then, and only then, do you get to decide what to say.",
          },
          {
            id: "q2",
            prompt: "What's the difference between suppressing an emotion and regulating it?",
            options: [
              "No difference. Both end with not acting on it.",
              "Suppression hides it, regulation metabolizes it. Suppressed emotions pick worse moments to surface.",
              "Regulation is faster.",
              "Suppression is healthier long-term.",
            ],
            correct: 1,
            explain:
              "Regulation processes the energy. Suppression pushes it underground where it accumulates and drives behavior silently.",
          },
          {
            id: "q3",
            prompt: "You've named the emotion and breathed through it. The feeling is still there but softer. What now?",
            options: [
              "Wait for it to fully go away.",
              "Make the decision. Residual signal is fine; it's just no longer driving.",
              "Suppress and move on.",
              "Call someone.",
            ],
            correct: 1,
            explain:
              "You don't need the feeling gone. You need to not be driven by it. Making the call from the calmer side is the whole point.",
          },
        ]}
      />

      <Reflection
        prompt="Describe the last time an emotion hijacked a decision. What were the specific three-part steps you skipped? Where in the body did the emotion live?"
        minChars={150}
      />

      <CompleteModule
        nextPath="/mindset/m/discipline"
        nextLabel="Next: Daily Discipline"
        requireChecklistKey={CHECKLIST_KEY}
        requireChecklistCount={CHECKLIST_COUNT}
      />
    </Lesson>
  );
}
