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

const CHECKLIST_KEY = "wheel-actions";
const CHECKLIST_COUNT = 4;

export default async function Page() {
  const gate = await enforceModule("trading.wheel-strategy");
  if (gate) return gate;

  return (
    <Lesson
      moduleId="trading.wheel-strategy"
      pillar="trading"
      title="The Wheel Strategy"
      subtitle="Cash-secured puts into covered calls. The income engine for sideways markets."
      estMinutes={22}
    >
      <LessonSection title="What this is">
        <P>
          The wheel is a two-step options cycle. You sell cash-secured puts
          on a stock you want to own. If you get assigned, you own the
          shares at a discount to where you started. Then you sell covered
          calls against those shares until they get called away. Repeat.
        </P>
        <P>
          Done right, this is a patient income strategy on companies you
          already want exposure to. Done wrong, it&apos;s a slow way to
          bagholding.
        </P>
      </LessonSection>

      <LessonSection title="Why it matters">
        <P>
          Markets spend most of their time neither ripping higher nor
          collapsing. In those stretches, buy-and-hold drifts sideways and
          directional traders burn capital on whipsaws. The wheel pays you
          rent for waiting.
        </P>
        <P>
          The honest version: the wheel is not free money. You give up
          upside and accept full downside. The edge comes from premium
          collection plus strike selection, not from magic.
        </P>
      </LessonSection>

      <Principle>
        Only wheel stocks you would genuinely buy at the strike you&apos;re
        selling. Every put sold is a conditional buy order you just got
        paid for.
      </Principle>

      <LessonSection title="Step one: cash-secured puts">
        <P>
          Pick a stock you want to own at 10 to 15 percent below current
          price. Sell a put at or near that strike, 30 to 45 days to
          expiry. You collect premium upfront. Set aside the cash to buy
          the shares if assigned.
        </P>
        <P>
          <strong>Strike selection rule:</strong> delta between 0.20 and
          0.30. That maps to roughly 20 to 30 percent probability of
          assignment. The premium is meaningful, assignment is manageable.
        </P>
        <P>
          <strong>Close early:</strong> buy back the put at 50 percent of
          premium collected. Free up capital. Sell the next cycle. This
          single discipline is what separates wheel operators from wheel
          tourists.
        </P>
      </LessonSection>

      <LessonSection title="Step two: covered calls (if assigned)">
        <P>
          You got assigned the shares. Now sell calls at a strike above
          your cost basis. Same 30 to 45 days out, delta 0.20 to 0.30.
        </P>
        <P>
          You collect premium. If called away, you exit at a profit plus
          the call premium. If not, you keep the shares and the premium
          and sell another call next cycle.
        </P>
        <P>
          <strong>Never sell calls below your cost basis.</strong> That
          locks in a loss to collect pennies. Just because the stock
          dropped doesn&apos;t mean the setup is still valid.
        </P>
      </LessonSection>

      <Example title="A realistic wheel cycle">
        <P>
          Stock XYZ trading at $52. You&apos;d buy at $45.
        </P>
        <P>
          Sell 1 put at $45 strike, 35 DTE, collect $1.20 premium = $120.
          Cash secured: $4,500.
        </P>
        <P>
          Outcome A (most common): stock stays above $45. Option expires
          worthless. You keep $120 on $4,500 for 35 days. Annualized:
          ~28%.
        </P>
        <P>
          Outcome B: stock drops to $42. Assigned 100 shares at $45. Cost
          basis: $45 minus $1.20 premium = $43.80 effective. You wanted to
          own this anyway at $45.
        </P>
        <P>
          Next step: sell a $46 or $47 call, 35 DTE, collect ~$0.80. If
          called away at $46: profit = $46 minus $43.80 effective basis
          plus the $80 call premium. If not called: repeat.
        </P>
      </Example>

      <Mistakes
        items={[
          "Wheeling stocks you&apos;d never actually buy. This is the classic way the wheel blows up: assignment on a name you now hate holding, where even selling calls feels lose-lose.",
          "Chasing premium by selling too close to the money. Higher premium means higher assignment probability means more capital tied up. The whole game is capital turnover.",
          "Holding through earnings without a plan. Vol crush is why people sell options into earnings. Owning naked short options through a print is a thesis bet, not an income strategy.",
          "Selling calls below cost basis to &apos;generate income&apos; on a losing position. This turns a drawdown into a locked loss.",
          "Letting one position consume more than 10% of the portfolio&apos;s cash-secured capacity. Diversification matters as much in options as in shares.",
        ]}
      />

      <Checklist
        title="Set up your first wheel"
        storageKey={CHECKLIST_KEY}
        items={[
          {
            id: "watchlist",
            label: "Build a watchlist of 5 to 10 stocks you&apos;d genuinely buy at 10-15% below current price.",
            hint: "If the list is hard to assemble, the market probably isn&apos;t cheap enough to wheel aggressively yet. Cash is fine.",
          },
          {
            id: "strike-rules",
            label: "Write your strike rules: target delta range, target DTE range, close-early trigger.",
            hint: "0.20-0.30 delta, 30-45 DTE, close at 50% profit is a defensible baseline. Make them yours.",
          },
          {
            id: "size-cap",
            label: "Set a per-position cap: no single wheel can tie up more than 10% of cash-secured capacity.",
            hint: "&apos;Cash-secured capacity&apos; is the total cash you&apos;re willing to have assigned across all wheels.",
          },
          {
            id: "paper-one",
            label: "Paper-trade or live-size-small one wheel cycle before running it full size.",
            hint: "You&apos;re not testing the idea, you&apos;re testing the mechanics: rolls, early closes, assignment handling.",
          },
        ]}
      />

      <Quiz
        questions={[
          {
            id: "q1",
            prompt:
              "You sold a put at $45 strike for $1.20. Stock drops to $44 three days before expiry. What does the framework suggest?",
            options: [
              "Let it expire. You&apos;ll get assigned.",
              "Buy it back at a loss to avoid assignment.",
              "Roll it down and out to a lower strike, later date.",
              "Either take assignment (if you still want the shares at $45) or roll out and down for a credit to stay in premium. The decision is &apos;do I still want these shares here?&apos;",
            ],
            correct: 3,
            explain:
              "The question is never &apos;assignment good or bad.&apos; It&apos;s &apos;do I still want to own these shares at this strike?&apos; If yes, take it. If no, roll or close.",
          },
          {
            id: "q2",
            prompt: "You&apos;re assigned at $45 cost basis (after premium: $43.80). Stock is now at $40. What call should you NOT sell?",
            options: [
              "$46 strike, 35 DTE.",
              "$42 strike, 14 DTE.",
              "$44 strike, 45 DTE.",
              "$45 strike, 45 DTE.",
            ],
            correct: 1,
            explain:
              "Any strike below effective cost basis of $43.80 risks locking in a loss for the premium. The $42 strike is the clearest violation.",
          },
          {
            id: "q3",
            prompt:
              "Why does the framework suggest closing puts at 50% of premium collected instead of holding to expiration?",
            options: [
              "To avoid assignment at all costs.",
              "Capital efficiency: you release collateral sooner and can deploy on the next cycle.",
              "It&apos;s safer.",
              "The math says 50% is the perfect number.",
            ],
            correct: 1,
            explain:
              "Wheel returns compound through turnover. 50% is a pragmatic balance between locking profit and letting theta keep working. It&apos;s a heuristic, not a law.",
          },
        ]}
      />

      <Reflection
        prompt="List 3 stocks you&apos;d actually be happy to own at 10-15% below current price. For each, what&apos;s the strike you&apos;d sell the first put at, and why that strike?"
        minChars={150}
      />

      <CompleteModule
        nextPath="/trading"
        nextLabel="Back to Markets"
        requireChecklistKey={CHECKLIST_KEY}
        requireChecklistCount={CHECKLIST_COUNT}
      />
    </Lesson>
  );
}
