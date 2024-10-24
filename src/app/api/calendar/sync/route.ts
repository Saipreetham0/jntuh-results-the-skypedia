// app/api/calendar/sync/route.ts
import { google } from 'googleapis';
import type { calendar_v3 } from 'googleapis';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

interface ExamEvent {
  id: string;
  title: string;
  date: Date;
  subject: string;
  duration: string;
}

export async function POST(request: Request) {
  try {
    const { events }: { events: ExamEvent[] } = await request.json();
    const cookieStore = cookies();
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
  } catch (error) {
    console.error('Error syncing with Google Calendar:', error);
    return NextResponse.json(
      { error: 'Failed to sync with Google Calendar' },
      { status: 500 }
    );
  }
}
