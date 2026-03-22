import { NextResponse } from 'next/server';
import axios from 'axios';
import { rateLimit, getClientIp } from '@/server/rate-limit';

export async function GET(request: Request) {
  const rl = rateLimit(getClientIp(request), { limit: 30, windowMs: 60_000 });
  if (!rl.success) {
    return NextResponse.json(
      { detail: 'Too many requests. Please slow down.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const rollNumber = searchParams.get('rollNumber');

    if (!rollNumber) {
      return NextResponse.json({ detail: "Roll number is required" }, { status: 422 });
    }

    const response = await axios.get(
      `https://jntuhresults.dhethi.com/api/grace-marks/eligibility?rollNumber=${rollNumber}`,
      { timeout: 15000, headers: { 'User-Agent': 'JNTUHResultsPortal/1.0' } }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        return NextResponse.json({ detail: "Request timed out." }, { status: 504 });
      }
      if (error.response) {
        return NextResponse.json(error.response.data, { status: error.response.status });
      }
    }
    return NextResponse.json({ detail: "Failed to fetch grace marks eligibility" }, { status: 500 });
  }
}
