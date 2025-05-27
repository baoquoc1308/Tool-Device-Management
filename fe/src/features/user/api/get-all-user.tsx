import { httpRequest } from '@/utils'
export const getAllUsers = async () => {
  return await httpRequest.get('/users')
}
