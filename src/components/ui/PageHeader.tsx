import { Container } from "./Container";

type Props = { number: string; label: string; title: string; intro?: string };

/** Kepala halaman: label mono bernomor di atas hairline, h1 display, intro opsional. */
export function PageHeader({ number, label, title, intro }: Props) {
  return (
    <header className="pt-12 pb-12 sm:pt-16 sm:pb-16">
      <Container>
        <div className="border-line flex items-baseline gap-4 border-t pt-4">
          <span className="tnum text-label text-muted font-mono tracking-wide" aria-hidden="true">
            {number}
          </span>
          <p className="text-label text-muted font-mono tracking-wide uppercase">{label}</p>
        </div>
        <h1 className="font-display text-ink mt-6 text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>
        {intro ? (
          <p className="text-ink/85 mt-5 max-w-prose text-lg leading-relaxed">{intro}</p>
        ) : null}
      </Container>
    </header>
  );
}
