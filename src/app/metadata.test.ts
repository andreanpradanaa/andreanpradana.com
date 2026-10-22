import { describe, expect, it } from "vitest";
import robots from "./robots";
import sitemap from "./sitemap";

describe("sitemap & robots", () => {
  it("sitemap memuat halaman utama dengan base URL", () => {
    const entries = sitemap();
    expect(entries.map((e) => e.url.replace(/^https?:\/\/[^/]+/, ""))).toEqual([
      "/",
      "/work",
      "/about",
      "/contact",
    ]);
  });
  it("robots mengizinkan semua dan menunjuk sitemap", () => {
    const r = robots();
    expect(r.rules).toEqual({ userAgent: "*", allow: "/" });
    expect(r.sitemap).toMatch(/\/sitemap\.xml$/);
  });
});
