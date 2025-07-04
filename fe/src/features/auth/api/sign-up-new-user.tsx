import { httpRequest } from '@/utils'
import type { DataSignupType } from '../signup-form'

export const signUpNewUser = async (dataSignUp: DataSignupType) => {
  return await httpRequest.post('/auth/register', {
    email: dataSignUp.email,
    firstName: dataSignUp.firstName,
    lastName: dataSignUp.lastName,
    password: dataSignUp.password,
    redirectUrl: 'https://tool-device-management.vercel.app/login',
  })
}
