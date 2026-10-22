import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { About } from "@/components/sections/About";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Backend engineer in Jakarta: three years across banking, logistics and digital payments.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader number="02" label="About" title="About" />
      <About />
    </>
  );
}
