import { NextRequest, NextResponse } from "next/server";
import { Users } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role") as "user" | "admin" | "driver" | null;

  const result = role ? Users.getByRole(role) : Users.getAll();
  return NextResponse.json({ users: result, total: Users.count() });
}
