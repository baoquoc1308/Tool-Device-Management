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
    const config = error.config
    const refreshToken = Cookies.get('refreshToken')
    const status = error.response?.data.status
    const message = error.response?.data.msg
    if (status === 401 && message === 'Access Token expired') {
      const { data, error } = await tryCatch(httpRequest.post('/auth/refresh', { refresh_token: refreshToken }))
      if (error) {
        if ((error as any).response?.data.msg === 'Refresh token was expired') {
          Cookies.remove('accessToken')
          Cookies.remove('refreshToken')
          window.location.href = '/login'
          return Promise.reject(error)
        } else return Promise.reject(error)
      }
      Cookies.set('accessToken', data?.data?.data.access_token)
      config.headers.Authorization = `Bearer ${data?.data?.data.access_token}`

      return await httpClient(config)
    }
    return Promise.reject(error)
  }
)
