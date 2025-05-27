import { httpRequest } from '@/utils'

export const sendResetPasswordEmail = async (email: string) => {
  return await httpRequest.post('/user/forget-password', {
    email: email,
    redirectUrl: 'http://localhost:5173/reset-password',
  })
}
