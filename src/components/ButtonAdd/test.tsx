import { render, screen } from '@testing-library/react'

import ButtonAdd from '.'

describe('<ButtonAdd/>', () => {
  it('should render the heading', () => {
    const { container } = render(<ButtonAdd />)
    expect(
      screen.getByRole('heading', { name: /ButtonAdd/i })
    ).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
