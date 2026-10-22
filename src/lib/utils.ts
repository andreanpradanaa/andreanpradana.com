/** Gabungkan class name, abaikan nilai falsy. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Format rentang tahun, mis. 2023–now (copy situs berbahasa Inggris). */
export function formatPeriod(start: string, end?: string): string {
  return `${start}–${end ?? "now"}`;
}
