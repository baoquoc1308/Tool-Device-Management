import { httpClient } from '@/lib'

export const getAssignments = async () => {
  return await httpClient.get('/assignments/filter')
}
