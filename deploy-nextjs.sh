#!/usr/bin/env bash

set -euo pipefail

ensure_service_running() {
  local service_name="$1"
  if systemctl list-unit-files | grep -q "^${service_name}\.service"; then
    sudo systemctl enable --now "$service_name"
    return 0
  fi
  return 1
}

ROOT_DIR="${ROOT_DIR:-/var/www/omendapipays}"
APP_DIR="${APP_DIR:-$ROOT_DIR/tmtt_nextjs}"
BRANCH="${BRANCH:-main}"
APP_NAME="${APP_NAME:-omendapipays-next}"
APP_URL="${APP_URL:-https://omendapipaysglobel.online}"
CERT_DOMAIN="${CERT_DOMAIN:-omendapipaysglobel.online}"
WWW_DOMAIN="${WWW_DOMAIN:-www.omendapipaysglobel.online}"
CERTBOT_EMAIL="${CERTBOT_EMAIL:-admin@globel.online}"
CERT_LIVE_DIR="${CERT_LIVE_DIR:-/etc/letsencrypt/live/$CERT_DOMAIN}"
CERTBOT_WEBROOT="${CERTBOT_WEBROOT:-/var/www/certbot}"
NGINX_CONF_NAME="${NGINX_CONF_NAME:-omendapipays}"
NGINX_CONF_SRC="${NGINX_CONF_SRC:-$ROOT_DIR/nginx-validation-key.conf}"
NGINX_CONF_DST="${NGINX_CONF_DST:-/etc/nginx/sites-available/$NGINX_CONF_NAME}"
NGINX_CONF_LINK="${NGINX_CONF_LINK:-/etc/nginx/sites-enabled/$NGINX_CONF_NAME}"
NGINX_DEFAULT_LINK="${NGINX_DEFAULT_LINK:-/etc/nginx/sites-enabled/default}"
CERTBOT_RENEW_CRON="0 0,12 * * * certbot renew --quiet --deploy-hook 'systemctl reload nginx'"

echo "==> Deploying branch $BRANCH from $ROOT_DIR"
if [ ! -d "$ROOT_DIR" ]; then
  echo "ERROR: root directory not found at $ROOT_DIR" >&2
  exit 1
fi

if [ ! -d "$APP_DIR" ]; then
  echo "ERROR: app directory not found at $APP_DIR" >&2
  exit 1
fi

for cmd in git npm pm2; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "==> Missing dependency: $cmd"
    case "$cmd" in
      git)
        sudo apt-get update -qq
        sudo apt-get install -y git
        ;;
      npm)
        sudo apt-get update -qq
        sudo apt-get install -y npm
        ;;
      pm2)
        sudo npm install -g pm2
        ;;
    esac
  fi
done

for cmd in git npm pm2; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "ERROR: failed to install required command: $cmd" >&2
    exit 1
  fi
done

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
  if [ -f "$CERT_LIVE_DIR/fullchain.pem" ] && [ -f "$CERT_LIVE_DIR/privkey.pem" ]; then
    echo "==> Installing nginx SSL site config from repo"
    sudo cp "$NGINX_CONF_SRC" "$NGINX_CONF_DST"
  else
    echo "==> SSL cert files missing at $CERT_LIVE_DIR; installing HTTP bootstrap nginx config"
    sudo mkdir -p "$CERTBOT_WEBROOT"
    TMP_NGINX_CONF="$(mktemp)"
    cat > "$TMP_NGINX_CONF" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name $CERT_DOMAIN $WWW_DOMAIN;

    location = /validation-key.txt {
        root $ROOT_DIR;
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
    sudo cp "$TMP_NGINX_CONF" "$NGINX_CONF_DST"
    rm -f "$TMP_NGINX_CONF"

    sudo ln -sf "$NGINX_CONF_DST" "$NGINX_CONF_LINK"
    sudo nginx -t
    sudo systemctl reload nginx

    if ! command -v certbot >/dev/null 2>&1; then
      echo "==> Installing certbot"
      sudo apt-get update -qq
      sudo apt-get install -y certbot cron
    fi

    ensure_service_running cron || ensure_service_running crond || true

    echo "==> Requesting Let's Encrypt certificate via webroot"
    if sudo certbot certonly \
      --webroot \
      -w "$CERTBOT_WEBROOT" \
      --non-interactive \
      --agree-tos \
      --email "$CERTBOT_EMAIL" \
      -d "$CERT_DOMAIN" \
      -d "$WWW_DOMAIN"; then
      echo "==> Certificate issued; switching to nginx SSL config from repo"
      sudo cp "$NGINX_CONF_SRC" "$NGINX_CONF_DST"
    else
      echo "WARNING: Certbot issuance failed; keeping HTTP bootstrap nginx config for now."
    fi
  fi

  sudo ln -sf "$NGINX_CONF_DST" "$NGINX_CONF_LINK"
else
  echo "ERROR: nfig file not found at $NGINX_CONF_SRC" >&2
  exit 1
fi

if [ -L "$NGINX_DEFAULT_LINK" ] || [ -e "$NGINX_DEFAULT_LINK" ]; then
  echo "==> Disabling default nginx site"
  sudo rm -f "$NGINX_DEFAULT_LINK"
fi

echo "==> Confirming active nginx site references"
if ! sudo nginx -T 2>/dev/null | grep -q "$NGINX_CONF_DST"; then
  echo "WARNING: nginx -T did not show $NGINX_CONF_DST in the active config dump." >&2
fi

sudo nginx -t
sudo systemctl reload nginx || sudo systemctl restart nginx

echo "==> Ensuring certbot auto-renewal cron exists"
if sudo crontab -l 2>/dev/null | grep -Fq "certbot renew --quiet --deploy-hook 'systemctl reload nginx'"; then
  echo "    Certbot renewal cron already present"
else
  (sudo crontab -l 2>/dev/null; echo "$CERTBOT_RENEW_CRON") | sudo crontab -
  echo "    Certbot renewal cron installed"
fi

APP_URL="$APP_URL" bash "$ROOT_DIR/verify-pi-browser-headers.sh"

echo "==> Deployment complete"