import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { experience } from "@/content/experience";
import { featuredProjects, projects } from "@/content/projects";
import { site } from "@/content/site";
import { About } from "./About";
import { Contact } from "./Contact";
import { ExperienceStrip } from "./ExperienceStrip";
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

  it("judul proyek menautkan ke halaman studi kasus", () => {
    render(<ProjectList />);
    for (const p of projects) {
      expect(screen.getByRole("link", { name: `Case study: ${p.title}` })).toHaveAttribute(
        "href",
        `/projects/${p.slug}`,
      );
    }
  });

  it("prop items membatasi baris yang dirender", () => {
    render(<ProjectList items={projects.slice(0, 2)} />);
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
  it("menampilkan tahun berjalan, email, tautan sosial, dan sumber", () => {
    render(<Footer />);
    expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()}`))).toBeInTheDocument();
    expect(screen.getByRole("link", { name: site.email })).toHaveAttribute(
      "href",
      `mailto:${site.email}`,
    );
    for (const s of site.social) {
      expect(screen.getByRole("link", { name: s.label })).toHaveAttribute("href", s.href);
    }
    expect(screen.getByRole("link", { name: /source/i })).toHaveAttribute("href", site.sourceUrl);
  });
});

describe("ExperienceStrip", () => {
  it("menampilkan highlight tiga pekerjaan teratas, kata demi kata dari data", () => {
    render(<ExperienceStrip />);
    for (const e of experience.slice(0, 3)) {
      expect(screen.getByText(e.org)).toBeInTheDocument();
      if (e.highlight) expect(screen.getByText(e.highlight)).toBeInTheDocument();
    }
    expect(screen.getByText(/42%/)).toBeInTheDocument();
    expect(screen.getByText(/zero to above 80%/)).toBeInTheDocument();
    expect(screen.getByText(/OpenTelemetry/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /full story/i })).toHaveAttribute("href", "/about");
  });

  it("entri tanpa highlight tetap tampil tanpa baris highlight", () => {
    render(
      <ExperienceStrip
        items={[{ role: "Dev", org: "Acme", start: "2020", end: "2021", summary: "S" }]}
      />,
    );
    expect(screen.getByText("Acme")).toBeInTheDocument();
    expect(screen.queryByTestId("experience-highlight")).toBeNull();
  });
});

describe("featuredProjects", () => {
  it("mengurutkan beranda lewat field featured tanpa mengubah urutan /projects", () => {
    expect(featuredProjects().map((p) => p.slug)).toEqual([
      "svcgen",
      "system-design-practice",
      "trendstore",
    ]);
    expect(projects.map((p) => p.slug)).toContain("sysdesign-lab");
    render(<ProjectList items={featuredProjects()} />);
    const titles = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(titles).toEqual(["svcgen", "System Design Practice", "Trendstore API"]);
  });
});

describe("data flow studi kasus", () => {
  it("setiap edge merujuk node yang ada dan id node unik", () => {
    for (const p of projects) {
      const flow = p.caseStudy.flow;
      if (!flow) continue;
      const ids = flow.nodes.map((n) => n.id);
      expect(new Set(ids).size).toBe(ids.length);
      for (const e of flow.edges) {
        expect(ids).toContain(e.from);
        expect(ids).toContain(e.to);
      }
    }
  });
});
