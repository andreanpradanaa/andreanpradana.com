import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/TextLink";
import { featuredProjects } from "@/content/projects";
import { ProjectList } from "./ProjectList";

/** Beranda: proyek unggulan (urutan dari field `featured`) + tautan ke halaman Projects. */
export function FeaturedWork() {
  return (
    <section aria-labelledby="featured-heading" className="pt-10 pb-8 sm:pt-14">
      <Container>
        <SectionLabel id="featured-heading">Selected projects</SectionLabel>
        <ProjectList items={featuredProjects()} />
        <p className="pt-6">
          <TextLink href="/projects" tap className="text-label font-mono uppercase">
            All projects
          </TextLink>
        </p>
      </Container>
    </section>
  );
}
