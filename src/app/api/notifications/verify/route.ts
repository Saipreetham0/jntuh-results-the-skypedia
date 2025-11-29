import { NextResponse } from 'next/server';
import { notificationSubscribersStorage } from '@/lib/notification-subscribers-storage';

/**
 * GET /api/notifications/verify?token=xxx&email=xxx
 * Verify notification subscription email
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) {
      return NextResponse.json(
        {
          error: "Verification token and email are required",
          success: false
        },
        { status: 400 }
      );
    }

    const decodedEmail = decodeURIComponent(email).toLowerCase();
    const subscription = notificationSubscribersStorage.get(decodedEmail);

    if (!subscription) {
      return NextResponse.json(
        {
          error: "Subscription not found. It may have expired or been removed.",
          success: false
        },
        { status: 404 }
      );
    }

    // Check if already verified
    if (subscription.verified) {
      return NextResponse.json({
        success: true,
        message: "Email already verified! You're all set to receive notifications.",
        alreadyVerified: true
      });
    }

    // Verify token
    if (subscription.verificationToken !== token) {
      return NextResponse.json(
        {
          error: "Invalid verification token",
          success: false
        },
        { status: 400 }
      );
    }

    // Update subscription
    subscription.verified = true;
    subscription.isActive = true;
    subscription.updatedAt = new Date().toISOString();
    notificationSubscribersStorage.set(decodedEmail, subscription);

    return NextResponse.json({
      success: true,
      message: "Email verified successfully! You'll now receive JNTUH notification alerts.",
      data: {
        email: subscription.email,
        verified: true,
        isActive: true
      }
    });

  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      {
        error: "Failed to verify subscription. Please try again.",
        success: false
      },
      { status: 500 }
    );
  }
}
