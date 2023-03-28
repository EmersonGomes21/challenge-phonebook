import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { usePhoneBook, PhoneBookProvider } from '../'
import { fireEvent, render, screen } from '@testing-library/react'

const mockContact = {
  name: 'John Doe',
  numbers: ['(11) 98765-4321'],
  email: 'johndoe@example.com',
  cpf: '123.456.789-00',
  date_born: '01/01/1970',
  id: '123'
}

describe('ContextPhoneBook', () => {
  it('Should throw error when usePhoneBook not used with PhoneBookProvider', () => {
    const { result } = renderHook(() => usePhoneBook())
    expect(result.error).toBeDefined()
  })

  it('Should render children components', () => {
    const MockChild = () => <div>Mock Child</div>
    const { getByText } = render(
      <PhoneBookProvider>
        <MockChild />
      </PhoneBookProvider>
    )
    expect(getByText('Mock Child')).toBeInTheDocument()
  })

  it('Should select contact', () => {
    const MockChild = () => {
      const { state, dispatch } = usePhoneBook()
      const contact = {
        name: 'John Doe',
        numbers: ['(99) 99999-9999'],
        email: 'johndoe@example.com',
        cpf: '123.456.789-10',
        date_born: '01/01/1990',
        id: '1'
      }
      return (
        <div>
          <span>{state?.contactSelected?.name ?? ''}</span>
          <button
            onClick={() =>
              dispatch({ type: 'SELECT_CONTACT', payload: contact })
            }
          >
            Select
          </button>
        </div>
      )
    }
    const { getByText } = render(
      <PhoneBookProvider>
        <MockChild />
      </PhoneBookProvider>
    )
    fireEvent.click(getByText('Select'))
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('should throw error if used outside PhoneBookProvider', () => {
    const { result } = renderHook(() => usePhoneBook())
    expect(result.error).toBeDefined()
  })

  it('should initialize with default state', () => {
    const wrapper = ({ children }) => (
      <PhoneBookProvider>{children}</PhoneBookProvider>
    )
    const { result } = renderHook(() => usePhoneBook(), { wrapper })
    expect(result.current.state.contacts).toHaveLength(0)
    expect(result.current.state.refresh).toBeFalsy()
    expect(result.current.state.contactSelected).toBeNull()
  })

  it('should dispatch FETCH_CONTACTS action', () => {
    const wrapper = ({ children }) => (
      <PhoneBookProvider>{children}</PhoneBookProvider>
    )
    const { result } = renderHook(() => usePhoneBook(), { wrapper })

    act(() => {
      result.current.dispatch({
        type: 'FETCH_CONTACTS',
        payload: { data: [mockContact] }
      })
    })

    expect(result.current.state.contacts).toEqual([mockContact])
  })

  it('should dispatch REFRESH_CONTACTS action', () => {
    const wrapper = ({ children }) => (
      <PhoneBookProvider>{children}</PhoneBookProvider>
    )
    const { result } = renderHook(() => usePhoneBook(), { wrapper })

    act(() => {
      result.current.dispatch({ type: 'REFRESH_CONTACTS' })
    })

    expect(result.current.state.refresh).toBeTruthy()
  })

  it('should dispatch SELECT_CONTACT action', () => {
    const wrapper = ({ children }) => (
      <PhoneBookProvider>{children}</PhoneBookProvider>
    )
    const { result } = renderHook(() => usePhoneBook(), { wrapper })

    act(() => {
      result.current.dispatch({
        type: 'SELECT_CONTACT',
        payload: mockContact
      })
    })

    expect(result.current.state.contactSelected).toEqual(mockContact)
  })
})
