import { render, fireEvent, screen } from '@testing-library/react'

import { InputField } from '../'

describe('InputField', () => {
  const mockOnChange = jest.fn()

  const defaultProps = {
    type: 'text',
    name: 'input-field',
    value: '',
    dataTestId: 'input-test',
    required: true,
    onChange: mockOnChange
  }

  it('should render InputField with given props', () => {
    render(<InputField {...defaultProps} />)

    const inputElement = screen.getByTestId('input-test')

    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveAttribute('type', defaultProps.type)
    expect(inputElement).toHaveAttribute('name', defaultProps.name)
    expect(inputElement).toHaveAttribute('value', defaultProps.value)
    expect(inputElement).toHaveAttribute('required', '')

    fireEvent.change(inputElement, { target: { value: 'new value' } })

    expect(mockOnChange).toHaveBeenCalledTimes(1)
  })

  it('should render InputField with optional props', () => {
    const props = {
      ...defaultProps,
      placeholder: 'Enter your name',
      required: false,
      dataTestId: 'input-field-test'
    }

    render(<InputField {...props} />)

    const inputElement = screen.getByTestId(props.dataTestId)

    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveAttribute('placeholder', props.placeholder)
    expect(inputElement).not.toHaveAttribute('required')
  })
})
