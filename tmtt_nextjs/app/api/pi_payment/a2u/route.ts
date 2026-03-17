import { NextRequest, NextResponse } from "next/server";

const PI_API = "https://api.minepi.com/v2";

/**
 * POST – Create an App-to-User (A2U) payment.
 * Body: { uid, amount, memo, metadata? }
 *
 * Flow:
 * 1. Create payment via Pi Platform API
 * 2. Approve the payment server-side
 * 3. Return payment info (blockchain tx is processed by Pi Network)
 */
export async function POST(req: NextRequest) {
  const apiKey = process.env.PI_API_KEY;
  if (!apiKey || apiKey === "your_pi_api_key_here") {
    console.error("[Pi][a2u] PI_API_KEY is not configured.");
    return NextResponse.json(
      { error: "Pi API key not configured on server." },
      { status: 503 }
    );
  }

  try {
    const { uid, amount, memo, metadata } = await req.json();

    if (!uid || typeof uid !== "string") {
      return NextResponse.json({ error: "uid is required" }, { status: 400 });
    }
    const parsedAmount = Number(amount);
    if (!parsedAmount || parsedAmount <= 0 || parsedAmount > 1000) {
      return NextResponse.json(
        { error: "amount must be between 0.01 and 1000" },
        { status: 400 }
      );
    }

    // Step 1 – Create A2U payment on Pi Platform
    const createRes = await fetch(`${PI_API}/payments`, {
      method: "POST",
      headers: {
        Authorization: `Key ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payment: {
          amount: parsedAmount,
          memo: memo || "App-to-User payment",
          metadata: metadata || {},
          uid,
        },
      }),
    });

    if (!createRes.ok) {
      const body = await createRes.text();
      console.error(`[Pi][a2u] create ${createRes.status}: ${body}`);
      return NextResponse.json(
        { error: "Failed to create A2U payment", detail: body },
        { status: createRes.status }
      );
    }

    const payment = await createRes.json();
    const paymentId = payment.identifier;

    // Step 2 – Approve the payment server-side
    const approveRes = await fetch(`${PI_API}/payments/${paymentId}/approve`, {
      method: "POST",
      headers: { Authorization: `Key ${apiKey}` },
    });

    if (!approveRes.ok) {
      const body = await approveRes.text();
      console.error(`[Pi][a2u] approve ${approveRes.status}: ${body}`);
      return NextResponse.json(
        { error: "Payment created but approval failed", paymentId, detail: body },
        { status: approveRes.status }
      );
    }

    // Step 3 – Return payment info. The Pi blockchain will process the tx.
    // The client should poll GET /api/pi_payment/a2u?paymentId=xxx to check status.
    return NextResponse.json({
      success: true,
      paymentId,
      status: "approved",
      amount: parsedAmount,
      memo: memo || "App-to-User payment",
      uid,
    });
  } catch (err) {
    console.error("[Pi][a2u] error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

/**
 * GET – Check A2U payment status; auto-complete if blockchain tx exists.
 * Query: ?paymentId=xxx
 */
export async function GET(req: NextRequest) {
  const apiKey = process.env.PI_API_KEY;
  if (!apiKey || apiKey === "your_pi_api_key_here") {
    return NextResponse.json(
      { error: "Pi API key not configured on server." },
      { status: 503 }
    );
  }

  const paymentId = req.nextUrl.searchParams.get("paymentId");
  if (!paymentId) {
    return NextResponse.json({ error: "paymentId query param is required" }, { status: 400 });
  }

  try {
    // Fetch current payment status from Pi Platform
    const statusRes = await fetch(`${PI_API}/payments/${paymentId}`, {
      headers: { Authorization: `Key ${apiKey}` },
    });

    if (!statusRes.ok) {
      const body = await statusRes.text();
      return NextResponse.json(
        { error: "Failed to fetch payment status", detail: body },
        { status: statusRes.status }
      );
    }

    const payment = await statusRes.json();

    // Auto-complete if blockchain tx exists but developer hasn't completed yet
    if (
      payment.transaction?.txid &&
      !payment.status?.developer_completed
    ) {
      const completeRes = await fetch(`${PI_API}/payments/${paymentId}/complete`, {
        method: "POST",
        headers: {
          Authorization: `Key ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ txid: payment.transaction.txid }),
      });

      if (completeRes.ok) {
        const completed = await completeRes.json();
        return NextResponse.json({
          ...completed,
          auto_completed: true,
        });
      }
    }

    return NextResponse.json(payment);
  } catch (err) {
    console.error("[Pi][a2u] status check error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
