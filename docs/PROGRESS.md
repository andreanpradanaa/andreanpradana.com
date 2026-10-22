# Progress — andreanpradana.com

Diperbarui: 2026-10-23 · Total: 63/63 task (100%)

| Prioritas | Fitur              | Progress   | %    | x/y | Status      |
| --------- | ------------------ | ---------- | ---- | --- | ----------- |
| P0        | Fondasi            | ░░░░░░░░░░ | 0%   | 0/6 | Belum mulai |
| P0        | Hero & Nav         | ░░░░░░░░░░ | 0%   | 0/4 | Belum mulai |
| P0        | Selected Work      | ░░░░░░░░░░ | 0%   | 0/4 | Belum mulai |
| P1        | About & Experience | ░░░░░░░░░░ | 0%   | 0/3 | Belum mulai |
| P1        | Contact & Footer   | ░░░░░░░░░░ | 0%   | 0/3 | Belum mulai |
| P1        | SEO & Metadata     | ░░░░░░░░░░ | 0%   | 0/4 | Belum mulai |
| P2        | Deploy             | ░░░░░░░░░░ | 0%   | 0/2 | Belum mulai |
| P0        | Proof v2           | ██████████ | 100% | 6/6 | Selesai     |

Legenda: █ selesai · ░ belum · Status: Belum mulai / Berjalan / Selesai / Terblokir

## Fondasi (P0)

- [x] Routing App Router + layout dasar
- [x] Theme/token di `globals.css` (terang + gelap)
- [x] Font (Newsreader, Geist, Geist Mono) via `next/font`
- [x] Konten bertipe di `src/content/`
- [x] `.env.example` + metadata base URL
- [x] CI (lint → typecheck → test coverage → build)

## Hero & Nav (P0)

- [x] Nav inline (wordmark + 3 anchor)
- [x] Headline display serif + intro
- [x] Baris meta (lokasi, peran saat ini)
- [x] Test: render, heading h1 tunggal, tautan nav

## Selected Work (P0)

- [x] Data proyek (`projects.ts`)
- [x] `ProjectRow` + daftar
- [x] Tautan repo/demo eksternal (rel noopener)
- [x] Test: jumlah baris, tautan eksternal

## About & Experience (P1)

- [x] Bio singkat + fokus saat ini
- [x] Daftar pengalaman (`experience.ts`) dari CV + pendidikan
- [x] Test render

## Contact & Footer (P1)

- [x] Email + tautan sosial
- [x] Footer colophon
- [x] Test tautan mailto

## SEO & Metadata (P1)

- [x] `metadata` (title, description, canonical, OG, Twitter)
- [x] `opengraph-image.tsx`
- [x] `sitemap.ts`, `robots.ts`
- [x] Favicon/ikon SVG

## Deploy (P2)

- [ ] Repo GitHub `andreanpradana.com` + import ke Vercel
- [ ] Domain andreanpradana.com di Vercel (DNS)

## Design critique fixes (P1)

- [x] Target sentuh ≥ 44px (prop `tap`, nav) dan label mono 13px di HP (`text-label`)
- [x] Nama tautan Source/Live unik per proyek (`aria-label`)
- [x] Kolom konteks proyek (`context`) dan periode satu tahun
- [x] Blok Track record di About (`highlights`)
- [x] Blok Education dirapikan, label aside sebagai `h3`

## Multi-page + sticky header (P1)

- [x] Rute `/work`, `/about`, `/contact` dengan `PageHeader` (h1) dan metadata per halaman
- [x] Beranda: Hero + 3 proyek unggulan + tautan "All work"
- [x] Nav sticky di layout, tautan aktif (`NavLinks`, `aria-current`), `next/link`
- [x] Skip link ke `main`, struktur heading h1 → h2 di tiap rute
- [x] Sitemap 4 rute

## Mascot hero (P1)

- [x] Komponen vendor `ui/mascot-portfolio-hero` + wrapper `sections/MascotHero` dengan konten `site.hero`
- [x] Font Archivo Black, token `--accent-soft` dan `--nav-h`
- [x] Perbaikan review: kontras mode gelap, `role="list"`, lint React Compiler
- [x] Test perilaku beranda (h1, services, klik maskot) dan mock jsdom

## Poster redesign (P1)

- [x] Referensi 21st.dev dicatat di spec; komponen vendor dan Archivo Black dihapus
- [x] Hero tipografis: pill, headline + swash, CTA, badge kata kunci, stempel berputar, services
- [x] About: angka pencapaian (`Stat`) dan timeline pengalaman
- [x] Contact: email besar, tombol sosial, jam Jakarta (`LocalTime`)
- [x] Animasi masuk `rise` + hover baris proyek; reduced-motion mematikan animasi

## Living system (P1)

- [x] `SystemDiagram` (SVG, aliran request animasi, reduced-motion); ubin metrik dihapus 2026-10-23
- [x] Hero, Projects, About, Contact digaya ulang; Newsreader dan komponen poster dihapus
- [x] Rute `/projects` baru; `/work` → pengalihan (meta refresh + Nginx 301)
- [x] Token `--surface` terang/gelap; palet situs dipertahankan
- [x] Test diperbarui (33), review diterapkan

## Proof (P0)

- [x] Audit repo: 3 repo kosong dikeluarkan; 4 proyek nyata dengan `caseStudy`
- [x] Halaman studi kasus `/projects/<slug>` (`ArchitectureList`, keputusan/trade-off, evidence)
- [x] Strip pengalaman di beranda (Download CV dibatalkan: CV memuat nomor telepon)
- [x] svcgen di urutan pertama dengan dampak faktual
- [x] Footer memuat email, GitHub, LinkedIn
- [x] Diagram: deskripsi sr-only, label "illustrative", tanpa angka latensi

## Proof v2 (P0)

- [x] `Experience.highlight` (angka kata demi kata dari `summary`) tampil di strip beranda
- [x] Hero intro menyebut bukti per kemampuan; anotasi node `SystemDiagram` (sembunyi < 640px, ada di deskripsi sr-only)
- [x] `Project.featured` + `featuredProjects()`: svcgen → System Design Practice → Trendstore; `/projects` urutan array
- [x] CTA "Case study →" per baris, satu tautan beraksesibel `Case study: <judul>` (stretched link)
- [x] `ui/FlowDiagram` dari `caseStudy.flow` (svcgen, System Design Practice); `ui/ImpactRow` hanya bila `impact` terisi (saat ini kosong)
- [x] 46 test, coverage 98%; review + ui-check 375/768/1280 terang-gelap
