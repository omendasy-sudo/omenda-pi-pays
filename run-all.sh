#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="${ROOT_DIR:-/var/www/omendapipays}"
DOMAIN="${DOMAIN:-omendapipaysglobel.online}"
CERTBOT_EMAIL="${CERTBOT_EMAIL:-admin@globel.online}"

if [ "${EUID:-$(id -u)}" -ne 0 ]; then
  echo "ERROR: run as root (or with sudo)." >&2
  exit 1
fi

if [ ! -d "$ROOT_DIR" ]; then
  echo "ERROR: root directory not found at $ROOT_DIR" >&2
  exit 1
fi

cd "$ROOT_DIR"

echo "==> Running SSL setup"
CERTBOT_EMAIL="$CERTBOT_EMAIL" bash ./setup-ssl.sh

echo "==> Running app deploy"
CERTBOT_EMAIL="$CERTBOT_EMAIL" bash ./deploy-nextjs.sh

echo "==> Running post-deploy checks"
if ! command -v curl >/dev/null 2>&1; then
  apt-get update -qq
  apt-get install -y curl
fi

if command -v pm2 >/dev/null 2>&1; then
  pm2 status || true
fi

nginx -t
systemctl status nginx --no-pager -l | sed -n '1,25p' || true
curl -I "https://$DOMAIN" || true

echo "==> All steps completed"
