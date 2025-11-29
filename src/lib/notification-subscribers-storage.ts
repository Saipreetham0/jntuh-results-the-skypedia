/**
 * Shared storage for notification subscriptions
 *
 * IMPORTANT: This module provides a singleton Map instance that is shared across
 * the subscribe and verify API routes. This ensures that subscriptions created in
 * the subscribe route can be found in the verify route.
 *
 * DO NOT create separate Map instances in individual route files!
 */

export interface NotificationSubscription {
  id: string;
  email: string;
  verified: boolean;
  verificationToken: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Singleton storage instance
export const notificationSubscribersStorage = new Map<string, NotificationSubscription>();

// Log when storage is initialized
console.log('📦 Notification subscribers storage initialized');
