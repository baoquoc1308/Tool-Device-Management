import { httpRequest } from '@/utils'

export const getAllAssets = async () => {
  return await httpRequest.get('/assets')
}
