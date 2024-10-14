// app/api/syllabus/[...slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import https from 'https';
import * as cheerio from 'cheerio';

interface SyllabusItem {
  title: string;
  link: string;
  children?: SyllabusItem[];
}

function fetchHtml(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, { rejectUnauthorized: false }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function scrapeSyllabus(url: string): Promise<SyllabusItem[]> {
  console.log(`Scraping URL: ${url}`);
  const html = await fetchHtml(url);
  const $ = cheerio.load(html);
  const syllabusData: SyllabusItem[] = [];

  // Check if we're on the initial page or a sub-page
  const isInitialPage = $('nav p').length > 0;
  console.log(`Is initial page: ${isInitialPage}`);

  if (isInitialPage) {
    $('nav p').each((_, element) => {
      const link = $(element).find('a');
      syllabusData.push({
        title: link.text().trim(),
        link: `https://studentservices.jntuh.ac.in/oss/${link.attr('href')}`,
      });
    });
  } else {
    // Handle sub-pages
    $('table.table tr').each((_, element) => {
      const cells = $(element).find('td');
      if (cells.length >= 2) {
        const link = cells.eq(1).find('a');
        if (link.length) {
          syllabusData.push({
            title: cells.eq(0).text().trim(),
            link: `https://studentservices.jntuh.ac.in/oss/${link.attr('href')}`,
          });
        }
      }
    });
  }

  console.log(`Scraped ${syllabusData.length} items`);
  console.log(JSON.stringify(syllabusData, null, 2));

  return syllabusData;
}

export async function GET(request: NextRequest, { params }: { params: { slug: string[] } }) {
  try {
    let url = 'https://studentservices.jntuh.ac.in/oss/syllabus.html?type=syllabus';

    if (params.slug && params.slug.length > 0) {
      url = `https://studentservices.jntuh.ac.in/oss/${params.slug.join('/')}`;
    }

    console.log(`Processing request for URL: ${url}`);
    const syllabusData = await scrapeSyllabus(url);
    console.log(`Returning ${syllabusData.length} items`);
    return NextResponse.json(syllabusData);
  } catch (error) {
    console.error('Error fetching syllabus data:', error);
    return NextResponse.json({ error: 'Failed to fetch syllabus data' }, { status: 500 });
  }
}