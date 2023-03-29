/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputGroup } from 'components/InputGroup'
import { InputField } from 'components/InputField'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { createContact, reFetchContacts } from 'services/api'
import { unMask } from '../../utils'
import { isValid } from 'cpf'
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
  const isValidCpf = isValid(values.cpf)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setIsLoading(true)

    event.preventDefault()

    const payload = {
      ...values,
      cpf: unMask(values.cpf),
      numbers: unMask(values.numbers.split(','))
    }

    const currentAction = isCreatedContact ? createContact : handlerEditContact

    currentAction(payload)
    reFetchContacts(dispatch)

    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <form action="" autoComplete="off" onSubmit={handleSubmit}>
      <InputGroup icon="fas fa-user">
        <InputField
          minLength={6}
          name="name"
          placeholder="Nome"
          value={values.name}
          onChange={InputChange}
          dataTestId="name"
        />
      </InputGroup>

      <div className="row">
        <div className="form-group input-group col-md-6">
          <InputGroup icon="fas fa-mobile-alt">
            <InputField
              minLength={12}
              type="text"
              mask="99 99999-9999, 99 99999-9999, 99 99999-9999"
              name="numbers"
              placeholder="Telefone"
              value={values.numbers}
              onChange={InputChange}
            />
          </InputGroup>
        </div>

        <div className="form-group input-group col-md-6">
          <InputGroup icon="fas fa-envelope">
            <InputField
              type="email"
              name="email"
              placeholder="Seu melhor email"
              value={values.email}
              onChange={InputChange}
            />
          </InputGroup>
        </div>
      </div>

      <div className="row">
        <div className="form-group input-group col-md-6 is-invalid">
          <InputGroup icon="fas fa-id-badge">
            <InputField
              aria-describedby="error-msg"
              type="tel"
              mask="999.999.999-99"
              name="cpf"
              placeholder="Cpf"
              value={values.cpf}
              onChange={InputChange}
              className={isValidCpf ? '' : 'is-invalid'}
            />
            <div
              id="error-msg"
              className="invalid-feedback"
              style={{
                position: 'absolute',
                bottom: -15
              }}
            >
              Digite um cpf válido
            </div>
          </InputGroup>
        </div>

        <div className="form-group input-group col-md-6">
          <InputGroup icon="fas fa-calendar">
            <InputField
              type="date"
              placeholder="Nasc.. YYYY-mm-dd"
              name="date_born"
              value={values.date_born}
              onChange={InputChange}
            />
          </InputGroup>
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
          disabled={!isValidCpf || isLoading}
        />
      </div>
    </form>
  )
}

export { FormCreateContact }
