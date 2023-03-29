import { INumbers } from 'components/Main'
import { isArray } from 'lodash'

export const resolvedNumbers = (numbers: INumbers[] = []) => {
  if (numbers.length === 0) return ''

  return numbers.map((item: INumbers) => item.number).join(', ')
}

export const getErrors = (errors = {}) => {
  const errorValues = Object.values(errors)
  const removeDotsInErrors = errorValues.map((item: string[]) =>
    item.toString().replace('...', '')
  )
  return removeDotsInErrors.length
    ? removeDotsInErrors.join(', ')
    : 'Error in request'
}

export const getOnlyNumbers = (str: string) => {
  if (!str) return ''
  return str?.match(/\d+/g)?.join('') || ''
}

export const unMask = (str: string) => {
  if (isArray(str)) {
    const mapValue = str.map((item: string) => getOnlyNumbers(item))
    return mapValue.filter(Boolean)
  }

  return getOnlyNumbers(str)
}
