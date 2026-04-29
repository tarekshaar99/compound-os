"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";
import { buttonHover } from "../../lib/motion";

/**
 * Button with the spec's hover/tap spring (1.05 / 0.97 on a 400/20 spring).
 * Always emits `type` to avoid the implicit-submit-in-form bug flagged in
 * the audit (21/22 imported buttons were missing this).
 *
 * Uses Framer's HTMLMotionProps<"button"> instead of React's
 * ButtonHTMLAttributes — Framer's onDrag/onDragStart/etc. conflict with
 * the DOM's native drag event signatures.
 */
export default function HoverButton({
  children,
  className,
  type = "button",
  ...rest
}: HTMLMotionProps<"button"> & { children: ReactNode }) {
  return (
    <motion.button
      className={className}
      type={type}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={buttonHover}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
