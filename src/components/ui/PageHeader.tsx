import { riseDelay } from "@/lib/utils";
import { Container } from "./Container";
import { Pill } from "./Pill";

type Props = { number: string; label: string; title: string; intro?: string };

/** Kepala halaman: pill bernomor, h1 display, intro opsional; muncul bertahap. */
export function PageHeader({ number, label, title, intro }: Props) {
  return (
    <header className="pt-10 pb-12 sm:pt-14 sm:pb-16">
      <Container>
        <div className="rise">
          <Pill number={number}>{label}</Pill>
        </div>
        <h1
          className="rise font-display text-ink mt-6 text-5xl leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl"
          style={riseDelay(80)}
        >
          {title}
        </h1>
        {intro ? (
          <p
            className="rise text-ink/85 mt-5 max-w-prose text-lg leading-relaxed"
            style={riseDelay(160)}
          >
            {intro}
          </p>
        ) : null}
      </Container>
    </header>
  );
}
