import { describe, expect, it } from "vitest";
import { pageMetadata } from "./metadata";

describe("pageMetadata", () => {
  it("mengisi canonical, OG, dan Twitter dari satu sumber", () => {
    const m = pageMetadata({ title: "Work", description: "D", path: "/work" });
    expect(m.alternates?.canonical).toBe("/work");
    expect(m.openGraph).toMatchObject({ url: "/work", title: "Work", description: "D" });
    expect(m.twitter).toMatchObject({ title: "Work", description: "D" });
  });
});
