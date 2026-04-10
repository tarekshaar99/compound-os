"use client";

import SectionLayout, { SectionItem } from "../components/SectionLayout";
import { Card, StatBox, Table } from "../components/Card";

const SECTIONS: SectionItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "△" },
  { id: "training", label: "Training Programs", icon: "🏋️" },
  { id: "nutrition", label: "Nutrition", icon: "🥩" },
  { id: "recovery", label: "Recovery", icon: "😴" },
  { id: "supplements", label: "Supplements", icon: "💊" },
  { id: "mobility", label: "Mobility", icon: "🧘" },
  { id: "metrics", label: "Key Metrics", icon: "📏" },
  { id: "protocols", label: "Protocols", icon: "📋" },
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
      <SectionTitle>Fitness Dashboard</SectionTitle>
      <Sub>Training, nutrition, and recovery — the physical foundation that powers everything else.</Sub>
      <div className="flex flex-wrap gap-3.5 mb-7">
        <StatBox label="Training Split" value="PPL" sub="Push / Pull / Legs" />
        <StatBox label="Protein Target" value="1g/lb" sub="Body weight in grams" />
        <StatBox label="Sleep Target" value="7-9hr" sub="Non-negotiable recovery" />
        <StatBox label="Training Days" value="4-6/wk" sub="Consistency over intensity" />
      </div>
      <Card title="Fitness Operating Principles" accent="#f97316">
        <P><B>1. Consistency beats intensity.</B> Showing up 4x/week for years beats going hard for 2 weeks.</P>
        <P><B>2. Progressive overload.</B> More weight, more reps, or more sets over time. Never stay the same.</P>
        <P><B>3. Recovery is training.</B> You grow when you rest, not when you lift.</P>
        <P><B>4. Nutrition is 80%.</B> You can&apos;t out-train a bad diet. Protein and calories first.</P>
        <P last><B>5. Track everything.</B> If you&apos;re not tracking, you&apos;re guessing.</P>
      </Card>
      <Card title="The Non-Negotiables" accent="#ff6b6b">
        <P>• Hit protein target every single day</P>
        <P>• 7+ hours of sleep</P>
        <P>• Never miss 2 training days in a row</P>
        <P last>• 10 min mobility daily</P>
      </Card>
    </>
  );
}

function Training() {
  return (
    <>
      <SectionTitle>Training Programs</SectionTitle>
      <Sub>Structured programs for different goals. Pick one, follow it for 8-12 weeks, then reassess.</Sub>
      <Card title="Push / Pull / Legs (PPL) — 6 Day" accent="#f97316">
        <Table
          headers={["Day", "Focus", "Key Lifts"]}
          rows={[
            ["Monday", "Push", "Bench Press, OHP, Incline DB, Lateral Raises, Triceps"],
            ["Tuesday", "Pull", "Deadlift, Barbell Row, Pull-ups, Face Pulls, Biceps"],
            ["Wednesday", "Legs", "Squat, RDL, Leg Press, Leg Curl, Calf Raises"],
            ["Thursday", "Push", "OHP, Incline Bench, Cable Flyes, Lateral Raises, Triceps"],
            ["Friday", "Pull", "Barbell Row, Weighted Chins, Cable Rows, Rear Delts, Biceps"],
            ["Saturday", "Legs", "Front Squat, RDL, Bulgarian Split Squat, Leg Extension, Calves"],
            ["Sunday", "Rest", "Active recovery, mobility, walking"],
          ]}
        />
      </Card>
      <Card title="Upper / Lower — 4 Day" accent="#4ecdc4">
        <Table
          headers={["Day", "Focus", "Key Lifts"]}
          rows={[
            ["Monday", "Upper", "Bench, Row, OHP, Pull-ups, Arms"],
            ["Tuesday", "Lower", "Squat, RDL, Leg Press, Calves, Core"],
            ["Wednesday", "Rest", "Cardio / mobility"],
            ["Thursday", "Upper", "OHP, Cable Row, Incline DB, Face Pulls, Arms"],
            ["Friday", "Lower", "Deadlift, Front Squat, Lunges, Leg Curl, Core"],
            ["Sat-Sun", "Rest", "Active recovery"],
          ]}
        />
      </Card>
      <Card title="Progressive Overload Rules" accent="#ffd93d">
        <P>• When you hit the top of the rep range for all sets, increase weight next session</P>
        <P>• Increase weight by the smallest increment possible (2.5-5 lbs)</P>
        <P>• If you miss reps after increasing weight, stay at that weight until you hit the range</P>
        <P last>• Log every session. Review monthly for stalls.</P>
      </Card>
    </>
  );
}

function Nutrition() {
  return (
    <>
      <SectionTitle>Nutrition</SectionTitle>
      <Sub>Food is fuel and recovery. Get the basics right before worrying about optimization.</Sub>
      <Card title="Macro Targets (Adjust to goals)" accent="#f97316">
        <Table
          headers={["Goal", "Calories", "Protein", "Fats", "Carbs"]}
          rows={[
            ["Cutting", "BW × 10-12", "1.2g/lb", "0.3-0.4g/lb", "Fill remaining"],
            ["Maintenance", "BW × 14-16", "1g/lb", "0.3-0.4g/lb", "Fill remaining"],
            ["Bulking", "BW × 16-20", "1g/lb", "0.3-0.4g/lb", "Fill remaining"],
          ]}
        />
      </Card>
      <Card title="Meal Timing" accent="#4ecdc4">
        <P>• Pre-workout: Protein + carbs 1-2 hours before training</P>
        <P>• Post-workout: Protein + carbs within 2 hours of training</P>
        <P>• Spread protein across 3-5 meals (30-50g per meal)</P>
        <P last>• Total daily intake matters more than timing. Don&apos;t overthink it.</P>
      </Card>
      <Card title="Protein Priority List" accent="#ffd93d">
        <P>1. Chicken breast / thigh</P>
        <P>2. Ground beef / steak</P>
        <P>3. Eggs / egg whites</P>
        <P>4. Greek yogurt / cottage cheese</P>
        <P>5. Fish (salmon, tuna, white fish)</P>
        <P>6. Whey protein (supplement, not replacement)</P>
        <P last>7. Turkey, shrimp, tofu</P>
      </Card>
    </>
  );
}

function Recovery() {
  return (
    <>
      <SectionTitle>Recovery</SectionTitle>
      <Sub>Training is the stimulus. Recovery is where the adaptation happens.</Sub>
      <Card title="Sleep Protocol" accent="#f97316">
        <P><B>Target:</B> 7-9 hours every night. Non-negotiable.</P>
        <P>• Same bedtime and wake time every day (±30 min)</P>
        <P>• Room temp 65-68°F / 18-20°C</P>
        <P>• No screens 30-60 min before bed</P>
        <P>• No caffeine after 2pm</P>
        <P last>• Blackout curtains + cool room = deep sleep</P>
      </Card>
      <Card title="Active Recovery" accent="#4ecdc4">
        <P>• Walking: 8,000-10,000 steps daily (non-exercise activity)</P>
        <P>• Light stretching or yoga on rest days</P>
        <P>• Foam rolling for 10 min post-workout</P>
        <P last>• Sauna 2-3x/week if available (15-20 min at 170-180°F)</P>
      </Card>
      <Card title="Deload Weeks" accent="#ffd93d">
        <P>Every 4-6 weeks, reduce volume or intensity by 40-50% for one week.</P>
        <P>Signs you need a deload: persistent fatigue, strength plateau, joint pain, poor sleep.</P>
        <P last>Deloads are not weakness — they&apos;re how you extend training longevity.</P>
      </Card>
    </>
  );
}

function Supplements() {
  return (
    <>
      <SectionTitle>Supplements</SectionTitle>
      <Sub>Supplements are the last 5%. Get training, nutrition, and sleep right first.</Sub>
      <Card title="Evidence-Based Stack" accent="#f97316">
        <Table
          headers={["Supplement", "Dose", "Timing", "Why"]}
          rows={[
            ["Creatine Monohydrate", "5g/day", "Any time", "Most researched supplement. Strength + recovery."],
            ["Whey Protein", "25-50g", "Post-workout / as needed", "Convenient protein to hit daily target."],
            ["Vitamin D3", "2000-5000 IU", "Morning with fat", "Most people are deficient. Immune + mood."],
            ["Magnesium Glycinate", "200-400mg", "Before bed", "Sleep quality + muscle recovery."],
            ["Fish Oil (Omega-3)", "2-3g EPA+DHA", "With meals", "Anti-inflammatory. Joint health."],
            ["Caffeine", "100-200mg", "Pre-workout (before 2pm)", "Performance enhancer. Don't overdo it."],
          ]}
        />
      </Card>
      <Card title="Skip These" accent="#ff6b6b">
        <P>• BCAAs — useless if you eat enough protein</P>
        <P>• Fat burners — expensive caffeine pills</P>
        <P>• Testosterone boosters — don&apos;t work</P>
        <P last>• Anything with a proprietary blend — they&apos;re hiding underdosed ingredients</P>
      </Card>
    </>
  );
}

function Mobility() {
  return (
    <>
      <SectionTitle>Mobility</SectionTitle>
      <Sub>Mobility is the foundation that lets you train pain-free for decades.</Sub>
      <Card title="Daily Mobility Routine (10 min)" accent="#f97316">
        <P>• Cat-cow stretches — 10 reps (spine)</P>
        <P>• World&apos;s greatest stretch — 5 each side (hips, thoracic)</P>
        <P>• 90/90 hip stretch — 30 sec each side</P>
        <P>• Shoulder dislocations with band — 10 reps</P>
        <P>• Deep squat hold — 60 seconds</P>
        <P last>• Dead hang — 30-60 seconds (shoulders + grip)</P>
      </Card>
      <Card title="Pre-Workout Warm-Up" accent="#4ecdc4">
        <P>• 5 min light cardio (bike, walking)</P>
        <P>• Dynamic stretches for the muscles you&apos;re training</P>
        <P>• 2-3 warm-up sets of your first exercise (ascending weight)</P>
        <P last>• Never go straight to working weight. Your joints will thank you in 10 years.</P>
      </Card>
    </>
  );
}

function Metrics() {
  return (
    <>
      <SectionTitle>Key Metrics</SectionTitle>
      <Sub>Track these consistently. What gets measured gets managed.</Sub>
      <Card title="Weekly Tracking" accent="#f97316">
        <Table
          headers={["Metric", "Frequency", "Why"]}
          rows={[
            ["Body weight", "Daily (avg weekly)", "Trend matters, not daily fluctuation"],
            ["Training volume", "Every session", "Progressive overload verification"],
            ["Protein intake", "Daily", "Non-negotiable macro target"],
            ["Sleep hours", "Daily", "Recovery quality"],
            ["Steps", "Daily", "Non-exercise activity level"],
            ["Key lifts (1RM est)", "Monthly", "Strength progression"],
            ["Waist measurement", "Weekly", "Body comp changes (more reliable than scale)"],
          ]}
        />
      </Card>
      <Card title="Progress Photos" accent="#ffd93d">
        <P>• Same lighting, same time of day, same pose</P>
        <P>• Front, side, back</P>
        <P>• Every 4 weeks minimum</P>
        <P last>• The mirror lies. Photos don&apos;t. Compare month-over-month, never day-to-day.</P>
      </Card>
    </>
  );
}

function Protocols() {
  return (
    <>
      <SectionTitle>Protocols</SectionTitle>
      <Sub>Specific protocols for common goals and situations.</Sub>
      <Card title="Mini Cut (4-6 weeks)" accent="#ff6b6b">
        <P><B>When:</B> Body fat has crept up during a bulk. Want to reset without a full cut.</P>
        <P><B>Calories:</B> BW × 10-11. Aggressive but short.</P>
        <P><B>Protein:</B> Increase to 1.2-1.3g/lb to preserve muscle.</P>
        <P><B>Training:</B> Maintain intensity. Reduce volume by 1-2 sets per exercise.</P>
        <P last><B>Duration:</B> Max 6 weeks. Then return to maintenance or slight surplus.</P>
      </Card>
      <Card title="Lean Bulk (12-20 weeks)" accent="#4ecdc4">
        <P><B>When:</B> Body fat is low enough. Ready to add muscle.</P>
        <P><B>Surplus:</B> 200-300 calories above maintenance. Slow and steady.</P>
        <P><B>Weight gain:</B> 0.5-1 lb/week. Faster = too much fat gain.</P>
        <P><B>Training:</B> Push progressive overload hard. This is when you grow.</P>
        <P last><B>Exit:</B> When body fat gets uncomfortable or strength gains stall.</P>
      </Card>
      <Card title="Travel / Deload Protocol" accent="#ffd93d">
        <P>• Hit protein target (pack protein bars/shakes)</P>
        <P>• Hotel gym: push-ups, pull-ups, DB work — anything is better than nothing</P>
        <P>• Walk as much as possible</P>
        <P>• Prioritize sleep over everything</P>
        <P last>• 1 week off won&apos;t kill your progress. Stress about it will hurt more than the break.</P>
      </Card>
    </>
  );
}

const SECTION_MAP: Record<string, () => React.ReactNode> = {
  dashboard: Dashboard,
  training: Training,
  nutrition: Nutrition,
  recovery: Recovery,
  supplements: Supplements,
  mobility: Mobility,
  metrics: Metrics,
  protocols: Protocols,
};

export default function FitnessPage() {
  return (
    <SectionLayout
      title="Fitness"
      subtitle="Training, Nutrition & Recovery"
      accent="var(--accent-fitness)"
      sections={SECTIONS}
    >
      {(active) => {
        const Component = SECTION_MAP[active] ?? Dashboard;
        return <Component />;
      }}
    </SectionLayout>
  );
}
