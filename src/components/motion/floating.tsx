"use client";

import { motion, type HTMLMotionProps } from "motion/react";

export interface FloatingProps extends HTMLMotionProps<"div"> {
  /** Vertical travel in px. */
  amplitude?: number;
  /** Loop duration in seconds. */
  duration?: number;
  delay?: number;
  /** Subtle rotation in degrees. */
  rotate?: number;
}

/** Gentle up/down hover loop for badges & decorative cards. */
export function Floating({
  amplitude = 8,
  duration = 5,
  delay = 0,
  rotate = 0,
  children,
  ...props
}: FloatingProps) {
  return (
    <motion.div
      animate={{ y: [0, -amplitude, 0], rotate: rotate ? [0, rotate, 0] : undefined }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
