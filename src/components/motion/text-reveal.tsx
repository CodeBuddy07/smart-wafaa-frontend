"use client";

import { motion, type Variants } from "motion/react";

import { motion as tokens } from "@/lib/tokens";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  /** Per-word delay. */
  gap?: number;
  delay?: number;
}

const container: Variants = {
  hidden: {},
  visible: (custom: { gap: number; delay: number }) => ({
    transition: { staggerChildren: custom.gap, delayChildren: custom.delay },
  }),
};

const word: Variants = {
  hidden: { opacity: 0, y: "60%", rotateX: -35 },
  visible: {
    opacity: 1,
    y: "0%",
    rotateX: 0,
    transition: { duration: 0.7, ease: tokens.ease.out },
  },
};

/**
 * Word-by-word headline reveal. Each word is clipped so it rises into place.
 */
export function TextReveal({ text, as = "h1", className, gap = 0.06, delay = 0 }: TextRevealProps) {
  const Tag = motion[as];
  const words = text.split(" ");

  return (
    <Tag
      className={cn("flex flex-wrap", className)}
      initial="hidden"
      animate="visible"
      variants={container}
      custom={{ gap, delay }}
      aria-label={text}
    >
      {words.map((w, i) => (
        // Each word is clipped in its own box; the trailing space keeps the DOM text
        // readable ("The Smart Way", not "TheSmartWay") for copy, search and AT.
        <span key={`${w}-${i}`} className="overflow-hidden pb-[0.08em] whitespace-pre" aria-hidden>
          <motion.span className="inline-block origin-bottom will-change-transform" variants={word}>
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
