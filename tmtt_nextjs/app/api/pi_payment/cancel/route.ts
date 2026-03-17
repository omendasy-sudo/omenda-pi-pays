import { NextRequest, NextResponse } from "next/server";

const PI_API = "https://api.minepi.com/v2";

export async function POST(req: NextRequest) {
  const apiKey = process.env.PI_API_KEY;
  if (!apiKey || apiKey === "your_pi_api_key_here") {
    console.warn("[Pi][cancel] PI_API_KEY not configured — cancel logged locally only.");
    return NextResponse.json({ ok: true, note: "cancel logged locally only" });
  }

  try {
    const { paymentId } = await req.json();
    if (!paymentId) {
      return NextResponse.json({ error: "paymentId is required" }, { status: 400 });
    }

    const res = await fetch(`${PI_API}/payments/${paymentId}/cancel`, {
      method: "POST",
      headers: { Authorization: `Key ${apiKey}` },
    });

    const data = res.ok ? await res.json() : { cancelled: true };
    return NextResponse.json(data);
  } catch (err) {
    console.error("[Pi][cancel] error:", err);
    return NextResponse.json({ ok: true });
  }
}