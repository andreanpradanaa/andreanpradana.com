import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { About } from "./About";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { Nav } from "./Nav";
import { Work } from "./Work";

describe("Nav", () => {
  it("menampilkan wordmark dan semua tautan navigasi", () => {
    render(<Nav />);
    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(within(nav).getByText(site.name)).toHaveAttribute("href", "#top");
    for (const item of site.nav) {
      expect(within(nav).getByRole("link", { name: item.label })).toHaveAttribute(
        "href",
        item.href,
      );
    }
  });
});

describe("Hero", () => {
  it("punya tepat satu h1 berisi headline dan tautan email", () => {
    render(<Hero />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(site.headline);
    expect(screen.getByRole("link", { name: site.email })).toHaveAttribute(
      "href",
      `mailto:${site.email}`,
    );
  });
});

describe("Work", () => {
  it("merender satu baris per proyek dengan tautan Source eksternal yang aman", () => {
    render(<Work />);
    const list = screen.getByRole("list");
    expect(within(list).getAllByRole("listitem")).toHaveLength(projects.length);
    const sources = screen.getAllByRole("link", { name: /source/i });
    expect(sources).toHaveLength(projects.filter((p) => p.repo).length);
    for (const link of sources) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
    expect(screen.getByRole("heading", { level: 2, name: /selected work/i })).toBeInTheDocument();
  });
});

describe("About", () => {
  it("merender paragraf bio, fokus, dan setiap pengalaman", () => {
    render(<About />);
    for (const p of site.about) expect(screen.getByText(p)).toBeInTheDocument();
    for (const f of site.focus) expect(screen.getByText(f)).toBeInTheDocument();
    expect(screen.getByText(site.education.degree)).toBeInTheDocument();
    expect(screen.getByText(site.training.label)).toBeInTheDocument();
    for (const item of experience) {
      expect(screen.getByText(item.summary)).toBeInTheDocument();
    }
    // periode "now" untuk entri tanpa tanggal akhir
    const open = experience.find((e) => !e.end);
    if (open) expect(screen.getByText(`${open.start}–now`)).toBeInTheDocument();
  });
});

describe("Contact", () => {
  it("menampilkan email mailto dan tautan sosial", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: site.email })).toHaveAttribute(
      "href",
      `mailto:${site.email}`,
    );
    for (const s of site.social) {
      expect(screen.getByRole("link", { name: s.label })).toHaveAttribute("href", s.href);
    }
  });
});

describe("Footer", () => {
  it("menampilkan tahun berjalan dan tautan sumber", () => {
    render(<Footer />);
    expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()}`))).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /source/i })).toHaveAttribute("href", site.sourceUrl);
  });
});
