import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";
import NotFound from "./not-found";

describe("HomePage", () => {
  it("memuat satu main, satu h1, dan tiga section bernomor", () => {
    render(<HomePage />);
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(3);
  });
});

describe("NotFound", () => {
  it("menampilkan tautan kembali ke beranda", () => {
    render(<NotFound />);
    expect(screen.getByRole("link", { name: /front page/i })).toHaveAttribute("href", "/");
  });
});
