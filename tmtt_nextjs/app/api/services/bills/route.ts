import { NextRequest, NextResponse } from "next/server";
import { BillProviders, Orders } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  const result = category && category !== "all"
    ? BillProviders.getByCategory(category as "electricity" | "water" | "internet" | "tv" | "phone" | "insurance")
    : BillProviders.getAll();

  return NextResponse.json({ providers: result });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { providerId, accountNumber, customerName, amount, phone, userId, username } = body;

  if (!providerId || !accountNumber || !amount) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const provider = BillProviders.getById(providerId);
  if (!provider) {
    return NextResponse.json({ error: "Provider not found" }, { status: 404 });
  }

  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  const serviceFee = 1.0;
  const total = parsedAmount + serviceFee;

  const order = Orders.create({
    userId: userId || "guest",
    username: username || customerName || "Guest",
    serviceType: "bill",
    itemId: providerId,
    itemName: provider.name,
    amount: parsedAmount,
    serviceFee,
    total,
    status: "completed",
    details: { accountNumber, provider: provider.name, category: provider.category, phone: phone || "" },
  });

  return NextResponse.json({ payment: order }, { status: 201 });
}
