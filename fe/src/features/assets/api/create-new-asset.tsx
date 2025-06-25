import { httpRequest } from '@/utils'
import type { CreateAssetFormType } from '../create-new-asset'

export const createNewAsset = async (value: CreateAssetFormType) => {
  console.log('🚀 ~ createNewAsset ~ value:', value)
  return await httpRequest.post(
    '/assets',
    { ...value, redirectUrl: 'https://tool-device-management.vercel.app/assets' },
    { 'Content-Type': 'multipart/form-data' }
  )
}
