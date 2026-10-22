import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center py-24">
      <Container>
        <p className="text-muted text-label font-mono tracking-wide uppercase">404</p>
        <h1 className="text-ink mt-4 text-4xl font-medium tracking-tight">
          There is nothing at this address.
        </h1>
        <p className="mt-6">
          <TextLink href="/">Back to the front page</TextLink>
        </p>
      </Container>
    </div>
  );
}
