import { httpRequest } from '@/utils'

export const resetPassword = async (newPassword: string, token: string) => {
  return await httpRequest.patch('/user/password-reset', {
    newPassword: newPassword,
    token: token,
  })
}
