/**
 * Upstream configuration and headers for jntuhresults.dhethi.com
 *
 * The upstream FastAPI backend (ThilakReddyy/jntuh-backend) uses ApiKeyHeaderMiddleware
 * to require either an X-Api-Key header or an approved mobile User-Agent (jntuh-connect-ios/1.0
 * or okhttp/*).
 */

export const JNTUH_BASE_URL = 'https://jntuhresults.dhethi.com/api';

export function getUpstreamHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'User-Agent': 'jntuh-connect-ios/1.0',
  };

  const apiKey = process.env.JNTUH_API_KEY || process.env.API_ACCESS_KEY;
  if (apiKey) {
    headers['X-Api-Key'] = apiKey;
  }

  return headers;
}
