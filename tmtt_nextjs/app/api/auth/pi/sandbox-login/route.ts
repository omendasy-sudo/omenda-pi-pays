import { NextRequest, NextResponse } from "next/server";
import { Users } from "@/lib/db";

function isTruthy(value: string | undefined) {
  return value === "1" || value === "true" || value === "yes";
}

export async function POST(req: NextRequest) {
  const isSandbox = process.env.NEXT_PUBLIC_PI_SANDBOX === "true";
  const allowSandboxLogin = isTruthy(process.env.PI_ALLOW_SANDBOX_TEST_LOGIN);

  if (!isSandbox || !allowSandboxLogin) {
    return NextResponse.json({ error: "Sandbox test login disabled" }, { status: 403 });
  }

  const body = (await req.json().catch(() => ({}))) as {
    uid?: string;
    username?: string;
    role?: "user" | "admin" | "driver";
  };

  const uid = (body.uid || "pi_admin_001").trim();
  const username = (body.username || "sandbox_admin").trim();
  const role = body.role || "admin";

  if (!uid || !username) {
    return NextResponse.json({ error: "uid and username are required" }, { status: 400 });
  }

  const user = Users.upsertByUid(uid, username);
  user.role = role;

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
    maxAge: 60 * 60 * 24,
  };

  response.cookies.set("pi_uid", user.uid, cookieOptions);
  response.cookies.set("pi_role", user.role, cookieOptions);

  return response;
}
