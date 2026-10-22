import { describe, expect, it } from "vitest";
import { cn, formatPeriod } from "./utils";

describe("cn", () => {
  it("menggabungkan class dan membuang nilai falsy", () => {
    expect(cn("a", false, "b", undefined, null, "c")).toBe("a b c");
  });
});

describe("formatPeriod", () => {
  it("memakai 'sekarang' bila tanggal akhir kosong (now)", () => {
    expect(formatPeriod("2023")).toBe("2023–now");
    expect(formatPeriod("2021", "2023")).toBe("2021–2023");
  });

  it("menampilkan satu tahun bila awal dan akhir sama", () => {
    expect(formatPeriod("2021", "2021")).toBe("2021");
  });
});
