import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { ProjectList } from "@/components/sections/ProjectList";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Backend projects in Go: reservation engine, marketplace API, service scaffolding, auth playground, system design study material.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        label="Projects"
        title="Built to understand."
        intro="Side projects and tooling, mostly in Go. Each one exists to understand a problem properly, not to pad a list."
      />
      <section className="pb-8">
        <Container>
          <ProjectList />
        </Container>
      </section>
    </>
  );
}
