type Props = { label: string; value: string; note?: string };

/** Ubin metrik ala dashboard: label mono, angka besar, catatan kecil. */
export function MetricTile({ label, value, note }: Props) {
  return (
    <div className="border-line bg-surface rounded-xl border px-5 py-4">
      <p className="text-label text-muted font-mono tracking-wide uppercase">{label}</p>
      <p className="text-ink tnum mt-2 text-2xl font-medium tracking-tight sm:text-3xl">{value}</p>
      {note ? <p className="text-muted mt-1 text-xs">{note}</p> : null}
    </div>
  );
}
