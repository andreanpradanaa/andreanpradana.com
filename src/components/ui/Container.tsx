import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = { children: ReactNode; className?: string };

/** Lebar maksimum situs + gutter horizontal responsif. */
export function Container({ children, className }: Props) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}
