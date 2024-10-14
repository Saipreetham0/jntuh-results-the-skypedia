// // app/api/syllabus/route.ts
// import { NextResponse } from 'next/server';
// import https from 'https';
// import * as cheerio from 'cheerio';

// interface SyllabusItem {
//   course: string;
//   link: string;
// }

// function fetchHtml(url: string): Promise<string> {
//   return new Promise((resolve, reject) => {
//     https.get(url, { rejectUnauthorized: false }, (res) => {
//       let data = '';
//       res.on('data', (chunk) => { data += chunk; });
//       res.on('end', () => resolve(data));
//     }).on('error', reject);
//   });
// }

// export async function GET() {
//   try {
//     const html = await fetchHtml('https://studentservices.jntuh.ac.in/oss/syllabus.html?type=syllabus');
//     const $ = cheerio.load(html);

//     const syllabusData: SyllabusItem[] = [];

//     $('nav p').each((_, element) => {
//       const link = $(element).find('a');
//       syllabusData.push({
//         course: link.text().trim(),
//         link: `https://studentservices.jntuh.ac.in/oss/${link.attr('href')}`,
//       });
//     });

//     return NextResponse.json(syllabusData);
//   } catch (error) {
//     console.error('Error fetching syllabus data:', error);
//     return NextResponse.json({ error: 'Failed to fetch syllabus data' }, { status: 500 });
//   }
// }


// app/api/hello/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello World' });
}
