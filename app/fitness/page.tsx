"use client";

import { useState } from "react";
import Link from "next/link";
import Paywall from "../components/Paywall";

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
    id: "philosophy",
    icon: "◈",
    title: "Philosophy & Principles",
    subtitle: "The hybrid athlete identity",
    color: "#F97316",
    intro:
      "This system serves one identity: the hybrid athlete. Not a powerlifter who jogs. Not a runner who lifts. A person whose body is simultaneously strong, fast, mobile, lean, and resilient. Every session earns its place by serving at least two of those qualities.",
    sections: [
      {
        heading: "The Hybrid Athlete",
        content: `The goal is not to be the strongest person in the gym or the fastest person on the track. The goal is to be dangerous at both. Strong enough to move serious weight, fit enough to run hard for 30+ minutes, mobile enough to move freely into old age.

Most training programs optimize for one quality at the expense of everything else. Powerlifters lose their cardiovascular capacity. Runners lose their muscle mass. Bodybuilders can barely touch their toes. The hybrid approach refuses to sacrifice any pillar.

The hierarchy of priorities, in order: health and longevity first (no session is worth an injury or a burnout), cardiovascular capacity second (the aerobic engine is the foundation of every other athletic quality), functional strength third (maintained through quality movement, not chased through maximal loads), body composition fourth (the byproduct of consistent nutrition and training, never the target of extreme measures), and mobility fifth (the enabler of everything above).

This is not about doing more. It is about doing the right things in the right proportions.`,
      },
      {
        heading: "Time Under Tension Over Load",
        content: `The default tempo for all strength work is 3-1-2-0: three seconds on the eccentric (lowering), one second pause, two seconds on the concentric (lifting), zero seconds at the top before the next rep.

This eliminates momentum, increases mechanical tension per rep, and forces honest load selection. If you cannot hold tempo, the weight is too heavy. No exceptions. A 60 kg squat with perfect 3-1-2-0 tempo will build more muscle than a 100 kg squat bounced out of the hole with zero control.

Starting loads should be 60-65% of your historical max. This feels light on paper. In practice, with strict tempo, it is humbling. The ego wants to go heavy. The intelligent athlete wants to go controlled.

Progression follows a strict hierarchy: tempo compliance first, then reps, then load. Never add weight until tempo and reps are both met. When you hit the top of your rep range with clean tempo for two consecutive sessions, add 2.5 kg for upper body lifts or 5 kg for lower body lifts.`,
      },
      {
        heading: "Density Over Volume",
        content: `Every strength session uses superset formatting. You pair two exercises together and rest only between supersets (60-90 seconds), not between the individual exercises within a pair.

This keeps your heart rate elevated throughout the session, creating a dual benefit: you get your strength stimulus while simultaneously training your cardiovascular system. It compresses total session time and builds work capacity. You will do more total work in less time than someone resting three minutes between every set.

A well-structured superset session takes 60-75 minutes including warm-up and a core finisher. If you are spending 90+ minutes lifting weights, you are resting too much or doing too many exercises.

Pair opposing movement patterns for best results: push with pull, quad-dominant with hip-dominant, upper with lower. This lets one muscle group recover while the other works.`,
      },
      {
        heading: "The 80/20 Cardio Rule",
        content: `80% of your running or cardio volume should be Zone 2: conversational pace, nose-breathing possible, heart rate well below your threshold. The remaining 20% should be structured high-intensity work: intervals, tempo runs, or threshold sessions.

This ratio maximizes aerobic adaptation while minimizing injury risk and interference with strength recovery. Most recreational runners invert this ratio, going moderately hard on every single run. They are always tired, always sore, never fast, and constantly injured.

Zone 2 develops mitochondrial density, capillary networks, and fat oxidation capacity. It builds the aerobic floor that makes everything else possible. It is also the session most people skip or rush. Respect the pace. Slow is fast.

The hard sessions (intervals, tempo) are where your VO2 max ceiling gets pushed higher, your running economy improves, and your ability to clear lactate under load develops. But these sessions only work if you are recovered enough to actually hit the prescribed paces. Which means your easy days need to be genuinely easy.`,
      },
      {
        heading: "Autoregulation Over Rigidity",
        content: `The program prescribes targets, not mandates. Every session includes RPE (Rate of Perceived Exertion) guidance and should incorporate wearable data if available.

A moderate day with reduced volume beats a forced full session that puts you in the red for 48 hours. Recovery is not linear. Some weeks you will feel unstoppable. Other weeks your body will ask for rest. The intelligent athlete listens.

RPE works on a simple scale: 6 means you could do four more reps (moderate effort, good for foundation phases), 7 means three more reps (working but controlled), 8 means two more reps (challenging but clean, the sweet spot for building phases), 9 means one more rep (near your limit with good form, for peak phases only). You should never hit RPE 10 (true failure) in a hybrid program. Leaving 1-2 reps in reserve protects joints, ensures recovery between sessions, and allows your aerobic work to coexist with strength training.

Training to failure is a tool for peaking, not for hybrid development.`,
      },
    ],
  },
  {
    id: "schedule",
    icon: "📅",
    title: "Weekly Structure",
    subtitle: "5 days on, 1 flex, 1 rest",
    color: "#EF4444",
    intro:
      "The weekly schedule alternates strength and cardio days to prevent compounding fatigue on the same energy system. Lower body strength is placed 48+ hours before intervals so your legs recover for speed work. The structure is fixed but the intensity adapts to your readiness.",
    sections: [
      {
        heading: "The Weekly Template",
        content: `Monday: Strength A (Lower Body + Push). 70-75 minutes. Time under tension emphasis with superset formatting. Squats, Romanian deadlifts, incline pressing, lunges, and a core finisher.

Tuesday: Easy Run (Zone 2). 40-55 minutes. Conversational pace, heart rate below your Zone 2 ceiling. This is your aerobic base builder. Do not rush it.

Wednesday: Strength B (Upper Body + Posterior Chain). 70-75 minutes. Pull-ups or pulldowns, rows, floor press, face pulls, farmer carries, and arm work.

Thursday: Interval Run. 50-60 minutes total including warm-up and cool-down. Rotate between 1000m repeats (VO2 max), 400m repeats (speed), and tempo blocks (lactate threshold).

Friday: Strength C (Full Body Hypertrophy). 70-75 minutes. Moderate loads, higher reps, shorter rest. Leg press, overhead press, pulldowns, hamstring curls, cable flies, and lateral raises. This session drives hypertrophy and work capacity without excessive CNS fatigue.

Saturday (Optional): Flexible aerobic session. Choose based on what the week demanded: long Zone 2 run (8-15 km), tempo run, pool swim, bike, hike, or a second easy run. Keep it mostly aerobic unless replacing a missed interval day.

Sunday: Full rest. Walk, stretch, sauna, recover. A 15-20 minute recovery flow if you want to move.`,
      },
      {
        heading: "Why This Order",
        content: `The sequencing is deliberate. Strength and running alternate daily so you never compound fatigue on the same energy system two days in a row.

Lower body strength on Monday means your legs have 48+ hours to recover before Thursday's intervals. This is critical. If you squat heavy on Wednesday and try to run fast on Thursday, both sessions suffer.

Upper body strength on Wednesday sits between the two run days, creating maximum separation between lower body demands. Your legs get a full break.

Friday's hypertrophy session uses lighter loads and higher reps to finish the week without crushing your central nervous system. It provides volume and metabolic stress, which drives muscle growth, without the neural fatigue of heavy compound lifts.

Saturday is flexible precisely because life is not predictable. Some weeks you will feel fresh and want a long run. Other weeks you will need an easy swim or a hike. The only rule: keep it primarily aerobic (Zone 2-3) unless you are replacing a missed interval session.`,
      },
      {
        heading: "Compressed Sessions (When Time Is Short)",
        content: `Every strength session has a 45-minute compressed version. The principle: cut accessories and reduce sets on compounds, but keep the warm-up and the core finisher. You still hit every primary movement pattern.

For Strength A: cut the lunges and pressing accessory entirely. Reduce squats to 3 sets. Reduce deadlifts and incline press to 2 sets each. Keep the warm-up (shorten to 7 minutes) and the core finisher.

For Strength B: cut arm work entirely. Reduce pull-ups to 3 sets. Reduce face pulls and carries to 2 sets. Keep warm-up and finisher.

For Strength C: cut lateral raises, cable crunches, and calf finisher. Reduce leg press to 3 sets. Reduce cable flies and lunges to 2 sets. Keep warm-up.

For cardio: a 20-minute Zone 2 jog is better than skipping entirely. Or run a shortened interval session: 10 minutes warm-up, 4x400m hard, 5 minutes cool-down. 25 minutes total.

If you have no gym at all: 20 minutes of bodyweight circuits (push-ups, squats, lunges, plank, dead bugs) plus 10 minutes of mobility. This counts as a session. Something always beats nothing.`,
      },
    ],
  },
  {
    id: "strength",
    icon: "🏋️",
    title: "Strength Training",
    subtitle: "Three sessions, superset format, controlled tempo",
    color: "#F59E0B",
    intro:
      "Strength in a hybrid program is not about chasing one-rep maxes. It is about building and maintaining functional muscle mass through quality movement, progressive overload via reps and tempo before load, and intelligent fatigue management that leaves room for your cardio to coexist.",
    sections: [
      {
        heading: "Strength A: Lower Body + Push (Monday)",
        content: `Warm-up (10 minutes): Hip 90/90 transitions, 8 per side. World's greatest stretch, 5 per side. Band pull-aparts, 15 reps. Bodyweight squat with 3-second hold at the bottom, 10 reps. Ankle dorsiflexion against wall, 30 seconds per side.

Superset A: Back Squat (4 x 8-10, tempo 3-1-2-0) paired with Half-Kneeling Pallof Press (3 x 10 per side, 2-second hold at extension). Rest 75 seconds between supersets. Full depth on the squat, pause at the bottom. If back squats aggravate your knees or back, substitute goblet squat or front squat.

Superset B: Romanian Deadlift (3 x 10-12, tempo 3-1-2-0) paired with Incline Dumbbell Press, neutral grip (3 x 10-12, tempo 3-1-2-0). Rest 75 seconds. Hinge from hips on the deadlift, slight knee bend, feel hamstrings load eccentrically. No bouncing off the floor. Neutral grip on the press protects the shoulder joint.

Superset C: Walking Lunges with dumbbells (3 x 10 per leg) paired with Landmine Press or Z-Press (3 x 10 per arm, tempo 2-1-2-0). Rest 60 seconds. Upright torso on lunges, controlled step, knee tracks over toe.

Finisher (5 minutes): 2 rounds of Dead Bugs (10 per side) + Side Plank (30 seconds per side) + Cat-Cow (10 reps). No rest between exercises. 30 seconds between rounds.`,
      },
      {
        heading: "Strength B: Upper Body + Posterior Chain (Wednesday)",
        content: `Warm-up (10 minutes): Shoulder CARs, 5 per direction per arm. Band dislocates, 15 reps. Cat-cow, 10 reps. Thoracic spine rotation (open book), 8 per side. Scapular push-ups, 10 reps.

Superset A: Pull-Ups or Neutral Grip Lat Pulldown (4 x 8-10, tempo 3-0-1-1, slow eccentric with pause at top) paired with Single-Leg Romanian Deadlift with dumbbell (3 x 8 per side, tempo 3-1-2-0). Rest 75 seconds. If bodyweight pull-ups are easy for 10, add weight. If below 8, use the pulldown.

Superset B: Seated Cable Row, close grip (3 x 12, tempo 2-1-2-1, squeeze at contraction) paired with Dumbbell Floor Press, neutral grip (3 x 10-12, tempo 3-1-2-0). Rest 75 seconds. The floor press limits range of motion at the bottom, protecting the shoulder. Full lockout at the top.

Superset C: Face Pulls with rope (3 x 15, slow, external rotate at top) paired with Farmer Carries (3 x 40m or 30-40 seconds). Rest 60 seconds. Face pulls are prehab, not ego work. Light weight, perfect form. Farmer carries use the heaviest dumbbells you can carry with perfect posture: shoulders packed, core braced, deliberate steps.

Superset D: Dumbbell Curl + Tricep Pushdown (3 x 12 each, tempo 2-1-2-0). Rest 45 seconds. Arm volume with controlled reps, full range of motion, no swinging.

Finisher (5 minutes): 2 rounds of Copenhagen Plank (20 seconds per side) + Hollow Body Hold (30 seconds). Rest 30 seconds between rounds.`,
      },
      {
        heading: "Strength C: Full Body Hypertrophy (Friday)",
        content: `This session provides volume across all muscle groups at moderate loads with higher reps. The metabolic stress from shorter rest and higher reps drives hypertrophy and work capacity without the CNS fatigue of heavy compounds.

Warm-up (10 minutes): Full mobility flow with hip circles, leg swings, arm circles, thoracic rotations. Then 2 rounds of 10 bodyweight squats + 10 push-ups + 10 band pull-aparts.

Superset A: Leg Press or Hack Squat (4 x 12-15, tempo 3-1-2-0) paired with Seated Dumbbell Overhead Press (3 x 10-12, tempo 3-1-2-0). Rest 75 seconds. High rep, full range of motion on the leg press. If overhead pressing aggravates your shoulder, substitute landmine press.

Superset B: Lat Pulldown, wide grip (3 x 12, tempo 3-1-2-0) paired with Lying or Seated Hamstring Curl (3 x 12-15, tempo 3-1-1-0). Rest 75 seconds.

Superset C: Cable Fly, low to high (3 x 15, tempo 2-1-2-0) paired with Reverse Lunges, bodyweight or light dumbbell (3 x 10 per leg). Rest 60 seconds. The cable fly works the chest without shoulder-loading pressing. Squeeze and hold at the top for one second.

Superset D: Lateral Raises (3 x 15, controlled, slight forward lean) paired with Cable Crunch (15 reps) + Pallof Press (10 per side). Rest 60 seconds.

Finisher (3 minutes): Calf Raises, 3 x 20 with a 3-second eccentric. Minimal rest. Slow lower, explosive up.`,
      },
      {
        heading: "Load Progression System",
        content: `The progression hierarchy is absolute: tempo compliance first, then reps, then load. Never add weight until tempo and reps are both met.

Step 1: If you cannot hold 3-1-2-0 tempo for your target reps, reduce the load by 5-10% until tempo is clean.

Step 2: If you are holding tempo but below the target rep range, stay at the current load and build reps session to session.

Step 3: If you are hitting the top of the rep range with clean tempo, add 2.5 kg (upper body) or 5 kg (lower body) next session.

Step 4: If you hit the top of the rep range for two consecutive sessions, increase is mandatory next session.

Step 5: If you stall at the same reps for three or more sessions, drop the load by 10%, add 2 reps to your target range, and rebuild over 2-3 weeks.

Plan deload weeks every 4-6 weeks. Reduce all strength loads by 10%, drop 1 set from every exercise, and replace the interval run with an easy Zone 2 session. Every third deload should be a true deload: 50% loads, 2 sets max per exercise, all running is Zone 2, no intervals.`,
      },
    ],
  },
  {
    id: "cardio",
    icon: "🏃",
    title: "Cardio & Running",
    subtitle: "Zone 2 base, structured intervals, 80/20 split",
    color: "#10B981",
    intro:
      "The aerobic engine is the foundation of the hybrid athlete. Zone 2 running builds the base. Intervals push the ceiling. The 80/20 split between easy and hard ensures you get faster without burning out or interfering with your strength work.",
    sections: [
      {
        heading: "Heart Rate Zones",
        content: `Zone 1 (below 60% max HR): Effortless, walking pace. Use for active recovery only.

Zone 2 (60-75% max HR): Conversational, nose-breathing possible. This is your primary training zone. You should be able to hold a full conversation. If you cannot speak in complete sentences, you are going too fast.

Zone 3 (75-85% max HR): Moderate effort, can speak in short phrases. This is tempo/threshold territory. Used for structured tempo blocks and progressive long runs.

Zone 4 (85-92% max HR): Hard, only a few words at a time. VO2 max intervals. Used for 400m and 1000m repeats.

Zone 5 (above 92% max HR): All-out, unsustainable beyond 2 minutes. Short sprints only. Rarely used in a hybrid program.

To estimate your max HR, use 220 minus your age as a rough starting point, then adjust based on real data. A heart rate monitor (chest strap preferred) is essential for honest Zone 2 training. Wrist-based monitors work for general tracking but can lag during intervals.

Important: in hot conditions (above 28°C), cardiac drift pushes your HR 10-20 bpm higher at the same pace. Trust heart rate over pace when it is hot. Slow down and accept the slower splits.`,
      },
      {
        heading: "Zone 2 Easy Runs (Primary Aerobic Builder)",
        content: `Zone 2 develops mitochondrial density, capillary networks, and fat oxidation. It builds the aerobic floor that makes everything else possible. It is also the session most people skip or rush. Respect the pace.

Start with 35-40 minutes of running plus 5 minutes of walking warm-up and cool-down. Progress to 50 minutes of running over 8-12 weeks, adding no more than 5 minutes per week.

The key constraint: your heart rate must stay below your Zone 2 ceiling. If it drifts above, walk until it drops, then resume running. In the early weeks, this might mean walk-run intervals. That is fine. Your ego will hate it. Your aerobic system will thank you.

A useful test of progress: track your pace at a fixed heart rate over time. If you are running 6:00/km at 145 bpm in Week 1 and running 5:30/km at 145 bpm in Week 10, your cardiac efficiency has improved significantly, even if you never "felt" faster during those easy runs.

Post-run stretching (10 minutes): hip flexors (45 seconds per side), hamstrings (45 seconds per side), calves straight and bent knee (30 seconds each per side), pigeon or figure-4 (60 seconds per side), thoracic extension over foam roller (60 seconds).`,
      },
      {
        heading: "Interval Sessions (Speed and VO2 Max)",
        content: `Intervals raise your VO2 max ceiling, improve running economy, and develop the ability to clear lactate under load. Run one structured interval session per week, rotating between three formats.

Format A: 1000m Repeats (VO2 Max). Start with 5 repeats at a pace roughly 10-15 seconds per km faster than your current 5K pace. Recovery: 2 minutes of walk or light jog between reps. Progress to 6 repeats, then increase pace by 5 seconds per km.

Format B: 400m Repeats (Speed). Start with 8 repeats at a pace roughly 20-30 seconds per km faster than your 5K pace. Recovery: 90 seconds of walking. Progress to 10 repeats, then increase pace.

Format C: Tempo Blocks (Lactate Threshold). Start with 3 x 5 minutes at a pace roughly 5-10 seconds per km faster than your 5K pace, with 3 minutes of easy jogging between blocks. Progress to 3 x 7-8 minutes with shorter recovery.

Rotate: Week 1 = Format A, Week 2 = Format B, Week 3 = Format C, repeat. On deload weeks, run whichever format is in rotation but at reduced volume (fewer reps/shorter blocks).

Every interval session starts with a 10-15 minute warm-up jog at Zone 1-2 and ends with a 5-10 minute cool-down jog. Never skip the warm-up before hard running.`,
      },
      {
        heading: "The Saturday Flex Session",
        content: `Saturday is your flex day. Choose based on what the week demanded, what you missed, or what you enjoy. The only rule: keep it primarily aerobic unless replacing a missed interval session.

Options: Long Zone 2 run (8-15 km at easy pace), the default choice for building endurance base. Progressive long run (8-12 km, first 75% at Zone 2, last 25% at Zone 3 effort) when you want a small stimulus without full intervals. Tempo run (20-30 minutes at Zone 3 with warm-up/cool-down) if you missed Thursday's intervals. Pool swim (30-45 minutes, focus on technique and bilateral breathing) for building cross-training capacity and low-impact aerobic volume. Cycling (45-60 minutes at easy effort) if you have access to a bike. Hike or sport (60-90 minutes at moderate effort) for a mental reset that still counts as aerobic work. Or a second easy Zone 2 run (30-40 minutes) if running volume is the priority and your legs feel good.

For long runs, progress distance gradually: 8-10 km in weeks 1-4, 10-12 km in weeks 5-8, 12-15 km in weeks 9-12. Never increase long run distance by more than 10% per week.`,
      },
    ],
  },
  {
    id: "nutrition",
    icon: "🥩",
    title: "Nutrition",
    subtitle: "Consistency over perfection",
    color: "#8B5CF6",
    intro:
      "You can out-eat any training program. The training builds the engine; the nutrition reveals it. You do not need the perfect diet. You need the same adequate diet, every day, with no unplanned eating. The enemy is variance, not any single food.",
    sections: [
      {
        heading: "Daily Targets",
        content: `Protein: 1.6-2.2g per kg of bodyweight. This is the non-negotiable macro. It preserves muscle in a deficit, drives recovery from training, and is the most satiating macronutrient. Spread it across 3-4 meals, hitting 30-50g per meal to maximize muscle protein synthesis.

Calories: For fat loss while training hard, a deficit of 400-600 kcal from your total daily energy expenditure works. This is aggressive enough to see results within weeks but conservative enough to sustain for 12+ weeks without tanking your performance or losing muscle.

Carbohydrates: 2-4g per kg of bodyweight. Carbs fuel your running, support glycogen for strength sessions, and prevent flat performance in a deficit. Place them around training for best results.

Fat: 0.8-1.2g per kg of bodyweight as a floor. Fat supports hormonal health (testosterone, cortisol regulation), joint health, and brain function. Going too low on fat will catch up with you within weeks.

These are starting points. Adjust every 3-4 weeks based on body weight trends, performance, energy levels, and progress photos. If weight is stalling, reduce calories by 100-200 per day, preferring to pull from carbs or fat, never from protein.`,
      },
      {
        heading: "Meal Structure",
        content: `Three to four structured eating occasions per day. No grazing. No snacking between meals. Each meal is decided before you eat it.

Build every meal around protein first. Pick your protein source, then add carbohydrates and fat around it. Vegetables at a minimum of two meals per day for micronutrients and fiber.

A simple daily template: Meal 1 (morning or post-training) with 40-50g protein, moderate carbs, moderate fat. Meal 2 (midday) with 40-50g protein, higher carbs if training later, moderate fat. Meal 3 (evening) with 40-50g protein, moderate carbs, moderate fat. Optional protein snack (late afternoon) with 25-40g protein from yogurt, whey, eggs, or cottage cheese.

Stop eating 2-3 hours before bed. The kitchen closes at a fixed time every night. This is a rule, not a guideline.

Weekends follow the same targets. No "free days." The person who eats clean Monday through Friday and unravels on weekends is making zero net progress. Consistency 7 days a week, 52 weeks a year.`,
      },
      {
        heading: "Protein Priority List",
        content: `These are the most efficient protein sources for a hybrid athlete, ranked by protein density, bioavailability, and practicality.

Chicken breast or thigh: the workhorse. 30g protein per 150g cooked. Cheap, versatile, available everywhere. Thigh has more fat and flavor; breast is leaner.

Eggs: 6g protein per egg, plus healthy fats and micronutrients. Boil 20 at a time for grab-and-go protein throughout the week.

Greek yogurt (full fat): 9-10g protein per 100g. Mix with whey protein for a 40g+ protein snack in 30 seconds. Outstanding satiety.

Fish: salmon (20g per 100g plus omega-3s), tuna (canned is convenient, 25g per can), white fish (lean, high protein).

Lean beef or ground beef: 26g protein per 100g. Rich in iron, zinc, B12, and creatine. Rotating in red meat 2-3 times per week supports recovery.

Whey protein: a supplement, not a replacement. 25g protein per scoop. Use when you need to hit your target and whole food is not practical.

Cottage cheese: 11g per 100g. Slow-digesting casein protein makes it ideal before bed.

Turkey and shrimp: lean, high protein, good variety options.`,
      },
      {
        heading: "Eating Out and Weekends",
        content: `Eating out does not have to destroy your nutrition. The framework is simple: grilled protein + a starch + vegetables. This is available at virtually every restaurant.

Lebanese: grilled chicken or meat + hummus + salad + one pita. Avoid fatayer, fried kibbeh, and excessive bread.

Japanese: sashimi + edamame + miso + one rice bowl. Avoid tempura and heavy rolls with mayo or cream cheese.

Indian: tandoori chicken + dal + one naan + raita. Avoid butter chicken and biryani (extremely calorie dense).

Burger places: bunless burger + side salad, or grilled chicken sandwich. Skip fries and milkshakes.

Italian: grilled fish or chicken + vegetables + small pasta portion. Avoid cream sauces, garlic bread, and dessert.

The rule for weekends: pre-decide what you will eat before you eat it. Spontaneous eating is where discipline breaks down. Three to four eating occasions. 40-50g protein at each. Vegetables with at least two meals. Water as your primary drink. If you follow the structure, occasional flexibility within it will not derail your progress.`,
      },
      {
        heading: "Hunger, Cravings, and Slip-Ups",
        content: `Physical hunger (stomach growling, energy drop, lightheadedness): eat your next planned meal or snack. If it is not meal time, drink 500ml of water and wait 20 minutes. If you are still hungry, eat the snack early.

Cravings (specific food fixation, emotional eating, boredom-driven): this is not hunger. Drink water, change your environment (walk, stretch, cold shower), or call someone. The craving passes in 15-20 minutes if you do not engage with it.

Post-meal urge to keep eating: brush your teeth immediately after finishing. This is a pattern interrupt that signals "eating is done."

Late-night eating is the highest-risk window. Tea (no sugar), journaling, breathwork, or going to bed. Do not negotiate with the urge.

You will slip. The protocol: do not compensate the next day. No skipping meals, no extra cardio, no punishment. Return to the plan at the very next meal. Not tomorrow. Not Monday. The next meal. Log what happened (what triggered it, what you ate, what time, what you were feeling). Patterns reveal triggers. One bad meal in a week of 28 meals is 3.6% non-compliance. That is noise, not failure.`,
      },
    ],
  },
  {
    id: "mobility",
    icon: "🧘",
    title: "Mobility & Movement",
    subtitle: "The cheapest injury insurance available",
    color: "#06B6D4",
    intro:
      "If you have been lifting heavy for years, you have predictable restrictions: tight hip flexors from sitting, limited thoracic extension from pressing bias, restricted ankle dorsiflexion, and likely anterior shoulder tightness. These limit squat depth, running stride length, and shoulder health. Five to seven minutes of daily mobility work is non-negotiable.",
    sections: [
      {
        heading: "Daily Non-Negotiables (5-7 Minutes)",
        content: `These five movements, done every single day (morning or evening, at home or at the gym), address the most common restrictions in lifters and runners.

Hip 90/90 Transitions (8 per side): Sit on the floor, both knees at 90 degrees. Rotate your hips to switch which leg is internally and externally rotated. Keep your torso tall throughout. This restores hip range of motion lost from sitting.

Thoracic Open Book (8 per side): Lie on your side, knees stacked, arms extended in front. Rotate your top arm overhead and behind you, following it with your eyes. Three seconds in each position. This counteracts pressing and desk posture.

Couch Stretch or Half-Kneeling Hip Flexor Stretch (45 seconds per side): Tight hip flexors limit squat depth and running stride. This is one of the highest-return stretches for anyone who sits during the day.

Ankle Dorsiflexion Against Wall (30 seconds per side): Face a wall, foot about 10cm away. Drive your knee forward over your toes, keeping your heel on the ground. This improves squat depth and running foot strike.

Shoulder CARs (5 per direction per arm): Stand with your arm at your side. Trace the largest circle possible overhead and behind you without moving your torso. Slow and controlled. This maintains shoulder health and maps your active range of motion.`,
      },
      {
        heading: "Pre-Session Warm-Ups",
        content: `Every strength session begins with a 10-minute warm-up specific to the movements you are about to perform. Never go straight to working weight. Your joints will thank you in 10 years.

Before lower body sessions: hip 90/90 transitions, world's greatest stretch (lunge position, same-side elbow to inside of front foot, then rotate and reach to the sky), bodyweight squats with a 3-second hold at the bottom, and ankle dorsiflexion work.

Before upper body sessions: shoulder CARs, band dislocates (hold a band wide, lift overhead and behind your body in an arc), cat-cow (alternate between arching and rounding the spine, breathing into each position), scapular push-ups (push-up position, arms locked, protract then retract your shoulder blades with no elbow bend), and thoracic spine rotations.

Before running: 5 minutes of brisk walking or very light jogging, then dynamic stretches targeting hips and calves. Leg swings (front to back, side to side), walking lunges with a twist, high knees, and butt kicks. Do not static stretch before running.

The warm-up is part of the session, not something that happens before the session. Budget time for it.`,
      },
      {
        heading: "Sunday Recovery Flow (15-20 Minutes)",
        content: `This is a full-body mobility and recovery routine for your rest day. Pair it with sauna if you have access.

Cat-Cow: 10 reps, breathing fully into each position.

Downward Dog Hold: 60 seconds. Pedal your heels alternately to work calves and hamstrings.

Pigeon Pose: 60 seconds per side. One of the best hip openers available.

Child's Pose: 60 seconds. Reach your arms forward and sink your hips back.

Supine Spinal Twist: 45 seconds per side. Lie on your back, pull one knee across your body, and let it fall.

World's Greatest Stretch: 5 per side, holding each position for 3 seconds.

Deep Squat Hold: 2 minutes. Use a doorframe or rack for balance if needed. Sit as deep as possible with your heels on the ground. This single position restores hip, ankle, and thoracic mobility simultaneously.

Finish with 5 minutes of diaphragmatic breathing on your back: 4 seconds inhale through the nose, 6 seconds exhale through the mouth. This activates your parasympathetic nervous system and accelerates recovery.`,
      },
      {
        heading: "Movement Glossary",
        content: `World's Greatest Stretch: From a lunge position, place the same-side elbow to the inside of your front foot, then rotate and reach the opposite arm to the sky. Hold each position for 3 seconds. This hits hip flexors, hamstrings, thoracic rotation, and ankles in one movement.

Band Dislocates: Hold a resistance band with a wide grip in front of your hips. Keeping your arms straight, lift the band overhead and behind your body in a smooth arc, then return. Start with a wide grip. Narrow your grip as your mobility improves.

Copenhagen Plank: Side plank position with your top leg on a bench and your bottom leg hanging. This works adductors and core simultaneously. Scale by placing both feet on the bench if the full version is too demanding.

Hollow Body Hold: Lie face up, arms overhead, lift your shoulders and legs off the floor. Press your lower back into the floor throughout. Scale by bending your knees.

Dead Bugs: Lie face up, arms vertical, knees at 90 degrees. Extend the opposite arm and leg simultaneously while keeping your lower back flat on the floor. If your back arches, you have gone too far.

Pallof Press: Attach a cable or band at chest height. Stand perpendicular to the anchor point. Press the handle straight out from your chest, hold for 2 seconds, and return. Resist rotation throughout the entire movement.`,
      },
    ],
  },
  {
    id: "recovery",
    icon: "😴",
    title: "Recovery & Sleep",
    subtitle: "You grow when you rest, not when you lift",
    color: "#6366F1",
    intro:
      "Recovery is not passive. It is the process through which your body adapts to training stress. Sleep, nutrition timing, stress management, and autoregulation determine whether your training makes you stronger or just makes you tired. The person who recovers best trains best.",
    sections: [
      {
        heading: "Sleep Protocol",
        content: `Sleep is the single highest-leverage recovery variable. Everything else is noise if your sleep is broken.

Target 7.5-8.5 hours in bed every night. Same bedtime and wake time within 30 minutes, seven days a week, including weekends. Your circadian rhythm does not know it is Saturday.

Room temperature: 18-20°C. A cool room improves deep sleep measurably. If you live in a hot climate, invest in good air conditioning and use it aggressively at night.

No screens 30 minutes before bed. The blue light is part of the problem, but the bigger issue is that screens keep your mind active and engaged when it should be winding down.

Caffeine cutoff: early afternoon (around 1-2 PM). Caffeine has a 6-8 hour half-life. A 2 PM coffee is still 50% active at 8-10 PM, which measurably reduces deep sleep even if you "fall asleep fine."

Create a wind-down ritual: dim lights, journaling, reading, breathwork, or stretching. Do the same thing every night. The ritual signals to your nervous system that it is time to shift from sympathetic (fight or flight) to parasympathetic (rest and digest).

If you wear a sleep tracker, pay attention to your sleep consistency score more than any single night's data. Trends matter. One bad night is irrelevant. Five bad nights in a row is a problem.`,
      },
      {
        heading: "Morning Readiness Check",
        content: `Before training, score five dimensions on a scale of 1-10. This takes two minutes and gives you an objective readiness number.

Sleep Quality (1-10): How refreshed do you feel? 8+ hours of consistent sleep scores 8-10.

Soreness (1-10, where 10 means no soreness): General muscle soreness from the previous day. 10 means nothing, 5 means moderate, 1 means you can barely move.

Motivation (1-10): Do you genuinely want to train? 10 means fired up, 5 means neutral, 1 means dreading it.

Stress (1-10, where 10 means no stress): Life, work, and relationship stress combined. 10 means calm, 1 means overwhelmed.

Wearable Recovery (1-10): If you use a device like WHOOP, Garmin, or Oura. Green recovery = 8-10, yellow = 4-7, red = 1-3. If you do not use one, score based on how you feel overall.

Total score of 40-50: train as written, full volume and intensity. 30-39: train but reduce (drop 1 set from every exercise, reduce interval reps by 1, keep Zone 2 runs). 20-29: swap your planned session for 30 minutes of easy Zone 1-2 movement plus 20 minutes of mobility. Below 20: full rest day. Walk only. Sleep is the priority. If below 20 for three or more consecutive days, see a doctor.`,
      },
      {
        heading: "Deload Weeks",
        content: `Every 4-6 weeks, your body needs a planned reduction in training stress. This is not optional. Deloads are how you consolidate gains and prevent overtraining.

A standard deload: reduce all strength loads by 10%, drop 1 set from every exercise, and replace the interval run with an easy Zone 2 session. Everything else stays the same.

A true deload (every 8-12 weeks): 50% loads, 2 sets maximum per exercise, all running is Zone 2, no intervals. This feels too easy. That is the point. Your body is rebuilding.

Signs you need an unplanned deload: persistent fatigue that does not improve with sleep, strength plateau or regression for more than two weeks, joint pain that was not there before, poor sleep despite good sleep hygiene, loss of motivation to train for five or more consecutive days, resting heart rate elevated 5+ bpm above your baseline, or heart rate variability consistently below your normal range.

If these signs appear, take 3-4 days of reduced training immediately rather than pushing through. It is far better to take a proactive mini-deload than to grind yourself into a two-week forced rest from illness or injury.`,
      },
      {
        heading: "Active Recovery Tools",
        content: `Walking: 8,000-10,000 steps daily from non-exercise activity. This is your baseline movement that supports blood flow, digestion, and mental health. Walk after meals when possible.

Sauna: 2-3 sessions per week if available, 15-20 minutes at 75-85°C. Evidence supports improved cardiovascular health, reduced muscle soreness, and better sleep quality. Hydrate aggressively before and after.

Cold exposure: 2-3 minutes of cold water (10-15°C) after training or as a standalone practice. Reduces inflammation and improves alertness. Do not use cold exposure immediately after strength sessions if hypertrophy is a priority, as it may blunt the inflammatory signaling needed for muscle growth. Use it after cardio days or on rest days instead.

Foam rolling: 10 minutes post-workout on major muscle groups. Focus on quads, IT band, glutes, thoracic spine, and calves. Use slow, deliberate passes. This is not a pain tolerance test. Moderate pressure, spending extra time on tender spots.

Breathwork: Box breathing (4 seconds inhale, 4 seconds hold, 4 seconds exhale, 4 seconds hold) for 5 minutes shifts your nervous system from sympathetic to parasympathetic. Use it post-training, before bed, or during stressful moments throughout the day.`,
      },
    ],
  },
  {
    id: "travel",
    icon: "✈️",
    title: "Travel & Contingencies",
    subtitle: "The plan for when there is no plan",
    color: "#EC4899",
    intro:
      "The best program in the world is worthless if it falls apart the moment something unexpected happens. Travel, illness, busy weeks, missed sessions. This section covers what to do when life does not cooperate with your training schedule.",
    sections: [
      {
        heading: "Hotel and Travel Workouts",
        content: `When you only have dumbbells and a bench, run this single full-body session. 45 minutes total.

Superset A: Dumbbell Goblet Squat (4 x 12) paired with Tempo Push-Ups (4 x 12-15). Rest 60 seconds. Use a 3-1-2-0 tempo on the push-ups for maximum stimulus with bodyweight.

Superset B: Dumbbell Romanian Deadlift (3 x 12) paired with Dumbbell Bent-Over Row (3 x 12). Rest 60 seconds.

Superset C: Dumbbell Reverse Lunge (3 x 10 per leg) paired with Dumbbell Overhead Press (3 x 10). Rest 60 seconds.

Core: Plank (3 x 45 seconds) + Dead Bugs (3 x 10 per side). No rest between exercises, 30 seconds between rounds.

Pair this with a 30-minute treadmill Zone 2 run or hotel pool swim for a complete training day.

Pack resistance bands (light and medium) when you travel. They enable rows, pull-aparts, dislocates, Pallof presses, and assisted stretching anywhere. They weigh nothing and fit in any bag.

Minimum target while traveling: one training session per day (even 20 minutes), protein at every meal, 8,000+ steps, and 7+ hours of sleep.`,
      },
      {
        heading: "Missed Session Protocol",
        content: `Missed one session in a week: continue as normal. Do not try to double up. The week still works on 4 sessions.

Missed Tuesday's Zone 2 run: Saturday becomes an easy Zone 2 run (default option).

Missed Thursday's intervals: Saturday becomes a tempo run or shortened interval session.

Missed a strength day: do not add it to another day. Move on. Weekly volume is sufficient on 2 strength sessions for a short period.

Missed 2+ sessions in a week: treat the week as an unplanned reduced week. Resume the normal schedule on Monday.

Missed a full week (travel or illness): resume with the previous week's loads and volumes. Do not jump back to where you left off. Build back over 7-10 days.

The most important rule: never try to "make up" missed sessions by cramming them into fewer days. Compressing a 5-day schedule into 3 days guarantees poor performance, excessive fatigue, and increased injury risk. Missing a session is nothing. Injuring yourself trying to compensate for a missed session can cost you weeks.`,
      },
      {
        heading: "Returning from Extended Absence",
        content: `Life happens. Illness, injury, family emergencies, work crises. Sometimes you will miss a week or more. Do not stress about lost fitness. It takes 2-3 weeks of total inactivity to lose meaningful aerobic or strength capacity. The neural pathways and muscle memory are still there.

Return protocol for 1-2 weeks off: first week back, all loads at 80% of where you left off. All runs at 80% of distance and pace. Build back to full programming over 7-10 days.

Return protocol for 3-4 weeks off: first week back at 70% loads and 70% running volume. Second week at 85%. Third week back to full programming. Be patient.

Return protocol after illness: wait until you are fully symptom-free for 48 hours before any training. Your first two sessions back should be at 50% volume. If you feel good after those, progress to 75% for the next two sessions, then resume full programming.

The single biggest mistake people make after time off is going too hard too soon. Your cardiovascular system deconditions faster than your muscles, so you will feel strong but gas out quickly. Your connective tissue (tendons, ligaments) also needs time to readapt. Respect the ramp-up period.`,
      },
    ],
  },
  {
    id: "supplements",
    icon: "💊",
    title: "Supplements & Tracking",
    subtitle: "The last 5%, plus how to measure everything else",
    color: "#A3B5C7",
    intro:
      "Supplements are the last 5%. Get training, nutrition, and sleep right first. No supplement will compensate for broken fundamentals. But once the basics are dialed in, a few evidence-based additions can provide a meaningful edge.",
    sections: [
      {
        heading: "Evidence-Based Supplement Stack",
        content: `Creatine Monohydrate (5g per day, any time): The most researched supplement in sports science. Improves strength output, power, and recovery between sets. Helps with hydration at the cellular level. Take it daily, every day, including rest days. No need to load or cycle.

Whey Protein (25-50g as needed): A convenient protein source to hit your daily target when whole food is not practical. It is a supplement, not a replacement for meals. Use post-training or as a snack mixed into yogurt.

Vitamin D3 (2000-5000 IU daily, with a meal containing fat): The majority of people are deficient, especially those who work indoors or live in climates with limited sun exposure. Supports immune function, bone health, mood, and testosterone production.

Magnesium Glycinate (200-400mg before bed): Supports sleep quality and muscle recovery. The glycinate form is better absorbed and less likely to cause digestive issues than cheaper forms like magnesium oxide.

Omega-3 Fish Oil (2-3g combined EPA+DHA daily, with meals): Anti-inflammatory, supports joint health, brain function, and cardiovascular health. Look for products that list EPA and DHA separately on the label.

Caffeine (100-200mg pre-training, before early afternoon): A proven performance enhancer for both strength and endurance. Do not exceed 200mg in a single dose. Do not consume after early afternoon.`,
      },
      {
        heading: "Skip These",
        content: `BCAAs (Branched-Chain Amino Acids): Completely useless if you eat enough protein, which you should be. Whey protein already contains all the BCAAs you need. Buying BCAAs on top of adequate protein intake is literally flushing money.

Fat burners: Expensive caffeine pills with proprietary blends of underdosed ingredients. The "thermogenic effect" is negligible. A caloric deficit and consistent training burn fat. Pills do not.

Testosterone boosters: None of the over-the-counter products meaningfully raise testosterone in healthy males. If you suspect low testosterone, get bloodwork done and discuss it with a doctor. Do not self-medicate with supplements.

Pre-workouts with proprietary blends: If the label does not tell you exactly how much of each ingredient is in the product, they are hiding underdosed active ingredients behind a wall of caffeine and beta-alanine tingles. A cup of coffee and 5g of creatine will outperform most pre-workouts.

Mass gainers: Maltodextrin (cheap sugar) mixed with whey protein and sold at a massive markup. You can make a better "mass gainer" by blending oats, whey, banana, and peanut butter for a fraction of the cost.`,
      },
      {
        heading: "Key Metrics to Track",
        content: `Body weight: weigh yourself daily, first thing in the morning, after using the bathroom, before eating or drinking. Use the weekly average, not any single day's reading. Daily weight fluctuates by 1-2 kg based on water, sodium, and food volume. The trend over weeks is what matters.

Waist circumference: measure at your navel, relaxed (not sucking in), once per week. This is a more reliable indicator of body composition change than the scale, especially if you are building muscle while losing fat.

Training volume: log every session. Track the weight, reps, and sets for your main compound lifts. If these numbers are going up over time while your tempo stays clean, you are getting stronger.

Running pace at a fixed heart rate: record your average pace during Zone 2 runs at a consistent heart rate. Improvement here means your cardiovascular efficiency is increasing.

Sleep: hours in bed, consistency of bed/wake times, and subjective quality. If you use a wearable, track HRV and resting heart rate trends.

Progress photos: front, side, and back, same lighting, same time of day, same pose. Take them every 4 weeks. The mirror lies because you see yourself every day. Month-over-month photo comparisons do not.

Protein compliance: did you hit your daily target? Track this as a simple yes/no for each day. Aim for 7 out of 7.`,
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

function FitnessContent({ lockedPreview = false }: { lockedPreview?: boolean }) {
  const visibleCategories = lockedPreview ? categories.slice(0, 1) : categories;
  const [activeCategory, setActiveCategory] = useState(visibleCategories[0].id);
  const active = visibleCategories.find((c) => c.id === activeCategory)!;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="max-w-[1200px] mx-auto pt-20 pb-12 px-6">
        <Link
          href="/"
          className="text-[11px] font-bold tracking-[0.15em] uppercase mb-4 inline-block transition-colors hover:text-white/80"
          style={{ color: active.color }}
        >
          &larr; Compound OS
        </Link>
        <h1 className="text-[clamp(36px,5vw,56px)] font-bold leading-[1.1] tracking-tighter mb-5 max-w-[700px]">
          Build the machine.
        </h1>
        <p className="text-lg leading-[1.7] text-white/55 max-w-[600px] m-0">
          A complete hybrid athlete system covering strength, cardio,
          nutrition, mobility, recovery, and contingency planning. Built on
          evidence-based training principles and designed for people who
          refuse to choose between strong and fast.
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

export default function FitnessPage() {
  return (
    <Paywall
      previewContent={<FitnessContent lockedPreview />}
      accent="var(--accent-fitness)"
    >
      <FitnessContent />
    </Paywall>
  );
}
