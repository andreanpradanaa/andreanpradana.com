import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ExperienceItem } from "./ExperienceItem";
import { ArchitectureList } from "./ArchitectureList";
import { FlowDiagram } from "./FlowDiagram";
import { ImpactRow } from "./ImpactRow";
import { LocalTime } from "./LocalTime";
import { SystemDiagram } from "./SystemDiagram";
import { PageHeader } from "./PageHeader";
import { ProjectRow } from "./ProjectRow";
import { SectionLabel } from "./SectionLabel";
import { TextLink } from "./TextLink";

describe("TextLink", () => {
  it("tautan internal tidak membuka tab baru", () => {
    render(<TextLink href="#work">Work</TextLink>);
    const a = screen.getByRole("link", { name: "Work" });
    expect(a).not.toHaveAttribute("target");
  });
  it("tautan eksternal otomatis target _blank + rel aman + panah", () => {
    render(<TextLink href="https://example.com">Ext</TextLink>);
    const a = screen.getByRole("link", { name: "Ext" });
    expect(a).toHaveAttribute("target", "_blank");
    expect(a).toHaveAttribute("rel", "noopener noreferrer");
    expect(a).toHaveTextContent("↗");
  });
  it("prop external=false memaksa internal walau http", () => {
    render(
      <TextLink href="https://example.com" external={false}>
        Same
      </TextLink>,
    );
    expect(screen.getByRole("link", { name: "Same" })).not.toHaveAttribute("target");
  });
});

describe("SectionLabel", () => {
  it("merender h2 dengan id", () => {
    render(
      <SectionLabel number="01" id="x">
        Label
      </SectionLabel>,
    );
    expect(screen.getByRole("heading", { level: 2, name: "Label" })).toHaveAttribute("id", "x");
  });
});

describe("ProjectRow", () => {
  it("menampilkan tautan Live bila ada dan menyembunyikan Source bila tidak ada", () => {
    render(
      <ol>
        <ProjectRow
          index={4}
          project={{
            slug: "x",
            title: "X",
            year: "2024",
            context: "Study project",
            summary: "S",
            stack: ["Go", "Redis"],
            live: "https://x.dev",
            caseStudy: { problem: "P", built: "B", architecture: [], decisions: [], evidence: [] },
          }}
        />
      </ol>,
    );
    expect(screen.getByRole("link", { name: "Live demo of X" })).toHaveAttribute(
      "href",
      "https://x.dev",
    );
    expect(screen.queryByRole("link", { name: /source/i })).toBeNull();
    expect(screen.getByText(/Study project · 2024/)).toBeInTheDocument();
    expect(screen.getByText("Go · Redis")).toBeInTheDocument();
  });

  it("tautan Source punya nama unik berisi judul proyek", () => {
    render(
      <ol>
        <ProjectRow
          index={0}
          project={{
            slug: "y",
            title: "Yard",
            year: "2025",
            context: "Open source",
            summary: "S",
            stack: ["Go"],
            repo: "https://github.com/x/y",
            caseStudy: { problem: "P", built: "B", architecture: [], decisions: [], evidence: [] },
          }}
        />
      </ol>,
    );
    expect(screen.getByRole("link", { name: "Source of Yard" })).toHaveAttribute(
      "href",
      "https://github.com/x/y",
    );
  });
});

describe("ExperienceItem", () => {
  it("menampilkan periode berakhir dan organisasi tanpa tautan", () => {
    render(
      <ol>
        <ExperienceItem
          item={{ role: "R", org: "Org", start: "2020", end: "2021", summary: "Sum" }}
        />
      </ol>,
    );
    expect(screen.getByText("2020–2021")).toBeInTheDocument();
    expect(screen.getByText(/Org/)).toBeInTheDocument();
    expect(screen.queryByRole("link")).toBeNull();
  });
});

describe("PageHeader", () => {
  it("merender label, h1, dan intro opsional", () => {
    render(<PageHeader label="About" title="About" intro="Intro singkat" />);
    expect(screen.getByRole("heading", { level: 1, name: "About" })).toBeInTheDocument();
    expect(screen.getByText("Intro singkat")).toBeInTheDocument();
  });
});

describe("LocalTime", () => {
  it("menampilkan jam di zona waktu yang diminta", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-22T16:30:00Z")); // 23:30 WIB
    render(<LocalTime timeZone="Asia/Jakarta" label="Jakarta" />);
    expect(screen.getByText(/23:30/)).toBeInTheDocument();
    vi.useRealTimers();
  });
});

describe("SystemDiagram", () => {
  it("dekoratif: aria-hidden dan memuat node layanan", () => {
    render(<SystemDiagram />);
    const svg = screen.getByTestId("system-diagram");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveTextContent(/api/i);
    expect(svg).toHaveTextContent(/postgres/i);
    expect(svg).not.toHaveTextContent(/42ms/);
  });
});

describe("ArchitectureList", () => {
  it("merender komponen dan perannya sebagai daftar", () => {
    render(
      <ArchitectureList
        items={[
          { name: "API", role: "Fiber router, request filter" },
          { name: "PostgreSQL", role: "primary store" },
        ]}
      />,
    );
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(screen.getByText("Fiber router, request filter")).toBeInTheDocument();
  });
});

describe("ProjectRow CTA", () => {
  it("satu tautan aksesibel bernama unik ke studi kasus; CTA visual tidak digandakan untuk AT", () => {
    render(
      <ol>
        <ProjectRow
          index={0}
          project={{
            slug: "z",
            title: "Zed",
            year: "2025",
            context: "Open source",
            summary: "S",
            stack: ["Go"],
            repo: "https://github.com/x/z",
            caseStudy: { problem: "P", built: "B", architecture: [], decisions: [], evidence: [] },
          }}
        />
      </ol>,
    );
    const study = screen.getAllByRole("link", { name: "Case study: Zed" });
    expect(study).toHaveLength(1);
    expect(study[0]).toHaveAttribute("href", "/projects/z");
    expect(screen.getByText(/case study/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Source of Zed" })).toBeInTheDocument();
  });
});

describe("FlowDiagram", () => {
  const flow = {
    nodes: [
      { id: "a", label: "Input", note: "prompt" },
      { id: "b", label: "Generator" },
      { id: "c", label: "Repo" },
    ],
    edges: [
      { from: "a", to: "b", label: "answers" },
      { from: "b", to: "c" },
    ],
  };
  it("merender figure, caption, node, dan daftar alur aksesibel", () => {
    render(<FlowDiagram flow={flow} caption="How it works" />);
    const fig = screen.getByRole("figure", { name: /how it works/i });
    expect(fig).toBeInTheDocument();
    const list = screen.getByRole("list", { name: /flow/i });
    expect(within(list).getAllByRole("listitem")).toHaveLength(2);
    expect(within(list).getByText(/Input → Generator \(answers\)/)).toBeInTheDocument();
    expect(screen.getAllByText("Generator").length).toBeGreaterThan(0);
  });
  it("tidak merender apa pun tanpa flow", () => {
    const { container } = render(<FlowDiagram flow={undefined} caption="x" />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe("ImpactRow", () => {
  it("merender angka bila ada dan tidak merender bila kosong", () => {
    const { container, unmount } = render(<ImpactRow impact={[]} />);
    expect(container).toBeEmptyDOMElement();
    unmount();
    render(<ImpactRow impact={[{ value: "3", label: "services" }]} />);
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("services")).toBeInTheDocument();
  });
});
