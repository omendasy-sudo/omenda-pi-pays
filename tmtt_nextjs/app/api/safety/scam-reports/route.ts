import { NextRequest, NextResponse } from "next/server";

// Lightweight in-memory rate limit by IP (per runtime instance)
const ipHits = new Map<string, { count: number; resetAt: number }>();

function getIp(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const maxHits = 20;
  const current = ipHits.get(ip);

  if (!current || current.resetAt <= now) {
    ipHits.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (current.count >= maxHits) {
    return false;
  }

  current.count += 1;
  ipHits.set(ip, current);
  return true;
}

function makeCaseId() {
  const stamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `SCAM-${stamp}-${rand}`;
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();

    const reporter = String(body?.reporter || "").trim().slice(0, 80);
    const contact = String(body?.contact || "").trim().slice(0, 120);
    const suspect = String(body?.suspect || "").trim().slice(0, 120);
    const wallet = String(body?.wallet || "").trim().slice(0, 160);
    const type = String(body?.type || "").trim().slice(0, 80);
    const incidentDate = String(body?.incidentDate || "").trim().slice(0, 20);
    const evidence = String(body?.evidence || "").trim().slice(0, 400);
    const details = String(body?.details || "").trim().slice(0, 5000);

    if (!suspect || !type || !incidentDate || !details) {
      return NextResponse.json(
        { ok: false, error: "suspect, type, incidentDate, and details are required" },
        { status: 400 }
      );
    }

    const caseId = makeCaseId();

    const payload = {
      caseId,
      receivedAt: new Date().toISOString(),
      reporter,
      contact,
      suspect,
      wallet,
      type,
      incidentDate,
      evidence,
      details,
      ip,
      userAgent: req.headers.get("user-agent") || "unknown",
    };

    // Log to server output so reports are still captured without a database.
    // In production, forward this to DB/queue or webhook.
    console.log("[Safety][ScamReport]", JSON.stringify(payload));

    const webhook = process.env.SCAM_REPORT_WEBHOOK_URL;
    if (webhook) {
      try {
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.warn("[Safety][ScamReport] webhook forward failed");
      }
    }

    return NextResponse.json({
      ok: true,
      caseId,
      message: "Report received. Our safety team will review it.",
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }
}
