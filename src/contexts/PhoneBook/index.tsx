import { isEmpty } from 'lodash'
import React, { createContext, useContext, useReducer } from 'react'

export interface IContact {
  name: string
  numbers: string[]
  email: string
  cpf: string
  date_born: string
  id: string
}

interface IUsePhoneBook {
  state: {
    contacts: IContact[]
    refresh: boolean
    contactSelected: IContact
  }
  dispatch: React.Dispatch<any>
}

interface IAction {
  payload: any
  type: string
}
export const ContextPhoneBook = createContext({} as IUsePhoneBook)

const initialState = {
  contacts: [],
  refresh: false,
  contactSelected: null
}
export const TYPES_ACTIONS = {
  FETCH_CONTACTS: 'FETCH_CONTACTS',
  REFRESH_CONTACTS: 'REFRESH_CONTACTS',
  SELECT_CONTACT: 'SELECT_CONTACT'
}

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case TYPES_ACTIONS.FETCH_CONTACTS:
      return { ...state, contacts: action.payload.data }
    case TYPES_ACTIONS.REFRESH_CONTACTS:
      return { ...state, refresh: !state.refresh }
    case TYPES_ACTIONS.SELECT_CONTACT:
      return { ...state, contactSelected: action.payload }
    default:
      return state
  }
}

export const PhoneBookProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <ContextPhoneBook.Provider value={{ state, dispatch }}>
      {children}
    </ContextPhoneBook.Provider>
  )
}

export const usePhoneBook = (): IUsePhoneBook => {
  const context = useContext(ContextPhoneBook)
  if (isEmpty(context)) throw new Error('Context not found')
  return { ...context }
}
