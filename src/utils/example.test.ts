import { describe, it, expect } from 'vitest'
import fc from 'fast-check'

describe('Property-Based Testing Setup', () => {
  it('should verify fast-check is working with a simple property', () => {
    fc.assert(
      fc.property(
        fc.integer(),
        (n) => {
          // Property: adding zero to any number returns the same number
          expect(n + 0).toBe(n)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('should verify fast-check works with strings', () => {
    fc.assert(
      fc.property(
        fc.string(),
        (s) => {
          // Property: string length is always non-negative
          expect(s.length).toBeGreaterThanOrEqual(0)
        }
      ),
      { numRuns: 100 }
    )
  })
})
