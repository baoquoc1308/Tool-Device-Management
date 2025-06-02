import { httpRequest } from '@/utils'

export const getAssignmentData = async (id: string) => {
  return await httpRequest.get(`/assignments/${id}`)
}
