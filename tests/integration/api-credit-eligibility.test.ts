import { describe, expect, it, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { GET } from '../../src/app/api/credit-eligibility/route'

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

describe('GET /api/credit-eligibility', () => {
  it('returns 422 for missing htno', async () => {
    const request = new Request('http://localhost/api/credit-eligibility')
    const response = await GET(request)
    const body = await response.json()

    expect(response.status).toBe(422)
    expect(body.detail?.[0]?.msg).toContain('Hall ticket number is required')
  })

  it('returns 504 on timeout', async () => {
    mockedAxios.get.mockRejectedValue({
      isAxiosError: true,
      code: 'ECONNABORTED',
      message: 'timeout',
    })

    const request = new Request('http://localhost/api/credit-eligibility?htno=20J25A0501')
    const response = await GET(request)
    const body = await response.json()

    expect(response.status).toBe(504)
    expect(body.detail).toContain('timed out')
  })

  it('returns data when upstream responds', async () => {
    mockedAxios.get.mockResolvedValue({
      data: { ok: true },
    })

    const request = new Request('http://localhost/api/credit-eligibility?htno=20J25A0501')
    const response = await GET(request)
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body.ok).toBe(true)
  })
})
