import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import crypto from 'crypto';
import { notificationSubscribersStorage } from '@/lib/notification-subscribers-storage';

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface NotificationSubscriptionRequest {
  email: string;
}

/**
 * POST /api/notifications/subscribe
 * Subscribe to JNTUH notification alerts
 */
export async function POST(request: Request) {
  try {
    // Check if Resend API is configured
    if (!resend) {
      return NextResponse.json(
        {
          error: "Email service is not configured. Please contact the administrator.",
          success: false
        },
        { status: 503 }
      );
    }

    const body: NotificationSubscriptionRequest = await request.json();

    // Validate email
    if (!body.email) {
      return NextResponse.json(
        {
          error: "Email is required",
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
          error: "Invalid email format",
          success: false
        },
        { status: 400 }
      );
    }

    const email = body.email.toLowerCase();

    // Check if already subscribed
    if (notificationSubscribersStorage.has(email)) {
      const existing = notificationSubscribersStorage.get(email);
      if (existing?.verified) {
        return NextResponse.json(
          {
            error: "This email is already subscribed and verified",
            success: false
          },
          { status: 400 }
        );
      }
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create subscription record
    const subscription = {
      id: email,
      email,
      verified: false,
      verificationToken,
      isActive: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Store subscription
    notificationSubscribersStorage.set(email, subscription);

    // Send verification email
    const verificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jntuhresults.theskypedia.com'}/notifications/verify?token=${verificationToken}&email=${encodeURIComponent(email)}`;

    try {
      await resend.emails.send({
        from: 'JNTUH Notifications <noreply@theskypedia.com>',
        to: email,
        subject: 'Verify Your Notification Subscription - JNTUH Results',
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 28px;">📧 Verify Your Email</h1>
    <p style="color: #e8efff; margin: 10px 0 0 0; font-size: 14px;">JNTUH Notification Alerts</p>
  </div>

  <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
    <p style="font-size: 16px; margin-bottom: 20px;">Hi there! 👋</p>

    <p style="font-size: 16px; margin-bottom: 20px;">
      You've subscribed to receive JNTUH notification alerts at <strong>${email}</strong>.
    </p>

    <div style="background: #f8f9fa; border-left: 4px solid #6366f1; padding: 20px; margin: 25px 0; border-radius: 4px;">
      <h3 style="margin: 0 0 15px 0; color: #6366f1; font-size: 18px;">📋 What you'll receive:</h3>
      <ul style="margin: 0; padding-left: 20px;">
        <li style="margin-bottom: 8px;">Exam schedule updates</li>
        <li style="margin-bottom: 8px;">Result announcements</li>
        <li style="margin-bottom: 8px;">Important university notifications</li>
        <li style="margin-bottom: 8px;">Academic calendar changes</li>
      </ul>
    </div>

    <p style="font-size: 16px; margin-bottom: 25px;">
      To activate your subscription and start receiving notifications, please verify your email address by clicking the button below:
    </p>

    <div style="text-align: center; margin: 35px 0;">
      <a href="${verificationUrl}"
         style="background: #6366f1; color: white; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px rgba(99, 102, 241, 0.3);">
        ✅ Verify Email Address
      </a>
    </div>

    <p style="font-size: 14px; color: #666; margin-top: 30px;">
      Or copy and paste this link in your browser:<br>
      <a href="${verificationUrl}" style="color: #6366f1; word-break: break-all;">${verificationUrl}</a>
    </p>

    <div style="background: #fff3cd; border: 1px solid #ffd966; padding: 15px; border-radius: 6px; margin-top: 25px;">
      <p style="margin: 0; font-size: 14px; color: #856404;">
        ⚠️ <strong>Note:</strong> This verification link will expire in 24 hours.
      </p>
    </div>

    <div style="border-top: 2px solid #e0e0e0; margin-top: 40px; padding-top: 25px;">
      <h3 style="color: #6366f1; font-size: 18px; margin-bottom: 15px;">✨ What happens next?</h3>
      <ul style="padding-left: 20px; margin: 0;">
        <li style="margin-bottom: 10px;">Once verified, you'll receive instant email notifications</li>
        <li style="margin-bottom: 10px;">We monitor JNTUH announcements continuously</li>
        <li style="margin-bottom: 10px;">You can unsubscribe anytime</li>
        <li>Your email is secure and will never be shared</li>
      </ul>
    </div>
  </div>

  <div style="text-align: center; padding: 25px 20px; color: #666; font-size: 13px;">
    <p style="margin: 0 0 10px 0;">
      This email was sent to ${email}<br>
      If you didn't request this, you can safely ignore this email.
    </p>
    <p style="margin: 15px 0 5px 0; color: #999;">
      © 2025 JNTUH Results - The Skypedia. All rights reserved.
    </p>
    <p style="margin: 5px 0;">
      <a href="https://jntuhresults.theskypedia.com" style="color: #6366f1; text-decoration: none;">Visit Website</a> •
      <a href="https://jntuhresults.theskypedia.com/contact" style="color: #6366f1; text-decoration: none;">Contact Us</a>
    </p>
  </div>
</body>
</html>
        `,
        text: `
JNTUH Notification Alerts - Verify Your Email

Hi there!

You've subscribed to receive JNTUH notification alerts at ${email}.

What you'll receive:
- Exam schedule updates
- Result announcements
- Important university notifications
- Academic calendar changes

To activate your subscription, please verify your email address by clicking this link:
${verificationUrl}

This verification link will expire in 24 hours.

What happens next?
- Once verified, you'll receive instant email notifications
- We monitor JNTUH announcements continuously
- You can unsubscribe anytime
- Your email is secure and will never be shared

If you didn't request this, you can safely ignore this email.

© 2025 JNTUH Results - The Skypedia
Visit: https://jntuhresults.theskypedia.com
        `
      });
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      return NextResponse.json(
        {
          error: "Failed to send verification email. Please check your email address.",
          success: false
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Subscription created! Please check your email to verify.",
      data: {
        email,
        requiresVerification: true
      }
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      {
        error: "Failed to create subscription. Please try again.",
        success: false
      },
      { status: 500 }
    );
  }
}
