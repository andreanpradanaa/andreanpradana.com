import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";

export function Hero() {
  return (
    <section id="top" className="pt-16 pb-24 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-40">
      <Container>
        <p className="text-muted font-mono text-xs tracking-wide uppercase">
          {site.name} · {site.role}
        </p>
        <h1 className="font-display text-ink mt-6 max-w-4xl text-[2.5rem] leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
          {site.headline}
        </h1>
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            {site.intro.map((p) => (
              <p key={p} className="text-ink/85 max-w-prose text-lg leading-relaxed">
                {p}
              </p>
            ))}
          </div>
          <dl className="text-muted grid gap-3 font-mono text-xs md:col-span-4 md:col-start-9">
            <div className="flex gap-4">
              <dt className="w-16 shrink-0">Based</dt>
              <dd className="text-ink">{site.location}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-16 shrink-0">Now</dt>
              <dd className="text-ink">
                <TextLink href={site.currently.href}>{site.currently.label}</TextLink>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-16 shrink-0">Mail</dt>
              <dd className="text-ink">
                <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink>
              </dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  );
}
