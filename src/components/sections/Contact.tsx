import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/TextLink";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-8 pt-24 sm:pt-32">
      <Container>
        <SectionLabel number="03" id="contact-heading">
          Contact
        </SectionLabel>
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <p className="font-display text-ink max-w-3xl text-3xl leading-snug text-balance sm:text-4xl md:col-span-8">
            If you are building something where the backend has to be right, I would like to hear
            about it.
          </p>
          <ul className="grid gap-3 font-mono text-sm md:col-span-4 md:col-start-9">
            <li>
              <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink>
            </li>
            {site.social.map((s) => (
              <li key={s.href}>
                <TextLink href={s.href}>{s.label}</TextLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
