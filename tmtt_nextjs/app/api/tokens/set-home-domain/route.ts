import { NextRequest, NextResponse } from "next/server";
import { setHomeDomain } from "@/lib/tokenService";

export async function POST(req: NextRequest) {
  try {
    const { issuerSecret, domain } = await req.json();
    if (!issuerSecret || !domain) {
      return NextResponse.json({ error: "issuerSecret and domain are required" }, { status: 400 });
    }
    const hash = await setHomeDomain(issuerSecret, domain);
    return NextResponse.json({ message: `Home domain set to "${domain}". Tx hash: ${hash}` });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
