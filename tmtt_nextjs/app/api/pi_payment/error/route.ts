import { NextRequest, NextResponse } from 'next/server';
import { errorPOST } from 'pi-sdk-nextjs';

export async function POST(req: NextRequest) {
  if (!process.env.PI_API_KEY || process.env.PI_API_KEY === 'your_pi_api_key_here') {
    console.warn('[Pi][error] PI_API_KEY not configured — error not forwarded to Pi Servers.');
    return NextResponse.json({ ok: true, note: 'error logged locally only' });
  }
  return errorPOST(req);
}