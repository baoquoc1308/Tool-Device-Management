import { httpRequest } from '@/utils'
export const getAllRoles = async () => {
  return await httpRequest.get('/roles')
}
