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

import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const htno = searchParams.get("htno");

    if (!htno) {
      return NextResponse.json(
        { error: "Hall ticket number is required" },
        { status: 400 }
      );
    }

    const response = await axios.get(
      `https://jntuhresults.dhethi.com/api/getAcademicResult?rollNumber=${htno}`
    );
    // console.log("Response:", response.data);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Request failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch results" },
      { status: 500 }
    );
  }
}
