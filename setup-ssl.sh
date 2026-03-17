#!/usr/bin/env bash
# ─── SSL Certificate Setup for omendapipaysglobel.online ───────────────────
# Run this script on your Linux VPS as root (or with sudo).
# Prerequisites: nginx installed, domain DNS points to this server.
#
# Usage:  sudo bash setup-ssl.sh

set -euo pipefail

if [ "${EUID:-$(id -u)}" -ne 0 ]; then
  echo "ERROR: run as root (or with sudo)." >&2
  exit 1
fi

ensure_service_running() {
  local service_name="$1"
  if systemctl list-unit-files | grep -q "^${service_name}\.service"; then
    systemctl enable --now "$service_name"
    return 0
  fi
  return 1
}

DOMAIN="omendapipaysglobel.online"
WWW_DOMAIN="www.omendapipaysglobel.online"
CERTBOT_EMAIL="${CERTBOT_EMAIL:-admin@globel.online}"
APP_DIR="/var/www/omendapipays"
CERTBOT_WEBROOT="/var/www/certbot"
NGINX_SITES="/etc/nginx/sites-available"
NGINX_ENABLED="/etc/nginx/sites-enabled"
CONF_NAME="omendapipays"
BOOTSTRAP_CONF="${NGINX_SITES}/${CONF_NAME}-bootstrap"
FULL_CONF_SRC=""
RENEW_CRON="0 0,12 * * * certbot renew --quiet --deploy-hook 'systemctl reload nginx'"

echo "==> Installing nginx + certbot..."
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y nginx certbot cron

if ! command -v certbot >/dev/null 2>&1; then
  echo "ERROR: certbot not found after install." >&2
  exit 1
fi

echo "==> Creating web roots..."
mkdir -p "$APP_DIR" "$CERTBOT_WEBROOT"

echo "==> Ensuring nginx is running..."
ensure_service_running nginx || {
  echo "ERROR: nginx service not found." >&2
  exit 1
}

echo "==> Ensuring cron is running..."
ensure_service_running cron || ensure_service_running crond || {
  echo "WARNING: cron service not found (cron/crond). Renewal cron was still configured."
}

echo "==> Copying validation key..."
# Copy validation-key.txt to web root so nginx can serve it
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FULL_CONF_SRC="$SCRIPT_DIR/nginx-validation-key.conf"

if [ ! -f "$FULL_CONF_SRC" ]; then
  echo "ERROR: nginx config file not found at $FULL_CONF_SRC" >&2
  exit 1
fi

if [ -f "$SCRIPT_DIR/tmtt_nextjs/public/validation-key.txt" ]; then
  cp "$SCRIPT_DIR/tmtt_nextjs/public/validation-key.txt" "$APP_DIR/validation-key.txt"
  echo "    validation-key.txt copied."
else
  echo "    WARNING: validation-key.txt not found – place it at $APP_DIR/validation-key.txt manually."
fi

echo "==> Installing nginx site config..."
cat > "$BOOTSTRAP_CONF" <<EOF
server {
  listen 80;
  listen [::]:80;
  server_name $DOMAIN $WWW_DOMAIN;

  location = /validation-key.txt {
    root $APP_DIR;
    default_type text/plain;
    add_header Cache-Control "no-store" always;
    try_files /validation-key.txt =404;
  }

  location /.well-known/acme-challenge/ {
    root $CERTBOT_WEBROOT;
  }

  location / {
    proxy_pass         http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header   Upgrade           \$http_upgrade;
    proxy_set_header   Connection        "upgrade";
    proxy_set_header   Host              \$host;
    proxy_set_header   X-Real-IP         \$remote_addr;
    proxy_set_header   X-Forwarded-For   \$proxy_add_x_forwarded_for;
    proxy_set_header   X-Forwarded-Proto \$scheme;
    proxy_read_timeout 60s;
    proxy_buffering    off;
    proxy_hide_header  X-Frame-Options;
  }
}
EOF

ln -sf "$BOOTSTRAP_CONF" "$NGINX_ENABLED/$CONF_NAME"
rm -f "$NGINX_ENABLED/default" 2>/dev/null || true

echo "==> Testing nginx config..."
nginx -t

echo "==> Reloading nginx..."
systemctl reload nginx || systemctl restart nginx

echo "==> Obtaining Let's Encrypt certificate..."
certbot certonly \
  --webroot \
  -w "$CERTBOT_WEBROOT" \
  --non-interactive \
  --agree-tos \
  --email "$CERTBOT_EMAIL" \
  -d "$DOMAIN" \
  -d "$WWW_DOMAIN"

echo "==> Installing full nginx SSL config..."
cp "$FULL_CONF_SRC" "$NGINX_SITES/$CONF_NAME"
ln -sf "$NGINX_SITES/$CONF_NAME" "$NGINX_ENABLED/$CONF_NAME"
rm -f "$BOOTSTRAP_CONF" 2>/dev/null || true

echo "==> Testing nginx SSL config..."
nginx -t

echo "==> Reloading nginx with SSL..."
systemctl reload nginx || systemctl restart nginx

echo "==> Setting up auto-renewal (twice daily via cron)..."
if crontab -l 2>/dev/null | grep -Fq "certbot renew --quiet --deploy-hook 'systemctl reload nginx'"; then
  echo "    Renewal cron already present."
else
  (crontab -l 2>/dev/null; echo "$RENEW_CRON") | crontab -
  echo "    Renewal cron installed."
fi

echo "==> Confirming SSL certificate installation..."
if certbot certificates --cert-name "$DOMAIN" >/dev/null 2>&1; then
  certbot certificates --cert-name "$DOMAIN"
else
  echo "WARNING: Could not read certificate details for $DOMAIN via certbot."
fi

if command -v curl >/dev/null 2>&1; then
  echo "==> Probing HTTPS endpoint..."
  curl -I "https://$DOMAIN" || true
else
  echo "WARNING: curl not installed; skipping HTTPS probe."
fi

echo ""
echo "==> Done! SSL certificate active for $DOMAIN"
echo "    Certificate path: /etc/letsencrypt/live/$DOMAIN/fullchain.pem"
echo "    Run 'certbot renew --dry-run' to verify auto-renewal."
