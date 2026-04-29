"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import {
  staggerContainer,
  blurSlideUp,
  blurSlideUpReduced,
  VIEWPORT_ONCE,
} from "../../lib/motion";

/**
 * Stagger container — wrap a list/grid in this and use `<StaggerItem>` for
 * each child. Each child runs the same blur-slide-up entrance, offset by
 * 90ms per index (per the spec). Triggers once at 10% viewport.
 */
export function Stagger({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol" | "section" | "article";
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={staggerContainer}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Stagger child — must be a direct descendant of `<Stagger>`. Don't nest
 * <Reveal> inside; the child variant inherits parent stagger orchestration.
 */
export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article" | "section" | "span";
}) {
  const reduced = useReducedMotion();
  const variants = reduced ? blurSlideUpReduced : blurSlideUp;
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}
