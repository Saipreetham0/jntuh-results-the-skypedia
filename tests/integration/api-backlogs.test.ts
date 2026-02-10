import { describe, expect, it, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { GET } from '../../src/app/api/backlogs/route'

vi.mock('axios', () => {
  return {
    default: {
      get: vi.fn(),
      isAxiosError: (err: any) => Boolean(err?.isAxiosError),
    },
    isAxiosError: (err: any) => Boolean(err?.isAxiosError),
  }
})

const mockedAxios = axios as unknown as { get: ReturnType<typeof vi.fn> }

beforeEach(() => {
  mockedAxios.get.mockReset()
})

describe('GET /api/backlogs', () => {
  it('returns 422 for missing rollNumber', async () => {
    const request = new Request('http://localhost/api/backlogs')
    const response = await GET(request)
    const body = await response.json()

    expect(response.status).toBe(422)
    expect(body.detail?.[0]?.msg).toContain('Roll number is required')
  })

  it('returns 422 for invalid rollNumber format', async () => {
    const request = new Request('http://localhost/api/backlogs?rollNumber=BAD')
    const response = await GET(request)
    const body = await response.json()

    expect(response.status).toBe(422)
    expect(body.detail?.[0]?.msg).toContain('Invalid roll number format')
  })

  it('returns data when upstream responds', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        details: { name: 'Test' },
        results: { totalBacklogs: 0, semesters: [] },
      },
    })

    const request = new Request('http://localhost/api/backlogs?rollNumber=20J25A0501')
    const response = await GET(request)
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body.results.totalBacklogs).toBe(0)
    expect(body.results.semesters).toEqual([])
  })
})
