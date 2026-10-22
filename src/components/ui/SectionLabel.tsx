type Props = { number: string; children: string; id?: string };

/** Label section bernomor dalam mono kecil, di atas hairline. */
export function SectionLabel({ number, children, id }: Props) {
  return (
    <div className="border-line flex items-baseline gap-4 border-t pt-4">
      <span className="tnum text-muted text-label font-mono tracking-wide" aria-hidden="true">
        {number}
      </span>
      <h2 id={id} className="text-muted text-label font-mono tracking-wide uppercase">
        {children}
      </h2>
    </div>
  );
}
