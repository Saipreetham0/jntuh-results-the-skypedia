import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

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
 * GET handler for credit eligibility check API
 *
 * @param request - The incoming request object
 * @returns - JSON response with credit eligibility data or error details
 */
export async function GET(request: Request) {
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

    // Make request to external API
    const response = await axios.get(
      `https://jntuhresults.dhethi.com/api/getCreditsChecker?rollNumber=${rollNumber}`,
      {
        timeout: 15000, // 15 second timeout
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
    console.error('Credit eligibility request failed:', error);

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
          { detail: `External API error: ${axiosError.message}` },
          { status: status >= 400 && status < 600 ? status : 502 }
        );
      }
    }

    // Default error response
    return NextResponse.json(
      { detail: "Failed to fetch credit eligibility data" },
      { status: 500 }
    );
  }
}
