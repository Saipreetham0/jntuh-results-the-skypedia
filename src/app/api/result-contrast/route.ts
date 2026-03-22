import { NextResponse } from 'next/server';
import axios from 'axios';
import { rateLimit, getClientIp } from '@/server/rate-limit';

export async function GET(request: Request) {
  const rl = rateLimit(getClientIp(request), { limit: 20, windowMs: 60_000 });
  if (!rl.success) {
    return NextResponse.json(
      { detail: 'Too many requests. Please slow down.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const rollNumber1 = searchParams.get('rollNumber1');
    const rollNumber2 = searchParams.get('rollNumber2');

    if (!rollNumber1 || !rollNumber2) {
      return NextResponse.json({ detail: "Both rollNumber1 and rollNumber2 are required" }, { status: 422 });
    }

    const response = await axios.get(
      `https://jntuhresults.dhethi.com/api/getResultContrast?rollNumber1=${rollNumber1}&rollNumber2=${rollNumber2}`,
      { timeout: 20000, headers: { 'User-Agent': 'JNTUHResultsPortal/1.0' } }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') return NextResponse.json({ detail: "Request timed out." }, { status: 504 });
      if (error.response) return NextResponse.json(error.response.data, { status: error.response.status });
    }
    return NextResponse.json({ detail: "Failed to fetch result contrast array" }, { status: 500 });
  }
}
