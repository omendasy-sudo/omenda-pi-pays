import { NextRequest, NextResponse } from "next/server";

const ADMIN_EMAIL = "omendaonline@gmail.com";
const ADMIN_PASSWORD = "P.b.o_@1988";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body?.email || "").trim().toLowerCase();
    const password = String(body?.password || "");

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { ok: false, message: "Invalid admin credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      ok: true,
      admin: {
        email: ADMIN_EMAIL,
        role: "super-admin",
      },
      token: "omenda-admin-session",
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body" },
      { status: 400 }
    );
  }
}
