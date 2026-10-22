type Props = { value: string; label: string };

/** Angka besar dalam serif + keterangan pendek. */
export function Stat({ value, label }: Props) {
  return (
    <div className="border-line border-t pt-4">
      <p className="font-display text-ink tnum text-5xl leading-none tracking-tight sm:text-6xl">
        {value}
      </p>
      <p className="text-muted mt-3 max-w-[22ch] text-[15px] leading-snug">{label}</p>
    </div>
  );
}
