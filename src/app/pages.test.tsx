import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import AboutPage from "./about/page";
import ContactPage from "./contact/page";
import HomePage from "./page";
import ProjectsPage from "./projects/page";
import WorkRedirect from "./work/page";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

describe("HomePage", () => {
  it("memuat hero dengan diagram dekoratif, tiga proyek unggulan, dan CTA", () => {
    render(<HomePage />);
    const h1 = screen.getAllByRole("heading", { level: 1 });
    expect(h1).toHaveLength(1);
    expect(h1[0]).toHaveTextContent(site.hero.headline.join(" "));
    expect(screen.getByRole("link", { name: /get in touch/i })).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: /see projects/i })).toHaveAttribute(
      "href",
      "/projects",
    );
    expect(screen.getByTestId("system-diagram")).toHaveAttribute("aria-hidden", "true");
    expect(
      screen.getByRole("heading", { level: 2, name: /selected projects/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /all projects/i })).toHaveAttribute(
      "href",
      "/projects",
    );
  });
});

describe("ProjectsPage", () => {
  it("punya h1 dan semua proyek", () => {
    render(<ProjectsPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /built to understand/i }),
    ).toBeInTheDocument();
    expect(within(screen.getByRole("list")).getAllByRole("listitem")).toHaveLength(projects.length);
  });
});

describe("WorkRedirect", () => {
  it("mengarahkan ke /projects", () => {
    render(<WorkRedirect />);
    expect(screen.getByRole("link", { name: /projects/i })).toHaveAttribute("href", "/projects");
    const meta = document.head.querySelector('meta[http-equiv="refresh"]');
    expect(meta).toHaveAttribute("content", "0;url=/projects");
  });
});

describe("AboutPage", () => {
  it("punya h1, bio, dan timeline pengalaman", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { level: 1, name: /three years/i })).toBeInTheDocument();
    expect(screen.getByText(site.about[0])).toBeInTheDocument();
    const timeline = screen.getByRole("list", { name: /experience/i });
    expect(within(timeline).getAllByRole("listitem")).toHaveLength(experience.length);
  });
});

describe("ContactPage", () => {
  it("punya h1, email besar, tombol sosial, dan jam Jakarta", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-22T03:05:00Z")); // 10:05 WIB
    render(<ContactPage />);
    expect(screen.getByRole("heading", { level: 1, name: /let's talk/i })).toBeInTheDocument();
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
