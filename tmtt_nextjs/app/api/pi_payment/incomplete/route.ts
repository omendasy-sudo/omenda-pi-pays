import { NextRequest, NextResponse } from "next/server";

const PI_API = "https://api.minepi.com/v2";

export async function POST(req: NextRequest) {
  const apiKey = process.env.PI_API_KEY;
  if (!apiKey || apiKey === "your_pi_api_key_here") {
    console.warn("[Pi][incomplete] PI_API_KEY not configured — incomplete handler skipped.");
    return NextResponse.json({ ok: true, note: "incomplete logged locally only" });
  }

  try {
    const { paymentId } = await req.json();
    if (!paymentId) {
      return NextResponse.json({ error: "paymentId is required" }, { status: 400 });
    }

    // Try to complete the payment if it has a txid
    const getRes = await fetch(`${PI_API}/payments/${paymentId}`, {
      headers: { Authorization: `Key ${apiKey}` },
    });

    if (getRes.ok) {
      const payment = await getRes.json();
      if (payment.transaction?.txid && !payment.status?.developer_completed) {
        await fetch(`${PI_API}/payments/${paymentId}/complete`, {
          method: "POST",
          headers: {
            Authorization: `Key ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ txid: payment.transaction.txid }),
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Pi][incomplete] error:", err);
    return NextResponse.json({ ok: true });
  }
}