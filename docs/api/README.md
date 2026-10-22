# Kontrak API

Sumber: kode repo (tidak ada kontrak eksternal) · Tanggal: 2026-10-22

Situs ini **statis** dan tidak mengonsumsi API apa pun saat runtime. Semua data (profil, proyek, pengalaman) ada di `src/content/*.ts` dan dibaca saat build.

| Kebutuhan     | Cara saat ini                      | Catatan                                                         |
| ------------- | ---------------------------------- | --------------------------------------------------------------- |
| Kontak        | tautan `mailto:` dan tautan sosial | tidak ada form, tidak ada backend                               |
| Daftar proyek | `src/content/projects.ts`          | diperbarui manual                                               |
| Analytics     | belum ada                          | bila dipakai, Vercel Analytics (tanpa cookie); butuh konfirmasi |

Bila nanti ada endpoint (mis. form kontak lewat Route Handler, atau feed tulisan), dokumentasikan di sini per endpoint: method, path, auth, request, response, error, dipakai di screen mana.
