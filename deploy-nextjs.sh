#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="${ROOT_DIR:-/var/www/omendapipays}"
APP_DIR="${APP_DIR:-$ROOT_DIR/tmtt_nextjs}"
BRANCH="${BRANCH:-main}"
APP_NAME="${APP_NAME:-omendapipays-next}"
APP_URL="${APP_URL:-https://omendapipaysglobel.online}"
NGINX_CONF_NAME="${NGINX_CONF_NAME:-omendapipays}"
NGINX_CONF_SRC="${NGINX_CONF_SRC:-$ROOT_DIR/nginx-validation-key.conf}"
NGINX_CONF_DST="${NGINX_CONF_DST:-/etc/nginx/sites-available/$NGINX_CONF_NAME}"
NGINX_CONF_LINK="${NGINX_CONF_LINK:-/etc/nginx/sites-enabled/$NGINX_CONF_NAME}"

echo "==> Deploying branch $BRANCH from $ROOT_DIR"
cd "$ROOT_DIR"

git fetch origin
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"

if [ -f "$APP_DIR/public/validation-key.txt" ]; then
  cp "$APP_DIR/public/validation-key.txt" "$ROOT_DIR/validation-key.txt"
fi

cd "$APP_DIR"
npm ci
npm run build

if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  pm2 restart ecosystem.config.cjs --only "$APP_NAME" --update-env
else
  pm2 start ecosystem.config.cjs --only "$APP_NAME" --update-env
fi

pm2 save

if [ -f "$NGINX_CONF_SRC" ]; then
  echo "==> Installing nginx site config from repo"
  sudo cp "$NGINX_CONF_SRC" "$NGINX_CONF_DST"
  sudo ln -sf "$NGINX_CONF_DST" "$NGINX_CONF_LINK"
else
  echo "ERROR: nginx config file not found at $NGINX_CONF_SRC" >&2
  exit 1
fi

sudo nginx -t
sudo systemctl reload nginx

APP_URL="$APP_URL" bash "$ROOT_DIR/verify-pi-browser-headers.sh"

echo "==> Deployment complete"