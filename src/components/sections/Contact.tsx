import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { riseDelay } from "@/lib/utils";
import { LocalTime } from "@/components/ui/LocalTime";

export function Contact() {
  return (
    <section className="pb-8">
      <Container>
        <p
          className="rise font-display text-ink max-w-3xl text-3xl leading-snug text-balance sm:text-4xl"
          style={riseDelay(120)}
        >
          If you are building something where the backend has to be right, I would like to hear
          about it.
        </p>

        <a
          href={`mailto:${site.email}`}
          className="rise font-display text-ink decoration-line hover:decoration-accent mt-12 inline-block max-w-full text-2xl break-all underline decoration-2 underline-offset-8 transition-colors duration-200 sm:text-4xl lg:text-5xl"
          style={riseDelay(200)}
        >
          {site.email}
        </a>

        <ul className="rise mt-10 flex flex-wrap gap-3" style={riseDelay(280)}>
          {site.social.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-ink text-ink hover:bg-ink hover:text-paper inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-colors duration-200"
              >
                {s.label}
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>

        <dl
          className="rise border-line text-label text-muted mt-16 grid gap-3 border-t pt-5 font-mono sm:grid-cols-3"
          style={riseDelay(360)}
        >
          <div>
            <dt className="sr-only">Local time</dt>
            <dd className="text-ink">
              <LocalTime timeZone="Asia/Jakarta" label="Jakarta" />
            </dd>
          </div>
          <div>
            <dt className="sr-only">Now</dt>
            <dd className="text-ink">{site.currently.label}</dd>
          </div>
          <div>
            <dt className="sr-only">Response</dt>
            <dd className="text-ink">Usually replies within a day</dd>
          </div>
        </dl>
      </Container>
    </section>
  );
}
