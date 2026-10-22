# Design critique fixes

Sumber: kritik desain 2026-10-22 (`/design-critique` atas situs live) · Tanggal: 2026-10-22 · Status: selesai 2026-10-22

## Screen & navigasi

Hanya halaman `/`. Tidak ada rute baru.

## Perubahan

| #   | Temuan                                             | Komponen repo                                                                                     | Status |
| --- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------ |
| 1   | Target sentuh tautan < 44px; label mono 12px di HP | `ui/TextLink` (prop `tap`), `sections/Nav`, `sections/Hero`, `globals.css` (utility `text-label`) | ubah   |
| 2   | Enam tautan "Source" bernama sama                  | `ui/ProjectRow` (teks `sr-only` berisi judul proyek)                                              | ubah   |
| 3   | Kolom tahun di Work tidak informatif; "2021–2021"  | `content/projects.ts` (field `context`), `ui/ProjectRow`, `lib/utils.formatPeriod`                | ubah   |
| 4   | Bukti angka tersembunyi di bawah                   | `content/site.ts` (`highlights`), `sections/About` (blok "Track record" di kolom kanan)           | ubah   |
| 5   | Blok Education patah baris canggung                | `sections/About` (periode di baris sendiri)                                                       | ubah   |

## Design token

- `text-label`: 13px di < 640px, 12px di ≥ 640px; menggantikan `text-xs` pada label mono.
- Target sentuh: tautan berdiri sendiri (nav, meta hero, Source/Live, kontak) memakai `inline-block py-3.5 -my-3.5` agar area tap ≥ 44px tanpa menggeser layout.

## Responsif & aksesibilitas

Nama tautan unik per proyek ("Source of <judul>"). Tidak ada perubahan breakpoint.

## Pertanyaan terbuka

- Label konteks proyek dipilih: "Open source", "Used at work", "Study project". Bisa diganti di `projects.ts`.

## Hasil review & verifikasi

- react-reviewer: tidak ada CRITICAL; HIGH area tap bertumpuk di kolom meta hero dan daftar kontak → jarak baris `gap-7`; MEDIUM Source/Live saat wrap → dibungkus `flex gap-5`; label aside → `h3`.
- Terukur di browser: tidak ada tumpang tindih area tap di 375/768/1280; hanya tautan organisasi inline (ExperienceItem) < 44px, dikecualikan karena berada di dalam kalimat.
- 22 test, coverage 100%, build export, typecheck, lint, format bersih.
