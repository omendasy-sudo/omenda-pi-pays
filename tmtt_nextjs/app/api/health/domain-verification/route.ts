import { NextResponse } from "next/server";

function normalizeBaseUrl(value: string) {
  return value.trim().replace(/\/+$/, "");
}

function looksLikeHtml(value: string) {
  const sample = value.slice(0, 200).toLowerCase();
  return sample.includes("<html") || sample.includes("<!doctype") || sample.includes("<head") || sample.includes("<body");
}

export async function GET() {
  const baseUrl = normalizeBaseUrl(process.env.NEXT_PUBLIC_APP_URL || "");
  const expectedKey = (process.env.PI_VALIDATION_KEY || "").trim();

  if (!baseUrl) {
    return NextResponse.json(
      { ok: false, error: "NEXT_PUBLIC_APP_URL is not set" },
      { status: 500 }
    );
  }

  if (!expectedKey) {
    return NextResponse.json(
      { ok: false, error: "PI_VALIDATION_KEY is not set" },
      { status: 500 }
    );
  }

  const targetUrl = `${baseUrl}/validation-key.txt`;

  try {
    const response = await fetch(targetUrl, {
      method: "GET",
      cache: "no-store",
      headers: { Accept: "text/plain" },
    });

    const body = (await response.text()).trim();
    const status = response.status;
    const contentType = response.headers.get("content-type") || "";
    const isHtml = looksLikeHtml(body) || contentType.toLowerCase().includes("text/html");
    const matches = body === expectedKey;
    const ok = response.ok && !isHtml && matches;

    return NextResponse.json({
      ok,
      checks: {
        httpOk: response.ok,
        status,
        isHtml,
        matches,
      },
      meta: {
        targetUrl,
        contentType,
        responseLength: body.length,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown fetch error";
    return NextResponse.json(
      {
        ok: false,
        checks: {
          httpOk: false,
          status: null,
          isHtml: false,
          matches: false,
        },
        meta: { targetUrl },
        error: message,
      },
      { status: 502 }
    );
  }
}
