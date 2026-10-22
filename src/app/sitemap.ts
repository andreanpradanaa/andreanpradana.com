import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { getSiteUrl } from "@/lib/site-url";

/** Wajib untuk `output: "export"`: rute metadata dirender statis saat build. */
export const dynamic = "force-static";

const ROUTES = ["/", "/projects", "/about", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const pages = ROUTES.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
  const studies = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...pages, ...studies];
}
