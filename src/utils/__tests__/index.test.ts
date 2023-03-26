import { resolvedNumbers } from '../'

describe('resolvedNumbers', () => {
  it('should return an empty string if numbers array is empty', () => {
    const result = resolvedNumbers([])
    expect(result).toEqual('')
  })

  it('should return a string of comma separated numbers', () => {
    const numbers = [{ number: 1 }, { number: 2 }, { number: 3 }]
    const result = resolvedNumbers(numbers)
    expect(result).toEqual('1, 2, 3')
  })

  it('should return a string with only one number if the array has only one element', () => {
    const numbers = [{ number: 1 }]
    const result = resolvedNumbers(numbers)
    expect(result).toEqual('1')
  })
})
