import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { MetricTile } from "@/components/ui/MetricTile";
import { SystemDiagram } from "@/components/ui/SystemDiagram";
import { cn, riseDelay } from "@/lib/utils";

/** Beranda: headline berdampingan dengan diagram layanan hidup, lalu ubin metrik. */
export function Hero() {
  const h = site.hero;
  return (
    <section className="pt-12 pb-12 sm:pt-16 sm:pb-16">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <p className="rise text-label text-muted flex items-center gap-2.5 font-mono tracking-wide uppercase">
              <span
                className="bg-accent size-2 rounded-full shadow-[0_0_12px_var(--accent)]"
                aria-hidden="true"
              />
              {h.status}
            </p>
            <h1
              className="rise text-ink mt-6 text-[2.6rem] leading-[1.02] font-medium tracking-[-0.045em] text-balance sm:text-6xl lg:text-[4.25rem]"
              style={riseDelay(80)}
            >
              {h.headline.map((line, i) => (
                <span key={line} className={cn("block", i === h.mutedLine && "text-muted")}>
                  {line}{" "}
                </span>
              ))}
            </h1>
            <p
              className="rise text-muted mt-6 max-w-[46ch] text-lg leading-relaxed"
              style={riseDelay(160)}
            >
              {h.intro}
            </p>
            <div className="rise mt-8 flex flex-wrap gap-3" style={riseDelay(240)}>
              <Link
                href={h.primary.href}
                className="bg-ink text-paper hover:bg-accent hover:text-ink inline-flex items-center rounded-full px-5 py-3 text-sm font-medium transition-colors duration-200"
              >
                {h.primary.label}
              </Link>
              <Link
                href={h.secondary.href}
                className="border-line text-ink hover:border-ink inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-colors duration-200"
              >
                {h.secondary.label}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="rise md:col-span-6" style={riseDelay(200)}>
            <SystemDiagram />
          </div>
        </div>
        <div className="rise mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" style={riseDelay(320)}>
          {site.metrics.map((m) => (
            <MetricTile key={m.label} label={m.label} value={m.value} note={m.note} />
          ))}
        </div>
      </Container>
    </section>
  );
}
