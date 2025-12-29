import { NextResponse } from "next/server";
import { Resend } from "resend";
import ContactFormEmail from "@/components/emails/contact-form-email";

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
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

    const data = await resend.emails.send({
      from: "JNTUH Results <onboarding@resend.dev>",
      to: ["jntuhresults@theskypedia.com"],
      subject: `New Contact Form Message from ${fullName}`,
      react: ContactFormEmail({ name: fullName, email, message }),
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
