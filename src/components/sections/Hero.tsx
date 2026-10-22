import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { RotatingBadge } from "@/components/ui/RotatingBadge";
import { Swash } from "@/components/ui/Swash";
import { cn, riseDelay } from "@/lib/utils";

/** Sisipkan kata beraksen (italic + swash) ke dalam baris headline yang memuatnya. */
function HeadlineLine({ line, emphasis }: { line: string; emphasis: string }) {
  const at = line.indexOf(emphasis);
  if (at < 0) return <span className="block">{line} </span>;
  return (
    <span className="block">
      {line.slice(0, at)}
      <span className="relative inline-block italic">
        {emphasis}
        <Swash />
      </span>
      {line.slice(at + emphasis.length)}{" "}
    </span>
  );
}

/** Beranda: poster tipografis. Referensi 21st.dev hanya untuk ritme dan elemen kecil. */
export function Hero() {
  const h = site.hero;
  return (
    <section className="pt-10 pb-16 sm:pt-14 sm:pb-20">
      <Container>
        <div className="rise flex flex-wrap items-center gap-x-6 gap-y-3">
          <Pill number={h.index}>{h.discipline}</Pill>
          <span className="text-label text-muted inline-flex items-center gap-2 font-mono tracking-wide uppercase">
            <span className="bg-accent size-2 rounded-full" aria-hidden="true" />
            {h.status}
          </span>
        </div>

        <div className="mt-10 grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <h1
              className="rise font-display text-ink text-[2.9rem] leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
              style={riseDelay(80)}
            >
              {h.headline.map((line) => (
                <HeadlineLine key={line} line={line} emphasis={h.emphasis} />
              ))}
            </h1>
            <p
              className="rise text-ink/85 mt-8 max-w-[52ch] text-lg leading-relaxed"
              style={riseDelay(160)}
            >
              {h.intro}
            </p>
            <div className="rise mt-8 inline-flex items-stretch" style={riseDelay(240)}>
              <span className="border-ink text-ink bg-paper z-10 rounded-full border px-5 py-3 text-sm font-medium">
                {h.seekingLabel}
              </span>
              <a
                href="/contact"
                className="group border-ink bg-accent-soft text-ink hover:bg-ink hover:text-paper -ml-4 inline-flex items-center gap-2 rounded-r-full border py-3 pr-6 pl-8 text-sm font-medium transition-colors duration-200"
              >
                {h.seeking}
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>
          </div>

          <div className="md:col-span-4 md:flex md:flex-col md:items-end md:justify-between">
            <ul
              className="rise flex max-w-xs flex-wrap gap-2 md:justify-end"
              style={riseDelay(200)}
            >
              {h.keywords.map((k, i) => (
                <li
                  key={k}
                  className={cn(
                    "border-ink/60 text-ink hover:bg-ink hover:text-paper rounded-full border px-3 py-1 font-mono text-xs tracking-wide transition-all duration-200 hover:-translate-y-0.5",
                    i % 3 === 0 && "rotate-[-3deg]",
                    i % 3 === 1 && "rotate-[2deg]",
                    i % 3 === 2 && "rotate-[-1deg]",
                  )}
                >
                  {k}
                </li>
              ))}
            </ul>
            <RotatingBadge
              text={h.badgeText}
              initials={h.initials}
              className="rise mt-10 md:mt-0"
            />
          </div>
        </div>

        <ul
          className="rise border-line mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t pt-5 sm:mt-20"
          style={riseDelay(320)}
        >
          {h.services.map((s) => (
            <li
              key={s}
              className="text-ink after:bg-accent relative text-sm font-medium after:absolute after:right-0 after:-bottom-1 after:left-0 after:h-0.5 after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {s}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
