# Proof v2: klaim hero didukung bukti di beranda

Sumber: review 2026-10-23 (klaim hero vs isi beranda) · Status: selesai (2026-10-23)

## Temuan

- Hero menjanjikan API, queue, cache, observability; tiga proyek unggulan (svcgen, Trendstore, SysDesign Lab) tidak menunjukkannya.
- Bukti kuat ada di `experience.ts` tetapi `ExperienceStrip` hanya menampilkan org · peran · periode.
- CTA studi kasus hanya lewat judul; "Source ↗" lebih menonjol.
- Architecture di studi kasus hanya teks.
- Blok "Data dari saya" kosong → `impact` tidak dirender di mana pun.

## Keputusan

1. **Highlight** (`Experience.highlight?`, ≤ 60 karakter, angka kata demi kata dari `summary`):
   - Lion Parcel: "Incidents down 42% in two quarters; APIs up to 85% faster"
   - BRI: "Test coverage from zero to above 80%; RabbitMQ async flows"
   - Icon Plus: "OpenTelemetry tracing across services; payment gateways"
   - Inti Konten: tanpa highlight (tidak tampil di strip karena hanya 3 teratas).
     Label section tetap "Experience" dengan subjudul kecil "Where the claims above come from": nama "Experience" sudah dikenal recruiter, subjudul yang menjelaskan fungsinya sebagai bukti.
2. **Hero intro** ditulis ulang agar tiap kemampuan punya bukti di strip: API & queue (BRI), cache & reliability (Lion Parcel), tracing & gateway (Icon Plus). `SystemDiagram` memberi anotasi per node dari `experience.ts`; di < 640px anotasi disembunyikan (`hidden sm:inline` pada `<text>`) dan isinya ada di `diagramDescription` (sr-only).
3. **Featured**: `Project.featured?: number`; `featuredProjects()` mengurutkan yang punya `featured`; `/projects` memakai urutan array. Beranda: svcgen (1) → System Design Practice (2) → Trendstore (3). SysDesign Lab tetap di `/projects`.
4. **CTA**: judul adalah satu-satunya tautan ke studi kasus, nama aksesibel `Case study: <judul>` (memuat teks terlihat, memenuhi label-in-name). Area kliknya diperluas ke seluruh baris lewat pseudo-elemen (`after:absolute after:inset-0`, `li` relatif) sehingga "Case study →" cukup berupa `<span>` tanpa tautan tersembunyi; "Source ↗" / "Live" sekunder (`text-muted`, `relative z-10` agar tetap bisa diklik di atas area tautan). Hasil review: pola `aria-hidden` + `tabIndex=-1` pada anchor ditolak karena tetap tautan tersembunyi bagi voice control.
5. **FlowDiagram** (`CaseStudy.flow?`): id marker/figcaption dari `useId()` agar aman bila dua diagram di satu halaman; `<figure aria-labelledby>` ke `<figcaption>` (nama tidak dibaca ganda); level topologis (longest path) → kolom; horizontal (≥ 768px) dan vertikal (< 768px) sebagai dua SVG `aria-hidden`; `<figure>` + `<figcaption>` + daftar sr-only "A → B (label)". Warna hanya token. Diisi untuk svcgen dan System Design Practice; proyek tanpa `flow` tidak menampilkan diagram.
6. **Impact** (`CaseStudy.impact?`): dirender di atas Evidence hanya bila terisi; saat ini kosong untuk semua proyek.

## Komponen

| Komponen                                                                                                                                                                                                                                                                                                                            | Status |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `ui/FlowDiagram`, `ui/ImpactRow`                                                                                                                                                                                                                                                                                                    | baru   |
| `sections/ExperienceStrip` (prop `items`, highlight, subjudul), `sections/Hero` (intro), `ui/SystemDiagram` (anotasi), `sections/FeaturedWork` (`featuredProjects`), `sections/ProjectList` (prop `items`), `ui/ProjectRow` (CTA), `app/projects/[slug]/page.tsx` (FlowDiagram, ImpactRow), `content/{experience,projects,site}.ts` | ubah   |

## Hasil

- Test 46 lulus, coverage 98% stmt / 94% branch (ambang 80%). `pnpm build` (static export, 4 halaman studi kasus), `typecheck`, `lint`, `format:check` bersih.
- Review `react-reviewer`: 1 HIGH (urutan `dt`/`dd` di `ImpactRow`) dan 4 MEDIUM diterapkan (tautan tersembunyi → stretched link, nama figure ganda, id marker, anotasi otel tumpang tindih → dipindah ke atas node, rata kanan). Test data flow (id node unik, edge merujuk node yang ada) ditambahkan.
- `/ui-check` 375 / 768 / 1280 terang + gelap: tanpa scroll horizontal; anotasi diagram tersembunyi < 640px; strip highlight menumpuk di mobile; FlowDiagram horizontal di 768 dan 1280, vertikal di 375 (teks kecil di 375 karena 3 kolom; diterima sebagai ilustrasi, daftar sr-only tetap lengkap).
- Catatan pra-eksisting (di luar scope): di 768px nama `internal/generator/templates` pada `ArchitectureList` meluber ke kolom deskripsi.

## Pertanyaan terbuka

- Angka dampak svcgen (jumlah service, waktu setup) belum ada; `impact` menunggu data.
