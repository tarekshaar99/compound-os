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
  Reflection,
  CompleteModule,
} from "../../../components/module/Interactive";

export const dynamic = "force-dynamic";

const CHECKLIST_KEY = "journaling-actions";
const CHECKLIST_COUNT = 3;

export default async function Page() {
  const gate = await enforceModule("mindset.journaling");
  if (gate) return gate;

  return (
    <Lesson
      moduleId="mindset.journaling"
      pillar="mindset"
      title="Structured Journaling"
      subtitle="Not a diary. A feedback loop. The three prompts that surface the pattern you&apos;re running."
      estMinutes={9}
    >
      <LessonSection title="What this is">
        <P>
          Diary journaling is fine. It&apos;s just not the same product.
          Structured journaling is a tool for surfacing patterns you
          can&apos;t see from inside the week. Three prompts, five
          minutes, high signal.
        </P>
      </LessonSection>

      <Principle>
        You don&apos;t need to write more. You need to write the questions
        that force an honest answer.
      </Principle>

      <LessonSection title="The three prompts">
        <P>
          <strong>1. What did I do today that my future self will be glad
          about?</strong> This forces you to rank today&apos;s actions by
          long-term value rather than immediate comfort.
        </P>
        <P>
          <strong>2. What did I do today that my future self will resent?</strong>
          This is the prompt no one wants to answer. It&apos;s also the
          one that produces the most change. Be specific.
        </P>
        <P>
          <strong>3. What&apos;s the smallest lever I could pull
          tomorrow?</strong> Not the transformational one. The smallest
          one that moves the needle at all. Small levers, pulled daily,
          compound harder than big levers pulled occasionally.
        </P>
      </LessonSection>

      <Example title="A real entry">
        <P>
          <strong>Glad about:</strong> did the hard workout even though I
          didn&apos;t want to. Said no to the meeting that wasn&apos;t
          mine. Put phone away at 9 PM.
        </P>
        <P>
          <strong>Resent:</strong> spent 40 minutes on social media
          between 3 and 4 PM. Avoided the difficult conversation with M
          again. Had a drink I didn&apos;t need.
        </P>
        <P>
          <strong>Smallest lever tomorrow:</strong> put phone in other
          room for the 3 to 5 PM work block.
        </P>
        <P>
          Five minutes. Higher signal than an hour of stream-of-consciousness
          writing.
        </P>
      </Example>

      <Mistakes
        items={[
          "Writing to sound good. The journal only works if you&apos;re the only reader. If you&apos;re performing for a future self, a therapist, or anyone else, the data gets corrupted fast.",
          "Skipping on hard days. Hard days are the highest-value entries. The pattern is always louder under stress.",
          "Reading entries back only occasionally. Weekly skim of the past seven days is where the patterns actually pop. Without review, the entries are noise.",
          "Trying to journal for an hour. Five minutes daily beats an hour weekly. Compounding is frequency-dependent.",
        ]}
      />

      <Checklist
        title="Actions to complete this module"
        storageKey={CHECKLIST_KEY}
        items={[
          {
            id: "tool",
            label: "Pick a journaling tool and create a template with the three prompts.",
            hint: "Notes app, Notion, paper. The tool matters less than the template.",
          },
          {
            id: "time",
            label: "Anchor a 5-minute daily journaling time to an existing habit.",
            hint: "End of workday is the classic slot. Post-brushing-teeth also works.",
          },
          {
            id: "first",
            label: "Write today&apos;s entry right now. Three prompts. Five minutes.",
            hint: "Starting today is the entire point. Tomorrow doesn&apos;t exist yet.",
          },
        ]}
      />

      <Reflection
        prompt="Write one full structured entry for today right here. Three prompts, specific answers. Treat this as your first rep."
        minChars={200}
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
