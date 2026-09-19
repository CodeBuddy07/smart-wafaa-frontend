import type * as React from "react";

/** Hide content visually while keeping it available to assistive tech. */
export function VisuallyHidden({ children }: { children: React.ReactNode }) {
  return <span className="sr-only">{children}</span>;
}
