# Notification Subscription Storage

## Current Implementation (In-Memory)

The notification subscription data is currently stored **in-memory** using a Map instance in:
```
src/lib/notification-subscribers-storage.ts
```

### Data Structure
```typescript
{
  id: string;              // Email address (lowercase)
  email: string;           // User's email
  verified: boolean;       // Email verification status
  verificationToken: string; // Verification token
  isActive: boolean;       // Subscription active status
  createdAt: string;       // ISO timestamp
  updatedAt: string;       // ISO timestamp
}
```

### Current Storage Location
- **Type**: In-memory Map
- **Persistence**: ❌ None (data lost on server restart)
- **Shared across**: Subscribe and Verify API routes via singleton pattern

---

## ⚠️ Limitations of Current Storage

1. **Data Loss**: All subscriptions are lost when the server restarts
2. **No Scalability**: Doesn't work with multiple server instances
3. **No Persistence**: Cannot recover data after crashes
4. **Production Unsuitable**: Not recommended for production use

---

## Migration to Database (Recommended)

### Option 1: Supabase (PostgreSQL) - RECOMMENDED

You already have Supabase configured in the project. Create a table:

```sql
-- Create notification_subscriptions table
CREATE TABLE notification_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  verification_token VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_notification_email ON notification_subscriptions(email);
CREATE INDEX idx_notification_token ON notification_subscriptions(verification_token);
```

**Update the storage file** (`src/lib/notification-subscribers-storage.ts`):

```typescript
import { createClient } from '@/utils/supabase/server';

export interface NotificationSubscription {
  id: string;
  email: string;
  verified: boolean;
  verificationToken: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getSubscription(email: string): Promise<NotificationSubscription | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('notification_subscriptions')
    .select('*')
    .eq('email', email.toLowerCase())
    .single();

  if (error || !data) return null;

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

export async function createSubscription(subscription: NotificationSubscription): Promise<void> {
  const supabase = createClient();
  await supabase.from('notification_subscriptions').insert({
    email: subscription.email,
    verified: subscription.verified,
    verification_token: subscription.verificationToken,
    is_active: subscription.isActive,
  });
}

export async function updateSubscription(email: string, updates: Partial<NotificationSubscription>): Promise<void> {
  const supabase = createClient();
  const updateData: any = { updated_at: new Date().toISOString() };

  if (updates.verified !== undefined) updateData.verified = updates.verified;
  if (updates.isActive !== undefined) updateData.is_active = updates.isActive;

  await supabase
    .from('notification_subscriptions')
    .update(updateData)
    .eq('email', email.toLowerCase());
}
```

---

### Option 2: MySQL

You also have MySQL configured. Create a table:

```sql
CREATE TABLE notification_subscriptions (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  email VARCHAR(255) UNIQUE NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  verification_token VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_token (verification_token)
);
```

---

### Option 3: Redis (For Temporary Storage)

If you want to use Redis (which you have configured):

```typescript
import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL
});

export async function saveSubscription(subscription: NotificationSubscription): Promise<void> {
  await redisClient.connect();
  const key = `notification_sub:${subscription.email}`;
  await redisClient.set(key, JSON.stringify(subscription), {
    EX: 60 * 60 * 24 * 30 // 30 days expiration
  });
  await redisClient.disconnect();
}

export async function getSubscription(email: string): Promise<NotificationSubscription | null> {
  await redisClient.connect();
  const key = `notification_sub:${email}`;
  const data = await redisClient.get(key);
  await redisClient.disconnect();
  return data ? JSON.parse(data) : null;
}
```

---

## Migration Steps

### Step 1: Choose Your Database
- **Supabase** (PostgreSQL) - Best for scalability
- **MySQL** - If you prefer your existing MySQL setup
- **Redis** - For temporary storage with expiration

### Step 2: Create the Table
Run the SQL schema for your chosen database

### Step 3: Update API Routes

**Subscribe Route** (`src/app/api/notifications/subscribe/route.ts`):
```typescript
// Replace:
notificationSubscribersStorage.set(email, subscription);

// With (Supabase example):
await createSubscription(subscription);
```

**Verify Route** (`src/app/api/notifications/verify/route.ts`):
```typescript
// Replace:
const subscription = notificationSubscribersStorage.get(decodedEmail);

// With:
const subscription = await getSubscription(decodedEmail);

// And replace:
notificationSubscribersStorage.set(decodedEmail, subscription);

// With:
await updateSubscription(decodedEmail, { verified: true, isActive: true });
```

### Step 4: Test
1. Subscribe with an email
2. Restart the server
3. Click the verification link
4. Verify the subscription persists

---

## Recommended Solution: Supabase

**Why Supabase:**
- ✅ Already configured in your project
- ✅ Real-time capabilities (can notify when new subscriptions arrive)
- ✅ Built-in authentication (if you want to add user accounts)
- ✅ Free tier with generous limits
- ✅ Automatic backups
- ✅ Postgres features (transactions, ACID compliance)

**Implementation Priority:**
1. Create Supabase table
2. Update `notification-subscribers-storage.ts` with Supabase functions
3. Update subscribe route to use database
4. Update verify route to use database
5. Test thoroughly
6. Deploy

---

## Current Files to Update

1. **Storage Module**: `src/lib/notification-subscribers-storage.ts`
2. **Subscribe Route**: `src/app/api/notifications/subscribe/route.ts`
3. **Verify Route**: `src/app/api/notifications/verify/route.ts`

---

## Data Currently Stored In Memory

Location: **RAM (Server Memory)**
Lifetime: **Until server restarts**
Backup: **None**

The singleton Map in `src/lib/notification-subscribers-storage.ts` stores all subscriptions temporarily.

---

## Questions?

If you need help with database migration, let me know which database you'd like to use:
- Supabase (PostgreSQL) - Recommended
- MySQL
- Redis
- Other
