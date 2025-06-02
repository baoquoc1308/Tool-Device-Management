import { httpRequest } from '@/utils'
import type { FilterType } from '../view-all-assets'

export const getDataAssetsFilter = async (value: FilterType) => {
  return await httpRequest.get('/assets/filter', {
    params: {
      ...value,
    },
  })
}
