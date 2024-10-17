import { NextResponse } from "next/server";
import { Resend } from "resend";
import ContactFormEmail from "../../../components/emails/contact-form-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    const data = await resend.emails.send({
      from: "JNTUH Results <onboarding@resend.dev>",
      to: ["jntuhresults@theskypedia.com"],
      subject: `New Contact Form Message from ${name}`,
      react: ContactFormEmail({ name, email, message }),
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
