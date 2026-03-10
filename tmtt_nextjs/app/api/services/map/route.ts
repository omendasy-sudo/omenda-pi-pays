import { NextResponse } from "next/server";
import { Markers } from "@/lib/db";

export async function GET() {
  return NextResponse.json({ markers: Markers.getAll(), total: Markers.count() });
}
