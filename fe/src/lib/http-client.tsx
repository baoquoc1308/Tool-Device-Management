import { httpRequest, tryCatch } from '@/utils'
import axios, { type InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

let isRefreshing = false

type RequestFailed = {
  config: InternalAxiosRequestConfig
  resolve: (value: any) => void
  reject: (reason?: any) => void
}

let requestFailed: RequestFailed[] = []

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
    if ((status === 401 && message === 'Access Token expired') || message === 'Access Token Invoked') {
      if (!isRefreshing) {
        isRefreshing = true
        const { data, error } = await tryCatch(httpRequest.post('/auth/refresh', { refresh_token: refreshToken }))
        if (error) {
          if (
            (error as any).response?.data.msg === 'Refresh token was expired' ||
            (error as any).response?.data.msg === 'Refresh token was invoked'
          ) {
            Cookies.remove('accessToken')
            Cookies.remove('refreshToken')
            window.location.href = '/login'
            return Promise.reject(error)
          } else return Promise.reject(error)
        }
        Cookies.set('accessToken', data?.data?.data.access_token)
        config.headers.Authorization = `Bearer ${data?.data?.data.access_token}`
        for (const { config, resolve, reject } of requestFailed) {
          try {
            const data = await httpClient(config)
            resolve(data)
          } catch (error) {
            reject(error)
          }
        }
        requestFailed = []
        isRefreshing = false
        return await httpClient(config)
      }
      return new Promise((resolve, reject) => {
        requestFailed.push({ config, resolve, reject })
      })
    }
    return Promise.reject(error)
  }
)
