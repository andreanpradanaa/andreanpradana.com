# Mascot hero (21st.dev)

Sumber: komponen `mascot-portfolio-hero` dari 21st.dev, ditempel user 2026-10-22 · Status: selesai 2026-10-22

## Screen & navigasi

Hanya beranda `/`: hero lama (`sections/Hero`) diganti `MascotPortfolioHero`; `FeaturedWork` tetap di bawahnya. Rute lain tidak berubah.

## Komponen

| Komponen                       | Status                | Catatan                                                                                                                                                    |
| ------------------------------ | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ui/mascot-portfolio-hero.tsx` | baru (vendor, client) | disalin + prop `displayFont`/`sansFont`; `#fff` pada pill/gelembung/bunga → `--mph-paper`; `role="list"` pada services; 2 pengecualian lint React Compiler |
| `sections/MascotHero.tsx`      | baru (server)         | mengisi props dengan konten dari `content/site.ts` (`hero`) dan token warna                                                                                |
| `sections/Hero.tsx`            | hapus                 | tidak dipakai lagi                                                                                                                                         |
| `app/layout.tsx`               | ubah                  | muat font Archivo Black (`--font-archivo-black`)                                                                                                           |
| `app/globals.css`              | ubah                  | token `--accent-soft` (hijau muda) untuk latar pill, terang/gelap                                                                                          |

## Konten (di `content/site.ts` → `hero`)

index `26/10`, discipline `Backend engineering`, tagline `Make it reliable`, collection `Selected / Works`, reel `Go · Payments @ 2026` / `Backend engineer`, year `2026`, initials `AP`, badge `Hire me`, line2 `Backend`, line3 `Engineer`, word `Go`, verticalTag `Payments`, bracketed `!`, seekingLabel `Open to*`, seeking `Backend roles` → `/contact`, services = payment systems / PSP integrations / distributed systems / observability, greetings 4 kalimat.

## Palet

`paper` = `var(--paper)`, `ink` = `var(--ink)`, `accent` = `var(--accent-soft)` (#9fd3ac terang 10.4:1, #2f5d3a gelap 6.2:1 terhadap tinta). Tinggi hero `calc(100svh - var(--nav-h))` dengan `--nav-h: 69px` di `globals.css`, dipakai juga sebagai `min-h` header sticky (`Nav.tsx`) agar nilainya terikat; min 440px. Catatan: saat dev, CSS global yang berubah kadang butuh restart `pnpm dev`.

## State

Klik maskot → gelembung sapaan berganti (`aria-live`). Pointer menggerakkan kepala; `prefers-reduced-motion` mematikan animasi. Komponen vendor dikecualikan dari ambang coverage (animasi RAF tidak bermakna diuji di jsdom); perilaku diuji lewat halaman.

## Pertanyaan terbuka

- Komponen hanya menerima warna statis, jadi warna kulit/beanie tidak mengikuti mode gelap (hanya kertas, tinta, aksen).

## Hasil review & verifikasi

- react-reviewer: lint (`react-hooks/refs`, `react-hooks/purity`) → pengecualian terarah dengan alasan; putih hardcoded di mode gelap → `--mph-paper`; kontras hijau gelap 3.4:1 → `#2f5d3a` (6.2:1); `role="list"`; tinggi nav → token `--nav-h`. Dibiarkan (pola vendor): gelembung `aria-live` di dalam tombol berlabel, loop rAF tetap jalan saat offscreen (hanya melewati kerja).
- Diverifikasi di 1280 dan 375, terang/gelap: poster pas satu layar di bawah nav sticky, Archivo Black termuat, satu `h1`, tanpa scroll horizontal, klik maskot memunculkan gelembung.
- 29 test, coverage 100% (komponen vendor dikecualikan dari ambang), build export, typecheck, lint, format bersih. Bundle JS klien naik karena komponen interaktif.
