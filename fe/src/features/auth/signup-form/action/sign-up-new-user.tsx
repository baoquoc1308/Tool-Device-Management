import { httpRequest, tryCatch } from '@/utils'
import type { DataSignupType } from '../model'
export const signUpNewUser = async (dataSignUp: DataSignupType) => {
  const data = await tryCatch(
    httpRequest.post('/register', {
      email: dataSignUp.email,
      first_name: dataSignUp.firstName,
      last_name: dataSignUp.lastName,
      password: dataSignUp.password,
      redirectUrl: 'http://localhost:5173/login',
    })
  )
  if (data.error) return { success: false, error: data.error.message }
  return { success: true, data: data.data.data }
}
