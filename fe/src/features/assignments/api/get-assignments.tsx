import { httpClient } from '@/lib'
import type { AssignmentsResponse } from '../get-all-assignments/model'

export const getAssignments = async (value?: AssignmentsResponse) => {
  return await httpClient.get('/assignments/filter', {
    params: {
      ...value,
    },
  })
}
