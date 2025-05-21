import { tryCatch } from '@/utils'
import { httpRequest } from '@/utils'

export const getAllAssets = async () => {
  const { data, error } = await tryCatch(httpRequest.get('/assets'))

  if (error) return { success: false, error }
  return { success: true, data: data.data.data }
}
