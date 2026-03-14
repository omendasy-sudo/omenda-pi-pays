import { NextRequest, NextResponse } from 'next/server';
import { cancelPOST } from 'pi-sdk-nextjs';

export async function POST(req: NextRequest) {
  if (!process.env.PI_API_KEY || process.env.PI_API_KEY === 'your_pi_api_key_here') {
    console.warn('[Pi][cancel] PI_API_KEY not configured — cancel not forwarded to Pi Servers.');
    return NextResponse.json({ ok: true, note: 'cancel logged locally only' });
  }
  return cancelPOST(req);
}