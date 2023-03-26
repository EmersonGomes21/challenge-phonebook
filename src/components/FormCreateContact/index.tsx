/* eslint-disable prettier/prettier */
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { createContact, reFetchContacts } from 'services/api'
interface IFormCreateContact {
  contactSelected: IResponseCreateContact | null
  handlerEditContact: (values: IResponseCreateContact) => void
  dispatch: React.Dispatch<any>
}
const FormCreateContact = ({
  contactSelected,
  handlerEditContact,
  dispatch
}: IFormCreateContact) => {
  const initialValues = {
    name: '',
    numbers: '',
    email: '',
    cpf: '',
    date_born: '',
    id: ''
  }

  const [values, setValues] = useState<IResponseCreateContact | any>(
    initialValues
  )
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (!contactSelected) {
      setValues({
        ...initialValues
      })
    } else {
      setValues({
        ...contactSelected
      })
    }
  }, [contactSelected])
  const InputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues({
      ...values,
      [name]: value
    })
  }
  const isCreatedContact = !values.id
  const handlerSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setIsLoading(true)

    event.preventDefault()

    const payload = {
      ...values,
      numbers: values.numbers.split(',')
    }

    const currentAction = isCreatedContact ? createContact : handlerEditContact

    currentAction(payload)
    reFetchContacts(dispatch)

    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }
  return (
    <form action="" autoComplete="off" onSubmit={handlerSubmit}>
      <div className="form-group input-group">
        <div className="input-grou-prepend">
          <div className="input-group-text text-larger">
            <i className="fas fa-user"></i>
          </div>
        </div>

        <input
          type="text"
          className="form-control"
          placeholder="Nome"
          name="name"
          value={values.name}
          onChange={InputChange}
          required
          data-testid="name"
        />
      </div>

      <div className="row">
        <div className="form-group input-group col-md-6">
          <div className="input-grou-prepend">
            <div className="input-group-text text-larger">
              <i className="fas fa-mobile-alt"></i>
            </div>
          </div>

          <input
            type="text"
            className="form-control"
            placeholder="Telefone"
            name="numbers"
            value={values?.numbers}
            onChange={InputChange}
            required
          />
        </div>

        <div className="form-group input-group col-md-6">
          <div className="input-grou-prepend">
            <div className="input-group-text text-larger">
              <i className="fas fa-envelope"></i>
            </div>
          </div>

          <input
            type="text"
            className="form-control"
            placeholder="Seu melhor email"
            name="email"
            value={values.email}
            onChange={InputChange}
            required
          />
        </div>
      </div>

      <div className="row">
        <div className="form-group input-group col-md-6">
          <div className="input-grou-prepend">
            <div className="input-group-text text-larger">
              <i className="fas  fa-id-badge"></i>
            </div>
          </div>

          <input
            type="text"
            className="form-control"
            placeholder="Cpf"
            name="cpf"
            value={values.cpf}
            onChange={InputChange}
            required
          />
        </div>

        <div className="form-group input-group col-md-6">
          <div className="input-grou-prepend">
            <div className="input-group-text text-larger">
              <i className="fas fa-calendar"></i>
            </div>
          </div>

          <input
            type="text"
            className="form-control"
            placeholder="Nasc.. YYYY-mm-dd"
            name="date_born"
            value={values.date_born}
            onChange={InputChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <input
          data-testid="button-submit"
          type="submit"
          value={
            isLoading ? 'loading...' : isCreatedContact ? 'Salvar' : 'Atualizar'
          }
          className="btn btn-primary btn-block"
          disabled={isLoading}
        />
      </div>
    </form>
  )
}

export { FormCreateContact }
