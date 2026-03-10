import { NextRequest, NextResponse } from "next/server";
import { Users } from "@/lib/db";

const PI_API_URL = process.env.PI_API_URL || "https://api.minepi.com/v2";

export async function POST(req: NextRequest) {
  try {
    const { accessToken } = await req.json();

    if (!accessToken) {
      return NextResponse.json({ error: "Access token required" }, { status: 400 });
    }

    // Verify the access token with Pi Platform API
    const piResponse = await fetch(`${PI_API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!piResponse.ok) {
      return NextResponse.json({ error: "Invalid Pi access token" }, { status: 401 });
    }

    const piUser = await piResponse.json();

    // Upsert user in data store
    const user = Users.upsertByUid(piUser.uid, piUser.username);

    const response = NextResponse.json({
      user: {
        id: user.id,
        uid: user.uid,
        username: user.username,
        role: user.role,
        wallet: user.wallet,
      },
    });

    const secure = process.env.NODE_ENV === "production";
    const cookieOptions = {
      httpOnly: true,
      sameSite: "lax" as const,
      secure,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    };

    response.cookies.set("pi_uid", user.uid, cookieOptions);
    response.cookies.set("pi_role", user.role, cookieOptions);

    return response;
  } catch {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
