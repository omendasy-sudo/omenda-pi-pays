#!/usr/bin/env bash
# ─── SSL Certificate Setup for omendapipaysglobel.online ───────────────────
# Run this script on your Linux VPS as root (or with sudo).
# Prerequisites: nginx installed, domain DNS points to this server.
#
# Usage:  sudo bash setup-ssl.sh

set -euo pipefail

DOMAIN="omendapipaysglobel.online"
WWW_DOMAIN="www.omendapipaysglobel.online"
APP_DIR="/var/www/omendapipays"
CERTBOT_WEBROOT="/var/www/certbot"
NGINX_SITES="/etc/nginx/sites-available"
NGINX_ENABLED="/etc/nginx/sites-enabled"
CONF_NAME="omendapipays"

echo "==> Installing certbot (snap)..."
apt-get update -qq
apt-get install -y snapd nginx
snap install --classic certbot
ln -sf /snap/bin/certbot /usr/bin/certbot

echo "==> Creating web roots..."
mkdir -p "$APP_DIR" "$CERTBOT_WEBROOT"

echo "==> Copying validation key..."
# Copy validation-key.txt to web root so nginx can serve it
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -f "$SCRIPT_DIR/tmtt_nextjs/public/validation-key.txt" ]; then
  cp "$SCRIPT_DIR/tmtt_nextjs/public/validation-key.txt" "$APP_DIR/validation-key.txt"
  echo "    validation-key.txt copied."
else
  echo "    WARNING: validation-key.txt not found – place it at $APP_DIR/validation-key.txt manually."
fi

echo "==> Installing nginx site config..."
cp "$SCRIPT_DIR/nginx-validation-key.conf" "$NGINX_SITES/$CONF_NAME"
ln -sf "$NGINX_SITES/$CONF_NAME" "$NGINX_ENABLED/$CONF_NAME"
rm -f "$NGINX_ENABLED/default" 2>/dev/null || true

echo "==> Testing nginx config..."
nginx -t

echo "==> Reloading nginx..."
systemctl reload nginx

echo "==> Obtaining Let's Encrypt certificate..."
certbot certonly \
  --nginx \
  --non-interactive \
  --agree-tos \
  --email admin@globel.online \
  -d "$DOMAIN" \
  -d "$WWW_DOMAIN"

echo "==> Reloading nginx with SSL..."
systemctl reload nginx

echo "==> Setting up auto-renewal (twice daily via cron)..."
(crontab -l 2>/dev/null; echo "0 0,12 * * * certbot renew --quiet --deploy-hook 'systemctl reload nginx'") | crontab -

echo ""
echo "==> Done! SSL certificate active for $DOMAIN"
echo "    Certificate path: /etc/letsencrypt/live/$DOMAIN/fullchain.pem"
echo "    Run 'certbot renew --dry-run' to verify auto-renewal."
