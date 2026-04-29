"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cardHover } from "../../lib/motion";

/**
 * Card with the spec's hover spring (y: -7, scale: 1.018) on a 300/22 spring.
 * Inner content can use cardInnerHover for the layered icon-lift effect.
 *
 * `as="a"` makes the whole card clickable while preserving keyboard semantics.
 */
export default function HoverCard({
  children,
  className,
  as = "div",
  href,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "a" | "button";
  href?: string;
  onClick?: () => void;
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardHover}
      // Both anchor and button props passed through; React ignores those that
      // don't apply. Anchor needs href, button needs onClick.
      {...(as === "a" ? { href } : {})}
      {...(as === "button" ? { onClick, type: "button" as const } : {})}
    >
      {children}
    </MotionTag>
  );
}
