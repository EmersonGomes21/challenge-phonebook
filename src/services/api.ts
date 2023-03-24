import axios, { AxiosRequestConfig } from 'axios'

const baseUrl = 'http://teste-frontend.saperx.com.br/api/schedule'

interface ICreateContact {
  name: string
  numbers: string[]
  email: string
  cpf: string
  date_born: string
}

export const resolvedRequest = async ({
  url = baseUrl,
  method = 'POST',
  body = {}
}) => {
  console.log({ body })

  const axiosConfig: AxiosRequestConfig<any> = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(body)
  }
  try {
    const response = await axios(url, axiosConfig)
    return { ...response }
  } catch (error) {
    throw new Error(`${error}`)
  }
}

export const fetchContacts = async () => {
  return resolvedRequest({
    method: 'GET'
  })
}

export const createContact = async (body: ICreateContact) =>
  resolvedRequest({
    body
  })

export const deleteContact = async () =>
  resolvedRequest({
    method: 'DELETE',
    url: `${baseUrl}/83`
  })
