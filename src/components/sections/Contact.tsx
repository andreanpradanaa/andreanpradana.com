import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { LocalTime } from "@/components/ui/LocalTime";
import { riseDelay } from "@/lib/utils";

const TILE = "border-line bg-surface rounded-xl border px-5 py-4";
const LABEL = "font-mono text-label text-muted tracking-wide uppercase";

export function Contact() {
  return (
    <section className="pb-8">
      <Container>
        <a
          href={`mailto:${site.email}`}
          className="rise text-ink decoration-line hover:decoration-accent inline-block max-w-full text-2xl font-medium tracking-tight break-all underline decoration-2 underline-offset-8 transition-colors duration-200 sm:text-4xl lg:text-5xl"
          style={riseDelay(120)}
        >
          {site.email}
        </a>

        <ul className="rise mt-8 flex flex-wrap gap-3" style={riseDelay(200)}>
          <li>
            <a
              href={`mailto:${site.email}`}
              className="bg-ink text-paper hover:bg-accent hover:text-ink inline-flex items-center rounded-full px-5 py-3 text-sm font-medium transition-colors duration-200"
            >
              Email me
            </a>
          </li>
          {site.social.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-line text-ink hover:border-ink inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-colors duration-200"
              >
                {s.label}
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>

        <dl className="rise mt-14 grid gap-3 sm:grid-cols-3" style={riseDelay(280)}>
          <div className={TILE}>
            <dt className={LABEL}>Local time</dt>
            <dd className="text-ink mt-2 text-[15px]">
              <LocalTime timeZone="Asia/Jakarta" label="Jakarta" />
            </dd>
          </div>
          <div className={TILE}>
            <dt className={LABEL}>Status</dt>
            <dd className="text-ink mt-2 flex items-center gap-2 text-[15px]">
              <span className="bg-accent size-2 rounded-full" aria-hidden="true" />
              Open to backend roles
            </dd>
          </div>
          <div className={TILE}>
            <dt className={LABEL}>Replies</dt>
            <dd className="text-ink mt-2 text-[15px]">
              Usually within a day · {site.currently.label}
            </dd>
          </div>
        </dl>
      </Container>
    </section>
  );
}
