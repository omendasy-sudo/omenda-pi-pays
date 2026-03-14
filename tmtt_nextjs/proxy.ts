import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function isLocalHost(hostname: string) {
  return hostname === "localhost" || hostname === "127.0.0.1";
}

function isPhoneUserAgent(userAgent: string) {
  return /iPhone|iPod|Android.+Mobile|Windows Phone|BlackBerry|Opera Mini|IEMobile|Mobile Safari|PiBrowser/i.test(userAgent);
}

export function proxy(request: NextRequest) {
  if (request.method === "HEAD" || request.method === "OPTIONS") {
    return NextResponse.next();
  }

  if (isLocalHost(request.nextUrl.hostname)) {
    return NextResponse.next();
  }

  const userAgent = request.headers.get("user-agent") || "";
  if (isPhoneUserAgent(userAgent)) {
    return NextResponse.next();
  }

  return new NextResponse(
    `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Phone Only Access</title><style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:#09090b;color:#fafafa;font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif}.card{max-width:520px;width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:28px;text-align:center}.icon{font-size:42px;margin-bottom:14px}p{color:#d4d4d8;line-height:1.6}small{color:#a1a1aa}</style></head><body><div class="card"><div class="icon">📱</div><h1>Phone Only Access</h1><p>Omenda Pi Pays is currently available only on mobile phones. Open this site from your phone or inside Pi Browser to continue.</p><small>Desktop browsers are blocked for regular users on this site.</small></div></body></html>`,
    {
      status: 403,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store",
      },
    }
  );
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|validation-key.txt).*)"],
};