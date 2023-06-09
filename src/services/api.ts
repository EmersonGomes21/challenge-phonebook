/* eslint-disable @typescript-eslint/ban-types */

import axios, { AxiosRequestConfig } from 'axios'
import { TYPES_ACTIONS } from 'contexts/PhoneBook'
import { toast } from 'react-toastify'
import { getErrors } from '../utils'
const isDev = process.env.NODE_ENV === 'development'
export const proxyForPassBlockRequestHTTPVERCEL =
  'https://cors-anywhere.herokuapp.com'
export const baseUrl = 'http://teste-frontend.saperx.com.br/api/schedule'

export const urlRequest = isDev
  ? baseUrl
  : `${proxyForPassBlockRequestHTTPVERCEL}/${baseUrl}`

interface IResolvedRequest {
  url?: string
  method?: string
  data?: object
}
const defaultToastConfigs = {
  position: toast.POSITION.TOP_CENTER,
  autoClose: 5000
}
export const resolvedRequest = async ({
  url = urlRequest,
  method = 'GET',
  data = {}
}: IResolvedRequest = {}): Promise<AxiosRequestConfig> => {
  console.log(data)
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
    if (method.toLocaleUpperCase() !== 'GET') {
      toast.success(response?.data?.message, defaultToastConfigs)
    }
    return { ...response }
  } catch (error) {
    const errors = getErrors(error?.response?.data?.errors)
    toast.error(errors, defaultToastConfigs)
    return Promise.reject()
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
    url: `${urlRequest}/${data.id}`,
    data
  })
}

export const deleteContact = async (id: number) => {
  await resolvedRequest({
    method: 'DELETE',
    url: `${urlRequest}/${id}`
  })
}

export const reFetchContacts = (dispatch: React.Dispatch<any>) => {
  setTimeout(() => {
    dispatch({
      type: TYPES_ACTIONS.REFRESH_CONTACTS
    })
  }, 1000)
}
