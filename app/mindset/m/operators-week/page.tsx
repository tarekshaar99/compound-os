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

const CHECKLIST_KEY = "operators-week-actions";
const CHECKLIST_COUNT = 4;

export default async function Page() {
  const gate = await enforceModule("mindset.operators-week");
  if (gate) return gate;

  return (
    <Lesson
      moduleId="mindset.operators-week"
      pillar="mindset"
      title="The Operator's Week"
      subtitle="Monday through Sunday. How the three pillars interlock in a real schedule instead of three separate habits competing for your attention."
      estMinutes={15}
    >
      <LessonSection title="What this is">
        <P>
          Three pillars are not three products. They are the same skill,
          practiced in three different domains: run a protocol you decided
          on before you were emotional, on a day you don&apos;t feel like
          running it. Capital. Body. Mind. Same discipline.
        </P>
        <P>
          This module is the capstone. It lays out what a real week looks
          like when the three pillars share a calendar instead of competing
          for one. By the end, you should have a schedule you could hand to
          someone else and have them execute cold.
        </P>
      </LessonSection>

      <Principle>
        If the three pillars don&apos;t share a calendar, they fight each
        other for time. The operator&apos;s week is whatever schedule lets
        all three get their reps in without any of them collapsing.
      </Principle>

      <LessonSection title="The three anchors that hold the week together">
        <P>
          1. The morning anchor. The first sixty to ninety minutes after
          waking are the hardest and most valuable block of your day. No
          phone in the bedroom. Water, light, move, then the single most
          important piece of cognitive work before any calls or inputs.
          This is where Daily Discipline pillar meets trading prep.
        </P>
        <P>
          2. The training anchor. Three strength sessions and two to three
          cardio sessions per week, non-negotiable days, same times. If
          your training slot drifts, it eventually disappears. Tuesday noon
          is a better strength day than &quot;whenever I can.&quot;
        </P>
        <P>
          3. The Sunday anchor. Thirty minutes every Sunday, same seat,
          same template. The weekly trading review, the plan for the week
          ahead, and a scan of the three prompts from Structured
          Journaling. Without this, nothing compounds; every week starts
          from scratch.
        </P>
      </LessonSection>

      <Example title="A real operator's week">
        <P>
          <strong>Monday</strong>. 06:45 wake, no phone. Water, daylight,
          ten minute mobility, two espresso. 07:30 to 09:00 hardest
          cognitive block. 09:00 to 12:00 meetings and work. 12:00 to
          13:15 lower-body strength session. 13:30 lunch, inbox. 18:30
          shutdown ritual, three lines in the journal, phone out of
          bedroom by 22:00.
        </P>
        <P>
          <strong>Tuesday</strong>. Same morning anchor. 12:00 to 13:00
          Zone 2 cardio, conversational pace, nasal breathing. 17:00
          fifteen minute scan of market positions, pre-trade checklist
          for any new idea, no impulse trades.
        </P>
        <P>
          <strong>Wednesday</strong>. Upper-body strength at 12:00. Three
          lines of structured journaling at 21:00: what did future me
          appreciate today, what will future me resent, smallest lever for
          tomorrow.
        </P>
        <P>
          <strong>Thursday</strong>. Intervals if recovery is green, rest
          walk if it is yellow, rest if it is red. Emotional regulation
          check after market close if there was a loss: name the feeling,
          breathe it through, decide after the feeling, never during.
        </P>
        <P>
          <strong>Friday</strong>. Full-body strength, short and heavy.
          Position review at end of session, no new trades after Friday
          close unless the checklist clears.
        </P>
        <P>
          <strong>Saturday</strong>. Optional easy movement. Family,
          friends, fun. Zero trading, zero screens before noon.
        </P>
        <P>
          <strong>Sunday</strong>. Thirty minute review at the same chair.
          Six questions from the Weekly Review Ritual for trading. Three
          prompts from Structured Journaling. Scan next week&apos;s
          calendar: training slots, hard work blocks, anchor times.
          Commit.
        </P>
      </Example>

      <LessonSection title="How the pillars reinforce each other in one week">
        <P>
          Training on Tuesday at the same time means you never ask
          &quot;should I train today.&quot; That same muscle, applied to
          trading, is what makes you close a position at the pre-committed
          invalidation level instead of negotiating with the chart.
        </P>
        <P>
          The Sunday review is one ritual, not three. Trading P&amp;L,
          training compliance, and the journal prompts sit on the same
          page. If one is red three weeks in a row, it gets attention
          before the one that is green.
        </P>
        <P>
          The morning anchor holds everything else up. Lose it and
          training slips, then the weekly review slips, then trading
          discipline slips. Protect the morning anchor the way a
          professional protects their first hour.
        </P>
      </LessonSection>

      <Mistakes
        items={[
          "Treating the three pillars as three separate projects with three separate calendars. They need one calendar or one of them always loses.",
          "Skipping the Sunday review because nothing bad happened that week. The Sunday review is the feedback loop; skip it and the next three weeks don't know what to adjust.",
          "Letting training drift to 'whenever.' Same days, same times, written into the calendar as blocks you cannot move without the same friction as a business meeting.",
          "Using the morning anchor for reactive work (inbox, messages, news). The anchor is for the one thing that is most important and most likely to slip if it's not done before the day starts.",
          "Over-scheduling the week into one-hour blocks. A real operator's week has white space. The discipline is in protecting the anchors, not in filling every slot.",
        ]}
      />

      <Checklist
        title="Build your operator's week"
        storageKey={CHECKLIST_KEY}
        items={[
          {
            id: "morning-anchor",
            label: "Write down the exact time you wake tomorrow, and the first three actions (no phone is action zero).",
            hint: "Sixty to ninety minutes of morning anchor time. Water, daylight, move, then the hardest cognitive work.",
          },
          {
            id: "training-slots",
            label: "Put three strength sessions and two cardio sessions into your calendar as recurring weekly blocks.",
            hint: "Same days, same times, written as blocks. If they are not in the calendar, they will not happen.",
          },
          {
            id: "sunday-review",
            label: "Block a thirty-minute Sunday review slot, same chair, same time, weekly.",
            hint: "Six questions from Weekly Review Ritual. Three prompts from Structured Journaling. Scan next week.",
          },
          {
            id: "shutdown",
            label: "Commit in writing to a three-minute evening shutdown: one thing done, one thing tomorrow, phone out of bedroom.",
            hint: "The shutdown is what lets the morning anchor work. Without it, the next morning starts from rubble.",
          },
        ]}
      />

      <Quiz
        questions={[
          {
            id: "q1",
            prompt: "Your training has drifted to 'whenever I can fit it in' for three weeks in a row. Which anchor is the correct first fix?",
            options: [
              "Buy a new training program.",
              "Put three strength sessions on the calendar as recurring blocks, same days, same times, for next week.",
              "Cut calories to stay lean while training less.",
              "Switch to home workouts until life calms down.",
            ],
            correct: 1,
            explain:
              "Drift is a scheduling problem, not a program problem. The fix is always to put the sessions back into the calendar as non-negotiable recurring blocks.",
          },
          {
            id: "q2",
            prompt: "You skipped the Sunday review for two weeks because 'nothing bad happened.' What's the cost?",
            options: [
              "Nothing. If nothing happened, there's nothing to review.",
              "You lost the feedback loop, so the next three weeks will adjust based on vibes instead of data.",
              "You saved thirty minutes.",
              "You proved you don't need a weekly review.",
            ],
            correct: 1,
            explain:
              "The Sunday review's value is not in reviewing what happened; it's in calibrating what happens next. Skip it and the next weeks run blind.",
          },
          {
            id: "q3",
            prompt: "What is the actual purpose of the morning anchor?",
            options: [
              "To feel productive.",
              "To 'optimize' your routine with as many habits as possible.",
              "To protect the single hardest piece of cognitive work from the day's noise.",
              "To journal.",
            ],
            correct: 2,
            explain:
              "The morning anchor exists to protect one hard thing. Everything else, phone, inbox, news, can wait. If the one hard thing slips, the whole day is reactive.",
          },
        ]}
      />

      <Reflection
        prompt="Write out your ideal operator's week, Monday through Sunday. Include morning anchor times, training slots, Sunday review time, and evening shutdown. Be specific. Short is fine; vague is not."
        minChars={180}
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
