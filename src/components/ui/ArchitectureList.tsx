import type { ArchitectureItem } from "@/content/projects";

type Props = { items: ArchitectureItem[] };

/** Arsitektur sebagai daftar komponen + peran: aksesibel, tanpa gambar yang menebak. */
export function ArchitectureList({ items }: Props) {
  return (
    <ul className="border-line divide-line bg-surface divide-y rounded-xl border">
      {items.map((it) => (
        <li key={it.name} className="grid gap-1 px-5 py-4 md:grid-cols-12 md:gap-6">
          <span className="text-ink font-mono text-sm md:col-span-4">{it.name}</span>
          <span className="text-muted text-[15px] leading-relaxed md:col-span-8">{it.role}</span>
        </li>
      ))}
    </ul>
  );
}
