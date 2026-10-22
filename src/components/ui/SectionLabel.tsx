type Props = { number?: string; children: string; id?: string };

/** Label section mono kecil di atas hairline. */
export function SectionLabel({ number, children, id }: Props) {
  return (
    <div className="border-line flex items-baseline gap-4 border-b pb-3">
      {number ? (
        <span className="tnum text-label text-muted font-mono tracking-wide" aria-hidden="true">
          {number}
        </span>
      ) : null}
      <h2 id={id} className="text-label text-muted font-mono font-normal tracking-wide uppercase">
        {children}
      </h2>
    </div>
  );
}
