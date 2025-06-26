import { httpRequest } from '@/utils'

export const getAllDepartment = async () => {
  return await httpRequest.get('/departments')
}
