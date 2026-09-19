"use client";

import { motion, type HTMLMotionProps, type Variants } from "motion/react";

import { motion as tokens } from "@/lib/tokens";

export interface StaggerProps extends HTMLMotionProps<"div"> {
  /** Delay between children. */
  gap?: number;
  /** Initial delay before the first child. */
  delay?: number;
  once?: boolean;
  margin?: string;
}

/**
 * Container that staggers its `StaggerItem` children as they scroll into view.
 */
export function Stagger({
  gap = tokens.stagger.base,
  delay = 0,
  once = true,
  margin = "0px 0px -10% 0px",
  children,
  ...props
}: StaggerProps) {
  const variants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: gap, delayChildren: delay } },
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

export interface StaggerItemProps extends HTMLMotionProps<"div"> {
  distance?: number;
  scale?: boolean;
}

export function StaggerItem({
  distance = 24,
  scale = false,
  children,
  ...props
}: StaggerItemProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y: distance, ...(scale ? { scale: 0.96 } : {}) },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: tokens.duration.slow, ease: tokens.ease.out },
    },
  };
  return (
    <motion.div variants={variants} {...props}>
      {children}
    </motion.div>
  );
}
