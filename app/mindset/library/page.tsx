"use client";

import { useState } from "react";
import Link from "next/link";
import Paywall from "../../components/Paywall";

/**
 * The Operator's Playbook.
 *
 * Reference library for the Mindset pillar. Tool-first, no mysticism.
 * Paired with the Mindset modules, these are the templates, checklists, and
 * quick-references you come back to when you're running hot, running late,
 * or trying to build the habit without reading the full module again.
 */

interface Section {
  heading: string;
  content: string;
}

interface Category {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  color: string;
  intro: string;
  sections: Section[];
}

const categories: Category[] = [
  {
    id: "daily-os",
    icon: "\u25C6",
    title: "Daily Operating System",
    subtitle: "Morning anchor, evening shutdown, defaults",
    color: "#A78BFA",
    intro:
      "The operator's day has a spine. A protected morning, a decided middle, a deliberate shutdown. Everything else is noise. This is the reference for building and protecting that spine: exactly what goes where, and what to fall back on when the day fights you.",
    sections: [
      {
        heading: "The Morning Anchor (First 60-90 Minutes)",
        content: `The first hour of your day is the most valuable and the most vulnerable. If it slips, the day slips with it. Protect it like a meeting with your most important client.

Rule zero: no phone in the bedroom. Not on airplane mode on the nightstand. Not "just to check the alarm." Out of the room. The moment you open a screen before you open your own mind, the day belongs to someone else.

The six-step morning template:
1. Wake at the same time, seven days a week, within 30 minutes. Consistency beats heroics.
2. Water. 500ml before anything else.
3. Daylight. Ten minutes of direct outdoor light if possible, or the brightest light available. This sets the entire circadian system.
4. Move. Ten minutes of mobility, a short walk, or light stretching. No intensity required.
5. The hardest cognitive block. Sixty to ninety minutes on the single most important piece of work. Not email. Not news. Not Slack. The thing that moves your life forward.
6. Only then: phone, inbox, meetings.

If you get the first 90 minutes right four days a week, the other three days can collapse and you are still ahead of the person who never gets them right once.`,
      },
      {
        heading: "The Evening Shutdown (Three Minutes)",
        content: `The evening shutdown is a three-minute ritual that makes the next morning possible. Skip it and tomorrow starts from rubble.

Three questions, written by hand:
1. What is one thing I did today that future me will appreciate?
2. What is the one thing I want to do tomorrow before anything else?
3. What would stop me from doing it, and how do I remove that obstacle now?

Then four physical actions:
1. Phone out of the bedroom.
2. Room temperature drop if possible (cooler room = better sleep).
3. Lay out clothes for tomorrow if training is on the schedule.
4. Lights off within 30 minutes of a fixed bedtime, same time every night.

The shutdown closes today. Without closure, tomorrow inherits today's mess. With it, tomorrow starts with a clear head and a decided first move.`,
      },
      {
        heading: "Non-Negotiables (The Five Defaults)",
        content: `Non-negotiables are the things that happen regardless of mood, motivation, or weather. You do not decide them each day. They are already decided.

The five defaults for any operator:
1. A wake time (same every day within 30 minutes).
2. A training schedule (three strength slots and two to three cardio slots, blocked in the calendar as recurring).
3. A weekly review (thirty minutes, same chair, same Sunday time).
4. A journal practice (three lines a night, not a page).
5. A bedtime (a fixed target within 30 minutes, every night).

Write all five in one place. Read them every Sunday. If any one of them has slipped for more than two weeks, it is the first thing to fix before adding anything else.

Non-negotiables are negotiable only on emergencies. Travel is not an emergency. A busy week is not an emergency. Feeling tired is not an emergency. The discipline is in refusing the story that today is special.`,
      },
      {
        heading: "The White-Space Rule",
        content: `A full calendar is not a productive calendar. It is a fragile calendar. One delay and everything downstream breaks.

Rule: no more than 60% of the workday in scheduled meetings or fixed blocks. The remaining 40% is white space for the work that actually produces output.

If a week is over 60% booked three weeks in a row, something gets cut. Start with recurring meetings that have no decision attached. If you leave a meeting without an owner, a deadline, or a decision, that meeting does not need to exist.

White space is not free time. It is the time your real work happens in. Defend it the same way you defend sleep.`,
      },
      {
        heading: "The Reset Protocol (When the Day Is Lost)",
        content: `Some days will blow up by 10am. Emergency calls, bad sleep, an unexpected loss, a message that knocks you off course. Do not try to rescue the day. Reset it.

The four-step reset:
1. Stop. Put the phone down. Walk away from the desk.
2. Physiological sigh: two inhales through the nose (one big, one small), one long exhale through the mouth. Repeat three times. Takes 45 seconds.
3. Write one sentence: "The next hour I will do X." Not the next day. Not the next week. The next hour.
4. Do that one thing. Ignore everything else until it is done.

The goal of the reset is not to recover the whole day. The goal is to recover the next hour. Do that, and the hour after that usually takes care of itself.`,
      },
    ],
  },
  {
    id: "weekly-review",
    icon: "\u25CE",
    title: "Weekly Review Template",
    subtitle: "The Sunday 30-minute ritual",
    color: "#A78BFA",
    intro:
      "Thirty minutes, same chair, same time every Sunday. The weekly review is the single highest-leverage habit in the entire system. Skip it and every week starts from scratch. Keep it and small adjustments compound into a different life in ninety days.",
    sections: [
      {
        heading: "Setup (The Same Every Week)",
        content: `Same chair. Same time. Same drink. Same notebook or document. Consistency of environment reduces friction and signals to your brain that this is a protected block.

Thirty minutes total. Not sixty, not ten. Thirty.

Phone face-down, notifications off. This is for you, not for anyone messaging you.

Have on the desk: this week's calendar (last seven days), next week's calendar (next seven days), any training log, any trading log, and a single page to write on.

The review has one purpose: turn the last seven days into the next seven days. Not reflection for its own sake. Calibration for what comes next.`,
      },
      {
        heading: "The Six Review Questions",
        content: `Answer each in one or two sentences. Do not write essays. The value is in the pattern over weeks, not in the depth of any one entry.

1. What actually happened this week? A factual summary. Wins, losses, surprises. No interpretation yet, just the facts.

2. What worked? What would I do again next week exactly as I did it this week?

3. What did not work? What specifically will I stop, reduce, or change next week?

4. What did I avoid? The most honest question. What did I push off this week that I know I should have handled? What conversation, task, or decision am I still avoiding?

5. What is the one biggest lever for next week? Not ten things. One. The single action or decision that, if I do it well, makes next week obviously better than this one.

6. What will probably go wrong, and what is my response? Pre-decide the failure mode. If the training plan slips because of travel, what does week seven look like? If the trade thesis is wrong, what is the exit? Pre-deciding turns a crisis into a protocol.`,
      },
      {
        heading: "The Three-Pillar Cross-Check",
        content: `After the six questions, scan each pillar. One line per pillar is enough.

Trading: Was I on my plan this week? Number of trades that passed the pre-trade checklist versus number taken. Net P&L is secondary to process compliance. If compliance is red for three weeks running, position size comes down or trading pauses until the pattern changes.

Fitness: Did I hit the scheduled sessions? Three strength and two to three cardio. If one category is red, the fix is not "try harder next week." The fix is to put the sessions back into the calendar as non-movable blocks.

Mindset: Did I run the morning anchor, the evening shutdown, and the journal? If one slipped for the full week, it is the first thing to rebuild on Monday.

The cross-check is not about perfection. It is about visibility. You cannot fix what you do not track.`,
      },
      {
        heading: "Scan Next Week (Five Minutes)",
        content: `The last five minutes of the review are spent staring at next week's calendar with one question: where will this week break?

Look for: travel days, late meetings that will kill the morning anchor, social events that collide with training slots, deadlines that will eat white space.

For each risk, pre-decide: what is the fallback? If Tuesday's cardio collides with a meeting, it moves to Wednesday morning, not to "somewhere later this week." If Friday's strength slips, it moves to Saturday, not to the next week.

Close the review by writing three sentences on a single sticky note or the top of next week's page: one thing to protect, one thing to improve, one thing to start. Keep the sticky note where you will see it every day.`,
      },
      {
        heading: "What the Review Is Not",
        content: `It is not journaling. Save that for the evening shutdown or a separate practice.

It is not a mood check. Emotions are welcome, but they are not the subject. The subject is what you did and what you will do.

It is not a planning session. You are not building next week's to-do list. You are identifying the one or two things that matter most.

It is not optional because "nothing bad happened this week." The review's value is not in reacting to bad weeks. It is in calibrating average weeks into better ones. Skip it and the next three weeks run blind.

It is not five minutes. If you find yourself done in five minutes, you are not being honest with one of the six questions. The avoidance question is usually the one that was skipped.`,
      },
    ],
  },
  {
    id: "emotional-regulation",
    icon: "\u25C9",
    title: "Emotional Regulation Quick-Reference",
    subtitle: "Name, breathe, decide",
    color: "#A78BFA",
    intro:
      "You cannot always choose what you feel. You can always choose what you do with it. This is the field manual for the moments when anger, fear, or shame is running the show and you need to not make a decision you will regret by tomorrow.",
    sections: [
      {
        heading: "The Name-Breathe-Decide Protocol",
        content: `The core protocol. Three steps, sixty seconds, works anywhere.

Step 1: Name it. Out loud if you can, silently if you cannot. "I am angry." "I am afraid." "I am ashamed." Naming shifts the emotion from something controlling you to something you can observe. The language matters: "I am noticing anger" is more accurate than "I am angry," because the feeling is passing through you, not defining you.

Step 2: Breathe it through. Physiological sigh: two inhales through the nose (one big, one small to top off), one long slow exhale through the mouth. Three rounds. This is the fastest intervention in the nervous system toolkit.

Step 3: Decide after. Never during. No emails, no texts, no trades, no conversations made in a hot state. If the decision can wait an hour, it waits an hour. If it can wait until tomorrow, it waits until tomorrow. Emotions are data, not directions.

This is the single most-used tool in the entire Mindset pillar. Drill it until it is reflexive.`,
      },
      {
        heading: "The 90-Second Rule",
        content: `A pure emotion, unfed by thoughts, lasts roughly 90 seconds. The cascade of stress chemicals rises, peaks, and clears within that window.

What extends it past 90 seconds is the story you tell about it. "I am angry" lasts 90 seconds. "I am angry because they always do this and it proves they do not respect me" lasts an hour. Same chemical cocktail, but now refueled by the narrative.

The practice: when a strong emotion hits, start a mental clock. Feel the sensation without adding the story. Notice where it is in your body. Notice it rise, peak, pass. If the story starts, label it ("that is the story") and come back to the sensation.

This is not suppression. It is letting the wave actually complete instead of feeding it until it becomes a flood.`,
      },
      {
        heading: "The STOP Script",
        content: `When you catch yourself mid-reaction (sending the email, snapping at someone, closing the position in a panic), run the STOP script.

S: Stop. Physically stop what you are doing. Hands off the keyboard. Step back from the conversation.

T: Take a breath. One physiological sigh minimum. Three is better.

O: Observe. What am I feeling? What am I about to do? What story am I telling myself right now? What will this decision look like tomorrow morning?

P: Proceed, but deliberately. Maybe the same action is still the right one. Usually it is not. Either way, the action is now a choice, not a reflex.

STOP takes thirty seconds. It has saved more positions, relationships, and reputations than every performance coach combined.`,
      },
      {
        heading: "The Grounding Drill (5-4-3-2-1)",
        content: `When the feeling is overwhelming, anxiety is spiking, or a panic response is starting, the mind is no longer the right tool. Use the body.

Name five things you can see. Actually look at each one.
Name four things you can physically feel. The chair under you. The fabric of your shirt. Your feet on the floor. The air on your skin.
Name three things you can hear. Fan, traffic, breathing, distant voices.
Name two things you can smell. Coffee, air, nothing (that is fine, just look).
Name one thing you can taste.

This takes two minutes. It pulls the nervous system out of threat response and back into the present physical space. It works even when "breathe slowly" stops working, because it bypasses the thinking loop entirely.`,
      },
      {
        heading: "After a Loss, Argument, or Setback",
        content: `The hour after a real loss is the single most dangerous hour of the week. Most catastrophic decisions are made in that window. Protect it with a protocol.

First thirty minutes: no decisions, no messages, no trades, no responses. Walk. Shower. Train. Whatever moves blood and interrupts the spiral.

Minute 30 to 60: write out what happened, what you felt, and what you want to do. By hand if possible. Do not send anything to anyone yet.

After 60 minutes: re-read what you wrote. If what you wanted to do at minute 30 still looks right at minute 60, it is probably a real decision. If it looks extreme or off, wait longer. Sleep on it if it will hold until morning.

The rule: never respond to a major event inside the first hour. The version of you at minute five is not the version of you at minute ninety. Let the right version make the call.`,
      },
    ],
  },
  {
    id: "trigger-map",
    icon: "\u25A0",
    title: "Trigger Map",
    subtitle: "Spot the pattern, install the friction",
    color: "#A78BFA",
    intro:
      "Every self-sabotage pattern has a cue, a behavior, and a payoff. You do not break the pattern by trying harder in the moment. You break it by mapping the cue and installing friction before you get there. This is the worksheet for that work.",
    sections: [
      {
        heading: "The Trigger Audit (Do This Once a Quarter)",
        content: `Sit down with thirty minutes and a blank page. Answer four questions for the one pattern you most want to change.

1. When does this pattern usually run? What time of day, day of the week, phase of the month? Is it after a loss, after a win, after a fight, when you are tired?

2. What happens right before? Is there a specific cue, a person, a message, a feeling, a place? The cue is almost never the behavior itself. It is what precedes the behavior.

3. What is the payoff? Be brutally honest. Every repeated pattern has a payoff. Numbing (the behavior quiets a feeling). Distraction (the behavior delays something hard). Control (the behavior creates the illusion of agency). Belonging (the behavior gets attention or approval). Write down the real payoff, not the socially acceptable one.

4. What is the smallest piece of friction that would interrupt the cue-behavior link? Not a willpower test. A structural change.

The patterns you map, you can change. The patterns you do not name run on autopilot.`,
      },
      {
        heading: "The Three-Step Intervention",
        content: `Once you have mapped the pattern, the intervention has three steps.

Step 1: Name it, out loud, in the moment. "This is the pattern." Not "I am weak." Not "I am doing it again." Just naming the pattern as a thing separate from you. A thing you can watch.

Step 2: Delay. Sixty seconds minimum before the behavior. Set a timer if needed. In those sixty seconds, do one physical thing: stand up, drink water, walk to another room. The point is to insert a gap between cue and action.

Step 3: Replace. Not with nothing. With a pre-committed small alternative. If the pattern is checking email at night, the replacement is a specific three-line journal entry. If the pattern is impulsively opening a position, the replacement is writing the pre-trade checklist in full before clicking.

Log it either way. Whether you ran the intervention or the old pattern won, write one line: what was the cue, what did I do, what do I see now. The pattern you track is the pattern you change.`,
      },
      {
        heading: "Environmental Design (The Highest-Leverage Move)",
        content: `Willpower is a weak tool. Environment is a strong one. Change the environment so the old behavior requires effort and the new behavior is the default.

Examples:
- If phone-in-bed is the pattern: charger in another room. A real alarm clock on the nightstand.
- If late-night trading is the pattern: log out of the platform at a fixed time, password manager needed to log back in.
- If doom-scrolling is the pattern: home screen has only four apps (messages, calendar, maps, one tool). Everything else in a folder three screens deep.
- If skipping training is the pattern: gym clothes laid out the night before. Gym bag in the car.
- If emotional eating at 10pm is the pattern: nothing you would binge on is in the kitchen.

One environmental change outperforms ten affirmations. Always.`,
      },
      {
        heading: "Common Patterns and Their Usual Cues",
        content: `Pattern: revenge trading after a loss. Cue: the loss itself, combined with an open position tab. Fix: close the platform for 60 minutes after any realized loss. Hard-code it.

Pattern: doom-scrolling at night. Cue: phone in bedroom, plus fatigue. Fix: phone out of bedroom, physical book on nightstand.

Pattern: skipping training when tired. Cue: deciding in the moment whether to go. Fix: decision is pre-made at the weekly review. Tired or not, you go. Reduce intensity if you must, but you go.

Pattern: avoiding a hard conversation. Cue: the thought of the conversation. Fix: a calendar block with the actual conversation on the calendar, with a name and a time. Unscheduled = infinite delay.

Pattern: overeating after a stressful day. Cue: stress + kitchen + evening. Fix: a 20-minute walk immediately after the stressful event, before arriving home or opening the fridge.

The shape repeats: identify the cue, change the environment, pre-decide the replacement.`,
      },
    ],
  },
  {
    id: "decisions",
    icon: "\u25C7",
    title: "Decision Under Pressure",
    subtitle: "Cheatsheet for when you cannot think straight",
    color: "#A78BFA",
    intro:
      "Most bad decisions are not made because you did not know better. They are made because the decision was made in a hot state, without a framework, against a clock. This is the cheatsheet for decisions that matter more than the comfort of deciding quickly.",
    sections: [
      {
        heading: "Binary Thinking",
        content: `When you are stuck choosing between five options, you are probably overthinking. Collapse the choice to two.

The question is not "which of these five is best?" The question is "which of these two is better?" Eliminate the three weakest, then choose between the remaining two.

If you cannot choose between the final two within five minutes, flip a coin. Not to decide. To surface your reaction. The moment the coin is in the air, you will notice which outcome you were hoping for. That is your answer. The coin just made the preference visible.

Binary thinking is not a simplification of reality. It is a method for surfacing what you already know under the noise of "but what if."`,
      },
      {
        heading: "The Sleep-On-It Rule",
        content: `Any decision that can wait 24 hours should wait 24 hours. If the situation is genuinely urgent, the decision will still look the same tomorrow. If it is not genuinely urgent, sleep will clarify it.

The rule: big decisions made before bed never get sent, submitted, or acted on until the next morning. Write them. Sleep on them. Re-read them at 8am. Send if they still look right. Usually, they do not.

This applies to: emails you want to send, positions you want to open or close outside your plan, resignations, breakups, public posts, large purchases, commitments to other people.

The exceptions: physical safety, children, or something that will actually be gone by morning. Everything else waits.`,
      },
      {
        heading: "The Pre-Mortem",
        content: `Before you commit to any decision larger than "what to eat for lunch," run a 90-second pre-mortem. Assume the decision fails. Work backward.

Three questions:
1. It is six months from now and this decision blew up. What happened?
2. What is the single most likely way this goes wrong?
3. What would I do today if I knew that was going to happen?

Most of the time, the pre-mortem does not kill the decision. It improves it. You find the protection you would have added after the loss, and you add it before. Position sizing, an exit rule, an opt-out clause, a sanity check with someone outside the situation.

The decisions that survive a pre-mortem are stronger than the decisions that skip it. Every time.`,
      },
      {
        heading: "The Reversibility Filter",
        content: `Every decision falls on a spectrum from fully reversible to fully permanent. Match your deliberation to the reversibility.

Fully reversible (changing your mind costs nothing): decide fast. You are wasting time debating. Ship it.

Costly to reverse (changing your mind costs time, money, or reputation): deliberate. Sleep on it. Pre-mortem.

Effectively permanent (cannot be undone, or undoing is prohibitively expensive): deliberate slowly. Consult. Never decide in a hot state.

Most people get this backwards. They agonize over reversible decisions (which font, which name, which plan) and rush permanent ones (a relationship, a co-founder, a public commitment). Assign the right tempo to the right decision.`,
      },
      {
        heading: "When Stuck: The Three-Person Test",
        content: `If a decision has you paralyzed, run the three-person test.

1. What would the version of me from five years ago have done here? (Useful when you are overthinking.)
2. What would the version of me from five years in the future say I should do? (Useful when you are too close to the situation.)
3. What would a trusted friend, who does not have my emotional stake, advise? (Write their advice down as if they said it.)

These are not oracles. They are perspective shifts that break the loop of your current mental state. The friend test is the most useful: emotional distance is the single thing you do not have access to about your own problem, so simulate it.

If all three "voices" say the same thing, that is your answer. If they disagree, the decision probably needs another 24 hours.`,
      },
    ],
  },
  {
    id: "identity",
    icon: "\u25B2",
    title: "Identity Rewrite Template",
    subtitle: "From-to worksheet, evidence log",
    color: "#A78BFA",
    intro:
      "You do not change behavior by trying harder. You change behavior by changing the person you believe you are. This is the practical template for that work. No affirmations. No magical thinking. A structured rewrite based on evidence you will generate.",
    sections: [
      {
        heading: "The From-To Worksheet",
        content: `Pick one identity you want to change. Not five. One.

Write two columns on a page.

Left column (From): The current identity. Describe it in one sentence in the present tense. "I am someone who skips training when I feel tired." "I am someone who over-trades when I am bored." "I am someone who avoids the hard conversation."

Right column (To): The identity you want to build. One sentence, present tense. "I am someone who trains on scheduled days regardless of mood." "I am someone who only takes trades that pass the checklist." "I am someone who has the hard conversation within 48 hours."

Then under the To column, list five small, repeatable actions that the To person would naturally do. These are not goals. They are behaviors of the identity.

Every day for the next thirty days, tick each of the five when done. You are not becoming the new identity through declaration. You are earning it through evidence.`,
      },
      {
        heading: "The Evidence Log",
        content: `Identity is earned through a chain of small, consistent actions. The evidence log is how you track that chain.

Open a note titled "Evidence: [your new identity]." Every time you take one of the five actions, log it with the date and one line of context. "10/02: went to gym at 6am despite 5 hours of sleep. Was not my best session. Went anyway."

The log does two things:
1. It gives you undeniable proof over time. At day 30, you can see thirty data points instead of a story.
2. It catches the drift. When you notice the log has gone quiet for a week, the identity is slipping before the self-image has caught up. You can intervene early.

This is not performative. Do not post the log. It is for you. The evidence is what your brain uses to update its self-model. Declarations without evidence are noise. Evidence without declarations still works.`,
      },
      {
        heading: "The 90-Day Rule",
        content: `A new identity takes roughly 90 days of consistent behavior to land. Not 30. Not 21. Ninety.

In the first 30 days, it feels like acting. You are performing the behavior but still feel like the old identity. This is normal. Do not quit here.

In days 30 to 60, the behavior starts feeling neutral. You are doing it because you do it, not because you are trying. The old identity still surfaces, but less often.

In days 60 to 90, the new behavior starts feeling like the default and the old behavior feels foreign. When you catch yourself about to do the old pattern, you feel a mismatch with who you now are.

Stop before 90 days and you regress fast. Make it to 90 days with evidence, and the change is usually self-sustaining. This is the research-backed timeline. It is also what the people who have actually rebuilt themselves will tell you.`,
      },
      {
        heading: "Dropping an Identity vs. Adding One",
        content: `You cannot subtract an identity. You can only replace it with a stronger one.

"I am not going to be someone who over-trades" does not work. "I am someone who runs the pre-trade checklist on every trade" does. Both point at the same outcome, but one defines a behavior you can actually do.

Negative identity statements have no evidence to log. You cannot earn a tick by not doing something. You can only log what you did do. So frame every rewrite in the positive.

When the old pattern runs (and it will), do not frame it as "I failed." Frame it as "the old identity showed up today, and here is what I did next." What you do next is the new identity. The old showing up is not the problem; letting it drive the next hour is.`,
      },
    ],
  },
  {
    id: "journal",
    icon: "\u25AB",
    title: "Journal Prompts",
    subtitle: "Three nightly, ten weekly",
    color: "#A78BFA",
    intro:
      "A journal is not a diary. A diary records what happened. A journal calibrates what happens next. These are the prompts that do the work. Three lines a night, ten minutes once a week, and nothing else.",
    sections: [
      {
        heading: "The Three Nightly Prompts",
        content: `Three lines, written by hand if possible, before bed. Not typed into a note app you will never re-read. Paper, one notebook, same place.

1. What did future me appreciate about today?
Answer with one specific action. Not "being productive." Not "showing up." "Started the deep work block at 7:45 and did not check Slack until 11." Specificity is the point. Vague entries read back like nothing.

2. What will future me resent about today?
The honest one. What did I avoid, postpone, numb out through, or half-do? What will I look back on in a year and wish I had handled differently? If the answer is "nothing," you are not being honest.

3. What is the smallest lever for tomorrow?
Not the most important task. The smallest lever. The single action that, if done first thing, puts the rest of the day in motion. One sentence. Specific enough to execute cold.

Three lines. Two to three minutes. Done.`,
      },
      {
        heading: "The Ten Weekly Prompts",
        content: `Once a week, alongside the Sunday weekly review, spend ten minutes on deeper prompts. Pick three out of the ten. Rotate which three each week.

1. What did I say yes to this week that I should have said no to?
2. What did I say no to that I should have said yes to?
3. Where was I out of integrity this week? What did I say that I did not back up with action?
4. What did I learn that I did not know on Monday?
5. Where did I project onto someone else a story that was really about me?
6. What is one belief I held last month that I no longer hold?
7. If this week was a pattern for the rest of the year, would I be proud of the year?
8. Who did I spend time with that drained me, and who filled me? What do I do with that data?
9. What did my body tell me this week that my mind kept overriding?
10. What is the one thing I am not saying out loud that, if I said it, would change everything?

Not all of these will apply every week. The ones that apply will land hard. Do not rush past the discomfort. That is where the actual feedback lives.`,
      },
      {
        heading: "The After-Action Prompt (For Hard Events)",
        content: `Run this prompt after any significant event: a big trade (win or loss), a difficult conversation, a public presentation, a setback, an interview, a breakup, a confrontation.

Four questions, written the same day:

1. What actually happened? Facts only. No interpretation.

2. What did I do that I would do again? Be specific. Not "I stayed calm." "At minute 12 when they raised their voice, I did not match it. I waited two seconds and repeated my point in a steady tone."

3. What did I do that I would do differently? Same specificity. Not "I should have been more prepared." "I did not know the Q3 numbers going in, and I froze when asked. Next time: pre-brief the three numbers most likely to come up."

4. What is the lesson in one sentence, written as a rule for next time?

This is the journal entry that produces the fastest growth. Skip it for the easy stuff. Do it every time after hard stuff. The compounding is dramatic.`,
      },
      {
        heading: "Mistakes People Make with Journaling",
        content: `Mistake 1: Writing for length. Three lines is better than three pages. Length is avoidance. The brevity forces precision.

Mistake 2: Writing what you think the journal wants to hear. The journal is for you. If you are writing performative gratitude entries, you are optimizing for the wrong reader. No one else will see this.

Mistake 3: Only journaling when something is wrong. The pattern you want is consistency. A journal that only appears during crises is a coping tool, not a calibration tool. Use it in the average weeks to spot the small drifts.

Mistake 4: Typing into a note app you will never re-read. The value is 50% in the writing and 50% in the re-reading. Paper, or a dedicated app you actually open weekly. Not a random folder in Notes.

Mistake 5: Quitting after a week because "it did not do anything." The insight curve is logarithmic. Three weeks in, patterns you could not see in week one become obvious. Commit to thirty days before evaluating.`,
      },
    ],
  },
  {
    id: "failure-modes",
    icon: "\u25CB",
    title: "Common Failure Modes",
    subtitle: "What the drift looks like, and how to catch it",
    color: "#A78BFA",
    intro:
      "The system does not usually collapse in one dramatic moment. It drifts. Slowly, quietly, over a few weeks, until one Sunday you realize nothing has been happening the way you said it would. These are the most common drift patterns and the specific intervention for each.",
    sections: [
      {
        heading: "Drift 1: The Morning Anchor Slides to the Phone",
        content: `The pattern: you start \"just checking\" email, Slack, or news in the first 30 minutes of the day. Within two weeks, the first 90 minutes are reactive. Within a month, you have forgotten what the morning anchor even felt like.

The signal: you cannot remember when you last did the hardest cognitive block before 10am.

The intervention: phone physically out of the bedroom, starting tonight. Not tomorrow. Tonight. Put a real alarm clock on the nightstand or use the phone's alarm from another room. The structural fix beats the willpower fix.

The check: every Sunday, note whether the morning anchor ran for at least four of the seven mornings. If it is below four for two weeks running, reset the rules completely.`,
      },
      {
        heading: "Drift 2: Training Becomes \"Whenever I Can\"",
        content: `The pattern: the fixed training slots start flexing. Tuesday noon becomes "sometime Tuesday." Then "sometime this week." Then one session a week, if the mood is right.

The signal: you cannot name, without checking, when your next three training sessions are scheduled.

The intervention: at the next weekly review, write three strength and two cardio sessions into the calendar as recurring blocks. Same days, same times. Treat them as meetings with someone who gets angry when you cancel.

The check: a training slot that has been missed twice in a row gets attention before any new goal gets added to the system.`,
      },
      {
        heading: "Drift 3: The Sunday Review Gets Skipped",
        content: `The pattern: one Sunday it is "busy," one Sunday "nothing happened worth reviewing," one Sunday you "will do it Monday." Three weeks later, you have not done a review in a month and everything has quietly gone sideways.

The signal: you cannot remember what the single biggest lever was for this week.

The intervention: the review is 30 minutes. Put it on the calendar as a recurring Sunday block with a reminder. If you miss it on Sunday, do it Monday morning. Never skip two in a row.

The check: if the review has been skipped for more than two consecutive weeks, nothing else in the system gets added until the next review actually runs.`,
      },
      {
        heading: "Drift 4: Moralizing Instead of Fixing",
        content: `The pattern: you notice something is off (training is slipping, the morning anchor is gone, trading is emotional), and you respond with self-criticism. You tell yourself you are lazy, weak, undisciplined. The criticism feels productive. Nothing actually changes.

The signal: lots of journal entries about "I need to do better." No journal entries about "I put the gym clothes out last night."

The intervention: ban the abstract word. Replace every "I need to be more disciplined" with one specific structural change. Shoes by the door. Calendar block added. Phone out of bedroom. App deleted. The concrete action you can take in the next 60 seconds, not the character upgrade.

The check: if last Sunday's review was heavy on self-assessment and light on structural changes, flip it next Sunday. Self-criticism is not a tool. Structure is.`,
      },
      {
        heading: "Drift 5: Numbing to Soft Drugs",
        content: `The pattern: the evening fills with noise. Scrolling, Netflix, snacking, alcohol, YouTube, news. Individually, each is fine. Stacked, they replace the quiet time the nervous system needs to reset, and they collapse the next morning before it starts.

The signal: the hour before bed and the hour after dinner are a blur you cannot remember.

The intervention: pick one structural fix per week for four weeks. Week one: no screens in bed. Week two: no scrolling during meals. Week three: no alcohol on weeknights. Week four: a fixed screen curfew (phone down by a set time). Not all four at once. One per week.

The check: reclaim one hour. If you reclaim one hour a day from passive consumption, you get back over twenty hours a month. That is where the extra training session, the extra trading review, and the reading habit all live.`,
      },
      {
        heading: "Drift 6: Adding Before Fixing",
        content: `The pattern: something is not working, so you add a new habit, a new book, a new supplement, a new tool. You stack systems on top of systems. Nothing gets any better, because the foundation is still broken.

The signal: your system looks sophisticated from the outside and is failing from the inside.

The intervention: no new tools, books, or protocols for the next 30 days. Zero. Fix the three defaults (morning anchor, weekly review, training slots) until all three are green for two weeks in a row. Only then add anything new.

The check: at the next weekly review, list everything you are currently "doing." If the list is longer than what you can actually do, cut until it matches. Discipline is subtraction, not addition.`,
      },
    ],
  },
];

function ChevronDown() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 7.5L10 12.5L15 7.5" />
    </svg>
  );
}

function ContentSection({
  section,
  accentColor,
  defaultOpen,
}: {
  section: Section;
  accentColor: string;
  defaultOpen: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultOpen);

  return (
    <div className="border-b border-white/[0.06]">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex justify-between items-center w-full py-6 bg-transparent border-none cursor-pointer text-left"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: accentColor }}
          />
          <span className="text-lg font-semibold text-white tracking-tight">
            {section.heading}
          </span>
        </div>
        <span
          className="text-white/40 shrink-0 transition-transform duration-300"
          style={{
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <ChevronDown />
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: expanded ? "5000px" : "0" }}
      >
        <div className="pb-8 pl-[18px]">
          {section.content.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="text-base leading-[1.8] text-white/75 tracking-[0.01em]"
              style={{ margin: i === 0 ? "0 0 16px 0" : "16px 0" }}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function MindsetContent({ lockedPreview = false }: { lockedPreview?: boolean }) {
  const visibleCategories = lockedPreview ? categories.slice(0, 1) : categories;
  const [activeCategory, setActiveCategory] = useState(visibleCategories[0].id);
  const active = visibleCategories.find((c) => c.id === activeCategory)!;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="max-w-[1200px] mx-auto pt-20 pb-12 px-6">
        <Link
          href="/dashboard"
          className="text-[11px] font-bold tracking-[0.15em] uppercase mb-4 inline-block transition-colors hover:text-white/80"
          style={{ color: active.color }}
        >
          &larr; Dashboard
        </Link>
        <h1 className="text-[clamp(36px,5vw,56px)] font-bold leading-[1.1] tracking-tighter mb-5 max-w-[800px]">
          The Operator&apos;s Playbook.
        </h1>
        <p className="text-lg leading-[1.7] text-white/55 max-w-[640px] m-0">
          Reference library for the Mindset pillar. Templates, checklists,
          and quick-references for the moments the modules are meant for.
          Tool-first. No fluff. Come back here when the day fights you.
        </p>
      </div>

      {/* Main Layout */}
      <div className="max-w-[1200px] mx-auto px-6 pb-32 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-12 items-start">
        {/* Sidebar */}
        <div className="md:sticky md:top-6 flex flex-col gap-1">
          {visibleCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="flex items-center gap-3 w-full px-5 py-4 rounded-xl cursor-pointer transition-all duration-300 text-left border"
              style={{
                background:
                  activeCategory === cat.id
                    ? "rgba(255,255,255,0.08)"
                    : "transparent",
                borderColor:
                  activeCategory === cat.id
                    ? "rgba(255,255,255,0.15)"
                    : "transparent",
              }}
            >
              <span
                className="text-xl shrink-0"
                style={{ color: cat.color }}
              >
                {cat.icon}
              </span>
              <div className="min-w-0">
                <div
                  className="text-[15px] font-semibold tracking-tight transition-colors duration-300"
                  style={{
                    color:
                      activeCategory === cat.id
                        ? "#fff"
                        : "rgba(255,255,255,0.7)",
                  }}
                >
                  {cat.title}
                </div>
                <div className="text-xs text-white/40 mt-0.5">
                  {cat.subtitle}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          <div className="pt-8 pb-8 border-b border-white/[0.08] mb-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[28px]" style={{ color: active.color }}>
                {active.icon}
              </span>
              <h2 className="text-[28px] font-bold tracking-tight m-0">
                {active.title}
              </h2>
            </div>
            <p className="text-base leading-[1.8] text-white/60 m-0 max-w-[640px]">
              {active.intro}
            </p>
          </div>

          {active.sections.map((section, i) => (
            <ContentSection
              key={`${active.id}-${section.heading}`}
              section={section}
              accentColor={active.color}
              defaultOpen={i === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MindsetPage() {
  return (
    <Paywall
      previewContent={<MindsetContent lockedPreview />}
      accent="var(--accent-mindset)"
    >
      <MindsetContent />
    </Paywall>
  );
}
