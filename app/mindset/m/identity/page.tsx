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

const CHECKLIST_KEY = "identity-actions";
const CHECKLIST_COUNT = 3;

export default async function Page() {
  const gate = await enforceModule("mindset.identity");
  if (gate) return gate;

  return (
    <Lesson
      moduleId="mindset.identity"
      pillar="mindset"
      title="Identity and Self-Image"
      subtitle="You act out the person you believe you are. Change the story, change the behavior."
      estMinutes={11}
    >
      <LessonSection title="What this is">
        <P>
          Behavior change through willpower fails because it treats every
          choice as a fresh battle against your self-image. The operator
          approach is to change the self-image first. Then the behavior
          falls out of the identity, rather than being fought for every
          day.
        </P>
      </LessonSection>

      <Principle>
        You don't rise to the level of your goals. You fall to the
        level of your identity. The question isn't "how do I do
        this thing?" It's "who is the kind of person for
        whom this thing is automatic?"
      </Principle>

      <LessonSection title="How identity actually works">
        <P>
          Your identity is the running set of stories you believe about
          yourself: "I'm disciplined," "I'm
          impulsive," "I'm not a morning person,"
          "I can't stick to anything."
        </P>
        <P>
          These stories run silently, below awareness, and they pick your
          behavior for you in moments of friction. The moment you're
          tired, stressed, or bored, the identity kicks in and chooses.
          Willpower never gets a vote.
        </P>
        <P>
          This is why people who try to "be more disciplined"
          while still privately believing they're lazy almost always
          regress. The stated goal is at war with the identity. The
          identity always wins.
        </P>
      </LessonSection>

      <LessonSection title="The rewrite process">
        <P>
          <strong>Step one: name the identity you're running.</strong>
          Not the one you want. The one that's actually picking your
          behavior right now. Be brutal. "I'm someone who avoids
          hard conversations." "I'm someone who trades when
          bored." "I'm someone who starts things and quits
          at the first friction."
        </P>
        <P>
          <strong>Step two: write the counter-identity.</strong> Not a
          goal. An is statement. "I'm someone who has hard
          conversations early." "I'm an operator who only
          trades setups." "I'm someone who finishes what I
          start."
        </P>
        <P>
          <strong>Step three: pick one tiny behavior that proves the new
          identity.</strong> Not a transformation. A rep. One rep per day
          for two weeks builds more identity than a dramatic single gesture.
        </P>
      </LessonSection>

      <Example title="A real rewrite">
        <P>
          Old identity: "I can't stick to a training plan."
        </P>
        <P>
          New identity: "I'm a hybrid athlete who trains three
          times a week."
        </P>
        <P>
          Proving behavior: show up to the gym three times this week. Do
          the session as written. Don't extend it, don't skip
          it. You are now acting out the identity, which quietly updates
          the story.
        </P>
        <P>
          Two weeks of this is worth more than two years of affirmations.
        </P>
      </Example>

      <Mistakes
        items={[
          "Writing identity statements that are aspirational but obviously false. 'I'm a disciplined operator' when your week says otherwise gets laughed at by your unconscious. Start from something nearly true and move the line.",
          "Trying to rewrite ten identities at once. You have bandwidth for one active identity rewrite at a time. Pick the one with highest leverage.",
          "Confusing identity with performance. You don't need to be world-class. You need a self-story that supports consistent action.",
          "Announcing the new identity publicly before reps accumulate. Social rewards for declaring an identity often satisfy the brain enough that the actual behavior stalls.",
        ]}
      />

      <Checklist
        title="Actions to complete this module"
        storageKey={CHECKLIST_KEY}
        items={[
          {
            id: "old",
            label: "Write the single identity story that's costing you the most. The one your behavior keeps proving true.",
            hint: "If it stings a little, you're close to the real one.",
          },
          {
            id: "new",
            label: "Write the counter-identity as an is statement, no more than 10 words.",
            hint: "\u201CI want to be...\u201D is a goal, not an identity. \u201CI am someone who...\u201D is identity.",
          },
          {
            id: "rep",
            label: "Pick one small behavior that proves the new identity, and do it today.",
            hint: "Tiny beats dramatic. One rep today beats a plan for a transformation tomorrow.",
          },
        ]}
      />

      <Quiz
        questions={[
          {
            id: "q1",
            prompt: "Which of these is an identity statement, not a goal?",
            options: [
              "I want to lose 20 pounds.",
              "I'm trying to be more disciplined.",
              "I'm someone who trains three times a week.",
              "My goal is to read more books.",
            ],
            correct: 2,
            explain:
              "Identity statements are is statements. They describe who you are, present tense.",
          },
          {
            id: "q2",
            prompt: "Why does willpower-based behavior change tend to fail?",
            options: [
              "Because people are lazy.",
              "Because stated goals conflict with the underlying identity, and identity wins under stress.",
              "Because goals aren't big enough.",
              "Because habits are harder than they look.",
            ],
            correct: 1,
            explain:
              "In friction moments, the identity picks. Willpower is a finite resource; identity is an operating system.",
          },
          {
            id: "q3",
            prompt: "You write a new identity: \u201CI'm a world-class trader.\u201D You have six months of inconsistent results. What's the problem?",
            options: [
              "Nothing. Aim high.",
              "The identity is too far from anything your evidence supports. Your unconscious rejects it. Pick an identity you can start proving today.",
              "You need to repeat it more.",
              "You should tell your friends.",
            ],
            correct: 1,
            explain:
              "Identities have to be proveable with near-term action. Aspirational identities that can't be proven get quietly dismissed and damage the whole rewrite process.",
          },
        ]}
      />

      <Reflection
        prompt="Write the identity story that's been costing you the most in the last year. Now write the replacement as an is statement. What's one rep you can do today that proves the replacement?"
        minChars={150}
      />

      <CompleteModule
        nextPath="/mindset/m/emotional-regulation"
        nextLabel="Next: Emotional Regulation"
        requireChecklistKey={CHECKLIST_KEY}
        requireChecklistCount={CHECKLIST_COUNT}
      />
    </Lesson>
  );
}
