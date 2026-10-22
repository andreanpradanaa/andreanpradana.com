import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  /** Tampilkan tanda panah dan buka di tab baru. */
  external?: boolean;
  /** Tautan berdiri sendiri: perbesar area sentuh ke ≥ 44px tanpa menggeser layout. */
  tap?: boolean;
};

const TAP_TARGET_CLASS = "inline-block py-3.5 -my-3.5";

/** Tautan teks dengan underline tipis yang menebal saat hover. */
export function TextLink({ href, children, external, tap, className, ...rest }: Props) {
  const isExternal = external ?? /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={cn(
        "decoration-line hover:decoration-ink underline decoration-1 underline-offset-[5px] transition-colors duration-200",
        tap && TAP_TARGET_CLASS,
        className,
      )}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
      {isExternal ? (
        <span aria-hidden="true" className="ml-0.5 inline-block text-[0.85em]">
          ↗
        </span>
      ) : null}
    </a>
  );
}
