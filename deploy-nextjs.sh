#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="${ROOT_DIR:-/var/www/omendapipays}"
APP_DIR="${APP_DIR:-$ROOT_DIR/tmtt_nextjs}"
BRANCH="${BRANCH:-main}"
APP_NAME="${APP_NAME:-omendapipays-next}"

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

sudo nginx -t
sudo systemctl reload nginx

echo "==> Deployment complete"