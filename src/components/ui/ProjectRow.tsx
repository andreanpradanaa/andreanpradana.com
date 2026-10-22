import type { Project } from "@/content/projects";
import Link from "next/link";
import { riseDelay } from "@/lib/utils";
import { TextLink } from "./TextLink";

type Props = { project: Project; index: number };

/**
 * Baris proyek. Satu-satunya tautan ke studi kasus adalah judul (nama AT
 * "Case study: <judul>"), diperluas ke seluruh baris lewat pseudo-elemen
 * (stretched link) sehingga "Case study →" cukup berupa teks. Source/Live
 * di atasnya (z-10) agar tetap bisa diklik.
 */
export function ProjectRow({ project, index }: Props) {
  const href = `/projects/${project.slug}`;
  return (
    <li
      className="rise group border-line relative grid gap-x-8 gap-y-3 border-b py-6 md:grid-cols-12 md:py-7"
      style={riseDelay(index * 70)}
    >
      <div className="md:col-span-4">
        <h3 className="text-ink group-hover:text-accent text-lg font-medium tracking-tight transition-colors duration-200">
          <Link
            href={href}
            aria-label={`Case study: ${project.title}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
          </Link>
        </h3>
        <p className="text-label text-muted mt-1 font-mono">
          {project.context} · {project.year}
        </p>
      </div>
      <p className="text-muted text-[15px] leading-relaxed md:col-span-5">{project.summary}</p>
      <div className="flex flex-col items-start gap-2 md:col-span-3 md:items-end">
        <p className="text-label text-muted font-mono md:text-right">{project.stack.join(" · ")}</p>
        <div className="flex items-baseline gap-4">
          <span className="text-ink group-hover:text-accent inline-flex items-center gap-1 text-sm font-medium transition-colors">
            Case study <span aria-hidden="true">→</span>
          </span>
          {project.repo ? (
            <TextLink
              href={project.repo}
              tap
              className="text-muted hover:text-ink relative z-10 text-sm"
              aria-label={`Source of ${project.title}`}
            >
              Source
            </TextLink>
          ) : null}
          {project.live ? (
            <TextLink
              href={project.live}
              tap
              className="text-muted hover:text-ink relative z-10 text-sm"
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
