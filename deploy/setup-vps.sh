#!/usr/bin/env bash
# Setup sekali di VPS (jalankan sebagai root): user deploy, folder web, nginx, sertifikat.
# Pemakaian: bash setup-vps.sh <public-key-deploy>
# Contoh:    bash setup-vps.sh "ssh-ed25519 AAAA... github-actions"
set -euo pipefail

DOMAIN=andreanpradana.com
WEBROOT=/var/www/$DOMAIN
DEPLOY_USER=deploy
PUBKEY="${1:-}"
[ -n "$PUBKEY" ] || { echo "Butuh public key deploy sebagai argumen pertama." >&2; exit 1; }

# 1. User deploy tanpa password, hanya untuk rsync
id -u "$DEPLOY_USER" >/dev/null 2>&1 || adduser --disabled-password --gecos "" "$DEPLOY_USER"
install -d -m 700 -o "$DEPLOY_USER" -g "$DEPLOY_USER" "/home/$DEPLOY_USER/.ssh"
grep -qF "$PUBKEY" "/home/$DEPLOY_USER/.ssh/authorized_keys" 2>/dev/null \
  || echo "$PUBKEY" >> "/home/$DEPLOY_USER/.ssh/authorized_keys"
chmod 600 "/home/$DEPLOY_USER/.ssh/authorized_keys"
chown -R "$DEPLOY_USER:$DEPLOY_USER" "/home/$DEPLOY_USER/.ssh"

# 2. Folder web milik user deploy, placeholder sampai deploy pertama
install -d -m 755 -o "$DEPLOY_USER" -g "$DEPLOY_USER" "$WEBROOT"
[ -f "$WEBROOT/index.html" ] || echo "<!doctype html><title>$DOMAIN</title>" > "$WEBROOT/index.html"
chown "$DEPLOY_USER:$DEPLOY_USER" "$WEBROOT/index.html"

# 3. Nginx: pasang config dari repo (salin deploy/nginx.conf ke sebelah skrip ini)
apt-get install -y -q nginx certbot python3-certbot-nginx rsync >/dev/null
install -m 644 "$(dirname "$0")/nginx.conf" "/etc/nginx/sites-available/$DOMAIN"

# Sebelum sertifikat ada, aktifkan blok HTTP saja supaya nginx bisa reload
if [ ! -d "/etc/letsencrypt/live/$DOMAIN" ]; then
  cat > "/etc/nginx/sites-available/$DOMAIN.bootstrap" <<NGX
server {
    listen 80; listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;
    root $WEBROOT;
    location /.well-known/acme-challenge/ { root $WEBROOT; }
}
NGX
  ln -sf "/etc/nginx/sites-available/$DOMAIN.bootstrap" "/etc/nginx/sites-enabled/$DOMAIN"
  nginx -t && systemctl reload nginx
  # DNS A record harus sudah mengarah ke VPS ini. Coba apex + www; bila www
  # belum terpropagasi, terbitkan untuk apex dulu (jalankan ulang skrip nanti
  # untuk menambah www).
  if ! certbot certonly --webroot -w "$WEBROOT" -d "$DOMAIN" -d "www.$DOMAIN" \
      --non-interactive --agree-tos --register-unsafely-without-email; then
    echo "www.$DOMAIN belum bisa divalidasi; menerbitkan sertifikat untuk $DOMAIN saja." >&2
    certbot certonly --webroot -w "$WEBROOT" -d "$DOMAIN" \
      --non-interactive --agree-tos --register-unsafely-without-email
  fi
  rm -f "/etc/nginx/sites-available/$DOMAIN.bootstrap"
elif ! openssl x509 -in "/etc/letsencrypt/live/$DOMAIN/cert.pem" -noout -text | grep -q "DNS:www.$DOMAIN"; then
  # Sertifikat ada tapi tanpa www: coba perluas (gagal bukan masalah fatal)
  certbot certonly --webroot -w "$WEBROOT" -d "$DOMAIN" -d "www.$DOMAIN" --expand \
    --non-interactive --agree-tos --register-unsafely-without-email || true
fi

ln -sf "/etc/nginx/sites-available/$DOMAIN" "/etc/nginx/sites-enabled/$DOMAIN"
nginx -t && systemctl reload nginx
echo "Selesai. Webroot: $WEBROOT, user deploy: $DEPLOY_USER."
echo
echo "Nilai untuk secret GitHub VPS_KNOWN_HOSTS (salin satu baris ini):"
SSH_PORT=$(sshd -T 2>/dev/null | awk '/^port /{print $2; exit}')
PUBLIC_IP=$(curl -s -4 -m 5 https://api.ipify.org || hostname -I | awk '{print $1}')
if [ "${SSH_PORT:-22}" = "22" ]; then HOSTPART="$PUBLIC_IP"; else HOSTPART="[$PUBLIC_IP]:$SSH_PORT"; fi
echo "$HOSTPART $(cut -d' ' -f1,2 /etc/ssh/ssh_host_ed25519_key.pub)"
