import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function readValidationKey() {
  const envKey = (process.env.PI_VALIDATION_KEY || "").trim();
  if (envKey) {
    return envKey;
  }

  const filePath = path.join(process.cwd(), "public", "validation-key.txt");
  try {
    const fileKey = (await fs.readFile(filePath, "utf8")).trim();
    return fileKey;
  } catch {
    return "";
  }
}

export async function GET() {
  const key = await readValidationKey();

  if (!key) {
    return new NextResponse("Validation key is not configured", {
      status: 503,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store",
      },
    });
  }

  return new NextResponse(key, {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
