import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import crypto from 'crypto';
import { subscribersStorage } from '@/lib/subscribers-storage';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SubscriptionRequest {
  rollNumber: string;
  email: string;
  phone?: string;
  notifyVia: ('email' | 'sms')[];
  semesters?: string[];
  regulations?: string[];
}

/**
 * POST /api/result-alerts/subscribe
 * Subscribe to result notifications
 */
export async function POST(request: Request) {
  try {
    const body: SubscriptionRequest = await request.json();

    // Validate required fields
    if (!body.rollNumber || !body.email) {
      return NextResponse.json(
        {
          detail: "Roll number and email are required",
          success: false
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        {
          detail: "Invalid email format",
          success: false
        },
        { status: 400 }
      );
    }

    // Validate roll number format (basic validation)
    const rollNumberRegex = /^[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{4}$/;
    if (!rollNumberRegex.test(body.rollNumber)) {
      return NextResponse.json(
        {
          detail: "Invalid roll number format. Expected pattern: 20J25A0501",
          success: false
        },
        { status: 400 }
      );
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const subscriptionId = `${body.rollNumber}-${body.email}`;

    // Create subscription record
    const subscription = {
      id: subscriptionId,
      rollNumber: body.rollNumber.toUpperCase(),
      email: body.email.toLowerCase(),
      phone: body.phone,
      notifyVia: body.notifyVia || ['email'],
      semesters: body.semesters || ['all'],
      regulations: body.regulations || ['R22', 'R20', 'R18'],
      isActive: false, // Will be activated after email verification
      verified: false,
      verificationToken,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Store subscription (replace with database in production)
    subscribersStorage.set(subscriptionId, subscription);

    // Send verification email
    const verificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jntuhresults.theskypedia.com'}/result-alerts/verify?token=${verificationToken}&id=${encodeURIComponent(subscriptionId)}`;

    try {
      await resend.emails.send({
        from: 'JNTUH Results <noreply@theskypedia.com>',
        to: body.email,
        subject: 'Verify Your Result Alert Subscription - JNTUH Results',
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #1C61E7 0%, #1a56d1 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 28px;">📧 Verify Your Email</h1>
    <p style="color: #e8f0ff; margin: 10px 0 0 0; font-size: 14px;">JNTUH Result Alerts</p>
  </div>

  <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
    <p style="font-size: 16px; margin-bottom: 20px;">Hi there! 👋</p>

    <p style="font-size: 16px; margin-bottom: 20px;">
      You've subscribed to receive result notifications for roll number <strong>${body.rollNumber}</strong>.
    </p>

    <div style="background: #f8f9fa; border-left: 4px solid #1C61E7; padding: 20px; margin: 25px 0; border-radius: 4px;">
      <h3 style="margin: 0 0 15px 0; color: #1C61E7; font-size: 18px;">📋 Subscription Details:</h3>
      <ul style="margin: 0; padding-left: 20px;">
        <li style="margin-bottom: 8px;"><strong>Roll Number:</strong> ${body.rollNumber}</li>
        <li style="margin-bottom: 8px;"><strong>Email:</strong> ${body.email}</li>
        <li style="margin-bottom: 8px;"><strong>Notify via:</strong> ${body.notifyVia?.join(', ') || 'Email'}</li>
        <li style="margin-bottom: 8px;"><strong>Regulations:</strong> ${body.regulations?.join(', ') || 'All'}</li>
      </ul>
    </div>

    <p style="font-size: 16px; margin-bottom: 25px;">
      To activate your subscription and start receiving result alerts, please verify your email address by clicking the button below:
    </p>

    <div style="text-align: center; margin: 35px 0;">
      <a href="${verificationUrl}"
         style="background: #1C61E7; color: white; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px rgba(28, 97, 231, 0.3);">
        ✅ Verify Email Address
      </a>
    </div>

    <p style="font-size: 14px; color: #666; margin-top: 30px;">
      Or copy and paste this link in your browser:<br>
      <a href="${verificationUrl}" style="color: #1C61E7; word-break: break-all;">${verificationUrl}</a>
    </p>

    <div style="background: #fff3cd; border: 1px solid #ffd966; padding: 15px; border-radius: 6px; margin-top: 25px;">
      <p style="margin: 0; font-size: 14px; color: #856404;">
        ⚠️ <strong>Note:</strong> This verification link will expire in 24 hours.
      </p>
    </div>

    <div style="border-top: 2px solid #e0e0e0; margin-top: 40px; padding-top: 25px;">
      <h3 style="color: #1C61E7; font-size: 18px; margin-bottom: 15px;">✨ What happens next?</h3>
      <ul style="padding-left: 20px; margin: 0;">
        <li style="margin-bottom: 10px;">Once verified, you'll receive instant notifications when results are declared</li>
        <li style="margin-bottom: 10px;">We check for new results every 15 minutes</li>
        <li style="margin-bottom: 10px;">You can manage or unsubscribe anytime</li>
        <li>Your data is secure and will never be shared</li>
      </ul>
    </div>
  </div>

  <div style="text-align: center; padding: 25px 20px; color: #666; font-size: 13px;">
    <p style="margin: 0 0 10px 0;">
      This email was sent to ${body.email}<br>
      If you didn't request this, you can safely ignore this email.
    </p>
    <p style="margin: 15px 0 5px 0; color: #999;">
      © 2025 JNTUH Results - The Skypedia. All rights reserved.
    </p>
    <p style="margin: 5px 0;">
      <a href="https://jntuhresults.theskypedia.com" style="color: #1C61E7; text-decoration: none;">Visit Website</a> •
      <a href="https://jntuhresults.theskypedia.com/contact" style="color: #1C61E7; text-decoration: none;">Contact Us</a>
    </p>
  </div>
</body>
</html>
        `,
        text: `
JNTUH Result Alerts - Verify Your Email

Hi there!

You've subscribed to receive result notifications for roll number ${body.rollNumber}.

Subscription Details:
- Roll Number: ${body.rollNumber}
- Email: ${body.email}
- Notify via: ${body.notifyVia?.join(', ') || 'Email'}
- Regulations: ${body.regulations?.join(', ') || 'All'}

To activate your subscription, please verify your email address by clicking this link:
${verificationUrl}

This verification link will expire in 24 hours.

What happens next?
- Once verified, you'll receive instant notifications when results are declared
- We check for new results every 15 minutes
- You can manage or unsubscribe anytime
- Your data is secure and will never be shared

If you didn't request this, you can safely ignore this email.

© 2025 JNTUH Results - The Skypedia
Visit: https://jntuhresults.theskypedia.com
        `
      });
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      return NextResponse.json(
        {
          detail: "Failed to send verification email. Please check your email address.",
          success: false
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Subscription created! Please check your email to verify.",
      data: {
        subscriptionId,
        rollNumber: body.rollNumber,
        email: body.email,
        requiresVerification: true
      }
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      {
        detail: "Failed to create subscription. Please try again.",
        success: false
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/result-alerts/subscribe?rollNumber=xxx
 * Check if user is already subscribed
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rollNumber = searchParams.get('rollNumber');
    const email = searchParams.get('email');

    if (!rollNumber || !email) {
      return NextResponse.json(
        { detail: "Roll number and email are required" },
        { status: 400 }
      );
    }

    const subscriptionId = `${rollNumber}-${email}`;
    const subscription = subscribersStorage.get(subscriptionId);

    if (subscription) {
      return NextResponse.json({
        subscribed: true,
        verified: subscription.verified,
        isActive: subscription.isActive,
        createdAt: subscription.createdAt
      });
    }

    return NextResponse.json({
      subscribed: false
    });

  } catch (error) {
    console.error('Check subscription error:', error);
    return NextResponse.json(
      { detail: "Failed to check subscription status" },
      { status: 500 }
    );
  }
}
