#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════
#  vps-fix-now.sh  —  Pi Browser ERR_BLOCKED_BY_RESPONSE one-command fix
#
#  Paste and run on your VPS SSH terminal (no git pull needed):
#
#    sudo bash /var/www/omendapipays/vps-fix-now.sh
#
#  Or without having the file yet — run this single line directly:
#
#    sudo bash -c "
#      find /etc/nginx -name '*.conf' -o -name 'default' 2>/dev/null |
#        xargs grep -li 'X-Frame-Options' |
#        xargs -r sed -i '/[Xx]-[Ff]rame-[Oo]ptions/d' ;
#      sed -i '/[Xx]-[Ff]rame-[Oo]ptions/d' /etc/nginx/nginx.conf ;
#      nginx -t && systemctl reload nginx &&
#      echo OK && curl -sI https://omendapipaysglobel.online/ | grep -Ei 'x-frame|security'
#    "
# ═══════════════════════════════════════════════════════════════════════
set -euo pipefail

DOMAIN="omendapipaysglobel.online"
SITE_AVAILABLE="/etc/nginx/sites-available/omendapipays"
REPO_DIR="/var/www/omendapipays"

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║  Pi Browser Fix: Removing X-Frame-Options from nginx  ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

# ── 1. Nuke X-Frame-Options from every nginx config file ─────────────
echo "[1/5] Scanning nginx config files for X-Frame-Options..."
PATCHED=0

for f in \
  /etc/nginx/nginx.conf \
  /etc/nginx/sites-available/* \
  /etc/nginx/sites-enabled/* \
  /etc/nginx/conf.d/*; do
  [ -f "$f" ] || continue
  if grep -qi "X-Frame-Options" "$f"; then
    echo "  → Removing from: $f"
    sudo sed -i '/[Xx]-[Ff]rame-[Oo]ptions/d' "$f"
    PATCHED=$((PATCHED + 1))
  fi
done

echo "  Patched $PATCHED file(s)"

# ── 2. Add Pi Browser-safe CSP if the site config exists ─────────────
echo "[2/5] Checking Pi frame-ancestors CSP..."
if [ -f "$SITE_AVAILABLE" ]; then
  if ! grep -q "frame-ancestors" "$SITE_AVAILABLE"; then
    echo "  → Adding frame-ancestors CSP to $SITE_AVAILABLE"
    # Insert CSP add_header line right after any ssl_session_tickets line
    sudo sed -i "/ssl_session_tickets/a \\    add_header Content-Security-Policy \"frame-ancestors 'self' https://*.minepi.com https://minepi.com\" always;" "$SITE_AVAILABLE"
  else
    echo "  ✓ frame-ancestors CSP already present"
  fi
else
  echo "  ⚠ $SITE_AVAILABLE not found — skipping CSP injection"
fi

# ── 3. Ensure proxy_hide_header X-Frame-Options in site config ────────
echo "[3/5] Ensuring proxy_hide_header X-Frame-Options..."
if [ -f "$SITE_AVAILABLE" ]; then
  if ! grep -q "proxy_hide_header.*X-Frame-Options" "$SITE_AVAILABLE"; then
    echo "  → Adding proxy_hide_header to $SITE_AVAILABLE"
    sudo sed -i "/proxy_pass/i \\        proxy_hide_header X-Frame-Options;" "$SITE_AVAILABLE"
  else
    echo "  ✓ proxy_hide_header already present"
  fi
fi

# ── 4. Verify config & reload nginx ──────────────────────────────────
echo "[4/5] Testing nginx config..."
if ! sudo nginx -T 2>/dev/null | grep -qi "X-Frame-Options"; then
  echo "  ✓ No X-Frame-Options in merged config"
else
  echo ""
  echo "  ✗ X-Frame-Options still found in merged config:"
  sudo nginx -T 2>/dev/null | grep -ni "X-Frame-Options" | head -10
  echo ""
  echo "  Find and remove those lines manually, then: sudo systemctl reload nginx"
  exit 1
fi

sudo nginx -t
echo "  Reloading nginx..."
sudo systemctl reload nginx || sudo systemctl restart nginx

# ── 5. Verify live headers ────────────────────────────────────────────
echo "[5/5] Verifying live headers..."
sleep 2
HEADERS=$(curl -sSI "https://${DOMAIN}/" 2>&1)
echo "$HEADERS"

if echo "$HEADERS" | grep -qi "^X-Frame-Options:"; then
  echo ""
  echo "✗ X-Frame-Options STILL present in live response."
  echo "  Check if CloudFlare proxy or another layer is adding it."
  echo "  Disable CloudFlare proxy (orange cloud → grey cloud) and re-test."
  exit 1
fi

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║  ✓ SUCCESS: X-Frame-Options removed from live server  ║"
echo "║    Pi Browser can now load https://$DOMAIN/  ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""
