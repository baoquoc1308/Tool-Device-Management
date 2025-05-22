import { httpRequest } from '@/utils'
import { tryCatch } from '@/utils'
import type { CreateAssetFormType } from '../model/schema'

const createNewAsset = async (value: CreateAssetFormType) => {
  const { data, error } = await tryCatch(httpRequest.post('/assets', value))
  if (error) return { success: false, error }
  return { success: true, data: data }
}

export default createNewAsset
