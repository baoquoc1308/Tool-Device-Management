import { httpRequest, type ApiResponse } from '@/utils'
import type { DepartmentType } from '../create-new-asset'
export const getAllDepartment = async (): Promise<ApiResponse<DepartmentType[]>> => {
  return await httpRequest.get('/departments')
}
