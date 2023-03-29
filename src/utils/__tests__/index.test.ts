import { getOnlyNumbers } from './../index'
import { getErrors, resolvedNumbers, unMask } from '../'

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

describe('getErrors function', () => {
  it('should return default message Error "Error in request" when there are no errors', () => {
    const result = getErrors()
    expect(result).toEqual('Error in request')
  })

  it('should remove dots from error messages', () => {
    const errors = { error1: 'Error message...', error2: 'Another error...' }
    const result = getErrors(errors)
    expect(result).toEqual('Error message, Another error')
  })
})

describe('getOnlyNumbers', () => {
  it('should return empty string when input is empty', () => {
    expect(getOnlyNumbers('')).toEqual('')
  })

  it('should return only numbers from string', () => {
    expect(getOnlyNumbers('abc123def456')).toEqual('123456')
    expect(getOnlyNumbers('1a2b3c4d5e6f')).toEqual('123456')
    expect(getOnlyNumbers('1 2 3 4 5 6')).toEqual('123456')
    expect(getOnlyNumbers('foo')).toEqual('')
  })
})

describe('unMask', () => {
  it('should return  empty string when input is empty', () => {
    expect(unMask('')).toEqual('')
  })

  it('should return only numbers from string', () => {
    expect(unMask('abc123def456')).toEqual('123456')
    expect(unMask(['1a2b3c4d5e6f', 'foo'])).toEqual(['123456'])
    expect(unMask('1 2 3 4 5 6')).toEqual('123456')
  })
})
