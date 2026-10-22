import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

/** Wajib untuk `output: "export"`: rute metadata dirender statis saat build. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${getSiteUrl()}/`, changeFrequency: "monthly", priority: 1 }];
}
