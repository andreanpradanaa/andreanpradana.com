import { riseDelay } from "@/lib/utils";
import { Container } from "./Container";

type Props = { label: string; title: string; intro?: string };

/** Kepala halaman: eyebrow mono, h1 Geist rapat, intro opsional. */
export function PageHeader({ label, title, intro }: Props) {
  return (
    <header className="pt-14 pb-10 sm:pt-20 sm:pb-14">
      <Container>
        <p className="rise text-label text-muted font-mono tracking-wide uppercase">{label}</p>
        <h1
          className="rise text-ink mt-4 text-5xl font-medium tracking-[-0.04em] text-balance sm:text-6xl"
          style={riseDelay(80)}
        >
          {title}
        </h1>
        {intro ? (
          <p
            className="rise text-muted mt-5 max-w-[56ch] text-lg leading-relaxed"
            style={riseDelay(160)}
          >
            {intro}
          </p>
        ) : null}
      </Container>
    </header>
  );
}
