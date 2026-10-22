---
description: Verifikasi visual screen yang berubah terhadap spec/Figma: dev server, screenshot tiap state, responsif, aksesibilitas dasar, laporkan selisih.
argument-hint: <rute atau nama screen> [state: default|loading|empty|error]
---

# /ui-check $ARGUMENTS

Verifikasi tampilan "$ARGUMENTS". Jangan ubah kode di command ini; hanya laporkan selisih (perbaikan lewat `/feature`).

## Tahap
1. Pastikan dev server jalan (preview `.claude/launch.json` → `web`, atau `pnpm dev`). Buka rute yang dimaksud.
2. Acuan: `docs/features/<fitur>/spec.md`, `docs/features/overview.md`, dan `docs/figma/` bila ada. Bila tidak ada acuan, pakai prinsip di `.claude/rules/web/design-quality.md`.
3. Screenshot tiap state yang relevan (default, loading, empty, error) pada lebar **375**, **768**, **1280**. Cek juga `prefers-color-scheme: dark` bila situs mendukung.
4. Aksesibilitas dasar: heading berurutan, semua gambar punya `alt`, link/button punya nama yang jelas, fokus keyboard terlihat, kontras teks ≥ 4.5:1, target sentuh ≥ 44px, tidak ada scroll horizontal di 375.
5. Performa cepat: tidak ada layout shift saat font/gambar dimuat, gambar pakai `next/image` dengan ukuran.
6. Laporkan tabel: `Area | Diharapkan | Aktual | Prioritas (P0/P1/P2)`. Sertakan path screenshot. Akhiri dengan satu kalimat: lolos / perlu perbaikan.
