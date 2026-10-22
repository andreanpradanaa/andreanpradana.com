import type { Project } from "@/content/projects";
import { TextLink } from "./TextLink";

type Props = { project: Project; index: number };

/** Satu baris proyek: nomor + konteks, judul + tahun, ringkasan, stack, tautan. */
export function ProjectRow({ project, index }: Props) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <li className="border-line grid gap-x-8 gap-y-3 border-t py-8 md:grid-cols-12 md:py-10">
      <div className="text-label text-muted flex gap-3 font-mono md:col-span-2 md:flex-col md:gap-1">
        <span className="tnum" aria-hidden="true">
          {number}
        </span>
        <span>{project.context}</span>
      </div>
      <div className="md:col-span-3">
        <h3 className="font-display text-ink text-2xl leading-tight">{project.title}</h3>
        <p className="tnum text-label text-muted mt-1 font-mono">{project.year}</p>
      </div>
      <div className="md:col-span-7">
        <p className="text-ink/90 max-w-prose text-[15px] leading-relaxed">{project.summary}</p>
        <div className="mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <p className="text-label text-muted font-mono">{project.stack.join(" · ")}</p>
          <div className="flex gap-5">
            {project.repo ? (
              <TextLink
                href={project.repo}
                tap
                className="text-sm"
                aria-label={`Source of ${project.title}`}
              >
                Source
              </TextLink>
            ) : null}
            {project.live ? (
              <TextLink
                href={project.live}
                tap
                className="text-sm"
                aria-label={`Live demo of ${project.title}`}
              >
                Live
              </TextLink>
            ) : null}
          </div>
        </div>
      </div>
    </li>
  );
}
