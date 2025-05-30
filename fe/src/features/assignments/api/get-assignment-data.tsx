import { httpClient } from '@/lib'

export const getAssignmentData = async (id: string) => {
  return await httpClient.get(`/assignments/${id}`)
}
