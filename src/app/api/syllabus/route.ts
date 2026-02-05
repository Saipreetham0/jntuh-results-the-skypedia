import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import https from 'https';

export const dynamic = 'force-dynamic';

const BASE_URL = 'https://studentservices.jntuh.ac.in/oss/';

const axiosInstance = axios.create({
  timeout: 55000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Upgrade-Insecure-Requests': '1',
  },
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});

interface SyllabusNode {
  title: string;
  link: string;
  isPdf: boolean;
  params?: {
    type: string | null;
    level: string | null;
    l123: string | null;
  };
  children?: SyllabusNode[];
}

/**
 * Enhanced Stateful Scraper for JNTUH
 */
class JNTUHScraper {
  private cookies: string[] = [];

  async fetch(url: string, referer?: string, retries = 2): Promise<string> {
    for (let i = 0; i <= retries; i++) {
      try {
        const response = await axiosInstance.get(url, {
          headers: {
            'Cookie': this.cookies.join('; '),
            'Referer': referer || (BASE_URL + 'syllabus.html?type=syllabus')
          }
        });

        if (response.headers['set-cookie']) {
          const newCookies = response.headers['set-cookie'].map(c => c.split(';')[0]);
          const cookieMap = new Map();

          // Keep existing cookies
          this.cookies.forEach(c => {
            const parts = c.split('=');
            const key = parts[0];
            const val = parts.slice(1).join('=');
            if (key) cookieMap.set(key, val);
          });

          // Merge/Overwrite with new cookies
          newCookies.forEach(c => {
            const parts = c.split('=');
            const key = parts[0];
            const val = parts.slice(1).join('=');
            if (key) cookieMap.set(key, val);
          });

          this.cookies = Array.from(cookieMap.entries()).map(([k, v]) => `${k}=${v}`);
        }
        return response.data;
      } catch (error: any) {
        console.error(`[Fetch Attempt ${i + 1}] Error: ${error.message} for URL: ${url}`);
        if (i === retries) throw error;
        await new Promise(r => setTimeout(r, 1000));
      }
    }
    return '';
  }

  /**
   * JNTUH Tomcat servlets are highly sensitive to parameter order.
   * Based on browser trace:
   * Course (l123=0): level -> l123 -> type
   * Others (l123>0): type -> level -> l123
   */
  private buildJNTUHUrl(type: string, level: string, l123: string): string {
    const encodedLevel = encodeURIComponent(level);
    if (l123 === '0') {
      return `${BASE_URL}syllabus_action.html?level=${encodedLevel}&l123=${l123}&type=${type}`;
    } else {
      return `${BASE_URL}syllabus_action.html?type=${type}&level=${encodedLevel}&l123=${l123}`;
    }
  }

  async fetchLevel(type: string, level: string | null, l123: string, path: string[] = [], retriesLeft = 2): Promise<{ items: SyllabusNode[], breadcrumb: any[], error?: string }> {
    let lastUrl = `${BASE_URL}syllabus.html?type=${type}`;

    try {
      // ALWAYS Establish fresh session base
      await this.fetch(lastUrl);

      // SEQUENTIAL RE-HYDRATION
      // We visit each breadcrumb level in order. 
      // This is mandatory for the server to populate its internal path variables.
      for (let i = 0; i < path.length; i++) {
        const nextUrl = this.buildJNTUHUrl(type, path[i], i.toString());
        const html = await this.fetch(nextUrl, lastUrl);

        // Check if re-hydration failed early
        if (html.includes(': is Not found') || html.includes('null/var/lib')) {
          throw new Error(`Session lost context at path level ${i} [${path[i]}]`);
        }

        lastUrl = nextUrl;
        // Slightly longer delay to allow server-side session persistence to finalize
        await new Promise(r => setTimeout(r, 350));
      }

      const targetUrl = level
        ? this.buildJNTUHUrl(type, level, l123)
        : lastUrl;

      const html = await this.fetch(targetUrl, lastUrl);
      const $ = cheerio.load(html);
      const items: SyllabusNode[] = [];

      const breadcrumb = extractBreadcrumbs($);
      const errorMsg = $('font[style*="color: maroon"]').text().trim() || $('font[style*="color: red"]').text().trim();

      $('a').each((_, el) => {
        const $el = $(el);
        const text = $el.text().trim().replace(/\s+/g, ' ');
        const href = $el.attr('href') || '';

        if (!text || href.startsWith('javascript:')) return;

        const isSyllabus = href.includes('syllabus_action.html') || (href.includes('syllabus.html') && !href.includes('type=previousQPapers'));
        const isPdf = href.toLowerCase().endsWith('.pdf');

        if (!isSyllabus && !isPdf) return;

        if (level && $el.closest('nav').length > 0) return;
        if ($el.closest('nav1 span').length > 0) return;

        const utilities = ['Home', 'Login', 'Application Forms', 'Syllabus', 'Previous Question Papers', 'Contact Us', "FAQ's", 'Courses', 'Terms & Conditions', 'Terms and Conditions'];
        if (utilities.includes(text)) return;

        const urlObj = new URL(href, BASE_URL);
        if (isPdf) {
          items.push({ title: text, link: urlObj.toString(), isPdf: true });
        } else {
          const itemLevel = urlObj.searchParams.get('level');
          const itemL123 = urlObj.searchParams.get('l123');

          if (itemLevel && itemLevel !== level) {
            items.push({
              title: text,
              link: urlObj.toString(),
              isPdf: false,
              params: {
                type: urlObj.searchParams.get('type'),
                level: itemLevel,
                l123: itemL123,
              }
            });
          }
        }
      });

      const uniqueItems = Array.from(new Map(items.map(i => [i.title.toLowerCase() + i.link, i])).values());

      // DETECTION OF JNTUH SERVER ERRORS
      const isTransientError = uniqueItems.length === 0 && (errorMsg.includes(': is Not found') || errorMsg.includes('null/var/lib'));

      if (isTransientError && retriesLeft > 0) {
        console.warn(`[JNTUH Server Glitch] ${errorMsg}. Retrying hydration...`);
        await new Promise(r => setTimeout(r, 800));
        this.cookies = []; // Critical: Clear session and start fresh
        return this.fetchLevel(type, level, l123, path, retriesLeft - 1);
      }

      const isFatalError = uniqueItems.length === 0 && (errorMsg.includes(': is Not found') || errorMsg.includes('error'));

      return {
        items: uniqueItems,
        breadcrumb,
        error: isFatalError ? errorMsg : undefined
      };
    } catch (e: any) {
      if (retriesLeft > 0) {
        console.warn(`[Scrape Retry] ${e.message}. (${retriesLeft} left)`);
        await new Promise(r => setTimeout(r, 800));
        this.cookies = [];
        return this.fetchLevel(type, level, l123, path, retriesLeft - 1);
      }
      throw e;
    }
  }

  async crawl(type: string, level: string | null, l123: string, maxDepth: number, currentDepth: number = 0, seen: Set<string> = new Set(), path: string[] = []): Promise<SyllabusNode[]> {
    const cacheKey = `${level}-${l123}`;
    if (seen.has(cacheKey)) return [];
    seen.add(cacheKey);

    const { items, error } = await this.fetchLevel(type, level, l123, path);
    if (error || currentDepth >= maxDepth || items.length === 0) return items;

    const nextPath = level ? [...path, level] : path;
    return await Promise.all(items.map(async (item) => {
      if (!item.isPdf && item.params?.level && item.params?.l123) {
        try {
          const children = await this.crawl(type, item.params.level, item.params.l123, maxDepth, currentDepth + 1, seen, nextPath);
          if (children.length > 0) return { ...item, children };
        } catch (e: any) {
          console.error(`Recursive crawl failed for [${item.title}]:`, e.message);
        }
      }
      return item;
    }));
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'syllabus';
  const level = searchParams.get('level');
  const l123 = searchParams.get('l123') || '0';
  const rawPath = searchParams.get('path');
  const path = rawPath ? rawPath.split(',').filter(p => !!p && p !== 'null') : [];

  const nested = searchParams.get('nested') === 'true' || searchParams.has('depth');
  const maxDepth = parseInt(searchParams.get('depth') || (nested ? '3' : '0'));

  try {
    const scraper = new JNTUHScraper();
    if (nested || maxDepth > 0) {
      const tree = await scraper.crawl(type, level, l123, maxDepth, 0, new Set(), path);
      return NextResponse.json({ type: 'nested', tree });
    } else {
      const result = await scraper.fetchLevel(type, level, l123, path);
      return NextResponse.json(result);
    }
  } catch (error: any) {
    console.error('Final Scraper Failure:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function extractBreadcrumbs($: cheerio.CheerioAPI) {
  const breadcrumbs: any[] = [];
  $('nav1 span a').each((_, el) => {
    const $el = $(el);
    breadcrumbs.push({
      title: $el.text().trim().replace(/\s+/g, ' ').replace('/', '').trim(),
      link: $el.attr('href')
    });
  });
  return breadcrumbs;
}
