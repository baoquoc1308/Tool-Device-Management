import { httpRequest } from '@/utils'

export const getAssignments = async () => {
  return await httpRequest.get('/assignments/filter')
}
