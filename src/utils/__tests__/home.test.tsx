import { render, screen } from '@testing-library/react'
import { PhoneBookProvider } from 'contexts/PhoneBook'
import Home from '../../pages'
describe('Index', () => {
  it('should render the header', () => {
    render(
      <PhoneBookProvider>
        <Home />
      </PhoneBookProvider>
    )
    const saperX = screen.getByText(
      'SaperX, Conectando Vidas Através de Linhas Telefônicas!'
    )
    expect(saperX).toBeInTheDocument()
  })
})
