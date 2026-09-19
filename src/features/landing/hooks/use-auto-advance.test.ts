import { act, renderHook } from "@testing-library/react";

import { useAutoAdvance } from "./use-auto-advance";

describe("useAutoAdvance", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("advances on the interval and wraps around", () => {
    const { result } = renderHook(() =>
      useAutoAdvance({ count: 3, interval: 1000, enabled: true }),
    );
    expect(result.current.active).toBe(0);
    expect(result.current.running).toBe(true);

    // One interval per act(): React flushes the re-armed timer at the end of each act.
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.active).toBe(1);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.active).toBe(2);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.active).toBe(0);
  });

  it("does not advance when disabled", () => {
    const { result } = renderHook(() =>
      useAutoAdvance({ count: 3, interval: 1000, enabled: false }),
    );
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(result.current.active).toBe(0);
    expect(result.current.running).toBe(false);
  });

  it("select() jumps, pauses, then resumes after resumeAfter", () => {
    const { result } = renderHook(() =>
      useAutoAdvance({ count: 5, interval: 1000, resumeAfter: 3000, enabled: true }),
    );

    act(() => {
      result.current.select(3);
    });
    expect(result.current.active).toBe(3);
    expect(result.current.running).toBe(false);

    act(() => {
      vi.advanceTimersByTime(2500);
    });
    expect(result.current.active).toBe(3); // still paused

    act(() => {
      vi.advanceTimersByTime(600);
    }); // pause lifted at 3000ms
    expect(result.current.running).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.active).toBe(4);
  });

  it("next()/prev() wrap within bounds", () => {
    const { result } = renderHook(() => useAutoAdvance({ count: 5, enabled: false }));
    act(() => {
      result.current.prev();
    });
    expect(result.current.active).toBe(4);
    act(() => {
      result.current.next();
    });
    expect(result.current.active).toBe(0);
  });

  it("hovering pauses the timer", () => {
    const { result } = renderHook(() =>
      useAutoAdvance({ count: 3, interval: 1000, enabled: true }),
    );
    act(() => {
      result.current.setHovering(true);
    });
    expect(result.current.running).toBe(false);
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(result.current.active).toBe(0);
  });
});
