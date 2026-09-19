"use client";

import { useEffect, useRef } from "react";

import { animate, useInView, useMotionValue, useTransform } from "motion/react";

interface AnimatedNumberProps {
  value: number;
  /** Formatting function — defaults to locale integer. */
  format?: (n: number) => string;
  duration?: number;
  className?: string;
}

/**
 * Tween a number to `value` whenever it changes (and once on first view).
 */
export function AnimatedNumber({ value, format, duration = 0.6, className }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => (format ? format(v) : Math.round(v).toLocaleString()));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, value, duration, mv]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.textContent = text.get();
    return text.on("change", (v) => {
      el.textContent = v;
    });
  }, [text]);

  return (
    <span ref={ref} className={className} aria-label={format ? format(value) : String(value)} />
  );
}
