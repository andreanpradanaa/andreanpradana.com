# Overview — andreanpradana.com

Tanggal: 2026-10-22 · Figma: **belum ada** (TODO; desain ditulis langsung di kode) · Domain: andreanpradana.com (Vercel)

## Tujuan

Situs personal branding Andrean Pradana, Backend Engineer (Go, sistem pembayaran & integrasi). Minimalis, terasa premium, editorial; bukan template. Audiens: recruiter, engineering manager, rekan engineer.

## Keputusan desain (anti "terlihat buatan AI")

- **Tipografi sebagai elemen utama**: display serif (Newsreader, italic untuk aksen) + sans (Geist) + mono (Geist Mono) untuk label kecil/metadata.
- **Palet sempit**: kertas hangat (`--paper`), tinta (`--ink`), abu-abu teks sekunder (`--muted`), satu aksen (`--accent`, hijau tua) dipakai hemat. Mode gelap hangat (bukan hitam pekat).
- **Tidak dipakai**: gradient ungu/biru, glassmorphism, partikel, emoji di headline, skill bar persen, kartu 3 kolom dengan ikon, teks gradient, bayangan besar, badge "Available for work" berkedip.
- **Layout**: kiri-rata, grid asimetris, hairline `1px` sebagai pemisah, label bernomor (`01 — Work`), whitespace besar, lebar konten maksimum ±72rem dengan kolom teks ±40rem.
- **Gerak**: animasi masuk `rise` (0,6s, bertahap per blok), swash `draw`, stempel `spin-slow`, transisi hover ≤ 300ms; tidak ada animasi scroll; `prefers-reduced-motion` mematikan semuanya.
- **Bahasa copy situs**: Inggris (jangkauan recruiter lebih luas); dokumen repo Indonesia. Bisa diganti dari `src/content/` tanpa menyentuh komponen.

## Peta halaman & navigasi

| Rute                          | Isi                                                                | Catatan                                          |
| ----------------------------- | ------------------------------------------------------------------ | ------------------------------------------------ |
| `/`                           | Nav · Hero · Selected Work · About & Experience · Contact · Footer | satu halaman, anchor `#work` `#about` `#contact` |
| `/sitemap.xml`, `/robots.txt` | metadata                                                           | dari `src/app/sitemap.ts`, `robots.ts`           |
| `/opengraph-image`            | OG image tipografis                                                | `src/app/opengraph-image.tsx`                    |
| `/not-found`                  | 404 minimal                                                        | `src/app/not-found.tsx`                          |

## Section → komponen → data

| Section            | Komponen                               | Data                                                |
| ------------------ | -------------------------------------- | --------------------------------------------------- |
| Nav                | `components/sections/Nav`              | `content/site.ts` (nav, nama)                       |
| Hero               | `sections/Hero`                        | `content/site.ts` (headline, intro, lokasi, status) |
| Selected Work      | `sections/Work` + `ui/ProjectRow`      | `content/projects.ts`                               |
| About & Experience | `sections/About` + `ui/ExperienceItem` | `content/site.ts`, `content/experience.ts`          |
| Contact            | `sections/Contact`                     | `content/site.ts` (email, sosial)                   |
| Footer             | `sections/Footer`                      | `content/site.ts`                                   |

## Inventaris komponen UI

- `ui/Container` — lebar maks + padding horizontal responsif.
- `ui/SectionLabel` — label mono bernomor + hairline (`01 — Work`).
- `ui/TextLink` — tautan dengan underline tipis yang menebal saat hover; varian eksternal menampilkan `↗`; prop `tap` memperbesar area sentuh ke ≥ 44px (`inline-block py-3.5 -my-3.5`) untuk tautan berdiri sendiri, jangan dipakai di dalam paragraf.
- `ui/ProjectRow` — baris proyek: nomor + konteks (`context`: Open source / Used at work / Study project), judul, tahun, deskripsi, stack, tautan Source/Live dengan `aria-label` unik per proyek.
- `ui/ExperienceItem` — peran, organisasi, periode, ringkasan.

## Design token (di `src/app/globals.css`, `@theme`)

| Token            | Terang                                      | Gelap     |
| ---------------- | ------------------------------------------- | --------- |
| `--color-paper`  | `#f6f3ec`                                   | `#15130f` |
| `--color-ink`    | `#1a1816`                                   | `#ece7dc` |
| `--color-muted`  | `#6b655c`                                   | `#9c948a` |
| `--color-line`   | `#d9d3c7`                                   | `#2d2923` |
| `--color-accent` | `#2f5d3a`                                   | `#8fbf9a` |
| Font display     | Newsreader (400/500, italic)                |           |
| Font sans        | Geist                                       |           |
| Font mono        | Geist Mono                                  |           |
| Skala tipe       | 14 / 16 / 18 / 24 / 32 / 48 / 64–80 (clamp) |           |
| Spacing section  | `py-24` mobile → `py-32` desktop            |           |

## State

Situs statis: tidak ada loading/error runtime. State yang ada: hover/focus tautan, tautan nav aktif per rute, `prefers-color-scheme`, nav mobile (tanpa menu hamburger; nav cukup pendek untuk ditampilkan inline).

## Responsif & aksesibilitas

Breakpoint 375 / 768 / 1280. Semua tautan punya nama jelas, heading berurutan (h1 sekali), kontras ≥ 4.5:1, fokus terlihat (outline aksen), `lang="en"`, target sentuh ≥ 44px, `prefers-reduced-motion` dihormati.

## Pertanyaan terbuka

1. Nama perusahaan & periode pengalaman sebelum ICON+ (lihat TODO di `src/content/experience.ts`).
2. URL LinkedIn / X untuk bagian Contact.
3. Email kontak publik yang diinginkan.
4. Perlu halaman tulisan (blog/notes)? Saat ini `sysdesign-lab` ditautkan sebagai proyek.
5. Analytics: pakai Vercel Analytics atau tidak sama sekali.
