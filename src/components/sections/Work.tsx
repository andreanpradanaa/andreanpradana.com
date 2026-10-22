import { projects } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { ProjectRow } from "@/components/ui/ProjectRow";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" className="scroll-mt-8">
      <Container>
        <SectionLabel number="01" id="work-heading">
          Selected work
        </SectionLabel>
        <ol className="mt-2">
          {projects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} />
          ))}
        </ol>
      </Container>
    </section>
  );
}
