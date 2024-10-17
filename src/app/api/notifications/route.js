// app/api/notifications/route.js

import notificationdata from "../../../public/Notification.json"; // Adjust the path as necessary

export async function GET(req) {
  try {
    // Simulate fetching data (in a real app, this could be a database call)
    const sortedData = notificationdata.sort(
      (a, b) => new Date(b.Date) - new Date(a.Date)
    );

    return new Response(JSON.stringify(sortedData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    return new Response("Failed to fetch notifications", { status: 500 });
  }
}
