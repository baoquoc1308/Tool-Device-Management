import { tryCatch } from '@/utils'
import { httpRequest } from '@/utils'
import type { AxiosError } from 'axios'

export const sendResetPasswordEmail = async (email: string) => {
  const { data, error } = await tryCatch(
    httpRequest.post('/user/forget-password', {
      email: email,
      redirectUrl: 'http://localhost:5173/reset-password',
    })
  )
  if (error) return { success: false, error: (error as AxiosError).response }
  return { success: true, data: data.data }
}
