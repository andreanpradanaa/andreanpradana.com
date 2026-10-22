# Setup Claude Code untuk Proyek Baru — Satu Prompt (FE / BE / Mobile)

Panduan ini menyiapkan cara kerja Claude Code di proyek apa pun: backend (Go, Node, Python, dst), frontend web (React, Next, Vue, dst), atau mobile (Flutter, React Native, Swift, Kotlin).

Cara pakai: selesaikan **Persiapan** sekali per mesin, lalu tempel **Prompt Utama** ke Claude Code di repo baru. Claude mengerjakan semua tahap berurutan, menyesuaikan dengan stack yang terdeteksi, dan hanya berhenti bertanya saat butuh sesuatu dari Anda (link Figma, dump DB, kontrak API). Di akhir Anda commit manual.

Sumber agent/skill/rules: [Everything Claude Code (ECC)](https://github.com/affaan-m/everything-claude-code) oleh affaan-m.

---

## Gambaran hasil akhir

```
<repo>/
├── CLAUDE.md                     # aturan proyek: arsitektur, lokasi spec, workflow, hemat token, kebijakan git
├── .claude/
│   ├── settings.json             # allowlist permission, deny commit/push, hooks
│   ├── hooks/                    # format.sh (auto format+check), block-git-commit.sh
│   ├── agents/                   # ECC: reviewer <bahasa>, build/compile resolver, security-reviewer
│   ├── commands/                 # ECC: <stack>-test, -build, -review · proyek: feature, figma-spec, (postman | ui-check)
│   ├── rules/common/ + rules/<bahasa>/   # ECC
│   └── skills/                   # ECC: tdd-workflow, testing & patterns <bahasa>, (api-design | ui), security-review
├── docs/
│   ├── README.md, PROGRESS.md, claude-setup.md
│   ├── features/overview.md + <fitur>/spec.md
│   ├── figma/                    # ekstrak mentah per screen (hemat kuota MCP)
│   ├── db/                       # BE: schema.sql + gap-analysis.md
│   ├── postman/                  # BE: collection + environment
│   └── api/                      # FE/mobile: kontrak API yang dikonsumsi
├── <config lint, format, test, dev server, CI>
└── .gitignore                    # graphify-out/, settings.local.json, CLAUDE.local.md, .env
```

Berlaku untuk repo yang sudah ada kode maupun repo kosong: pada repo kosong prompt membuat kerangka proyek (struktur folder, entrypoint minimal, test contoh) lebih dulu, lalu melanjutkan setup yang sama.

Prinsip untuk semua stack: spec adalah sumber kebenaran · workflow dipaksa lewat `/feature` · Claude tidak pernah commit (dijaga hook) · konteks kode lewat graphify · setup di-commit, override personal di-ignore.

---

## Persiapan — [MANUAL] sekali per mesin

```bash
git clone https://github.com/affaan-m/everything-claude-code ~/everything-claude-code
uv tool install graphify        # atau: pipx install graphify
```

Install toolchain stack-nya (Go + golangci-lint, Node + pnpm, Flutter SDK, Xcode, dst). Aktifkan plugin Claude Code `figma@claude-plugins-official` dan plugin LSP bahasa yang dipakai dari menu plugin.

Siapkan sebelum menjalankan prompt, supaya Claude tidak perlu menunggu:

- **Repo kosong:** tentukan stack (jenis, bahasa + framework, DB/state management). Prompt akan membuat kerangka proyeknya dulu di TAHAP 1b; kalau belum ditentukan, Claude bertanya sekali lalu lanjut.

- **Link Figma duplikat** — file view-only tidak bisa dibaca MCP; duplikat ke draft sendiri dulu.
- **BE:** dump skema ke `docs/db/schema.sql`:
  ```bash
  mkdir -p docs/db && pg_dump --schema-only --no-owner --no-privileges -d "$DB_URL" -f docs/db/schema.sql
  ```
- **FE/mobile:** path atau link Postman collection / OpenAPI dari tim BE, bila ada.

Cek:

```bash
graphify --version && ls ~/everything-claude-code
```

---

## Prompt Utama

Ganti nilai di `<...>` pada baris pertama, tempel seluruh blok ke Claude Code di repo baru.

```text
Setup Claude Code untuk repo ini. Input dari saya: Figma = <link-figma-duplikat atau "belum ada">; kontrak API (FE/mobile) = <path/link atau "belum ada">; CI = <gitlab|github|belum ada>; Stack (hanya bila repo kosong) = <jenis + bahasa/framework + DB/arsitektur, mis. "backend Go Fiber Postgres layered" atau "mobile Flutter Riverpod" atau "belum ada">.

Kerjakan tahap 1–11 berurutan, jangan lompat. Setelah tiap tahap tulis satu baris ringkasan, lalu lanjut tanpa menunggu saya. Berhenti bertanya hanya jika ada keputusan yang benar-benar tidak bisa diambil sendiri. Jangan pernah commit atau push. Semua file yang dibuat memakai bahasa Indonesia untuk teks penjelasan.

TAHAP 1 — Profil repo
Cek dulu apakah repo sudah berisi kode (ada manifest seperti go.mod / package.json / pubspec.yaml / pyproject dan folder source).

1a. Repo SUDAH ada kode: deteksi dari file yang ada: jenis (backend / frontend web / mobile / fullstack / library), bahasa + versi, framework, package manager, test runner, linter/formatter, build tool, cara menjalankan dev server, struktur folder utama.

1b. Repo KOSONG atau hanya README: buat kerangka proyek dulu.
- Pakai input Stack dari saya. Kalau "belum ada", tanya saya tiga hal sekaligus dalam satu pesan: jenis (BE/FE web/mobile), bahasa + framework, dan DB/state management; lalu tunggu jawaban (ini satu-satunya titik berhenti yang wajib).
- Cari skeleton/starter yang teruji untuk stack itu (official template, generator framework, atau pola dari skill/rules ECC yang diambil di tahap 2). Pilih yang paling sederhana dan umum dipakai, jelaskan pilihannya satu kalimat.
- Inisialisasi proyek dengan perintah resmi stack (go mod init / npm create / flutter create / dsb), lalu susun struktur folder berdasarkan jenis:
  - BE: entrypoint (cmd/ atau src/), layer router → controller/handler → usecase/service → repository, model (entity, dto, response code), config dari env, wiring/DI, pkg/util, migration folder bila pakai DB.
  - FE web: routing/pages, components (ui + feature), hooks/composables, services/api client, store/state, styles/theme (design token), lib/utils, test setup.
  - Mobile: app entry, navigation/router, features/<fitur>/{screen,widget,state}, core (theme/token, network client, storage, auth), shared widgets, test.
- Buat yang minimum tapi bisa jalan: satu endpoint health / satu halaman home / satu screen awal, satu test contoh yang lulus, config env dari .env.example, README singkat cara menjalankan. Jangan membuat fitur bisnis apa pun.
- Verifikasi: install dependensi, jalankan build dan test, pastikan hijau.

Dari 1a atau 1b, simpan profil repo (jenis, bahasa, framework, package manager, test runner, linter, build, dev server, struktur) sebagai acuan semua tahap berikutnya dan tampilkan ke saya.

TAHAP 2 — Vendor ECC ke .claude/
Dari ~/everything-claude-code pilih subset sesuai profil:
- agents: reviewer bahasa/framework ini, build/compile/type-check resolver, security-reviewer; FE tambah agent UI/accessibility bila ada.
- commands: test (TDD), build/type-check, review untuk bahasa ini.
- rules/common: semua. rules/<bahasa>: semua, pertahankan frontmatter `paths:`; fullstack ambil lebih dari satu bahasa.
- skills: tdd-workflow, testing & patterns bahasa ini, security-review; BE tambah api-design; FE/mobile tambah skill UI/komponen/aksesibilitas bila ada.
Salin ke .claude/{agents,commands,rules/common,rules/<bahasa>,skills}. Jangan ubah isi kecuali path yang jelas tidak cocok. Jangan salin hooks dan scripts ECC, kecuali skrip yang dirujuk skill yang diambil (mis. setup-package-manager.js untuk JS) → salin ke .claude/scripts/ dan sesuaikan path di skill. Laporkan yang sengaja tidak diambil.

TAHAP 3 — .gitignore
Pastikan .claude/ dan CLAUDE.md TIDAK di-ignore. Tambahkan: .claude/settings.local.json, .claude/worktrees/, CLAUDE.local.md, graphify-out/, .env, .env.* (kecuali .env.example), *.pem, *.key, output coverage dan artefak build stack ini. Pertahankan aturan lama, kelompokkan dengan komentar.

TAHAP 4 — CLAUDE.md (maks 60 baris, hanya yang tidak bisa diturunkan dari kode)
1. Nama repo, stack + versi, struktur utama (BE: layer; FE: routing, komponen, state, data fetching; mobile: navigasi, screen, state, service).
2. "Spec fitur": docs/features/<fitur>/spec.md (dari Figma via /figma-spec), docs/features/overview.md. BE: docs/db/schema.sql + docs/db/gap-analysis.md. FE/mobile: docs/api/ + sistem komponen di overview.
3. "Workflow pengerjaan fitur": setiap fitur baru / perubahan / bug fix — meskipun user tidak mengetik command — ikuti .claude/commands/feature.md: plan (spec + graphify) → TDD via command test stack ini, coverage ≥ 80% → build/type-check/lint/format bersih → review via command review + agent security-reviewer bila menyentuh auth, input user, data sensitif, storage → test akhir + graphify update . → (BE: /postman bila endpoint berubah; FE/mobile: /ui-check bila tampilan berubah) → update docs/PROGRESS.md. Perubahan kecil boleh lewati TDD dan review.
4. "Hemat token": graphify query dulu sebelum baca file; jangan cat file besar, pakai grep/sed; Figma dari docs/figma dan spec, MCP hanya lewat /figma-spec; pangkas output tool (tail/head/--stat); pekerjaan berlog panjang lewat subagent; format/check sudah otomatis lewat hook.
5. "Git": jangan commit atau push; user commit manual per fitur; cukup usulkan pesan commit.
6. "Perintah": test dengan coverage, build/type-check, lint, format, dev server. Verifikasi tiap perintah benar-benar jalan sebelum ditulis.

TAHAP 5 — Command proyek di .claude/commands (frontmatter description + argument-hint, pakai $ARGUMENTS, tahap bernomor, tidak boleh lompat)
- feature.md (semua stack): plan → TDD → build/lint → review → selesai (test akhir, sinkron dokumen pendamping, graphify update ., update docs/PROGRESS.md dan spec, ringkas ke user, jangan commit, usulkan pesan commit). FE/mobile tambah tahap verifikasi visual: jalankan dev server/simulator, buka screen yang berubah, bandingkan dengan Figma, cek state loading/empty/error dan responsif.
- figma-spec.md (semua stack): tarik desain Figma → docs/features/<fitur>/spec.md. Aturan hemat kuota MCP: cek docs/figma/*.md dulu, panggil MCP hanya untuk yang belum ada. fileKey diisi dari input Figma saya (atau TODO bila belum ada). Template spec: BE = endpoint, request/response, validasi, response code, entity/tabel, aturan bisnis, pertanyaan terbuka. FE/mobile = screen & navigasi, komponen dipakai/baru (petakan ke komponen yang ada di repo), state per screen, form & validasi klien, endpoint yang dikonsumsi (dari docs/api/), aturan responsif & aksesibilitas, pertanyaan terbuka.
- BE: postman.md — sinkron docs/postman/<repo>.postman_collection.json (v2.1) + environment dari kode: router, DTO, response code, route publik vs ber-auth; contoh respons sukses & tiap error; tanpa data asli/secret.
- FE/mobile: ui-check.md — verifikasi visual screen yang berubah terhadap Figma dan spec: dev server/simulator, screenshot tiap state, responsif atau ukuran device, aksesibilitas dasar, laporkan selisih.

TAHAP 6 — Dokumen pendamping stack
- BE: baca docs/db/schema.sql (kalau tidak ada, minta saya dump dan lanjut tahap lain dulu). Buat docs/db/gap-analysis.md: header (sumber, tanggal), legenda ✅/🟡/❌, kesimpulan singkat, mapping tabel ↔ fitur ↔ status ↔ catatan, gap G1..Gn, pertanyaan terbuka.
- FE/mobile: buat docs/api/ dari kontrak API yang saya berikan, atau dari kode service/client yang ada, atau asumsi (tandai jelas). Per endpoint: method, path, auth, request, response, error, dipakai di screen mana. Plus docs/api/README.md (sumber, tanggal).

TAHAP 7 — Figma (lewati bila input Figma "belum ada", tandai TODO)
Kuota MCP Figma ±20 panggilan/bulan: get_metadata sekali, get_design_context per section seminimal mungkin; FE/mobile tambah get_variable_defs sekali. Simpan ekstrak mentah per screen ke docs/figma/<nama-app>-screens.md. Tulis docs/features/overview.md: link Figma, tabel section → screen → area, glosarium, state machine entitas utama, pertanyaan terbuka; BE tambah usulan struktur data, katalog endpoint (ada/ubah/baru), response code; FE/mobile tambah peta navigasi, inventaris komponen, design token, endpoint per screen. Isi fileKey ke figma-spec.md. BE: perbarui gap-analysis dengan gap dari desain. FE/mobile: tambah endpoint yang belum ada kontraknya ke docs/api/ sebagai butuh konfirmasi BE. Laporkan jumlah panggilan MCP.

TAHAP 8 — docs/PROGRESS.md dan docs/README.md
PROGRESS dari overview (atau dari kode bila overview belum ada): tanggal, total x/y dan persen, tabel ringkasan (P0/P1/P2, fitur, bar 10 blok, persen, x/y, status Belum mulai/Berjalan/Selesai/Terblokir), legenda, satu section per fitur berisi checklist. Task yang sudah ada di kode dicentang. Tambah fitur "Fondasi" (BE: DB, config, auth middleware, storage, CI; FE/mobile: routing, theme/token, HTTP client, auth state, env, CI). README: tabel indeks semua dokumen di docs/.

TAHAP 9 — Tooling kualitas
Linter + formatter config stack ini; jalankan, laporkan jumlah issue, jangan perbaiki. Coverage ambang 80% bila runner mendukung. Dev server / hot reload / simulator config dengan entrypoint benar; proyek web buat .claude/launch.json untuk preview. .env.example berisi semua env var yang dipakai kode dengan nilai kosong/dummy. CI sesuai input saya: lint → test coverage → build → deploy (deploy TODO bila target belum jelas), credential via variabel CI.

TAHAP 10 — Permission dan hooks
Buat .claude/settings.json: permissions.allow untuk perintah read-only/rutin stack ini (test, build, lint, format, graphify, git status/diff/log); permissions.deny untuk commit dan push via git serta Read .env dan .env.*. Hooks:
- PostToolUse matcher Edit|Write → .claude/hooks/format.sh: baca tool_input.file_path dari stdin via jq; untuk ekstensi bahasa repo ini jalankan formatter + pemeriksaan cepat; selalu exit 0.
- PreToolUse matcher Bash → .claude/hooks/block-git-commit.sh: tolak (exit 2 + pesan stderr) bila `git commit` atau `git push` mengawali segmen perintah (setelah ; && || | atau awal baris); teks di heredoc/echo tidak boleh ikut terblokir.
Panggil lewat "$CLAUDE_PROJECT_DIR"/.claude/hooks/..., chmod +x. Uji keduanya dengan JSON ke stdin: kasus harus-tolak (commit langsung, push setelah &&, sudo) dan harus-lolos (git status, teks "git commit" di echo/heredoc). Tunjukkan hasilnya.

TAHAP 11 — Graphify dan verifikasi
Jalankan graphify update . Lalu: daftar command/agent/skill terpasang; jalankan perintah test, build, lint, format dari CLAUDE.md dan laporkan apa adanya; FE/mobile pastikan dev server/simulator membuka screen pertama; graphify query untuk entitas/screen utama; BE jalankan alur /postman untuk collection awal.

LAPORAN AKHIR
Ringkas: profil repo, file yang dibuat/diubah (dikelompokkan), hasil test/lint, item TODO yang butuh saya (Figma, DB, kontrak API, target deploy), lalu usulan pesan commit. Ingatkan saya untuk restart Claude Code supaya .claude/ dan hooks terbaca penuh.
```

---

## Setelah prompt selesai — [MANUAL]

1. Restart Claude Code, ketik `/` dan pastikan command muncul.
2. BE: import kedua file di `docs/postman/` ke Postman.
3. Lengkapi TODO yang dilaporkan (Figma, DB, kontrak API), lalu:

```bash
git add -A && git commit -m "chore: setup Claude Code workflow, docs, and tooling"
```

---

## Kerja harian per fitur (semua stack)

```text
/figma-spec <link-figma-dengan-node-id> <nama-fitur>
```

Review spec, jawab pertanyaan terbuka, lalu:

```text
/feature <nama-fitur>
```

Commit manual pakai pesan yang diusulkan. Bug fix: cukup deskripsikan masalahnya, Claude mengikuti alur `/feature` otomatis.

Fullstack: `/figma-spec` sekali menghasilkan spec dengan bagian BE dan FE; kerjakan BE dulu, lalu FE dengan kontrak dari spec yang sama.

Tips hemat token tanpa file: satu sesi per fitur lalu `/clear`; agent rutin pakai `model: sonnet`/`haiku`; prompt sebutkan file dan fungsi yang dimaksud.

---

## Menjalankan ulang sebagian

Kalau hanya perlu satu tahap (misalnya repo sudah punya `.claude/` tapi belum ada hooks), tempel Prompt Utama dengan tambahan di awal:

```text
Jalankan hanya TAHAP <n> dan LAPORAN AKHIR dari prompt berikut; tahap lain anggap sudah selesai.
```

---

## Memperbarui komponen ECC

```text
Bandingkan .claude/agents, .claude/rules, .claude/skills, dan command yang berasal dari ECC di repo ini dengan versi terbaru di ~/everything-claude-code (git pull di sana dulu). Tampilkan diff per file. Terapkan pembaruan hanya untuk file yang belum pernah disesuaikan ke repo ini; untuk yang sudah disesuaikan, tunjukkan diff dan tanya saya dulu. Jangan commit.
```

---

## Checklist

- [ ] Persiapan: ECC clone, graphify, toolchain, plugin Figma & LSP, Figma duplikat, dump DB / kontrak API
- [ ] Prompt Utama dijalankan, laporan akhir dibaca
- [ ] TODO dilengkapi
- [ ] Restart Claude Code, command terlihat
- [ ] BE: Postman diimport
- [ ] Commit
