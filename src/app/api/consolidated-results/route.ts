// app/api/consolidated-results/route.ts
import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { rateLimit, getClientIp } from '@/server/rate-limit';

/**
 * Error response structure following FastAPI error format
 */
interface APIErrorResponse {
  detail: string | {
    loc: (string | number)[];
    msg: string;
    type: string;
  }[];
  statusCode: number;
}

/**
 * GET handler for consolidated results API
 *
 * @param request - The incoming request object
 * @returns - JSON response with consolidated results data or error details
 */
export async function GET(request: Request) {
  const rl = rateLimit(getClientIp(request), { limit: 30, windowMs: 60_000 });
  if (!rl.success) {
    return NextResponse.json(
      { detail: 'Too many requests. Please slow down.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
    );
  }

  try {
    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const rollNumber = searchParams.get('htno');

    // Validate roll number
    if (!rollNumber) {
      return NextResponse.json(
        {
          detail: [
            {
              loc: ["query", "htno"],
              msg: "Hall ticket number is required",
              type: "value_error.missing"
            }
          ]
        } as APIErrorResponse,
        { status: 422 }
      );
    }

    // Validate roll number format
    const rollNumberRegex = /^[0-9]{1,2}[A-Z]{1,2}[0-9]{2}[A-Z][0-9]{4}$/;
    if (!rollNumberRegex.test(rollNumber)) {
      return NextResponse.json(
        {
          detail: [
            {
              loc: ["query", "htno"],
              msg: "Invalid hall ticket number format. Expected pattern: 20J25A0501",
              type: "value_error.pattern"
            }
          ]
        } as APIErrorResponse,
        { status: 422 }
      );
    }

    // Make request to external API (using getAllResult endpoint for consolidated results)
    const response = await axios.get(
      `https://jntuhresults.dhethi.com/api/getAllResult?rollNumber=${rollNumber}`,
      {
        timeout: 15000, // 15 second timeout (consolidated results may take longer)
        headers: {
          'User-Agent': 'JNTUHResultsPortal/1.0'
        }
      }
    );

    // Check if the response is valid
    if (!response.data || typeof response.data !== 'object') {
      return NextResponse.json(
        { detail: "Invalid response from upstream API" },
        { status: 502 }
      );
    }

    // Return the response data
    return NextResponse.json(response.data);

  } catch (error) {

    // Handle Axios errors
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      // Handle specific error codes
      if (axiosError.code === 'ECONNABORTED') {
        return NextResponse.json(
          { detail: "Request timed out. Please try again later." },
          { status: 504 }
        );
      }

      if (axiosError.code === 'ECONNREFUSED') {
        return NextResponse.json(
          { detail: "Unable to connect to results server. Please try again later." },
          { status: 503 }
        );
      }

      // Handle response errors
      if (axiosError.response) {
        const status = axiosError.response.status;

        if (status === 404) {
          return NextResponse.json(
            { detail: "Hall ticket number not found" },
            { status: 404 }
          );
        }

        if (status === 429) {
          return NextResponse.json(
            { detail: "Too many requests. Please try again later." },
            { status: 429 }
          );
        }

        // Pass through other status codes
        return NextResponse.json(
          { detail: "External service error. Please try again later." },
          { status: status >= 400 && status < 600 ? status : 502 }
        );
      }
    }

    // Default error response
    return NextResponse.json(
      { detail: "Failed to fetch consolidated results" },
      { status: 500 }
    );
  }
}
