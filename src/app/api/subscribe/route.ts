import { NextResponse } from "next/server";
import { BrevoClient } from "@getbrevo/brevo";
import { rateLimit, getClientIp } from "@/server/rate-limit";

export const runtime = "nodejs";

const brevo = new BrevoClient({ apiKey: process.env.BREVO_API_KEY || '' });

const ALLOWED_ORIGINS = [
  'https://jntuhresults.theskypedia.com',
  process.env.NEXT_PUBLIC_SITE_URL,
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null,
].filter(Boolean) as string[];

export async function POST(request: Request) {
  const rl = rateLimit(getClientIp(request), { limit: 10, windowMs: 60_000 });
  if (!rl.success) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please slow down.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
    );
  }

  const origin = request.headers.get('origin');
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { email, listIds = [2] } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 254) {
      return NextResponse.json({ success: false, message: "Invalid email address" }, { status: 400 });
    }

    const data = await brevo.contacts.createContact({
      email,
      listIds,
      updateEnabled: true,
    });

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed!",
      data,
    });
  } catch (error) {
    if (error && typeof error === 'object' && 'body' in error) {
      const errBody = (error as any).body as { message?: string } | undefined;
      if (errBody?.message?.includes("Contact already exist")) {
        return NextResponse.json({
          success: false,
          message: "You're already subscribed!",
        }, { status: 400 });
      }
    }

    return NextResponse.json({
      success: false,
      message: "Failed to subscribe. Please try again later.",
    }, { status: 500 });
  }
}
