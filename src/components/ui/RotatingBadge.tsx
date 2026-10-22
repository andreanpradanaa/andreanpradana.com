type Props = { text: string; initials: string; className?: string };

/** Stempel bundar: teks melingkar berputar pelan (dekoratif), inisial diam di tengah. */
export function RotatingBadge({ text, initials, className }: Props) {
  return (
    <div className={className} aria-hidden="true">
      <div className="relative size-36 sm:size-44">
        <svg
          viewBox="0 0 100 100"
          className="spin-slow absolute inset-0 size-full"
          aria-hidden="true"
        >
          <defs>
            <path id="badge-circle" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
          </defs>
          <text className="fill-ink font-mono text-[8.2px] tracking-[0.18em] uppercase">
            <textPath href="#badge-circle">{text}</textPath>
          </text>
        </svg>
        <span className="font-display text-ink absolute inset-0 flex items-center justify-center text-4xl italic sm:text-5xl">
          {initials}
        </span>
      </div>
    </div>
  );
}
