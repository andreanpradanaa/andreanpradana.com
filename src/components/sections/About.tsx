import { experience } from "@/content/experience";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { ExperienceItem } from "@/components/ui/ExperienceItem";
import { Stat } from "@/components/ui/Stat";
import { cn, riseDelay } from "@/lib/utils";

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
        <div className="rise grid gap-12 md:grid-cols-12" style={riseDelay(120)}>
          <div className="space-y-5 md:col-span-7">
            {site.about.map((p) => (
              <p key={p} className="text-ink/85 max-w-prose text-lg leading-relaxed">
                {p}
              </p>
            ))}
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <AsideLabel>Focus</AsideLabel>
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

        <AsideLabel className="rise mt-20">Track record</AsideLabel>
        <div className="rise mt-4 grid gap-8 sm:grid-cols-3" style={riseDelay(80)}>
          {site.stats.map((st) => (
            <Stat key={st.value} value={st.value} label={st.label} />
          ))}
        </div>

        <AsideLabel className="rise mt-20">Experience</AsideLabel>
        <ol className="rise mt-4" aria-label="Experience" style={riseDelay(80)}>
          {experience.map((item, i) => (
            <ExperienceItem
              key={`${item.org}-${item.start}`}
              item={item}
              isLast={i === experience.length - 1}
            />
          ))}
        </ol>
      </Container>
    </section>
  );
}
