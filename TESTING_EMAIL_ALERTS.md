# 🧪 Testing Email Alerts Feature

**Last Updated:** November 27, 2025
**Bug Fix:** "Subscription not found" error - FIXED ✅

---

## ✅ Prerequisites

1. **Environment Variables Set:**
   ```bash
   # Check if RESEND_API_KEY is set
   grep RESEND_API_KEY .env.local

   # Check if SITE_URL is set
   grep NEXT_PUBLIC_SITE_URL .env.local
   ```

2. **Development Server Running:**
   ```bash
   pnpm dev
   ```

3. **Valid Email Address:**
   - Use a real email you can access
   - Check spam folder if email doesn't arrive

---

## 🎯 Test Flow (Step-by-Step)

### Step 1: Subscribe

1. **Navigate to Homepage:**
   ```
   http://localhost:3000
   ```

2. **Find Subscription Form:**
   - Scroll down to find "Result Alerts" card
   - Should have bell icon 🔔
   - Dark mode compatible

3. **Enter Details:**
   - **Roll Number:** `20J25A0504` (or any valid format: `YYX##X####`)
   - **Email:** Your real email address

4. **Submit:**
   - Click "Subscribe to Alerts" button
   - Button should show spinner and "Subscribing..."

5. **Expected Result:**
   - ✅ Green success box appears
   - ✅ Message: "Check Your Email!"
   - ✅ Tip about checking spam folder

---

### Step 2: Check Email

1. **Open Email Inbox:**
   - Wait 10-30 seconds for email to arrive
   - Check spam/junk folder if not in inbox

2. **Email Subject:**
   ```
   Verify Your Result Alert Subscription - JNTUH Results
   ```

3. **Email Sender:**
   ```
   JNTUH Results <noreply@theskypedia.com>
   ```

4. **Email Content Should Include:**
   - ✅ JNTUH Results header with gradient
   - ✅ Your roll number and email
   - ✅ Blue "✅ Verify Email Address" button
   - ✅ "What happens next?" section
   - ✅ Professional branding

---

### Step 3: Verify Email

1. **Click Verification Button:**
   - Click the blue button in email
   - OR copy/paste the link below the button

2. **Verification Page Opens:**
   - URL format: `/result-alerts/verify?token=xxx&id=xxx`
   - Should show loading spinner initially

3. **Expected Result:**
   - ✅ **Success State:**
     - Green checkmark icon
     - "Email Verified! 🎉" heading
     - Your subscription details in blue box
     - "What happens next?" section
     - "Go to Homepage" button
     - "Check Results Now" button

4. **❌ If You See Error:**
   - "Subscription not found" → Server may have restarted (in-memory storage cleared)
   - "Link expired" → Link is older than 24 hours
   - "Invalid token" → URL may be corrupted

---

## 🐛 Testing Bug Fix

### Test: "Subscription not found" Error

**Before the fix**, clicking verification link would ALWAYS show:
```
Verification Failed
Subscription not found. It may have expired or been deleted.
```

**After the fix**, verification should work immediately after subscribing.

**To verify the fix is working:**

1. Subscribe with a fresh email
2. Immediately click verification link
3. ✅ Should see success page (NOT "subscription not found")

**Note:** If server restarts between subscribe and verify, you'll still see the error (expected behavior with in-memory storage).

---

## 🔍 Debugging

### Check Console Logs

When you subscribe or verify, you should see these logs:

**Subscribe:**
```bash
📦 Subscribers storage initialized
✅ Subscription stored: 20J25A0504-your@email.com
```

**Verify:**
```bash
🔍 Subscription lookup: 20J25A0504-your@email.com - Found
```

**If "Not found":**
- Server restarted (data lost)
- Different subscription ID format
- Bug in storage singleton

### Check Storage State

Add temporary endpoint to check storage:

```typescript
// src/app/api/result-alerts/debug/route.ts
import { subscribersStorage } from '@/lib/subscribers-storage';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    total: subscribersStorage.size(),
    subscribers: subscribersStorage.getAll().map(s => ({
      id: s.id,
      verified: s.verified,
      isActive: s.isActive,
      createdAt: s.createdAt
    }))
  });
}
```

Visit: `http://localhost:3000/api/result-alerts/debug`

---

## 🧪 Test Cases

### ✅ Happy Path

| Step | Action | Expected |
|------|--------|----------|
| 1 | Enter valid roll number + email | ✅ Success message |
| 2 | Check email | ✅ Verification email received |
| 3 | Click verify link | ✅ Success page shown |
| 4 | Re-click same link | ✅ "Already verified" message |

### ❌ Error Cases

| Case | Input | Expected |
|------|-------|----------|
| Empty fields | No roll/email | ❌ "Please enter both..." |
| Invalid email | `test@` | ❌ "Invalid email format" |
| Invalid roll number | `123ABC` | ❌ "Invalid roll number format" |
| Duplicate subscription | Same roll+email twice | ✅ New verification email sent |
| Expired link | 25+ hours old | ❌ "Link expired" |
| Invalid token | Modified URL | ❌ "Invalid token" |
| Server restart | Subscribe → Restart → Verify | ❌ "Subscription not found"* |

*Expected with in-memory storage - will be fixed with database

---

## 📊 Success Criteria

All these should pass:

- [ ] Subscription form appears on homepage
- [ ] Form validation works (email, roll number)
- [ ] Success message shows after submit
- [ ] Verification email arrives within 1 minute
- [ ] Email has professional JNTUH branding
- [ ] Verification link works immediately after subscribe
- [ ] Success page shows subscription details
- [ ] "Already verified" message on second click
- [ ] Dark mode works correctly
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Build passes without errors

---

## 🚀 Production Testing

Before deploying to production:

1. **Set Production Environment Variables:**
   ```bash
   vercel env add RESEND_API_KEY production
   vercel env add NEXT_PUBLIC_SITE_URL production
   ```

2. **Test on Vercel Preview:**
   - Deploy to preview branch
   - Test full flow with real email
   - Check Vercel logs for errors

3. **Monitor Resend Dashboard:**
   - Check email delivery rate
   - Monitor bounce rate
   - Check spam complaints

4. **Database Migration (Critical):**
   - Replace in-memory storage with Supabase ASAP
   - See `docs/features/EMAIL_ALERTS_IMPLEMENTATION.md` Phase 2

---

## 💡 Known Limitations (Current)

1. **In-Memory Storage:**
   - Server restart = all subscriptions lost
   - Not suitable for production
   - Solution: Implement Supabase storage

2. **No Unsubscribe:**
   - Users can't unsubscribe yet
   - Solution: Implement unsubscribe route

3. **No Actual Notifications:**
   - Only verification emails sent
   - No result notification logic yet
   - Solution: Implement cron job + notification emails

4. **No Admin Dashboard:**
   - Can't see subscriber list
   - Solution: Create admin panel

---

## 🎉 When Everything Works

You should see:

1. ✅ Beautiful subscription form on homepage
2. ✅ Professional verification email in inbox
3. ✅ Success page after clicking verification link
4. ✅ Subscription details displayed correctly
5. ✅ No "Subscription not found" errors
6. ✅ Console logs showing storage operations

**If all tests pass:** Feature is working correctly! 🚀

---

**Next Step:** Replace in-memory storage with database before deploying to production.

See: `docs/features/EMAIL_ALERTS_IMPLEMENTATION.md` for Phase 2 implementation.
