import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely (later classes win). */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

/** Clamp a number into [min, max]. */
export const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

/** Positive modulo (JS `%` returns negatives for negative dividends). */
export const mod = (n: number, m: number) => ((n % m) + m) % m;

/** Zero-pad a step index for labels like `01`, `02`. */
export const pad2 = (n: number) => String(n).padStart(2, "0");

/** Format a price for the pricing table. Whole numbers only, locale-aware. */
export const formatPrice = (value: number, locale: string, currency = "USD") =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
