import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = { number?: string; children: ReactNode; className?: string };

/** Label mono dalam pill outline; `number` diisi blok tinta di kiri. */
export function Pill({ number, children, className }: Props) {
  return (
    <span
      className={cn(
        "border-ink/70 text-label text-ink inline-flex items-center gap-2.5 rounded-full border py-1 pr-3.5 pl-1 font-mono tracking-wide uppercase",
        !number && "pl-3.5",
        className,
      )}
    >
      {number ? (
        <span className="tnum bg-ink text-paper rounded-full px-2.5 py-0.5">{number}</span>
      ) : null}
      <span>{children}</span>
    </span>
  );
}
