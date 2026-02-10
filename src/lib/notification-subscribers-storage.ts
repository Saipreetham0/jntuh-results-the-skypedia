/**
 * Shared storage for notification subscriptions using Supabase
 * Replaces the previous in-memory Map implementation.
 */

import { createClient } from '@/lib/supabase/server';

export interface NotificationSubscription {
  id?: string;
  email: string;
  verified: boolean;
  verificationToken: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Get a subscription by email
 */
export async function getSubscription(email: string): Promise<NotificationSubscription | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('notification_subscriptions')
    .select('*')
    .eq('email', email.toLowerCase())
    .single();

  if (error) {
    // If error code is 'PGRST116' (row not found), return null
    if (error.code === 'PGRST116') return null;
    console.error('Error fetching subscription:', error);
    return null;
  }

  if (!data) return null;

  return {
    id: data.id,
    email: data.email,
    verified: data.verified,
    verificationToken: data.verification_token,
    isActive: data.is_active,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

/**
 * Create a new subscription
 */
export async function createSubscription(subscription: NotificationSubscription): Promise<boolean> {
  const supabase = await createClient();
  const { error } = await supabase
    .from('notification_subscriptions')
    .insert({
      email: subscription.email.toLowerCase(),
      verified: subscription.verified,
      verification_token: subscription.verificationToken,
      is_active: subscription.isActive,
      created_at: subscription.createdAt || new Date().toISOString(),
      updated_at: subscription.updatedAt || new Date().toISOString(),
    });

  if (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }

  return true;
}

/**
 * Update a subscription
 */
export async function updateSubscription(email: string, updates: Partial<NotificationSubscription>): Promise<boolean> {
  const supabase = await createClient();

  const updateData: any = {
    updated_at: new Date().toISOString()
  };

  if (updates.verified !== undefined) updateData.verified = updates.verified;
  if (updates.isActive !== undefined) updateData.is_active = updates.isActive;
  // Add other fields as needed

  const { error } = await supabase
    .from('notification_subscriptions')
    .update(updateData)
    .eq('email', email.toLowerCase());

  if (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }

  return true;
}
