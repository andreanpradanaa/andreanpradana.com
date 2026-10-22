import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findProject, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";
import { ArchitectureList } from "@/components/ui/ArchitectureList";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { riseDelay } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${slug}`,
  });
}

const H2 = "font-mono text-label text-muted font-normal tracking-wide uppercase";

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();
  const cs = project.caseStudy;
  return (
    <article className="pt-14 pb-8 sm:pt-20">
      <Container>
        <p className="rise text-label text-muted font-mono tracking-wide uppercase">
          <TextLink href="/projects">Projects</TextLink> · {project.context} · {project.year}
        </p>
        <h1
          className="rise text-ink mt-4 text-5xl font-medium tracking-[-0.04em] text-balance sm:text-6xl"
          style={riseDelay(80)}
        >
          {project.title}
        </h1>
        <p
          className="rise text-muted mt-5 max-w-[60ch] text-lg leading-relaxed"
          style={riseDelay(160)}
        >
          {project.summary}
        </p>
        <div
          className="rise mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-2"
          style={riseDelay(200)}
        >
          <p className="text-label text-muted font-mono">{project.stack.join(" · ")}</p>
          {project.repo ? (
            <TextLink href={project.repo} tap className="text-sm">
              Source
            </TextLink>
          ) : null}
          {project.live ? (
            <TextLink href={project.live} tap className="text-sm">
              Live
            </TextLink>
          ) : null}
        </div>

        <div className="rise mt-14 grid gap-10 md:grid-cols-12" style={riseDelay(240)}>
          <section className="md:col-span-6">
            <h2 className={H2}>Problem</h2>
            <p className="text-ink/85 mt-3 text-[15px] leading-relaxed">{cs.problem}</p>
          </section>
          <section className="md:col-span-6">
            <h2 className={H2}>What I built</h2>
            <p className="text-ink/85 mt-3 text-[15px] leading-relaxed">{cs.built}</p>
          </section>
        </div>

        <section className="rise mt-14" style={riseDelay(280)}>
          <h2 className={H2}>Architecture</h2>
          <div className="mt-4">
            <ArchitectureList items={cs.architecture} />
          </div>
        </section>

        <section className="rise mt-14" style={riseDelay(320)}>
          <h2 className={H2}>Decisions and trade-offs</h2>
          <ol className="border-line divide-line mt-4 divide-y border-t">
            {cs.decisions.map((d, i) => (
              <li key={d.title} className="grid gap-2 py-6 md:grid-cols-12 md:gap-8">
                <p className="tnum text-label text-muted font-mono md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-ink text-lg font-medium tracking-tight md:col-span-4">
                  {d.title}
                </h3>
                <p className="text-muted text-[15px] leading-relaxed md:col-span-7">{d.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="rise mt-14" style={riseDelay(360)}>
          <h2 className={H2}>Evidence</h2>
          <ul className="mt-4 space-y-2">
            {cs.evidence.map((e) => (
              <li key={e} className="text-ink/85 flex gap-3 text-[15px] leading-relaxed">
                <span
                  className="bg-accent mt-2.5 size-1.5 shrink-0 rounded-full"
                  aria-hidden="true"
                />
                {e}
              </li>
            ))}
          </ul>
          {cs.status ? (
            <p className="text-label text-muted mt-6 font-mono">Status · {cs.status}</p>
          ) : null}
        </section>
      </Container>
    </article>
  );
}
