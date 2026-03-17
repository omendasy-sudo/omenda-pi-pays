#!/usr/bin/env bash

set -euo pipefail

APP_URL="${APP_URL:-https://omendapipaysglobel.online}"
EXPECTED_CSP="frame-ancestors 'self' https://*.minepi.com https://minepi.com"

echo "==> Verifying Pi Browser headers for $APP_URL"

headers="$(curl -sSI "$APP_URL")"

echo "$headers"

if echo "$headers" | grep -qi '^X-Frame-Options:'; then
  echo "ERROR: X-Frame-Options is still being sent. Pi Browser will block the page." >&2
  echo "Hint: run 'sudo nginx -T | grep -ni X-Frame-Options' on the VPS and remove the matching directive from the active config." >&2
  exit 1
fi

if ! echo "$headers" | grep -qi "^Content-Security-Policy: .*frame-ancestors 'self' https://\*\.minepi\.com https://minepi\.com"; then
  echo "ERROR: Content-Security-Policy is missing the required Pi Browser frame-ancestors directive." >&2
  exit 1
fi

echo "==> Pi Browser header check passed"