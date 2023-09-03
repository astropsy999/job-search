import { nextElementInList } from '@/utils/nextElementInList'
import { describe } from 'vitest'

describe('nextElementInList', () => {
  it('locates element in list and returns next element in list', () => {
    const list = ['A', 'B', 'C', 'D', 'E']
    const value = 'C'
    const result = nextElementInList(list, value)
    expect(result).toBe('D')
  })
  it('locates next element at start', () => {
    const list = ['A', 'B', 'C', 'D', 'E']
    const value = 'E'
    const result = nextElementInList(list, value)
    expect(result).toBe('A')
  })
})
