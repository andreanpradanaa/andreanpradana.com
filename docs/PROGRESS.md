# Progress — andreanpradana.com

Diperbarui: 2026-10-22 · Total: 32/32 task (100%)

| Prioritas | Fitur              | Progress   | %   | x/y | Status      |
| --------- | ------------------ | ---------- | --- | --- | ----------- |
| P0        | Fondasi            | ░░░░░░░░░░ | 0%  | 0/6 | Belum mulai |
| P0        | Hero & Nav         | ░░░░░░░░░░ | 0%  | 0/4 | Belum mulai |
| P0        | Selected Work      | ░░░░░░░░░░ | 0%  | 0/4 | Belum mulai |
| P1        | About & Experience | ░░░░░░░░░░ | 0%  | 0/3 | Belum mulai |
| P1        | Contact & Footer   | ░░░░░░░░░░ | 0%  | 0/3 | Belum mulai |
| P1        | SEO & Metadata     | ░░░░░░░░░░ | 0%  | 0/4 | Belum mulai |
| P2        | Deploy             | ░░░░░░░░░░ | 0%  | 0/2 | Belum mulai |

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
