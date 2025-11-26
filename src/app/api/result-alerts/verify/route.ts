import { NextResponse } from 'next/server';
import { subscribersStorage } from '@/lib/subscribers-storage';

/**
 * GET /api/result-alerts/verify?token=xxx&id=xxx
 * Verify email and activate subscription
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const subscriptionId = searchParams.get('id');

    if (!token || !subscriptionId) {
      return NextResponse.json(
        {
          detail: "Invalid verification link",
          success: false
        },
        { status: 400 }
      );
    }

    // Get subscription from storage
    const subscription = subscribersStorage.get(subscriptionId);

    if (!subscription) {
      return NextResponse.json(
        {
          detail: "Subscription not found. It may have expired or been deleted.",
          success: false
        },
        { status: 404 }
      );
    }

    // Check if already verified
    if (subscription.verified) {
      return NextResponse.json({
        success: true,
        message: "Email already verified!",
        alreadyVerified: true
      });
    }

    // Verify token
    if (subscription.verificationToken !== token) {
      return NextResponse.json(
        {
          detail: "Invalid verification token",
          success: false
        },
        { status: 400 }
      );
    }

    // Check token expiry (24 hours)
    const createdAt = new Date(subscription.createdAt);
    const now = new Date();
    const hoursSinceCreation = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

    if (hoursSinceCreation > 24) {
      return NextResponse.json(
        {
          detail: "Verification link has expired. Please subscribe again.",
          success: false,
          expired: true
        },
        { status: 400 }
      );
    }

    // Activate subscription
    subscription.verified = true;
    subscription.isActive = true;
    subscription.updatedAt = new Date().toISOString();
    subscription.verificationToken = undefined; // Remove token after verification

    // Update in storage
    subscribersStorage.set(subscriptionId, subscription);

    return NextResponse.json({
      success: true,
      message: "Email verified successfully! You'll now receive result notifications.",
      data: {
        rollNumber: subscription.rollNumber,
        email: subscription.email,
        notifyVia: subscription.notifyVia
      }
    });

  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      {
        detail: "Failed to verify email. Please try again.",
        success: false
      },
      { status: 500 }
    );
  }
}
