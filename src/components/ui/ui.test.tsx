import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ExperienceItem } from "./ExperienceItem";
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
            summary: "S",
            stack: ["Go", "Redis"],
            live: "https://x.dev",
          }}
        />
      </ol>,
    );
    expect(screen.getByRole("link", { name: /live/i })).toHaveAttribute("href", "https://x.dev");
    expect(screen.queryByRole("link", { name: /source/i })).toBeNull();
    expect(screen.getByText("05")).toBeInTheDocument();
    expect(screen.getByText("Go · Redis")).toBeInTheDocument();
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
