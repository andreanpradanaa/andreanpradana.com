import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Situs sepenuhnya statis: `pnpm build` menghasilkan folder out/ yang
  // disajikan Nginx di VPS (lihat deploy/README.md).
  output: "export",
  // cacheComponents/partialPrefetching tidak dipakai: tidak kompatibel dengan
  // `dynamic = "force-static"` yang diwajibkan rute metadata pada mode export.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
