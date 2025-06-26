import { httpRequest } from '@/utils'

export const sendResetPasswordEmail = async (email: string) => {
  return await httpRequest.post('/user/forget-password', {
    email: email,
    redirectUrl: 'https://tool-device-management.vercel.app/reset-password',
  })
}
