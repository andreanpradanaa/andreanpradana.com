---
description: Kerjakan fitur / perubahan / bug fix dengan alur wajib plan → TDD → build/lint → review → verifikasi visual → selesai. Tidak boleh melompati tahap.
argument-hint: <nama-fitur atau deskripsi singkat>
---

# /feature $ARGUMENTS

Kerjakan "$ARGUMENTS" dengan tahap bernomor di bawah, berurutan. Tulis satu baris ringkasan setelah tiap tahap. Jangan commit atau push.

## Tahap 1 — Plan
1. Baca `docs/features/overview.md` dan `docs/features/$ARGUMENTS/spec.md` bila ada. Bila spec belum ada dan perubahan tidak kecil, tulis spec ringkas dulu (screen, komponen, state, data dari `src/content/`, pertanyaan terbuka) lalu lanjut.
2. Jalankan `graphify query "$ARGUMENTS"` untuk menemukan komponen/section terkait. Baca hanya file yang muncul.
3. Tulis rencana: file yang disentuh, komponen baru vs yang dipakai ulang, test yang akan ditulis. Bila ada keputusan desain yang tidak bisa diambil sendiri, tanya sekarang, sekali.

## Tahap 2 — TDD
1. Ikuti `/react-test`: tulis test Testing Library yang gagal dulu (perilaku, aksesibilitas: role/name, bukan class).
2. Implementasi minimum sampai hijau, lalu refactor.
3. `pnpm test:coverage` — coverage ≥ 80% untuk file yang disentuh.

## Tahap 3 — Build, type-check, lint
1. `pnpm build` lalu `pnpm typecheck`; bila gagal, pakai `/react-build`.
2. `pnpm lint` dan `pnpm format:check` harus bersih (hook sudah memformat otomatis; jalankan `pnpm format` bila masih ada sisa).

## Tahap 4 — Review
1. `/react-review` untuk semua `.tsx` yang berubah.
2. Panggil agent `security-reviewer` bila perubahan menyentuh form, input user, data pribadi (email/telepon), storage browser, atau dependensi baru.
3. Terapkan temuan penting, ulangi Tahap 2–3 bila kode berubah.

## Tahap 5 — Verifikasi visual
1. Jalankan dev server (`pnpm dev` atau preview `.claude/launch.json`), buka screen yang berubah.
2. Bandingkan dengan spec / Figma (`docs/figma/`) bila ada. Cek state loading / empty / error bila relevan.
3. Cek responsif: lebar 375, 768, 1280. Cek mode gelap bila didukung. Rangkum selisih lewat `/ui-check`.

## Tahap 6 — Selesai
1. `pnpm test` terakhir, pastikan hijau.
2. Sinkronkan dokumen pendamping: spec fitur, `docs/features/overview.md` (komponen/token baru), `docs/api/` bila ada endpoint baru.
3. `graphify update .`
4. Update `docs/PROGRESS.md` (centang task, perbarui persen) dan tanggal.
5. Ringkas ke user: apa yang berubah, hasil test/lint, hal yang belum diverifikasi.
6. Usulkan pesan commit (Conventional Commits). Jangan commit.
