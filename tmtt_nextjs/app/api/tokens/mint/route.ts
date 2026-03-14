import { NextRequest, NextResponse } from "next/server";
import { mintToken } from "@/lib/tokenService";

export async function POST(req: NextRequest) {
  try {
    const { issuerSecret, distributorPublicKey, amount } = await req.json();
    if (!issuerSecret || !distributorPublicKey || !amount) {
      return NextResponse.json(
        { error: "issuerSecret, distributorPublicKey, and amount are required" },
        { status: 400 }
      );
    }
    const hash = await mintToken(issuerSecret, distributorPublicKey, amount);
    return NextResponse.json({ message: `Tokens minted successfully. Tx hash: ${hash}` });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
