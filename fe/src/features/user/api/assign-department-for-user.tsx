import { httpRequest } from '@/utils'
export const assignDepartmentForUser = async (departmentId: string, userId: string) => {
  return await httpRequest.patch('/user/department', {
    departmentId: parseInt(departmentId),
    userId: parseInt(userId),
  })
}
