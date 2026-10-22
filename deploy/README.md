# Deploy ke VPS (Nginx, static export)

Tanggal: 2026-10-22 · Target: VPS 202.155.16.133 (Debian, Nginx 1.22, sudah melayani `specialdigitalthings.com`).

`pnpm build` menghasilkan `out/` (HTML statis + aset). CI menyalinnya ke `/var/www/andreanpradana.com` lewat rsync; Nginx menyajikannya dengan sertifikat Let's Encrypt.

## Sekali saja

1. **DNS** di registrar: record `A` untuk `@` dan `www` → `202.155.16.133`. Tunggu sampai `dig +short andreanpradana.com` menjawab IP itu.
2. **Keypair untuk CI** (di laptop):
   ```bash
   ssh-keygen -t ed25519 -C "github-actions andreanpradana.com" -f ~/.ssh/andreanpradana-deploy -N ""
   ```
3. **Di VPS** (sebagai root): salin `deploy/nginx.conf` dan `deploy/setup-vps.sh` ke VPS lalu jalankan
   ```bash
   bash setup-vps.sh "$(cat andreanpradana-deploy.pub)"
   ```
   Skrip membuat user `deploy`, folder web, memasang Nginx + certbot, menerbitkan sertifikat, dan mengaktifkan site.
4. **Secret di GitHub** (Settings → Secrets and variables → Actions):

   | Secret            | Isi                                                   |
   | ----------------- | ----------------------------------------------------- |
   | `VPS_HOST`        | `202.155.16.133`                                      |
   | `VPS_PORT`        | port SSH (`22` bila default)                          |
   | `VPS_USER`        | `deploy`                                              |
   | `VPS_SSH_KEY`     | isi file `~/.ssh/andreanpradana-deploy` (private key) |
   | `VPS_KNOWN_HOSTS` | keluaran `ssh-keyscan -p <port> 202.155.16.133`       |

5. Push ke `main` → job `deploy` di CI menjalankan rsync. Cek `https://andreanpradana.com`.

Status 2026-10-22: kelima secret sudah terisi lewat `gh secret set` (private key di `~/.ssh/andreanpradana-deploy` di laptop), `setup-vps.sh` sudah dijalankan, situs live. Sertifikat berlaku sampai 2027-01-20, renewal otomatis via timer certbot. Bila `VPS_KNOWN_HOSTS` kosong, CI mengambil host key sendiri dengan `ssh-keyscan`. Catatan: SSH ke VPS diblok dari jaringan kantor; pakai jaringan lain.

## Deploy manual (tanpa CI)

```bash
pnpm build && rsync -az --delete -e "ssh -p <port>" out/ deploy@202.155.16.133:/var/www/andreanpradana.com/
```

## Renewal sertifikat

`certbot` memasang timer systemd otomatis. Cek: `systemctl list-timers | grep certbot`.
