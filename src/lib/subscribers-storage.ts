/**
 * Shared in-memory storage for result alert subscriptions
 *
 * ⚠️ WARNING: This is a temporary solution for development/demo
 * In production, replace this with a proper database (Supabase, MySQL, etc.)
 *
 * Limitations:
 * - Data is lost on server restart
 * - Not suitable for production
 * - No persistence
 * - Limited to single server instance
 */

export interface Subscription {
  id: string;
  rollNumber: string;
  email: string;
  phone?: string;
  notifyVia: ('email' | 'sms')[];
  semesters: string[];
  regulations: string[];
  isActive: boolean;
  verified: boolean;
  verificationToken?: string;
  createdAt: string;
  updatedAt: string;
}

// Singleton Map instance shared across all API routes
class SubscribersStorage {
  private static instance: SubscribersStorage;
  private subscribers: Map<string, Subscription>;

  private constructor() {
    this.subscribers = new Map();
    console.log('📦 Subscribers storage initialized');
  }

  static getInstance(): SubscribersStorage {
    if (!SubscribersStorage.instance) {
      SubscribersStorage.instance = new SubscribersStorage();
    }
    return SubscribersStorage.instance;
  }

  set(id: string, subscription: Subscription): void {
    this.subscribers.set(id, subscription);
    console.log(`✅ Subscription stored: ${id}`);
  }

  get(id: string): Subscription | undefined {
    const subscription = this.subscribers.get(id);
    console.log(`🔍 Subscription lookup: ${id} - ${subscription ? 'Found' : 'Not found'}`);
    return subscription;
  }

  has(id: string): boolean {
    return this.subscribers.has(id);
  }

  delete(id: string): boolean {
    return this.subscribers.delete(id);
  }

  getAll(): Subscription[] {
    return Array.from(this.subscribers.values());
  }

  getAllActive(): Subscription[] {
    return this.getAll().filter(sub => sub.isActive && sub.verified);
  }

  size(): number {
    return this.subscribers.size;
  }

  clear(): void {
    this.subscribers.clear();
  }
}

// Export singleton instance
export const subscribersStorage = SubscribersStorage.getInstance();
