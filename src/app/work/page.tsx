import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

/**
 * Rute lama; mengarahkan ke /projects. Static export tidak mendukung `redirects`,
 * jadi: meta refresh (React 19 mengangkatnya ke <head>) + aturan 301 di Nginx.
 */
export const metadata: Metadata = {
  title: "Projects",
  robots: { index: false, follow: true },
  alternates: { canonical: "/projects" },
};

export default function WorkRedirect() {
  return (
    <section className="py-24">
      <meta httpEquiv="refresh" content="0;url=/projects" />
      <Container>
        <h1 className="text-ink text-lg font-medium">This page moved.</h1>
        <p className="text-muted mt-2 text-[15px]">
          <Link href="/projects" className="text-ink underline underline-offset-4">
            Go to Projects
          </Link>
        </p>
      </Container>
    </section>
  );
}
