"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import {
  blurSlideUp,
  blurSlideUpReduced,
  VIEWPORT_ONCE,
} from "../../lib/motion";

/**
 * Wraps any block in a viewport-triggered blur-slide-up entrance.
 *
 * Trigger: `whileInView` at 10% threshold, fires once per element. The
 * brand vibe is "every section materialises out of the ink, never just
 * fades" — that's why the blur component is mandatory in the variant.
 *
 * Honours `prefers-reduced-motion` automatically — drops the y/blur and
 * keeps only the opacity transition at the same duration.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  /** Per-element offset within a parent stagger (seconds). */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer" | "li" | "span";
}) {
  const reduced = useReducedMotion();
  const variants = reduced ? blurSlideUpReduced : blurSlideUp;

  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
