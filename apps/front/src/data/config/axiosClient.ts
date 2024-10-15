import axios, { AxiosInstance } from 'axios'

let apiClient: AxiosInstance

export const axiosClient = () => {
  if (!apiClient) {
    apiClient = axios.create({
      baseURL: ``,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
  }
  return apiClient
}

export const api = axiosClient()
