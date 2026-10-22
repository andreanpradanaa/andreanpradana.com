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
  it("memuat hero, tiga proyek unggulan, dan tautan ke semua proyek", () => {
    render(<HomePage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 2, name: /selected work/i })).toBeInTheDocument();
    expect(within(screen.getByRole("list")).getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByRole("link", { name: /all work/i })).toHaveAttribute("href", "/work");
    expect(screen.queryByText(experience[0].summary)).toBeNull();
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
  it("punya h1, bio, dan daftar pengalaman", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { level: 1, name: /about/i })).toBeInTheDocument();
    expect(screen.getByText(site.about[0])).toBeInTheDocument();
    for (const item of experience) expect(screen.getByText(item.summary)).toBeInTheDocument();
  });
});

describe("ContactPage", () => {
  it("punya h1 dan tautan email", () => {
    render(<ContactPage />);
    expect(screen.getByRole("heading", { level: 1, name: /contact/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: site.email })).toHaveAttribute(
      "href",
      `mailto:${site.email}`,
    );
  });
});
