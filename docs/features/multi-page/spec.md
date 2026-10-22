# Multi-page + sticky header

Sumber: permintaan user 2026-10-22 ("jangan terlalu banyak konten dalam satu halaman; header sticky") · Status: selesai 2026-10-22

## Screen & navigasi

| Rute       | Isi                                                                  | h1              |
| ---------- | -------------------------------------------------------------------- | --------------- |
| `/`        | Hero + "Selected work" (3 proyek unggulan, tautan "All work")        | headline hero   |
| `/work`    | PageHeader + semua proyek (`ProjectList`)                            | "Selected work" |
| `/about`   | PageHeader + bio, Track record, Focus, Education + daftar pengalaman | "About"         |
| `/contact` | PageHeader + kalimat ajakan + email/sosial                           | "Contact"       |

Nav (di `layout.tsx`, sticky): wordmark → `/`, tautan Work / About / Contact → rute, tautan aktif diberi warna tinta + `aria-current="page"`. Footer di layout.

## Komponen

| Komponen                             | Status        | Catatan                                                                                             |
| ------------------------------------ | ------------- | --------------------------------------------------------------------------------------------------- |
| `ui/PageHeader`                      | baru          | label mono bernomor + `h1` display + intro opsional                                                 |
| `sections/Nav`                       | ubah          | `sticky top-0`, latar `bg-paper/90 backdrop-blur`, hairline bawah; tautan lewat `NavLinks` (client) |
| `sections/NavLinks`                  | baru (client) | `usePathname` untuk state aktif                                                                     |
| `sections/Work` → `ProjectList`      | ubah          | hanya daftar; prop `limit` untuk beranda                                                            |
| `sections/FeaturedWork`              | baru          | SectionLabel h2 + `ProjectList limit=3` + tautan `/work`                                            |
| `sections/About`, `sections/Contact` | ubah          | tanpa SectionLabel (h1 dari PageHeader)                                                             |
| `app/{work,about,contact}/page.tsx`  | baru          | `metadata` per halaman                                                                              |
| `app/sitemap.ts`                     | ubah          | 4 rute                                                                                              |

## State

Aktif/non-aktif tautan nav (dari pathname). Tidak ada state lain.

## Responsif & aksesibilitas

Header sticky tinggi ±64px; `scroll-mt` tidak lagi dibutuhkan. Satu `h1` per halaman. `aria-current="page"` pada tautan aktif.

## Pertanyaan terbuka

- Proyek unggulan di beranda = 3 teratas di `projects.ts` (urutan array).

## Hasil review & verifikasi

- react-reviewer: tidak ada CRITICAL/HIGH. MEDIUM diterapkan: `NavLinks` menerima `items` lewat prop (konten situs tidak masuk bundle klien), label aside `h2`, metadata OG/canonical per halaman lewat `lib/metadata.pageMetadata`, skip link "Skip to content" → `main#main`, nav memakai `next/link`.
- Diverifikasi di 1280 dan 375 (terang/gelap): header tetap di atas saat scroll, tautan aktif tersorot + `aria-current`, satu `h1` per rute, satu `main`, tanpa scroll horizontal. Export menghasilkan `work.html`, `about.html`, `contact.html` (cocok dengan `try_files $uri.html` di Nginx).
- 29 test, coverage 100%, build/typecheck/lint/format bersih.
