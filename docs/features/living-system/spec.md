# Living system (konsep U)

Sumber: mockup konsep U 2026-10-23, dipilih user dengan syarat memakai palet situs saat ini · Status: selesai 2026-10-23

## Arah

Identitas backend engineer: hero berdampingan dengan diagram layanan yang "hidup" (edge → API → Postgres / Redis / queue / OTel) dengan titik request mengalir (animasi CSS, mati saat reduced-motion). Ubin metrik ala dashboard. Tipografi Geist (headline medium, tracking rapat) + Geist Mono untuk label; Newsreader dihapus. Palet tetap token saat ini (kertas/tinta/aksen terang dan gelap hangat).

## Rute

| Rute        | Isi                                                                                   | h1            |
| ----------- | ------------------------------------------------------------------------------------- | ------------- |
| `/`         | Hero + `SystemDiagram` · `MetricTile` ×4 · Selected projects (3) + tautan `/projects` | headline hero |
| `/projects` | PageHeader + semua proyek (`ProjectList`)                                             | "Projects"    |
| `/work`     | halaman kecil pengalihan ke `/projects` (meta refresh + tautan)                       | —             |
| `/about`    | PageHeader + bio + `MetricTile` ×4 + Focus/Education + timeline                       | "About"       |
| `/contact`  | PageHeader + email besar + tombol + meta (jam Jakarta, status, balasan)               | "Contact"     |

## Komponen

| Komponen                                                                                                                                                           | Status                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| `ui/SystemDiagram` (server, SVG, `aria-hidden`, prop `compact`)                                                                                                    | baru                                                                      |
| `ui/MetricTile`                                                                                                                                                    | baru (mengganti `Stat`)                                                   |
| `sections/Hero`, `sections/About`, `sections/Contact`, `ui/PageHeader`, `ui/ProjectRow`, `ui/ExperienceItem`, `ui/SectionLabel`, `sections/Nav`, `sections/Footer` | ubah ke gaya U                                                            |
| `ui/Pill`, `ui/Swash`, `ui/RotatingBadge`, `ui/Stat`                                                                                                               | hapus                                                                     |
| `globals.css`                                                                                                                                                      | font display → Geist, keyframes `flow`, `rise` tetap                      |
| `content/site.ts`                                                                                                                                                  | `hero` baru (headline 2 baris, intro, CTA), `metrics` (4), nav `Projects` |

## Token tambahan

- `--color-surface`: terang `#fdfcfa`, gelap `#1c1914` (latar ubin/node diagram).
- Aliran diagram memakai `--accent`; jalur memakai `--line`.

## Pertanyaan terbuka

- Metrik keempat (query cost −98%) dari CV; bisa diganti.

## Hasil review & verifikasi

- react-reviewer: HIGH pengalihan `/work` (Next menulis `name="refresh"`) → `<meta httpEquiv="refresh">` di body (diangkat React 19 ke head, terverifikasi di `out/work.html`) + `location = /work { return 301 /projects; }` di `deploy/nginx.conf` (perlu disalin ulang ke VPS lewat `setup-vps.sh`); prop `number` yang tak terpakai dihapus dari `PageHeader`; garis aliran disembunyikan saat reduced-motion.
- Diverifikasi di 1280 (terang/gelap) dan 375 (gelap): satu `h1` per rute, tanpa scroll horizontal, diagram dan ubin metrik tampil di dua mode.
- 33 test, coverage 98,7%, build export (rute `/projects` dan `/work`), typecheck, lint, format bersih.
