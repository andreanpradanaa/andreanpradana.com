import type { CSSProperties } from "react";

/** Gabungkan class name, abaikan nilai falsy. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Delay animasi `rise` sebagai custom property untuk inline style. */
export function riseDelay(ms: number): CSSProperties {
  return { "--rise-delay": `${ms}ms` } as CSSProperties;
}

/** Format rentang tahun, mis. 2023–now (copy situs berbahasa Inggris). */
export function formatPeriod(start: string, end?: string): string {
  if (end === start) return start;
  return `${start}–${end ?? "now"}`;
}
