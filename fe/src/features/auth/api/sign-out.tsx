import { httpRequest } from '@/utils'

export const signOut = async () => {
  return await httpRequest.post('/auth/logout')
}
