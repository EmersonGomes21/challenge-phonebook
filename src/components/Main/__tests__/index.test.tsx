import { render, screen, fireEvent } from '@testing-library/react'
import { Main } from '../'
import { ContextPhoneBook } from 'contexts/PhoneBook'
import { contactsMock } from '../../../../mocks/contacts.mock'

const dispatchMock = jest.fn()
const mockState = {
  state: { contacts: contactsMock },
  dispatch: dispatchMock
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe('Main component', () => {
  const Wrapper = ({ children }) => (
    <ContextPhoneBook.Provider value={mockState}>
      {children}
    </ContextPhoneBook.Provider>
  )

  it('should render the contacts list correctly', () => {
    render(
      <Wrapper>
        <Main />
      </Wrapper>
    )
    const contactsRows = screen.getAllByRole('row')
    expect(contactsRows).toHaveLength(3) // header row + 2 contacts
    expect(screen.getByText('Contact 1')).toBeInTheDocument()
    expect(screen.getByText('123456789')).toBeInTheDocument()
    expect(screen.getByText('contact1@test.com')).toBeInTheDocument()
    expect(screen.getByText('123.456.789-00')).toBeInTheDocument()
    expect(screen.getByText('1990-01-01')).toBeInTheDocument()
    expect(screen.getByText('Contact 2')).toBeInTheDocument()
    expect(screen.getByText('987654321')).toBeInTheDocument()
    expect(screen.getByText('contact2@test.com')).toBeInTheDocument()
    expect(screen.getByText('987.654.321-00')).toBeInTheDocument()
    expect(screen.getByText('1995-01-01')).toBeInTheDocument()
  })
  it('should call  select contact when edit button is clicked', () => {
    render(
      <Wrapper>
        <Main />
      </Wrapper>
    )
    const firstContact = contactsMock[0]
    const { id, cpf, date_born, email, name, numbers } = firstContact
    const editButton = screen.getByTestId(`edit-contact-${contactsMock[0].id}`)
    fireEvent.click(editButton)
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'SELECT_CONTACT',
      payload: {
        id,
        cpf,
        date_born,
        email,
        name,
        numbers: numbers[0].number.toString()
      }
    })
  })
})
