"use client";

import { useEffect, useState, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Number counter — animates from `from` → `to` over `duration` once the
 * element enters the viewport. Used on stat tiles ("99 spots remaining",
 * "12 modules completed", etc.). Snapping is replaced with an easeOut
 * count animation per the spec.
 */
export default function CountUp({
  to,
  from = 0,
  duration = 1.4,
  className,
  format = (v: number) => Math.round(v).toString(),
  prefix = "",
  suffix = "",
}: {
  to: number;
  from?: number;
  duration?: number;
  className?: string;
  format?: (value: number) => string;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? to : from);

  useEffect(() => {
    if (!inView || reduced) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      // easeOutQuart — matches "feel like it's settling into place"
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, from, to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {format(value)}
      {suffix}
    </span>
  );
}
