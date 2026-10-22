import { projects, type Project } from "@/content/projects";
import { ProjectRow } from "@/components/ui/ProjectRow";

type Props = { items?: Project[] };

/** Daftar proyek; default semua proyek dalam urutan array. */
export function ProjectList({ items = projects }: Props) {
  return (
    <ol>
      {items.map((project, i) => (
        <ProjectRow key={project.slug} project={project} index={i} />
      ))}
    </ol>
  );
}
