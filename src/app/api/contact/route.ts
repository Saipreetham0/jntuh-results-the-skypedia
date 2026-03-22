import { NextResponse } from "next/server";
import { Resend } from "resend";
import ContactFormEmail from "@/components/emails/contact-form-email";
import { rateLimit, getClientIp } from "@/server/rate-limit";

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const ALLOWED_ORIGINS = [
  'https://jntuhresults.theskypedia.com',
  process.env.NEXT_PUBLIC_SITE_URL,
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null,
].filter(Boolean) as string[];

export async function POST(request: Request) {
  const rl = rateLimit(getClientIp(request), { limit: 10, windowMs: 60_000 });
  if (!rl.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please slow down.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
    );
  }

  const origin = request.headers.get('origin');
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    // Check if Resend API is configured
    if (!resend) {
      return NextResponse.json(
        { error: "Email service is not configured. Please contact the administrator." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { fullName, email, message } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate types
    if (typeof fullName !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return NextResponse.json({ error: "Invalid field types" }, { status: 400 });
    }

    // Validate lengths
    if (fullName.length > 100 || email.length > 254 || message.length > 5000) {
      return NextResponse.json({ error: "One or more fields exceed maximum length" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: "JNTUH Results <onboarding@resend.dev>",
      to: ["info@theskypedia.com"],
      subject: `New Contact Form Message from ${fullName}`,
      react: ContactFormEmail({ name: fullName, email, message }),
    });

    return NextResponse.json({ success: true, data });
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
