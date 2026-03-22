// app/api/calendar/sync/route.ts
import type { calendar_v3 } from 'googleapis';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { rateLimit, getClientIp } from '@/server/rate-limit';

export const dynamic = 'force-dynamic';

interface ExamEvent {
  id: string;
  title: string;
  date: Date;
  subject: string;
  duration: string;
}

const ALLOWED_ORIGINS = [
  'https://jntuhresults.theskypedia.com',
  process.env.NEXT_PUBLIC_SITE_URL,
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null,
].filter(Boolean) as string[];

export async function POST(request: Request) {
  const rl = rateLimit(getClientIp(request), { limit: 20, windowMs: 60_000 });
  if (!rl.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please slow down.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
    );
  }

  const origin = request.headers.get('origin');
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    // Dynamic import to avoid build-time issues with googleapis
    const { google } = await import('googleapis');

    const body = await request.json();
    const { events }: { events: ExamEvent[] } = body;

    // Validate events array
    if (!Array.isArray(events) || events.length === 0) {
      return NextResponse.json({ error: 'No events provided' }, { status: 400 });
    }
    if (events.length > 100) {
      return NextResponse.json({ error: 'Too many events. Maximum 100 at a time.' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('google_refresh_token')?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'No refresh token found' },
        { status: 401 }
      );
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      refresh_token: refreshToken
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    // Add events to Google Calendar
    const insertPromises = events.map(event => {
      const calendarEvent: calendar_v3.Schema$Event = {
        summary: event.title,
        description: `Subject: ${event.subject}\nDuration: ${event.duration}`,
        start: {
          dateTime: new Date(event.date).toISOString(),
          timeZone: 'UTC',
        },
        end: {
          dateTime: new Date(new Date(event.date).getTime() + parseInt(event.duration) * 60000).toISOString(),
          timeZone: 'UTC',
        },
      };

      return calendar.events.insert({
        calendarId: 'primary',
        requestBody: calendarEvent,
      });
    });

    await Promise.all(insertPromises);

    return NextResponse.json({ message: 'Events synced successfully' });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to sync with Google Calendar. Please try again later.' },
      { status: 500 }
    );
  }
}
