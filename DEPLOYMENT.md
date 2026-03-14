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

## Notes

- `tmtt_nextjs/package.json` now uses `scripts/next-with-env.mjs` for env-specific commands because the installed Next.js CLI here does not support `--env-file`.
- `scripts/next-with-env.mjs` intentionally ignores `NODE_ENV` from env files so `next dev`, `next build`, and `next start` keep their expected runtime mode.
- PM2 uses [tmtt_nextjs/ecosystem.config.cjs](tmtt_nextjs/ecosystem.config.cjs) and starts the app as `omendapipays-next`.