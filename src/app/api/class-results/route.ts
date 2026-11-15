import { NextResponse } from 'next/server';
import axios from 'axios';
import { rateLimit, getClientIp } from '@/server/rate-limit';
import { getUpstreamHeaders } from '@/server/upstream';

export async function GET(request: Request) {
  const rl = rateLimit(getClientIp(request), { limit: 10, windowMs: 60_000 });
  if (!rl.success) {
    return NextResponse.json(
      { detail: 'Too many requests. Please slow down.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const rollNumber = searchParams.get('rollNumber');
    const type = searchParams.get('type') || 'academicresult';

    if (!rollNumber) {
      return NextResponse.json({ detail: "Roll number is required" }, { status: 422 });
    }

    // Calling the class results fetching which might take a bit longer
    const response = await axios.get(
      `https://jntuhresults.dhethi.com/api/getClassResults?rollNumber=${rollNumber}&type=${type}`,
      { timeout: 30000, headers: getUpstreamHeaders() }
    );

    return NextResponse.json(response.data, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') return NextResponse.json({ detail: "Request timed out. Fetching class results takes time." }, { status: 504 });
      if (error.response) return NextResponse.json(error.response.data, { status: error.response.status });
    }
    return NextResponse.json({ detail: "Failed to fetch class results" }, { status: 500 });
  }
}
