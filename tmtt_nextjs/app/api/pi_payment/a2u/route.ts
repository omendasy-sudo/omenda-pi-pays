import { NextRequest, NextResponse } from "next/server";
import * as StellarSdk from "@stellar/stellar-sdk";

const PI_API = "https://api.minepi.com/v2";

// Pi blockchain Horizon servers
const PI_HORIZON_MAINNET = "https://api.mainnet.minepi.com";
const PI_HORIZON_TESTNET = "https://api.testnet.minepi.com";

function getHorizonUrl() {
  return process.env.NEXT_PUBLIC_PI_SANDBOX === "true"
    ? PI_HORIZON_TESTNET
    : PI_HORIZON_MAINNET;
}

/**
 * Truncate a string to fit within maxBytes of UTF-8.
 */
function truncateToBytes(str: string, maxBytes: number): string {
  const buf = Buffer.from(str, "utf8");
  if (buf.length <= maxBytes) return str;
  // Walk back from maxBytes to avoid splitting a multi-byte char
  let end = maxBytes;
  while (end > 0 && (buf[end] & 0xc0) === 0x80) end--;
  return buf.subarray(0, end).toString("utf8");
}

/**
 * Build, sign, and submit a direct Stellar payment (for wallet address mode).
 */
async function sendDirectToWallet(
  destinationAddress: string,
  amount: string,
  memo: string,
  walletPrivateSeed: string
): Promise<string> {
  const horizonUrl = getHorizonUrl();
  const server = new StellarSdk.Horizon.Server(horizonUrl, { allowHttp: false });
  const keypair = StellarSdk.Keypair.fromSecret(walletPrivateSeed);
  const sourceAccount = await server.loadAccount(keypair.publicKey());

  const networkPassphrase = process.env.NEXT_PUBLIC_PI_SANDBOX === "true"
    ? "Pi Testnet"
    : "Pi Network";

  const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase,
  })
    .addOperation(
      StellarSdk.Operation.payment({
        destination: destinationAddress,
        asset: StellarSdk.Asset.native(),
        amount,
      })
    )
    .addMemo(StellarSdk.Memo.text(truncateToBytes(memo, 28)))
    .setTimeout(180)
    .build();

  transaction.sign(keypair);

  try {
    const result = await server.submitTransaction(transaction);
    return result.hash;
  } catch (err: unknown) {
    // Extract Horizon error details for debugging
    const horizonErr = err as { response?: { data?: { extras?: { result_codes?: unknown } } } };
    if (horizonErr?.response?.data?.extras?.result_codes) {
      console.error("[Pi][a2u] Horizon result_codes:", JSON.stringify(horizonErr.response.data.extras.result_codes));
    }
    throw err;
  }
}

/**
 * Build, sign, and submit a Stellar payment transaction to the Pi blockchain.
 * Follows the same flow as the PHP SDK's submitPayment method.
 */
async function submitPaymentToBlockchain(
  paymentId: string,
  apiKey: string,
  walletPrivateSeed: string
): Promise<string> {
  // 1. Get payment details from Pi API to find recipient address and amount
  const paymentRes = await fetch(`${PI_API}/payments/${paymentId}`, {
    headers: { Authorization: `Key ${apiKey}` },
  });
  if (!paymentRes.ok) {
    throw new Error(`Failed to get payment details: ${paymentRes.status}`);
  }
  const payment = await paymentRes.json();
  const toAddress = payment.to_address;
  const amount = String(payment.amount);

  if (!toAddress) {
    throw new Error("Payment has no recipient address (to_address)");
  }

  // 2. Build and submit the Stellar transaction
  const horizonUrl = getHorizonUrl();
  const server = new StellarSdk.Horizon.Server(horizonUrl, { allowHttp: false });
  const keypair = StellarSdk.Keypair.fromSecret(walletPrivateSeed);
  const sourceAccount = await server.loadAccount(keypair.publicKey());

  const networkPassphrase = process.env.NEXT_PUBLIC_PI_SANDBOX === "true"
    ? "Pi Testnet"
    : "Pi Network";

  const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase,
  })
    .addOperation(
      StellarSdk.Operation.payment({
        destination: toAddress,
        asset: StellarSdk.Asset.native(),
        amount,
      })
    )
    .addMemo(StellarSdk.Memo.text(paymentId.substring(0, 28)))
    .setTimeout(180)
    .build();

  transaction.sign(keypair);

  const result = await server.submitTransaction(transaction);
  // The transaction hash is the txid
  return result.hash;
}

/**
 * POST – Full A2U (App-to-User) payment flow.
 * Body: { uid, amount, memo, metadata? } OR { walletAddress, amount, memo, metadata? }
 *
 * Flow with UID (per official Pi SDK docs):
 * 1. Create payment via Pi Platform API
 * 2. Submit the payment to the Pi Blockchain (Stellar tx)
 * 3. Complete the payment via Pi Platform API
 *
 * Flow with walletAddress (direct Stellar transfer):
 * 1. Build and submit a Stellar transaction directly to the wallet
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

  const walletSeed = process.env.PI_WALLET_PRIVATE_SEED;
  if (!walletSeed) {
    console.error("[Pi][a2u] PI_WALLET_PRIVATE_SEED is not configured.");
    return NextResponse.json(
      { error: "Wallet private seed not configured on server." },
      { status: 503 }
    );
  }

  try {
    const { uid, walletAddress, amount, memo, metadata } = await req.json();

    if (!uid && !walletAddress) {
      return NextResponse.json({ error: "uid or walletAddress is required" }, { status: 400 });
    }
    const parsedAmount = Number(amount);
    if (!parsedAmount || parsedAmount <= 0 || parsedAmount > 1000) {
      return NextResponse.json(
        { error: "amount must be between 0.01 and 1000" },
        { status: 400 }
      );
    }

    // === Direct wallet address transfer (no Pi Platform API) ===
    if (walletAddress && typeof walletAddress === "string") {
      if (walletAddress.length !== 56 || !walletAddress.startsWith("G")) {
        return NextResponse.json(
          { error: "Invalid wallet address format" },
          { status: 400 }
        );
      }

      try {
        const txid = await sendDirectToWallet(
          walletAddress,
          String(parsedAmount),
          memo || "Direct transfer",
          walletSeed
        );
        console.log(`[Pi][a2u] Direct wallet transfer completed: ${txid}`);

        return NextResponse.json({
          success: true,
          txid,
          status: "completed",
          amount: parsedAmount,
          memo: memo || "Direct transfer",
          walletAddress,
          mode: "direct",
        });
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err);
        const horizonErr = err as { response?: { data?: { extras?: { result_codes?: unknown }; detail?: string } } };
        const resultCodes = horizonErr?.response?.data?.extras?.result_codes;
        const detail = resultCodes ? JSON.stringify(resultCodes) : errMsg;
        console.error(`[Pi][a2u] Direct transfer failed: ${detail}`);
        return NextResponse.json(
          { error: "Direct wallet transfer failed", detail },
          { status: 500 }
        );
      }
    }

    // === UID-based A2U via Pi Platform API ===
    if (!uid || typeof uid !== "string") {
      return NextResponse.json({ error: "uid is required" }, { status: 400 });
    }

    // Check for incomplete payments first
    let paymentId: string;

    try {
      const incompleteRes = await fetch(`${PI_API}/payments/incomplete_server_payments`, {
        headers: { Authorization: `Key ${apiKey}` },
      });
      if (incompleteRes.ok) {
        const incomplete = await incompleteRes.json();
        if (incomplete.incomplete_server_payments?.length > 0) {
          // Cancel all incomplete payments before creating a new one
          for (const p of incomplete.incomplete_server_payments) {
            try {
              await fetch(`${PI_API}/payments/${p.identifier}/cancel`, {
                method: "POST",
                headers: { Authorization: `Key ${apiKey}` },
              });
              console.log(`[Pi][a2u] Cancelled incomplete payment ${p.identifier}`);
            } catch {
              // ignore cancel errors
            }
          }
        }
      }
    } catch {
      // ignore incomplete check errors
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
    paymentId = payment.identifier;
    console.log(`[Pi][a2u] Payment created: ${paymentId}`);

    // Step 2 – Submit the payment to the Pi Blockchain
    let txid: string;
    try {
      txid = await submitPaymentToBlockchain(paymentId, apiKey, walletSeed);
      console.log(`[Pi][a2u] Transaction submitted: ${txid}`);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error(`[Pi][a2u] Submit failed: ${errMsg}`);

      // Check if error contains a txid (already submitted)
      try {
        const parsed = JSON.parse(errMsg);
        if (parsed.txid) {
          txid = parsed.txid;
        } else {
          return NextResponse.json(
            { error: "Failed to submit blockchain transaction", paymentId, detail: errMsg },
            { status: 500 }
          );
        }
      } catch {
        return NextResponse.json(
          { error: "Failed to submit blockchain transaction", paymentId, detail: errMsg },
          { status: 500 }
        );
      }
    }

    // Step 3 – Complete the payment
    const completeRes = await fetch(`${PI_API}/payments/${paymentId}/complete`, {
      method: "POST",
      headers: {
        Authorization: `Key ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ txid }),
    });

    if (!completeRes.ok) {
      const body = await completeRes.text();
      console.error(`[Pi][a2u] complete ${completeRes.status}: ${body}`);
      return NextResponse.json(
        { error: "Transaction submitted but completion failed", paymentId, txid, detail: body },
        { status: completeRes.status }
      );
    }

    const completedPayment = await completeRes.json();
    console.log(`[Pi][a2u] Payment completed: ${paymentId}, txid: ${txid}`);

    return NextResponse.json({
      success: true,
      paymentId,
      txid,
      status: "completed",
      amount: parsedAmount,
      memo: memo || "App-to-User payment",
      uid,
      payment: completedPayment,
    });
  } catch (err) {
    console.error("[Pi][a2u] error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

/**
 * GET – Check A2U payment status.
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
    return NextResponse.json(payment);
  } catch (err) {
    console.error("[Pi][a2u] status check error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
