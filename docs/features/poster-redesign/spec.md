# Poster redesign (desain sendiri, maskot 21st.dev hanya referensi)

Sumber: permintaan user 2026-10-22 ("terlalu berlebihan; jadikan referensi; buat desain sendiri; page lain lebih hidup") · Status: selesai 2026-10-22

## Referensi 21st.dev (dilihat 2026-10-22, hanya inspirasi, tidak ada kode yang disalin)

- Mascot Portfolio Hero (kedhareswer): skala headline poster, pill bernomor, stempel, swash, baris services.
- Portfolio Hero (waleedkibhen) & Path Drawing Portfolio Hero (DesignLayer): nama sebagai elemen tipografi terbesar, garis yang "digambar".
- Portfolio Hero (Vasnev): badge kata kunci yang berserakan miring → versi statis: kluster pill stack dengan rotasi kecil dan hover terangkat.
- "Crafting Digital Experiences" + hasil pencarian "stats": angka besar dengan keterangan pendek.
- Hasil pencarian "experience timeline": hairline vertikal + titik, nama organisasi sebagai wordmark besar.

## Arah

Tetap editorial: Newsreader (display, italic untuk aksen) + Geist + Geist Mono, kertas hangat, hairline. Yang diambil dari referensi: skala headline poster, label mono bernomor dalam pill, stempel bundar berputar, garis swash yang "digambar", baris services di tepi bawah, hover yang terasa dirancang. Yang dibuang: maskot, Archivo Black, grid ruangan, warna hijau terang.

## Beranda `/`

- Baris atas: pill `26/10 · Backend engineering` · titik aksen + `Open to backend roles`.
- Headline Newsreader besar (clamp 3–6.5rem): "Backend engineer. I make _money move_ safely." (`*…*` italic + swash SVG yang digambar saat muncul).
- Intro pendek + CTA pill dua bagian: `Open to*` | `Backend roles →` (ke `/contact`).
- Kanan (≥ md): kluster badge kata kunci (Go, gRPC, PostgreSQL, Redis, RabbitMQ, Kubernetes, OpenTelemetry, Payments) sebagai pill outline dengan rotasi kecil bergantian; hover → terangkat dan terisi tinta. Di bawahnya stempel bundar berputar pelan ("Open to backend roles · Jakarta ·") dengan `AP` italic di tengah; berhenti saat reduced-motion.
- Tepi bawah: baris services dengan underline aksen saat hover.
- Semua blok muncul bertahap (`rise` 500ms, delay 60ms/blok).

## Work `/work`

- Baris proyek: hover → latar `paper-2`, nomor jadi aksen, judul bergeser 4px, panah tautan bergerak. Muncul bertahap.
- Header halaman memakai label pill yang sama.

## About `/about`

- Tiga angka besar Newsreader (42%, 85%, 0→80%) dengan keterangan, menggantikan daftar "Track record".
- Pengalaman sebagai timeline: hairline vertikal + titik aksen per entri, periode di kiri.

## Contact `/contact`

- Email sebagai tautan display besar dengan underline animasi.
- Tombol sosial pill outline → terisi tinta saat hover.
- Jam lokal Jakarta hidup (`ui/LocalTime`, client, `Intl.DateTimeFormat`, update tiap menit) + status "Currently at Icon Plus".

## Komponen

| Komponen                                                                                            | Status                                           |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `sections/Hero`                                                                                     | baru (server)                                    |
| `ui/Pill`, `ui/RotatingBadge`, `ui/Swash`, `ui/Stat`                                                | baru (server)                                    |
| `ui/LocalTime`                                                                                      | baru (client)                                    |
| `ui/PageHeader`                                                                                     | ubah: label pill                                 |
| `ui/ProjectRow`, `ui/ExperienceItem`, `sections/About`, `sections/Contact`, `sections/FeaturedWork` | ubah                                             |
| `ui/mascot-portfolio-hero`, `sections/MascotHero`, font Archivo Black                               | hapus                                            |
| `globals.css`                                                                                       | keyframes `rise`, `draw`, `spin`; utility `rise` |

## Pertanyaan terbuka

- Teks stempel dan headline bisa diganti di `site.hero`.

## Hasil review & verifikasi

- react-reviewer: HIGH `prefers-reduced-motion` dengan durasi 0,01ms membuat stempel `infinite` berkedip → diganti `animation: none` + keadaan akhir eksplisit untuk `rise`/`draw`; `LocalTime` memakai `useSyncExternalStore` (lint `set-state-in-effect`); helper `riseDelay` dipusatkan di `lib/utils`; stempel diberi `aria-hidden`. Dibiarkan: `id` tetap pada `RotatingBadge` (dipakai sekali), hover pada badge kata kunci yang non-interaktif.
- Diverifikasi di 1280 dan 375 terang/gelap: semua rute, satu `h1`, tanpa scroll horizontal, animasi masuk selesai < 1 detik.
- 33 test, build export, typecheck, lint, format bersih. Komponen vendor 21st.dev dan font Archivo Black dihapus.
