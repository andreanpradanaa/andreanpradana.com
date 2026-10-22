import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import AboutPage from "./about/page";
import ContactPage from "./contact/page";
import HomePage from "./page";
import WorkPage from "./work/page";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

describe("HomePage", () => {
  it("memuat hero: satu h1 dengan headline, badge kata kunci, services, CTA ke contact", () => {
    render(<HomePage />);
    const h1 = screen.getAllByRole("heading", { level: 1 });
    expect(h1).toHaveLength(1);
    expect(h1[0]).toHaveTextContent(site.hero.headline.join(" "));
    for (const k of site.hero.keywords) expect(screen.getByText(k)).toBeInTheDocument();
    for (const s of site.hero.services) expect(screen.getByText(s)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /backend roles/i })).toHaveAttribute(
      "href",
      "/contact",
    );
    expect(screen.getByRole("heading", { level: 2, name: /selected work/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /all work/i })).toHaveAttribute("href", "/work");
  });
});

describe("WorkPage", () => {
  it("punya h1 dan semua proyek", () => {
    render(<WorkPage />);
    expect(screen.getByRole("heading", { level: 1, name: /selected work/i })).toBeInTheDocument();
    expect(within(screen.getByRole("list")).getAllByRole("listitem")).toHaveLength(projects.length);
  });
});

describe("AboutPage", () => {
  it("punya h1, bio, angka pencapaian, dan timeline pengalaman", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { level: 1, name: /about/i })).toBeInTheDocument();
    expect(screen.getByText(site.about[0])).toBeInTheDocument();
    for (const st of site.stats) {
      expect(screen.getByText(st.value)).toBeInTheDocument();
      expect(screen.getByText(st.label)).toBeInTheDocument();
    }
    const timeline = screen.getByRole("list", { name: /experience/i });
    expect(within(timeline).getAllByRole("listitem")).toHaveLength(experience.length);
  });
});

describe("ContactPage", () => {
  it("punya h1, email besar, tombol sosial, dan jam Jakarta", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-22T03:05:00Z")); // 10:05 WIB
    render(<ContactPage />);
    expect(screen.getByRole("heading", { level: 1, name: /contact/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: site.email })).toHaveAttribute(
      "href",
      `mailto:${site.email}`,
    );
    for (const so of site.social) {
      expect(screen.getByRole("link", { name: so.label })).toHaveAttribute("href", so.href);
    }
    expect(screen.getByText(/10:05/)).toBeInTheDocument();
    expect(screen.getByText(/jakarta/i)).toBeInTheDocument();
    vi.useRealTimers();
  });
});
