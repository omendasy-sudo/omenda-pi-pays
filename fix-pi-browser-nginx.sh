#!/usr/bin/env bash
#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# fix-pi-browser-nginx.sh  — Pi Browser ERR_BLOCKED_BY_RESPONSE full fix
#
# Runs two complementary fixes:
#   1. NUKE:   Removes every X-Frame-Options header directive from every active
#              nginx config (sites-available + conf.d + nginx.conf), in-place.
#   2. DEPLOY: Installs the repo's correct full config (nginx-validation-key.conf)
#              which proxies to Next.js and adds Pi-safe CSP frame-ancestors.
#
# Usage:
#   cd /var/www/omendapipays && sudo bash fix-pi-browser-nginx.sh
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

ROOT_DIR="${ROOT_DIR:-/var/www/omendapipays}"
APP_URL="${APP_URL:-https://omendapipaysglobel.online}"
SITE_NAME="${SITE_NAME:-omendapipays}"
CONF_SRC="${CONF_SRC:-$ROOT_DIR/nginx-validation-key.conf}"
CONF_DST="${CONF_DST:-/etc/nginx/sites-available/$SITE_NAME}"

# ── Step 1: Nuke X-Frame-Options from every nginx config file ────────────────
echo "==> [1/4] Removing X-Frame-Options from all nginx config files..."
NGINX_DIRS="/etc/nginx/sites-available /etc/nginx/sites-enabled /etc/nginx/conf.d /etc/nginx"
found_any=false
for dir in $NGINX_DIRS; do
  [ -d "$dir" ] || continue
  for f in "$dir"/*.conf "$dir"/*.cfg "$dir"/nginx.conf "$dir"/default; do
    [ -f "$f" ] || continue
    if grep -qi "X-Frame-Options" "$f" 2>/dev/null; then
      echo "    Patching: $f"
      # Remove lines containing X-Frame-Options (case-insensitive)
      sudo sed -i '/[Xx]-[Ff]rame-[Oo]ptions/d' "$f"
      found_any=true
    fi
  done
done
if [ "$found_any" = false ]; then
  echo "    No X-Frame-Options found in config files (may be in nginx.conf includes)"
fi

# Also check and patch nginx.conf itself
if grep -qi "X-Frame-Options" /etc/nginx/nginx.conf 2>/dev/null; then
  echo "    Patching: /etc/nginx/nginx.conf"
  sudo sed -i '/[Xx]-[Ff]rame-[Oo]ptions/d' /etc/nginx/nginx.conf
fi

# ── Step 2: Deploy the correct full config ───────────────────────────────────
echo "==> [2/4] Deploying Pi Browser-safe nginx config from repo..."
if [ -f "$CONF_SRC" ]; then
  sudo cp "$CONF_SRC" "$CONF_DST"
  sudo ln -sf "$CONF_DST" "/etc/nginx/sites-enabled/$SITE_NAME"
  sudo rm -f /etc/nginx/sites-enabled/default
  echo "    Installed: $CONF_DST"
else
  echo "    WARNING: $CONF_SRC not found, skipping full config deploy"
fi

# ── Step 3: Verify & reload ──────────────────────────────────────────────────
echo "==> [3/4] Verifying nginx config..."
if sudo nginx -T 2>/dev/null | grep -qi "X-Frame-Options"; then
  echo ""
  echo "ERROR: X-Frame-Options still found in merged nginx config!" >&2
  echo "Remaining occurrences:"
  sudo nginx -T 2>/dev/null | grep -ni "X-Frame-Options" >&2
  echo ""
  echo "Manually remove those lines and run:  sudo nginx -t && sudo systemctl reload nginx" >&2
  exit 1
fi

sudo nginx -t
echo "==> Reloading nginx..."
sudo systemctl reload nginx || sudo systemctl restart nginx

# ── Step 4: Verify live headers ──────────────────────────────────────────────
echo "==> [4/4] Checking live headers from $APP_URL ..."
sleep 2
headers="$(curl -sSI "$APP_URL" 2>&1)"
echo "$headers"
echo ""

if echo "$headers" | grep -qi '^X-Frame-Options:'; then
  echo "ERROR: X-Frame-Options STILL present in live response!" >&2
  echo "There may be a cache or another server layer. Check CloudFlare/CDN settings." >&2
  exit 1
fi

echo "─────────────────────────────────────────────────"
echo "SUCCESS: X-Frame-Options removed."
echo "Pi Browser can now load https://omendapipaysglobel.online/"
echo "─────────────────────────────────────────────────"