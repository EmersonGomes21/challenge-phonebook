/* eslint-disable no-var */
import React, { useEffect } from 'react'
import { FormCreateContact } from 'components/FormCreateContact'
import { IContact, TYPES_ACTIONS, usePhoneBook } from 'contexts/PhoneBook'
import {
  fetchContacts,
  deleteContact,
  editContact,
  reFetchContacts
} from 'services/api'

import * as S from './styles'
import { ButtonAdd } from 'components/ButtonAdd'
import { resolvedNumbers } from '../../utils'
export interface INumbers {
  number: number
  id: number
  id_schedule: number
}
const Main = () => {
  const { state, dispatch } = usePhoneBook()

  const { contacts, refresh, contactSelected } = state

  useEffect(() => {
    fetchContacts().then((response) => {
      dispatch({
        type: TYPES_ACTIONS.FETCH_CONTACTS,
        payload: response.data
      })
    })
  }, [dispatch, refresh])

  const handlerEditContact = async (data: IResponseCreateContact) => {
    await editContact(data)
  }

  const handlerSelectedContact = (data: IResponseCreateContact | null) => {
    dispatch({ type: TYPES_ACTIONS.SELECT_CONTACT, payload: data })
  }

  return (
    <S.Wrapper>
      <S.MainContainer>
        <div className="bg-white mb-5 p-4">
          <div className="container">
            <h1 className="display-4" style={{ color: '#d41313' }}>
              Cadastro de contatos
            </h1>
            <p className="mt-4 lead text-dark">
              SaperX, Conectando Vidas Através de Linhas Telefônicas!
            </p>
          </div>
        </div>
        <div className="row mt-4" style={{ width: '90%' }}>
          <div className="col-md-5" style={{ position: 'relative' }}>
            <ButtonAdd onClick={() => handlerSelectedContact(null)} />
            <FormCreateContact
              handlerEditContact={handlerEditContact}
              contactSelected={contactSelected}
              dispatch={dispatch}
            />
          </div>

          <div className="col-md-7 bg-white">
            <table className="table table-boderless table-stripper">
              <thead className="thead-light">
                <tr>
                  <td>Nome</td>
                  <td>Telefones</td>
                  <td>E-mail</td>
                  <td>cpf</td>
                  <td>date_born</td>
                  <td>Ações</td>
                </tr>
              </thead>

              <tbody>
                {contacts.map((contact: IContact) => {
                  const contactResolved = {
                    ...contact,
                    numbers: resolvedNumbers(contact.numbers)
                  }
                  const { id, name, numbers, email, date_born, cpf } =
                    contactResolved
                  return (
                    <tr key={id}>
                      <td>{name}</td>
                      <td>{numbers}</td>
                      <td>{email}</td>
                      <td>{cpf}</td>
                      <td>{date_born}</td>
                      <td>
                        <a
                          data-testid={`edit-contact-${id}`}
                          className="btn btn-primary "
                          onClick={() =>
                            handlerSelectedContact(contactResolved)
                          }
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </a>
                        <a
                          className="btn btn-danger ml-1"
                          onClick={async () => {
                            await deleteContact(id)
                            reFetchContacts(dispatch)
                          }}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </a>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </S.MainContainer>
    </S.Wrapper>
  )
}

export { Main }
