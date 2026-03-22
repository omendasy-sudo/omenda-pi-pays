import { NextRequest, NextResponse } from "next/server";
import { Markers } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const filter = searchParams.get("filter") || "all";
  const search = (searchParams.get("search") || "").toLowerCase();

  // Seed markers from in-memory store
  const seedMarkers = Markers.getAll();

  // Fetch live markers from PHP backend
  let liveMarkers: Array<{
    id: number; name: string; lat: number; lng: number;
    type: string; city: string; desc: string;
    users: number; txns: number; category: string;
    live?: boolean; image?: string;
  }> = [];

  try {
    const backendUrl = process.env.PHP_BACKEND_URL || "";
    if (backendUrl) {
      const params = new URLSearchParams({ filter, search });
      const res = await fetch(`${backendUrl}/map_data.php?${params}`, {
        next: { revalidate: 60 },
      });
      if (res.ok) {
        const data = await res.json();
        liveMarkers = data.live || [];
      }
    }
  } catch {
    // PHP backend unavailable — just use seed data
  }

  return NextResponse.json({
    markers: seedMarkers,
    live: liveMarkers,
    total: seedMarkers.length + liveMarkers.length,
  });
}
