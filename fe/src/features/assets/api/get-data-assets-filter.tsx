import { httpClient } from '@/lib'
import type { FilterType } from '../view-all-assets'

export const getDataAssetsFilter = async (value: FilterType) => {
  return await httpClient.get('/assets/filter', {
    params: {
      ...value,
    },
  })
}
