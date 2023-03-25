/* eslint-disable @typescript-eslint/ban-types */
import axios, { AxiosRequestConfig } from 'axios'
import { TYPES_ACTIONS } from 'contexts/PhoneBook'

const baseUrl = 'http://teste-frontend.saperx.com.br/api/schedule'

interface IResolvedRequest {
  url?: string
  method?: string
  data?: object
}

export const resolvedRequest = async ({
  url = baseUrl,
  method = 'GET',
  data = {}
}: IResolvedRequest = {}): Promise<AxiosRequestConfig> => {
  console.log({ data })
  const axiosConfig: AxiosRequestConfig<any> = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  }
  try {
    const response = await axios(url, axiosConfig)
    return { ...response }
  } catch (error) {
    throw new Error(`${error}`)
  }
}

export const fetchContacts = async (): Promise<AxiosRequestConfig> => {
  return resolvedRequest()
}

export const createContact = async (data: ICreateContact) => {
  await resolvedRequest({
    data,
    method: 'POST'
  })
}
export const editContact = async (data: IResponseCreateContact) => {
  await resolvedRequest({
    method: 'PUT',
    url: `${baseUrl}/${data.id}`,
    data
  })
}

export const deleteContact = async (id: number) => {
  await resolvedRequest({
    method: 'DELETE',
    url: `${baseUrl}/${id}`
  })
}

export const reFetchContacts = (dispatch: React.Dispatch<any>) => {
  setTimeout(() => {
    dispatch({
      type: TYPES_ACTIONS.REFRESH_CONTACTS
    })
  }, 2000)
}
