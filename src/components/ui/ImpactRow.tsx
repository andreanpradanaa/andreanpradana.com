import type { Impact } from "@/content/projects";

type Props = { impact?: Impact[] };

/** Baris angka dampak terukur; hanya dari data user. Kosong = tidak merender apa pun. */
export function ImpactRow({ impact }: Props) {
  if (!impact || impact.length === 0) return null;
  return (
    <section className="rise mt-14">
      <h2 className="text-label text-muted font-mono font-normal tracking-wide uppercase">
        Impact
      </h2>
      <dl className="mt-4 flex flex-wrap gap-x-10 gap-y-4">
        {impact.map((i) => (
          <div key={i.label} className="flex flex-col-reverse">
            <dt className="text-muted text-sm">{i.label}</dt>
            <dd className="text-ink tnum text-2xl font-medium tracking-tight">{i.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
