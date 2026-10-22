import type { Metadata } from "next";

type PageMeta = { title: string; description: string; path: string };

/** Metadata halaman: title, description, canonical, dan OG/Twitter yang konsisten per rute. */
export function pageMetadata({ title, description, path }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { url: path, title, description },
    twitter: { title, description },
  };
}
