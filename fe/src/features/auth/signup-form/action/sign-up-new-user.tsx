import { httpRequest, tryCatch } from '@/utils'
import type { DataSignupType } from '../model'
import type { AxiosError } from 'axios'

export const signUpNewUser = async (dataSignUp: DataSignupType) => {
  const { data, error } = await tryCatch(
    httpRequest.post('/auth/register', {
      email: dataSignUp.email,
      first_name: dataSignUp.firstName,
      last_name: dataSignUp.lastName,
      password: dataSignUp.password,
      redirectUrl: 'http://localhost:5173/login',
    })
  )
  if (error) return { success: false, error: (error as AxiosError).response }
  return { success: true, data: data.data }
}
