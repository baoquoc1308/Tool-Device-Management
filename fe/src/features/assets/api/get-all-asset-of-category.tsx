import { httpRequest, type ApiResponse } from '@/utils'
import type { AssetsType } from '../view-all-assets'

export const getAllAssetsOfCategory = async (
  categoryId: string,
  departmentId: string
): Promise<ApiResponse<AssetsType[]>> => {
  return await httpRequest.get('/assets/request-transfer', {
    params: {
      categoryId,
      departmentId,
    },
  })
}
