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
interface IState {
  contacts: IContact[]
  refresh: boolean
  contactSelected: IContact
}
interface IAction {
  payload: any
  type: string
}
interface IUsePhoneBook {
  state: IState
  dispatch: React.Dispatch<IAction>
}

export const ContextPhoneBook = createContext({} as IUsePhoneBook)

export const TYPES_ACTIONS = {
  FETCH_CONTACTS: 'FETCH_CONTACTS',
  REFRESH_CONTACTS: 'REFRESH_CONTACTS',
  SELECT_CONTACT: 'SELECT_CONTACT'
}

const reducer = (state: IState, action: IAction) => {
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
  const [state, dispatch] = useReducer(reducer, {
    contacts: [],
    refresh: false,
    contactSelected: null
  })

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
