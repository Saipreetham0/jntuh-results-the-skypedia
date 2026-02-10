import { describe, expect, it } from 'vitest'
import { cn } from '../../src/lib/utils'

describe('cn', () => {
  it('merges class names and removes duplicates', () => {
    const result = cn('px-2', 'px-4', 'text-sm', undefined, false)
    expect(result).toBe('px-4 text-sm')
  })

  it('handles conditional classes', () => {
    const result = cn('base', true && 'enabled', false && 'disabled')
    expect(result).toBe('base enabled')
  })
})
