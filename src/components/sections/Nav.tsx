import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { NavLinks } from "./NavLinks";

/** Header sticky: latar kertas semi-transparan + blur, hairline di bawah. */
export function Nav() {
  return (
    <header className="bg-paper/90 border-line sticky top-0 z-40 border-b backdrop-blur">
      <Container>
        <nav aria-label="Primary" className="flex items-baseline justify-between py-5">
          <Link
            href="/"
            className="font-display text-ink -my-2 inline-block py-2 text-lg tracking-tight"
          >
            {site.name}
          </Link>
          <NavLinks items={site.nav} />
        </nav>
      </Container>
    </header>
  );
}
