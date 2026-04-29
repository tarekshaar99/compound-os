/**
 * Compound OS animation primitives.
 *
 * Centralised so every entrance / hover / stagger / page transition pulls
 * from the same timing curves and motion vocabulary. Wrap variants in a
 * `useReducedMotion()` check at the call site to honour the prefers-reduced-motion
 * baseline already set in globals.css.
 *
 * Spec source: the prompt's animation pass — entrances are blur-slide-up,
 * cards have subtle layered hover, links translate without scale, conditional
 * elements use AnimatePresence with scale+blur.
 */

import type { Variants, Transition } from "framer-motion";

/* ─────────── Easing curves ─────────── */

/** Soft cinematic ease — used for entrances + page transitions. */
export const EASE_SOFT: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

/** Sharp draw ease — used for line/divider reveals. */
export const EASE_SHARP: [number, number, number, number] = [0.76, 0, 0.24, 1];

/** Spring overshoot — used for image/media entrances. */
export const EASE_OVERSHOOT: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

/* ─────────── Entrance: blur-slide-up ─────────── */

export const blurSlideUp: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 28 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.7, ease: EASE_SOFT },
  },
};

/** Reduced-motion variant of blurSlideUp — opacity only, same timing. */
export const blurSlideUpReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: EASE_SOFT } },
};

/* ─────────── Stagger container ─────────── */

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

/* ─────────── Word-by-word headline reveal ─────────── */

/**
 * Per-word variants for hero headlines. Use with motion.span split on spaces.
 * Indexed delay — apply via custom prop so each word lands `i*100ms` apart.
 */
export const wordReveal: Variants = {
  hidden: { filter: "blur(10px)", opacity: 0, y: 40 },
  visible: (i: number) => ({
    filter: ["blur(10px)", "blur(4px)", "blur(0px)"],
    opacity: [0, 0.5, 1],
    y: [40, -4, 0],
    transition: {
      duration: 0.7,
      delay: (i * 100) / 1000,
      ease: EASE_SOFT,
      times: [0, 0.5, 1],
    },
  }),
};

/* ─────────── Image / media entrance with spring overshoot ─────────── */

export const mediaEnter: Variants = {
  hidden: { scale: 0.92, opacity: 0, filter: "blur(10px)" },
  visible: {
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE_OVERSHOOT },
  },
};

/* ─────────── Card hover ─────────── */

export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -7,
    scale: 1.018,
    transition: { type: "spring" as const, stiffness: 300, damping: 22 },
  },
};

/** Inner element layered hover (icons, images inside hovered cards). */
export const cardInnerHover = {
  rest: { y: 0 },
  hover: {
    y: -3,
    transition: { type: "spring" as const, stiffness: 300, damping: 22, delay: 0.05 },
  },
};

/* ─────────── Button hover / tap ─────────── */

export const buttonHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { type: "spring" as const, stiffness: 400, damping: 20 },
  },
  tap: { scale: 0.97 },
};

/** Arrow icon nudge for CTA buttons (whileHover children). */
export const arrowNudge = {
  rest: { x: 0 },
  hover: { x: 3, transition: { type: "spring" as const, stiffness: 400, damping: 20 } },
};

/* ─────────── Link hover (no scale, just shift) ─────────── */

export const linkShift = {
  rest: { x: 0 },
  hover: { x: 3, transition: { duration: 0.2, ease: EASE_SOFT } },
};

/* ─────────── Conditional reveal (modal/dropdown/tooltip) ─────────── */

export const conditionalEnter: Variants = {
  hidden: { opacity: 0, scale: 0.9, filter: "blur(8px)", y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.3, ease: EASE_SOFT },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    filter: "blur(4px)",
    y: -6,
    transition: { duration: 0.2, ease: EASE_SOFT },
  },
};

/* ─────────── Line / divider draw-in ─────────── */

export const lineReveal: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.9, ease: EASE_SHARP },
  },
};

/* ─────────── Page transition (forward) ─────────── */

export const pageEnter: Variants = {
  hidden: { opacity: 0, filter: "blur(16px)", scale: 0.97, y: 40 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_SOFT },
  },
  exit: {
    opacity: 0,
    filter: "blur(16px)",
    scale: 1.03,
    y: -40,
    transition: { duration: 0.5, ease: EASE_SOFT },
  },
};

/* ─────────── Generic helpers ─────────── */

export const VIEWPORT_ONCE: { once: true; amount: number } = {
  once: true,
  amount: 0.1,
};

export const SHORT: Transition = { duration: 0.25, ease: EASE_SOFT };
export const MEDIUM: Transition = { duration: 0.5, ease: EASE_SOFT };
export const LONG: Transition = { duration: 0.7, ease: EASE_SOFT };
