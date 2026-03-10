import { NextRequest, NextResponse } from "next/server";
import { Dashboard, Orders } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const view = searchParams.get("view");

  if (view === "orders") {
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status") as "pending" | "confirmed" | "completed" | "cancelled" | null;
    const orders = status ? Orders.getByStatus(status) : Orders.getRecent(limit);
    return NextResponse.json({ orders, total: Orders.count() });
  }

  if (view === "services") {
    return NextResponse.json({ services: Dashboard.getTopServices() });
  }

  // Full dashboard stats
  return NextResponse.json(Dashboard.getStats());
}
