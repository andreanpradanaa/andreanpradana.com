import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";

/** Tahun dievaluasi saat build (module scope), bukan saat render, agar prerender tetap statis. */
const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="mt-24 pb-10 sm:mt-32">
      <Container>
        <div className="border-line text-muted flex flex-col gap-3 border-t pt-6 font-mono text-xs sm:flex-row sm:items-baseline sm:justify-between">
          <p>
            © {year} {site.name}. {site.location.split(",")[0]}.
          </p>
          <p>
            Set in Newsreader and Geist. <TextLink href={site.sourceUrl}>Source</TextLink>
          </p>
        </div>
      </Container>
    </footer>
  );
}
