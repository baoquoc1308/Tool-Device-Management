import { httpRequest } from '@/utils'
export const assignRoleForUser = async (slug: string, userId: string) => {
  return await httpRequest.patch('/users/role', {
    slug,
    userId: parseInt(userId),
  })
}
