import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { GoogleCalendarAuth } from "./GoogleCalendarAuth";

interface Student {
  id: string;
  email: string;
  googleToken?: string;
}

interface ExamEvent {
  id: string;
  title: string;
  date: Date;
  subject: string;
  duration: string;
}

export default function ExamCalendarWithAuth() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [events, setEvents] = useState<ExamEvent[]>([]);
  const [syncStatus, setSyncStatus] = useState("");
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);

  const handleAuthComplete = async (token: string) => {
    setIsGoogleConnected(true);
    // Automatically sync existing events when auth is complete
    await syncExamsToGoogleCalendar(token);
  };

  const syncExamsToGoogleCalendar = async (token: string) => {
    try {
      const response = await fetch("/api/calendar/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ events }),
      });

      if (!response.ok) throw new Error("Failed to sync events");

      setSyncStatus("Exams successfully synced to your Google Calendar");
    } catch (error) {
      setSyncStatus("Failed to sync exams to Google Calendar");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Exam Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {!isGoogleConnected && (
              <GoogleCalendarAuth onAuthComplete={handleAuthComplete} />
            )}

            {syncStatus && (
              <Alert>
                <AlertDescription>{syncStatus}</AlertDescription>
              </Alert>
            )}

            <div className="border rounded-lg p-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Your Exams</h3>
              <div className="space-y-2">
                {events
                  .filter(
                    (event) =>
                      selectedDate &&
                      event.date.toDateString() === selectedDate.toDateString()
                  )
                  .map((event) => (
                    <div key={event.id} className="p-3 border rounded-lg">
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-gray-600">
                        Subject: {event.subject}
                      </p>
                      <p className="text-sm text-gray-600">
                        Duration: {event.duration}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
