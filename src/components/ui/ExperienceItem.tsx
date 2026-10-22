import type { Experience } from "@/content/experience";
import { formatPeriod } from "@/lib/utils";
import { TextLink } from "./TextLink";

type Props = { item: Experience; isLast?: boolean };

/** Entri timeline: periode di kiri, hairline vertikal + titik, organisasi sebagai judul besar. */
export function ExperienceItem({ item, isLast }: Props) {
  return (
    <li className="group grid gap-x-8 md:grid-cols-12">
      <p className="tnum text-label text-muted pt-1 font-mono md:col-span-2">
        {formatPeriod(item.start, item.end)}
      </p>
      <div className="relative pb-10 pl-6 md:col-span-10">
        <span
          aria-hidden="true"
          className="bg-paper border-ink group-hover:bg-accent group-hover:border-accent absolute top-1.5 left-0 size-2.5 -translate-x-1/2 rounded-full border transition-colors duration-200"
        />
        {isLast ? null : (
          <span
            aria-hidden="true"
            className="bg-line absolute top-4 bottom-0 left-0 w-px -translate-x-1/2"
          />
        )}
        <h3 className="font-display text-ink text-2xl leading-tight sm:text-3xl">
          {item.href ? <TextLink href={item.href}>{item.org}</TextLink> : item.org}
        </h3>
        <p className="text-muted mt-1 text-[15px]">{item.role}</p>
        <p className="text-ink/80 mt-3 max-w-prose text-[15px] leading-relaxed">{item.summary}</p>
      </div>
    </li>
  );
}
