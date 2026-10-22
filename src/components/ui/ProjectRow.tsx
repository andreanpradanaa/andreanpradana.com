import type { Project } from "@/content/projects";
import { TextLink } from "./TextLink";

type Props = { project: Project; index: number };

/** Satu baris proyek: nomor, judul + tahun, ringkasan, stack, tautan. */
export function ProjectRow({ project, index }: Props) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <li className="border-line grid gap-x-8 gap-y-3 border-t py-8 md:grid-cols-12 md:py-10">
      <div className="tnum text-muted font-mono text-xs md:col-span-1" aria-hidden="true">
        {number}
      </div>
      <div className="md:col-span-4">
        <h3 className="font-display text-ink text-2xl leading-tight">{project.title}</h3>
        <p className="tnum text-muted mt-1 font-mono text-xs">{project.year}</p>
      </div>
      <div className="md:col-span-7">
        <p className="text-ink/90 max-w-prose text-[15px] leading-relaxed">{project.summary}</p>
        <div className="mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <p className="text-muted font-mono text-xs">{project.stack.join(" · ")}</p>
          {project.repo ? (
            <TextLink href={project.repo} className="text-sm">
              Source
            </TextLink>
          ) : null}
          {project.live ? (
            <TextLink href={project.live} className="text-sm">
              Live
            </TextLink>
          ) : null}
        </div>
      </div>
    </li>
  );
}
