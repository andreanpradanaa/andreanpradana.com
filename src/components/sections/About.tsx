import { experience } from "@/content/experience";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { ExperienceItem } from "@/components/ui/ExperienceItem";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-8 pt-24 sm:pt-32">
      <Container>
        <SectionLabel number="02" id="about-heading">
          About
        </SectionLabel>
        <div className="mt-10 grid gap-12 md:grid-cols-12">
          <div className="space-y-5 md:col-span-7">
            {site.about.map((p) => (
              <p key={p} className="text-ink/85 max-w-prose text-lg leading-relaxed">
                {p}
              </p>
            ))}
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="text-muted font-mono text-xs tracking-wide uppercase">Focus</p>
            <ul className="mt-3 space-y-2">
              {site.focus.map((f) => (
                <li key={f} className="text-ink text-[15px]">
                  {f}
                </li>
              ))}
            </ul>
            <p className="text-muted mt-8 font-mono text-xs tracking-wide uppercase">Education</p>
            <p className="text-ink mt-3 text-[15px]">
              {site.education.school}
              <span className="text-muted"> · {site.education.period}</span>
            </p>
            <p className="text-muted text-[15px]">{site.education.degree}</p>
            <p className="text-ink mt-3 text-[15px]">
              {site.training.org}
              <span className="text-muted"> · {site.training.period}</span>
            </p>
            <p className="text-muted text-[15px]">{site.training.label}</p>
          </div>
        </div>
        <ol className="mt-16">
          {experience.map((item) => (
            <ExperienceItem key={`${item.org}-${item.start}`} item={item} />
          ))}
        </ol>
      </Container>
    </section>
  );
}
