import { httpRequest } from '@/utils'
export const getUserDoNotHaveDepartment = async () => {
  return await httpRequest.get('/users/not-dep')
}
