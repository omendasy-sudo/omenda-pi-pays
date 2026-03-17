# Production Deployment

This repository is served by nginx and a Next.js process on port 3000, not by GitHub Pages, Netlify, or Vercel.

## Server layout

- Repository root: `/var/www/omendapipays`
- Next.js app: `/var/www/omendapipays/tmtt_nextjs`
- Validation key served by nginx from: `/var/www/omendapipays/validation-key.txt`
- Reverse proxy target: `127.0.0.1:3000`

## One-time server setup

1. Install Node.js, npm, PM2, and nginx on the VPS.
2. Clone this repository into `/var/www/omendapipays`.
3. Create `tmtt_nextjs/.env.production` on the server with the production Pi credentials and app URL.
4. Ensure nginx uses [nginx-validation-key.conf](nginx-validation-key.conf).
5. Run the deploy script once:

```bash
cd /var/www/omendapipays
bash ./deploy-nextjs.sh
```

The deploy script now finishes by running [verify-pi-browser-headers.sh](verify-pi-browser-headers.sh) and fails if the live site still sends `X-Frame-Options` or is missing the required Pi `frame-ancestors` policy.

## GitHub Actions auto-deploy

The workflow in [.github/workflows/deploy-production.yml](.github/workflows/deploy-production.yml) deploys on every push to `main`.

Add these GitHub repository secrets:

- `DEPLOY_HOST`: VPS hostname or IP
- `DEPLOY_USER`: SSH user with access to the repo and PM2
- `DEPLOY_SSH_KEY`: private key for that user
- `DEPLOY_PORT`: optional SSH port, defaults to `22`
- `DEPLOY_PATH`: absolute repo path on the server, for example `/var/www/omendapipays`

## Manual deploy

```bash
cd /var/www/omendapipays
git pull origin main
bash ./deploy-nextjs.sh
```

`deploy-nextjs.sh` now also installs `nginx-validation-key.conf` into `/etc/nginx/sites-available/omendapipays`, refreshes the enabled symlink, then reloads nginx. This prevents stale server headers like `X-Frame-Options: SAMEORIGIN` from lingering after app updates.

## Post-deploy verification

After every deploy, confirm the live site can be embedded in Pi Browser:

```bash
bash ./verify-pi-browser-headers.sh
```

Expected result:

- `Content-Security-Policy: frame-ancestors 'self' https://*.minepi.com https://minepi.com`
- no `X-Frame-Options` header at all

## Quick Nginx Fix (Pi Browser)

If Pi Browser still shows `ERR_BLOCKED_BY_RESPONSE`, run this on the VPS:

```bash
cd /var/www/omendapipays
bash ./fix-pi-browser-nginx.sh
```

The script installs the repo nginx config, disables the default site, reloads nginx, and validates live headers.

If the site is still blocked in Pi Browser:

```bash
sudo nginx -T | grep -ni X-Frame-Options
```

Remove any matching `add_header X-Frame-Options ...` directive from the active nginx config or any included snippet, then run:

```bash
sudo nginx -t
sudo systemctl reload nginx
bash ./verify-pi-browser-headers.sh
```

Also make sure the default nginx site is disabled so your domain is served by the repo-managed config:

```bash
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

## Notes

- `tmtt_nextjs/package.json` now uses `scripts/next-with-env.mjs` for env-specific commands because the installed Next.js CLI here does not support `--env-file`.
- `scripts/next-with-env.mjs` intentionally ignores `NODE_ENV` from env files so `next dev`, `next build`, and `next start` keep their expected runtime mode.
- PM2 uses [tmtt_nextjs/ecosystem.config.cjs](tmtt_nextjs/ecosystem.config.cjs) and starts the app as `omendapipays-next`.