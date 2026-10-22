import { ImageResponse } from "next/og";
import { site } from "@/content/site";

/** Wajib untuk `output: "export"`: rute metadata dirender statis saat build. */
export const dynamic = "force-static";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** OG image tipografis: kertas hangat, nama di atas, headline di tengah. */
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#f6f3ec",
        color: "#1a1816",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 24, color: "#6b655c", letterSpacing: 1 }}>
        {site.name} · {site.role}
      </div>
      <div style={{ display: "flex", fontSize: 60, lineHeight: 1.1, maxWidth: 1000 }}>
        {site.headline}
      </div>
      <div style={{ display: "flex", fontSize: 24, color: "#6b655c" }}>andreanpradana.com</div>
    </div>,
    size,
  );
}
