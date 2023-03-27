import { render } from '@testing-library/react'

import { InputGroup } from '../'

describe('InputGroup', () => {
  it('should render the input group with an icon and children', () => {
    const { getByTestId } = render(
      <InputGroup icon="fa fa-search">
        <input type="text" />
      </InputGroup>
    )
    const inputGroup = getByTestId('input-group')
    expect(inputGroup).toBeInTheDocument()
    expect(inputGroup.querySelector('.fa.fa-search')).toBeInTheDocument()
    expect(inputGroup.querySelector('input[type="text"]')).toBeInTheDocument()
  })
})
