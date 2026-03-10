import { NextRequest, NextResponse } from "next/server";

type ScamStatus = "active" | "blocked";

type ScamRecord = {
  id: string;
  user: string;
  reason: string;
  risk: "Low" | "Medium" | "High";
  status: ScamStatus;
};

const moderationRecords: ScamRecord[] = [
  { id: "mod-1", user: "@ScamWallet1", reason: "Fake payment proof", risk: "High", status: "blocked" },
  { id: "mod-2", user: "@OfferHunter", reason: "Suspicious listings", risk: "Medium", status: "active" },
  { id: "mod-3", user: "@PiCloneStore", reason: "Identity spoofing", risk: "High", status: "active" },
];

export async function GET() {
  return NextResponse.json({ records: moderationRecords, total: moderationRecords.length });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const id = String(body?.id || "");
    const action = String(body?.action || "");

    if (action === "unblock-all") {
      for (const row of moderationRecords) row.status = "active";
      return NextResponse.json({ ok: true, records: moderationRecords });
    }

    const row = moderationRecords.find((r) => r.id === id);
    if (!row) {
      return NextResponse.json({ ok: false, message: "Moderation record not found" }, { status: 404 });
    }

    if (action === "block") row.status = "blocked";
    if (action === "unblock") row.status = "active";

    if (action !== "block" && action !== "unblock") {
      return NextResponse.json({ ok: false, message: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ ok: true, record: row, records: moderationRecords });
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body" }, { status: 400 });
  }
}
