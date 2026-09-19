"use client";

import { motion, type HTMLMotionProps, type Variants } from "motion/react";

import { motion as tokens } from "@/lib/tokens";

type Direction = "up" | "down" | "left" | "right" | "none";

export interface RevealProps extends HTMLMotionProps<"div"> {
  /** Slide-in direction. */
  from?: Direction;
  /** Travel distance in px. */
  distance?: number;
  delay?: number;
  duration?: number;
  /** Animate once (default) or every time it enters the viewport. */
  once?: boolean;
  /** Viewport margin, e.g. "-10% 0px". */
  margin?: string;
  /** Scale from slightly smaller. */
  scale?: boolean;
  blur?: boolean;
}

const offset = (from: Direction, d: number) => {
  switch (from) {
    case "up":
      return { y: d };
    case "down":
      return { y: -d };
    case "left":
      return { x: d };
    case "right":
      return { x: -d };
    default:
      return {};
  }
};

/**
 * Fade/slide a block into view when it scrolls into the viewport.
 * Uses the site's shared easing so every reveal feels identical.
 */
export function Reveal({
  from = "up",
  distance = 28,
  delay = 0,
  duration = tokens.duration.reveal,
  once = true,
  margin = "0px 0px -12% 0px",
  scale = false,
  blur = false,
  children,
  ...props
}: RevealProps) {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...offset(from, distance),
      ...(scale ? { scale: 0.96 } : {}),
      ...(blur ? { filter: "blur(8px)" } : {}),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration, delay, ease: tokens.ease.out },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  );
}
