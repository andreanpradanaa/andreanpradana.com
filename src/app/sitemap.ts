import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

/** Wajib untuk `output: "export"`: rute metadata dirender statis saat build. */
export const dynamic = "force-static";

const ROUTES = ["/", "/work", "/about", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return ROUTES.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
