import { httpRequest } from '@/utils'
import type { CreateAssetFormType } from '../create-new-asset'

export const createNewAsset = async (value: CreateAssetFormType) => {
  return await httpRequest.post(
    '/assets',
    { ...value, redirectUrl: 'https://tool-device-management.vercel.app/asset' },
    { 'Content-Type': 'multipart/form-data' }
  )
}
