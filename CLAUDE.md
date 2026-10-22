# andreanpradana.com

Situs personal branding Andrean Pradana (Backend Engineer, Go). Statis, satu halaman utama + halaman pendukung, bahasa UI Indonesia (teks teknis Inggris).

## Stack

Next.js 16.4 (App Router, Turbopack, static export) · React 19.3 · TypeScript 5.9 · Tailwind CSS 4 (token di `src/app/globals.css`) · pnpm 12 · Vitest 5 + Testing Library (jsdom) · ESLint 9 (`eslint-config-next`) + Prettier · `output: "export"` → `out/` disajikan Nginx di VPS via rsync dari CI (lihat `deploy/README.md`), domain andreanpradana.com.

## Struktur

- `src/app/` routing & metadata (layout, page, sitemap, robots, opengraph).
- `src/components/ui/` primitif (Button, Link, Section); `src/components/sections/` blok halaman (Hero, Work, Writing, Contact).
- `src/content/` data situs (profil, proyek, pengalaman) sebagai TypeScript bertipe; satu sumber untuk semua section.
- `src/lib/` util murni (format, cn); `src/hooks/` hook klien bila perlu.
- Tidak ada backend, state global, atau API; data dibaca saat build.

## Spec fitur

- `docs/features/overview.md` (peta halaman, komponen, design token, keputusan desain) dan `docs/features/<fitur>/spec.md` (dari Figma via `/figma-spec`, atau ditulis manual).
- `docs/api/` kontrak API yang dikonsumsi (saat ini tidak ada; lihat README di sana).
- `docs/figma/` ekstrak mentah Figma (belum ada; TODO).

## Workflow pengerjaan fitur

Setiap fitur baru, perubahan, atau bug fix (walau user tidak mengetik command) ikuti `.claude/commands/feature.md`:
plan (spec + `graphify query`) → TDD via `/react-test`, coverage ≥ 80% → `pnpm typecheck`, `pnpm lint`, `pnpm format` bersih → review via `/react-review` + agent `security-reviewer` bila menyentuh form, input user, data pribadi, atau storage → test akhir + `graphify update .` → `/ui-check` bila tampilan berubah → update `docs/PROGRESS.md`.
Perubahan kecil (typo, copy, satu baris style) boleh lewati TDD dan review.

## Hemat token

- `graphify query "<pertanyaan>"` dulu sebelum membaca file; `graphify path`/`explain` untuk relasi.
- Jangan `cat` file besar; pakai `grep -n`, `sed -n`, `head`. Pangkas output tool (`tail`, `--stat`).
- Figma: baca `docs/figma/` dan spec; MCP Figma hanya lewat `/figma-spec`.
- Pekerjaan berlog panjang (build, test coverage) lewat subagent.
- Format + lint cepat sudah otomatis lewat hook `.claude/hooks/format.sh`.

## Git

Jangan pernah `git commit` atau `git push` (dijaga hook). User commit manual per fitur; cukup usulkan pesan commit (Conventional Commits, bahasa Inggris).

## Perintah

- `pnpm dev` dev server http://localhost:3000 · `pnpm build` static export ke `out/` (`pnpm start` tidak dipakai)
- `pnpm test` · `pnpm test:coverage` (ambang 80%) · `pnpm test:watch`
- `pnpm typecheck` (jalankan `pnpm build` sekali dulu agar tipe global `LayoutProps` tersedia) · `pnpm lint` · `pnpm lint:fix`
- `pnpm format` · `pnpm format:check`
- `graphify update .` setelah mengubah kode
