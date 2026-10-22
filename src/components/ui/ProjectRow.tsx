import type { Project } from "@/content/projects";
import { riseDelay } from "@/lib/utils";
import { TextLink } from "./TextLink";

type Props = { project: Project; index: number };

/** Baris proyek: judul + konteks, ringkasan, stack, tautan. Judul berubah ke aksen saat hover. */
export function ProjectRow({ project, index }: Props) {
  return (
    <li
      className="rise group border-line grid gap-x-8 gap-y-3 border-b py-6 md:grid-cols-12 md:py-7"
      style={riseDelay(index * 70)}
    >
      <div className="md:col-span-4">
        <h3 className="text-ink group-hover:text-accent text-lg font-medium tracking-tight transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-label text-muted mt-1 font-mono">
          {project.context} · {project.year}
        </p>
      </div>
      <p className="text-muted text-[15px] leading-relaxed md:col-span-5">{project.summary}</p>
      <div className="flex flex-col items-start gap-2 md:col-span-3 md:items-end">
        <p className="text-label text-muted font-mono md:text-right">{project.stack.join(" · ")}</p>
        <div className="flex gap-4">
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
    </li>
  );
}
