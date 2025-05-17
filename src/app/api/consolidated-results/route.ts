// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { HttpsProxyAgent } from 'https-proxy-agent';

// const PROXY_CONFIG = {
//   login: '8c5906b99fbd1c0bcd0f916d545c565a294fa18417499a6b43babf4c07a63a5b376a6e57c8fe6374336efa7732b34fe03eb6db89c17b3d5907c671770cc67ea3d59b066f8696adba47c3e6e3a1d06603',
//   password: 'o2dyouia1i7b',
//   host: 'proxy.toolip.io',
//   port: '31112'
// };

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const htno = searchParams.get('htno');

//     if (!htno) {
//       return NextResponse.json({ error: 'Hall ticket number is required' }, { status: 400 });
//     }

//     const proxyUrl = `http://${PROXY_CONFIG.login}:${PROXY_CONFIG.password}@${PROXY_CONFIG.host}:${PROXY_CONFIG.port}`;
//     const httpsAgent = new HttpsProxyAgent(proxyUrl);

//     const response = await axios.get(
//       `https://jntuhresults.up.railway.app/api/academicresult?htno=${htno}`,

//       { httpsAgent }
//     );

//     return NextResponse.json(response.data);
//   } catch (error) {
//     console.error('Proxy request failed:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch results' },
//       { status: 500 }
//     );
//   }
// }



//woking code


// import { NextResponse } from "next/server";
// import axios from "axios";

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const htno = searchParams.get("htno");

//     if (!htno) {
//       return NextResponse.json(
//         { error: "Hall ticket number is required" },
//         { status: 400 }
//       );
//     }

//     const response = await axios.get(
//       `https://jntuhresults.dhethi.com/api/getAcademicResult?rollNumber=${htno}`
//     );
//     // console.log("Response:", response.data);

//     return NextResponse.json(response.data);
//   } catch (error) {
//     console.error("Request failed:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch results" },
//       { status: 500 }
//     );
//   }
// }


// app/api/consolidated-results/route.ts
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
 * GET handler for consolidated results API
 *
 * @param request - The incoming request object
 * @returns - JSON response with consolidated results data or error details
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

    // Validate roll number format (basic validation for demonstration)
    // const rollNumberRegex = /^[0-9]{1,2}[A-Z][0-9]{2}[A-Z][0-9]{4}$/;
    // if (!rollNumberRegex.test(rollNumber)) {
    //   return NextResponse.json(
    //     {
    //       detail: [
    //         {
    //           loc: ["query", "htno"],
    //           msg: "Invalid hall ticket number format. Expected pattern: 20J25A0501",
    //           type: "value_error.pattern"
    //         }
    //       ]
    //     } as APIErrorResponse,
    //     { status: 422 }
    //   );
    // }

    // Make request to external API
    const response = await axios.get(
      `https://jntuhresults.dhethi.com/api/getAcademicResult?rollNumber=${rollNumber}`,
      {
        timeout: 10000, // 10 second timeout
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
    console.error('Consolidated results request failed:', error);

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
      { detail: "Failed to fetch consolidated results" },
      { status: 500 }
    );
  }
}
