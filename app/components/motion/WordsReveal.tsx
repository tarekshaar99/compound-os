"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { wordReveal, VIEWPORT_ONCE, EASE_SOFT } from "../../lib/motion";

/**
 * Word-by-word headline reveal — splits `text` on whitespace and animates
 * each word with the spec's blur-slide-up keyframes (i*100ms stagger).
 *
 * Use only on hero h1s and large display text; the per-word animation
 * is heavy and would be visual noise on small body copy.
 */
export default function WordsReveal({
  text,
  className,
  as = "h1",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}) {
  const reduced = useReducedMotion();
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);
  const Tag = as;

  if (reduced) {
    // Single-fade fallback — no per-word, no transforms.
    return (
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.7, ease: EASE_SOFT }}
        style={{ display: "block" }}
      >
        <Tag className={className}>{text}</Tag>
      </motion.span>
    );
  }

  return (
    <Tag
      className={className}
      // Render the wrapper as a block so the child motion.spans inline-flex inside.
      style={{ display: "block" }}
    >
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        style={{
          display: "flex",
          flexWrap: "wrap",
          rowGap: "0.1em",
        }}
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            custom={i}
            variants={wordReveal}
            style={{
              display: "inline-block",
              marginRight: "0.28em",
              willChange: "transform, opacity, filter",
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
