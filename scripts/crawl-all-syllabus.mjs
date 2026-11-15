import fs from 'fs';
import path from 'path';
import axios from 'axios';
import * as cheerio from 'cheerio';
import https from 'https';

const BASE_URL = 'https://studentservices.jntuh.ac.in/oss/';
const jntuhAgent = new https.Agent({ rejectUnauthorized: false });

const client = axios.create({
  timeout: 30000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  },
  httpsAgent: jntuhAgent,
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getSession() {
  const res = await client.get(`${BASE_URL}syllabus.html?type=syllabus`);
  const cookie = res.headers['set-cookie']
    ? res.headers['set-cookie'].map((c) => c.split(';')[0]).join('; ')
    : '';
  return cookie;
}

async function fetchPage(url, cookie, referer) {
  for (let i = 0; i < 3; i++) {
    try {
      const res = await client.get(url, {
        headers: {
          Cookie: cookie,
          Referer: referer || `${BASE_URL}syllabus.html?type=syllabus`,
        },
      });
      return res.data;
    } catch (err) {
      if (i === 2) throw err;
      await sleep(1000);
    }
  }
}

async function crawl() {
  console.log('--- Connecting to JNTUH Official OSS Syllabus Portal ---');
  let cookie = await getSession();
  console.log('Session acquired.');

  const rootHtml = await fetchPage(`${BASE_URL}syllabus.html?type=syllabus`, cookie);
  const $root = cheerio.load(rootHtml);

  const courses = [];
  $root('a').each((_, el) => {
    const text = $root(el).text().trim().replace(/\s+/g, ' ');
    const href = $root(el).attr('href') || '';
    if (href.includes('syllabus_action.html') && href.includes('l123=0')) {
      const url = new URL(href, BASE_URL);
      const level = url.searchParams.get('level');
      if (level && !courses.some((c) => c.level === level)) {
        courses.push({
          course: text,
          level,
          link: url.toString(),
          children: [],
        });
      }
    }
  });

  console.log(`Found ${courses.length} courses: ${courses.map((c) => c.course).join(', ')}`);

  const allPdfs = [];

  for (const course of courses) {
    console.log(`\n=== Crawling Course: ${course.course} (${course.level}) ===`);
    try {
      await sleep(500);
      const courseHtml = await fetchPage(course.link, cookie, `${BASE_URL}syllabus.html?type=syllabus`);
      const $course = cheerio.load(courseHtml);

      const regulations = [];
      $course('a').each((_, el) => {
        const text = $course(el).text().trim().replace(/\s+/g, ' ');
        const href = $course(el).attr('href') || '';
        if (href.includes('syllabus_action.html') && href.includes('l123=1')) {
          const url = new URL(href, BASE_URL);
          const level = url.searchParams.get('level');
          if (level && !regulations.some((r) => r.level === level)) {
            regulations.push({
              course: text,
              level,
              link: url.toString(),
              children: [],
            });
          }
        }
      });

      console.log(`  -> Found ${regulations.length} regulations in ${course.course}`);

      for (const reg of regulations) {
        console.log(`    - Regulation: ${reg.course}`);
        try {
          await sleep(400);
          const regHtml = await fetchPage(reg.link, cookie, course.link);
          const $reg = cheerio.load(regHtml);

          const years = [];
          $reg('a').each((_, el) => {
            const text = $reg(el).text().trim().replace(/\s+/g, ' ');
            const href = $reg(el).attr('href') || '';

            // Check if it links to year/semester level (l123=2)
            if (href.includes('syllabus_action.html') && href.includes('l123=2')) {
              const url = new URL(href, BASE_URL);
              const level = url.searchParams.get('level');
              if (level && !years.some((y) => y.level === level)) {
                years.push({
                  syllabusName: text,
                  level,
                  link: url.toString(),
                  children: [],
                });
              }
            } else if (href.endsWith('.pdf') && !href.includes('TermsandConditions')) {
              // Direct PDF under regulation
              const pdfUrl = new URL(href, BASE_URL).toString();
              years.push({
                name: text,
                link: pdfUrl,
              });
              allPdfs.push({
                course: course.course,
                regulation: reg.course,
                year: 'General',
                title: text,
                url: pdfUrl,
              });
            }
          });

          for (const year of years) {
            if (year.link && year.link.endsWith('.pdf')) {
              reg.children.push(year);
              continue;
            }

            try {
              await sleep(350);
              const yearHtml = await fetchPage(year.link, cookie, reg.link);
              const $year = cheerio.load(yearHtml);

              $year('a').each((_, el) => {
                const text = $year(el).text().trim().replace(/\s+/g, ' ');
                const href = $year(el).attr('href') || '';
                if (href.endsWith('.pdf') && !href.includes('TermsandConditions')) {
                  const pdfUrl = new URL(href, BASE_URL).toString();
                  if (!year.children.some((p) => p.link === pdfUrl)) {
                    year.children.push({
                      name: text,
                      link: pdfUrl,
                    });
                    allPdfs.push({
                      course: course.course,
                      regulation: reg.course,
                      year: year.syllabusName,
                      title: text,
                      url: pdfUrl,
                    });
                  }
                }
              });

              console.log(`      * ${year.syllabusName}: ${year.children.length} PDFs`);
              reg.children.push({
                syllabusName: year.syllabusName,
                link: year.link,
                children: year.children,
              });
            } catch (err) {
              console.error(`      [!] Error fetching year ${year.syllabusName}:`, err.message);
              reg.children.push(year);
            }
          }

          course.children.push({
            course: reg.course,
            link: reg.link,
            children: reg.children,
          });
        } catch (err) {
          console.error(`    [!] Error fetching reg ${reg.course}:`, err.message);
          course.children.push(reg);
        }
      }
    } catch (err) {
      console.error(`  [!] Error crawling course ${course.course}:`, err.message);
    }
  }

  // Save the full hierarchical JSON
  const syllabusPath = path.join(process.cwd(), 'src/data/syllabus.json');
  fs.writeFileSync(syllabusPath, JSON.stringify(courses, null, 2), 'utf8');

  // Also sync public/syllabus.json
  const publicPath = path.join(process.cwd(), 'public/syllabus.json');
  fs.writeFileSync(publicPath, JSON.stringify(courses, null, 2), 'utf8');

  // Save flat PDF list
  const flatPath = path.join(process.cwd(), 'src/data/all_syllabus_pdfs_flat.json');
  fs.writeFileSync(flatPath, JSON.stringify(allPdfs, null, 2), 'utf8');

  console.log('\n=============================================');
  console.log('✅ JNTUH SYLLABUS SCRAPING & EXTRACTION DONE');
  console.log(`Total PDF Links Extracted: ${allPdfs.length}`);
  console.log(`Hierarchy Saved to: ${syllabusPath}`);
  console.log(`Flat PDF Catalog: ${flatPath}`);
  console.log('=============================================');
}

crawl().catch(console.error);
