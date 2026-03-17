import { NextRequest, NextResponse } from "next/server";

const PI_API = "https://api.minepi.com/v2";

export async function POST(req: NextRequest) {
  const apiKey = process.env.PI_API_KEY;
  if (!apiKey || apiKey === "your_pi_api_key_here") {
    console.error("[Pi][approve] PI_API_KEY is not configured.");
    return NextResponse.json({ error: "Pi API key not configured on server." }, { status: 503 });
  }

  try {
    const { paymentId } = await req.json();
    if (!paymentId) {
      return NextResponse.json({ error: "paymentId is required" }, { status: 400 });
    }

    const res = await fetch(`${PI_API}/payments/${paymentId}/approve`, {
      method: "POST",
      headers: { Authorization: `Key ${apiKey}` },
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`[Pi][approve] ${res.status}: ${body}`);
      return NextResponse.json({ error: "Payment approval failed" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[Pi][approve] error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}