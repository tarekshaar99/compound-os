"use client";

import { useState } from "react";
import Link from "next/link";
import Paywall from "../../components/Paywall";

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
    id: "identity",
    icon: "◉",
    title: "Identity & Awareness",
    subtitle: "You are not what you think you are",
    color: "#D4A574",
    intro:
      "Most people live their entire lives identified with their thoughts, their body, their job title, their past. This section is about seeing through all of it. Not intellectually  -  experientially. The moment you realize you are the awareness behind the thoughts, not the thoughts themselves, everything changes.",
    sections: [
      {
        heading: "The False Self",
        content: `The voice in your head is not you. It's a pattern  -  a recording of past experiences, fears, and conditioning playing on repeat. It assumes the worst. It's afraid of death. It craves control. It constantly compares. This is the ego.

The ego isn't evil. It's a survival mechanism that became your entire identity. You created it as a child to protect yourself from a reality that felt overwhelming. Over time, you forgot it was a mask and started believing it was your face.

Here's the test: if you can observe a thought, you are not that thought. If you can watch anger arise, you are not the anger. You are the space in which all of it appears and disappears. Thoughts come and go  -  but the "I" that watches them never moves.`,
      },
      {
        heading: "The I AM State",
        content: `Strip away every label. I am not my name. I am not my nationality. I am not my profession. I am not my body. I am not even my personality  -  that changes decade to decade.

What remains when everything is stripped away? Pure awareness. Conscious existence. "I AM"  -  not "I am this" or "I am that." Just the raw fact of being.

This isn't philosophy. It's the most direct experience available to you right now. Close your eyes, drop every story, and notice: there is an awareness here that has never changed. Not when you were five, not when you were heartbroken, not when you were on top of the world. The "I" before all personhood  -  boundless, self-shining, untouched by any experience.

Meditate on this: I exist. I am aware. Everything else is just a story in the mind.`,
      },
      {
        heading: "Seeing the False as False",
        content: `You don't need to fight the ego. You don't need to destroy it. You just need to see it clearly  -  and it loses its power.

When a thought says "you're not good enough," ask: who is not good enough? Which identity? The real you  -  the awareness  -  cannot be threatened, improved, or diminished. It has no stakes in whether someone likes your outfit or respects your opinion.

Every time you catch yourself suffering, trace it back. You'll find attachment to an identity that isn't real. The person who "needs" approval. The person who "should" be further ahead. The person who "can't handle" rejection. These are characters in a story. You are the one reading it.

The practice: notice the thought, notice who it's happening to, and recognize that the "who" is imaginary. Do this a thousand times. Then a thousand more. Eventually, the false doesn't stick anymore.`,
      },
      {
        heading: "You Are Eternal",
        content: `Death only exists for the ego. Energy cannot be created or destroyed  -  it transforms.

This isn't comfort. It's physics dressed in spiritual language. The "I" that watches your experience did not begin at birth and will not end at death. It was here before your first memory and will be here after your last breath.

When this lands  -  not as a concept but as a felt reality  -  fear evaporates. Not partially. Completely. Because every fear is ultimately a fear of death, and if death is impossible for what you actually are, then fear has no ground to stand on.

I am never a victim. I cannot fail because I am eternal. Failure doesn't exist for something that can't end.`,
      },
    ],
  },
  {
    id: "emotional",
    icon: "◈",
    title: "Emotional Mastery",
    subtitle: "Your triggers are your teachers",
    color: "#7BA7BC",
    intro:
      "Every negative emotion you experience is a signal  -  not a problem. Anger, fear, sadness  -  these aren't enemies to suppress or indulge. They're invitations to see something you haven't yet seen about yourself. The goal isn't to stop feeling. It's to stop being controlled by feeling.",
    sections: [
      {
        heading: "The Emotional Guidance System",
        content: `Your emotions are a compass. Expansion means you're aligned with truth. Contraction means you've stepped into an illusion  -  usually a belief in separation, lack, or control.

When you feel bad, don't ask "how do I fix this feeling?" Ask: "what belief is creating this feeling?" Trace it back. Anger always comes from an attachment to an outcome being blocked. Sadness comes from a belief in loss. Fear comes from a belief that you're separate and vulnerable.

The feeling isn't the problem. The misidentification behind it is.

Every emotion is a holy signal. Not an enemy. Not a weakness. Information. Learn to read it like a dashboard  -  it's showing you exactly where you're out of alignment with who you actually are.`,
      },
      {
        heading: "The Catalyst Framework",
        content: `Everything that triggers you is a catalyst  -  a perfectly designed experience to show you what still needs healing.

This is the most practical tool from years of spiritual study. When something disturbs your peace, run it through this process:

Step 1  -  Name the situation. What happened, specifically?
Step 2  -  Identify the emotions. Not the story, the raw feelings. Fear? Anger? Shame? Often all three are linked.
Step 3  -  Find the root belief. Underneath every emotional reaction is one of three core patterns: lack ("I don't have enough"), attachment ("I need this specific outcome"), or control ("I need to manage how others see me / how life unfolds").
Step 4  -  Know yourself, then love yourself. Ask: "What is this experience asking me to know about myself?" Then: "What is this experience asking me to love and accept in myself?"
Step 5  -  Requalify. Deny the false belief. Affirm the truth. "I deny all belief in rejection. I affirm that I AM whole, loved, and complete  -  independent of any external validation."

Big souls that are hungry to grow will get big catalysts. If your life is challenging, it means your soul is ready for the next level. Meet every catalyst with the heart, not the ego.`,
      },
      {
        heading: "Requalifying Energy",
        content: `Every negative thought or emotion is old conditioning releasing itself  -  like the body sweating out toxins. Don't fight it. Don't indulge it. Witness it, meet it with love, and let it pass.

The process is called requalifying: taking negative energy and converting it into love through awareness and intention.

Someone cuts you off in traffic. Anger rises. Instead of reacting: pause. Notice the anger. Notice the outcome you were attached to ("nobody should cut me off"). See how absurd that attachment is. Then actively choose a loving thought: "I send them peace. I don't know their day. I release the need to control how others drive."

This sounds soft. It isn't. It takes more strength to requalify than to react. Reacting is the ego's autopilot. Requalifying is conscious mastery.

Three words that break karmic inertia: "I'm sorry. Please forgive me. I love you." Not to the other person  -  to yourself. To your higher self. To reality. This isn't weakness. It's the most powerful thing a human can do.`,
      },
      {
        heading: "Sitting With Discomfort",
        content: `The ego's entire strategy is avoidance. It will do anything to not feel pain  -  numb with food, distract with phones, escape with substances, project onto others.

The spiritual path is the opposite: learn to sit with everything. Invite the discomfort. Turn up the volume on the feeling deliberately, then bring love and acceptance to it.

What you resist persists. What you embrace dissolves.

Every challenge is impermanent. Feel it fully, give it love and compassion, witness it  -  and watch it lose its charge. You are the space that holds all experience. No experience can destroy the space.

Allow yourself to release. Shout into a pillow. Cry. Let the body express what needs to move through it. Then return to stillness. The emotion was never yours  -  it was passing through. You are the sky. Emotions are weather.`,
      },
    ],
  },
  {
    id: "addiction",
    icon: "◇",
    title: "Addiction & Attachment",
    subtitle: "Every craving is a craving for God",
    color: "#B8A9C9",
    intro:
      "Behind every addiction  -  food, substances, validation, status, relationships, your phone  -  is the same thing: a desperate attempt to fill a void that doesn't actually exist. You are already complete. The craving isn't the problem. The belief that something outside you can complete you is.",
    sections: [
      {
        heading: "The Root of All Addiction",
        content: `Addiction is identification with the body. When you believe you ARE the body, you believe the body's cravings are your cravings. But the real you  -  the awareness  -  has never been addicted to anything.

Every addiction follows the same pattern: a feeling of lack arises. The mind says "this substance / person / achievement will fill the gap." You chase it. You get temporary relief. The gap returns, wider than before. You chase harder.

The gap isn't real. It's a belief. "I am incomplete" is the most destructive thought a human can think  -  and almost everyone thinks it constantly.

The craving for food, sex, drugs, approval, money  -  these are all the same craving wearing different masks. Underneath all of them is the craving for wholeness. For God. For the felt experience of being complete exactly as you are.

You don't overcome addiction by fighting it. You overcome it by realizing the one who is addicted doesn't exist.`,
      },
      {
        heading: "Transcending Without Force",
        content: `Guilt is the ego's trap door. It makes you feel bad about the addiction, which makes you feel worse, which makes you reach for the addiction again. Remove guilt from the equation entirely.

You always do what you believe is in your best interest. If you're still smoking, still binge eating, still doom-scrolling  -  it's because some part of you still believes it serves you. Don't hate that part. Understand it.

Watch as an observer. Know that you are perfect  -  and what the body does is not who you are. The addiction will play itself out as karma is released. Your job is awareness, not control.

Discipline isn't forced. Discipline is the natural result of seeing where true value lies. When you genuinely see that the drug, the junk food, the validation loop doesn't give you what you actually want  -  you stop. Not through willpower. Through clarity.

The same way you naturally stopped believing in Santa Claus, you will naturally stop reaching for things that don't serve you  -  once you see clearly enough.`,
      },
      {
        heading: "Attachment to Outcomes",
        content: `This is the addiction most people never recognize: the addiction to how things should be.

"I should be making more money by now." "They should have treated me better." "This shouldn't be happening." Every one of these thoughts is an argument with reality  -  and you will lose every single time.

Attachment to outcomes is control in disguise. And the need for control comes from a belief that you're separate from life, that the universe isn't intelligent, that if you don't force things, everything will fall apart.

The opposite is true. Life is extraordinarily intelligent. It sees the full picture. The ego sees a sliver and panics.

Practice: when something doesn't go your way, instead of resisting, say "I trust this. There is a lesson here. I have exactly what I need right now." This isn't passive. It's the most radical act of trust available to a human.

Suffering is never caused by what happened. It's caused by the gap between what happened and what you think should have happened. Close the gap and suffering ends.`,
      },
      {
        heading: "The Abundance Shift",
        content: `The ego looks at your bank account and says "I'm out of money." Meanwhile, all the money in the world is circulating around you at all times. How can you be "out" of something infinite?

Lack is an idea. It doesn't exist in reality. Look at nature  -  oxygen, water, sunlight, life itself  -  it's all abundant beyond comprehension. Scarcity is a mental construct, not a feature of the universe.

Your ability to attract anything depends entirely on your belief in your worthiness to receive it. Not your effort. Not your strategy. Your fundamental sense of whether you deserve to have it.

"I have the perfect amount of money for what I'm supposed to be doing right now." This isn't delusion. It's trust. And it shifts your energy from desperate grasping to open receiving  -  which is where abundance actually flows from.

Three illusions that create all suffering: scarcity, sin, and sickness. Replace them with three truths: abundance, innocence, and wholeness. These aren't affirmations. They're corrections.`,
      },
    ],
  },
  {
    id: "relationships",
    icon: "◎",
    title: "Relationships & Service",
    subtitle: "Everyone you meet is you",
    color: "#8FB996",
    intro:
      "Your relationships are your most powerful mirrors. Every person who triggers you is showing you something unhealed in yourself. Every person you love is showing you your own capacity for love. The goal isn't to find the right people  -  it's to become the kind of person who sees the divine in everyone.",
    sections: [
      {
        heading: "Others as Mirrors",
        content: `What you judge in another person, you possess in yourself. This is absolute. No exceptions.

If someone's arrogance triggers you, there's unprocessed arrogance in you. If someone's laziness irritates you, there's a part of you that you're punishing for not doing enough. The outer world is a perfect reflection of your inner state.

Use every interaction as data. When someone bothers you, don't focus on them  -  focus on what they're revealing about you. "What is this person mirroring that I haven't yet accepted in myself?"

This isn't about excusing bad behavior. It's about reclaiming your power. As long as your emotional state depends on how others act, you're a puppet. The moment you take full ownership of your reactions, you're free.

Nobody can hurt you if you don't want something from them. Read that again.`,
      },
      {
        heading: "Giving Without Expectation",
        content: `Giving is proof of having. You can't give love unless you are love. You can't give peace unless you are at peace. The act of giving isn't sacrifice  -  it's evidence of your abundance.

Most people give to get. They give love expecting love in return. They give help expecting gratitude. They give gifts expecting appreciation. That isn't giving. That's a transaction  -  and transactions always breed resentment.

Real giving has no strings attached. You give because giving is your nature  -  not because you expect a return. When you operate this way, something paradoxical happens: you receive more than you ever did when you were trying to get.

What you give increases. What you hoard decreases. This is a law, not a suggestion.

Service to others is medicine. Not because it makes you look good  -  because it reminds you of what you actually are. Every time you bless someone, you prove to yourself that you have enough to share. That proof dissolves the belief in lack more effectively than any affirmation.`,
      },
      {
        heading: "Forgiveness as Freedom",
        content: `Unforgiveness is like drinking poison and expecting the other person to die.

Judgment is a contraction. You can physically feel it  -  the tightening in the chest, the narrowing of perception. That contraction is you leaving your heart and entering your ego. It feels powerful. It isn't. It's prison.

Forgiveness doesn't mean condoning. It means releasing. "I no longer carry this. I no longer let your actions live rent-free in my body." That's not weakness. That's the strongest thing a human being can do.

See the light in everyone past their outer experience. The person who hurt you is also someone's child who was hurt themselves. They are operating from spiritual blindness  -  not malice. Extend the same compassion you'd want if you were at your lowest.

Remove all judgment from your perception. This is the exclusive path to inner peace. Not some of it. All of it. Judge no one. Love everyone. Not because they deserve it  -  because you deserve to be free.`,
      },
      {
        heading: "Holy Relationships",
        content: `Most relationships are what could be called "special relationships"  -  they're based on taking and keeping. "You make me feel good, so I want you around. You stop making me feel good, I withdraw."

A holy relationship is the opposite. It's based on giving and growing. You see the other person as God experiencing God  -  not as a source of validation. You don't attach. You don't control. You honor their free will completely.

If someone is moving away from you, mirror it. Don't chase. Don't force. Love them enough to let them go.

Vibrate on the level of the relationship you want to attract. You don't find the right person  -  you become the right person. When your energy is whole and complete within itself, you attract someone who matches that wholeness.

The greatest gift you can give another person is to see them as they truly are  -  not through the story of who they've been or what they've done, but as pure divine awareness temporarily wearing a personality.`,
      },
    ],
  },
  {
    id: "devotion",
    icon: "✦",
    title: "Devotion & Surrender",
    subtitle: "You are not the doer",
    color: "#C4956A",
    intro:
      "This is the section most people skip  -  and it's the one that changes everything. Devotion isn't religion. It isn't worship in the way most people understand it. It's the recognition that life is living you, not the other way around. That intelligence far greater than your mind is orchestrating everything. And that surrendering to it isn't giving up  -  it's waking up.",
    sections: [
      {
        heading: "Non-Doership",
        content: `You are not the doer. You never were.

This is the most radical  -  and most freeing  -  insight available. The ego believes "I" am making decisions, "I" am in control, "I" am the author of my life. But trace any decision back far enough and you'll find it emerged from conditioning, genetics, environment, and a chain of prior causes stretching back to infinity.

There is no separate "I" independently choosing. There is life expressing itself through a body-mind called you. The same intelligence that grows your hair, beats your heart, and orchestrates galaxies is also choosing your next thought. You are being lived.

This doesn't mean passivity. It means freedom from the crushing pressure of believing you have to figure everything out. It means the end of guilt  -  because if there's no doer, there's no one to blame. It means the end of pride  -  because if there's no doer, there's no one to congratulate.

Investigate every belief that says "I did this." Question it deeply. You'll find that the sense of being a separate doer is itself just another thought appearing in awareness.`,
      },
      {
        heading: "Surrender to Life",
        content: `Surrender isn't giving up. It's giving over.

The ego wants to plan, control, predict, and manage every outcome. And every time it does, it creates suffering  -  because reality will never conform to the ego's preferences.

Surrender means: "I trust life more than I trust my mind." It means recognizing that life sees the full picture while your ego sees a fraction. It means accepting that you do not perceive your own best interests  -  and that what feels like a disaster might be the setup for something you can't yet imagine.

Creation is already finished. The master plan is in motion. Your job isn't to control it  -  it's to flow with it.

This is tested through difficulty. When things fall apart, the ego screams "do something!" Surrender whispers "trust this." The person who can stay surrendered during a crisis has accessed a power that force can never touch. Negative polarity is force. Positive polarity is power. Power always wins.`,
      },
      {
        heading: "The Practice of Devotion",
        content: `Devotion is keeping your mind fixed on the truth  -  all day, every day. Not just during meditation. During traffic. During work. During conflict. During boredom.

Three practices that anchor this:

Practice the Presence. Look for the divine in everything. The tree outside your window. The breath filling your lungs. The stranger walking past you. God isn't hiding. You're just not looking. Twice a day minimum  -  pause, look around, and say "thank you. I love you." Not to anyone specific. To existence itself.

Follow Your Passion. Your passions aren't random. They're how life reveals itself to you. When you fall in love with something  -  music, building, teaching, creating  -  you're seeing an aspect of the divine. Follow it fearlessly.

Mantra Repetition. Pick a truth. "I AM." "God is Love." "I am being lived." Loop it during dead time  -  walking, commuting, waiting. The ego will resist. That resistance is proof the mantra is working. It's reprogramming the operating system.

Devotion isn't effort. It's the flowering of true intelligence. When you see clearly enough, you fall in love with reality. And that love sustains itself.`,
      },
      {
        heading: "Grace vs. Effort",
        content: `At some point on this path, effort gives way to grace. You stop pushing toward awakening and start being pulled by it.

Effort says: "I need to meditate more, journal harder, read another book." Grace says: "Stop. Be still. You are already what you're seeking."

Both have their place. Early on, effort is necessary  -  you need discipline to establish the practices that quiet the mind. But effort alone will never get you there, because the one making the effort is the ego, and the ego cannot awaken itself.

At some point, you exhaust all strategies. You've tried everything. And in that exhaustion, something lets go. Not you letting go  -  letting go happens. And in that gap, grace floods in.

Slower is faster. The masters and sages are peaceful and slow. They absorb every moment. They don't rush because there's nowhere to get to. You are already home. Everything else is the ego insisting that home is somewhere else.`,
      },
    ],
  },
  {
    id: "practice",
    icon: "△",
    title: "Daily Practice",
    subtitle: "Knowing is not enough  -  you must practice",
    color: "#A3B5C7",
    intro:
      "Everything above is useless if it stays in your head. Spiritual truth that isn't integrated into daily life is just another form of entertainment. This section is about the actual practices  -  the things you do every single day to move from understanding to embodiment.",
    sections: [
      {
        heading: "Morning Protocol",
        content: `Meditate immediately after waking up. Not after coffee. Not after your phone. Before the ego boots up and starts running its programs.

Sit for at least 10 minutes. Seek no outcomes. Don't try to silence the mind  -  just watch it. Thoughts will come. Let them come and go without engaging. You are training the awareness muscle, not achieving a special state.

Then carry that same energy into standing up. This is where most people lose it  -  they meditate in stillness and then immediately become unconscious the moment their feet hit the floor. The real meditation is keeping that awareness alive through your entire morning routine.

Practice gratitude before anything else. Not a list  -  a feeling. Think of one thing that fills your heart and sit in that feeling for 60 seconds. This activates the heart center and sets the tone for your entire day.

You can have the best meditation of your life any time you choose. It requires extra effort  -  but it's always available. Lazy silence is the key. Don't try so hard. Just be.`,
      },
      {
        heading: "The Catalyst Journal",
        content: `This is the single most powerful tool for spiritual growth. Every time you are triggered  -  by a person, a situation, a thought  -  write it down and run through five steps:

1. What happened? (Just the facts, no story.)
2. What emotions came up? (Name them precisely: anger, fear, shame, jealousy, grief.)
3. What is the root belief? (Lack? Attachment? Control? Which one?)
4a. Know yourself: "What is this catalyst asking me to recognize about myself?"
4b. Love yourself: "What is this catalyst asking me to accept and embrace about myself?"
5. Requalify: "I deny all belief in [the false belief]. I affirm that I AM [the truth]."

Example: Someone ignores your message. Emotions: rejection, low self-worth. Root: lack  -  believing your value depends on others' responses. Know: "I attach my self-worth to external validation." Love: "I love the part of me that wants to be seen. It's innocent." Requalify: "I deny all belief that my worth depends on anyone's response. I AM complete."

Do this daily. Over weeks and months, you'll watch patterns dissolve that have run your life for decades. The catalyst journal will eventually lead you to seeing only perfection in everything.`,
      },
      {
        heading: "Mantra & Breathwork",
        content: `Your breath is a direct readout of your state of mind. Shallow and fast means the ego is running. Slow and deep means you're closer to truth.

Mantras work because repetition overwrites programming. The ego has been running the same fear-based scripts for years. You need something equally persistent to replace them.

Effective mantras from practice:

"I AM"  -  the most fundamental. Conscious existence. Nothing more needed.
"I am a perfect being in heaven here and now"  -  counters every belief in lack and separation.
"Two powers do not exist. I rest in one power. All is well."  -  for moments of fear.
"This too shall pass."  -  for intense emotion.
"I can sit with this."  -  for resistance.

Loop your chosen mantra during dead time. Walking. Commuting. Cooking. The ego will question it  -  "this is stupid, this isn't working." That questioning is proof it's working. The ego fights what threatens it.

10 minutes of mantra meditation daily. Not as a chore  -  as an act of devotion. You're not trying to achieve anything. You're remembering what you already are.`,
      },
      {
        heading: "Spiritual Balance Framework",
        content: `When you notice you're out of alignment  -  contracted, reactive, judgmental  -  use this three-step rebalancing process:

Step 1: Find the imbalance. Is it a thought, a feeling, or an action that's off? Name it precisely.

Step 2: Discover which perspective you're overidentified with. Are you too lost in the human drama (relative perspective)  -  or too detached in spiritual bypassing (absolute perspective)? Both are traps. You are human AND divine. You can't neglect either.

Step 3: Bring in the opposite perspective and welcome it equally. If you're drowning in emotion, bring in the absolute view: "I am eternal awareness, this feeling is temporary." If you're spiritually bypassing, bring in the relative: "I am human. This hurts. That's okay. Feel it."

Ask: "If my higher self were activated right now, how would it respond to this?"

Then: "Thank you, [emotion], for showing me where I have an imbalance."

Spiritual balance is welcoming both aspects of who you are equally. The divine AND the human. Not choosing sides. Not neglecting one for the other. God has no mistakes  -  and that includes your messy, imperfect, beautifully human experience.`,
      },
      {
        heading: "Environment & Body",
        content: `Your physical state directly affects your spiritual clarity. This isn't optional  -  it's foundational.

Food contributes enormously to your state of being. Eat mindfully. When a craving appears, exercise awareness before reacting. Ask: "Is this the body's genuine need, or is this the ego seeking comfort?" Healthy eating is an act of devotion, not deprivation.

Surround yourself with high-vibrational people. You become your environment. What you tolerate is what you invite more of. Complaining, news addiction, constant judgment  -  these are contagious. Protect your energy without arrogance.

Connect with nature. Walk barefoot on grass or sand. Earth physically grounds excess energy and balances the nervous system. Sit in the sun. Be around trees and water. Nature heals what the mind breaks.

Sleep is purification. Don't skimp on it. If you feel lethargic, your diet or your environment needs attention.

Slow down. Walk slowly. Talk slowly. The masters move through life with presence, not urgency. Moving too fast causes the mind to rush  -  and a rushed mind misses everything. Every single moment has something to offer you. Be present enough to receive it.`,
      },
    ],
  },
  {
    id: "wealth",
    icon: "◆",
    title: "Wealth & Identity",
    subtitle: "Money follows the person you become",
    color: "#A78BFA",
    intro:
      "Most people think wealth is a math problem. It isn't. It's an identity problem. If $1M was wired to your account tomorrow, you'd still dress, think, and associate the same way - and within a few years, your net worth would revert to whatever ceiling your subconscious holds. This section is about rewriting that ceiling. Not through affirmations. Through actually seeing the identity that's been running the show.",
    sections: [
      {
        heading: "Wealth Is Inside-Out",
        content: `The #1 separator between the wealthy and the struggling isn't intelligence. It isn't work ethic. It's identity - how someone perceives themselves, the world, and what's possible.

95% of your financial behavior runs from subconscious programming installed before age seven. Your conscious mind knows what you want. Your subconscious knows what you believe. When the two disagree, the subconscious wins every time.

This is why lottery winners go broke. Their internal operating system is calibrated for scarcity. When external reality conflicts with internal identity, the subconscious auto-corrects until they match. Usually by spending, losing, or self-sabotaging the money away.

The lesson isn't "think positive." The lesson is: if you want to hold wealth, you first have to become someone who can hold it. The external number follows the internal state. Never the other way around.`,
      },
      {
        heading: "The Four Archetypes of Self-Sabotage",
        content: `Four patterns keep people trapped in "working on themselves" forever without ever actually arriving. Each one is an identity of "not enough" dressed up as self-improvement.

The Fiat Chaser. Believes they're not wealthy enough, not smart enough, not worthy enough. Always one more course, one more certification, one more mentor away from being ready. Money stays out of reach because the identity says "not yet."

The Self-Punisher. Believes they're not healed enough, not perfect enough. Constantly scrubbing at invisible stains. Makes inner work the destination instead of the path. Never arrives because arrival would mean the punisher has nothing to do.

The Intellectual Junkie. Believes they're not knowledgeable enough. Consumes content endlessly. Books, podcasts, courses, frameworks. Hasn't implemented 5% of what they already know. Confuses knowing about with being.

The Avid Struggler. Believes they're not worthy. Addicted to struggle because struggle is familiar. Success feels threatening - it would require them to stop suffering, which means letting go of their identity as someone who suffers nobly.

The trap all four share: "working on yourself" becomes a way of never being enough. Inner work is a stepping stone. If it becomes the destination, it's just another prison.`,
      },
      {
        heading: "The Five Challenges to Real Wealth",
        content: `Five obstacles sit between most people and the wealth they say they want. None of them are external.

One: forgetting your why. "I want more money" isn't a why - it's a symptom. The real why has to be deeper: freedom, impact, legacy, space to create. Without a deep why, you'll quit the moment it gets hard. And it will get hard.

Two: shiny object syndrome. Every week a new opportunity looks better than the last. You chase everything and commit to nothing. Patience is the rarest skill in wealth building. The people who win don't have more opportunities - they stop abandoning the good ones for the next shiny thing.

Three: addiction to trading time for money. "Busy" is toxic. If you're proud of being busy, you've confused effort with progress. Work enough to cover what you need, then redirect your energy to building systems and investing. Your goal is to detach income from hours.

Four: lack of self-trust. Living in survival mode means ego takes the wheel. You second-guess everything. You need approval before deciding. You mistake fear for wisdom. Self-trust is built by following intuition in small decisions until it becomes reliable in the big ones.

Five: 3D attachment. Clinging to specific outcomes. Wanting a thing so badly you push it away with your grip. The paradox: surrender and non-attachment is what lets things flow toward you. Move with intention, not desperation.`,
      },
      {
        heading: "Money Is Energy",
        content: `Money is not a pile of sacred paper. It's energy - it moves, circulates, and seeks environments that value it.

Your relationship with money directly shapes your results. If you're afraid of it, it avoids you. If you resent it, it leaves you. If you treat spending it as a tragedy, it stops flowing through you. If you celebrate it - celebrate receiving AND spending on things that matter - it circulates.

Audit your language. Do you say "I can't afford that"? That's a command to the subconscious. Replace it with "that isn't a priority right now." Do you say "money is hard to earn"? That's a belief you're reinforcing every time you say it. Notice the invisible scripts.

The wealthy don't have a better relationship with money because they're wealthy. They became wealthy because they had a better relationship with money first.`,
      },
      {
        heading: "The $500K Tipping Point",
        content: `Going from $0 to $500K liquid is the hardest milestone of the financial journey. Not because the math is harder - the math is simpler at the start. Because identity is the real bottleneck.

Below $500K, almost every person hits the same invisible ceiling. Old beliefs resurface. Self-sabotage intensifies. You make an unexplainable decision. You break your own rules. You feel the need to "take a break."

That's not bad luck. That's your subconscious doing exactly what it was programmed to do: return you to the state that feels familiar. Familiar doesn't mean good. It just means known.

Above $500K, something shifts. You've broken inertia. You've proven to yourself that you can hold a number the old identity said wasn't for you. Capital starts doing work that used to require your time. The compounding gets real.

The practical takeaway: the first $100K will be the slowest and the hardest. Don't quit. Don't compare yourself to someone at $5M. They had their own $0 to $500K - you just weren't there for it.`,
      },
      {
        heading: "Systems Thinking",
        content: `The world divides into two kinds of thinkers: systems thinkers and everyone else. This isn't elitism - it's a skill distinction that determines outcomes.

Non-systems thinkers see cause and effect. "If I do X, Y will happen." They oversimplify. They miss second- and third-order consequences. They make decisions that look rational in isolation but destroy value in context.

Systems thinkers see interconnection. They model feedback loops. They understand that a body is a system of systems, an economy is a system of systems, a portfolio is a system of systems. They ask "and then what?" three levels deep before acting.

The classic example: someone starves themselves on 1,000 calories a day to lose weight. Short-term: weight drops. But the body is a complex system - the metabolism down-regulates, thyroid slows, cortisol spikes, nutrient deficiencies develop, sleep breaks. When normal eating resumes, the weight returns with interest. The simple intervention had second-order consequences that invalidated the whole plan.

Investing works the same way. Saving aggressively looks smart. But if inflation outpaces savings, you're losing in real terms. "Safe" asset allocation in one regime is reckless in another. Every decision ripples.

The gap between your mental model and actual reality = the amount of suffering in your life. Closing that gap - by thinking in systems - is the most useful mental upgrade available.`,
      },
      {
        heading: "Reprogramming Practice",
        content: `Identity doesn't change through insight. It changes through repetition.

The practice is simple in structure and hard in execution. Three moves.

One: get crystal clear on what you want - in present-tense "I AM" / "I HAVE" statements. Not "I want to earn $500K." That keeps it future-tense, permanently out of reach. Instead: "I am earning $500K a year doing work I love." Be specific: monthly income, assets, bank balance, time freedom, lifestyle, purpose.

Two: define who you need to be to have that. Ask, "how does the type of person who currently has this reality show up in the world?" What are their core values? Their skills? Their beliefs about money? Their daily habits? How do they carry themselves? This is the specification for the identity upgrade.

Three: embody it daily. Read and declare your "I AM" statements out loud. Notice where your body resists - that's where the old identity lives. Use calming practices (breathwork, meditation) to build nervous system capacity for the new identity. You have to feel safe holding abundance before you can hold it.

Do this for 90 days before judging it. Most people quit at day 11. The ones who don't quit get a different life.`,
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
        style={{ maxHeight: expanded ? "3000px" : "0" }}
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
        <h1 className="text-[clamp(36px,5vw,56px)] font-bold leading-[1.1] tracking-tighter mb-5 max-w-[700px]">
          Reprogram the
          <br />
          operating system.
        </h1>
        <p className="text-lg leading-[1.7] text-white/55 max-w-[600px] m-0">
          Years of spiritual study distilled into a practical framework for
          understanding your psyche, recognizing the patterns that run your
          life, and freeing yourself from the ego's grip. Not theory  -
          lived experience.
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
