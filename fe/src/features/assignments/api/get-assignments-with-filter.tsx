import type { FilterData } from '../get-all-assignments/model'
import { httpRequest } from '@/utils'

export const getAssignmentsWithFilter = async (values: FilterData) => {
  return await httpRequest.get('/assignments/filter', {
    params: {
      ...values,
    },
  })
}
