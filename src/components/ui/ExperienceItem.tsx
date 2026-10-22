import type { Experience } from "@/content/experience";
import { formatPeriod } from "@/lib/utils";
import { TextLink } from "./TextLink";

type Props = { item: Experience };

export function ExperienceItem({ item }: Props) {
  return (
    <li className="border-line grid gap-x-8 gap-y-1 border-t py-6 md:grid-cols-12">
      <p className="tnum text-muted font-mono text-xs md:col-span-3 md:pt-1">
        {formatPeriod(item.start, item.end)}
      </p>
      <div className="md:col-span-9">
        <h3 className="text-ink text-base font-medium">
          {item.role}
          <span className="text-muted font-normal">
            {" "}
            · {item.href ? <TextLink href={item.href}>{item.org}</TextLink> : item.org}
          </span>
        </h3>
        <p className="text-ink/80 mt-2 max-w-prose text-[15px] leading-relaxed">{item.summary}</p>
      </div>
    </li>
  );
}
