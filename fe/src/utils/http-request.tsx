import { httpClient } from '../lib'

class HttpRequest {
  async get(endpoint: string, params?: Record<string, unknown>, headers?: Record<string, string>) {
    if (params) {
      return await httpClient.get(endpoint, params)
    }
    if (headers) {
      return await httpClient.get(endpoint, { headers })
    }
    return await httpClient.get(endpoint)
  }

  async post(endpoint: string, data?: unknown, headers?: unknown) {
    if (headers) {
      return await httpClient.post(endpoint, data, { headers })
    }
    return await httpClient.post(endpoint, data)
  }

  async put(endpoint: string, data: unknown, headers?: unknown) {
    if (headers) {
      return await httpClient.put(endpoint, data, { headers })
    }
    return await httpClient.put(endpoint, data)
  }

  async delete(endpoint: string) {
    return await httpClient.delete(endpoint)
  }

  async patch(endpoint: string, data: unknown) {
    return await httpClient.patch(endpoint, data)
  }
}
export const httpRequest = new HttpRequest()
