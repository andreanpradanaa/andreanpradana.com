import Link from "next/link";
import { experience, type Experience } from "@/content/experience";
import { Container } from "@/components/ui/Container";
import { formatPeriod, riseDelay } from "@/lib/utils";

const SHOWN = 3;

type Props = { items?: Experience[] };

/** Beranda: tiga pekerjaan terakhir + highlight (bukti untuk klaim di hero). */
export function ExperienceStrip({ items = experience.slice(0, SHOWN) }: Props) {
  return (
    <section aria-labelledby="experience-strip-heading" className="pb-6">
      <Container>
        <div className="rise border-line border-t pt-5" style={riseDelay(360)}>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <h2
                id="experience-strip-heading"
                className="text-label text-muted font-mono font-normal tracking-wide uppercase"
              >
                Experience
              </h2>
              <p className="text-muted mt-1 text-sm">Where the claims above come from.</p>
            </div>
            <div className="flex gap-5">
              <Link
                href="/about"
                className="text-ink decoration-line hover:decoration-ink text-sm underline underline-offset-4 transition-colors"
              >
                Full story
              </Link>
            </div>
          </div>
          <ol className="mt-4 grid gap-3 sm:grid-cols-3">
            {items.map((e) => (
              <li
                key={`${e.org}-${e.start}`}
                className="border-line bg-surface rounded-xl border px-5 py-4"
              >
                <p className="text-ink text-[15px] font-medium">{e.org}</p>
                <p className="text-muted mt-0.5 text-sm">{e.role}</p>
                <p className="tnum text-label text-muted mt-2 font-mono">
                  {formatPeriod(e.start, e.end)}
                </p>
                {e.highlight ? (
                  <p
                    data-testid="experience-highlight"
                    className="text-muted border-line mt-3 border-t pt-3 text-sm leading-snug"
                  >
                    {e.highlight}
                  </p>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
