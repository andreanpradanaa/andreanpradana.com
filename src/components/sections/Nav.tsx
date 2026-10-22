import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function Nav() {
  return (
    <header>
      <Container>
        <nav aria-label="Primary" className="flex items-baseline justify-between py-6 sm:py-8">
          <a
            href="#top"
            className="font-display text-ink -my-2 inline-block py-2 text-lg tracking-tight"
          >
            {site.name}
          </a>
          <ul className="flex gap-5 sm:gap-8">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-muted hover:text-ink text-label -my-3.5 inline-block py-3.5 font-mono tracking-wide uppercase transition-colors duration-200"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
