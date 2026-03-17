import { NextRequest, NextResponse } from "next/server";

const PI_API = "https://api.minepi.com/v2";

export async function POST(req: NextRequest) {
  const apiKey = process.env.PI_API_KEY;
  if (!apiKey || apiKey === "your_pi_api_key_here") {
    console.error("[Pi][complete] PI_API_KEY is not configured.");
    return NextResponse.json({ error: "Pi API key not configured on server." }, { status: 503 });
  }

  try {
    const { paymentId, txid } = await req.json();
    if (!paymentId || !txid) {
      return NextResponse.json({ error: "paymentId and txid are required" }, { status: 400 });
    }

    const res = await fetch(`${PI_API}/payments/${paymentId}/complete`, {
      method: "POST",
      headers: {
        Authorization: `Key ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ txid }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`[Pi][complete] ${res.status}: ${body}`);
      return NextResponse.json({ error: "Payment completion failed" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[Pi][complete] error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}