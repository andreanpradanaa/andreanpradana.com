# Proof: studi kasus, pengalaman di beranda, kontak di footer

Sumber: kritik eksternal 2026-10-23 (6 poin) · Status: selesai 2026-10-23

## Temuan saat audit

Tiga repo yang ditautkan (distributed-reservation-system, commercehub-api, go-auth-system) **kosong** di GitHub (0 commit). Dikeluarkan dari situs sampai ada kode. Proyek yang nyata: go-service-generator (svcgen, 14 commit), trendstore (32), sysdesign-lab (11), system-design-practice (1). resumeio-to-pdf adalah fork, capstone-project proyek tim 2022, fresh-mart-frontend template; tidak dipakai.

## Perubahan per poin kritik

1. **Studi kasus** — `src/content/projects.ts` dapat `caseStudy` (problem, built, architecture[], decisions[{title, body}], evidence[], status). Rute `/projects/[slug]` (generateStaticParams) dengan `ArchitectureList` (komponen + peran; teks, aksesibel) dan daftar keputusan/trade-off. Tanpa angka load test: tidak ada data terukur; bagian "Evidence" hanya berisi fakta yang bisa dicek (struktur repo, test, CI, pemakaian).
2. **Pengalaman di beranda** — `ExperienceStrip` (3 baris: organisasi · peran · periode) + tautan "Full story". Tombol "Download CV" dibatalkan user (CV memuat nomor telepon); bisa ditambah lagi dengan versi CV tanpa telepon.
3. **Urutan proyek** — svcgen pertama dengan dampak faktual ("dipakai di Icon Plus untuk memulai service integrator"), lalu trendstore, sysdesign-lab, system-design-practice. Beranda menampilkan 3.
4. **Kontak di footer** — email, GitHub, LinkedIn di footer semua halaman.
5. **Diagram** — tetap `aria-hidden`, ditambah kalimat `sr-only`; label "p99 42ms" diganti "stateless · n replicas"; caption "request path · illustrative".
6. **Tulisan** — belum; studi kasus memuat bagian keputusan/trade-off. Dicatat sebagai pertanyaan terbuka.

## Komponen

| Komponen                                                                                                                      | Status             |
| ----------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `ui/ArchitectureList`, `sections/ExperienceStrip`, `app/projects/[slug]/page.tsx`                                             | baru               |
| `ui/ProjectRow` (judul → tautan studi kasus), `sections/Footer`, `ui/SystemDiagram`, `content/projects.ts`, `content/site.ts` | ubah               |
| `app/sitemap.ts`                                                                                                              | + rute studi kasus |

## Pertanyaan terbuka

- Angka hasil (RPS, p99) belum ada; perlu load test nyata sebelum ditampilkan.
- Tulisan teknis: belum dibuat.

## Hasil review & verifikasi

- react-reviewer: tidak ada CRITICAL/HIGH; tautan About di strip → `next/link`. Struktur heading studi kasus benar (h1, h2 per bagian, h3 per keputusan), rute statis lewat `generateStaticParams`, `notFound` untuk slug tak dikenal.
- Coverage: direktori `src/app/projects/[slug]` dikecualikan dari instrumentasi v8 (kurung siku ditafsirkan sebagai glob) dan diuji lewat `pages.test.tsx` (render, metadata, notFound, generateStaticParams).
- Diverifikasi di 1280 (terang/gelap) dan 375: studi kasus, strip pengalaman + CV, footer kontak, tanpa scroll horizontal.
- 34 test, coverage 97,6%, build export 4 halaman studi kasus, typecheck, lint, format bersih.
