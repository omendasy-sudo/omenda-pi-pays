import { NextRequest, NextResponse } from "next/server";
import { getBalances } from "@/lib/tokenService";

export async function GET(req: NextRequest) {
  const account = req.nextUrl.searchParams.get("account");
  if (!account) {
    return NextResponse.json({ error: "account query parameter is required" }, { status: 400 });
  }
  try {
    const balances = await getBalances(account);
    return NextResponse.json(balances);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
