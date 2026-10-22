import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { ProjectList } from "@/components/sections/ProjectList";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Selected backend projects in Go: marketplaces, reservations, auth, tooling and system design study material.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHeader
        number="01"
        label="Work"
        title="Selected work"
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
