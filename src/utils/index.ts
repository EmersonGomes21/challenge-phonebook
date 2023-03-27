import { INumbers } from 'components/Main'

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
