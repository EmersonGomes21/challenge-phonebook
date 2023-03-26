import { render, fireEvent } from '@testing-library/react'
import { ButtonAdd } from '../index'

describe('ButtonAdd component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<ButtonAdd onClick={() => {}} />)
    const buttonAdd = getByTestId('button-add')
    expect(buttonAdd).toBeInTheDocument()
  })

  it('calls onClick prop when clicked', () => {
    const handleClick = jest.fn()
    const { getByTestId } = render(<ButtonAdd onClick={handleClick} />)
    const buttonAdd = getByTestId('button-add')
    fireEvent.click(buttonAdd)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
