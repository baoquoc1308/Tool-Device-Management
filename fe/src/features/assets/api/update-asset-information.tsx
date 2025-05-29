import { httpRequest } from '@/utils'
import type { CreateAssetFormType } from '../create-new-asset'

export const updateAssetInformation = (id: string, data: CreateAssetFormType) => {
  return httpRequest.put(`/assets/${id}`, { ...data }, { 'Content-Type': 'multipart/form-data' })
}
