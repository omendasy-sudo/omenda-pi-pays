import { NextRequest, NextResponse } from 'next/server';
import { approvePOST } from 'pi-sdk-nextjs';

export async function POST(req: NextRequest) {
  if (!process.env.PI_API_KEY || process.env.PI_API_KEY === 'your_pi_api_key_here') {
    console.error('[Pi][approve] PI_API_KEY is not configured. Set it in .env.local or .env.production.');
    return NextResponse.json({ error: 'Pi API key not configured on server.' }, { status: 503 });
  }
  return approvePOST(req);
}