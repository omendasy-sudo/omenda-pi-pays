import { NextRequest, NextResponse } from "next/server";
import { createTrustline } from "@/lib/tokenService";

export async function POST(req: NextRequest) {
  try {
    const { distributorSecret, issuerPublicKey } = await req.json();
    if (!distributorSecret || !issuerPublicKey) {
      return NextResponse.json({ error: "distributorSecret and issuerPublicKey are required" }, { status: 400 });
    }
    const hash = await createTrustline(distributorSecret, issuerPublicKey);
    return NextResponse.json({ message: `Trustline created. Tx hash: ${hash}` });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
