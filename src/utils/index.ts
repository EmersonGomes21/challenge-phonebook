import { INumbers } from 'components/Main'

export const resolvedNumbers = (numbers: INumbers[] = []) => {
  if (numbers.length === 0) return ''

  return numbers.map((item: INumbers) => item.number).join(', ')
}
