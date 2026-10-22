/** Base URL situs dari env, fallback ke domain produksi. Tanpa trailing slash. */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const url = raw && raw.length > 0 ? raw : "https://andreanpradana.com";
  return url.replace(/\/+$/, "");
}
