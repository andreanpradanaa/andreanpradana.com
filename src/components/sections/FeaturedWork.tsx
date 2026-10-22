import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/TextLink";
import { ProjectList } from "./ProjectList";

const FEATURED_COUNT = 3;

/** Beranda: tiga proyek teratas + tautan ke halaman Work. */
export function FeaturedWork() {
  return (
    <section aria-labelledby="featured-heading" className="pb-8">
      <Container>
        <SectionLabel number="01" id="featured-heading">
          Selected work
        </SectionLabel>
        <ProjectList limit={FEATURED_COUNT} />
        <p className="border-line border-t pt-6">
          <TextLink href="/work" tap className="text-label font-mono uppercase">
            All work
          </TextLink>
        </p>
      </Container>
    </section>
  );
}
