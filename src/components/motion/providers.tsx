"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "motion/react";

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * Client-side providers: Motion global config + Lenis smooth scrolling.
 * Lenis is skipped when the user prefers reduced motion.
 */
export function Providers({ children }: ProvidersProps) {
  const reduceMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      {reduceMotion ? (
        children
      ) : (
        <ReactLenis
          root
          options={{
            lerp: 0.1,
            duration: 1.1,
            smoothWheel: true,
            wheelMultiplier: 0.95,
            touchMultiplier: 1.4,
            anchors: true,
          }}
        >
          {children}
        </ReactLenis>
      )}
    </MotionConfig>
  );
}
