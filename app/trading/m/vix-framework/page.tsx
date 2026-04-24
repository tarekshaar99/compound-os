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

const CHECKLIST_KEY = "vix-actions";
const CHECKLIST_COUNT = 3;

export default async function Page() {
  const gate = await enforceModule("trading.vix-framework");
  if (gate) return gate;

  return (
    <Lesson
      moduleId="trading.vix-framework"
      pillar="trading"
      title="VIX Regime Framework"
      subtitle="Volatility tells you when to deploy, when to hold cash, and when to size up."
      estMinutes={16}
    >
      <LessonSection title="What this is">
        <P>
          Most retail traders look at price. Price is lagging. VIX, the
          market's 30-day implied volatility index, is the fastest
          public tell for what kind of environment you're in.
        </P>
        <P>
          This module gives you a four-zone deployment ladder based on VIX
          level and trend. It tells you what to do, not just what to
          think.
        </P>
      </LessonSection>

      <Principle>
        Volatility is not a thing to be feared. It's a price signal
        for risk, and risk is where returns come from. The question is
        never 'is vol high?' It's 'is vol being priced
        correctly?'
      </Principle>

      <LessonSection title="The four zones">
        <P>
          <strong>VIX 12-15: Complacency zone.</strong> Market priced for
          perfection. Premiums are thin. Expected return on short-vol
          trades is low. Be light. Hold cash. This is not the time to be a
          hero on the long side either: everything is priced.
        </P>
        <P>
          <strong>VIX 15-20: Normal.</strong> This is where most of the
          market lives. Regular rules apply. Full position sizing within
          your risk framework. Wheel strategies work well here.
        </P>
        <P>
          <strong>VIX 20-30: Elevated.</strong> Something has broken in
          sentiment. Premiums are rich. Opportunities are opening. Deploy
          in tranches, not all at once. This is where planned dry powder
          starts getting used.
        </P>
        <P>
          <strong>VIX 30+: Crisis.</strong> Full dislocation. Quality
          names on sale. Put premiums are absurd. This is when you size
          up, not freeze. Deploy cash reserves in planned tranches over
          weeks, not hours. The only way to lose here is to have been
          fully invested before the move.
        </P>
      </LessonSection>

      <LessonSection title="The deployment ladder">
        <P>
          <strong>At VIX 20:</strong> deploy 25% of your cash reserve.
        </P>
        <P>
          <strong>At VIX 25:</strong> deploy another 25%.
        </P>
        <P>
          <strong>At VIX 30:</strong> deploy another 25%.
        </P>
        <P>
          <strong>At VIX 40+:</strong> deploy the final 25%.
        </P>
        <P>
          The point is pre-committing to the ladder before you're in
          the fear. If you wait to feel brave, you'll deploy at VIX
          16 on the way back down.
        </P>
      </LessonSection>

      <Example title="What this looked like in 2020 and 2022">
        <P>
          In March 2020, VIX spiked to 82. Anyone on this ladder was fully
          deployed by VIX 40. Quality names were down 40 to 60 percent.
          The "hard part" was holding your nerve with a plan you'd
          already written.
        </P>
        <P>
          In 2022, VIX mostly lived in the 20 to 35 range. Partial
          deployments, patient wheeling, no euphoria. The ladder kept
          capital available for the actual dislocation events instead of
          chasing every 5 percent dip.
        </P>
      </Example>

      <Mistakes
        items={[
          "Waiting for 'the' bottom before deploying. You will never see it in real time. The ladder exists so you don't have to.",
          "Deploying the whole cash reserve at VIX 25 because it 'feels like a lot.' VIX can go much higher. The whole point of tranches is respecting the tail.",
          "Buying leveraged ETFs as your vol play. Leveraged products have decay built in. You don't need leverage when vol is already giving you asymmetric entries.",
          "Treating VIX level as the only signal. VIX trending up at 20 is different from VIX trending down at 20. The ladder activates on level; the decision on what to buy still needs a setup.",
        ]}
      />

      <Checklist
        title="Actions to complete this module"
        storageKey={CHECKLIST_KEY}
        items={[
          {
            id: "watchlist",
            label: "Build a dislocation watchlist: 10 quality names you'd buy aggressively at a 30% discount.",
            hint: "If VIX ever spikes to 35+, this list is what you execute against. Build it when you're calm.",
          },
          {
            id: "cash-target",
            label: "Set your cash reserve target as a percentage of portfolio and write the ladder math for your account size.",
            hint: "If you're holding 30% cash on a $100k portfolio, each ladder rung is $7.5k of deployment.",
          },
          {
            id: "alert",
            label: "Set a VIX alert at 20, 25, 30 in your broker or phone.",
            hint: "You don't want to be refreshing. You want to be notified and then act on the pre-written plan.",
          },
        ]}
      />

      <Quiz
        questions={[
          {
            id: "q1",
            prompt: "VIX is 17 and trending sideways. What does the framework say?",
            options: [
              "Full deployment, buy aggressively.",
              "This is the normal zone. Run standard rules, standard sizing.",
              "Sell everything and go to cash.",
              "Short volatility.",
            ],
            correct: 1,
            explain:
              "15-20 is the zone where most normal operations happen. No heroism required.",
          },
          {
            id: "q2",
            prompt:
              "VIX spikes from 18 to 32 in three days. You're still at full cash reserve. What do you do?",
            options: [
              "Wait for VIX to come back down.",
              "Deploy everything immediately.",
              "Deploy 75% of reserve per the ladder (25% at VIX 20, 25, 30).",
              "Short VIX.",
            ],
            correct: 2,
            explain:
              "The ladder is pre-committed. You activated 3 rungs. Final 25% stays for VIX 40+, which may or may not come.",
          },
          {
            id: "q3",
            prompt: "Why is deploying via ladder better than trying to buy the bottom?",
            options: [
              "Ladders make more money on average.",
              "You can't see the bottom in real time. Ladders guarantee you're buying into the dislocation rather than missing it waiting for perfect.",
              "Ladders are tax-efficient.",
              "Ladders avoid commissions.",
            ],
            correct: 1,
            explain:
              "It's not about optimal. It's about being in the trade at all. Perfect is the enemy of executed.",
          },
        ]}
      />

      <Reflection
        prompt="Open TradingView and pull up a 10-year chart of the VIX (ticker: VIX). Zoom out and look at the spikes: March 2020 (COVID), February 2018 (volmageddon), August 2024 (carry-trade unwind), the 2022 rate-hike cycle, any tariff or war shock. Notice how each spike looks violent in the moment, and how every single one reverted toward 15 within weeks or months. Write down one spike you remember living through - where were you, what did you feel, did you buy or panic - and what the ladder would have had you do instead. The point is to calibrate your future self against real history, not headlines."
        minChars={120}
      />

      <CompleteModule
        nextPath="/trading/m/weekly-review"
        nextLabel="Next: The Weekly Review"
        requireChecklistKey={CHECKLIST_KEY}
        requireChecklistCount={CHECKLIST_COUNT}
      />
    </Lesson>
  );
}
