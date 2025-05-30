import type { FilterData } from '../get-all-assignments/model'
import { httpClient } from '@/lib'

export const getAssignmentsWithFilter = async (values: FilterData) => {
  return await httpClient.get('/assignments/filter', {
    params: {
      ...values,
    },
  })
}
