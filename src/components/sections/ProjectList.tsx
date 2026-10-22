import { projects } from "@/content/projects";
import { ProjectRow } from "@/components/ui/ProjectRow";

type Props = { limit?: number };

/** Daftar proyek; `limit` memotong ke n teratas (beranda). */
export function ProjectList({ limit }: Props) {
  const items = limit === undefined ? projects : projects.slice(0, limit);
  return (
    <ol>
      {items.map((project, i) => (
        <ProjectRow key={project.slug} project={project} index={i} />
      ))}
    </ol>
  );
}
