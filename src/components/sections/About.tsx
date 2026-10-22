import { experience } from "@/content/experience";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { ExperienceItem } from "@/components/ui/ExperienceItem";
import { cn } from "@/lib/utils";

function AsideLabel({ children, className }: { children: string; className?: string }) {
  return (
    <h2
      className={cn(
        "text-label text-muted font-mono font-normal tracking-wide uppercase",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function About() {
  return (
    <section className="pb-8">
      <Container>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="space-y-5 md:col-span-7">
            {site.about.map((p) => (
              <p key={p} className="text-ink/85 max-w-prose text-lg leading-relaxed">
                {p}
              </p>
            ))}
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <AsideLabel>Track record</AsideLabel>
            <ul className="mt-3 space-y-2">
              {site.highlights.map((h) => (
                <li key={h} className="text-ink text-[15px] leading-snug">
                  {h}
                </li>
              ))}
            </ul>
            <AsideLabel className="mt-8">Focus</AsideLabel>
            <ul className="mt-3 space-y-2">
              {site.focus.map((f) => (
                <li key={f} className="text-ink text-[15px]">
                  {f}
                </li>
              ))}
            </ul>
            <AsideLabel className="mt-8">Education</AsideLabel>
            <div className="mt-3 space-y-3">
              <div>
                <p className="text-ink text-[15px]">{site.education.school}</p>
                <p className="text-muted text-[15px]">{site.education.degree}</p>
                <p className="tnum text-label text-muted mt-0.5 font-mono">
                  {site.education.period}
                </p>
              </div>
              <div>
                <p className="text-ink text-[15px]">{site.training.org}</p>
                <p className="text-muted text-[15px]">{site.training.label}</p>
                <p className="tnum text-label text-muted mt-0.5 font-mono">
                  {site.training.period}
                </p>
              </div>
            </div>
          </div>
        </div>
        <AsideLabel className="mt-16">Experience</AsideLabel>
        <ol className="mt-3">
          {experience.map((item) => (
            <ExperienceItem key={`${item.org}-${item.start}`} item={item} />
          ))}
        </ol>
      </Container>
    </section>
  );
}
