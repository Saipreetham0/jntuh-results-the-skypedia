import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { rateLimit, getClientIp } from '@/server/rate-limit';

export async function GET(request: Request) {
  const rl = rateLimit(getClientIp(request), { limit: 20, windowMs: 60_000 });
  if (!rl.success) {
    return NextResponse.json(
      { detail: 'Too many requests. Please slow down.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
    );
  }

  const { searchParams } = new URL(request.url);
  const upstream = new URLSearchParams();

  const page = searchParams.get('page') ?? '1';
  upstream.set('page', page);

  for (const key of ['regulation', 'degree', 'year', 'title'] as const) {
    const val = searchParams.get(key);
    if (val) upstream.set(key, val);
  }

  try {
    const response = await axios.get(
      `https://jntuhresults.dhethi.com/api/notifications?${upstream.toString()}`,
      { timeout: 15_000, headers: { 'User-Agent': 'JNTUHResultsPortal/1.0' } }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosErr = error as AxiosError;
      if (axiosErr.code === 'ECONNABORTED') {
        return NextResponse.json({ detail: 'Request timed out.' }, { status: 504 });
      }
      if (axiosErr.response) {
        return NextResponse.json(
          { detail: 'Upstream error.' },
          { status: axiosErr.response.status >= 400 ? axiosErr.response.status : 502 }
        );
      }
    }
    return NextResponse.json({ detail: 'Failed to fetch notifications.' }, { status: 500 });
  }
}
