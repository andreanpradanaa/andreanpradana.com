import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { site } from "@/content/site";
import { Nav } from "./Nav";

const pathname = vi.hoisted(() => ({ value: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => pathname.value }));

describe("Nav", () => {
  it("wordmark ke beranda dan tautan ke rute halaman", () => {
    pathname.value = "/";
    render(<Nav />);
    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(within(nav).getByRole("link", { name: site.name })).toHaveAttribute("href", "/");
    for (const item of site.nav) {
      expect(within(nav).getByRole("link", { name: item.label })).toHaveAttribute(
        "href",
        item.href,
      );
    }
    expect(within(nav).queryByRole("link", { current: "page" })).toBeNull();
  });

  it("menandai tautan aktif dengan aria-current sesuai pathname", () => {
    pathname.value = "/projects";
    render(<Nav />);
    const active = screen.getByRole("link", { current: "page" });
    expect(active).toHaveTextContent("Projects");
  });
});
