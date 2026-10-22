import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";

/** Tahun dievaluasi saat build (module scope), bukan saat render, agar prerender tetap statis. */
const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="mt-24 pb-10 sm:mt-32">
      <Container>
        <div className="border-line border-t pt-6">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
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
          <div className="text-label text-muted mt-6 flex flex-col gap-3 font-mono sm:flex-row sm:items-baseline sm:justify-between">
            <p>
              © {year} {site.name}. {site.location.split(",")[0]}.
            </p>
            <p>
              Set in Geist.{" "}
              <TextLink href={site.sourceUrl} tap>
                Source
              </TextLink>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
