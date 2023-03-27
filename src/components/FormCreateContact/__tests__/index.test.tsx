import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { FormCreateContact } from '../'
import { baseUrl, urlRequest } from 'services/api'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { contactsMock } from '../../../../mocks/contacts.mock'
describe('FormCreateContact', () => {
  const mockRequest = new MockAdapter(axios)
  afterEach(() => {
    mockRequest.reset()
  })

  const mockHandlerEditContact = jest.fn()
  const mockDispatch = jest.fn()

  beforeEach(() => {
    mockHandlerEditContact.mockClear()
    mockDispatch.mockClear()
  })

  it('should render the form with inputs', () => {
    render(
      <FormCreateContact
        contactSelected={null}
        handlerEditContact={mockHandlerEditContact}
        dispatch={mockDispatch}
      />
    )

    expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Telefone')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Seu melhor email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Cpf')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Nasc.. YYYY-mm-dd')).toBeInTheDocument()
  })

  it('should update the name input when the user types', async () => {
    render(
      <FormCreateContact
        contactSelected={null}
        handlerEditContact={mockHandlerEditContact}
        dispatch={mockDispatch}
      />
    )

    const inputName = screen.getByTestId('name')
    const newName = 'New Name'

    fireEvent.change(inputName, { target: { value: newName } })

    await waitFor(() => {
      expect(inputName).toHaveValue(newName)
    })
  })

  it('should submit the form when the user clicks on the submit button', async () => {
    render(
      <FormCreateContact
        contactSelected={null}
        handlerEditContact={mockHandlerEditContact}
        dispatch={mockDispatch}
      />
    )
    mockRequest.onPost(baseUrl).reply(200, contactsMock)
    mockRequest.onPost(urlRequest).reply(200, contactsMock)

    const buttonSubmit = screen.getByTestId('button-submit')
    const newName = 'New Name'
    const newNumbers = '1111111111'
    const newEmail = 'newemail@example.com'
    const newCpf = '12345678910'
    const dateBorn = '1998-12-12'

    const inputName = screen.getByTestId('name')
    const inputNumbers = screen.getByPlaceholderText('Telefone')
    const inputEmail = screen.getByPlaceholderText('Seu melhor email')
    const inputCpf = screen.getByPlaceholderText('Cpf')
    const inputDateBorn = screen.getByPlaceholderText('Nasc.. YYYY-mm-dd')

    fireEvent.change(inputName, { target: { value: newName } })
    fireEvent.change(inputNumbers, { target: { value: newNumbers } })
    fireEvent.change(inputEmail, { target: { value: newEmail } })
    fireEvent.change(inputCpf, { target: { value: newCpf } })
    fireEvent.change(inputDateBorn, { target: { value: dateBorn } })

    fireEvent.click(buttonSubmit)
    jest.advanceTimersByTime(1000)
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(1)
    })
  })
})
