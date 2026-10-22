import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Contact } from "@/components/sections/Contact";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Get in touch with Andrean Pradana by email, GitHub or LinkedIn.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader number="03" label="Contact" title="Contact" />
      <Contact />
    </>
  );
}
