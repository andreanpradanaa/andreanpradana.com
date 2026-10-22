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
      <PageHeader
        label="Contact"
        title="If the backend has to be right, let's talk."
        intro="Email is best. I usually reply within a day."
      />
      <Contact />
    </>
  );
}
