import { NextResponse } from "next/server";

// Served at /.well-known/pi.toml via rewrite in next.config.ts
// Pi Server requires this file to verify and list your token on Pi Wallet.
// Fill in the environment variables in .env.local / .env.production:
//   TOKEN_CODE          — your token code (alphanumeric, up to 12 chars)
//   TOKEN_ISSUER        — public key of the issuer account
//   TOKEN_NAME          — name of the token issuer (e.g. your project/org name)
//   TOKEN_DESC          — short description of the token
//   TOKEN_IMAGE_URL     — publicly accessible HTTPS URL of the token icon (PNG)

export async function GET() {
  const code = process.env.TOKEN_CODE ?? "OMENDA";
  const issuer = process.env.TOKEN_ISSUER ?? "REPLACE_WITH_YOUR_ISSUER_PUBLIC_KEY";
  const name = process.env.TOKEN_NAME ?? "Omenda Pi Pays";
  const desc =
    process.env.TOKEN_DESC ??
    "The native token of Omenda Pi Pays marketplace — a global Pi-powered payments and services platform.";
  const image =
    process.env.TOKEN_IMAGE_URL ??
    `https://omendapipaysglobel.online/globe.svg`;

  const toml = `# Pi Testnet — Token Metadata
# Hosted at https://omendapipaysglobel.online/.well-known/pi.toml
# See: https://developers.pinetwork.io

[[CURRENCIES]]
code="${code}"
issuer="${issuer}"
name="${name}"
desc="${desc}"
image="${image}"
`;

  return new NextResponse(toml, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
