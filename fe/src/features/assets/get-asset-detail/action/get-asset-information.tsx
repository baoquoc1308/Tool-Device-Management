import { httpRequest } from '@/utils'

export const getAssetInformation = async (id: string) => {
  return await httpRequest.get(`/assets/${id}`)
}
