import { httpRequest } from '@/utils'
export const getAssetLog = async (id: string) => {
  return await httpRequest.get(`/assets-log/${id}`)
}
