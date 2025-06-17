import { httpRequest, type ApiResponse } from '@/utils'
import type { AssetsType } from '../view-all-assets'

export const getAssetNoSchedule = async (): Promise<ApiResponse<AssetsType[]>> => {
  return await httpRequest.get('/assets/maintenance-schedules')
}
