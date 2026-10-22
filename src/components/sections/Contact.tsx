import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";

export function Contact() {
  return (
    <section className="pb-8">
      <Container>
        <div className="grid gap-10 md:grid-cols-12">
          <p className="font-display text-ink max-w-3xl text-3xl leading-snug text-balance sm:text-4xl md:col-span-8">
            If you are building something where the backend has to be right, I would like to hear
            about it.
          </p>
          <ul className="grid gap-7 font-mono text-sm md:col-span-4 md:col-start-9">
            <li>
              <TextLink href={`mailto:${site.email}`} tap>
                {site.email}
              </TextLink>
            </li>
            {site.social.map((s) => (
              <li key={s.href}>
                <TextLink href={s.href} tap>
                  {s.label}
                </TextLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
