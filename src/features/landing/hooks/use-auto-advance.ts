"use client";

import { useCallback, useEffect, useState } from "react";

interface Options {
  /** Number of steps. */
  count: number;
  /** ms between automatic advances. */
  interval?: number;
  /** ms to stay paused after the user interacts. */
  resumeAfter?: number;
  /** Master switch — pass `inView && !prefersReducedMotion`. */
  enabled?: boolean;
}

/**
 * Cycles `active` through `count` steps on a timer. Selecting a step pauses
 * the cycle for `resumeAfter` ms; hovering pauses it entirely. `cycle`
 * increments on every (re)start so progress indicators can reset via `key`.
 */
export function useAutoAdvance({
  count,
  interval = 5200,
  resumeAfter = 12000,
  enabled = true,
}: Options) {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [cycle, setCycle] = useState(0);

  const running = enabled && !hovering && !userPaused;

  // Advance on a timer while running. Re-arms whenever `active` or `cycle` changes.
  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => {
      setActive((a) => (a + 1) % count);
      setCycle((c) => c + 1);
    }, interval);
    return () => clearTimeout(id);
  }, [running, active, cycle, count, interval]);

  // Lift the user pause after `resumeAfter`. Re-arms on every new selection via `cycle`.
  useEffect(() => {
    if (!userPaused) return;
    const id = setTimeout(() => {
      setUserPaused(false);
      setCycle((c) => c + 1);
    }, resumeAfter);
    return () => clearTimeout(id);
  }, [userPaused, cycle, resumeAfter]);

  const select = useCallback(
    (index: number) => {
      setActive(((index % count) + count) % count);
      setUserPaused(true);
      setCycle((c) => c + 1);
    },
    [count],
  );

  const next = useCallback(() => select(active + 1), [active, select]);
  const prev = useCallback(() => select(active - 1), [active, select]);

  return { active, select, next, prev, running, cycle, setHovering };
}
