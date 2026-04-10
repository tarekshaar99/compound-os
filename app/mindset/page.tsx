"use client";

import SectionLayout, { SectionItem } from "../components/SectionLayout";
import { Card, StatBox } from "../components/Card";

const SECTIONS: SectionItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "◉" },
  { id: "mental-models", label: "Mental Models", icon: "🧠" },
  { id: "discipline", label: "Discipline Systems", icon: "⚡" },
  { id: "journaling", label: "Journaling", icon: "📝" },
  { id: "stoicism", label: "Stoicism", icon: "🏛" },
  { id: "emotional-reg", label: "Emotional Regulation", icon: "🎯" },
  { id: "habits", label: "Habit Architecture", icon: "🔁" },
  { id: "focus", label: "Deep Focus", icon: "🔬" },
  { id: "book-notes", label: "Book Notes", icon: "📖" },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{children}</h2>;
}

function Sub({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-[var(--text-secondary)] mb-7 leading-relaxed">{children}</p>;
}

function B({ children }: { children: React.ReactNode }) {
  return <strong className="text-[var(--text-primary)]">{children}</strong>;
}

function P({ children, last }: { children: React.ReactNode; last?: boolean }) {
  return <p className={last ? "m-0" : "mb-2"}>{children}</p>;
}

function Dashboard() {
  return (
    <>
      <SectionTitle>Mindset Dashboard</SectionTitle>
      <Sub>Mental frameworks, discipline systems, and emotional regulation — the operating system behind the operator.</Sub>
      <div className="flex flex-wrap gap-3.5 mb-7">
        <StatBox label="Core Principle" value="Process > Outcome" sub="Focus on what you can control" />
        <StatBox label="Daily Non-Negotiable" value="Journal" sub="Morning reflection, evening review" />
        <StatBox label="Decision Framework" value="Inversion" sub="Think about what to avoid" />
        <StatBox label="Key Habit" value="Deep Work" sub="4hr focused blocks minimum" />
      </div>
      <Card title="Mindset Operating Principles" accent="#a78bfa">
        <P><B>1. Process over outcome</B> — you control the inputs, not the results. Stick to the system.</P>
        <P><B>2. Discomfort is the signal</B> — if it&apos;s easy, you&apos;re not growing. Lean into resistance.</P>
        <P><B>3. Clarity through writing</B> — you don&apos;t know what you think until you write it down.</P>
        <P><B>4. Environment {'>'} willpower</B> — design your surroundings to make the right choice automatic.</P>
        <P last><B>5. Identity-based change</B> — become the type of person who does X, don&apos;t just do X.</P>
      </Card>
      <Card title="Daily Reset Protocol" accent="#f97316">
        <P>• Morning: 10 min journal — intentions, gratitude, one thing to avoid</P>
        <P>• Midday: 5 min check-in — am I in reactive or proactive mode?</P>
        <P last>• Evening: 10 min review — what worked, what didn&apos;t, what to adjust tomorrow</P>
      </Card>
    </>
  );
}

function MentalModels() {
  return (
    <>
      <SectionTitle>Mental Models</SectionTitle>
      <Sub>Thinking tools that compound over time. The better your models, the better your decisions.</Sub>
      <Card title="Inversion" accent="#a78bfa">
        <P><B>Instead of:</B> &quot;How do I succeed?&quot;</P>
        <P><B>Ask:</B> &quot;What would guarantee failure?&quot; Then avoid those things.</P>
        <P last>Charlie Munger: &quot;All I want to know is where I&apos;m going to die, so I&apos;ll never go there.&quot;</P>
      </Card>
      <Card title="Second-Order Thinking" accent="#4ecdc4">
        <P><B>First order:</B> What happens next?</P>
        <P><B>Second order:</B> And then what? What are the consequences of the consequences?</P>
        <P last>Most people stop at first order. The edge is thinking further out.</P>
      </Card>
      <Card title="Circle of Competence" accent="#ffd93d">
        <P>Know where your edge is. Stay inside it. Expand it deliberately.</P>
        <P last>The worst mistakes come from acting confidently outside your circle.</P>
      </Card>
      <Card title="Probabilistic Thinking" accent="#ff6b6b">
        <P>Nothing is certain. Assign probabilities. Update them with new information.</P>
        <P last>Being &quot;wrong&quot; doesn&apos;t mean the decision was bad — evaluate the process, not the outcome.</P>
      </Card>
    </>
  );
}

function Discipline() {
  return (
    <>
      <SectionTitle>Discipline Systems</SectionTitle>
      <Sub>Discipline isn&apos;t willpower — it&apos;s systems that make the right action the default action.</Sub>
      <Card title="The 3 Rules of Discipline" accent="#a78bfa">
        <P><B>1. Never negotiate with yourself in the moment.</B> The decision was already made when you set the rule.</P>
        <P><B>2. Make it binary.</B> &quot;I do X every day&quot; is stronger than &quot;I try to do X most days.&quot;</P>
        <P last><B>3. Track the streak.</B> Consistency compounds. Missing once is a mistake. Missing twice is a new habit.</P>
      </Card>
      <Card title="Implementation Intentions" accent="#4ecdc4">
        <P>Don&apos;t say: &quot;I&apos;ll work out more.&quot;</P>
        <P>Say: &quot;At 6am on Mon/Wed/Fri, I go to the gym. No conditions.&quot;</P>
        <P last>Specificity removes the decision point. The decision is already made.</P>
      </Card>
    </>
  );
}

function Journaling() {
  return (
    <>
      <SectionTitle>Journaling Frameworks</SectionTitle>
      <Sub>Writing is thinking. These frameworks turn reflection into compounding clarity.</Sub>
      <Card title="Morning Page (5 min)" accent="#a78bfa">
        <P>• What is the ONE thing that matters most today?</P>
        <P>• What am I grateful for?</P>
        <P>• What would make today a 10/10?</P>
        <P last>• What is one thing I should NOT do today?</P>
      </Card>
      <Card title="Evening Review (5 min)" accent="#ffd93d">
        <P>• Did I follow my process today?</P>
        <P>• What decision did I make that I&apos;m most proud of?</P>
        <P>• What would I do differently?</P>
        <P last>• One insight I gained today.</P>
      </Card>
      <Card title="Weekly Review (30 min)" accent="#ff6b6b">
        <P>• What were my 3 biggest wins this week?</P>
        <P>• What patterns am I noticing (good and bad)?</P>
        <P>• Am I on track with my 90-day goals?</P>
        <P last>• What is my #1 focus for next week?</P>
      </Card>
    </>
  );
}

function Stoicism() {
  return (
    <>
      <SectionTitle>Stoicism</SectionTitle>
      <Sub>Ancient wisdom for modern performance. Control what you can. Accept what you can&apos;t.</Sub>
      <Card title="The Dichotomy of Control" accent="#a78bfa">
        <P><B>In your control:</B> Your effort, your attitude, your preparation, your response.</P>
        <P><B>Not in your control:</B> Markets, other people, outcomes, the past.</P>
        <P last>Focus ruthlessly on column A. Let go of column B.</P>
      </Card>
      <Card title="Premeditatio Malorum" accent="#ff6b6b">
        <P>Visualize what can go wrong. Not to create anxiety — to prepare.</P>
        <P>In trading: &quot;What if I get assigned on every position this month?&quot; → You should have a plan.</P>
        <P last>In life: &quot;What if this fails completely?&quot; → If you can handle the worst case, proceed with confidence.</P>
      </Card>
      <Card title="Amor Fati" accent="#4ecdc4">
        <P>Love your fate. Every setback contains a lesson or an opportunity.</P>
        <P last>The assignment at a bad price → forced to learn covered call management → now a better trader.</P>
      </Card>
    </>
  );
}

function EmotionalReg() {
  return (
    <>
      <SectionTitle>Emotional Regulation</SectionTitle>
      <Sub>Emotions are data, not directives. Feel them, name them, then decide rationally.</Sub>
      <Card title="The STOP Protocol" accent="#a78bfa">
        <P><B>S</B> — Stop. Pause before reacting.</P>
        <P><B>T</B> — Take a breath. Create space between stimulus and response.</P>
        <P><B>O</B> — Observe. What am I feeling? Name it specifically.</P>
        <P last><B>P</B> — Proceed. Now choose your response deliberately.</P>
      </Card>
      <Card title="Trading-Specific Triggers" accent="#ff6b6b">
        <P>• <B>FOMO:</B> &quot;The market will always give another opportunity. Missing one trade changes nothing.&quot;</P>
        <P>• <B>Revenge trading:</B> &quot;The market doesn&apos;t know or care about my P&L. A new trade is a new decision.&quot;</P>
        <P>• <B>Panic on drawdown:</B> &quot;Is my thesis still valid? If yes, the price action is noise.&quot;</P>
        <P last>• <B>Overconfidence after wins:</B> &quot;Winning streak ≠ skill increase. Stick to position sizing rules.&quot;</P>
      </Card>
    </>
  );
}

function Habits() {
  return (
    <>
      <SectionTitle>Habit Architecture</SectionTitle>
      <Sub>You don&apos;t rise to the level of your goals. You fall to the level of your systems.</Sub>
      <Card title="Habit Stack Framework" accent="#a78bfa">
        <P>After [current habit], I will [new habit].</P>
        <P>Example: &quot;After I pour my morning coffee, I will open my journal and write for 5 minutes.&quot;</P>
        <P last>Attach new behaviors to existing anchors. It removes the need for motivation.</P>
      </Card>
      <Card title="The 2-Minute Rule" accent="#4ecdc4">
        <P>Any new habit should take less than 2 minutes to start.</P>
        <P>&quot;Read before bed&quot; → &quot;Read one page before bed.&quot;</P>
        <P last>The goal is to show up. Volume comes naturally once the identity is established.</P>
      </Card>
    </>
  );
}

function Focus() {
  return (
    <>
      <SectionTitle>Deep Focus</SectionTitle>
      <Sub>The ability to focus without distraction is becoming the most valuable skill in the economy.</Sub>
      <Card title="Deep Work Protocol" accent="#a78bfa">
        <P><B>Block:</B> 2-4 hour uninterrupted blocks. No phone, no notifications, no meetings.</P>
        <P><B>Environment:</B> Same place, same time. Let the context trigger the state.</P>
        <P><B>Shutdown:</B> Hard stop. When the block ends, you&apos;re done. Recovery is part of the system.</P>
        <P last><B>Track:</B> Log deep work hours. What gets measured gets managed.</P>
      </Card>
      <Card title="Attention Residue" accent="#ff6b6b">
        <P>When you switch tasks, part of your attention stays on the previous task.</P>
        <P>This is why multitasking destroys productivity. Single-task everything.</P>
        <P last>Close all tabs. One thing at a time. Finish before switching.</P>
      </Card>
    </>
  );
}

function BookNotes() {
  return (
    <>
      <SectionTitle>Book Notes</SectionTitle>
      <Sub>Key takeaways from books that shaped this operating system. Add yours as you read.</Sub>
      <Card title="Atomic Habits — James Clear" accent="#a78bfa">
        <P>• Every action is a vote for the type of person you wish to become</P>
        <P>• 1% better every day = 37x better in a year</P>
        <P last>• Make it obvious, attractive, easy, satisfying</P>
      </Card>
      <Card title="Thinking, Fast and Slow — Daniel Kahneman" accent="#4ecdc4">
        <P>• System 1 (fast, intuitive) vs System 2 (slow, rational)</P>
        <P>• Most trading errors come from System 1 overriding System 2</P>
        <P last>• Checklists force System 2 engagement at critical moments</P>
      </Card>
      <Card title="Meditations — Marcus Aurelius" accent="#ffd93d">
        <P>• You have power over your mind, not outside events. Realize this.</P>
        <P>• The impediment to action advances action. What stands in the way becomes the way.</P>
        <P last>• Waste no more time arguing about what a good person should be. Be one.</P>
      </Card>
    </>
  );
}

const SECTION_MAP: Record<string, () => React.ReactNode> = {
  dashboard: Dashboard,
  "mental-models": MentalModels,
  discipline: Discipline,
  journaling: Journaling,
  stoicism: Stoicism,
  "emotional-reg": EmotionalReg,
  habits: Habits,
  focus: Focus,
  "book-notes": BookNotes,
};

export default function MindsetPage() {
  return (
    <SectionLayout
      title="Mindset"
      subtitle="Mental Models & Discipline"
      accent="var(--accent-mindset)"
      sections={SECTIONS}
    >
      {(active) => {
        const Component = SECTION_MAP[active] ?? Dashboard;
        return <Component />;
      }}
    </SectionLayout>
  );
}
