import { enforceModule } from "../../../components/module/ModuleGate";
import {
  Lesson,
  LessonSection,
  P,
  Principle,
  Mistakes,
} from "../../../components/module/Lesson";
import {
  Checklist,
  Reflection,
  CompleteModule,
} from "../../../components/module/Interactive";

export const dynamic = "force-dynamic";

const CHECKLIST_KEY = "peptides-actions";
const CHECKLIST_COUNT = 3;

export default async function Page() {
  const gate = await enforceModule("fitness.peptides-note");
  if (gate) return gate;

  return (
    <Lesson
      moduleId="fitness.peptides-note"
      pillar="fitness"
      title="Peptides: An Honest Note"
      subtitle="What they are, why people look into them, and the risks. Educational, conservative, not medical advice."
      estMinutes={8}
    >
      <LessonSection title="What this is (and isn&apos;t)">
        <P>
          This is not a protocol. It is not a recommendation. I am not
          your doctor. This module exists because peptides are a growing
          grey-market category in fitness circles and most of what&apos;s
          online is either hype from sellers or reflexive dismissal. You
          deserve a sober, conservative note on what they are, what
          they&apos;re being used for, and why caution is the right
          default.
        </P>
        <P>
          Nothing in this module tells you to take anything. The goal is
          that if you ever decide to, you go in with your eyes open and a
          qualified physician on your side.
        </P>
      </LessonSection>

      <Principle>
        The number one rule of anything injectable, prescription, or
        research-grade is: if you wouldn&apos;t explain it out loud to
        your doctor, you shouldn&apos;t be putting it in your body. The
        second rule: the marketing is always ahead of the evidence.
      </Principle>

      <LessonSection title="What peptides actually are">
        <P>
          Peptides are short chains of amino acids, shorter than proteins.
          Some are used in approved medicines (insulin, GLP-1 agonists like
          semaglutide). Many others are sold on grey markets as
          &quot;research chemicals&quot; for use cases that are off-label
          or entirely unstudied in humans.
        </P>
        <P>
          The label &quot;peptide&quot; is broad. It includes things with
          decades of human data and things with almost none. Lumping them
          together is the first trap.
        </P>
      </LessonSection>

      <LessonSection title="Why people look into them">
        <P>
          Common stated goals: faster recovery from training, sleep
          quality, body composition changes, injury healing, metabolic
          effects. Some of these goals have legitimate pharmaceutical
          tools behind them. Most grey-market products do not.
        </P>
      </LessonSection>

      <LessonSection title="The risks, honestly">
        <P>
          <strong>Sourcing.</strong> Grey-market vials are often not what
          they say on the label. Purity, dosage, and contamination are all
          unknowns. Third-party testing is rare. Injecting an unknown
          liquid into yourself is as bad an idea as it sounds.
        </P>
        <P>
          <strong>Data.</strong> Many popular peptides have zero long-term
          human trials. You&apos;re the trial.
        </P>
        <P>
          <strong>Interactions.</strong> Peptides can interact with
          medications and conditions in ways the internet will not tell
          you. A single conversation with a physician who actually
          understands this class is worth more than a hundred forum posts.
        </P>
        <P>
          <strong>Legality.</strong> Many are in a grey zone. Crossing
          borders with them is a real problem. Getting caught is a real
          problem.
        </P>
        <P>
          <strong>Psychology.</strong> The real risk isn&apos;t usually
          the compound. It&apos;s the mindset shift from &quot;train and
          recover hard&quot; to &quot;train and pharma hard.&quot; Once
          that mindset is installed, it rarely retreats to just one thing.
        </P>
      </LessonSection>

      <Mistakes
        items={[
          "Treating &apos;peptides&apos; as one thing. GLP-1 meds prescribed by a doctor are different from a vial of something-GHRP from an online store. Different risk profiles entirely.",
          "Using fitness influencers as your primary source. They are paid. Their protocols are their marketing.",
          "Chasing peptides before the free, zero-risk levers are handled. Sleep, food, consistency. If those are not dialed, there is no peptide that will rescue you.",
          "Skipping bloodwork before and during. If you&apos;re going to do anything that alters biology, you track biology. Baseline labs, re-checked.",
          "Self-diagnosing the problem peptides are supposedly solving. &apos;Low recovery&apos; or &apos;low energy&apos; are often sleep debt, not endocrine deficiency.",
        ]}
      />

      <Checklist
        title="If you&apos;re even considering this category"
        storageKey={CHECKLIST_KEY}
        items={[
          {
            id: "doctor",
            label: "Find a physician who is actually literate in this area and book a consultation.",
            hint: "Not a clinic with a glossy brochure. A real MD you can have a grown-up conversation with.",
          },
          {
            id: "labs",
            label: "Get baseline bloodwork done: CBC, metabolic panel, lipids, hormones, inflammation markers.",
            hint: "You cannot manage what you don&apos;t measure. This is useful data regardless of what you do next.",
          },
          {
            id: "basics",
            label: "Confirm the free levers (sleep, protein, consistency, deloads) are actually dialed for 90 days first.",
            hint: "If they are not, you are skipping the foundation for an advanced tool. The foundation is where 95% of the results live.",
          },
        ]}
      />

      <Reflection
        prompt="What is the real problem you&apos;re trying to solve? Be specific. Then write which of the foundational levers (sleep, food, training consistency, stress) you haven&apos;t actually exhausted yet."
        minChars={120}
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
