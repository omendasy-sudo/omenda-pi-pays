import { NextRequest, NextResponse } from 'next/server';
import { incompletePOST } from 'pi-sdk-nextjs';

export async function POST(req: NextRequest) {
  if (!process.env.PI_API_KEY || process.env.PI_API_KEY === 'your_pi_api_key_here') {
    console.warn('[Pi][incomplete] PI_API_KEY not configured — incomplete handler skipped.');
    return NextResponse.json({ ok: true, note: 'incomplete logged locally only' });
  }
  return incompletePOST(req);
}