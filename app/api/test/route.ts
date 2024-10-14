// import { NextResponse } from "next/server";
// import https from "https";
// import * as cheerio from "cheerio";

// interface SyllabusItem {
//   name: string;
//   link: string;
//   children?: SyllabusItem[];
// }

// function fetchHtml(url: string): Promise<string> {
//   return new Promise((resolve, reject) => {
//     https
//       .get(url, { rejectUnauthorized: false }, (res) => {
//         let data = "";
//         res.on("data", (chunk) => {
//           data += chunk;
//         });
//         res.on("end", () => resolve(data));
//       })
//       .on("error", reject);
//   });
// }

// function getFullUrl(baseUrl: string, relativeUrl: string): string {
//   if (relativeUrl.startsWith("http")) {
//     return relativeUrl;
//   }
//   return new URL(relativeUrl, baseUrl).href;
// }

// async function scrapeCourses(url: string): Promise<SyllabusItem[]> {
//   const html = await fetchHtml(url);
//   const $ = cheerio.load(html);
//   const items: SyllabusItem[] = [];

//   $("nav a").each((_, element) => {
//     const link = $(element);
//     const item: SyllabusItem = {
//       name: link.text().trim(),
//       link: getFullUrl(url, link.attr("href") || ""),
//     };
//     items.push(item);
//   });

//   return items;
// }

// async function scrapeRegulations(url: string): Promise<SyllabusItem[]> {
//   const html = await fetchHtml(url);
//   const $ = cheerio.load(html);
//   const items: SyllabusItem[] = [];

//   $("nav1 p a").each((_, element) => {
//     const link = $(element);
//     const item: SyllabusItem = {
//       name: link.text().trim(),
//       link: getFullUrl(url, link.attr("href") || ""),
//     };
//     items.push(item);
//   });

//   return items;
// }

// async function scrapeAllLevels(baseUrl: string): Promise<SyllabusItem[]> {
//   const courses = await scrapeCourses(baseUrl);

//   for (const course of courses) {
//     course.children = await scrapeRegulations(course.link);
//   }

//   return courses;
// }

// export async function GET() {
//   try {
//     const baseUrl = "https://studentservices.jntuh.ac.in/oss/syllabus.html?type=syllabus";
//     console.log("Fetching data from:", baseUrl);
//     const syllabusData = await scrapeAllLevels(baseUrl);
//     console.log("Scraped data:", JSON.stringify(syllabusData, null, 2));
//     return NextResponse.json(syllabusData);
//   } catch (error) {
//     console.error("Error fetching syllabus data:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch syllabus data", details: error.message },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

interface SyllabusItem {
  name: string;
  link: string;
  children?: SyllabusItem[];
}

async function fetchHtml(url: string): Promise<string> {
  try {
    const response = await axios.get(url, {
      httpsAgent: new (require("https").Agent)({ rejectUnauthorized: false }),
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error.message);
    throw error;
  }
}

async function scrapeYears(url: string): Promise<SyllabusItem[]> {
  try {
    console.log("Scraping years from:", url);
    const html = await fetchHtml(url);
    const $ = cheerio.load(html);
    const items: SyllabusItem[] = [];

    $("nav1 > p > a").each((_, element) => {
      const link = $(element);
      const item: SyllabusItem = {
        name: link.text().trim(),
        link: new URL(link.attr("href") || "", url).href,
      };
      items.push(item);
    });

    console.log(`Found ${items.length} year items`);
    return items;
  } catch (error) {
    console.error(`Error scraping years from ${url}:`, error.message);
    return [];
  }
}

async function scrapeRegulations(url: string): Promise<SyllabusItem[]> {
  const html = await fetchHtml(url);
  const $ = cheerio.load(html);
  const items: SyllabusItem[] = [];

  $("nav1 > p > a").each((_, element) => {
    const link = $(element);
    const item: SyllabusItem = {
      name: link.text().trim(),
      link: new URL(link.attr("href") || "", url).href,
    };
    items.push(item);
  });

  // Fetch year-level data for each regulation
  for (const item of items) {
    item.children = await scrapeYears(item.link);
  }

  return items;
}

async function scrapeCourses(url: string): Promise<SyllabusItem[]> {
  const html = await fetchHtml(url);
  const $ = cheerio.load(html);
  const items: SyllabusItem[] = [];

  $("nav a").each((_, element) => {
    const link = $(element);
    const item: SyllabusItem = {
      name: link.text().trim(),
      link: new URL(link.attr("href") || "", url).href,
    };
    items.push(item);
  });

  return items;
}

async function scrapeAllLevels(baseUrl: string): Promise<SyllabusItem[]> {
  const courses = await scrapeCourses(baseUrl);

  for (const course of courses) {
    course.children = await scrapeRegulations(course.link);
  }

  return courses;
}

export async function GET() {
  try {
    const baseUrl = "https://studentservices.jntuh.ac.in/oss/syllabus.html?type=syllabus";
    const syllabusData = await scrapeAllLevels(baseUrl);
    return NextResponse.json(syllabusData);
  } catch (error) {
    console.error("Error fetching syllabus data:", error);
    return NextResponse.json(
      { error: "Failed to fetch syllabus data" },
      { status: 500 }
    );
  }
}