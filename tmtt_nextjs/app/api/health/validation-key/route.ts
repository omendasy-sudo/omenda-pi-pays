import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

function isHexString(value: string) {
  return /^[a-f0-9]+$/i.test(value);
}

export async function GET() {
  const envKey = (process.env.PI_VALIDATION_KEY || "").trim();
  const filePath = path.join(process.cwd(), "public", "validation-key.txt");

  let fileKey = "";
  let fileReadError: string | null = null;

  try {
    fileKey = (await fs.readFile(filePath, "utf8")).trim();
  } catch (error) {
    fileReadError = error instanceof Error ? error.message : "Unknown file read error";
  }

  const envPresent = envKey.length > 0;
  const filePresent = fileKey.length > 0;
  const keysMatch = envPresent && filePresent && envKey === fileKey;
  const looksValidFormat = envPresent && filePresent && isHexString(envKey) && envKey.length >= 120;
  const ok = envPresent && filePresent && keysMatch && looksValidFormat;

  return NextResponse.json({
    ok,
    checks: {
      envPresent,
      filePresent,
      keysMatch,
      looksValidFormat,
    },
    meta: {
      envLength: envKey.length,
      fileLength: fileKey.length,
      fileReadError,
    },
  });
}
