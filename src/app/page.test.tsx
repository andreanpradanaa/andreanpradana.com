import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound from "./not-found";

describe("NotFound", () => {
  it("menampilkan tautan kembali ke beranda", () => {
    render(<NotFound />);
    expect(screen.getByRole("link", { name: /front page/i })).toHaveAttribute("href", "/");
  });
});
