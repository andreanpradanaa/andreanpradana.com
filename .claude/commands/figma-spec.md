---
description: Tarik desain dari Figma menjadi docs/features/<fitur>/spec.md dengan hemat kuota MCP (cek docs/figma dulu, MCP hanya untuk yang belum ada).
argument-hint: <link-figma-dengan-node-id> <nama-fitur>
---

# /figma-spec $ARGUMENTS

Input: `$ARGUMENTS` = link Figma (dengan `node-id`) dan nama fitur. fileKey default: **TODO** (belum ada file Figma; isi setelah user memberi link duplikat yang bisa dibaca MCP).

## Aturan hemat kuota MCP (±20 panggilan/bulan)
1. Cek `docs/figma/*.md` dulu. Bila node yang diminta sudah diekstrak, pakai itu dan JANGAN panggil MCP.
2. Bila belum ada: `get_metadata` sekali untuk file (bila belum pernah), lalu `get_design_context` hanya untuk node yang diminta. `get_variable_defs` sekali per file untuk token.
3. Simpan ekstrak mentah ke `docs/figma/<nama-app>-screens.md` (satu section per screen: node-id, struktur, teks, token yang dipakai) sebelum menulis spec.
4. Laporkan jumlah panggilan MCP yang dipakai.

## Tahap
1. Parse link → fileKey, nodeId, nama fitur.
2. Ambil desain (aturan di atas).
3. Tulis `docs/features/<nama-fitur>/spec.md` dengan template di bawah. Petakan komponen desain ke komponen yang sudah ada di `src/components/` (lewat `graphify query`); tandai yang baru.
4. Tambahkan baris fitur ke `docs/PROGRESS.md` bila belum ada, status "Belum mulai".
5. Ringkas pertanyaan terbuka ke user.

## Template spec (FE)
```md
# <Nama fitur>
Sumber: <link Figma> · Tanggal: <YYYY-MM-DD> · Status: draft

## Screen & navigasi
Daftar screen, rute (`src/app/...`), dari mana masuk, ke mana keluar.

## Komponen
| Komponen desain | Komponen repo | Status (ada/ubah/baru) | Catatan |

## State per screen
Default / loading / empty / error / sukses — apa yang tampil.

## Form & validasi klien
Field, tipe, aturan, pesan error (bila ada form).

## Endpoint yang dikonsumsi
Dari `docs/api/`; bila belum ada tandai "butuh konfirmasi".

## Responsif & aksesibilitas
Breakpoint, perilaku layout, target sentuh, kontras, urutan fokus, label.

## Design token
Warna, tipografi, spacing yang dipakai (nama token di `globals.css`).

## Pertanyaan terbuka
- ...
```
