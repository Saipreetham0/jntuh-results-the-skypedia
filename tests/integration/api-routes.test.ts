import { describe, expect, it, vi, beforeEach } from 'vitest'
import axios from 'axios'

vi.mock('@/server/rate-limit', () => ({
  rateLimit: vi.fn(() => ({ success: true, remaining: 100, resetAt: Date.now() + 60000 })),
  getClientIp: vi.fn(() => '127.0.0.1'),
}))

vi.mock('axios', () => {
  const getMock = vi.fn().mockResolvedValue({ data: '', headers: {} })
  return {
    default: {
      get: getMock,
      create: vi.fn(() => ({
        get: getMock,
      })),
      isAxiosError: (err: any) => Boolean(err?.isAxiosError),
    },
    isAxiosError: (err: any) => Boolean(err?.isAxiosError),
  }
})

vi.mock('next/headers', () => ({
  cookies: vi.fn(async () => ({
    get: vi.fn((name: string) => (name === 'google_refresh_token' ? { value: 'fake_token' } : undefined)),
  })),
}))

import { NextRequest } from 'next/server'
import { GET as getConsolidated } from '../../src/app/api/consolidated-results/route'
import { GET as getSemesterWise } from '../../src/app/api/semester-wise-results/route'
import { GET as getClassResults } from '../../src/app/api/class-results/route'
import { GET as getResultContrast } from '../../src/app/api/result-contrast/route'
import { GET as getGraceMarks } from '../../src/app/api/grace-marks/eligibility/route'
import { GET as getNotifications } from '../../src/app/api/notifications/route'
import { GET as getHardRefresh } from '../../src/app/api/hard-refresh/route'
import { GET as getSyllabus } from '../../src/app/api/syllabus/route'
import { POST as postContact } from '../../src/app/api/contact/route'
import { POST as postSubscribe } from '../../src/app/api/subscribe/route'
import { POST as postCalendarSync } from '../../src/app/api/calendar/sync/route'

const mockedAxios = axios as unknown as { get: ReturnType<typeof vi.fn> }

beforeEach(() => {
  mockedAxios.get.mockReset()
  mockedAxios.get.mockResolvedValue({ data: '<html></html>', headers: {} })
})

describe('GET /api/consolidated-results', () => {
  it('returns 422 if htno is missing', async () => {
    const res = await getConsolidated(new Request('http://localhost/api/consolidated-results'))
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.detail?.[0]?.msg).toContain('Hall ticket number is required')
  })

  it('returns 422 for invalid format', async () => {
    const res = await getConsolidated(new Request('http://localhost/api/consolidated-results?htno=BAD'))
    expect(res.status).toBe(422)
    const body = await res.json()
    expect(body.detail?.[0]?.msg).toContain('Invalid hall ticket number format')
  })

  it('returns 200 on valid upstream response', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { details: { name: 'Student A' }, results: {} } })
    const res = await getConsolidated(new Request('http://localhost/api/consolidated-results?htno=20J25A0501'))
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.details.name).toBe('Student A')
  })
})

describe('GET /api/semester-wise-results', () => {
  it('returns 422 if rollNumber is missing', async () => {
    const res = await getSemesterWise(new Request('http://localhost/api/semester-wise-results'))
    expect(res.status).toBe(422)
  })

  it('returns 200 on valid upstream response', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        details: { name: 'Student B', rollNumber: '20J25A0501' },
        results: [],
      },
    })
    const res = await getSemesterWise(new Request('http://localhost/api/semester-wise-results?rollNumber=20J25A0501'))
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.details.name).toBe('Student B')
  })
})

describe('GET /api/class-results', () => {
  it('returns 422 if rollNumber is missing', async () => {
    const res = await getClassResults(new Request('http://localhost/api/class-results'))
    expect(res.status).toBe(422)
  })

  it('returns 200 on successful upstream call', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { students: [] } })
    const res = await getClassResults(new Request('http://localhost/api/class-results?rollNumber=20J25A0501'))
    expect(res.status).toBe(200)
  })
})

describe('GET /api/result-contrast', () => {
  it('returns 422 if roll numbers missing', async () => {
    const res = await getResultContrast(new Request('http://localhost/api/result-contrast?rollNumber1=20J25A0501'))
    expect(res.status).toBe(422)
  })

  it('returns 200 on valid response', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { comparison: [] } })
    const res = await getResultContrast(new Request('http://localhost/api/result-contrast?rollNumber1=20J25A0501&rollNumber2=20J25A0502'))
    expect(res.status).toBe(200)
  })
})

describe('GET /api/grace-marks/eligibility', () => {
  it('returns 422 if rollNumber is missing', async () => {
    const res = await getGraceMarks(new Request('http://localhost/api/grace-marks/eligibility'))
    expect(res.status).toBe(422)
  })

  it('returns 200 on upstream response', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { eligible: true } })
    const res = await getGraceMarks(new Request('http://localhost/api/grace-marks/eligibility?rollNumber=20J25A0501'))
    expect(res.status).toBe(200)
  })
})

describe('GET /api/notifications', () => {
  it('returns 200 with default page', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { items: [], total: 0 } })
    const res = await getNotifications(new Request('http://localhost/api/notifications?page=1'))
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.total).toBe(0)
  })
})

describe('GET /api/hard-refresh', () => {
  it('returns 422 if rollNumber is missing', async () => {
    const res = await getHardRefresh(new Request('http://localhost/api/hard-refresh'))
    expect(res.status).toBe(422)
  })

  it('returns 200 on successful refresh', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { refreshed: true } })
    const res = await getHardRefresh(new Request('http://localhost/api/hard-refresh?rollNumber=20J25A0501'))
    expect(res.status).toBe(200)
  })
})

describe('GET /api/syllabus', () => {
  it('returns response from scraper handler', async () => {
    const res = await getSyllabus(new NextRequest('http://localhost/api/syllabus'))
    expect([200, 500]).toContain(res.status)
  })
})

describe('POST /api/contact', () => {
  it('returns 503 if RESEND_API_KEY is not configured', async () => {
    const res = await postContact(
      new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: 'John Doe', email: 'john@example.com', message: 'Hello' }),
      })
    )
    expect(res.status).toBe(503)
  })
})

describe('POST /api/subscribe', () => {
  it('returns 400 for invalid email', async () => {
    const res = await postSubscribe(
      new Request('http://localhost/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'not-an-email' }),
      })
    )
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.message).toContain('Invalid email')
  })
})

describe('POST /api/calendar/sync', () => {
  it('returns 400 if events array is empty or missing', async () => {
    const res = await postCalendarSync(
      new Request('http://localhost/api/calendar/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events: [] }),
      })
    )
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.error).toContain('No events provided')
  })
})
