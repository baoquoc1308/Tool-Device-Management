import { tryCatch } from '@/utils'
import { httpRequest } from '@/utils'
import { AxiosError } from 'axios'

export const resetPassword = async (newPassword: string, token: string) => {
  const { data, error } = await tryCatch(
    httpRequest.patch('/user/password-reset', {
      new_password: newPassword,
      token: token,
    })
  )
  if (error) return { success: false, error: (error as AxiosError).response }
  return { success: true, data: data.data }
}
