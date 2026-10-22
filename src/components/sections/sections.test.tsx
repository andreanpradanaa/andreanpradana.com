import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { About } from "./About";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { ProjectList } from "./ProjectList";

describe("ProjectList", () => {
  it("merender satu baris per proyek dengan tautan Source eksternal yang aman", () => {
    render(<ProjectList />);
    const list = screen.getByRole("list");
    expect(within(list).getAllByRole("listitem")).toHaveLength(projects.length);
    const sources = screen.getAllByRole("link", { name: /^source of /i });
    expect(sources).toHaveLength(projects.filter((p) => p.repo).length);
    for (const link of sources) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("prop limit membatasi jumlah baris", () => {
    render(<ProjectList limit={2} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
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
