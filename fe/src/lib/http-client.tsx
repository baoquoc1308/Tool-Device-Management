import { httpRequest, tryCatch } from '@/utils'
import axios from 'axios'
import Cookies from 'js-cookie'

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

httpClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

httpClient.interceptors.response.use(
  (response) => {
    //do sth here for post-response
    return response
  },
  async (error) => {
    console.log('error', error)
    if (error.status === 401) {
      const { data, error } = await tryCatch(httpRequest.get('/auth/refresh'))
      if (error) {
        return Promise.reject(error)
      }
      console.log('data', data)
      Cookies.set('accessToken', data?.data?.access_token)
    }
    return Promise.reject(error)
  }
)
